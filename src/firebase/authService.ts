import { authFirebase, googleProvider, githubProvider } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

// Sign up with email and password
export const signUp = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(authFirebase, email, password);
};

// Log in with email and password
export const login = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(authFirebase, email, password);
};

// Log in with Google
export const loginWithGoogle = async () => {
  return await signInWithPopup(authFirebase, googleProvider);
};

// Log in with GitHub
export const loginWithGithub = async () => {
  return await signInWithPopup(authFirebase, githubProvider);
};
