/* import { useEffect, useState, useRef } from "react";
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
  limit,
  collectionGroup,
  QueryConstraint,
  OrderByDirection,
  DocumentData,
  DocumentSnapshot,
  FieldPath,
} from "firebase/firestore";
import { db } from "../firebase/config";

interface QueryOptions {
  query: QueryConstraint[];
  orderBy?: [string | FieldPath, OrderByDirection];
  query2?: QueryConstraint[];
  limit?: number;
}

export const useCollection = (
  coll: string,
  _query: QueryConstraint[] = [],
  _orderBy?: [string | FieldPath, OrderByDirection],
  _query2: QueryConstraint[] = [],
  _limit?: number,
  isGroup: boolean = false
) => {
  const [documents, setDocuments] = useState<DocumentData[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const q = useRef<QueryConstraint[]>(_query).current;
  const ob = useRef<[string | FieldPath, OrderByDirection] | undefined>(_orderBy).current;
  const q2 = useRef<QueryConstraint[]>(_query2).current;

  useEffect(() => {
    let ref = isGroup ? collectionGroup(db, coll) : collection(db, coll);

    if (q.length > 0) {
      ref = query(ref, where(...q));
    }

    if (q2.length > 0) {
      ref = query(ref, where(...q2));
    }

    if (ob) {
      ref = query(ref, orderBy(...ob));
    }

    if (_limit) {
      ref = query(ref, limit(_limit));
    }

    const unsub = onSnapshot(
      ref,
      (snapshot) => {
        const results: DocumentData[] = [];
        snapshot.forEach((doc: DocumentSnapshot<DocumentData>) => {
          results.push({ ...doc.data(), id: doc.id });
        });

        // Update state
        setDocuments(results);
        setError(null);
      },
      (error) => {
        console.log("Erro na coleção ", coll);
        console.log(error);
        setError("Could not list transactions.");
      }
    );

    // Unsubscribe clean up
    return () => unsub();
  }, [coll, q, q2, ob, _limit, isGroup]);

  return { documents, error };
};
 */

/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState, useRef } from "react";
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
  limit,
  collectionGroup,
} from "firebase/firestore";
import { db } from "../firebase/config";

export const useCollection = (
  coll,
  _query,
  _orderBy,
  _query2,
  _limit,
  isGroup
) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  // If we don't use useRef --> infinite loop, because _query is an array and it's 'different' on every function call
  const q = useRef(_query).current;
  const ob = useRef(_orderBy).current;
  const q2 = useRef(_query2).current;

  useEffect(() => {
    // let ref = collection(db, coll)
    let ref;
    ref = isGroup ? collectionGroup(db, coll) : collection(db, coll);

    if (q) {
      ref = query(ref, where(...q));
    }

    if (q2) {
      ref = query(ref, where(...q2));
    }

    if (_orderBy) {
      ref = query(ref, orderBy(...ob));
    }

    if (_limit) {
      ref = query(ref, limit(_limit));
    }

    const unsub = onSnapshot(
      ref,
      (snapshot) => {
        const results = [];
        snapshot.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });

        // Update state
        setDocuments(results);
        setError(null);
      },
      (error) => {
        console.log("Erro na coleção ", coll);
        console.log(error);
        setError("Could not list transactions.");
      }
    );

    // Unsubscribe clean up
    return () => unsub();
  }, [coll, q, q2, ob, orderBy]);

  return { documents, error };
};
