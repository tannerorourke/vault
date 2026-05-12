import Link from "next/link";
import type { ProjectContent } from "@/lib/types/project-content";
import TagChip from "@/components/ui/TagChip";
import * as sty from "./project-card.css";

export type ProjectCardProps = {
  project: ProjectContent;
  eyebrow: string;
  year: string;
  isFeature?: boolean;
};

const MAX_VISIBLE_TAG_CHARS = 28;

function getVisibleTags(tags: ProjectContent["tags"]) {
  if (!tags || tags.length === 0) return { visible: [], overflow: 0 };
  let total = 0;
  let cutoff = tags.length;
  for (let i = 0; i < tags.length; i++) {
    total += tags[i].label.length + 2;
    if (total > MAX_VISIBLE_TAG_CHARS && i > 0) {
      cutoff = i;
      break;
    }
  }
  return {
    visible: tags.slice(0, cutoff),
    overflow: tags.length - cutoff,
  };
}

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
  year,
  isFeature = false,
}: ProjectCardProps) {
  const { visible: visibleTags, overflow } = getVisibleTags(project.tags);

  return (
    <Link
      href={`/${project.pid}`}
      prefetch
      className={sty.card({ isFeature })}
      data-feature={isFeature ? "true" : undefined}
    >
      <div className={sty.eyebrow}>
        {isFeature && (
          <span className={sty.featureDot} aria-label="Featured" />
        )}
        <span>{eyebrow}</span>
        <span className={sty.year}>{year}</span>
      </div>

      <h3 className={sty.title}>{project.title}</h3>

      {project.summary && (
        <p className={sty.summary}>{project.summary}</p>
      )}

      <div className={sty.reveal}>
        {visibleTags.length > 0 && (
          <div className={sty.tagsRow}>
            {visibleTags.map((t, i) => (
              <TagChip key={i} label={t.label} color={t.color} />
            ))}
            {overflow > 0 && (
              <TagChip color="grey" label={`+${overflow}`} />
            )}
          </div>
        )}
        <span className={sty.cta}>
          View case study
          <ArrowRightIcon className={sty.ctaIcon} />
        </span>
      </div>
    </Link>
  );
}
