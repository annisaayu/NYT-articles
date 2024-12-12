import React, { useCallback, useEffect, useState } from "react";
import { fetchArticles } from "../services/api";
import ArticleCard from "../components/ArticleCard";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";

const Home = () => {
  const [articles, setArticles] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [q, setQuery] = useState('')
  const [category, setCategory] = useState(null)

  const maxPage = 10

  const categories = ["arts", "movies", "technology", "sports", "science"];
  
  const handleSearch = useCallback(async (query, pageNum = 1) => {
    setIsLoading(true);
    try {
      const result = await fetchArticles(query, pageNum, category);
      if (result.length === 0 || pageNum === 10) {
        setHasMore(false);
      } else {
        setArticles((prevArticles) => (pageNum === 1 ? result : [...prevArticles, ...result]));
        setError(null);
      }
    } catch (e) {
      setError(e?.message ?? 'Failed to fetch the articles. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [category]);

  const handleCategorySelect = useCallback((selectedCategory) => {
    setCategory(selectedCategory);
    setArticles([]);
    setPage(1);
    setHasMore(true);
  }, []);

  useEffect(() => {
    if (page === 1) {
      setArticles([]);
    }
    handleSearch(q, page);
  }, [page, q, category, handleSearch]); 

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 100 &&
        !isLoading &&
        hasMore &&
        page < maxPage
      ) {
        setPage((prevPage) => {
          if(error) {
            return prevPage
          } else {
            return  prevPage === 10 ? prevPage : prevPage + 1
          }
         
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, isLoading, page]);

  // const handleSearch = async (query, pageNum = 1) => {
  //   setIsLoading(true)
  //   try {
  //     const result = await fetchArticles(query, pageNum, category);
  //     if (result.length === 0 || pageNum === 10) {
  //       setHasMore(false);

  //     } else {
  //       setArticles((prevArticles) => (pageNum === 1 ? result : [...prevArticles, ...result]));
  //       setError(null);
  //     }
  //   } catch (e) {
  //     setError(e?.message ?? 'Failed to fetch the articles. Please try again.');
  //   } finally {
  //     setIsLoading(false);
  //     setHasMore(false)
  //   }
  // }

  // const handleCategorySelect = (selectedCategory) => {
  //   setCategory(selectedCategory);
  //   setPage(1);
  //   setHasMore(true);
  //   setArticles([]);
  // };

  return (
    <div className="max-w-screen-md min-h-screen mx-auto border border-t-0 border-b-0 border-darkGrey">
      <h1 className="font-serif font-bold text-6xl text-center mb-4 px-4 py-8 text-charcoal">NYT Article Search</h1>
      <SearchBar 
        onSearch={(query) => {
          setPage(1);
          setArticles([]);
          setHasMore(true);
          setQuery(query);
        }} 
        isLoading={isLoading} 
      />

      <CategoryFilter
        categories={categories}
        selectedCategory={category}
        onSelectCategory={handleCategorySelect}
      />
      {error && (
        <div className="text-center text-red-500 my-4">
          <strong>Error:</strong> {error}
        </div>
      )}
      <div className="mt-4 p-4">
        {articles.map((article, index) => (
          <ArticleCard 
            key={article._id} 
            article={article}
            isLast={index === articles.length - 1}
          />
        ))}
      </div>

      {(articles.length === 0 && !error && !isLoading) && <p className="text-center mt-4 text-gray-500">No articles found. Please try another keyword.</p>
      }

      {isLoading && <p className="text-center mt-4 text-charcoal">Loading...</p>}

      {(!isLoading && !hasMore && articles.length > 0) && (
        <p className="text-center mt-4 text-gray-500">You have reached the end of the results.</p>
      )}
    </div>
  )
}

export default Home;
