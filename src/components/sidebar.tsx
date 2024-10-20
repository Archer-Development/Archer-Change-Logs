'use client';

import Link from 'next/link';
import { useState } from 'react';

interface SidebarProps {
  changelogFiles: string[];
  documentationFiles: string[];
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  changelogFiles,
  documentationFiles,
  isSidebarOpen,
  toggleSidebar,
}) => {
  const [isDocOpen, setIsDocOpen] = useState(false);
  const [isChangelogOpen, setIsChangelogOpen] = useState(false);

  const toggleDocs = () => setIsDocOpen((prev) => !prev);
  const toggleChangelog = () => setIsChangelogOpen((prev) => !prev);

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed top-[4rem] left-0 z-40 w-64 h-[calc(100vh-4rem)] bg-black text-white border-r border-gray-600 transition-transform duration-300 ease-in-out 
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 md:sticky md:top-[4rem]`}
      >
        <div className="p-4 overflow-y-auto h-full">
          {/* Documentation Section */}
          <h2
            className="text-lg font-bold cursor-pointer flex justify-between items-center"
            onClick={toggleDocs}
          >
            Documentation
            <span className="ml-2">{isDocOpen ? '-' : '+'}</span>
          </h2>
          {isDocOpen && (
            <ul className="ml-4 space-y-2 mt-2">
              {documentationFiles.map((file) => (
                <li key={file}>
                  <Link
                    href={`/docs/Documentation/${file.replace('.md', '')}`}
                    className="hover:underline"
                  >
                    {file.replace('.md', '')}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {/* Changelog Section */}
          <h2
            className="mt-4 text-lg font-bold cursor-pointer flex justify-between items-center"
            onClick={toggleChangelog}
          >
            Changelog
            <span className="ml-2">{isChangelogOpen ? '-' : '+'}</span>
          </h2>
          {isChangelogOpen && (
            <ul className="ml-4 space-y-2 mt-2">
              {changelogFiles.map((file) => (
                <li key={file}>
                  <Link
                    href={`/docs/Changelog/${file.replace('.md', '')}`}
                    className="hover:underline"
                  >
                    {file.replace('.md', '')}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black opacity-50 md:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Sidebar;
