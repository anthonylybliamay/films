'use client'

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { language } = useLanguage();
  const t = translations[language];
  
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tokenInvalid, setTokenInvalid] = useState(false);

  useEffect(() => {
    if (!token) {
      setTokenInvalid(true);
      setError(t.invalidResetLink || "Invalid reset link");
    }
  }, [token, t]);

  const validateForm = () => {
    if (!password) {
      setError(t.champRequired);
      return false;
    }

    if (password.length < 8) {
      setError(t.motDePasseCourt);
      return false;
    }

    if (!confirmPassword) {
      setError(t.champRequired);
      return false;
    }

    if (password !== confirmPassword) {
      setError(t.motDePasseNoMatch);
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || !token) return;

    setIsLoading(true);
    setSuccess("");
    setError("");

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password, confirmPassword }),
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

      setSuccess(data?.message || (t.passwordResetSuccess || "Your password has been reset successfully."));
      setPassword("");
      setConfirmPassword("");
      
      // Rediriger vers la page de connexion après 2 secondes
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : t.connexionErreur);
    } finally {
      setIsLoading(false);
    }
  };

  if (tokenInvalid) {
    return (
      <main className="min-h-screen bg-transparent text-slate-900">
        <div className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center gap-10 px-6 py-16 sm:px-8">
          <div className="space-y-8 rounded-[2.5rem] border border-[#d99f8b] bg-[#fff7f1] p-10 shadow-[0_30px_120px_rgba(133,76,58,0.12)] paper-panel">
            <div className="space-y-2">
              <p className="text-sm uppercase tracking-[0.35em] text-[#a23825]">{t.studio}</p>
              <h1 className="text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl">
                {t.motDePasseOublie}
              </h1>
            </div>

            <div className="rounded-[1rem] border border-red-200 bg-red-50 p-4">
              <p className="text-sm text-red-700">
                {error || (t.invalidResetLink || "The reset link is invalid or has expired.")}
              </p>
            </div>

            <div className="text-center">
              <Link
                href="/forgot-password"
                className="font-semibold text-[#d94d33] hover:text-[#b33e2a] transition"
              >
                {t.requestNewResetLink || "Request a new reset link"}
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-transparent text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center gap-10 px-6 py-16 sm:px-8">
        <div className="space-y-8 rounded-[2.5rem] border border-[#d99f8b] bg-[#fff7f1] p-10 shadow-[0_30px_120px_rgba(133,76,58,0.12)] paper-panel">
          <div className="space-y-2">
            <p className="text-sm uppercase tracking-[0.35em] text-[#a23825]">{t.studio}</p>
            <h1 className="text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl">
              {t.motDePasseOublie}
            </h1>
            <p className="text-base text-[#7d5a4e]">
              {t.enterNewPassword || "Enter your new password"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-[#7d5a4e]">
                {t.motDePasse}
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-[1.5rem] border border-[#d99f8b] bg-white px-4 py-3 text-slate-900 placeholder-[#b8a49f] transition focus:border-[#d94d33] focus:outline-none focus:ring-2 focus:ring-[#d94d33]/20"
                placeholder="••••••••"
              />
              <p className="text-xs text-[#7d5a4e]">{t.atleasteight}</p>
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#7d5a4e]">
                {t.confirmMotDePasse}
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-[1.5rem] border border-[#d99f8b] bg-white px-4 py-3 text-slate-900 placeholder-[#b8a49f] transition focus:border-[#d94d33] focus:outline-none focus:ring-2 focus:ring-[#d94d33]/20"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="rounded-[1rem] border border-red-200 bg-red-50 p-4">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {success && (
              <div className="rounded-[1rem] border border-green-200 bg-green-50 p-4">
                <p className="text-sm text-green-700">{success}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-full bg-[#d94d33] px-8 py-4 text-sm font-semibold text-white transition hover:bg-[#b33e2a] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? `${t.motDePasseOublie}...` : (t.resetPassword || "Reset Password")}
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
