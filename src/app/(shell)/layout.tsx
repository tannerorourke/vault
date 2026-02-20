import Header from "@/components/navigation/Header";
import * as sty from "./layout.css";
import ContentTransitionProvider from "@/components/navigation/ContentTransitionProvider";

export default function ShellLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={sty.shell}>
      <Header />
      <div className={sty.content}>
        <ContentTransitionProvider>{children}</ContentTransitionProvider>
      </div>
    </div>
  )
  
}