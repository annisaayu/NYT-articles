import React, { useState } from "react";

const SearchBar = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('')
  const [error, setError] = useState(null)

  const handleSearch = () => {
    if (!query.trim()) {
      setError('Keyword cannot be empty.');
      return;
    }
    setError(null)
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
        className="border border-darkGrey bg-pearl text-darkGrey px-6 py-2 rounded-full hover:bg-darkGrey hover:text-pearl transition-colors"
        onClick={handleSearch}
        disabled={isLoading}
      >
        {isLoading ? 'Searching...' : 'Search'}
      </button>
      <span className="text-red-500">{error}</span>
    </div>
  )
}

CategoryFilter.propTypes = {
  onSearch: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

export default SearchBar;