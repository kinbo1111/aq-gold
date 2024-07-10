import * as React from "react";
import { useForm } from "react-hook-form";
import Avatar from "../../../components/Avatar";
import Input from "../../../components/inputs/Input";

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <div>
      <div className="px-9 pb-6 border-b border-[#585a5c]">
        <Avatar name="Anna Nguyen" />
      </div>
      <div className="flex flex-col py-3 pb-12 gap-4">
        <h6 className="sub-2r text-white">Change Password</h6>
        <Input
          id="password"
          label="Password"
          type="password"
          placeholder="abcdefghijklmn"
          register={register}
          errors={errors}
          required
          small
        />
        <Input
          id="password"
          label="New Password"
          type="password"
          placeholder="abcdefghijklmn"
          register={register}
          errors={errors}
          required
          small
        />
        <Input
          id="password"
          label="New Password Confirm"
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
