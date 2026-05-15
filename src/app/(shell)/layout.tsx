import {
  ParticleCanvasProvider,
  ParticleCanvasWallpaper,
} from "@/components/navigation/ParticleCanvas";
import Header from "@/components/navigation/Header";
import ContentTransitionProvider from "@/components/navigation/ContentTransitionProvider";

import * as sty from "./layout.css";


export default function ShellLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={sty.shell}>
      <ParticleCanvasProvider>
          <ParticleCanvasWallpaper />
          <Header />
          <div className={sty.content}>
            <ContentTransitionProvider>
              {children}
            </ContentTransitionProvider>
          </div>
      </ParticleCanvasProvider>
    </div>
  );
}