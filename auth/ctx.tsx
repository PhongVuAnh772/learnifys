import { supabase } from "@/supabase";
import { Session, User } from "@supabase/supabase-js";
import { SplashScreen, useRouter } from "expo-router";
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
    if (session) {
      router.replace("/(tabs)");
    } else {
      router.replace("/(modals)/login");
    }
          SplashScreen.hideAsync();

  }, [session, user]);

  const value = {
    user,
    session,
    initialized,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
