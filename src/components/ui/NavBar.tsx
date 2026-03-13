"use client";

import { usePathname, useRouter } from "next/navigation";

interface NavBarProps {
  /** Called when "マイページ" is tapped (overrides router.push("/profile")) */
  onMyPage?: () => void;
}

const HomeIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke={active ? "#c4a35a" : "rgba(245,237,224,0.4)"}
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const SearchIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke={active ? "#c4a35a" : "rgba(245,237,224,0.4)"}
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const BellIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke={active ? "#c4a35a" : "rgba(245,237,224,0.4)"}
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const UserIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke={active ? "#c4a35a" : "rgba(245,237,224,0.4)"}
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export default function NavBar({ onMyPage }: NavBarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50"
      style={{ background: "rgba(15,11,8,0.92)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(245,237,224,0.05)" }}>
      <div className="flex items-center justify-around px-1 pt-2 pb-safe max-w-lg mx-auto">
        {/* Home */}
        <button
          onClick={() => router.push("/")}
          className="flex flex-col items-center gap-1 py-1 min-w-[52px] active:opacity-60 transition-opacity relative"
        >
          <HomeIcon active={isActive("/")} />
          {isActive("/") && (
            <span className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-[#e8712a]" />
          )}
          <span className={`text-[10px] font-medium ${isActive("/") ? "text-[#c4a35a]" : "text-[#f5ede0]/35"}`}>
            ホーム
          </span>
        </button>

        {/* Explore */}
        <button
          onClick={() => router.push("/explore")}
          className="flex flex-col items-center gap-1 py-1 min-w-[52px] active:opacity-60 transition-opacity relative"
        >
          <SearchIcon active={isActive("/explore")} />
          {isActive("/explore") && (
            <span className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-[#e8712a]" />
          )}
          <span className={`text-[10px] font-medium ${isActive("/explore") ? "text-[#c4a35a]" : "text-[#f5ede0]/35"}`}>
            探す
          </span>
        </button>

        {/* Post — diamond shape (unique) */}
        <button
          onClick={() => router.push("/post")}
          className="flex items-center justify-center active:scale-90 transition-transform"
        >
          <div className="w-12 h-12 bg-[#e8712a] rotate-45 flex items-center justify-center rounded-lg shadow-lg shadow-[#2a1a0e]/60">
            <svg
              width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="white" strokeWidth="2.5" strokeLinecap="round"
              className="-rotate-45"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </div>
        </button>

        {/* Notifications */}
        <button
          onClick={() => router.push("/notifications")}
          className="flex flex-col items-center gap-1 py-1 min-w-[52px] active:opacity-60 transition-opacity relative"
        >
          <BellIcon active={isActive("/notifications")} />
          {isActive("/notifications") && (
            <span className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-[#e8712a]" />
          )}
          <span className={`text-[10px] font-medium ${isActive("/notifications") ? "text-[#c4a35a]" : "text-[#f5ede0]/35"}`}>
            通知
          </span>
        </button>

        {/* My Page */}
        <button
          onClick={onMyPage ? onMyPage : () => router.push("/profile")}
          className="flex flex-col items-center gap-1 py-1 min-w-[52px] active:opacity-60 transition-opacity relative"
        >
          <UserIcon active={isActive("/profile")} />
          {isActive("/profile") && (
            <span className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-[#e8712a]" />
          )}
          <span className={`text-[10px] font-medium ${isActive("/profile") ? "text-[#c4a35a]" : "text-[#f5ede0]/35"}`}>
            マイページ
          </span>
        </button>
      </div>
    </nav>
  );
}
