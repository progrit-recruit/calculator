"use client";

import { useState } from "react";
import { ARTWORK_MAP, ARTISTS } from "@/lib/mockData";

interface ArtworkDetailProps {
  artworkId: number;
  onBack: () => void;
  onPurchase: () => void;
}

function formatNumber(n: number): string {
  if (n >= 10000) return `${(n / 10000).toFixed(1)}万`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
}

function BackArrow() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24"
      fill={filled ? "#ef4444" : "none"}
      stroke={filled ? "#ef4444" : "rgba(245,237,224,0.7)"}
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="rgba(245,237,224,0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

export default function ArtworkDetail({ artworkId, onBack, onPurchase }: ArtworkDetailProps) {
  const artwork = ARTWORK_MAP[artworkId];
  const artist = artwork ? ARTISTS[artwork.artistId] : null;
  const [liked, setLiked] = useState(false);

  if (!artwork || !artist) {
    return (
      <div className="h-screen bg-[#0f0b08] flex flex-col items-center justify-center gap-4 text-white/60">
        <p>作品が見つかりません</p>
        <button
          onClick={onBack}
          className="text-[#c4a35a] text-sm underline"
        >
          戻る
        </button>
      </div>
    );
  }

  const likeCount = artwork.likes + (liked ? 1 : 0);

  return (
    <div className="h-screen overflow-y-scroll no-scrollbar bg-[#0f0b08] text-white">
      {/* Sticky header */}
      <div className="sticky top-0 z-20 bg-[#0f0b08]/90 backdrop-blur-md border-b border-white/[0.05] px-4 py-3 flex items-center gap-3">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-white/80 active:opacity-60 transition-opacity"
        >
          <BackArrow />
          <span className="text-sm">戻る</span>
        </button>
        <span className="text-sm font-semibold flex-1 text-center pr-20">作品詳細</span>
      </div>

      {/* Artwork image — full width, square */}
      <div className="w-full aspect-square bg-[#1c1510] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://picsum.photos/seed/${artwork.seed}/600/600`}
          alt={artwork.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="px-4 pt-4 pb-40">
        {/* Title + actions row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <h1 className="text-xl font-bold leading-tight flex-1">{artwork.title}</h1>
          <div className="flex items-center gap-3 pt-0.5">
            <button
              onClick={() => setLiked(!liked)}
              className="flex items-center gap-1.5 active:scale-90 transition-transform"
            >
              <div className={`transition-all ${liked ? "drop-shadow-[0_0_6px_rgba(239,68,68,0.7)]" : ""}`}>
                <HeartIcon filled={liked} />
              </div>
              <span className="text-white/60 text-sm">{formatNumber(likeCount)}</span>
            </button>
            <button className="active:scale-90 transition-transform">
              <ShareIcon />
            </button>
          </div>
        </div>

        {/* Artist info */}
        <button
          onClick={onBack}
          className="flex items-center gap-2.5 mb-4 active:opacity-70 transition-opacity"
        >
          <div className="w-9 h-9 rounded-full overflow-hidden ring-1 ring-[#e8712a]/50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://picsum.photos/seed/${artist.avatarSeed}/80/80`}
              alt={artist.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-white text-sm font-medium leading-tight">{artist.name}</p>
            <p className="text-[#c4a35a] text-xs">{artist.handle}</p>
          </div>
          <div className="ml-auto w-px h-8 bg-gradient-to-b from-transparent via-[#e8712a]/40 to-transparent" />
        </button>

        <div className="h-px bg-white/[0.06] mb-4" />

        {/* Description */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1 h-3.5 bg-[#e8712a] rounded-full" />
            <h2 className="text-white/50 text-xs font-semibold uppercase tracking-wider">作品について</h2>
          </div>
          <p className="text-white/80 text-sm leading-relaxed whitespace-pre-line">{artwork.description}</p>
        </div>

        {/* Condition chip row */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 pl-2 border-l-2 border-[#e8712a]">
            <span className="text-[#c4a35a] text-xs font-medium">美品</span>
          </div>
          <div className="flex items-center gap-1.5 pl-2 border-l-2 border-white/20">
            <span className="text-white/40 text-xs">送料: 880円</span>
          </div>
          <div className="flex items-center gap-1.5 pl-2 border-l-2 border-white/20">
            <span className="text-white/40 text-xs">3〜5営業日</span>
          </div>
        </div>
      </div>

      {/* Fixed bottom: Price + Purchase button */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0f0b08]/96 backdrop-blur-xl border-t border-white/[0.06] px-4 pt-3 pb-safe">
        <div className="flex items-baseline gap-2 mb-3">
          <p className="text-white font-bold text-2xl tracking-tight">{artwork.price}</p>
          <p className="text-white/35 text-xs">税込・送料別</p>
        </div>

        {/* Split purchase button */}
        <div className="relative">
          <button
            onClick={onPurchase}
            className="w-full flex items-stretch overflow-hidden rounded-2xl shadow-lg shadow-[#1a0f08]/60
                       relative z-10 transition-transform active:translate-y-0.5 active:translate-x-0.5"
          >
            <div className="bg-[#2a1a0e] px-5 py-3.5 flex items-center justify-center border-r border-[#e8712a]/30">
              <ShieldIcon />
            </div>
            <div className="flex-1 bg-[#e8712a] py-3.5 flex items-center justify-center">
              <span className="text-white font-bold text-base">購入画面へ進む</span>
            </div>
          </button>
          <div className="absolute inset-0 rounded-2xl bg-[#1a0f08] translate-y-1 translate-x-1 z-0" />
        </div>
      </div>
    </div>
  );
}
