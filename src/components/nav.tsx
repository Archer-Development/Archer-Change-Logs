import Link from 'next/link';
import { FaBars } from 'react-icons/fa';
import { useState } from 'react';

interface NavbarProps {
  toggleSidebar: () => void;
  headers: { title: string; file: string; type: 'Documentation' | 'Changelog' }[];
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchQuery: string;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar, headers, searchQuery, onSearchChange }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleFocus = () => setShowDropdown(true);
  const handleBlur = () => setTimeout(() => setShowDropdown(false), 100);

  // Normalize and filter headers based on the search query
  const filteredHeaders = headers.filter(header => {
    const normalizedTitle = header.title.toLowerCase().trim();
    const normalizedQuery = searchQuery.toLowerCase().trim();
    
    return normalizedTitle.includes(normalizedQuery);
  });

  return (
    <nav className="bg-black text-white border-b border-gray-600 p-4 flex items-center justify-between sticky top-0 z-50">
      <ul className="flex space-x-4">
        <li>
          <Link href="https://www.archer.is/" className="text-white">Home</Link>
        </li>
        <li>
          <Link href="/docs" className="text-white">Documentation</Link>
        </li>
      </ul>

      <button className="md:hidden" onClick={toggleSidebar}>
        <FaBars size={24} />
      </button>

      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e)} 
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="bg-gray-800 text-white p-2 rounded"
          placeholder="Search..."
        />
        {showDropdown && filteredHeaders.length > 0 && (
          <div className="absolute z-50 bg-white border border-gray-300 mt-1 rounded shadow-lg w-64">
            <ul className="max-h-48 overflow-y-auto">
              {filteredHeaders.map(header => (
                <li key={header.title} className="hover:bg-gray-200">
                  <Link
                    href={
                      header.type === 'Changelog'
                        ? `/docs/Changelog/${header.file.replace('.md', '')}`
                        : `/docs/Documentation/${header.file.replace('.md', '')}#${header.title.replace(/\s+/g, '-').toLowerCase()}`
                    }
                    scroll={false}
                    className="block px-4 py-2 text-gray-800 hover:underline"
                    onClick={() => {
                      // Clear search on click
                      onSearchChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>); 
                      setShowDropdown(false);
                    }}
                  >
                    {header.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
