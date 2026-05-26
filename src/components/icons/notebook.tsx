import { IconProps } from "@/lib/types/icons";

export function Notebook({ color = "currentColor", ...rest }: IconProps) {
  return (
    <svg
      viewBox="0 0 256 256"
      fill="currentColor"
      aria-hidden="true"
      {...rest}
    >
      <path
        fill={color}
        d="M184 112a8 8 0 0 1-8 8h-64a8 8 0 0 1 0-16h64a8 8 0 0 1 8 8m-8 24h-64a8 8 0 0 0 0 16h64a8 8 0 0 0 0-16m48-88v160a16 16 0 0 1-16 16H48a16 16 0 0 1-16-16V48a16 16 0 0 1 16-16h160a16 16 0 0 1 16 16M48 208h24V48H48Zm160 0V48H88v160z"
      />
    </svg>
  );
}
