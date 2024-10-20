import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  const docsDirectory = path.join(process.cwd(), 'docs');
  const files = fs.readdirSync(docsDirectory).filter((file) => file.endsWith('.md'));
  return NextResponse.json(files);
}
