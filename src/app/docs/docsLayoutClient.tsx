'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Navbar from '@/components/nav';
import Sidebar from '@/components/sidebar';

interface DocsLayoutClientProps {
    changelogFiles: string[];
    documentationFiles: string[];
    children: React.ReactNode;
    headers: { title: string; file: string; type: "Documentation" | "Changelog" }[]; 
}

const DocsLayoutClient: React.FC<DocsLayoutClientProps> = ({
  changelogFiles,
  documentationFiles,
  children,
  headers,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    console.log('Headers updated:', headers);
  }, [headers]);

  return (
    <div className="flex flex-col h-screen">
      <Navbar
        toggleSidebar={toggleSidebar}
        searchQuery={searchQuery}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
        headers={headers}
      />
      <div className="flex flex-1 relative">
        <Sidebar
          changelogFiles={changelogFiles}
          documentationFiles={documentationFiles}
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <main className="flex-1 p-4 overflow-auto">
          <div className="mt-4">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DocsLayoutClient;
