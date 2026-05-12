import type { IFilter } from "@/lib/types/global";
import * as sty from "./filter-pill.css";

type FilterPillProps = {
  label: string;
  filterId: IFilter["id"];
  isActive: boolean;
  notifyOnClick: (id: IFilter["id"]) => void;
  className?: string;
};

export function FilterPill({
  label,
  filterId,
  isActive,
  notifyOnClick,
  className,
}: FilterPillProps) {
  return (
    <button
      type="button"
      aria-pressed={isActive}
      onClick={() => notifyOnClick(filterId)}
      className={[sty.pill, className].filter(Boolean).join(" ")}
    >
      {label}
    </button>
  );
}
