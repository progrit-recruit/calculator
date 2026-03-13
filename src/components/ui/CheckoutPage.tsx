"use client";

import { useState } from "react";
import { ARTWORK_MAP, ARTISTS } from "@/lib/mockData";

interface CheckoutPageProps {
  artworkId: number;
  onBack: () => void;
}

type PaymentMethod = "card" | "convenience" | "paypay" | "bank";
type CheckoutStep = "review" | "confirm" | "done";

const SHIPPING_FEE = 880;

// ── Icons ────────────────────────────────────────────────────────────────────

function ChevronLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="#c4a35a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none"
      stroke="#c4a35a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function PackageIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="rgba(245,237,224,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}

function CreditCardIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  );
}

function ConvenienceIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function WalletIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
      <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
      <path d="M18 12a2 2 0 0 0 0 4h4v-4z" />
    </svg>
  );
}

function BankIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="22" x2="21" y2="22" />
      <line x1="6" y1="18" x2="6" y2="11" />
      <line x1="10" y1="18" x2="10" y2="11" />
      <line x1="14" y1="18" x2="14" y2="11" />
      <line x1="18" y1="18" x2="18" y2="11" />
      <polygon points="12 2 20 7 4 7" />
    </svg>
  );
}

// ── Payment methods config ────────────────────────────────────────────────────

const PAYMENT_METHODS: { id: PaymentMethod; label: string; sub: string; icon: React.ReactNode }[] = [
  { id: "card", label: "クレジットカード", sub: "Visa / Mastercard / JCB", icon: <CreditCardIcon /> },
  { id: "convenience", label: "コンビニ払い", sub: "セブン / ローソン / ファミマ", icon: <ConvenienceIcon /> },
  { id: "paypay", label: "PayPay", sub: "残高 / クレカ払い", icon: <WalletIcon /> },
  { id: "bank", label: "銀行振込", sub: "振込確認後に発送", icon: <BankIcon /> },
];

// ── Purchase success screen ───────────────────────────────────────────────────

