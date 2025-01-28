import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; // Importa a configuração do Firebase

type UseLoginResult = {
  login: (email: string, password: string) => Promise<void>;
  isLoading: boolean;
  error: string;
};

const useLogin = (): UseLoginResult => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const auth = getAuth(); // Instância do Firebase Authentication

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    setError(""); 

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Login bem-sucedido!");
      // Aqui você pode fazer o redirecionamento ou atualizações após o login
    } catch (error: any) {
      setError(error.message || "Erro desconhecido");
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};

export default useLogin;
