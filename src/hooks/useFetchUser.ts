import { useState, useEffect } from "react";
import { db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";

interface User {
  id: string;
  name: string;
  email: string;
  job: string;
  locale: string;
  phone: string;
}

const useFetchUser = (userId: string) => {
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const userDoc = await getDoc(doc(db, "users", userId));
        if (userDoc.exists()) {
          setUserData({ id: userDoc.id, ...userDoc.data() } as User);
        } else {
          setError(new Error("Usuário não encontrado"));
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  return { userData, loading, error };
};

export default useFetchUser;