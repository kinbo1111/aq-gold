import * as React from "react";
import { useForm } from "react-hook-form";
import Avatar from "../../../components/Avatar";
import Input from "../../../components/inputs/Input";

const ChangeEmail = () => {
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
        <h6 className="sub-2r text-white">Change Email address</h6>
        <Input
          id="email"
          label="Email address"
          type="email"
          placeholder="abcdefg@hijklmn"
          register={register}
          errors={errors}
          required
          small
        />
        <Input
          id="email"
          label="New Email addrerss"
          type="email"
          placeholder="abcdefg@hijklmn"
          register={register}
          errors={errors}
          required
          small
        />
        <Input
          id="email"
          label="New Email addrerss Confirm"
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
