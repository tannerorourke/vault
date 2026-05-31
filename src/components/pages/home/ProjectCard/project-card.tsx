import type { ProjectContent } from "@/lib/types/project";

import { Link } from "next-view-transitions";
import Image from "next/image";
import Text from "@/components/ui/Text";
import Markdown from "@/components/ui/Markdown";
import Eyebrow from "@/components/ui/Eyebrow";
import { Icon, IconButton } from "@/components/ui/Icon";

import * as sty from "./project-card.css";


export type ProjectCardProps = {
  project: ProjectContent;
  variant?: "default" | "featured";
  imageRatio?: "40-60" | "45-55" | "50-50" | "55-45" | "60-40";
};

export function ProjectCard({
  project,
  variant = "default",
  imageRatio = "60-40",
}: ProjectCardProps) {
  const {
    pid,
    title,
    cardSubtitle,
    eyebrow,
    heroImage,
    links
  } = project;
  const isFeatured = variant === "featured";

  return (
    <Link
      href={`/${pid}`}
      prefetch
      className={sty.cardBase}
      data-variant={variant}
      data-ratio={isFeatured ? imageRatio : undefined}
    >
      {isFeatured && heroImage?.src && (
        <figure>
          <div className={sty.heroImgWrapper}>
            {heroImage.src.toLowerCase().endsWith(".svg") ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={heroImage.src}
                alt={heroImage.alt ?? ""}
                className={sty.heroImg}
                loading="eager"
              />
            ) : (
              <Image
                src={heroImage.src}
                alt={heroImage.alt ?? ""}
                className={sty.heroImg}
                loading="eager"
                fill
                sizes="(min-width: 900px) 45vw, 100vw"
              />
            )}
            {heroImage.label && (
              <Text as="dl" className={sty.heroImgLabel}>
                <Markdown value={heroImage.label} inline />
              </Text>
            )}
          </div>
          {heroImage?.caption && heroImage?.captionOnHome && (
            <Text as="figcaption" variant="caption" className={sty.heroImgCaption}>
              <Markdown value={heroImage.caption} inline />
            </Text>
          )}
        </figure>
      )}

      <div className={sty.bodyCol}>
        <Text as="h3" className={sty.title} variant="titleXs">
          {title}
        </Text>

        {cardSubtitle &&
          <Markdown 
            textProps={{ as: "p", variant: "bodySm", className: sty.subtitle }}
            value={cardSubtitle}
          />
        }

        <div className={sty.foot}>
          {eyebrow && 
            <Eyebrow as="span">{eyebrow}</Eyebrow>}
          
          {!!links && links.length > 0 && (
            <span className={sty.footLinks}>
              {links.map((l, i) => {
                if (!l.icon) return null;
                return (
                  <IconButton
                    key={i}
                    variant="boxSmall"
                    className={sty.footLink}
                    alt={l.alt ?? l.text ?? l.icon ?? ""}
                    tooltipText={l.text ?? l.alt ?? ""}
                    tooltipSide="bottom"
                    href={l.href}
                    target={l.target ?? "_blank"}
                    download={l.download ?? undefined}
                    rel={l.rel ?? "noopener noreferrer"}
                  >
                    <Icon name={l.icon} size="sm" />
                  </IconButton>
                );
              })}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default ProjectCard;
