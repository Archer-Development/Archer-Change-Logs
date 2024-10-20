import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export const extractHeadersFromMarkdown = (directory: string) => {
  const markdownFiles = fs.readdirSync(directory);
  const headers: string[] = [];

  markdownFiles.forEach((file) => {
    const filePath = path.join(directory, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { content } = matter(fileContent);
    const fileHeaders = content.match(/^(#+)\s(.+)/gm) || [];
    headers.push(...fileHeaders.map((header) => header.replace(/^(#+)\s/, '')));
  });

  return headers;
};
