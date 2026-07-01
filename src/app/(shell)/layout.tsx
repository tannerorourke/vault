import WorkIndex from "@/components/pages/WorkIndex";
import ConnectIndex from "@/components/pages/ConnectIndex";

import Header from "@/components/navigation/Header";
import DrawerProvider from "@/components/providers/DrawerProvider";
import ContentTransitionProvider from "@/components/providers/ContentTransitionProvider";

import * as sty from "./layout.css";


export default function ShellLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={sty.shell}>
      <a href="#main-content" className={sty.skipLink}>Skip to main content</a>
      <DrawerProvider>
        <Header work={<WorkIndex />} connect={<ConnectIndex />} />

        <ContentTransitionProvider>
          {children}
        </ContentTransitionProvider>
      </DrawerProvider>
    </div>
  );
}
