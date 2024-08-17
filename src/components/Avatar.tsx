import React, { useEffect, useState } from "react";
import { IconType } from "react-icons";
import placeholder from "../assets/images/placeholder.png";
import { useTranslation } from 'react-i18next';
import { DefaultAvatar } from "../const";
interface AvatarProps {
  src?: string | null | undefined;
  name: string;
  intro?: string;
  icon?: IconType;
  buttonName?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  intro,
  icon: Icon,
  buttonName,
}) => {

  const { t } = useTranslation();

  const [image, setImage] = useState(src);

  const handleError = () => {
    setImage(DefaultAvatar)
  }

  return (
    <div className="flex items-center justify-start gap-4" >
      <img
        className="rounded-full w-[100px] h-[100px]"
        alt="Avatar"
        onError={handleError}
        src={image ?? DefaultAvatar} 
        style={{ objectFit: "cover" }}
      />
      <div>
        <h6 className="text-white font-semibold text-4xl">{name}</h6>
        {intro && <p className="text-base text-[#CBCBCB] mb-[2px] mt-[2px]">{t(intro)}</p>}
        {buttonName && (
          <button className="flex items-center justify-center gap-1 border border-[#c7a76b] text-[12px] text-[#c7a76b] font-semibold rounded py-1 px-2">
            {Icon && <Icon size={12} className="text-[#c7a76b]" />}
            {buttonName}
          </button>
        )}
      </div>
    </div>
  );
};

export default Avatar;
