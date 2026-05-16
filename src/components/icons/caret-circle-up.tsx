import { IconProps } from "@/lib/types/icons";

export function CaretCircleUp({ color = "currentColor", ...rest }: IconProps) {
  return (
    <svg
      viewBox="0 0 256 256" 
      fill="currentColor" 
      aria-hidden="true" 
      {...rest}
    >
      <path 
        d="M0 0h256v256H0z" 
        fill="none" 
      />
      <path
        fill={color} 
        d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24m45.66 125.66a8 8 0 0 1-11.32 0L128 115.31l-34.34 34.35a8 8 0 0 1-11.32-11.32l40-40a8 8 0 0 1 11.32 0l40 40a8 8 0 0 1 0 11.32"
      />
    </svg>
  );
}