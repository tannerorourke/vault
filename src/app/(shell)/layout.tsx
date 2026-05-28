import {
  CanvasProvider,
  ParticleCanvasWallpaper,
} from "@/components/navigation/ParticleCanvas";
import Header from "@/components/navigation/Header";
import ContentTransitionProvider from "@/components/navigation/ContentTransitionProvider";

import * as sty from "./layout.css";


export default function ShellLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={sty.shell}>
      <a href="#main-content" className={sty.skipLink}>Skip to main content</a>
      <CanvasProvider>
          <ParticleCanvasWallpaper />
          <Header />
          <div className={sty.content}>
            <ContentTransitionProvider>
              {children}
            </ContentTransitionProvider>
          </div>
      </CanvasProvider>
    </div>
  );
}