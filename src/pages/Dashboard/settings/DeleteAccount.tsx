import SettingsFooter from "./SettingsFooter";
import SettingsModalHeader from "./SettingsModalHeader";

interface DeleteAccountProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeleteAccount: React.FC<DeleteAccountProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[999] bg-black bg-opacity-70">
      <div className="relative flex items-center justify-center w-full">
        <div className="max-w-[420px] w-full b-gray-600 rounded-[10px] flex items-center justify-center flex-col">
          <SettingsModalHeader
            onClose={onClose}
            showCloseButton={true}
            label="Confirm delete AQ account"
          />
          <div className="p-6">
            <p className="text-white body-1r">
              Are you sure you want to delete your AQ account?
              <br />
              <br />
              All data on your AQ account including AQvr channel are completely deleted.
            </p>
          </div>
          <SettingsFooter onClose={onClose} isDelete />
        </div>
      </div>
    </div>
  );
};

export default DeleteAccount;
