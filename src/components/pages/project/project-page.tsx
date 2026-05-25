import { ProjectContent, JumpIconButton } from "@/lib/types/project";

import Link from "next/link";

import Markdown from "@/components/ui/Markdown";
import TextLink from "@/components/ui/TextLink";
import TagChip from "@/components/ui/TagChip";
import { renderSection } from "./Section";
import { ProjectToc } from "./Toc";
import { NextProjectFooter } from "./NextProject";

import { iconRegistry } from "@/components/icons/registry";
import * as sty from "./project-page.css";


export function ProjectPage({ content }: { content: ProjectContent }) {
  const tocSections = content.sections
    .filter((s): s is typeof s & { title: string } => Boolean(s.title))
    .map((s) => ({ id: s.id, title: s.title }));

  const finding = content.finding;
  const hasFinding = !!finding;
  const findingEyebrow = 
    finding?.eyebrow ?? "The finding";

  return (
    <main className={sty.root} aria-label={content.title}>

      <nav aria-label="Breadcrumb" className={sty.crumbs}>
        <Link href="/" className={sty.crumbLink}>Work</Link>
        <span className={sty.crumbSep} aria-hidden>/</span>
        <span className={sty.crumbCurrent}>
          <Markdown value={content.title} inline />
        </span>
      </nav>
      
      <header className={hasFinding ? sty.headerWithFinding : sty.headerSolo}>
        <div className={sty.heroBody}>
          <h1 className={sty.title}>
            <Markdown value={content.title} inline />
          </h1>

          {(content.eyebrow || content.year) && (
            <div className={sty.eyebrow}>
              {content.eyebrow && <span>{content.eyebrow}</span>}
              {content.eyebrow && content.year && <span className={sty.eyebrowDot} aria-hidden />}
              {content.year && <span className={sty.eyebrowYear}>{content.year}</span>}
            </div>
          )}
          
          {content.subtitle && (
            <p className={sty.subtitle}>
              <Markdown value={content.subtitle} inline />
            </p>
          )}

          {((content.tags && content.tags.length > 0) ||
            (content.links && content.links.length > 0)) && (
            <div className={sty.heroFoot}>
          {content.tags && content.tags.length > 0 && (
            <div className={sty.tagsRow}>
              {content.tags.map((t, i) => (
                <TagChip key={i} label={t.label} color={t.color} />
              ))}
            </div>
          )}

          {content.links && content.links.length > 0 && (
            <div className={sty.links}>
              {content.links.map((l: JumpIconButton, i) => {
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
            </div>
          )}
        </div>

        {hasFinding && (
          <aside className={sty.findingCard}>
            <TextLink
              label={`# ${findingEyebrow}`}
              rightIcon={{ icon: 'arrow-down', hold: true }}
              className={sty.findingEyebrow}
              nextProps={{ href: `#section-${finding.jumpToId}` }}
              textProps={{ as: 'span', className: sty.findingEyebrowText }}
            />
            <p className={sty.findingBody}>
              <Markdown value={finding.body} inline />
            </p>
          </aside>
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
        <div className={sty.tocRoot}>
          <ProjectToc sections={tocSections} />
        </div>

        <div className={sty.sections}>
          {content.sections.map((s) => renderSection(s))}
        </div>
      </div>
    </main>
  );
}
