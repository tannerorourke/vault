import { IconProps } from "@/lib/types/icons";


export function ArrowCircleDown({ color = "currentColor", ...rest }: IconProps) {
  return (
    <svg
      viewBox="0 0 256 256" 
      fill="currentColor" 
      aria-hidden="true" 
      {...rest}
    >
      <path 
        fill={color}
        d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24m37.66 117.66l-32 32a8 8 0 0 1-11.32 0l-32-32a8 8 0 0 1 11.32-11.32L120 148.69V88a8 8 0 0 1 16 0v60.69l18.34-18.35a8 8 0 0 1 11.32 11.32"
      />
    </svg>
  );
}