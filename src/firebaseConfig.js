import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCao5ul0AjQpuH_52u2P6lt9CTdRhiJHJk",
  authDomain: "jungle-food.firebaseapp.com",
  projectId: "jungle-food",
  storageBucket: "jungle-food.firebasestorage.app",
  messagingSenderId: "162075507448",
  appId: "1:162075507448:web:3dd2d8b7fed04badb6990d"
};

export const app = initializeApp(firebaseConfig);