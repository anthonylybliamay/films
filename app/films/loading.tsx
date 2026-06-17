export default function Loading() {
  return (
    <div className="min-h-[40vh] grid place-items-center bg-transparent text-slate-900">
      <div className="flex flex-col items-center gap-3 rounded-[2rem] border border-[#d99f8b] bg-[#fff7f1] px-8 py-10 paper-panel">
        <div className="h-12 w-12 rounded-full border-4 border-[#d94d33] border-t-transparent animate-spin" />
        <p className="mt-2 text-base text-[#a23524]">Chargement des informations du film…</p>
      </div>
    </div>
  );
}
