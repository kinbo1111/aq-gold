import SettingsFooter from "./SettingsFooter";
import SettingsModalHeader from "./SettingsModalHeader";
import { useState } from "react";
import { Checkbox } from "@mui/material";
import { useTranslation } from 'react-i18next';
import { message } from "antd";
import { API } from "aws-amplify";
import { deleteVideoByID } from "../../../../graphql/mutations";

interface DeleteContentProps {
  isOpen: boolean;
  title: string;
  id: string;
  onClose: () => void;
}

const DeleteContent: React.FC<DeleteContentProps> = ({ isOpen, id, title, onClose }) => {
  const { t } = useTranslation();
  const [check, setCheck] = useState(true);
  if (!isOpen) return null;
  const handleChange = () => {
    setCheck(!check)
  }

  const handleSave = async () => {
    if (id === '') {
      message.warning('Error deleting this video.');
      return;
    }

    try {
      await API.graphql({
        query: deleteVideoByID,
        variables: { id },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      });
      message.success(title + t(" is completely deleted."))
    } catch (error) {
      message.warning('Error deleting this video.');
    } finally {
      onClose();
    }
  }
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-[999] bg-black bg-opacity-70">
      <div className="relative flex items-center justify-center w-full">
        <div className="max-w-[440px] w-full b-gray-600 rounded-[10px] flex items-center justify-center flex-col">
          <SettingsModalHeader
            onClose={onClose}
            showCloseButton={true}
            label={t("Confirm delete " + title)}
          />
          <div className="p-3">
            <p className="text-white body-1r">
              <Checkbox sx={{ color: '#9fa0a1', borderRadius: '4px', '&.Mui-checked': { color: '#9fa0a1' } }} value={check} onChange={handleChange} />
              {t("Are you sure you want to delete selected "+ title +"?")}
              <br />
              <div className="pl-3">
               
              </div>
            </p>
          </div>
          <SettingsFooter onClose={onClose} isDelete isDisable={check} handleSave={handleSave}/>
        </div>
      </div>
    </div>
  );
};

export default DeleteContent;
