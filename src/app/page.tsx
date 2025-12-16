import Image from "next/image";
import styles from "./page.module.css";

import { Button, ButtonProps } from '@base-ui/react/button'; 


export default function Home() {
  return (
    <div className={styles.page}>
      <header>
        <div>
          <Image
            className={styles.logo}
            src="/favicon.jpg"
            alt="Personal logo"
            width={50}
            height={50}
            priority
          />
        </div>
        <div id="links-main">
          <Button>AI/ML</Button>
          <Button>Experience</Button>
          <Button>Research</Button>
          <Button>Labs</Button>
        </div>
        <div id="links-right">
          <Button>Research</Button>
        </div>
      </header>
      <nav>

      </nav>
      <main className={styles.main}>
        
      </main>
    </div>
  );
}
