import { promises as fs } from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; 

const ChangelogPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  let content = '';
  let error = '';

  try {
    const filePath = path.join(process.cwd(), 'docs', 'Changelog', `${slug}.md`);
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
  const changelogDirectory = path.join(process.cwd(), 'docs', 'Changelog');
  const changelogFiles = await fs.readdir(changelogDirectory);

  const paths = changelogFiles.map((file) => ({ slug: file.replace('.md', '') }));
  return paths;
}

export default ChangelogPage;
