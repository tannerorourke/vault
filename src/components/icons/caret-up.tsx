import { IconProps } from "@/lib/types/icons";

export function CaretUp({ color = "currentColor", ...rest }: IconProps) {
  return (
    <svg
      viewBox="0 0 256 256"
      fill="currentColor"
      aria-hidden="true"
      {...rest}
    >
      <path
        fill={color}
        d="M216.49 168.49a12 12 0 0 1-17 0L128 97l-71.51 71.49a12 12 0 0 1-17-17l80-80a12 12 0 0 1 17 0l80 80a12 12 0 0 1 0 17"
      />
    </svg>
  );
}
