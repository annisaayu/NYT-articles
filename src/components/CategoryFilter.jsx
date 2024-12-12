import React from 'react';

const CategoryFilter = ({ categories, onSelectCategory, selectedCategory }) => {
  return (
    <div className="p-4 border border-darkGrey border-x-0 border-t-0 flex flex-col lg:flex-row space-x-2 items-center justify-center">
      <p className='p-0 m-0'>Categories:</p>

      {/* List of categories */}
      <div className="flex flex-wrap justify-center space-x-2 space-y-2 lg:space-y-0 mt-2 lg:mt-0">
        {categories.map((category) => (
          <button 
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`text-sm border border-darkGrey rounded-full px-6 py-2
              ${category === selectedCategory 
                ? "bg-darkGrey text-pearl hover:bg-pearl hover:text-darkGrey"
                : "bg-pearl text-darkGrey hover:bg-darkGrey hover:text-pearl"
              } 
            `}
          >
            {category.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
