import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import firebase from "firebase/compat/app";
import { authFirebase, googleProvider } from "../firebase/firebaseConfig";
import { signInWithPopup, signOut } from "firebase/auth";

// 1. Define the shape of the context
interface AuthContextType {
  user: firebase.User | null;
  loginWithGoogle: () => Promise<void>;
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

  //   // Function to Create user with Email and Password
  //   const createUser = async (email, password) => {
  //     try {
  //       await auth.createUserWithEmailAndPassword(auth, email, password);
  //     } catch (error) {
  //       console.error("Google sign-in error:", error);
  //     }
  //   };

  // Function to log in using Google provider
  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(authFirebase, googleProvider);
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  // Function to log out the user
  const logout = async () => {
    try {
      await signOut(authFirebase);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loginWithGoogle, logout }}>
      {!loading && children}{" "}
      {/* Only render children when loading is complete */}
    </AuthContext.Provider>
  );
};

// 4. Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
