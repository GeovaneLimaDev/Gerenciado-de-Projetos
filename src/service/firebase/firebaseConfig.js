import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDuWqr0p7MyXKp-gqoqDIn_0V_A1RcMnqM",
  authDomain: "gerenciador-de-projetos-b5cad.firebaseapp.com",
  projectId: "gerenciador-de-projetos-b5cad",
  storageBucket: "gerenciador-de-projetos-b5cad.firebasestorage.app",
  messagingSenderId: "441343391865",
  appId: "1:441343391865:web:6fbb13ed203b3ae498bca8",
  measurementId: "G-1VL79M3YR9"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);