import { promises as fs } from 'fs';
import path from 'path';
import DocsLayoutClient from './docsLayoutClient';
export const dynamic = 'force-dynamic';

const DocsLayout = async ({ children }: { children: React.ReactNode }) => {
  const docsDirectory = path.join(process.cwd(), 'docs', 'Documentation');
  const changelogDirectory = path.join(process.cwd(), 'docs', 'Changelog');

  const documentationFiles = await fs.readdir(docsDirectory);
  const changelogFiles = await fs.readdir(changelogDirectory);

  const allHeaders: { title: string; file: string; type: 'Documentation' | 'Changelog' }[] = [];

  // Extract headers from documentation files
  for (const file of documentationFiles) {
    const res = await fs.readFile(path.join(docsDirectory, file), 'utf-8');
    const matches = res.match(/# (.+)/g);
    if (matches) {
      matches.forEach((match) => {
        allHeaders.push({ title: match.replace('# ', ''), file, type: 'Documentation' });
      });
    }
  }

  // Extract headers from changelog files
  for (const file of changelogFiles) {
    const res = await fs.readFile(path.join(changelogDirectory, file), 'utf-8');
    const matches = res.match(/# (.+)/g);
    if (matches) {
      matches.forEach((match) => {
        allHeaders.push({ title: match.replace('# ', ''), file, type: 'Changelog' });
      });
    }
  }

  console.log('Extracted Headers:', allHeaders); // Debugging log

  return (
    <DocsLayoutClient
      changelogFiles={changelogFiles}
      documentationFiles={documentationFiles}
      headers={allHeaders}
    >
      {children}
    </DocsLayoutClient>
  );
};

export default DocsLayout;
