import { redirect } from "next/navigation";

// -> Add the '?view=contact' QP -> picked up by DrawerProvider -> QP stripped and Drawer opened
export default function ContactDeepLink() {
  redirect("/?view=contact");
}
