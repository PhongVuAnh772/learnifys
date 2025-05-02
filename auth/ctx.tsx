import { useLoadingContent } from "@/components/loading/LoadingContent";
import { commonEnum } from "@/enum/keymap";
import { storage } from "@/mmkv";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SplashScreen, useRouter, usePathname } from "expo-router";
import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import axios from "axios";

type AuthProps = {
  user: any | null;
  session: any | null;
  initialized?: boolean;
  signOut?: () => void;
  role: string;
  spicifiedInformation: any;
  authStateChecking: () => void;
};

export const AuthContext = createContext<Partial<AuthProps>>({});

export function useAuth() {
  return React.useContext(AuthContext);
}

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const [user, setUser] = useState<any | null>(null);
  const [session, setSession] = useState<any | null>(null);
  const [spicifiedInformation, setSpicifiedInformation] = useState(null);
  const [initialized, setInitialized] = useState<boolean>(false);
  const [role, setRole] = useState("");
  const pathname = usePathname();
  const { showLoadingContent, hideLoadingContent } = useLoadingContent();

  useEffect(() => {
    const getData = async () => {
      showLoadingContent();

      const userData = await AsyncStorage.getItem("userData");

      if (userData) {
        const parsedUserData = JSON.parse(userData);
        const token = parsedUserData?.token;
        console.log(token, "token âsdfa");
        fetchUserProfile(token);
      } else {
        setInitialized(true);
        hideLoadingContent();
        router.replace("/(modals)/login");
      }
    };
    getData();
  }, []);

  const fetchUserProfile = async (token: string) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/login-with-token",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;
      console.log(data, "data");

      setSession({ token });
      setUser(data.data);
      setSpicifiedInformation(data.data);
      setRole(data.data.roleId);
      getNavigation(data.data.roleId);
    } catch (err: any) {
      console.error("Failed to fetch user profile", err?.response?.data || err);
      storage.delete("userData");
      router.replace("/(modals)/login");
    } finally {
      setInitialized(true);
      hideLoadingContent();
    }
  };

  const authStateChecking = async () => {
    const userData = await AsyncStorage.getItem("userData");
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      const token = parsedUserData?.token;
      if (!token) {
        router.replace("/(modals)/login");
        return;
      }

      await fetchUserProfile(token);
    }
  };

  const signOut = async () => {
    try {
      const token = storage.getString("userData");
      if (token) {
        await fetch("https://your-backend.com/api/auth/logout", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      storage.delete("access_token");
      setUser(null);
      setSession(null);
      router.replace("/(modals)/login");
    }
  };

  const getNavigation = (roleData: string) => {
    if (!roleData) {
      router.replace("/choosing");
    }

    switch (roleData) {
      case commonEnum.roleId.STUDENT:
        router.replace("/(student)/(tabs)");
        break;
      case commonEnum.roleId.TEACHER:
        router.replace("/(teacher)/(tabs)");
        break;
      case commonEnum.roleId.ADMIN:
        router.replace("/(admin)");
        break;
      case commonEnum.roleId.PARENTS:
        router.replace("/(parents)/(tabs)");
        break;
      default:
        router.replace("/choosing");
    }

    hideLoadingContent();
    SplashScreen.hideAsync();
  };

  useEffect(() => {
    if (!initialized) return;
    if (!session) {
      router.replace("/onboarding");
    }
  }, [initialized, session]);

  const value = {
    user,
    session,
    initialized,
    signOut,
    role,
    spicifiedInformation,
    authStateChecking,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
