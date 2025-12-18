export type ILayoutProps = {
  children: React.ReactNode;
  params: Promise<{ project: string }>
};

export type IPageProps = {
  params: Promise<{ project: string }>;
};