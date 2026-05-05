import Link from "next/link";

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        padding: "48px",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "32px", margin: 0 }}>Page not found</h1>
      <p style={{ margin: 0, color: "#5D6D68" }}>
        Oops! The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Link href="/" style={{ fontWeight: 600, color: "#2A5F58" }}>
        ← Back to home
      </Link>
    </main>
  );
}
