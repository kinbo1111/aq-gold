import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import Input from "../../../components/inputs/Input";
import Button from "../../../components/Button";
import AvatarUpload from "./AvatarUpload";

const CreateChannel = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const avatarUploadRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onFileSelect = (file: File | null) => {
    setSelectedFile(file);
  };

  const onSubmit = (data: any) => {
    if (avatarUploadRef.current) {
      const avatarFile = (avatarUploadRef.current as any).getSelectedFile();
      console.log("Form Data:", data);
      console.log("Avatar File:", avatarFile);
      navigate("/dashboard/aq-channel");
    }
  };

  return (
    <div className="relative w-full flex items-center justify-center py-24">
      <div className="max-w-[800px] w-11/12 md:w-5/6 lg:w-3/5 b-brand-50 rounded-lg p-12">
        <h6 className="sub-1b gray-800 mb-7 text-center">
          Create your AQvr channel
        </h6>
        <AvatarUpload ref={avatarUploadRef} onFileSelect={onFileSelect} />
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 mt-6">
          <Input
            id="name"
            type="text"
            label="Channel name"
            placeholder="マルコ"
            register={register}
            errors={errors}
            small
            background
            required
          />
          <Input
            id="handle"
            type="text"
            label="Handle"
            placeholder="＠"
            register={register}
            errors={errors}
            small
            background
            required
          />
          <div>
            <div className="flex items-center justify-center body-1r text-black">
              By clicking Create Channel you agree to
              <Link
                to="/terms"
                className="body-1r text-[#1570EF] underline ml-1"
              >
                AQ GOLD’s Terms of Service.
              </Link>
            </div>
            <div className="flex items-center justify-center body-1r text-black">
              Changes made to your name and profile picture are visible on AQ
              GOLD.
              <Link
                to="learn-more"
                className="body-1r text-[#1570EF] underline ml-1"
              >
                Learn more.
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Button
              label="Create Channel"
              onClick={handleSubmit(onSubmit)}
              disabled={!selectedFile}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateChannel;
