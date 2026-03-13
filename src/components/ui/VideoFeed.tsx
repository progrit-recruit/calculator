"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import NavBar from "@/components/ui/NavBar";
import { VIDEOS, ARTISTS, EXHIBITION_ADS, type Video, type Artist, type ExhibitionAd } from "@/lib/mockData";

interface VideoFeedProps {
  onNavigateToProfile: (artistId: number) => void;
  onNavigateToArtwork: (artworkId: number) => void;
  onNavigateToCheckout: (artworkId: number) => void;
}

function formatNumber(n: number): string {
  if (n >= 10000) return `${(n / 10000).toFixed(1)}万`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
}

// ── Icons ────────────────────────────────────────────────────────────────────

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24"
      fill={filled ? "#ef4444" : "none"}
      stroke={filled ? "#ef4444" : "white"}
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function CommentIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
      stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
      stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

function MuteIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  );
}

function UnmuteIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    </svg>
  );
}

// ── VideoCard ────────────────────────────────────────────────────────────────

function VideoCard({
  video,
  artist,
  liked,
  likeCount,
  onLike,
  onArtistTap,
  onPurchaseTap,
}: {
  video: Video;
  artist: Artist;
  liked: boolean;
  likeCount: number;
  onLike: () => void;
  onArtistTap: () => void;
  onPurchaseTap: () => void;
}) {
  const [isMuted, setIsMuted] = useState(true);
  const [descExpanded, setDescExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // IntersectionObserver: play when ≥50% visible, pause otherwise.
  // CSS transform (translateX) moves the feed off-screen → IntersectionObserver
  // correctly reports the card as non-intersecting → video auto-pauses.
  useEffect(() => {
    const card = cardRef.current;
    const vid = videoRef.current;
    if (!card || !vid) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          vid.play()
            .then(() => setIsPlaying(true))
            .catch(() => setIsPlaying(false));
        } else {
          vid.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  // Tap video area to toggle mute
  const handleVideoTap = () => setIsMuted((m) => !m);

  return (
    <div
      ref={cardRef}
      className="relative w-full flex-shrink-0 snap-start bg-black overflow-hidden"
      style={{ height: "100dvh" }}
    >
      {/* ── Video element ── */}
      <video
        ref={videoRef}
        src={video.videoUrl}
        // picsum image shown while video buffers
        poster={`https://picsum.photos/seed/${video.thumbnailSeed}/450/900`}
        className="absolute inset-0 w-full h-full object-cover"
        muted={isMuted}
        loop
        playsInline
        preload="metadata"
        onClick={handleVideoTap}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/20 pointer-events-none" />

      {/* Mute indicator — top right corner */}
      <button
        onClick={handleVideoTap}
        className="absolute top-14 right-3 z-10 w-9 h-9 rounded-full bg-black/50 flex items-center justify-center
                   border border-white/10 active:scale-90 transition-transform"
        style={{ backdropFilter: "blur(8px)" }}
        aria-label={isMuted ? "ミュート解除" : "ミュート"}
      >
        {isMuted ? <MuteIcon /> : <UnmuteIcon />}
      </button>

      {/* Loading indicator when buffering */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-14 h-14 rounded-full bg-black/40 flex items-center justify-center border border-white/20"
            style={{ backdropFilter: "blur(8px)" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          </div>
        </div>
      )}

      {/* Right sidebar */}
      <div className="absolute right-3 bottom-36 flex flex-col items-center gap-5 z-10">
        {/* Artist avatar with follow "+" */}
        <div className="relative">
          <div className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-white/80">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://picsum.photos/seed/${artist.avatarSeed}/100/100`}
              alt={artist.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-[#e8712a] flex items-center justify-center shadow-md">
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </div>
        </div>

        {/* Like */}
        <button
          onClick={onLike}
          className="flex flex-col items-center gap-1 active:scale-90 transition-transform"
        >
          <div className={`transition-all duration-200 ${liked ? "drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]" : ""}`}>
            <HeartIcon filled={liked} />
          </div>
          <span className="text-white text-xs font-semibold drop-shadow-md">{formatNumber(likeCount)}</span>
        </button>

        {/* Comment */}
        <button className="flex flex-col items-center gap-1 active:scale-90 transition-transform">
          <CommentIcon />
          <span className="text-white text-xs font-semibold drop-shadow-md">{formatNumber(video.comments)}</span>
        </button>

        {/* Share */}
        <button className="flex flex-col items-center gap-1 active:scale-90 transition-transform">
          <ShareIcon />
          <span className="text-white text-xs font-semibold drop-shadow-md">{formatNumber(video.shares)}</span>
        </button>
      </div>

      {/* Left bottom: tappable artist handle + description */}
      <div className="absolute left-3 bottom-36 right-20 z-10">
        <button
          onClick={onArtistTap}
          className="text-white font-bold text-sm underline underline-offset-2 decoration-white/60 mb-1.5 block text-left active:opacity-70 transition-opacity"
        >
          {artist.handle}
        </button>
        <p className={`text-white/90 text-sm leading-relaxed drop-shadow ${!descExpanded ? "line-clamp-2" : ""}`}>
          {video.description}
        </p>
        {video.description.length > 50 && (
          <button
            onClick={() => setDescExpanded(!descExpanded)}
            className="text-white/55 text-xs mt-0.5"
          >
            {descExpanded ? "閉じる" : "続きを読む"}
          </button>
        )}
      </div>

      {/* Right bottom: Purchase badge — glass-morphism split design */}
      <div className="absolute right-3 bottom-24 z-10">
        <button
          onClick={onPurchaseTap}
          className="flex items-stretch overflow-hidden rounded-xl shadow-lg shadow-black/60
                     active:scale-95 transition-transform border border-white/10"
          style={{ backdropFilter: "blur(12px)", background: "rgba(232, 113, 42, 0.9)" }}
        >
          <div className="px-3 py-2 flex items-center justify-center border-r border-white/20">
            <span className="text-white font-bold text-xs">{video.price}</span>
          </div>
          <div className="px-2.5 py-2 flex items-center justify-center bg-white/10">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
}

// ── AdCard ───────────────────────────────────────────────────────────────────

function AdCard({ ad }: { ad: ExhibitionAd }) {
  const typeColor = ad.type === "個展"
    ? { bg: "rgba(232,113,42,0.9)", label: "個展 PR" }
    : ad.type === "グループ展"
    ? { bg: "rgba(196,163,90,0.9)", label: "グループ展 PR" }
    : { bg: "rgba(180,60,60,0.85)", label: "アートフェア PR" };

  return (
    <div
      className="relative w-full flex-shrink-0 snap-start overflow-hidden bg-[#0f0b08]"
      style={{ height: "100dvh" }}
    >
      {/* Background image — blurred */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://picsum.photos/seed/${ad.bgSeed}/450/900`}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "blur(2px) brightness(0.35)", transform: "scale(1.05)" }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20 pointer-events-none" />

      {/* PR badge — top left */}
      <div className="absolute top-14 left-4 z-10">
        <span
          className="text-white text-[10px] font-bold px-2 py-1 rounded-md tracking-wider"
          style={{ background: typeColor.bg }}
        >
          {typeColor.label}
        </span>
      </div>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6">
        {/* Artwork preview — square frame */}
        <div
          className="w-56 h-56 mb-6 overflow-hidden"
          style={{
            borderRadius: "4px",
            border: "1px solid rgba(232,113,42,0.4)",
            boxShadow: "0 8px 40px rgba(0,0,0,0.8), 0 0 0 4px rgba(232,113,42,0.08)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://picsum.photos/seed/${ad.bgSeed}/400/400`}
            alt={ad.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Exhibition title */}
        <p className="text-white/50 text-xs tracking-[3px] uppercase mb-1">{ad.type}</p>
        <h2 className="text-white text-3xl font-black tracking-tight text-center leading-tight mb-1">
          {ad.title}
        </h2>
        <p className="text-[#c4a35a] text-sm font-medium text-center mb-5">{ad.subtitle}</p>

        {/* Info pills */}
        <div className="flex flex-col items-center gap-2 mb-6 w-full max-w-xs">
          <div className="flex items-center gap-2 w-full justify-center">
            <div className="flex items-center gap-1.5 bg-white/[0.06] border border-white/[0.1] rounded-lg px-3 py-1.5 flex-1 justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c4a35a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span className="text-white/80 text-xs font-medium">{ad.dates}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full justify-center">
            <div className="flex items-center gap-1.5 bg-white/[0.06] border border-white/[0.1] rounded-lg px-3 py-1.5 flex-1 justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c4a35a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
              </svg>
              <span className="text-white/80 text-xs font-medium">{ad.venue}　{ad.area}</span>
            </div>
          </div>
        </div>

        {/* CTA button */}
        <div className="relative w-full max-w-xs">
          <button
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-white font-bold text-sm
                       relative z-10 active:translate-y-0.5 active:translate-x-0.5 transition-transform"
            style={{ background: "linear-gradient(135deg, #e8712a, #c4a35a)" }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            詳細・来場予約
          </button>
          <div className="absolute inset-0 rounded-2xl bg-[#1a0f08] translate-y-1 translate-x-1 z-0" />
        </div>
      </div>

      {/* Artist credit — bottom */}
      <div className="absolute bottom-28 left-4 right-4 z-10 flex items-center gap-2">
        <div className="w-7 h-7 rounded-full overflow-hidden ring-1 ring-[#e8712a]/50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`https://picsum.photos/seed/${ad.avatarSeed}/60/60`} alt="" className="w-full h-full object-cover" />
        </div>
        <div>
          <p className="text-white/70 text-xs">{ad.artistName}</p>
          <p className="text-[#c4a35a] text-[10px]">{ad.artistHandle}</p>
        </div>
        <div className="ml-auto">
          <span className="text-white/30 text-[10px]">広告</span>
        </div>
      </div>
    </div>
  );
}

// ── VideoFeed ────────────────────────────────────────────────────────────────

export default function VideoFeed({ onNavigateToProfile, onNavigateToArtwork, onNavigateToCheckout }: VideoFeedProps) {
  const [likedVideos, setLikedVideos] = useState<Set<number>>(new Set());
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const feedRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const handleScroll = useCallback(() => {
    if (!feedRef.current) return;
    const index = Math.min(
      Math.round(feedRef.current.scrollTop / window.innerHeight),
      VIDEOS.length - 1
    );
    setCurrentVideoIndex(index);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!touchStartRef.current) return;
      const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
      const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
      touchStartRef.current = null;

      if (dx > 50 && Math.abs(dx) > Math.abs(dy)) {
        onNavigateToProfile(VIDEOS[currentVideoIndex].artistId);
      }
    },
    [currentVideoIndex, onNavigateToProfile]
  );

  const toggleLike = (id: number) => {
    setLikedVideos((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div
      ref={feedRef}
      className="fixed inset-0 overflow-y-scroll snap-y snap-mandatory no-scrollbar"
      style={{ scrollSnapType: "y mandatory" }}
      onScroll={handleScroll}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {VIDEOS.flatMap((video, i) => {
        const artist = ARTISTS[video.artistId];
        const card = (
          <VideoCard
            key={`v-${video.id}`}
            video={video}
            artist={artist}
            liked={likedVideos.has(video.id)}
            likeCount={video.likes + (likedVideos.has(video.id) ? 1 : 0)}
            onLike={() => toggleLike(video.id)}
            onArtistTap={() => onNavigateToProfile(video.artistId)}
            onPurchaseTap={() => onNavigateToCheckout(video.artworkId)}
          />
        );
        // Insert ad after every 3rd video (index 2, 5, ...)
        if ((i + 1) % 3 === 0) {
          const ad = EXHIBITION_ADS[Math.floor((i + 1) / 3 - 1) % EXHIBITION_ADS.length];
          return [card, <AdCard key={`ad-${ad.id}-${i}`} ad={ad} />];
        }
        return [card];
      })}
      <NavBar onMyPage={() => onNavigateToProfile(1)} />
    </div>
  );
}
