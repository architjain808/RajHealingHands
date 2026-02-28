import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCLOp6H-BZwYi5XT_cdEeRhvWO7DgVM5io",
    authDomain: "raj-healing-hands.firebaseapp.com",
    projectId: "raj-healing-hands",
    storageBucket: "raj-healing-hands.firebasestorage.app",
    messagingSenderId: "748796707156",
    appId: "1:748796707156:web:c4cfaa419970e87cc248c1"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
