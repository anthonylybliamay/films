'use client'

import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

export default function ForgotPasswordPage() {
  const { language } = useLanguage();
  const t = translations[language];
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    if (!email) {
      setError(t.champRequired);
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(t.emailInvalide);
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setSuccess("");
    setError("");

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      let data: { message?: string; error?: string } | null = null;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (!response.ok) {
        throw new Error(data?.error || data?.message || t.connexionErreur);
      }

      setSuccess(data?.message || t.resetEmailSent);
    } catch (err) {
      setError(err instanceof Error ? err.message : t.connexionErreur);
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
              {t.motDePasseOublie}
            </h1>
            <p className="text-base text-[#7d5a4e]">{t.forgotPasswordDescription}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
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
              {error && <p className="text-sm text-red-600">{error}</p>}
              {success && <p className="text-sm text-green-700">{success}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-full bg-[#d94d33] px-8 py-4 text-sm font-semibold text-white transition hover:bg-[#b33e2a] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? `${t.motDePasseOublie}...` : t.sendResetLink}
            </button>
          </form>

          <div className="text-center">
            <Link href="/login" className="font-semibold text-[#d94d33] hover:text-[#b33e2a] transition">
              {t.retourLogin}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
