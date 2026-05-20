import type { ProjectContent } from "@/lib/types/project-content";
import { ContentNavLink } from "@/lib/types/nav";

import Markdown from "@/components/ui/Markdown";
import Link from "next/link";
import TagChip from "@/components/ui/TagChip";
import Sheet from "@/components/ui/Sheet";
import { renderSection } from "./Section";
import { ArrowLeft } from "@/components/icons/arrow-left";

import { iconRegistry } from "@/components/icons/registry";
import * as sty from "./project-page.css";


import TextLink from "@/components/ui/TextLink";


export type ProjectPageProps = {
  content: ProjectContent;
};

export function ProjectPage({ content }: ProjectPageProps) {
  const tocSections = content.sections.filter((s) => s.title);
  const finding = content.finding;
  const hasFinding = !!finding;
  const matchingSection = finding?.jumpToId
    ? content.sections.find((s) => s.id === finding.jumpToId)
    : undefined;
  const findingLabel =
    finding?.jumpToLabel ?? matchingSection?.title ?? finding?.jumpToId;
  const findingEyebrow = 
    finding?.eyebrowLabel ?? "The finding";

  return (
    <main className={sty.root} aria-label={content.title}>
      <Link href="/" className={sty.backBtn}>
        <ArrowLeft className={sty.backIcon} />
        All projects
      </Link>

      <header className={hasFinding ? sty.headerWithFinding : sty.headerSolo}>
        <Sheet className={sty.heroSheet}>
          {content.eyebrow && (<div className={sty.eyebrow}>{content.eyebrow}</div>)}

          <h1 className={sty.title}>{content.title}</h1>
          
          {content.subtitle && (
            <p className={sty.subtitle}>
              <Markdown value={content.subtitle} inline />
            </p>
          )}

          {content.tags && content.tags.length > 0 && (
            <div className={sty.tagsRow}>
              {content.tags.map((t, i) => (
                <TagChip key={i} label={t.label} color={t.color} />
              ))}
            </div>
          )}

          {content.links && content.links.length > 0 && (
            <div className={sty.links}>
              {content.links.map((l: ContentNavLink, i) => {
                const Icon = l.icon ? iconRegistry[l.icon] : null;
                return (
                  <a
                    key={i}
                    className={sty.linkBtn}
                    href={l.href}
                    target={l.target ? l.target : "_blank"}
                    rel="noopener noreferrer"
                    download={l.download ? l.download : undefined}
                  >
                    {Icon && <Icon className={sty.linkBtnIcon} />}
                    {l.text && l.text}
                  </a>
                );
              })}
            </div>
          )}
        </Sheet>

        {hasFinding && (
          <Sheet accent="copper" className={sty.findingCard}>
            <div className={sty.findingEyebrow}>{findingEyebrow}</div>
            <p className={sty.findingBody}>
              <Markdown value={finding.body} inline />
            </p>
            {finding.jumpToId && findingLabel && (
              <div className={sty.findingJump}>
                <span className={sty.findingName}>{findingLabel}</span>
                <TextLink 
                  label="jump"
                  leftArrow={{ dir: 'down', hold: true}}
                  className={sty.findingJumpCta}
                  nextProps={{
                    href: `#section-${finding.jumpToId}`,
                    className: sty.findingJumpCta
                  }}
                  textProps={{
                    variant: 'caption', as: 'span',
                    tone: 'primary',
                    
                  }}
                />
              </div>
            )}
          </Sheet>
        )}
      </header>

      {content.heroImage && (
        <img
          className={sty.heroImage}
          src={content.heroImage.src}
          alt={content.heroImage.alt ?? ""}
        />
      )}

      <div className={sty.layout}>
        {tocSections.length > 0 ? (
          <Sheet className={sty.toc}>
            <div className={sty.tocLabel}>Contents</div>
            <nav aria-label="Sections">
              {tocSections.map((s) => (
                <a
                  key={s.id}
                  href={`#section-${s.id}`}
                  className={sty.tocLink}
                >
                  {s.title}
                </a>
              ))}
            </nav>
          </Sheet>
        ) : (
          <div />
        )}

        <div className={sty.sections}>
          {content.sections.map((s) => renderSection(s))}
        </div>
      </div>
    </main>
  );
}
