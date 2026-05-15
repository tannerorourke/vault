import ProfilePage from "@/components/pages/profile";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "Profile of Tanner O\'Rourke - an introduction to my background, experience, and skills.",
  alternates: { canonical: "/profile" },
};

export default function Profile() {
  return <>
    <ProfilePage />
  </>
}