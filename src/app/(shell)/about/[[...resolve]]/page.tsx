import { redirect } from "next/navigation"

export default function ResolveToProfile() {
  redirect("/#about")
}