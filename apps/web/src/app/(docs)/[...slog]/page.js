import fs from "fs";
import path from "path";
import { MDXRemote } from "next-mdx-remote/rsc";


const CONTENT_PATH = path.join(
  process.cwd(),
  "apps",
  "web",
  "src",
  "app",
  "(docs)",
  "content"
);

export default async function DocPage({ params }) {

    // Handle when params.slug is undefined (root route)
    const slugArray = params.slug || [];
    
    // If at root, show index.mdx or default content
    const fileName = slugArray.length > 0 ? slugArray.join('/') : 'index';

    const filePath = path.join(
        CONTENT_PATH,
        fileName
    ) + ".mdx";


    
    if (!fs.existsSync(filePath)) {
        return (<div>Document not found</div>);
    }

    const source = fs.readFileSync(filePath, "utf8");

    return <MDXRemote source={source} />;
}