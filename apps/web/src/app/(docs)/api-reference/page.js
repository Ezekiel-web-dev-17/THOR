import DocsLayout from "@/app/_components/DocsLayout";

export const metadata = {
  title: 'API Reference - Docs',
  description: 'Complete API reference',
};

export default function ApiReference() {
  return (
    <DocsLayout>
      <h1 className="text-3xl font-bold mb-4">API Reference</h1>
      <p className="mb-4">
        Complete reference for all available APIs and methods.
      </p>
      <div className="border-l-4 border-gray-300 pl-4 mb-4">
        <h3 className="font-semibold">useState()</h3>
        <p className="text-sm text-gray-600">
          Hook for managing state in functional components
        </p>
      </div>
      <div className="border-l-4 border-gray-300 pl-4 mb-4">
        <h3 className="font-semibold">useEffect()</h3>
        <p className="text-sm text-gray-600">
          Hook for side effects in functional components
        </p>
      </div>
      <div className="border-l-4 border-gray-300 pl-4 mb-4">
        <h3 className="font-semibold">useContext()</h3>
        <p className="text-sm text-gray-600">
          Hook for consuming context values
        </p>
      </div>
    </DocsLayout>
  );
}