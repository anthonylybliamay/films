'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { translations } from "@/lib/translations";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

export default function SigninPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const { signup } = useAuth();
  const t = translations[language];
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<{
    nom?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: {
      nom?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    if (!formData.nom) {
      newErrors.nom = t.champRequired;
    }

    if (!formData.email) {
      newErrors.email = t.champRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t.emailInvalide;
    }

    if (!formData.password) {
      newErrors.password = t.champRequired;
    } else if (formData.password.length < 8) {
      newErrors.password = t.motDePasseCourt;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = t.champRequired;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t.motDePasseNoMatch;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await signup(formData.nom, formData.email, formData.password);
      // Créer un cookie pour le middleware
      document.cookie = `authToken=${Math.random().toString(36).substr(2)}; path=/; max-age=86400`;
      router.push("/films");
    } catch (error) {
      console.error("Erreur d'inscription:", error);
      const errorMessage = error instanceof Error ? error.message : "Erreur d'inscription";
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
              {t.inscription}
            </h1>
            <p className="text-base text-[#7d5a4e]">{t.creerCompte}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name Field */}
            <div className="space-y-2">
              <label htmlFor="nom" className="block text-sm font-medium text-[#7d5a4e]">
                {t.nom}
              </label>
              <input
                type="text"
                id="nom"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                className="w-full rounded-[1.5rem] border border-[#d99f8b] bg-white px-4 py-3 text-slate-900 placeholder-[#b8a49f] transition focus:border-[#d94d33] focus:outline-none focus:ring-2 focus:ring-[#d94d33]/20"
                placeholder="Jean Dupont"
              />
              {errors.nom && (
                <p className="text-sm text-red-600">{errors.nom}</p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-[#7d5a4e]">
                {t.email}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-[1.5rem] border border-[#d99f8b] bg-white px-4 py-3 text-slate-900 placeholder-[#b8a49f] transition focus:border-[#d94d33] focus:outline-none focus:ring-2 focus:ring-[#d94d33]/20"
                placeholder="example@email.com"
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-[#7d5a4e]">
                {t.motDePasse}
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-[1.5rem] border border-[#d99f8b] bg-white px-4 py-3 text-slate-900 placeholder-[#b8a49f] transition focus:border-[#d94d33] focus:outline-none focus:ring-2 focus:ring-[#d94d33]/20"
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="text-sm text-red-600">{errors.password}</p>
              )}
              <p className="text-xs text-[#7d5a4e]">{t.atleasteight}</p>
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-[#7d5a4e]"
              >
                {t.confirmMotDePasse}
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full rounded-[1.5rem] border border-[#d99f8b] bg-white px-4 py-3 text-slate-900 placeholder-[#b8a49f] transition focus:border-[#d94d33] focus:outline-none focus:ring-2 focus:ring-[#d94d33]/20"
                placeholder="••••••••"
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-600">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-full bg-[#d94d33] px-8 py-4 text-sm font-semibold text-white transition hover:bg-[#b33e2a] disabled:opacity-70 disabled:cursor-not-allowed mt-6"
            >
              {isLoading ? `${t.inscription}...` : t.sInscrire}
            </button>
          </form>

          {/* Divider */}
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#d99f8b]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-[#fff7f1] px-3 text-[#7d5a4e]">{t.or2}</span>
            </div>
          </div>

          {/* Sign In Link */}
          <div className="text-center space-y-3">
            <p className="text-[#7d5a4e]">
              {t.avezCompte}{" "}
              <Link
                href="/login"
                className="font-semibold text-[#d94d33] hover:text-[#b33e2a] transition"
              >
                {t.allerConnexion}
              </Link>
            </p>
          </div>

          {/* Info Box */}
          <div className="rounded-[1.5rem] border border-[#d99f8b] bg-[#fff3ea] p-4">
            <p className="text-sm text-[#7d5a4e]">
              🎬 {t.bienvenue}! {t.creerCompte}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
