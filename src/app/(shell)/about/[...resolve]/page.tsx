import { redirect } from "next/navigation"

/**
 * Resolve any "/about/**" URL to /about
 */
export default function ResolveToProfile() {
  redirect("/about")
}