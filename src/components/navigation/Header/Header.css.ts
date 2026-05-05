import { mq } from "@/lib/theme/responsive.css";
import { theme } from "@/lib/theme/theme.css";
import { style } from "@vanilla-extract/css";

export const root = style({
  position: "fixed",
  top: 0, left: 0, right: 0,
  width: "100%",
  zIndex: theme.layout.zIndex.header,

  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  // paddingTop: '56px',
  height: theme.layout.headerHeight,
  
  padding: '32px 16px 0 16px',
  [mq.sm]: { padding: '48px 40px 0 40px' },
  [mq.md]: { padding: '56px 80px 0 80px' }
});

export const headerLeft = style({
  display: "flex",
  alignItems: "flex-start",
  gap: 12,
});

    export const logoContainer = style({
      width: "300px",
      display: "flex",
      flexDirection: "column",
    })

        // export const logoWord = style({
        //   width: 'fit-content',
        //   backgroundImage: `linear-gradient(120deg, ${theme.color.primary.main} 0%, ${theme.color.primary.hover} 100%)`,
        //   backgroundRepeat: "no-repeat",
        //   backgroundSize: "110% 0.2em",
        //   backgroundPosition: "0 88%",
        //   transition: "background-size 0.25s ease-out",
        //   selectors: {
        //     "&:hover": {
        //       backgroundSize: "100% 110%",
        //     }
        //   }
        // })

        export const linkStyles = style({
          color: `${theme.color.canvas} !important`,
          paddingBottom: '2px',
          borderBottom: '2px solid transparent',
          selectors: {
            "&:hover": {
              color: `${theme.color.secondary.main} !important`,
            },
            '&[aria-pressed="true"]': {
              color: `${theme.color.secondary.main} !important`,
              borderBottomColor: theme.color.secondary.main,
            },
          },
        });

export const headerRight = style({
  display: "flex",
  alignItems: "center",
  gap: 12,
});

    export const profileLinkStyles = style({
      color: `${theme.color.canvas} !important`,
      selectors: {
        "&:hover": {
          color: `${theme.color.primary.main} !important`,
        },
      },
    });



// .page {
//   display: flex;
//   min-height: 100vh;
//   align-items: center;
//   justify-content: center;
//   font-family: var(--font-geist-sans);
//   background-color: var(--color-surface-main);
// }

// .main {
//   display: flex;
//   min-height: 100vh;
//   width: 100%;
//   max-width: 800px;
//   flex-direction: column;
//   align-items: flex-start;
//   justify-content: space-between;
//   background-color: var(--color-surface-card);
//   padding: 120px 60px;
// }
