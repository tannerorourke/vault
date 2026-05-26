import { Icon } from "@/components/ui/Icon";
import type { IconName } from "@/components/icons/registry";
import * as sty from "./link-pill.css";


export type LinkPillProps = {
  icon: IconName;
  label: string;
  href?: string;
  target?: string;
  download?: string;
  rel?: string;
  className?: string;
};

export function LinkPill({ icon, label, href, target, download, rel, className }: LinkPillProps) {
  return (
    <a
      className={[sty.pill, className].filter(Boolean).join(" ")}
      href={href}
      target={target}
      download={download}
      rel={rel}
    >
      <Icon name={icon} size="md" />
      {label}
    </a>
  );
}
