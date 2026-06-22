import WorkIndex from "@/components/pages/WorkIndex";
import ConnectIndex from "@/components/pages/ConnectIndex";

import NavHub from "@/components/navigation/NavHub";
import SidebarMenu from "@/components/navigation/SidebarMenu";
import ScrollGateway from "@/components/navigation/ScrollGateway";
import DrawerProvider from "@/components/providers/DrawerProvider";
import SourceSnippet from "@/components/navigation/SourceSnippet";
import ContentTransitionProvider from "@/components/providers/ContentTransitionProvider";

import * as sty from "./layout.css";


export default function ShellLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={sty.shell}>
      <a href="#main-content" className={sty.skipLink}>Skip to main content</a>
      <DrawerProvider>
        <SidebarMenu work={<WorkIndex />} connect={<ConnectIndex />} />
        <NavHub />
        <SourceSnippet />

        <ContentTransitionProvider>
          <ScrollGateway />
          {children}
        </ContentTransitionProvider>
      </DrawerProvider>
    </div>
  );
}