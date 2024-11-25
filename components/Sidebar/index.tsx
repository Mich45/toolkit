import React, { useState } from "react";

type SidebarProps = {
  categories?: string[]; 
  onSearch?: (query: string) => void; 
};

const Sidebar: React.FC<SidebarProps> = ({ categories, onSearch}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: { target: { value: any; }; }) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch!(query);
  };

  return (
    <div className=" pt-9 bg-[#1a1a2e] text-white p-5 rounded-md shadow-md w-full ">
      <div className="mb-5">
        <input
          type="text"
          placeholder="Search tools..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full p-3 text-sm rounded-md bg-[#121212] text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Categories</h3>
        <ul className="space-y-2">
          {categories!.map((category) => (
            <li
              key={category}
              onClick={() => onSearch!(category)}
              className="cursor-pointer capitalize text-gray-300 hover:text-white p-2 rounded-md hover:bg-gray-700 transition"
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
