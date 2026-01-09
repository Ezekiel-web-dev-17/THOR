import fs from "fs";
import path from "path";

const CONTENT_PATH = path.join(process.cwd(), "content");

export function getDocsTree() {

  // Check if content directory exists
  if (!fs.existsSync(CONTENT_PATH)) {
    console.warn("Content directory not found:", CONTENT_PATH);
    return [];
  }
  function walk(dir) {

    return fs.readdirSync(dir).map((file) => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        return {
          type: "folder",
          name: file,
          children: walk(fullPath),
        };
      }


      if (file.endsWith(".mdx")) {
        const relativePath = path.relative(CONTENT_PATH, fullPath);
        const route = `/${relativePath.replace(/\\/g, "/").replace(/\.mdx$/, "")}`;
        return {
          type: "file",
          name: file.replace(".mdx", ""),
          path: route,
          route: route,
        };
      }

      return null;

    }).filter(Boolean);
  }

  return walk(CONTENT_PATH);
}
