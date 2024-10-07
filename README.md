### **Install google fonts**
1. [fonts.google.com/specimen/Poppins](https://fonts.google.com/specimen/Poppins)
2. Get Font -> Embed Code -> @Import
  - Put that import link in the top of main.tsx
3. tailwind.config.js 

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: '"Poppins", sans-serif',
        Sixtyfour: '"Sixtyfour Convergence", sans-serif;',
      },
    },
  },
  plugins: [require("daisyui")],
};
```
```jsx
<h1 className="text-3xl bg-red-100 font-poppins font-bold">Hello world!</h1>
```

### **Understanding useContext Hook | Create - Wrap - Use**
*createContext() -> MyContext.Provider(value) -> Wrap -> useContext()*

### 1. Create a Context & use it inside a Provider Component | Passing Data
**Using single Component Version (Create + Wrap)**
```jsx
import { createContext } from 'react';
const ThemeContext = createContext('light');

function App() {
  const [theme, setTheme] = useState('light');
  // ...
  return (
    <ThemeContext.Provider value={theme}>
      <Page />
    </ThemeContext.Provider>
  );
}
```

**Separate component to wrap with | Two Components Version 1. Create, 2. Wrap**
*Notice: Component name is provider but return context. It's just convension*
```jsx
import React, { createContext, useState } from 'react';
// Create a Context object
const MyContext = createContext();

const MyProvider = ({ children }) => {
  const message = "Hello from Context!";

  return (
    <MyContext.Provider value={{ message }}>
      {children}
    </MyContext.Provider>
  );
};
```
### 2. Wrap your app or the part of the component tree | Wrap App

```jsx
import React from 'react';

const App = () => {
  return (
    <MyProvider>
      <DisplayMessage />
    </MyProvider>
  );
};
```

### 3. Access data | useContext(MyContext)

```jsx
import React, { useContext } from 'react';

const DisplayMessage = () => {
  const { message } = useContext(MyContext);  // Access the context data

  return <h1>{message}</h1>;
};
```

### **FireBase Authentication**
[console.firebase.google.com](https://console.firebase.google.com/) 
[firebase.google.com/docs](https://firebase.google.com/docs/auth/web/password-auth)
---
![https://prnt.sc/fsXVGe4dnPqR](https://i.ibb.co.com/QFgVDrK/Screenshot-1.png)
![https://prnt.sc/wtsmLCMtWBWx](https://i.ibb.co.com/mysgxS1/Screenshot-2.png)

Install FireBase
```bash
npm install firebase
```

- FireBase configuration
```javascript
// firebase/firebaseConfig.ts 
// Import the necessary functions from Firebase SDK (v9 Modular Syntax)
import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8ehawlsWmF8r0kb4qWL7wSNsh6HVywVQ",
  authDomain: "breaking-news-cfbca.firebaseapp.com",
  projectId: "breaking-news-cfbca",
  storageBucket: "breaking-news-cfbca.appspot.com",
  messagingSenderId: "371790083227",
  appId: "1:371790083227:web:4da5c666899abe60a2c23e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase Auth and Google Auth Provider
export const authFirebase = getAuth(app); // Get Firebase Auth instance

// Initialize Google and GitHub providers
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
```
```tsx
// firebase/authService.ts
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
```

****
```jsx
// context/AuthContext.tsx
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

// 4. Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;

```


