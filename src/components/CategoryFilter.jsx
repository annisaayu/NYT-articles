import React from 'react';

const CategoryFilter = ({ categories, onSelectCategory, selectedCategory }) => {
  return (
    <div className="p-4 border border-darkGrey border-x-0 border-t-0 flex flex-wrap  items-center justify-center gap-2">
     <p className='p-0 m-0'>Categories: </p>
     <div className='flex flex-wrap items-center justify-center gap-2'>
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
          {console.log(selectedCategory, category)}
          {category.toUpperCase()}
        </button>
      ))}
     </div>
    </div>
  );
};

export default CategoryFilter;
