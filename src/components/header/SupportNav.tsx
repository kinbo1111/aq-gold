import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";

const SupportNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const { i18n, t  } = useTranslation();

  const handleLocaleChange = (locale: String) => {
    if (locale === 'jp') {
      i18n.changeLanguage('jap')
      setSelectedLanguage('日本語')

    } else {
      i18n.changeLanguage('en');
      setSelectedLanguage('English')
    }  
    setIsOpen(false)
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="py-2 flex items-center justify-end bg-transparent gap-4">
      {/* <Link to="/" className="body-2b text-white">{t("help")}</Link> */}
      <div className="relative inline-block text-left">
        <div>
          <button
            type="button"
            className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-trasparent px-1 body-2b  text-white border-none"
            id="menu-button"
            aria-expanded={isOpen}
            aria-haspopup="true"
            onClick={toggleDropdown}
          >
            {selectedLanguage}
            <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        {isOpen && (
          <div className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md overflow-hidden shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
            <div className="py-1" role="none">
              <ul id="dropdown-content" className="dropdown-content">
                <li className="block px-4 py-2 text-sm text-white b-gray-600 hover:bg-[#585a5c] cursor-pointer" role="menuitem" id="menu-item-0" onClick={() => handleLocaleChange("en")}>English</li>
                <li className="block px-4 py-2 text-sm text-white b-gray-600 hover:bg-[#585a5c] cursor-pointer" role="menuitem" id="menu-item-1" onClick={() => handleLocaleChange("jp")}>日本語</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupportNav;
