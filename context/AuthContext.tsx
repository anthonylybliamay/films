"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
} | null;

type AuthContextType = {
  user: User;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (nom: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Vérifier si l'utilisateur est déjà connecté au chargement
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur:", error);
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      let errorData: { error?: string; message?: string; user?: User } | null = null;
      try {
        errorData = await response.json();
      } catch {
        errorData = null;
      }

      if (!response.ok) {
        throw new Error(errorData?.error || errorData?.message || "Erreur de connexion");
      }

      if (!errorData?.user) {
        throw new Error("Réponse de connexion invalide");
      }

      setUser(errorData.user);
      localStorage.setItem("user", JSON.stringify(errorData.user));
      localStorage.setItem("authToken", Math.random().toString(36).substr(2));
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (nom: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nom, email, password }),
      });

      let errorData: { error?: string; message?: string; user?: User } | null = null;
      try {
        errorData = await response.json();
      } catch {
        errorData = null;
      }

      if (!response.ok) {
        throw new Error(errorData?.error || errorData?.message || "Erreur d'inscription");
      }

      if (!errorData?.user) {
        throw new Error("Réponse d'inscription invalide");
      }

      setUser(errorData.user);
      localStorage.setItem("user", JSON.stringify(errorData.user));
      localStorage.setItem("authToken", Math.random().toString(36).substr(2));
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth doit être utilisé dans AuthProvider");
  }

  return context;
}
