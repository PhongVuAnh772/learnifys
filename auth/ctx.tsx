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
  authStateChecking: () => void
};

export const AuthContext = createContext<Partial<AuthProps>>({});

// Custom hook to read the context values
export function useAuth() {
  return React.useContext(AuthContext);
}

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

  const authStateChecking = async () => {
    if (session) {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", session.user?.user_metadata?.email);

      if (data && data.length > 0) {
        setSpicifiedInformation(data as any);
        setRole(data[0].role);
        getNavigation(data[0].role as any);
      } else {
        hideLoadingContent();
        router.replace("/(modals)/login");
      }
    } else {
      hideLoadingContent();
      router.replace("/(modals)/login");
    }
  }

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

  const getNavigation = (roleData: string) => {
    if (!roleData) {
      router.replace("choosing" as any);
      hideLoadingContent();
      SplashScreen.hideAsync();
      return;
    }

    if (!session) {
      router.replace("/(modals)/login");
      hideLoadingContent();
      SplashScreen.hideAsync();
      return;
    }

    switch (roleData) {
      case "student":
        router.replace("(student)/(tabs)" as any);
        break;
      case "teacher":
        router.replace("(teacher)/(tabs)" as any);
        break;
      case "admin":
        router.replace("(admin)/(tabs)" as any);
        break;
      case "parent":
        router.replace("(parents)/(tabs)" as any);
        break;
      default:
        router.replace("choosing");
    }

    hideLoadingContent();
    SplashScreen.hideAsync();
  };

  useEffect(() => {
    if (!initialized) return;
    if (!session) {
      router.replace('/onboarding');
    }
  }, [initialized, session]);

  const value = {
    user,
    session,
    initialized,
    signOut,
    role,
    spicifiedInformation,
    authStateChecking
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
