import React, {useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import Avatar from "../../../components/Avatar";
import Input from "../../../components/inputs/Input";
import { useTranslation } from 'react-i18next';
import { useUser } from '../../../contexts/UserContext';

export type ChangeEmailProps = {
  currentEmail: string;
  onNewEmailChange: (newEmail: string) => void;
  onEmailChange: (passwod: string) => void;
  onConfirmEmailChange: (currentPasswod: string) =>  void;
}

const ChangeEmail: React.FC<ChangeEmailProps> = ({
  currentEmail,
  onNewEmailChange,
  onEmailChange,
  onConfirmEmailChange,
}) => {

  const {
    register,
    formState: { errors },
  } = useForm();

  const [Email, setEmail] = useState<string>(currentEmail);
  const [newEmail, setNewEmail] = useState<string>("");
  const [confirmEmail, setConfirmEmail] = useState<string>("");
  const { t } = useTranslation();
  const { user } = useUser();

  useEffect(() => {
    onNewEmailChange && onNewEmailChange(newEmail)
    onEmailChange && onEmailChange(Email)
    onConfirmEmailChange && onConfirmEmailChange(confirmEmail)
  },[Email, newEmail, confirmEmail])

  return (
    <div>
      <div className="px-9 pb-6 border-b border-[#585a5c]">
        <Avatar
          src={user?.profileAvatar} 
          name={user?.nickname ?? 'Default Name'}
        />
      </div>
      <div className="flex flex-col py-3 pb-12 gap-4">
        <h6 className="sub-2r text-white">{t("Change Email address")}</h6>
        <Input
          id="email"
          label={t("Email address")}
          type="email"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
          register={register}
          errors={errors}
          required
          small
        />
        <Input
          id="new-email"
          label={t("New Email addrerss")}
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          register={register}
          errors={errors}
          required
          small
        />
        <Input
          id="confirm-email"
          label={t("New Email addrerss Confirm")}
          type="email"
          onChange={(e) => setConfirmEmail(e.target.value)}
          value={confirmEmail}
          register={register}
          errors={errors}
          required
          small
        />
      </div>
    </div>
  );
};

export default ChangeEmail;
