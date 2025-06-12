import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  // TODO: Replace with your Firebase config
  apiKey: "AIzaSyDMejRFlTKEMinDuxI9vUGjkQWa6ccau7w", //OK
  authDomain: "tabataonline-71f5c.firebaseapp.com",
  projectId: "tabataonline-71f5c", //OK
  storageBucket: "tabataonline-71f5c.firebasestorage.app",
  messagingSenderId: "1076508482784", //OK
  appId: "1:100000000000:web:1000000000000000000000"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app; 