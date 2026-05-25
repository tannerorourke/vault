import Sheet from "@/components/ui/Sheet";
import Text from "@/components/ui/Text";
import TextLink from "@/components/ui/TextLink";
import { FOOTER, REPO_LINK } from "@/content/nav-links";
import * as sty from "./footer.css";
import { ComponentProps } from "react";


export type FooterProps = ComponentProps<'div'> & {
  withDivider?: boolean
};

export function Footer({ className, withDivider, ...rest }: FooterProps) {
  return (
    <div className={className} {...rest}>
      {withDivider && 
        <hr className={sty.divider} aria-hidden="true" />
      }
      <Sheet className={sty.footerSheet}>
        <Text
          as="span"
          variant="bodySm"
          tone="secondary"
          className={sty.footerLabel}
        >
          {FOOTER}
        </Text>
        <TextLink
          label={'View Source'}
          rightIcon={{ icon: "arrow-right", hold: true }}
          underline="always"
          textProps={{ variant: "bodySm" }}
          nextProps={{
            href: REPO_LINK.href || "#",
            target: REPO_LINK.target,
            rel: REPO_LINK.target === "_blank" ? "noopener noreferrer" : undefined,
            className: sty.footerLink
          }}
          aria-label={REPO_LINK.alt}
        />
      </Sheet>
    </div>
  )
}