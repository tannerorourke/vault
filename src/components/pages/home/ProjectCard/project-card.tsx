"use client";

import type { MouseEvent } from "react";
import { Link } from "next-view-transitions";

import type { ProjectContent } from "@/lib/types/project";
import Markdown from "@/components/ui/Markdown";
import Eyebrow from "@/components/ui/Eyebrow";
import { Icon, IconButton } from "@/components/ui/Icon";

import * as sty from "./project-card.css";


export type ProjectCardProps = {
  project: ProjectContent;
  variant?: "default" | "featured";
  imageRatio?: "40-60" | "45-55" | "50-50";
  eyebrow?: string;
  year?: string;
};

export function ProjectCard({
  project,
  variant = "default",
  imageRatio = "45-55",
  eyebrow,
  year,
}: ProjectCardProps) {
  const isFeatured = variant === "featured";
  const eyebrowText = eyebrow ?? project.eyebrow ?? "";
  const yearText = year ?? project.year ?? "";

  // <button> not <a> — IconLink renders <a>, which can't be nested inside <Link>'s <a>
  const handleIconButtonClick = (href: string, target: string) =>
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      window.open(href, target, "noreferrer");
    };

  return (
    <Link
      href={`/${project.pid}`}
      prefetch
      className={sty.cardBase}
      data-variant={variant}
      data-ratio={isFeatured ? imageRatio : undefined}
    >
      {isFeatured && project.heroImage?.src && (
        <div className={sty.imageCol}>
          <img
            src={project.heroImage.src}
            alt={project.heroImage.alt ?? ""}
            className={sty.heroImg}
          />
          {(project.heroImage.label || project.heroImage.caption) && (
            <div className={sty.heroCaptionStack}>
              {project.heroImage.label && (
                <span className={sty.heroLabelText}>{project.heroImage.label}</span>
              )}
              {project.heroImage.caption && (
                <span className={sty.heroCaptionText}>{project.heroImage.caption}</span>
              )}
            </div>
          )}
        </div>
      )}

      <div className={sty.bodyCol}>
        <Eyebrow as="div" className={sty.eyebrow}>
          <span>{eyebrowText}</span>
          <span className={sty.year}>{yearText}</span>
        </Eyebrow>

        <h3 className={sty.title}>{project.title}</h3>

        {isFeatured && project.subtitle && (
          <div className={sty.subtitle}>
            <Markdown value={project.subtitle} inline />
          </div>
        )}

        {!isFeatured && project.summary && (
          <p className={sty.summary}>{project.summary}</p>
        )}

        <div className={sty.foot}>
          {project.tags && project.tags.length > 0 && (
            <span className={sty.tagsInline}>
              {project.tags.map((t, i) => (
                <span key={i}>
                  {i > 0 && <span className={sty.tagsSep}>·</span>}
                  {t.label}
                </span>
              ))}
            </span>
          )}

          {project.links && project.links.length > 0 && (
            <span className={sty.cardLinks}>
              {project.links.map((l, i) => {
                if (!l.icon) return null;
                return (
                  <IconButton
                    key={i}
                    alt={l.alt ?? l.text ?? l.icon}
                    variant="flat"
                    onClick={handleIconButtonClick(l.href, l.target ?? "_blank")}
                  >
                    <Icon name={l.icon} size="md" tone="muted" />
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
