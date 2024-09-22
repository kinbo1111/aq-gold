import React from "react";
import FaqItem from "./FaqItem";
import { faqData } from "../../utils/content";
import { useTranslation } from 'react-i18next';

const FaqList = () => {
  const { t } = useTranslation();
  return ( 
    <div className="p-8 rounded-lg b-gray-500">
        <h1 className="h7 text-center brand-600">{t("Frequently Asked Questions")}</h1>
        <div className="accordion">
            {faqData.map(({ question, answer, index }) => (
            <FaqItem question={question} answer={answer} key={index} />
            ))}
        </div>
    </div>
  );
};

export default FaqList;
