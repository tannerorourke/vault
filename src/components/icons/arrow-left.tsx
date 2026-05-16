import { IconProps } from "@/lib/types/icons";

export function ArrowLeft({ color = "currentColor", ...rest }: IconProps) {
  return (
    <svg
      viewBox="0 0 256 256" 
      fill="currentColor" 
      aria-hidden="true" 
      {...rest}
    >
      <path 
        fill={color}
        d="M224 128a8 8 0 0 1-8 8H59.31l58.35 58.34a8 8 0 0 1-11.32 11.32l-72-72a8 8 0 0 1 0-11.32l72-72a8 8 0 0 1 11.32 11.32L59.31 120H216a8 8 0 0 1 8 8"
      />
    </svg>
  );
}