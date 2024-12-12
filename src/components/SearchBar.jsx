import PropTypes from "prop-types";
import React, { useState } from "react";

const SearchBar = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('')

  const handleSearch = () => {
    onSearch(query)
  }

  return (
    <div className="px-4 border border-darkGrey border-x-0 py-2 flex items-center">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search articles..."
        className="p-2 rounded w-full bg-pearl focus:outline-none"
      />
      <button 
        className="border border-darkGrey bg-pearl text-darkGrey px-6 py-2 rounded-full hover:bg-darkGrey hover:text-pearl transition-colors disabled:bg-foggyGrey disabled:cursor-not-allowed disabled:text-darkGrey"
        onClick={handleSearch}
        disabled={isLoading || !query.trim()}
      >
        {isLoading ? 'Searching...' : 'Search'}
      </button>
    </div>
  )
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

export default SearchBar;