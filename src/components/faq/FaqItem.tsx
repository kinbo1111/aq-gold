import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

interface FaqItemProps {
    question: string;
    answer: string;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer }) => {
    const [isActive, setIsActive] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState('0px');
    const { t } = useTranslation();

    useEffect(() => {
        if (isActive) {
            setHeight(`${contentRef.current?.scrollHeight}px`);
        } else {
            setHeight('0px');
        }
    }, [isActive]);

    return (
        <div className="py-8 cursor-pointer border-b border-[#585a5c]">
            <div className="flex items-center justify-between" onClick={() => setIsActive(!isActive)}>
                <h1 className="font-medium text-[28px] text-white">{t(question)}</h1>
                <div className="text-[16px] text-white font-normal flex items-center justify-center w-[24px] h-[24px] rounded-full border border-white">
                    {isActive ? '-' : '+'}
                </div>
            </div>
            <div
                ref={contentRef}
                style={{ maxHeight: height, transition: 'max-height 0.5s ease', overflow: 'hidden' }}
                className="text-white text-[16px] font-normal"
            >
                <div className="py-2">
                    {t(answer)}
                </div>
            </div>
        </div>
    );
};

export default FaqItem;
