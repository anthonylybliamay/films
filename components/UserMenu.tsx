"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";
import Link from "next/link";

export default function UserMenu() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();
  const { language } = useLanguage();
  const t = translations[language];
  const fullName = user
  ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
  : "";

  const handleLogout = () => {
    logout();
    document.cookie = "authToken=; path=/; max-age=0";
    router.push("/login");
  };

  return (
  <div className="flex items-center gap-4 rounded-[1.5rem] border border-[#d99f8b] bg-[#fff7f1] px-4 py-3 shadow-[0_10px_30px_rgba(133,76,58,0.08)]">
    {isAuthenticated ? (
      <>
        <div className="flex flex-col items-end pr-2">
          <p className="text-sm font-medium text-foreground">
            {fullName}
          </p>
          <p className="text-xs text-foreground/60">
            {user?.email}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="inline-flex items-center justify-center rounded-full bg-[#d94d33] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#b33e2a]"
        >
          {t.deconnexion}
        </button>
      </>
    ) : (
      <Link
        href="/login"
        className="inline-flex items-center justify-center rounded-full bg-[#d94d33] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#b33e2a]"
      >
        {t.connexion}
      </Link>
    )}
  </div>
);}