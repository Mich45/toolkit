import React from 'react';
interface CategoriesProps {
  categories: string[];
  handler: (category:string) => void;
}

export default function Categories({ categories, handler }: CategoriesProps) {

  return (
    <div className="flex flex-wrap mt-10 justify-center gap-4 p-8 font-inter">
      {categories.map((category, index) => (
        <div
          key={index}
          className="relative"
        >
          <button 
          onClick={ () => handler(category)}
          className="flex items-center justify-center px-6 py-3 rounded-md bg-[#daeafb] text-[#0d141c] leading-normal hover:bg-[#d5e2ef] focus:outline-none transition-all duration-200">
            {
              category.length == 2 ? category.toUpperCase() : category.charAt(0).toUpperCase() + category.slice(1)
            }
          </button>
        </div>
      ))}
    </div>
  );
}
