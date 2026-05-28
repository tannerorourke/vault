import Text from "@/components/ui/Text";
import TextLink from "@/components/ui/TextLink";

import * as sty from "./not-found.css";

export default function NotFound() {
  return (
    <main className={sty.page}>
      <Text as="h1" variant="titleLg" tone="title">
        Page not found
      </Text>
      <Text as="p" variant="bodyLg" tone="secondary">
        Oops! The page you&apos;re looking for doesn&apos;t exist or has moved.
      </Text>
      <TextLink 
        intent="navigation"
        label="Back to home"
        leftIcon={{ name: "arrow-left", hold: true }}
        nextProps={{ href: "/", prefetch: true}}
        textProps={{ as: "p", variant: "bodyLg", tone: "title", className: sty.link }}
      />
    </main>
  );
}
