import { IconProps } from "@/lib/types/icons";

export function Times({
  color = "currentColor",
  ...rest
}: IconProps) {
  return (
    <svg 
      viewBox="0 0 256 256" 
      fill="currentColor" 
      aria-hidden="true" 
      {...rest}
    >
      <path 
        fill={color} 
        d="M208.49 191.51a12 12 0 0 1-17 17L128 145l-63.51 63.49a12 12 0 0 1-17-17L111 128L47.51 64.49a12 12 0 0 1 17-17L128 111l63.51-63.52a12 12 0 0 1 17 17L145 128Z" 
      />
    </svg>

  );
}