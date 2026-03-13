"use client";

import { useState, useRef } from "react";
import VideoFeed from "@/components/ui/VideoFeed";
import ProfilePage from "@/components/ui/ProfilePage";
import ArtworkDetail from "@/components/ui/ArtworkDetail";
import CheckoutPage from "@/components/ui/CheckoutPage";

type Screen = "feed" | "profile" | "artwork" | "checkout";

const SCREEN_INDEX: Record<Screen, number> = {
  feed: 0,
  profile: 1,
  artwork: 2,
  checkout: 3,
};

const TRANSITION = "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)";

// Returns true if `screen` is being "jumped over" during a non-adjacent transition,
// which would cause it to flash across the viewport.
function isJumpedOver(screen: Screen, from: Screen | null, to: Screen): boolean {
  if (!from) return false;
  const fromIdx = SCREEN_INDEX[from];
  const toIdx = SCREEN_INDEX[to];
  const screenIdx = SCREEN_INDEX[screen];
  if (fromIdx === toIdx) return false;
  const lo = Math.min(fromIdx, toIdx);
  const hi = Math.max(fromIdx, toIdx);
  // Screen is "in-between" but not the source or destination
  return screenIdx > lo && screenIdx < hi;
}

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("feed");
  const prevScreenRef = useRef<Screen | null>(null);
  const [artistId, setArtistId] = useState<number>(1);
  const [artworkId, setArtworkId] = useState<number | null>(null);
  // Track where artwork was opened from so back button goes to correct screen
  const artworkOriginRef = useRef<Screen>("profile");
  // Track where checkout was opened from (artwork detail vs direct from feed)
  const checkoutOriginRef = useRef<Screen>("artwork");

  const navigate = (to: Screen) => {
    prevScreenRef.current = currentScreen;
    setCurrentScreen(to);
    // Clear prevScreen reference after transition completes
    setTimeout(() => { prevScreenRef.current = null; }, 400);
  };

  const getStyle = (screen: Screen): React.CSSProperties => {
    const hidden = isJumpedOver(screen, prevScreenRef.current, currentScreen);
    return {
      position: "absolute",
      inset: 0,
      transform: `translateX(${(SCREEN_INDEX[screen] - SCREEN_INDEX[currentScreen]) * 100}%)`,
      transition: TRANSITION,
      willChange: "transform",
      visibility: hidden ? "hidden" : "visible",
    };
  };

  const goToProfile = (id: number) => {
    setArtistId(id);
    navigate("profile");
  };

  const goToFeed = () => navigate("feed");

  const goToArtwork = (id: number, origin: Screen = "profile") => {
    setArtworkId(id);
    artworkOriginRef.current = origin;
    navigate("artwork");
  };

  const goBackFromArtwork = () => navigate(artworkOriginRef.current);

  const goToCheckout = () => {
    checkoutOriginRef.current = "artwork";
    navigate("checkout");
  };

  const goToCheckoutDirect = (id: number) => {
    setArtworkId(id);
    checkoutOriginRef.current = "feed";
    navigate("checkout");
  };

  const goBackFromCheckout = () => navigate(checkoutOriginRef.current);

  return (
    <div className="fixed inset-0 overflow-hidden">
      <div style={getStyle("feed")}>
        <VideoFeed
          onNavigateToProfile={goToProfile}
          onNavigateToArtwork={(id) => goToArtwork(id, "feed")}
          onNavigateToCheckout={goToCheckoutDirect}
        />
      </div>
      <div style={getStyle("profile")}>
        <ProfilePage
          artistId={artistId}
          onBack={goToFeed}
          onNavigateToArtwork={(id) => goToArtwork(id, "profile")}
          onNavigateToCheckout={goToCheckoutDirect}
        />
      </div>
      <div style={getStyle("artwork")}>
        {artworkId !== null && (
          <ArtworkDetail
            artworkId={artworkId}
            onBack={goBackFromArtwork}
            onPurchase={goToCheckout}
          />
        )}
      </div>
      <div style={getStyle("checkout")}>
        {artworkId !== null && (
          <CheckoutPage
            artworkId={artworkId}
            onBack={goBackFromCheckout}
          />
        )}
      </div>
    </div>
  );
}
