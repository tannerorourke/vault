import dynamic from "next/dynamic";
import type { ComponentType, SVGProps } from "react";

export const iconRegistry = {
  'arrow-down': dynamic(() => import('./arrow-down').then(m => m.ArrowDownIcon), { ssr: false}),
  'arrow-up': dynamic(() => import('./arrow-up').then(m => m.ArrowUpIcon), { ssr: false}),
  'arrow-right': dynamic(() => import('./arrow-right').then(m => m.ArrowRightIcon), { ssr: false}),
  'arrow-left': dynamic(() => import('./arrow-left').then(m => m.ArrowLeftIcon), { ssr: false}),
  'demo': dynamic(() => import('./demo').then(m => m.DemoIcon), { ssr: false}),
  'download': dynamic(() => import('./download').then(m => m.DownloadIcon), { ssr: false}),
  'file': dynamic(() => import('./file').then(m => m.FileIcon), { ssr: false}),
  'github': dynamic(() => import('./github').then(m => m.GithubIcon), { ssr: false}),
  'globe': dynamic(() => import('./globe').then(m => m.GlobeIcon), { ssr: false}),
  'linkedin': dynamic(() => import('./linkedin').then(m => m.LinkedinIcon), { ssr: false}),
  'mail': dynamic(() => import('./mail').then(m => m.MailIcon), { ssr: false}),
  'pdf': dynamic(() => import('./pdf').then(m => m.PdfIcon), { ssr: false}),
  'window': dynamic(() => import('./window').then(m => m.WindowIcon), { ssr: false}),
} as const;

export type IconName = keyof typeof iconRegistry;
type DynamicSvgIconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const ssrOnCache: Partial<Record<IconName, DynamicSvgIconComponent>> = {};
const ssrOffCache: Partial<Record<IconName, DynamicSvgIconComponent>> = {};

export function getDynamicIcon(iconName: IconName, ssr: boolean): DynamicSvgIconComponent {
  const selectedCache = ssr ? ssrOnCache : ssrOffCache;
  const cachedComponent = selectedCache[iconName];
  if (cachedComponent) return cachedComponent;

  // next/dynamic expects a module-like default export OR a component;
  // we return a component (allowed) by resolving the loader.
  const DynamicIcon = iconRegistry[iconName] as DynamicSvgIconComponent;

  selectedCache[iconName] = DynamicIcon;
  return DynamicIcon;
}

export type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
  ssr?: boolean;
};

export function DynamicIcon({ name, ssr = true, ...svgProps }: IconProps) {
  const DynamicIcon = getDynamicIcon(name, ssr);
  return <DynamicIcon {...svgProps} />;
}