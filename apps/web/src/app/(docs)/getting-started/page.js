import DocsLayout from "@/app/_components/DocsLayout";

export const metadata = {
  title: 'Getting Started - Docs',
  description: 'Get started with our documentation',
};


export default function GettingStarted() {
  return (
    <DocsLayout>
      <h1 className="text-3xl font-bold mb-4">Getting Started</h1>
      <p className="mb-4">
        Welcome to the documentation! This is a production-ready single-page 
        application built with Next.js that demonstrates instant navigation 
        without page reloads.
      </p>
      <p className="mb-4">
        Click on any link in the sidebar to navigate instantly between pages. 
        The content updates immediately without any loading delay.
      </p>
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-6">
        <p className="font-semibold">Note</p>
        <p className="text-sm mt-2">
          This tutorial is designed for people who prefer learning by doing 
          and want to quickly try making something tangible.
        </p>
      </div>
    </DocsLayout>
  );
}