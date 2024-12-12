import React, { useCallback, useEffect, useState } from "react";
import { fetchArticles } from "../services/api";
import ArticleCard from "../components/ArticleCard";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import Footer from "../components/Footer";
import StatusMessage from "../components/StatusMessage";

const Home = () => {
  const [articles, setArticles] = useState([])
  const [error, setError] = useState(false)
  const [errMsg, setErrMsg] = useState('false')
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [q, setQ] = useState('')
  const [category, setCategory] = useState(null)

  const maxPage = 10

  const categories = ["arts", "movies", "technology", "sports", "Business Day"];

  const handleClickHeader = () => {
    window.location.reload()
  };
  
  const handleSearch = useCallback(async (query, pageNum = 1) => {
    setIsLoading(true)
    setError(false)
    setErrMsg('')
    try {
      const result = await fetchArticles(query, pageNum, category);
      if (result.length === 0 || pageNum === 10) {
        setHasMore(false);
      } else {
        setArticles((prevArticles) => (pageNum === 1 ? result : [...prevArticles, ...result]));
      }
    } catch (e) {
      setError(true)
      setErrMsg(e?.message ?? 'Failed to fetch the articles. Please try again.');
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
  }, [hasMore, isLoading, page, error]);

  return (
    <div className="max-w-screen-md mx-auto flex flex-col min-h-screen border border-t-0 border-b-0 border-darkGrey">
      <main className="flex-grow">
        <h1
          className="font-serif font-bold text-6xl text-center mb-4 px-4 py-8 text-charcoal hover:cursor-pointer"
          onClick={handleClickHeader}
        >
          NYT Article Search
        </h1>
        <SearchBar 
          onSearch={(query) => {
            setPage(1);
            setArticles([]);
            setHasMore(true);
            setQ(query);
          }} 
          isLoading={isLoading} 
        />

        <CategoryFilter
          categories={categories}
          selectedCategory={category}
          onSelectCategory={handleCategorySelect}
        />
        {error && (
          <p className="text-center text-redorg my-4">
            <strong>Error:</strong> {errMsg}
          </p>
        )}

        <div className="p-4">
          {articles.map((article, index) => (
            <ArticleCard 
              key={article._id} 
              article={article}
              isLast={index === articles.length - 1}
            />
          ))}
        </div>
        
        <StatusMessage
          isLoading={isLoading}
          error={error}
          emptyArticles={articles.length === 0}
        />
      </main>

      <Footer/>
    </div>
  )
}

export default Home;
