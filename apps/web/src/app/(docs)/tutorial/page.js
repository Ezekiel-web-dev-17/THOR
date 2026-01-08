import DocsLayout from "@/app/_components/DocsLayout";

export const metadata = {
  title: 'Tutorial: Hello World - Docs',
  description: 'Build your first component',
};

export default function Tutorial() {
  return (
    <DocsLayout>
      <h1 className="text-3xl font-bold mb-4">Tutorial: Hello World</h1>
      <p className="mb-4">
        Let us build your first component. This is the fundamental building 
        block of any application.
      </p>
      <h2 className="text-2xl font-semibold mb-3 mt-6">Step 1: Create a Component</h2>
      <div className="bg-gray-900 text-gray-100 p-4 rounded mb-4">
        <pre><code>{`function HelloWorld() {
  return <h1>Hello, World!</h1>;
}`}</code></pre>
      </div>
      <h2 className="text-2xl font-semibold mb-3 mt-6">Step 2: Render It</h2>
      <p className="mb-4">
        Now you can use this component anywhere in your app.
      </p>
    </DocsLayout>
  );
}