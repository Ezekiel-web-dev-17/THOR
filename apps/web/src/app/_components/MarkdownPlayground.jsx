"use client"

import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const defaultMarkdown = `# Welcome to the Markdown Playground! 🎨

## What is Markdown?
Markdown is a lightweight markup language that you can use to format text.

### Basic Syntax Examples

**Bold text** and *italic text*

- Bullet point 1
- Bullet point 2
  - Nested item

1. Numbered list
2. Second item

### Code Examples

Inline code: \`const greeting = "Hello World"\`

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet("Developer"));
\`\`\`

### Links and Images

[Visit GitHub](https://github.com)

### Blockquotes

> "The best way to predict the future is to invent it."
> - Alan Kay

### Tables

| Feature | Status |
|---------|--------|
| Headers | ✅ |
| Lists | ✅ |
| Code | ✅ |

---

**Try editing this text!** 👈`;

export default function MarkdownPlayground() {

    const [markdown, setMarkdown] = useState(() => {
        const saved = localStorage.getItem('markdown-playground');
        saved ? saved : defaultMarkdown;
    });

    const [showPreview, setShowPreview] = useState(true);

    const handleChange = (e) => {
        const value = e.target.value;
        setMarkdown(value);
        localStorage.setItem('markdown-playground', value);
    };


    const handleReset = () => {
        setMarkdown(defaultMarkdown);
        localStorage.setItem('markdown-playground', defaultMarkdown);
    };

    const handleClear = () => {
        setMarkdown('');
        localStorage.setItem('markdown-playground', '');
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
            {/* Header */}
            <div className="border-b border-gray-800 bg-gray-950">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold">Markdown Playground</h1>
                            <p className="text-sm text-gray-400 mt-1">
                                Learn and practice markdown syntax in real-time
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setShowPreview(!showPreview)}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors"
                            >
                                {showPreview ? 'Hide Preview' : 'Show Preview'}
                            </button>
                            <button
                                onClick={handleReset}
                                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors"
                            >
                                Reset
                            </button>
                            <button
                                onClick={handleClear}
                                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium transition-colors"
                            >
                                Clear
                            </button>
                        </div>
                    </div>
                </div>
            </div>


            {/* Editor and Preview */}
            <div className="max-w-7xl mx-auto p-4">
                <div className={`grid gap-4 ${showPreview ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
                    
                </div>
            </div>




            {/* Cheat Sheet */}
            <div className="max-w-7xl mx-auto px-4 pb-8">
                <details className="bg-gray-850 rounded-lg p-4 border border-gray-800">
                    <summary className="cursor-pointer font-semibold text-lg mb-4 hover:text-blue-400 transition-colors">
                        📚 Markdown Cheat Sheet
                    </summary>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                        <div>
                            <h4 className="font-semibold mb-2 text-blue-400">Headers</h4>
                            <code className="block bg-gray-900 p-2 rounded mb-2">
                                # H1<br />
                                ## H2<br />
                                ### H3
                            </code>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2 text-blue-400">Emphasis</h4>
                            <code className="block bg-gray-900 p-2 rounded mb-2">
                                *italic* or _italic_<br />
                                **bold** or __bold__<br />
                                ***bold italic***
                            </code>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2 text-blue-400">Lists</h4>
                            <code className="block bg-gray-900 p-2 rounded mb-2">
                                - Item 1<br />
                                - Item 2<br />
                                - Nested<br />
                                <br />
                                1. First<br />
                                2. Second
                            </code>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2 text-blue-400">Links & Images</h4>
                            <code className="block bg-gray-900 p-2 rounded mb-2">
                                [text](url)<br />
                                ![alt](image-url)
                            </code>
                        </div>
                    </div>
                </details>
            </div>

























































































        </div>
    )
}