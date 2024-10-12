import { Layout } from "@/components/Layout/Layout";

export default function App({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Layout>{children}</Layout>;
}
