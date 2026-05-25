"use client";

import type { MouseEvent } from "react";
import Link from "next/link";

import type { ProjectContent } from "@/lib/types/project";
import Markdown from "@/components/ui/Markdown";
import { iconRegistry } from "@/components/icons/registry";

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

  const handleIconLinkClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
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
        <div className={sty.eyebrow}>
          <span>{eyebrowText}</span>
          <span className={sty.year}>{yearText}</span>
        </div>

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
                const Icon = iconRegistry[l.icon];
                if (!Icon) return null;
                return (
                  <a
                    key={i}
                    href={l.href}
                    target={l.target ?? "_blank"}
                    rel="noreferrer"
                    download={l.download}
                    aria-label={l.tooltipText ?? l.alt ?? l.text ?? l.icon}
                    title={l.tooltipText ?? l.alt ?? l.text ?? l.icon}
                    className={sty.cardLink}
                    onClick={handleIconLinkClick}
                  >
                    <Icon width={16} height={16} />
                  </a>
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
