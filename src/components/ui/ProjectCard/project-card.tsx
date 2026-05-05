import Link from "next/link";
import type { ProjectContent } from "@/lib/types/project-content";
import TagChip from "@/components/ui/TagChip";
import * as sty from "./project-card.css";
import type { ProjectCardVariant } from "./project-card.css";

export type ProjectCardProps = {
  project: ProjectContent;
  eyebrow: string;
  variant?: ProjectCardVariant;
};

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M.696 9.349c5.518-.03 11.165-.062 16.942-.096c-2.807-2.81-4.835-4.842-6.084-6.095c-.143-.179-.158-.554.112-.847c.27-.293.752-.281.89-.14c2.362 2.372 4.772 4.782 7.23 7.23a.65.65 0 0 1 .215.503a.645.645 0 0 1-.215.502a8382.495 8382.495 0 0 1-7.6 7.421a.742.742 0 0 1-1.014-.063c-.263-.287-.29-.588.061-.982c2.002-1.96 4.097-4.004 6.287-6.13c-5.713.038-11.321.07-16.824.097a.701.701 0 0 1-.696-.72c0-.507.388-.68.696-.68Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function ProjectCard({
  project,
  eyebrow,
  variant = "default",
}: ProjectCardProps) {
  const thumbnail = project.cardImage ?? project.heroImage;
  const showImage = variant !== "minimal" && Boolean(thumbnail);
  const isFeature = variant === "feature";

  return (
    <Link
      href={`/${project.pid}`}
      prefetch
      className={sty.card({ variant })}
    >
      {showImage && thumbnail && (
        <img
          className={[sty.image, isFeature ? sty.featureImage : ""]
            .filter(Boolean)
            .join(" ")}
          src={thumbnail.src}
          alt={thumbnail.alt ?? project.title}
        />
      )}
      <div className={sty.body}>
        <span className={sty.eyebrow}>{eyebrow}</span>
        <h3
          className={[sty.title, isFeature ? sty.featureTitle : ""]
            .filter(Boolean)
            .join(" ")}
        >
          {project.title}
        </h3>
        <p className={sty.desc}>{project.summary}</p>
      </div>
      <footer className={sty.footer}>
        {project.tags && project.tags.length > 0 && (
          <span className={sty.tagsRow}>
            {project.tags.map((t, i) => (
              <TagChip key={i} label={t.label} color={t.color} />
            ))}
          </span>
        )}
        {project.readTime !== undefined && (
          <span className={sty.readChip}>
            {project.readTime} min read
            <ArrowRightIcon className={sty.readChipIcon} />
          </span>
        )}
      </footer>
    </Link>
  );
}
