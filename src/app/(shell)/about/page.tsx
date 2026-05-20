import type { Metadata } from "next";

import ProfilePage from "@/components/pages/about";


export const metadata: Metadata = {
  title: "Profile",
  description: "Who is Tanner O\'Rourke? What am I working on? Find out here.",
  alternates: { canonical: "/about" },
};

export default function Profile() {
  return <>
    <ProfilePage />
  </>
}