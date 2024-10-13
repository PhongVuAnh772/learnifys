import { useLoadingContent } from "@/components/loading/LoadingContent";
import { storage } from "@/mmkv";
import { supabase } from "@/supabase";
import { Session, User } from "@supabase/supabase-js";
import { SplashScreen, useRouter, usePathname } from "expo-router";
import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";

type AuthProps = {
  user: User | null;
  session: Session | null;
  initialized?: boolean;
  signOut?: () => void;
  role: string;
  spicifiedInformation: any;
};

export const AuthContext = createContext<Partial<AuthProps>>({});

// Custom hook to read the context values
export function useAuth() {
  return React.useContext(AuthContext);
}

const EXPO_ACCESS_STREAM_KEY_PASSWORD =
  process.env.EXPO_ACCESS_STREAM_KEY_PASSWORD;
export const AuthProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>();
  const [session, setSession] = useState<Session | null>(null);
  const [spicifiedInformation, setSpicifiedInformation] = useState(null);
  const [initialized, setInitialized] = useState<boolean>(false);
  const [role, setRole] = useState("");
  const pathname = usePathname();
  const { showLoadingContent, hideLoadingContent } = useLoadingContent();
  useEffect(() => {
    showLoadingContent();
    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session ? session.user : null);
      setInitialized(true);
    });
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const getDataDatabase = async () => {
      let { data, error } = await supabase

        .from("users")
        .select("*")
        .eq("email", user?.user_metadata?.email);
      console.log(data, error, "getDataDatabase");
      if (data != null) {
        setSpicifiedInformation(data as any);
        setRole(data[0].role);
        console.log("data[0].role", data[0].role)
        getNavigation(data[0].role as any);
      }
    };
    getDataDatabase();
  }, [user]);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      router.replace("/(modals)/login");
    } catch (error) {
      console.error("Error signing out:", error);
      setUser(null);
      setSession(null);
      router.replace("/(modals)/login");
    }
  };
  useEffect(() => {
    console.log("Signing in", pathname);
  }, [pathname]);

  const getNavigation = (roleData: any) => {
    if (roleData) {
      if (session) {
        if (roleData === "student") {
          router.replace("(student)/(tabs)" as any);
          hideLoadingContent();
        } else if (roleData === "teacher") {
          router.replace("(teacher)/(tabs)" as any);
          hideLoadingContent();
        } else if (roleData === "admin") {
          router.replace("(admin)/(tabs)" as any);
          hideLoadingContent();
        } else if (roleData === "parent") {
          router.replace("(parents)/(tabs)" as any);
          hideLoadingContent();
        } else {
          router.replace("choosing" as any);
          hideLoadingContent();
        }
      } else {
        router.replace("/(modals)/login" as any);
        hideLoadingContent();
      }
    } else {
      router.replace("choosing" as any);
      hideLoadingContent();
    }

    SplashScreen.hideAsync();
  }

  const value = {
    user,
    session,
    initialized,
    signOut,
    role,
    spicifiedInformation,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
