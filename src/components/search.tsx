import { useState, useEffect } from 'react';

interface SearchComponentProps {
  headers: string[];
}

const SearchComponent: React.FC<SearchComponentProps> = ({ headers }) => {
  const [query, setQuery] = useState('');
  const [filteredHeaders, setFilteredHeaders] = useState<string[]>(headers);

  useEffect(() => {
    const results = headers.filter((header) =>
      header.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredHeaders(results);
  }, [query, headers]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search headers..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border rounded p-2"
      />
      <ul>
        {filteredHeaders.map((header, index) => (
          <li key={index} className="py-1">
            {header}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchComponent;
