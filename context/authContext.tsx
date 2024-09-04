import { useContext, createContext, type PropsWithChildren } from "react";
import { useStorageState } from "@/hooks/useStorageHook";
import { IUser } from "@/constants/types";
import { appSignUp } from "@/utils/auth";
import { AxiosResponse } from "axios";

const AuthContext = createContext<{
  signIn: (
    data: any,
    token: string
  ) => Promise<AxiosResponse<any, any> | undefined>;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: async () => undefined,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");

  const signUp = async (data: any, token: string) => {
    const result = await appSignUp(data);
    if (result && result.data) {
      const { username, phone } = result.data as IUser;
      setSession(JSON.stringify({ username, phone, token }));
    }
    return result;
  };

  return (
    <AuthContext.Provider
      value={{
        signIn: signUp,
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
