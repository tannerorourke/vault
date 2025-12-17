import { style } from "@vanilla-extract/css";

export const pageSection = style({
  display: "flex",
  flexDirection: "column",
  gap: 16,
});

export const headerRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 16,
  borderBottom: "1px solid rgba(0,0,0,0.08)",
  paddingBottom: 12,
});

export const headerLeft = style({
  display: "flex",
  alignItems: "center",
  gap: 12,
});

export const headerRight = style({
  display: "flex",
  alignItems: "center",
  gap: 12,
});

export const logo = style({
  
})

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
