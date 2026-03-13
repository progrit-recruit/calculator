"use client";

import ProfilePage from "@/components/ui/ProfilePage";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();
  return (
    <ProfilePage
      artistId={1}
      onBack={() => router.push("/")}
      onNavigateToArtwork={() => router.push("/")}
    />
  );
}
