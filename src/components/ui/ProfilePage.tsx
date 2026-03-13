"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { ARTISTS, ARTWORKS_BY_ARTIST, VIDEOS_BY_ARTIST, ART_VIDEO_URLS, type VideoThumb, type Artwork } from "@/lib/mockData";

interface ProfilePageProps {
  artistId: number;
  onBack: () => void;
  onNavigateToArtwork: (artworkId: number) => void;
  onNavigateToCheckout?: (artworkId: number) => void;
}

function formatNumber(n: number): string {
  if (n >= 10000) return `${(n / 10000).toFixed(1)}万`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
}

// ── Icons ────────────────────────────────────────────────────────────────────

function BackArrow() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function VerifiedIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="#c4a35a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function PlayIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="white">
      <polygon points="5,3 19,12 5,21" />
    </svg>
  );
}

function HeartIcon({ filled, size = 16 }: { filled: boolean; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24"
      fill={filled ? "#ef4444" : "none"}
      stroke={filled ? "#ef4444" : "rgba(255,255,255,0.6)"}
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function MuteIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
      stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  );
}

function UnmuteIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
      stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

// ── ModalVideoCard ────────────────────────────────────────────────────────────

function ModalVideoCard({
  video,
  artistSeed,
  artistHandle,
  onClose,
  onNavigateToArtwork,
  onNavigateToCheckout,
  liked,
  onLike,
}: {
  video: VideoThumb;
  artistSeed: string;
  artistHandle: string;
  onClose: () => void;
  onNavigateToArtwork: (id: number) => void;
  onNavigateToCheckout: (id: number) => void;
  liked: boolean;
  onLike: () => void;
}) {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoUrl = ART_VIDEO_URLS[video.id % ART_VIDEO_URLS.length];

  useEffect(() => {
    const card = cardRef.current;
    const vid = videoRef.current;
    if (!card || !vid) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          vid.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
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

  return (
    <div
      ref={cardRef}
      className="relative w-full flex-shrink-0 snap-start bg-black overflow-hidden"
      style={{ height: "100dvh" }}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        poster={`https://picsum.photos/seed/${video.seed}/450/900`}
        className="absolute inset-0 w-full h-full object-cover"
        muted={isMuted}
        loop
        playsInline
        preload="metadata"
        onClick={() => setIsMuted((m) => !m)}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/40 pointer-events-none" />

      {/* Mute toggle — top right */}
      <button
        onClick={() => setIsMuted((m) => !m)}
        className="absolute top-14 right-3 z-10 w-9 h-9 rounded-full bg-black/50 flex items-center justify-center
                   border border-white/10 active:scale-90 transition-transform"
        style={{ backdropFilter: "blur(8px)" }}
      >
        {isMuted ? <MuteIcon /> : <UnmuteIcon />}
      </button>

      {/* Loading indicator */}
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
        <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white/70">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`https://picsum.photos/seed/${artistSeed}/80/80`} alt="" className="w-full h-full object-cover" />
        </div>
        <button onClick={onLike} className="flex flex-col items-center gap-1 active:scale-90 transition-transform">
          <div className={`transition-all ${liked ? "drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]" : ""}`}>
            <HeartIcon filled={liked} size={28} />
          </div>
          <span className="text-white text-xs font-semibold drop-shadow">{liked ? "1" : "0"}</span>
        </button>
        <button className="flex flex-col items-center gap-1 active:scale-90 transition-transform">
          <ShareIcon />
          <span className="text-white text-xs font-semibold drop-shadow">共有</span>
        </button>
      </div>

      {/* Purchase badge — bottom right */}
      {video.artworkId && (
        <div className="absolute right-3 bottom-24 z-10">
          <button
            onClick={() => { onClose(); onNavigateToCheckout(video.artworkId!); }}
            className="flex items-stretch overflow-hidden rounded-xl shadow-lg shadow-black/60
                       active:scale-95 transition-transform border border-white/10"
            style={{ backdropFilter: "blur(12px)", background: "rgba(232, 113, 42, 0.9)" }}
          >
            <div className="px-3 py-2 flex items-center justify-center border-r border-white/20">
              <span className="text-white font-bold text-xs">購入</span>
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
      )}

      {/* Bottom left */}
      <div className="absolute left-3 bottom-24 right-20 z-10">
        <p className="text-white font-bold text-sm mb-1 drop-shadow">{artistHandle}</p>
        {video.description && (
          <p className="text-white/85 text-sm leading-relaxed line-clamp-2 drop-shadow">{video.description}</p>
        )}
        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center gap-1">
            <PlayIcon size={10} />
            <span className="text-white/60 text-xs">{video.views} 回視聴</span>
          </div>
          {video.artworkId && (
            <button
              onClick={() => { onClose(); onNavigateToArtwork(video.artworkId!); }}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white
                         active:scale-95 transition-transform"
              style={{ background: "linear-gradient(135deg, #e8712a, #c4a35a)", boxShadow: "0 2px 8px rgba(232,113,42,0.5)" }}
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 9h18" />
              </svg>
              作品を見る
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── VideoFullscreenModal ──────────────────────────────────────────────────────

function VideoFullscreenModal({
  videos,
  startIndex,
  artistSeed,
  artistHandle,
  onClose,
  onNavigateToArtwork,
  onNavigateToCheckout,
}: {
  videos: VideoThumb[];
  startIndex: number;
  artistSeed: string;
  artistHandle: string;
  onClose: () => void;
  onNavigateToArtwork: (artworkId: number) => void;
  onNavigateToCheckout: (artworkId: number) => void;
}) {
  const [likedVideos, setLikedVideos] = useState<Set<number>>(new Set());
  const feedRef = useRef<HTMLDivElement>(null);

  // Scroll to the tapped video on mount
  useEffect(() => {
    if (feedRef.current && startIndex > 0) {
      feedRef.current.scrollTop = startIndex * window.innerHeight;
    }
  }, [startIndex]);

  const toggleLike = (id: number) => {
    setLikedVideos((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* Close button — top left, above all cards */}
      <button
        onClick={onClose}
        className="absolute top-12 left-4 z-20 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center
                   active:scale-90 transition-transform border border-white/10"
        style={{ backdropFilter: "blur(8px)" }}
      >
        <XIcon />
      </button>

      {/* Snap scroll feed */}
      <div
        ref={feedRef}
        className="h-full overflow-y-scroll snap-y snap-mandatory no-scrollbar"
        style={{ scrollSnapType: "y mandatory" }}
      >
        {videos.map((v) => (
          <ModalVideoCard
            key={v.id}
            video={v}
            artistSeed={artistSeed}
            artistHandle={artistHandle}
            onClose={onClose}
            onNavigateToArtwork={onNavigateToArtwork}
            onNavigateToCheckout={onNavigateToCheckout}
            liked={likedVideos.has(v.id)}
            onLike={() => toggleLike(v.id)}
          />
        ))}
      </div>
    </div>
  );
}

// ── ProfilePage ───────────────────────────────────────────────────────────────

export default function ProfilePage({ artistId, onBack, onNavigateToArtwork, onNavigateToCheckout }: ProfilePageProps) {
  const artist = ARTISTS[artistId] ?? ARTISTS[1];
  const artworks = ARTWORKS_BY_ARTIST[artistId] ?? [];
  const videoThumbs = VIDEOS_BY_ARTIST[artistId] ?? [];

  const [activeTab, setActiveTab] = useState<"videos" | "shop">("videos");
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(artist.followers);
  const [likedArtworks, setLikedArtworks] = useState<Set<number>>(new Set());
  const [selectedVideoIndex, setSelectedVideoIndex] = useState<number | null>(null);

  // Right swipe to go back
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!touchStartRef.current) return;
      const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
      const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
      touchStartRef.current = null;
      if (dx < -50 && Math.abs(dx) > Math.abs(dy)) {
        onBack();
      }
    },
    [onBack]
  );

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    setFollowerCount((prev) => (isFollowing ? prev - 1 : prev + 1));
  };

  const toggleArtworkLike = (id: number) => {
    setLikedArtworks((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <>
      {/* Video fullscreen modal (overlay) */}
      {selectedVideoIndex !== null && (
        <VideoFullscreenModal
          videos={videoThumbs}
          startIndex={selectedVideoIndex}
          artistSeed={artist.avatarSeed}
          artistHandle={artist.handle}
          onClose={() => setSelectedVideoIndex(null)}
          onNavigateToArtwork={(id) => { setSelectedVideoIndex(null); onNavigateToArtwork(id); }}
          onNavigateToCheckout={(id) => { setSelectedVideoIndex(null); onNavigateToCheckout(id); }}
        />
      )}

      <div
        className="h-screen overflow-y-scroll no-scrollbar bg-[#0f0b08] text-white"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="pb-8">
          {/* Top bar */}
          <div className="sticky top-0 z-20 bg-[#0f0b08]/90 backdrop-blur-md border-b border-white/[0.05] px-4 py-3 flex items-center gap-3">
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 text-white/80 active:opacity-60 transition-opacity"
            >
              <BackArrow />
              <span className="text-sm">フィードに戻る</span>
            </button>
            <span className="text-sm font-semibold flex-1 text-center pr-16">{artist.handle}</span>
          </div>

          {/* Profile header — 展示会フライヤー */}
          <div
            className="mx-4 mt-4 mb-0 rounded-xl overflow-hidden"
            style={{
              background: "#1c1510",
              borderTop: "3px solid #e8712a",
              boxShadow: "0 4px 24px rgba(0,0,0,0.5)",
            }}
          >
            <div className="px-4 pt-4 pb-0">
              {/* Name (large editorial) + avatar */}
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  {/* Split name on space: first word white, second word amber */}
                  {(() => {
                    const parts = artist.name.split(/\s+/);
                    return (
                      <>
                        <p className="text-[26px] font-black leading-none tracking-tight text-white uppercase">
                          {parts[0] ?? artist.name}
                        </p>
                        {parts[1] && (
                          <p className="text-[26px] font-black leading-none tracking-tight text-[#c4a35a] uppercase">
                            {parts[1]}
                          </p>
                        )}
                      </>
                    );
                  })()}
                  <div className="flex items-center gap-1.5 mt-2">
                    <span className="text-white/45 text-xs tracking-wide">{artist.handle}</span>
                    {artist.verified && <VerifiedIcon />}
                  </div>
                </div>
                <div className="flex-shrink-0 text-right">
                  {/* Square avatar */}
                  <div
                    className="w-14 h-14 overflow-hidden mb-1.5"
                    style={{
                      borderRadius: "4px",
                      border: "1px solid rgba(232,113,42,0.3)",
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://picsum.photos/seed/${artist.avatarSeed}/120/120`}
                      alt={artist.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-white/40 text-[10px] leading-none">作品</p>
                  <p className="text-[#c4a35a] text-xl font-bold leading-tight">{artist.posts}</p>
                </div>
              </div>

              {/* Bio — left orange border */}
              <p
                className="text-white/65 text-[13px] leading-relaxed whitespace-pre-line mb-3"
                style={{ borderLeft: "2px solid #e8712a", paddingLeft: "8px" }}
              >
                {artist.bio}
              </p>

              {/* Divider */}
              <div className="h-px bg-white/[0.08]" />

              {/* Stats + Follow button row */}
              <div className="flex items-center py-3 gap-3">
                <span className="text-white/45 text-xs">
                  フォロワー <span className="text-white font-bold text-sm">{formatNumber(followerCount)}</span>
                </span>
                <div className="w-px h-3.5 bg-white/[0.12]" />
                <span className="text-white/45 text-xs flex-1">
                  フォロー中 <span className="text-white font-bold text-sm">{formatNumber(artist.following)}</span>
                </span>
                {/* Follow button */}
                <button
                  onClick={handleFollow}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all active:scale-95
                    ${isFollowing
                      ? "bg-transparent text-white/60 border border-white/20"
                      : "bg-[#e8712a] text-white"
                    }`}
                >
                  {isFollowing ? "✓ フォロー中" : "フォロー"}
                </button>
                {/* More */}
                <button className="w-8 h-8 rounded-lg bg-[#0f0b08] border border-white/[0.08] flex items-center justify-center active:opacity-60 transition-opacity">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="5" r="1" fill="white" />
                    <circle cx="12" cy="12" r="1" fill="white" />
                    <circle cx="12" cy="19" r="1" fill="white" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Spacer */}
          <div className="h-4" />

          {/* Tabs — sliding pill indicator */}
          <div className="relative flex border-b border-white/[0.08] sticky top-[53px] z-10 bg-[#0f0b08]">
            {/* Sliding indicator */}
            <div
              className="absolute bottom-0 h-0.5 transition-all duration-300 ease-out"
              style={{
                width: "50%",
                left: activeTab === "videos" ? "0%" : "50%",
                background: "linear-gradient(90deg, transparent, #e8712a, transparent)",
                boxShadow: "0 0 8px #e8712a",
              }}
            />
            <button
              onClick={() => setActiveTab("videos")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
                activeTab === "videos" ? "text-[#c4a35a]" : "text-white/40"
              }`}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="23 7 16 12 23 17 23 7" />
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
              </svg>
              Story
            </button>
            <button
              onClick={() => setActiveTab("shop")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
                activeTab === "shop" ? "text-[#c4a35a]" : "text-white/40"
              }`}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              Art
            </button>
          </div>

          {/* Videos grid (3-column) — tappable for fullscreen */}
          {activeTab === "videos" && (
            <div className="grid grid-cols-3 gap-px bg-white/[0.04]">
              {videoThumbs.map((video) => (
                <button
                  key={video.id}
                  onClick={() => setSelectedVideoIndex(videoThumbs.indexOf(video))}
                  className="relative bg-[#111] overflow-hidden active:opacity-80 transition-opacity"
                  style={{ aspectRatio: "9 / 16" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://picsum.photos/seed/${video.seed}/200/355`}
                    alt=""
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/10" />
                  {/* Play icon — top left */}
                  <div className="absolute top-2 left-2 drop-shadow-md opacity-80">
                    <PlayIcon size={12} />
                  </div>
                  {/* View count — bottom */}
                  <div className="absolute bottom-1.5 left-1.5 flex items-center gap-1">
                    <PlayIcon size={9} />
                    <span className="text-white text-[10px] font-medium drop-shadow">{video.views}</span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Artworks grid (2-column) — framed painting gallery style */}
          {activeTab === "shop" && (
            <div className="grid grid-cols-2 gap-4 p-4">
              {/* SVG filters */}
              <svg width="0" height="0" style={{ position: "absolute" }}>
                <defs>
                  {/* Abstract oil painting filter */}
                  <filter id="abstract-paint" colorInterpolationFilters="sRGB">
                    <feTurbulence type="fractalNoise" baseFrequency="0.55" numOctaves="4" seed="8" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" xChannelSelector="R" yChannelSelector="G" result="displaced" />
                    <feColorMatrix type="saturate" values="3.5" in="displaced" result="vivid" />
                    <feComponentTransfer in="vivid">
                      <feFuncR type="linear" slope="1.3" intercept="-0.15" />
                      <feFuncG type="linear" slope="1.2" intercept="-0.1" />
                      <feFuncB type="linear" slope="1.4" intercept="-0.2" />
                    </feComponentTransfer>
                  </filter>
                  {/* Satirical sketch filter — high contrast, desaturated, ink-like */}
                  <filter id="sketch-satire" colorInterpolationFilters="sRGB">
                    <feColorMatrix type="saturate" values="0.25" result="desat" />
                    <feComponentTransfer in="desat" result="bold">
                      <feFuncR type="linear" slope="3.0" intercept="-0.9" />
                      <feFuncG type="linear" slope="3.0" intercept="-0.9" />
                      <feFuncB type="linear" slope="2.8" intercept="-0.8" />
                    </feComponentTransfer>
                    <feTurbulence type="turbulence" baseFrequency="0.9" numOctaves="2" seed="3" result="noise" />
                    <feDisplacementMap in="bold" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
                  </filter>
                </defs>
              </svg>
              {artworks.map((artwork: Artwork) => (
                <div
                  key={artwork.id}
                  className="cursor-pointer active:scale-[0.97] transition-transform"
                  onClick={() => onNavigateToArtwork(artwork.id)}
                >
                  {/* Picture frame */}
                  <div
                    className="rounded-sm"
                    style={{
                      background: "linear-gradient(145deg, #4a3f2f, #2a221a, #4a3f2f, #1e1810)",
                      padding: "7px",
                      boxShadow: "0 6px 20px rgba(0,0,0,0.75), 0 1px 3px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.4)",
                    }}
                  >
                    {/* Mat board */}
                    <div
                      style={{
                        background: "#ece8df",
                        padding: "8px",
                        boxShadow: "inset 0 2px 6px rgba(0,0,0,0.25)",
                      }}
                    >
                      {/* Artwork image — oil painting filter */}
                      <div className="relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`https://picsum.photos/seed/${artwork.seed}/300/300`}
                          alt={artwork.title}
                          className="w-full aspect-square object-cover block"
                          loading="lazy"
                          style={artwork.medium === "風刺画" ? {
                            filter: "url(#sketch-satire) brightness(1.05)",
                          } : {
                            filter: "url(#abstract-paint) contrast(1.4) brightness(0.85)",
                          }}
                        />
                        {artwork.medium === "風刺画" ? (
                          /* Hatching overlay for ink/pen drawing feel */
                          <>
                            <div
                              className="absolute inset-0 pointer-events-none"
                              style={{
                                backgroundImage: `
                                  repeating-linear-gradient(-45deg, rgba(0,0,0,0.08) 0px, rgba(0,0,0,0.08) 1px, transparent 1px, transparent 6px)
                                `,
                                mixBlendMode: "multiply",
                              }}
                            />
                            <div className="absolute inset-0 pointer-events-none"
                              style={{ background: "linear-gradient(180deg, rgba(255,252,240,0.08) 0%, rgba(200,180,140,0.12) 100%)", mixBlendMode: "overlay" }} />
                          </>
                        ) : (
                          /* Oil painting overlays */
                          <>
                            <div
                              className="absolute inset-0 pointer-events-none"
                              style={{
                                backgroundImage: `
                                  repeating-linear-gradient(-55deg, rgba(255,255,255,0.07) 0px, rgba(255,255,255,0.07) 1px, transparent 1px, transparent 9px),
                                  repeating-linear-gradient(35deg, rgba(0,0,0,0.06) 0px, rgba(0,0,0,0.06) 1px, transparent 1px, transparent 14px)
                                `,
                                mixBlendMode: "overlay",
                              }}
                            />
                            <div
                              className="absolute inset-0 pointer-events-none"
                              style={{
                                background: "linear-gradient(160deg, rgba(120,80,40,0.12) 0%, rgba(40,30,80,0.18) 60%, rgba(0,0,0,0.22) 100%)",
                                mixBlendMode: "multiply",
                              }}
                            />
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Info below frame */}
                  <div className="pt-2 px-0.5">
                    <p className="text-white/90 text-xs font-medium truncate mb-1.5">{artwork.title}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        {/* Medium */}
                        <span className="text-[10px] text-white/50 bg-white/[0.06] px-1.5 py-0.5 rounded border border-white/[0.08]">
                          {artwork.medium}
                        </span>
                        {/* 1点もの / 限定版 */}
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded
                          ${artwork.isOriginal ? "text-[#c4a35a]/80" : "text-amber-400/80"}`}>
                          {artwork.isOriginal ? "1点もの" : "限定版"}
                        </span>
                      </div>
                      {/* Like */}
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleArtworkLike(artwork.id); }}
                        className="flex items-center gap-1 active:scale-90 transition-transform"
                      >
                        <div className={likedArtworks.has(artwork.id) ? "drop-shadow-[0_0_4px_rgba(239,68,68,0.7)]" : ""}>
                          <HeartIcon filled={likedArtworks.has(artwork.id)} size={13} />
                        </div>
                        <span className="text-white/40 text-[10px]">
                          {formatNumber(artwork.likes + (likedArtworks.has(artwork.id) ? 1 : 0))}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
