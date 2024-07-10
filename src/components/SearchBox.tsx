import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";

interface SearchBoxProps {
  initialHistory?: string[];
}

const SearchBox: React.FC<SearchBoxProps> = ({ initialHistory = [] }) => {
    const navigate = useNavigate();
  const [keyword, setKeyword] = useState<string>("");
  const [history, setHistory] = useState<string[]>(initialHistory);
  const [filteredHistory, setFilteredHistory] = useState<string[]>([]);
  const [results, setResults] = useState<string[]>([]);

  useEffect(() => {
    // Filter history based on the current keyword
    if (keyword) {       
      setFilteredHistory(history.filter((item) => item.includes(keyword)));
    } else {
      setFilteredHistory([]);
    }
  }, [keyword, history]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleKeywordSelection = (selectedKeyword: string) => {
    setKeyword(selectedKeyword);
    setResults([...results, selectedKeyword]);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (keyword && !history.includes(keyword)) {
      setHistory([keyword, ...history]);
    }
    setResults([...results, keyword]);
    setKeyword("");
  };

  return (
    <div className="relative">
      <form onSubmit={handleFormSubmit} className="relative">
        <input
          type="text"
          value={keyword}
          onChange={handleInputChange}
          placeholder="Enter a keyword"
          className="w-[424px] h-[52px] b-gray-700 border border-[#c7a76b] rounded-[74px] px-[18px] body-1b text-white"
        />
        <button
          type="submit"
          onClick={() => navigate('/dashboard/search')}
          className="absolute top-1/2 right-1 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center brand-gradient"
        >
          <AiOutlineSearch size={20} className="text-white" />
        </button>
      </form>
      {filteredHistory.length > 0 && (
        <div className="search-history overflow-y-scroll b-gray-700 border border-[#c7a76b] rounded-lg mt-1 p-1 h-[240px] relative">
          <ul>
            {filteredHistory.map((item, index) => (
              <li
                key={index}
                onClick={() => handleKeywordSelection(item)}
                className="p-3 gray-50 body-1r text-white"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBox;
