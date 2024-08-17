import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Avatar from "../../../components/Avatar";
import Input from "../../../components/inputs/Input";
import { useTranslation } from 'react-i18next';
import { UserContext } from '../../../contexts/UserContext';
import { DefaultAvatar } from '../../../const';

export type ChangePasswordProps = {
  onNewPasswordChange: (newPassword: string) => void;
  onPasswordChange: (passwod: string) => void;
  onConfirmPasswordChange: (currentPasswod: string) =>  void;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({
  onNewPasswordChange,
  onPasswordChange,
  onConfirmPasswordChange,
}) => {

  const {
    register,
    formState: { errors },
  } = useForm();

  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const { t } = useTranslation();
  const userContext = useContext(UserContext);
  if (!userContext) {
      throw new Error("userContext must be used within an AuthProvider!")
  }
  const { user } = userContext;


  useEffect(() => {
    onNewPasswordChange && onNewPasswordChange(newPassword)
    onPasswordChange && onPasswordChange(password)
    onConfirmPasswordChange && onConfirmPasswordChange(confirmPassword)
  },[password, newPassword, confirmPassword])



  return (
    <div>
      <div className="px-9 pb-6 border-b border-[#585a5c]">
        <Avatar
          src={user?.profileAvatar} 
          name={user?.nickname ?? 'No Name'}
        />
      </div>
      <div className="flex flex-col py-3 pb-12 gap-4">
        <h6 className="sub-2r text-white">{t("Change Password")}</h6>
        
        <Input
          id="password"
          label={t("Password")}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          register={register}
          errors={errors}
          required
          small
        />

        <Input
          id="new-password"
          label={t("New Password")}
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          register={register}
          errors={errors}
          required
          small
        />

        <Input
          id="password-confirm"
          label={t("New Password Confirm")}
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          register={register}
          errors={errors}
          required
          small
        />
      </div>
    </div>
  );
};

export default ChangePassword;
