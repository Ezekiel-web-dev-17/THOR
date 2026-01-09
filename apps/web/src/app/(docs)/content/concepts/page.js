import DocsLayout from "@/app/_components/DocsLayout";

export const metadata = {
  title: 'Core Concepts - Docs',
  description: 'Understanding the core concepts',
};

export default function Concepts() {
  return (
    <DocsLayout>
      <h1 className="text-3xl font-bold mb-4">Core Concepts</h1>
      <p className="mb-4">
        Understanding these concepts will help you build better applications.
      </p>
      <h2 className="text-xl font-semibold mb-2 mt-6">Components</h2>
      <p className="mb-4">
        Components are reusable pieces of UI that can be composed together.
      </p>
      <h2 className="text-xl font-semibold mb-2 mt-6">State</h2>
      <p className="mb-4">
        State allows components to remember information and react to changes.
      </p>
      <h2 className="text-xl font-semibold mb-2 mt-6">Props</h2>
      <p className="mb-4">
        Props let you pass data from parent components to children.
      </p>
    </DocsLayout>
  );
}