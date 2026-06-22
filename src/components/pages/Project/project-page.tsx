import { ProjectContent, JumpIconButton } from "@/lib/types/project";

import Image from "next/image";
import Markdown from "@/components/ui/Markdown";
import Text from "@/components/ui/Text";
import Eyebrow from "@/components/ui/Eyebrow";
import TagChip from "@/components/ui/TagChip";
import Icon, { IconLink } from "@/components/ui/Icon";
import { getImageSize, isSvg } from "@/lib/content/images";
import { content as siteContent } from "@/lib/content/content";
import sectionByType, { SectionShell, SectionTypes } from "@/components/ui/Section";

import TrackedDiv from "./TrackedDiv";
import ProjectToc from "./Toc";
import NextProjectFooter from "./NextProject";

import * as sty from "./project-page.css";


export function ProjectPage({ content }: { content: ProjectContent }) {
  const { 
    pid, title, subtitle, eyebrow, chips, links, 
    heroImage, sections, showToc = true
  } = content;

  // Titles pre-rendered here (server) so Toc + NextProject don't pull 
  // markdown into the client bundle 
  const tocSections = sections
    .filter((s): s is typeof s & { title: string } => Boolean(s.title))
    .map((s) => ({ id: s.id, title: <Markdown value={s.title} inline /> }));

  const nextTitleNodes = Object.fromEntries(
    Object.entries(siteContent.projectMeta.pids).map(([pid, meta]) => [
      pid, 
      <>
        <Markdown
          key={pid} value={title}
          textProps={{ as: "h3", variant: "display", className: sty.title }}
        />
        {meta?.eyebrow &&
          <Eyebrow as="span" className={[sty.eyebrow, sty.eyebrowGutter].join(" ")}>
            {meta?.eyebrow}
          </Eyebrow>
        }
      </>
    ])
  );

  return (
    <main id="main-content" tabIndex={-1} className={sty.main}>
      <TrackedDiv pid={pid} className={sty.content}>
        <header className={sty.header}>
          <Markdown 
            textProps={{ as: 'h1', variant: 'display', className: sty.title }} 
            value={title} 
          />
          {eyebrow &&
            <Eyebrow as="span" className={sty.eyebrow}>{eyebrow}</Eyebrow>
          }
          {subtitle &&
            <Markdown
              textProps={{ as: 'h2', variant: 'bodyLg', className: sty.subtitle }} 
              value={subtitle}
            />
          }

          {((!!chips && chips.length > 0) || (!!links && links.length > 0)) && (
            <div className={sty.heroFoot}>
              {chips && chips.length > 0 && (
                <div className={sty.chipsRow}>
                  {chips.map((t, i) => (
                    <TagChip key={i} label={t.label} color={t.color} />
                  ))}
                </div>
              )}
              {!!links && links.length > 0 && (
                <div className={sty.linksRow}>
                  {links.map((l: JumpIconButton, i) => (
                    <IconLink
                      key={i}
                      variant="box"
                      alt={l.alt ?? l.text ?? l.icon ?? ""}
                      tooltipText={l.text ?? l.alt ?? ""}
                      tooltipSide="bottom"
                      href={l.href}
                      target={l.target ?? "_blank"}
                      download={l.download ?? undefined}
                      rel={l.rel ?? "noopener noreferrer"}
                    >
                      {(l.icon && l.text)
                        ? <Text as="span">{l.text}</Text>
                        : <Icon name={l.icon} size="md" tone="muted" />
                      }
                    </IconLink>
                  ))}
                </div>
              )}
            </div>
          )}
        </header>

        {!!heroImage && (
          isSvg(heroImage.src) ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={heroImage.src}
              alt={heroImage.alt ?? ""}
              className={sty.heroImage}
              loading="eager"
            />
          ) : (
            <Image
              src={heroImage.src}
              alt={heroImage.alt ?? ""}
              className={sty.heroImage}
              loading="eager"
              sizes="100vw"
              {...getImageSize(heroImage.src)}
            />
          )
        )}

        <div className={showToc ? sty.layoutToc : sty.layout}>
          {showToc && (
            <div className={sty.tocWrapSticky}>
              <ProjectToc sections={tocSections} />
            </div>
          )}
          <div className={sty.sectionsWrap}>
            {sections.map((s: SectionTypes, ix: number) => (
              <SectionShell 
                key={s.id || ix} 
                id={s.id || `section-${ix}`} 
                title={s.title} 
                accent={s.accent}
              >
                {sectionByType(s)}
              </SectionShell>
            ))}
          </div>
        </div>
      </TrackedDiv>
      <NextProjectFooter 
        currentPid={pid}
        pids={siteContent.projectMeta.pids}
        titleNodes={nextTitleNodes} 
      />
    </main>
  );
}
