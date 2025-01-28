import { useState, useEffect, useCallback } from "react";
import { db } from "../services/firebase";
import { collection, getDocs } from "firebase/firestore";

interface Link {
  icon?: string;
  id: string;
  title: string;
  url: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useFetchLinks = (_userId: string) => {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLinks = useCallback(async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "links"));
      const linksData: Link[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        console.log("Dados do documento:", data); // Log para depuração
        linksData.push({ id: doc.id, ...data } as Link);
      });
      setLinks(linksData);
    } catch (error) {
      console.error("Erro ao buscar links:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  return { links, loading };
};

export default useFetchLinks;