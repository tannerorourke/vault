import { IconProps } from "@/lib/types/icons";

export function CaretDown({ color = "currentColor", ...rest }: IconProps) {
  return (
    <svg
      viewBox="0 0 256 256"
      fill="currentColor"
      aria-hidden="true"
      {...rest}
    >
      <path
        fill={color}
        d="m216.49 104.49l-80 80a12 12 0 0 1-17 0l-80-80a12 12 0 0 1 17-17L128 159l71.51-71.52a12 12 0 0 1 17 17Z"
      />
    </svg>
  );
}
