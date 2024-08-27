import SettingsFooter from "./SettingsFooter";
import SettingsModalHeader from "./SettingsModalHeader";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from 'react-i18next';
import Input from "../../../../components/inputs/Input";
import { message } from "antd";
import { editVideoTitle } from "../../../../graphql/mutations";
import { API } from "aws-amplify";

interface EditContentProps {
  isOpen: boolean;
  title: string;
  id: string;
  onClose: () => void;
}

const EditContent: React.FC<EditContentProps> = ({ isOpen, id, title, onClose }) => {
  const { t } = useTranslation();
  const [videoTitle, setVideoTitle] = useState(title)
  const { register, handleSubmit, formState: { errors },} = useForm();
  
  if (!isOpen) return null;


  const handleSave = async (): Promise<void> => {
    if (videoTitle.trim() === '') {
      message.warning(t("Title cannot be empty"));
      return;
    }

    try {
      await API.graphql({
        query: editVideoTitle,
        variables: { id, title:videoTitle },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      });

      message.success(`${videoTitle} ${t("is completely Edited.")}`);
    } catch (error) {
      message.warning('Error editing this video.');
    } finally {
      onClose();
    }
  };


  return (
    <div className="fixed inset-0 flex items-center justify-center z-[999] bg-black bg-opacity-70">
      <div className="relative flex items-center justify-center w-full">
        <div className="max-w-[440px] w-full b-gray-600 rounded-[10px] flex items-center justify-center flex-col">
          <SettingsModalHeader
            onClose={onClose}
            showCloseButton={true}
            label={t("Edit " + title)}
          />
          <div className="p-4 w-full">
              <Input
                    id="videoTitle"
                    label={t("Title")}
                    redRequired
                    placeholder={t("Add a title that describes your video")}
                    type="text"
                    value={videoTitle}
                    onChange={e => setVideoTitle(e.target.value)}
                    register={register}
                    errors={errors}
                    small
                  />
              <br />
          </div>
          <SettingsFooter onClose={onClose} isDisable={!videoTitle?.length} handleSave={handleSave}/>
        </div>
      </div>
    </div>
  );
};

export default EditContent;
