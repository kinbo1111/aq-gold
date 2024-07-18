import * as React from "react";
import { useForm } from "react-hook-form";
import Avatar from "../../../components/Avatar";
import Input from "../../../components/inputs/Input";
import { useTranslation } from 'react-i18next';

const ChangeEmail = () => {
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
        <h6 className="sub-2r text-white">{t("Change Email address")}</h6>
        <Input
          id="email"
          label={t("Email address")}
          type="email"
          placeholder="abcdefg@hijklmn"
          register={register}
          errors={errors}
          required
          small
        />
        <Input
          id="email"
          label={t("New Email addrerss")}
          type="email"
          placeholder="abcdefg@hijklmn"
          register={register}
          errors={errors}
          required
          small
        />
        <Input
          id="email"
          label={t("New Email addrerss Confirm")}
          type="email"
          placeholder="abcdefg@hijklmn"
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
