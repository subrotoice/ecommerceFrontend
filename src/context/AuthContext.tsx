import {
  createUserWithEmailAndPassword,
  User as FirebaseUser,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  UserCredential,
} from "firebase/auth";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  authFirebase,
  githubProvider,
  googleProvider,
} from "../firebase/firebaseConfig";

interface ProfileInfo {
  displayName: string;
  photoURL: string;
}
// 1. Define AuthContext types
interface AuthContextType {
  user: FirebaseUser | null;
  signUp: (email: string, password: string) => Promise<UserCredential>;
  updateProfileWithEmail: (
    user: FirebaseUser,
    profileInfo: ProfileInfo
  ) => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<UserCredential>;
  loginWithGoogle: () => Promise<UserCredential>;
  loginWithGithub: () => Promise<UserCredential>;
  logout: () => Promise<void>;
}

// 2. Create the AuthContext with an undefined default
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. AuthProvider component that wraps the entire app
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
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
    return await createUserWithEmailAndPassword(authFirebase, email, password);
  };

  // Email/Password Sign-up
  const updateProfileWithEmail = async (
    user: FirebaseUser,
    profileInfo: ProfileInfo
  ) => {
    return await updateProfile(user, profileInfo);
  };

  // Email/Password Login
  const loginWithEmail = async (email: string, password: string) => {
    return await signInWithEmailAndPassword(authFirebase, email, password);
  };

  // Google Login
  const loginGoogle = async () => {
    return await signInWithPopup(authFirebase, googleProvider);
  };

  // GitHub Login
  const loginGithub = async () => {
    return await signInWithPopup(authFirebase, githubProvider);
  };

  // Logout
  const logout = async () => {
    await signOut(authFirebase);
  };

  return (
    <AuthContext.Provider
      value={{
        user: user, // user: user same
        signUp: signUpWithEmail,
        updateProfileWithEmail,
        loginWithEmail,
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

// 4. Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
