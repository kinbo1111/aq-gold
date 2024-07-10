import React from "react";
import { IconType } from "react-icons";

interface ButtonProps {
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    iconExist?: boolean;
    outline?: boolean;
    icon?: IconType;
    iconSize?: number; // Add iconSize prop
    small?: boolean;
    full?: boolean;
    reverse?:boolean;
    type?:string;
}

const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    disabled,
    iconExist,
    outline,
    icon: Icon,
    iconSize = 8, 
    small,
    full,
    reverse,
    type
}) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
                relative disabled:bg-[#9fa0a1] disabled:text-[#737576] disabled:cursor-not-allowed rounded hover:opacity-80 transition px-4 py-2 flex items-center justify-center
                ${outline ? "bg-transparent" : "brand-gradient"}
                ${outline ? "border border-[#c7a76b]" : "border-none"}
                ${iconExist ? "gap-2" : "gap-0"}
                ${full ? "w-fit" : "w-[320px]"}
                ${small ? "h-10" : "h-12"}
                ${reverse? "flex-row-reverse" : "flex-row"}
            `}
        >
            <div
                className={`whitespace-nowrap
                    ${outline ? "brand-600" : "text-white"}
                    ${small ? "button-2b" : "button-1b"}
                `}
            >
                {label}
            </div>
            {Icon && <Icon size={iconSize} className="text-white" />} {/* Use iconSize prop */}
        </button>
    );
};

export default Button;
