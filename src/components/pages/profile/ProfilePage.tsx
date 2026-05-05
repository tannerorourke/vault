import type { ComponentType, SVGProps } from "react";
import { GithubIcon } from "public/icons/github";
import { LinkedinIcon } from "public/icons/linkedin";
import { MailIcon } from "public/icons/mail";
import * as sty from "./ProfilePage.css";

const SKILLS = [
  "Python",
  "TypeScript",
  "Next.js",
  "React",
  "PyTorch",
  "Transformer Models",
  "Computer Vision",
  "Cloudflare",
  "Systems Design",
];

type SvgIcon = ComponentType<SVGProps<SVGSVGElement>>;

type ProfileLink = {
  key: string;
  Icon: SvgIcon;
  label: string;
  href: string;
  target?: string;
};

const LINKS: ProfileLink[] = [
  {
    key: "github",
    Icon: GithubIcon,
    label: "GitHub",
    href: "https://github.com/torourke14",
    target: "_blank",
  },
  {
    key: "linkedin",
    Icon: LinkedinIcon,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/tworourke/",
    target: "_blank",
  },
  {
    key: "mail",
    Icon: MailIcon,
    label: "Email",
    href: "mailto:tannero@live.com?subject=Reaching%20out",
  },
];

export function ProfilePage() {
  return (
    <main className={sty.profileRoot} aria-label="Profile">
      <div className={sty.grid}>
        <div className={sty.photoColumn}>
          <div className={sty.photoPlaceholder}>
            <span>Photo placeholder</span>
          </div>
        </div>

        <div className={sty.body}>
          <h1 className={sty.name}>Tanner O&apos;Rourke</h1>
          <div className={sty.subtitle}>
            Applied Software Engineer · AI/ML, Web &amp; Systems
          </div>

          <p className={sty.paragraph}>
            I&apos;m a software engineer with a focus on applied AI/ML
            systems, full-stack web, and systems design. Currently pursuing
            an MS in AI at UT Austin while working on research at the
            intersection of deep learning and real-world applications.
          </p>

          <p className={sty.paragraph}>
            Previously at DirecTV leading Next.js development on the
            directv.com platform. I enjoy building things that are both
            technically rigorous and carefully considered in their design.
          </p>

          <p className={sty.paragraph}>
            Based in the Pacific Northwest. When not at the keyboard,
            usually somewhere in the mountains.
          </p>

          <div className={sty.skills}>
            {SKILLS.map((s) => (
              <span key={s} className={sty.skillChip}>
                {s}
              </span>
            ))}
          </div>

          <div className={sty.links}>
            {LINKS.map(({ key, Icon, label, href, target }) => (
              <a
                key={key}
                className={sty.linkButton}
                href={href}
                target={target}
                rel={target === "_blank" ? "noopener noreferrer" : undefined}
              >
                <Icon className={sty.linkButtonIcon} />
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
