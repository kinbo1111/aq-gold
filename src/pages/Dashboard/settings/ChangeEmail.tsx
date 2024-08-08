import React, {useContext, useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import Avatar from "../../../components/Avatar";
import Input from "../../../components/inputs/Input";
import { useTranslation } from 'react-i18next';
import { UserContext } from '../../../contexts/UserContext';
import DefaultAvatarUrl from "../../../assets/images/default_avatar.png";

export type ChangeEmailProps = {
  onNewEmailChange: (newEmail: string) => void;
  onEmailChange: (passwod: string) => void;
  onConfirmEmailChange: (currentPasswod: string) =>  void;
}

const ChangeEmail: React.FC<ChangeEmailProps> = ({
  onNewEmailChange,
  onEmailChange,
  onConfirmEmailChange,
}) => {

  const {
    register,
    formState: { errors },
  } = useForm();

  const [Email, setEmail] = useState<string>("");
  const [newEmail, setNewEmail] = useState<string>("");
  const [confirmEmail, setConfirmEmail] = useState<string>("");
  const { t } = useTranslation();
  const userContext = useContext(UserContext);
  if (!userContext) {
      throw new Error("userContext must be used within an AuthProvider!")
  }
  const { user } = userContext;

  useEffect(() => {
    onNewEmailChange && onNewEmailChange(newEmail)
    onEmailChange && onEmailChange(Email)
    onConfirmEmailChange && onConfirmEmailChange(confirmEmail)
  },[Email, newEmail, confirmEmail])

  return (
    <div>
      <div className="px-9 pb-6 border-b border-[#585a5c]">
        <Avatar
          src={user?.url ?? DefaultAvatarUrl} 
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
          placeholder="abcdefg@hijklmn"
          register={register}
          errors={errors}
          required
          small
        />
        <Input
          id="new-email"
          label={t("New Email addrerss")}
          type="email"
          placeholder="abcdefg@hijklmn"
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
          placeholder="abcdefg@hijklmn"
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
