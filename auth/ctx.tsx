import { storage } from "@/mmkv";
import { supabase } from "@/supabase";
import { Session, User } from "@supabase/supabase-js";
import { SplashScreen, useRouter,usePathname } from "expo-router";
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
  const [initialized, setInitialized] = useState<boolean>(false);
  const role = storage.getString("role");
    const pathname = usePathname();

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session ? session.user : null);
      setInitialized(true);
    });
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      router.replace("/(modals)/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  useEffect(() => {
    console.log("Signing in", pathname)
    }, [pathname]);

  useEffect(() => {
    if (role) {
      if (session) {
        if (role === "student") {
          router.replace("(admin)/(tabs)" as any);
        } else if (role === "teacher") {
          router.replace("(teacher)/(tabs)" as any);
        } else if (role === "admin") {
          router.replace("(admin)/(tabs)" as any);
        } else if (role === "parent") {
          router.replace("(parents)/(tabs)" as any);
        } else {
          router.replace("choosing" as any);
        }
      } else {
        router.replace("/(modals)/login" as any);
      }
    } else {
      router.replace("choosing" as any);
    }

    SplashScreen.hideAsync();
  }, [session]);

  const value = {
    user,
    session,
    initialized,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
