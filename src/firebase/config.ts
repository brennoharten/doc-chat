import { initializeApp } from "firebase/app";
import {
	initializeFirestore,
	Firestore,
	serverTimestamp,
} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getAuth, Auth } from "firebase/auth";

// Firebase config aqui embaixo
const firebaseConfig = {
	apiKey: "AIzaSyCvtaigen1rsqPgN-11h-uMICPzZ6i8EEY",
	authDomain: "productive-saas.firebaseapp.com",
	projectId: "productive-saas",
	storageBucket: "productive-saas.appspot.com",
	messagingSenderId: "168058209214",
	appId: "1:168058209214:web:291b5065e62fb55df4efef",
	measurementId: "G-Y3HPKKXVP6",
};
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

// Initialize services
const db: Firestore = initializeFirestore(firebaseApp, {
	ignoreUndefinedProperties: true,
});
const auth: Auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp); // Sem a anotação de tipo

// Timestamp
const timestamp = serverTimestamp();

export { db, auth, storage, timestamp };
