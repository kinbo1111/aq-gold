import React, { useState, useEffect, useContext } from "react";
import SettingsModalHeader from "./SettingsModalHeader";
import SettingsModalSidebar from "./SettingsModalSidebar";
import GeneralSettings from "./GeneralSettings";
import SettingsFooter from "./SettingsFooter";
import ChannelSettings from "./ChannelSettings";
import AdvancedSettings from "./AdvancedSettings";
import { Modal, Input } from 'antd';
import { useTranslation } from "react-i18next";
import { Auth } from 'aws-amplify';
import { uploadAvatar, getAvatarUrl } from '../../../services/storageService';
import { updateProfile } from '../../../services/profileService';
import { message } from "antd";
import { UserContext } from "../../../contexts/UserContext";

export type SettingsModalProps = {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {

  const { t } = useTranslation();
  const [verificationCode, setVerificationCode] = useState<string>('')
  const [nickname, setNickname] = useState<string>('');
  const [channelHandle, setChannelHandle] = useState<string>('');
  const [channelName, setChannelName] = useState<string>('');
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarURL, setAvatarURL] = useState<string>('');
  const [channelAvatar, setChannelAvatar] = useState<File | null>(null);
  const [channleAvatarURL, setChannelAvatarURL] = useState<string>('');
  const [isDisable, setIsDisable] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [activeChannel, setActiveChannel] = useState<string>("general");
  const [activeSection, setActiveSection] = useState<string>("");
  const [password, setPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [Email, setEmail] = useState<string>('');
  const [newEmail, setNewEmail] = useState<string>('');
  const [confirmEmail, setConfirmEmail] = useState<string>('');

  const handleChangeNickname = (nickname: string) => setNickname(nickname);
  const handleChangeChannelName = (channelName: string) => setChannelName(channelName);
  const handleChangeChannelHandle = (channelHandle: string) =>  setChannelHandle(channelHandle);
  const handleSectionChange = (section: string) => setActiveSection(section);
  const handlePasswordChange = (password: string) => setPassword(password);
  const handleNewPasswordChange = (newPassword: string) => setNewPassword(newPassword);
  const handleConfirmPasswordChange = (confirmPassword: string) => setConfirmPassword(confirmPassword);
  const handleEmailChange = (Email: string) => setEmail(Email);
  const handleNewEmailChange = (newEmail: string) => setNewEmail(newEmail);
  const handleConfirmEmailChange = (confirmEmail: string) => setConfirmEmail(confirmEmail);
  const handleAvatarRemove = () => setAvatarURL('');
  const handleChannelAvatarRemove = () => setChannelAvatarURL('');

  const userContext = useContext(UserContext);
    if (!userContext) {
        throw new Error("userContext must be used within an AuthProvider!")
    }
  const { user, isModalVisible, updateEmail, updatePassword, updateUserData, updateNickname, ModalUnvisible, updateChannelHandle, updateChannelName } = userContext;

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setNickname(user?.nickname || '');
        const avatarKey = `avatars/${user?.sub}.png`;
        const channelAvatarKey = `avatars/${user?.channelAvatar}.png`;
        const url = await getAvatarUrl(avatarKey);
        const channelUrl = await getAvatarUrl(channelAvatarKey);
        setAvatarURL(url);
        setChannelAvatarURL(channelUrl)
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('You are not authenticated. Please log in.');
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    if (nickname?.length && avatarURL?.length) {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  },[nickname,avatarURL])

  const handleAvatarChange = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setAvatar(file);
      setAvatarURL(URL.createObjectURL(file));
    } else {
      setError('Please select a valid image file');
    }
  };

  const handleChannelAvatarChange = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setChannelAvatar(file);
      setChannelAvatarURL(URL.createObjectURL(file));
    } else {
      setError('Please select a valid image file');
    }
  };

  const handleVerifyEmail = async () => {
    try {
      if (!user) throw new Error('No user is logged in');
      await Auth.verifyCurrentUserAttributeSubmit('email', verificationCode);
      ModalUnvisible();
      updateUserData();
      message.success('Email verified successfully.');
    } catch (error) {
      message.error(`Error verifying email: ${(error as Error).message}`);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setError('');

    if (activeSection === 'basicInfo') {
      try {
        await updateProfile({ 'nickname': nickname });
        if (avatar) {
          const avatarKey = `avatars/${user?.sub}.png`;
          await uploadAvatar(avatarKey, avatar);
        }
        message.success('Profile updated successfully');
        updateUserData()
      } catch (err) {
        setError('Error updating profile. Please try again.');
        console.error('Error updating profile:', err);
      } finally {
        setLoading(false);
      }
    } else if (activeSection === 'changeEmail') {
      try {
          if (confirmEmail !== newEmail) {
            message.warning("Please confirm your new email");
            return;
          }
          if (user?.email !== Email) {
            message.warning('Current Email is not valid')
            return;
          }
          if (!validateEmail(newEmail)) {
            message.warning('New Email is not valid')
            return;
          } else {
            await updateEmail(newEmail);
          }
        } catch (error) {
          message.error(`Error updating email: ${(error as Error).message}`);
        } finally {
        setLoading(false);
      }
    } else if (activeSection === 'changePassword') {
      try {
        if (newPassword !== confirmPassword) {
            message.warning('please confirm your new password!');
            return;
          }
          await updatePassword(password, newPassword);
        } catch (error) {
          message.error(`Error changing password: ${(error as Error).message}`);
        } finally {
         setLoading(false);
        }
    } else {
      try {
          if (channelAvatar) {
            const avatarKey = `avatars/channel/${user?.sub}.png`;
            await uploadAvatar(avatarKey, channelAvatar);
            message.success('Your AQVar Channel Info updated successfully');

        }
        } catch (error) {
          message.error(`Error changing password: ${(error as Error).message}`);
        } finally {
         setLoading(false);
        }
      
    }

  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
    <div className="relative flex items-center justify-center w-full mt-[60px]">
      <div className="max-w-[850px] w-full b-gray-600 rounded-[10px] flex items-center justify-center flex-col">
        <SettingsModalHeader onClose={onClose} showCloseButton={false} label={t("Settings")} />
        <div className="relative w-full flex justify-between">
          <div className="w-[30%]">
            <SettingsModalSidebar setActiveChannel={setActiveChannel} activeChannel={activeChannel} />
          </div>
          <div className="w-[70%] py-4 px-6 min-h-[550px] border-l border-[#585a5c]">
            {activeChannel === "general" && (
              <GeneralSettings
                nickname={nickname}
                activeSection={activeSection}
                onSectionChange={handleSectionChange}
                currentAvatarUrl={avatarURL}
                onAvatarChange={handleAvatarChange}
                onAvatarRemove={handleAvatarRemove}
                onChangNickname={handleChangeNickname}
                onNewPasswordChange={handleNewPasswordChange}
                onPasswordChange={handlePasswordChange}
                onConfirmPasswordChange={handleConfirmPasswordChange}
                onNewEmailChange={handleNewEmailChange}
                onEmailChange={handleEmailChange}
                onConfirmEmailChange={handleConfirmEmailChange}
              />
            )}
            {activeChannel === "channel" && (
              <ChannelSettings
                channelAvatar={channleAvatarURL}
                onAvatarChange={handleChannelAvatarChange}
                onAvatarRemove={handleChannelAvatarRemove}
                onChannelHandle={handleChangeChannelHandle}
                onChannelName= {handleChangeChannelName}

              />
            )}
            {activeChannel === "advanced" && <AdvancedSettings />}
          </div>
        </div>
        {(activeChannel==="channel" || activeSection === "basicInfo" || activeSection === "changeEmail" || activeSection === "changePassword") && (
          <SettingsFooter isDisable={isDisable} onClose={onClose} isLoading={loading} activeChannel={activeChannel} handleSave={handleSave} />
        )}

      </div>

    </div>
        <Modal
          title="Verify Your Email"
          open={isModalVisible}
          onOk={handleVerifyEmail}
          onCancel={() => ModalUnvisible()}
        >
        <Input
          placeholder="Verification code"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
        />
      </Modal>
    </>
  );
};

export default SettingsModal;
