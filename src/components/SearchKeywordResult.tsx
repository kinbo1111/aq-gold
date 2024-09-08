import React from 'react';

const keywordData = [
  "Japanese Anime",
  "Anime series",
  "Romance Anime",
  "Action Anime",
  "Magic Anime",
  "Horror Anime",
  "Japanese Anime series"
];

export type SearchKeywordProps = {
  keyword: string;
}

const SearchKeywordResult: React.FC<SearchKeywordProps> = ({ keyword }) => {

  return (
    <div className="py-6 px-3 mt-6">
      <ul className="flex items-center justify-start flex-wrap">
        {/* {keywordData.map((keyword, index) => ( */}
          <li className="border border-[#585a5c] b-gray-500 rounded-md px-2 py-1 body-2r text-white mr-2 mb-2">
            {keyword}
          </li>
        {/* ))} */}
      </ul>
    </div>
  );
};

export default SearchKeywordResult;
