import { useDebounce } from "../../hooks/useDebounce";
import React, { useState, useMemo, useEffect } from "react";

export interface Tool {
  title: string;
  description: string;
  url: string;
  imgURL: string;
  category: string[];
}

interface ToolsProps {
  tools: Tool[];
  setSearchResults: (results: Tool[]) => void;
}

const Search: React.FC<ToolsProps> = ({ tools, setSearchResults }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

useEffect(() => {
  if (!debouncedSearchQuery) {
    setSearchResults(tools);
    return;
  }

const filtered = tools.filter((tool) =>
  tool.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
  tool.description.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
  tool.category.some((cat) =>
    cat.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
  )
);


  setSearchResults(filtered);
}, [debouncedSearchQuery, tools]);


  const handleSubmit = (e: React.FormEvent) => e.preventDefault();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <header>
      <form className="search" onSubmit={handleSubmit}>
        <input
          className="w-full p-3 text-sm rounded-md bg-[#121212] text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          id="search"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by category..."
        />
      </form>
    </header>
  );
};
export default Search;