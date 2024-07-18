import * as React from "react";
import { useForm } from "react-hook-form";
import Avatar from "../../../components/Avatar";
import Input from "../../../components/inputs/Input";
import { useTranslation } from 'react-i18next';

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { t } = useTranslation();
  return (
    <div>
      <div className="px-9 pb-6 border-b border-[#585a5c]">
        <Avatar name="Anna Nguyen" />
      </div>
      <div className="flex flex-col py-3 pb-12 gap-4">
        <h6 className="sub-2r text-white">{t("Change Password")}</h6>
        <Input
          id="password"
          label={t("Password")}
          type="password"
          placeholder="abcdefghijklmn"
          register={register}
          errors={errors}
          required
          small
        />
        <Input
          id="password"
          label={t("New Password")}
          type="password"
          placeholder="abcdefghijklmn"
          register={register}
          errors={errors}
          required
          small
        />
        <Input
          id="password"
          label={t("New Password Confirm")}
          type="password"
          placeholder="abcdefghijklmn"
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