function PurchaseComplete({ artworkTitle, onBack }: { artworkTitle: string; onBack: () => void }) {
  const orderId = `ORD-${Math.random().toString(36).slice(2, 10).toUpperCase()}`;
  return (
    <div className="h-screen bg-[#0f0b08] flex flex-col items-center justify-center px-6 text-white">
      {/* Decorative rings */}
      <div className="relative mb-8">
        <div className="absolute inset-0 rounded-full bg-[#e8712a]/10 scale-[2.5] animate-pulse" />
        <div className="absolute inset-0 rounded-full bg-[#e8712a]/10 scale-[1.8]" />
        <div className="w-28 h-28 rounded-full bg-[#1c1510] border border-[#e8712a]/30 flex items-center justify-center relative">
          <CheckCircleIcon />
        </div>
      </div>

      <h1 className="text-2xl font-bold mb-2 tracking-tight">購入完了</h1>
      <p className="text-white/50 text-sm text-center leading-relaxed mb-6">
        ご購入ありがとうございます。<br />
        発送準備が整い次第ご連絡いたします。
      </p>

      {/* Order card */}
      <div className="w-full bg-[#150f0a] rounded-2xl border border-white/[0.07] p-5 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-4 bg-[#e8712a] rounded-full" />
          <span className="text-white/50 text-xs font-semibold tracking-widest uppercase">注文情報</span>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-start gap-4">
            <span className="text-white/40 text-sm">作品名</span>
            <span className="text-white text-sm font-medium text-right">{artworkTitle}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/40 text-sm">注文番号</span>
            <span className="text-[#c4a35a] text-sm font-mono">{orderId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/40 text-sm">発送予定</span>
            <span className="text-white text-sm">3〜5営業日</span>
          </div>
        </div>
      </div>

      {/* Back button */}
      <div className="relative w-full">
        <button
          onClick={onBack}
          className="w-full py-4 bg-[#e8712a] rounded-2xl font-bold text-base text-white
                     relative z-10 transition-transform active:translate-y-0.5 active:translate-x-0.5"
        >
          フィードに戻る
        </button>
        <div className="absolute inset-0 rounded-2xl bg-[#2a1a0e] translate-y-1 translate-x-1" />
      </div>
    </div>
  );
}

// ── Main checkout component ───────────────────────────────────────────────────

export default function CheckoutPage({ artworkId, onBack }: CheckoutPageProps) {
  const artwork = ARTWORK_MAP[artworkId];
  const artist = artwork ? ARTISTS[artwork.artistId] : null;

  const [step, setStep] = useState<CheckoutStep>("review");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  if (!artwork || !artist) {
    return (
      <div className="h-screen bg-[#0f0b08] flex flex-col items-center justify-center gap-4 text-white/60">
        <p>作品が見つかりません</p>
        <button onClick={onBack} className="text-[#c4a35a] text-sm underline">戻る</button>
      </div>
    );
  }

  if (step === "done") {
    return <PurchaseComplete artworkTitle={artwork.title} onBack={onBack} />;
  }

  const total = artwork.priceNum + SHIPPING_FEE;

  return (
    <div className="h-screen bg-[#0f0b08] text-white flex flex-col">
      {/* ── Header ── */}
      <div className="flex-shrink-0 bg-[#0f0b08]/90 backdrop-blur-md border-b border-white/[0.05] px-4 py-3 flex items-center gap-3 z-20">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-white/70 active:opacity-50 transition-opacity"
        >
          <ChevronLeft />
          <span className="text-sm">戻る</span>
        </button>
        <span className="text-sm font-semibold flex-1 text-center pr-12">購入手続き</span>
        {/* Step indicator */}
        <div className="flex items-center gap-1">
          {(["review", "confirm"] as const).map((s, i) => (
            <div
              key={s}
              className={`w-2 h-2 rounded-full transition-all ${
                i === (step === "review" ? 0 : 1)
                  ? "bg-[#e8712a] w-4"
                  : "bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ── Scrollable body ── */}
      <div className="flex-1 overflow-y-scroll no-scrollbar pb-36">

        {/* Product section */}
        <div className="px-4 pt-5 pb-4 border-b border-white/[0.05]">
          <div className="flex items-start gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://picsum.photos/seed/${artwork.seed}/160/160`}
              alt={artwork.title}
              className="w-20 h-20 rounded-xl object-cover flex-shrink-0 ring-1 ring-white/10"
            />
            <div className="flex-1 min-w-0">
              <p className="text-white/40 text-[11px] font-medium mb-0.5">{artist.handle}</p>
              <p className="text-white font-semibold text-sm leading-snug mb-2">{artwork.title}</p>
              <div className="inline-flex items-center gap-1.5 pl-2 border-l-2 border-[#e8712a]">
                <span className="text-[#c4a35a] text-xs font-medium">美品</span>
              </div>
              <p className="text-[#c4a35a] font-bold text-lg mt-2">{artwork.price}</p>
            </div>
          </div>
        </div>

        {/* Shipping address */}
        <div className="px-4 pt-4 pb-3 border-b border-white/[0.05]">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-3.5 bg-[#e8712a] rounded-full" />
            <span className="text-white/40 text-[11px] font-bold tracking-widest uppercase">配送先</span>
          </div>
          <button className="w-full bg-[#1c1510] rounded-xl p-3.5 flex items-center justify-between
                             border border-white/[0.06] active:border-white/20 transition-colors">
            <div className="text-left">
              <p className="text-white text-sm font-medium">山田 太郎</p>
              <p className="text-white/40 text-xs mt-0.5">〒150-0001 東京都渋谷区神宮前 x-x-x</p>
              <div className="flex items-center gap-1.5 mt-1.5">
                <PackageIcon />
                <span className="text-white/40 text-[11px]">ゆうパック（追跡あり）</span>
              </div>
            </div>
            <span className="text-white/30 flex-shrink-0">
              <ChevronRight />
            </span>
          </button>
        </div>

        {/* Payment method */}
        <div className="px-4 pt-4 pb-3 border-b border-white/[0.05]">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-3.5 bg-[#e8712a] rounded-full" />
            <span className="text-white/40 text-[11px] font-bold tracking-widest uppercase">支払い方法</span>
          </div>
          <div className="space-y-2">
            {PAYMENT_METHODS.map((method) => {
              const selected = paymentMethod === method.id;
              return (
                <button
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`w-full flex items-center gap-3.5 p-3.5 rounded-xl border transition-all text-left
                    ${selected
                      ? "border-[#e8712a] bg-[#e8712a]/10"
                      : "border-white/[0.06] bg-[#1c1510] active:border-white/20"
                    }`}
                >
                  {/* Diamond radio */}
                  <div className={`w-5 h-5 rotate-45 flex-shrink-0 border-2 flex items-center justify-center transition-all
                    ${selected ? "border-[#c4a35a] bg-[#2a1a0e]/60" : "border-white/25"}`}>
                    {selected && (
                      <div className="w-2 h-2 bg-[#c4a35a]" />
                    )}
                  </div>
                  <div className={`flex-shrink-0 transition-colors ${selected ? "text-[#c4a35a]" : "text-white/40"}`}>
                    {method.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium transition-colors ${selected ? "text-white" : "text-white/70"}`}>
                      {method.label}
                    </p>
                    <p className="text-white/30 text-xs mt-0.5">{method.sub}</p>
                  </div>
                  {selected && (
                    <div className="text-[#c4a35a] flex-shrink-0">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Coupon / Points row */}
        <div className="px-4 pt-4 pb-3 border-b border-white/[0.05]">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-3.5 bg-[#e8712a] rounded-full" />
            <span className="text-white/40 text-[11px] font-bold tracking-widest uppercase">クーポン・ポイント</span>
          </div>
          <button className="w-full bg-[#1c1510] rounded-xl p-3.5 flex items-center justify-between
                             border border-white/[0.06] border-dashed active:border-white/20 transition-colors">
            <span className="text-white/35 text-sm">クーポンを使用する</span>
            <span className="text-white/30"><ChevronRight /></span>
          </button>
        </div>

        {/* Order summary */}
        <div className="px-4 pt-4 pb-4 border-b border-white/[0.05]">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-3.5 bg-[#e8712a] rounded-full" />
            <span className="text-white/40 text-[11px] font-bold tracking-widest uppercase">注文内容</span>
          </div>
          <div className="bg-[#1c1510] rounded-xl border border-white/[0.06] overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.05]">
              <span className="text-white/50 text-sm">商品代金</span>
              <span className="text-white text-sm font-medium">{artwork.price}</span>
            </div>
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.05]">
              <span className="text-white/50 text-sm">送料</span>
              <span className="text-white text-sm font-medium">¥{SHIPPING_FEE.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.05]">
              <span className="text-white/50 text-sm">決済手数料</span>
              <span className="text-white/40 text-sm">無料</span>
            </div>
            {/* Total row */}
            <div className="flex items-center justify-between px-4 py-4 bg-[#e8712a]/10">
              <span className="text-white font-bold text-sm">合計（税込）</span>
              <span className="text-[#c4a35a] font-bold text-xl tracking-tight">
                ¥{total.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Terms agreement */}
        <div className="px-4 pt-4 pb-4">
          <button
            onClick={() => setAgreedToTerms(!agreedToTerms)}
            className="flex items-start gap-3 w-full text-left active:opacity-70 transition-opacity"
          >
            <div className={`flex-shrink-0 w-5 h-5 mt-0.5 border-2 rounded-sm flex items-center justify-center transition-all
              ${agreedToTerms ? "border-[#e8712a] bg-[#e8712a]" : "border-white/25"}`}>
              {agreedToTerms && (
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                  stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </div>
            <p className="text-white/40 text-xs leading-relaxed">
              <span className="text-[#c4a35a] underline">利用規約</span>・
              <span className="text-[#c4a35a] underline">プライバシーポリシー</span>に同意して購入する
            </p>
          </button>

          {/* Caution note */}
          <div className="mt-4 flex items-start gap-2 bg-[#1c1510] rounded-xl p-3.5 border border-white/[0.05]">
            <ShieldIcon />
            <p className="text-white/35 text-[11px] leading-relaxed">
              お支払い情報はSSL暗号化で保護されています。個人情報は安全に管理されます。
            </p>
          </div>
        </div>
      </div>

      {/* ── Fixed bottom CTA ── */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0f0b08]/96 backdrop-blur-xl border-t border-white/[0.06] px-4 pt-3 pb-safe">
        <div className={`relative transition-opacity ${agreedToTerms ? "opacity-100" : "opacity-50"}`}>
          <button
            disabled={!agreedToTerms}
            onClick={() => setStep("done")}
            className="w-full flex items-stretch overflow-hidden rounded-2xl shadow-lg shadow-[#1a0f08]/60
                       relative z-10 transition-transform active:translate-y-0.5 active:translate-x-0.5"
          >
            {/* Left: price chip */}
            <div className="bg-[#2a1a0e] px-5 py-4 flex items-center justify-center border-r border-[#e8712a]/30">
              <span className="text-[#f5ede0] font-bold text-base whitespace-nowrap">
                ¥{total.toLocaleString()}
              </span>
            </div>
            {/* Right: action label */}
            <div className="flex-1 bg-[#e8712a] py-4 flex items-center justify-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span className="text-white font-bold text-base">安全に購入する</span>
            </div>
          </button>
          <div className="absolute inset-0 rounded-2xl bg-[#2a1a0e] translate-y-1 translate-x-1 z-0" />
        </div>
        <p className="text-center text-white/25 text-[10px] mt-2">
          購入後のキャンセルはできません
        </p>
      </div>
    </div>
  );
}
