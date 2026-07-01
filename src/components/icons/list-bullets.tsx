import { IconProps } from "@/lib/types/icons";

export function ListBullets({ 
  color = "currentColor", 
  ...rest 
}: IconProps) {
  return (
    <svg viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" {...rest}>
      <g fill={color}>
        <path 
          d="M216 64v128H88V64Z"
          opacity={0.2}
        />
        <path 
          fill={color} 
          d="M80 64a8 8 0 0 1 8-8h128a8 8 0 0 1 0 16H88a8 8 0 0 1-8-8m136 56H88a8 8 0 1 0 0 16h128a8 8 0 0 0 0-16m0 64H88a8 8 0 1 0 0 16h128a8 8 0 0 0 0-16M44 52a12 12 0 1 0 12 12a12 12 0 0 0-12-12m0 64a12 12 0 1 0 12 12a12 12 0 0 0-12-12m0 64a12 12 0 1 0 12 12a12 12 0 0 0-12-12"
        />
      </g>
    </svg>
  );
}