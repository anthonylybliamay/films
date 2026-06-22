'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { translations } from "@/lib/translations";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const { login } = useAuth();
  const t = translations[language];
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = t.champRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = t.emailInvalide;
    }

    if (!password) {
      newErrors.password = t.champRequired;
    } else if (password.length < 8) {
      newErrors.password = t.motDePasseCourt;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await login(email, password);
      // Créer un cookie pour le middleware
      document.cookie = `authToken=${Math.random().toString(36).substr(2)}; path=/; max-age=86400`;
      router.push("/films");
    } catch (error) {
      console.error("Erreur de connexion:", error);
      const errorMessage = error instanceof Error ? error.message : "Erreur de connexion";
      setErrors({ email: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-transparent text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center gap-10 px-6 py-16 sm:px-8">
        <div className="space-y-8 rounded-[2.5rem] border border-[#d99f8b] bg-[#fff7f1] p-10 shadow-[0_30px_120px_rgba(133,76,58,0.12)] paper-panel">
          <div className="space-y-2">
            <p className="text-sm uppercase tracking-[0.35em] text-[#a23825]">{t.studio}</p>
            <h1 className="text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl">
              {t.connexion}
            </h1>
            <p className="text-base text-[#7d5a4e]">{t.bienvenue}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-[#7d5a4e]">
                {t.email}
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-[1.5rem] border border-[#d99f8b] bg-white px-4 py-3 text-slate-900 placeholder-[#b8a49f] transition focus:border-[#d94d33] focus:outline-none focus:ring-2 focus:ring-[#d94d33]/20"
                placeholder="example@email.com"
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-[#7d5a4e]">
                  {t.motDePasse}
                </label>
                <a
                  href="/forgot-password"
                  className="text-sm text-[#d94d33] hover:text-[#b33e2a] transition"
                >
                  {t.motDePasseOublie}
                </a>
              </div>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-[1.5rem] border border-[#d99f8b] bg-white px-4 py-3 text-slate-900 placeholder-[#b8a49f] transition focus:border-[#d94d33] focus:outline-none focus:ring-2 focus:ring-[#d94d33]/20"
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-full bg-[#d94d33] px-8 py-4 text-sm font-semibold text-white transition hover:bg-[#b33e2a] disabled:opacity-70 disabled:cursor-not-allowed mt-6"
            >
              {isLoading ? `${t.connexion}...` : t.connexion}
            </button>
          </form>

          {/* Divider */}
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#d99f8b]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-[#fff7f1] px-3 text-[#7d5a4e]">{t.or}</span>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center space-y-3">
            <p className="text-[#7d5a4e]">
              {t.paDeCompte}{" "}
              <Link
                href="/signin"
                className="font-semibold text-[#d94d33] hover:text-[#b33e2a] transition"
              >
                {t.allerInscription}
              </Link>
            </p>
          </div>

          {/* Info Box */}
          <div className="rounded-[1.5rem] border border-[#d99f8b] bg-[#fff3ea] p-4">
            <p className="text-sm text-[#7d5a4e]">
              ✨ {t.bienvenue}! {t.creerCompte}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
