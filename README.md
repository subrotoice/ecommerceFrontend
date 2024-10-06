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
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8ehawlsWmF8r0kb4qWL7wSNsh6HVywVQ",
  authDomain: "breaking-news-cfbca.firebaseapp.com",
  projectId: "breaking-news-cfbca",
  storageBucket: "breaking-news-cfbca.appspot.com",
  messagingSenderId: "371790083227",
  appId: "1:371790083227:web:4da5c666899abe60a2c23e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
```
- Add this line at the end of firebase/firebaseConfig.ts.
```tsx
export default app;
```

