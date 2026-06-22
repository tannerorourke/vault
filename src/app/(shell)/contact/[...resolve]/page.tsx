import { redirect } from "next/navigation"

// -> Add the '?view=contact' QP (deep links) -> picked up by DrawerProvider -> QP stripped and Drawer opened
export default function ResolveToContact() {
  redirect("/?view=contact")
}