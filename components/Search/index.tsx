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

const Search: React.FC<ToolsProps> = ({tools, setSearchResults }) => {
    const handleSubmit = (e: React.FormEvent) => e.preventDefault()

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.value) {
          setSearchResults(tools);
          console.log("Running search change")
          return;
        }
      
        const resultsArray: Tool[] = tools.filter((tool: Tool) =>
          tool.category.some((category: string) =>
            category.toLowerCase().includes(e.target.value.toLowerCase())
          )
        );
      
        setSearchResults(resultsArray);
      };
      

    return (
        <header>
            <form className="search" onSubmit={handleSubmit}>
                <input
                    className="w-full p-3 text-sm rounded-md bg-[#121212] text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    id="search"
                    onChange={handleSearchChange}
                />
            </form>
        </header>
    )
}
export default Search