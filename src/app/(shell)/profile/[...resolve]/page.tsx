import { redirect } from "next/navigation"

/**
 * Resolve any "/profile/**" URL to /profile
 */
export default function ResolveToProfile() {
  redirect("/profile")
}