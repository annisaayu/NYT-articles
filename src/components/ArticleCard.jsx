import React from "react";

const ArticleCard = ({ article, isLast}) => {
  const {
    byline,
    headline,
    lead_paragraph,
    pub_date,
    web_url,
    thumbnailUrl,
  } = article;

  const maxLength = 150;
  const truncatedParagraph = lead_paragraph.length > maxLength 
    ? lead_paragraph.slice(0, maxLength) + "..." 
    : lead_paragraph;

  return (
    <article>
      <a
        href={web_url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col lg:flex-row cursor-pointer py-6 hover:bg-foggyGrey"
      >
        {/* Left: Thumbnail Image */}
        <div className="lg:w-1/2 flex items-center">
          <img src={thumbnailUrl} alt={headline.main} className="w-full h-auto object-cover rounded" />
        </div>

        {/* Right: Text Content */}
        <div className="p-4 lg:w-1/2">
          <h2 className="font-serif font-bold text-xl text-charcoal">{headline.main}</h2>
          <p className="text-sm text-gray-600">{byline.original || 'Unknown Author'}</p>
          <p className="text-sm text-gray-500">Published: {new Date(pub_date).toLocaleDateString()}</p>
          <p className="text-sm mt-3 text-gray-500">{truncatedParagraph}</p>
        </div>
      </a>
      {
        !isLast && <div className="border border-t-0 border-l-0 border-r-0 border-darkGrey"></div>
      }
    </article>
  );
};

export default ArticleCard;
