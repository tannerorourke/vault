import { IconProps } from "@/lib/types/icons";

export function Dot({ color = "currentColor", ...rest }: IconProps) {
  return (
    <svg
      viewBox="0 0 256 256" 
      fill="currentColor" 
      aria-hidden="true" 
      {...rest}
    >
      <g fill={color}>
        <path d="M176 128a48 48 0 1 1-48-48a48 48 0 0 1 48 48" opacity="0.5" />
        <path d="M140 128a12 12 0 1 1-12-12a12 12 0 0 1 12 12" />
      </g>
    </svg>
  );
}