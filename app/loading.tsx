export default function Loading() {
  return (
    <div className="min-h-screen grid place-items-center bg-transparent text-slate-900">
      <div className="flex flex-col items-center gap-4 rounded-[2rem] border border-[#d99f8b] bg-[#fff7f1] px-8 py-12 shadow-[0_24px_80px_rgba(133,76,58,0.1)] paper-panel">
        <div className="h-16 w-16 rounded-full border-4 border-[#d94d33] border-t-transparent animate-spin" />
        <p className="text-lg font-semibold text-[#a23524]">Chargement du catalogue Studio Ghibli…</p>
      </div>
    </div>
  );
}
