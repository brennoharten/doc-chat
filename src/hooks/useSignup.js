/* import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { serverTimestamp, doc, setDoc } from "firebase/firestore";
import { auth, db, timestamp } from "../firebase/config";
import { useFirestore } from "./useFirestore";
import { useAuthContext } from "./useAuthContext";

interface SignupResult {
  error: string | null;
  isPending: boolean;
  signup: (email: string, password: string, name: string) => Promise<void>;
}

export const useSignup = (): SignupResult => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email: string, password: string, name: string) => {
    setError(null);
    setIsPending(true);

    try {
      // Sign up user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      if (!res) {
        setIsPending(false);
        throw new Error("Não foi possível realizar o cadastro.");
      }

      // Add display name to user
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: name });
      }
      const createdAt = serverTimestamp();


      // Create a user document
      await setDoc(doc(db, "users", res.user.uid), {
        id: res.user.uid,
        online: true,
        createdAt,
        email,
        name,
      });

      // Dispatch login action
      dispatch({ type: "LOGIN", payload: res.user });

      // Update state
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err: any) {
      if (!isCancelled) {
        console.log(err.message);
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => () => setIsCancelled(true), []);

  return { error, isPending, signup };
};
 */

import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db, timestamp } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, name) => {
    setError(null);
    setIsPending(true);

    try {
      // Sign up user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      if (!res) {
        setIsPending(false);
        throw new Error("Não foi possível realizar o cadastro.");
      }

      // Add display name to user
      await updateProfile(auth.currentUser, { displayName: name });
      const createdAt = timestamp;

      // Create a user document
      await setDoc(doc(db, "users", res.user.uid), {
        id: res.user.uid,
        online: true,
        createdAt,
        email: email,
        name: name,
      });

      // Dispatch login action
      dispatch({ type: "LOGIN", payload: res.user });

      // Update state
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      console.log(err)
      if (!isCancelled) {
        console.log(err.message);
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => () => setIsCancelled(true), []);

  return { error, isPending, signup };
};
