import { redirect } from "next/navigation";

// -> Add the '?view=work' QP (deep links) -> picked up by DrawerProvider -> QP stripped and Drawer opened
export default function ResolveToWork() {
  redirect("/?view=work");
}
