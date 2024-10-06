import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import firebase from "firebase/compat/app";
import { authFirebase } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import {
  signUp,
  login,
  loginWithGoogle,
  loginWithGithub,
} from "../firebase/authService";

// 1. Define AuthContext types
interface AuthContextType {
  user: firebase.User | null;
  signUp: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithGithub: () => Promise<void>;
  logout: () => Promise<void>;
}

// 2. Create the AuthContext with an undefined default
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. AuthProvider component that wraps the entire app
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [loading, setLoading] = useState(true);

  // Monitor the Firebase auth state and set the user
  useEffect(() => {
    const unsubscribe = authFirebase.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // Email/Password Sign-up
  const signUpWithEmail = async (email: string, password: string) => {
    await signUp(email, password);
  };

  // Email/Password Login
  const loginWithEmail = async (email: string, password: string) => {
    await login(email, password);
  };

  // Google Login
  const loginGoogle = async () => {
    await loginWithGoogle();
  };

  // GitHub Login
  const loginGithub = async () => {
    await loginWithGithub();
  };

  // Logout
  const logout = async () => {
    await signOut(authFirebase);
  };

  return (
    <AuthContext.Provider
      value={{
        user, // user: user same
        signUp: signUpWithEmail,
        login: loginWithEmail,
        loginWithGoogle: loginGoogle,
        loginWithGithub: loginGithub,
        logout,
      }}
    >
      {!loading && children}{" "}
      {/* Only render children when loading is complete */}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
