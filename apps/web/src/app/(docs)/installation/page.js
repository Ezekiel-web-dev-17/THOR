import DocsLayout from "@/app/_components/DocsLayout";

export const metadata = {
  title: 'Installation - Docs',
  description: 'How to install and set up',
};

export default function Installation() {
  return (
    <DocsLayout>
      <h1 className="text-3xl font-bold mb-4">Installation</h1>
      <p className="mb-4">
        To get started, you will need to install the necessary dependencies.
      </p>
      <div className="bg-gray-900 text-gray-100 p-4 rounded mb-4">
        <code>npm install react react-dom</code>
      </div>
      <p className="mb-4">Or if you prefer yarn:</p>
      <div className="bg-gray-900 text-gray-100 p-4 rounded">
        <code>yarn add react react-dom</code>
      </div>
    </DocsLayout>
  );
}