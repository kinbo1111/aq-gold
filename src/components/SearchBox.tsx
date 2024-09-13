import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import { useVideo } from "../contexts/VideoContext";

interface SearchBoxProps {
  initialHistory?: string[];
}

const SearchBox: React.FC<SearchBoxProps> = ({ initialHistory = [] }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { searchVideo } = useVideo();
  const [keyword, setKeyword] = useState<string>("");
  const [history, setHistory] = useState<string[]>(initialHistory);
  const [filteredHistory, setFilteredHistory] = useState<string[]>([]);
  const [results, setResults] = useState<string[]>([]);

  useEffect(() => {
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

  const handleSearch = async () => {
    await searchVideo(keyword)
    navigate('/search/' + keyword)
  }

  return (
    <div className="relative">
        <input
          type="text"
          value={keyword}
          onChange={handleInputChange}
          placeholder={t("search")}
          className="w-[424px] h-12 b-gray-700 border border-[#cec9bf] rounded-[74px] px-[18px] body-1b text-white"
        />
        <button
          type="submit"
          onClick={handleSearch}
          className="absolute top-1/2 right-1 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center brand-gradient"
        >
          <AiOutlineSearch size={20} className="text-white" />
        </button>
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
