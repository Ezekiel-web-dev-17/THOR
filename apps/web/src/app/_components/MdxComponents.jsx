import { Callout } from "./Callout";


export const mdxComponents = {
  h1: (props) => (
    <h1 className="mt-8 mb-4 text-4xl font-bold tracking-tight" {...props} />
  ),
  h2: (props) => (
    <h2 className="mt-10 mb-3 text-2xl font-semibold" {...props} />
  ),
  p: (props) => (
    <p className="mb-4 text-base leading-7 text-muted-foreground" {...props} />
  ),
  ul: (props) => (
    <ul className="pl-6 mb-4 space-y-2 list-disc" {...props} />
  ),
  code: (props) => (
    <code className="rounded bg-muted px-1.5 py-0.5 text-sm" {...props} />
  ),
  pre: (props) => (
    <pre className="p-4 mb-6 overflow-x-auto rounded-lg bg-zinc-900 text-zinc-100" {...props} />
  ),
   blockquote: (props) => (
    <blockquote
      className="pl-6 mt-6 italic bg-gray-300 border-l-2 text-muted-foreground"
      {...props}
    />
  ),
  Callout,
};

// export const darkMarkdownComponents = {
//   code({ node, inline, className, children, ...props }) {
//       const match = /language-(\w+)/.exec(className || '');
//       return !inline && match ? (
//         <SyntaxHighlighter
//           style={vscDarkPlus}
//           language={match[1]}
//           PreTag="div"
//           {...props}
//         >
//           {String(children).replace(/\n$/, '')}
//         </SyntaxHighlighter>
//       ) : (
//         <code className="bg-gray-700 px-1.5 py-0.5 rounded text-sm" {...props}>
//           {children}
//         </code>
//       );
//     },
  
//   h1: ({ children }) => (
//     <h1 className="mt-8 mb-4 text-3xl font-bold text-gray-900 dark:text-gray-100">{children}</h1>
//   ),
//   h2: ({ children }) => (
//     <h2 className="mt-6 mb-3 text-2xl font-bold text-gray-900 dark:text-gray-100">{children}</h2>
//   ),
//   h3: ({ children }) => (
//     <h3 className="mt-4 mb-2 text-xl font-bold text-gray-900 dark:text-gray-100">{children}</h3>
//   ),
//   p: ({ children }) => (
//     <p className="mb-4 leading-relaxed text-gray-500 dark:text-gray-200">{children}</p>
//   ),
//   a: ({ children, href }) => (
//     <a href={href} className="text-blue-600 underline hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300" target="_blank" rel="noopener noreferrer">
//       {children}
//     </a>
//   ),
//   ul: ({ children }) => (
//     <ul className="mb-4 space-y-2 text-gray-700 list-disc list-inside dark:text-gray-400">{children}</ul>
//   ),
//   ol: ({ children }) => (
//     <ol className="mb-4 space-y-2 text-gray-700 list-decimal list-inside dark:text-gray-400">{children}</ol>
//   ),
//   li: ({ children }) => (
//     <li className="mb-2 text-gray-700 dark:text-gray-400">{children}</li>
//   ),
//   i: ({ children }) => (
//     <i className="text-gray-700 dark:text-gray-400">{children}</i>
//   ),
//   blockquote: ({ children }) => (
//     <blockquote className="py-2 pl-4 my-4 italic text-gray-300 bg-gray-300 border-l-4 border-blue-500 rounded dark:text-gray-40">
//       {children}
//     </blockquote>
//   ),
//   table: ({ children }) => (
//     <div className="my-4 overflow-x-auto">
//       <table className="min-w-full text-gray-700 border border-gray-700 dark:text-gray-300">{children}</table>
//     </div>
//   ),
//   th: ({ children }) => (
//     <th className="px-4 py-2 font-semibold text-left text-gray-200 bg-gray-900 border border-gray-700 dark:text-gray-300">
//       {children}
//     </th>
//   ),
//   td: ({ children }) => (
//     <td className="px-4 py-2 text-gray-700 border border-gray-700 dark:text-gray-300 dark:bg-gray-800">{children}</td>
//   ),
//   hr: () => <hr className="my-8 border-gray-700" />,
// };

export const darkMarkdownComponents = {
  h1: (props) => (
    <h1 className="mt-8 mb-4 text-4xl font-bold tracking-tight text-white" {...props} />
  ),
  h2: (props) => (
    <h2 className="mt-10 mb-3 text-2xl font-semibold" {...props} />
  ),
  p: (props) => (
    <p className="mb-4 text-base leading-7 text-muted-foreground" {...props} />
  ),
    ul: ({ children }) => (
        <ul className="mb-4 space-y-2 text-gray-700 list-disc list-inside dark:text-gray-400">{children}</ul>
      ),
      ol: ({ children }) => (
        <ol className="mb-4 space-y-2 text-gray-700 list-decimal list-inside dark:text-gray-400">{children}</ol>
      ),
  code: (props) => (
    <code className="rounded bg-muted px-1.5 py-0.5 text-sm" {...props} />
  ),
  pre: (props) => (
    <pre
      className="p-4 mb-6 overflow-x-auto text-gray-700 rounded-lg dark:bg-gray-700 dark:text-gray-300"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="pl-6 mt-6 italic text-gray-700 border-l-2 dark:bg-gray-700 dark:text-gray-300 "
      {...props}
    />
  ),
    a: (props) => (
        <a href={props.href} className="text-blue-600 underline hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300" target="_blank" rel="noopener noreferrer">
          {props.children}
        </a>
      ),

  i: ({ children }) => (
        <i className="italic font-bold text-gray-600 dark:text-gray-400">{children}</i>
      ),
table: ({ children }) => (
    <div className="my-4 overflow-x-auto">
      <table className="min-w-full text-gray-700 border border-gray-700 dark:text-gray-300">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="px-4 py-2 font-semibold text-left text-gray-200 bg-gray-900 border border-gray-700 dark:text-gray-300">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-2 text-gray-700 border border-gray-700 dark:text-gray-300 dark:bg-gray-800">{children}</td>
  ),
  hr: () => <hr className="my-8 border-gray-700" />,
};
