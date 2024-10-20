import { promises as fs } from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const DocumentationPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  let content = '';
  let error = '';

  try {
    const filePath = path.join(process.cwd(), 'docs', 'Documentation', `${slug}.md`);
    content = await fs.readFile(filePath, 'utf8');
  } catch {
    error = 'Document not found';
  }

  return (
    <div className="p-4">
      {error ? (
        <div>Error: {error}</div>
      ) : (
        <div className="markdown-container">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};
// Generating statics params for the dynamic route
export async function generateStaticParams() {
  const documentationDirectory = path.join(process.cwd(), 'docs', 'Documentation');
  const documentationFiles = await fs.readdir(documentationDirectory);

  const paths = documentationFiles.map((file) => ({ slug: file.replace('.md', '') }));
  return paths;
}

export default DocumentationPage;
