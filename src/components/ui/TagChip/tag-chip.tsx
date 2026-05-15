import { tagChip, type TagChipColor } from "./tag-chip.css";


export type TagChipProps = {
  label: string;
  color?: TagChipColor;
  className?: string;
};

export function TagChip({ label, color = "teal", className }: TagChipProps) {
  return (
    <span className={[tagChip({ color }), className].filter(Boolean).join(" ")}>
      {label}
    </span>
  );
}
