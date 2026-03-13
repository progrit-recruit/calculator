"use client";

import { useRouter } from "next/navigation";

export default function NotificationsPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      {/* Header */}
      <div className="bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/[0.05] px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-white/70 active:opacity-50 transition-opacity"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <span className="text-sm">戻る</span>
        </button>
        <span className="text-sm font-semibold flex-1 text-center pr-12">通知</span>
      </div>

      {/* Body */}
      <div className="flex-1 flex flex-col items-center justify-center gap-6 px-8">
        <div className="w-20 h-20 rotate-45 bg-[#161616] border border-white/[0.06] flex items-center justify-center rounded-xl">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
            stroke="rgba(139,92,246,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            className="-rotate-45">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </div>
        <div className="text-center">
          <h1 className="text-white font-bold text-xl mb-2">通知画面</h1>
          <p className="text-white/40 text-sm leading-relaxed">
            この機能は現在開発中です。<br />
            いいね・コメント・フォロー通知が届くようになります。
          </p>
        </div>
        <div className="relative mt-2">
          <button
            onClick={() => router.back()}
            className="px-8 py-3 bg-purple-600 rounded-2xl font-bold text-sm text-white
                       relative z-10 transition-transform active:translate-y-0.5 active:translate-x-0.5"
          >
            ← フィードに戻る
          </button>
          <div className="absolute inset-0 rounded-2xl bg-purple-900 translate-y-0.5 translate-x-0.5 z-0" />
        </div>
      </div>
    </div>
  );
}
