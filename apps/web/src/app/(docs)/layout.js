import DocsLayout from "@/app/_components/DocsLayout";
import { getDocsTree } from "@/lib/docs";

export default function DocsServerLayout({ children }) {
  const tree = getDocsTree();

  return <DocsLayout tree={tree}>{children}</DocsLayout>;
}
