"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

export default function UserMenu() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();
  const { language } = useLanguage();
  const t = translations[language];

  const handleLogout = () => {
    logout();
    document.cookie = "authToken=; path=/; max-age=0";
    router.push("/login");
  };

  if (!isAuthenticated) {
    return null;
  }

  const fullName = user ? `${user.firstName || ""} ${user.lastName || ""}`.trim() : "";

  return (
    <div className="flex items-center gap-4 rounded-lg border border-foreground/20 p-2">
      <div className="flex flex-col items-end pr-2">
        <p className="text-sm font-medium text-foreground">{fullName}</p>
        <p className="text-xs text-foreground/60">{user?.email}</p>
      </div>
      <button
        onClick={handleLogout}
        className="px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 bg-red-100 text-red-700 hover:bg-red-200"
      >
        {t.deconnexion}
      </button>
    </div>
  );
}
