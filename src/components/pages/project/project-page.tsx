import { ProjectContent, JumpIconButton } from "@/lib/types/project";

import Markdown from "@/components/ui/Markdown";
import Text from "@/components/ui/Text";
import TextLink from "@/components/ui/TextLink";
import Eyebrow from "@/components/ui/Eyebrow";
import TagChip from "@/components/ui/TagChip";
import Icon, { IconLink } from "@/components/ui/Icon";
import { renderSection } from "./Section";

import TrackedMain from "./TrackedMain";
import ProjectToc from "./Toc";
import NextProjectFooter from "./NextProject";

import * as sty from "./project-page.css";


export function ProjectPage({ content }: { content: ProjectContent }) {
  const { 
    pid, title, subtitle, eyebrow, tags: tagsObj, links: linksObj, 
    heroImage: heroImageObj, finding: findingObj, sections: sectionsObj, 
  } = content;

  const tocSections = sectionsObj
    .filter((s): s is typeof s & { title: string } => Boolean(s.title))
    .map((s) => ({ id: s.id, title: s.title }));

  return (
    <TrackedMain pid={pid} className={sty.root}>

      <nav aria-label="Breadcrumb" className={sty.crumbsNav}>
        <TextLink 
          intent="navigation"
          label={<Eyebrow as="span">Work</Eyebrow>}
          nextProps={{ href: "/" }}
        />
        <Eyebrow className={sty.crumbSep} aria-hidden>/</Eyebrow>
        <Eyebrow className={sty.crumbCurrent} aria-current="page">
          <Markdown value={title} inline />
        </Eyebrow>
      </nav>

      <header className={!!findingObj ? sty.headerWithFinding : sty.headerSolo}>
        <div className={sty.heroBody}>
          <Markdown 
            textProps={{ as: 'h1', variant: 'display', className: sty.title }} 
            value={title} 
          />

          {eyebrow &&
            <Eyebrow as="span" className={sty.eyebrow}>{eyebrow}</Eyebrow>}

          {subtitle &&
            <Markdown
              textProps={{ as: 'h2', variant: 'bodyLg', className: sty.subtitle }} 
              value={subtitle}
            />}

          {((!!tagsObj && tagsObj.length > 0) || (!!linksObj && linksObj.length > 0)) && (
            <div className={sty.heroFoot}>
              {tagsObj && tagsObj.length > 0 && (
                <div className={sty.tagsRow}>
                  {tagsObj.map((t, i) => (
                    <TagChip key={i} label={t.label} color={t.color} />
                  ))}
                </div>
              )}

              {!!linksObj && linksObj.length > 0 && (
                <div className={sty.links}>
                  {linksObj.map((l: JumpIconButton, i) => (
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
                        : <Icon name={l.icon} size="md" tone="muted" />}
                    </IconLink>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {!!findingObj && findingObj?.body && (
          <aside className={sty.findingCard}>
            {findingObj?.eyebrow && (
              <TextLink 
                intent="navigation" 
                nextProps={{ href: `#section-${findingObj.jumpToId}` }}
                label={
                  <Eyebrow as="span" className={sty.findingEyebrow}># {findingObj?.eyebrow}</Eyebrow>
                }
              />
            )}
            <Markdown 
              textProps={{ as: 'p', variant: 'bodySm', className: sty.findingBody }}
              value={findingObj.body}
            />
          </aside>
        )}
      </header>

      {!!heroImageObj && (
        <img
          src={heroImageObj.src} 
          alt={heroImageObj.alt ?? ""}
          className={sty.heroImage}
        />
      )}

      <div className={sty.layout}>
        <div className={sty.tocWrapSticky}>
          <ProjectToc sections={tocSections} />
        </div>

        <div className={sty.sectionsWrap}>
          {sectionsObj.map((s) => renderSection(s))}
        </div>
      </div>

      <NextProjectFooter currentPid={pid} />
    </TrackedMain>
  );
}
