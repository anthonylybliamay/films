"use client";

import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type FavoriteButtonProps = {
  filmId: string;
  filmTitle: string;
  filmImage?: string;
  size?: "sm" | "md" | "lg";
};

export default function FavoriteButton({
  filmId,
  filmTitle,
  filmImage,
  size = "md",
}: FavoriteButtonProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  // Tailles du bouton
  const sizeClasses = {
    sm: "w-6 h-6 text-sm",
    md: "w-8 h-8 text-base",
    lg: "w-10 h-10 text-5xl",
  };

  // Vérifier si le film est en favori au chargement
  useEffect(() => {
    if (!user) {
      setIsChecking(false);
      return;
    }

    const checkFavorite = async () => {
      try {
        const response = await fetch(
          `/api/favorites?filmId=${filmId}`,
          {
            headers: {
              "x-user-id": user.id,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setIsFavorite(data.isFavorite);
        }
      } catch (error) {
        console.error("Error checking favorite:", error);
      } finally {
        setIsChecking(false);
      }
    };

    checkFavorite();
  }, [filmId, user]);

  const handleToggleFavorite = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (!user) {
      // Rediriger vers login si non authentifié
      router.push("/login");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": user.id,
        },
        body: JSON.stringify({
          filmId,
          filmTitle,
          filmImage,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setIsFavorite(data.isFavorite);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isChecking) {
    return (
      <button
        type="button"
        disabled
        className={`${sizeClasses[size]} rounded-full transition-opacity opacity-50`}
      >
        ♡
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleToggleFavorite}
      disabled={isLoading}
      className={`${sizeClasses[size]} rounded-full transition-all duration-200 font-semibold ${
        isFavorite
          ? "text-red-500 hover:text-red-600"
          : "text-gray-400 hover:text-red-400"
      } disabled:opacity-50`}
      title={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      {isFavorite ? "♥" : "♡"}
    </button>
  );
}
