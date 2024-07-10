import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import SettingsModalHeader from "../settings/SettingsModalHeader";
import { RiCheckboxBlankCircleFill } from "react-icons/ri";
import { GiCheckMark } from "react-icons/gi";
import { IoIosHelpCircle } from "react-icons/io";

import Button from "../../../components/Button";

interface VideoUploadVisibilityProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  publishNow: boolean;
  scheduleDate: string;
  scheduleTime: string;
}

const VideoUploadVisibility: React.FC<VideoUploadVisibilityProps> = ({
  isOpen,
  onClose,
}) => {
  const { register, handleSubmit, watch, setValue } = useForm<FormData>({
    defaultValues: {
      publishNow: true,
      scheduleDate: "",
      scheduleTime: "",
    },
  });
  const [isScheduled, setIsScheduled] = useState(false);

  const handleVisibilityChange = (publishNow: boolean) => {
    setValue("publishNow", publishNow);
    setIsScheduled(!publishNow);
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[999] bg-black bg-opacity-70 py-4">
      <div className="relative w-11/12 md:w-3/4 lg:w-2/3 b-gray-600 rounded-lg h-fit max-h-[90vh] overflow-y-auto videoUploadDetail">
        <SettingsModalHeader
          onClose={onClose}
          showCloseButton={true}
          label="Video upload Title"
        />
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="p-6">
            <div className="flex items-center justify-center">
              <div className="flex items-center justify-center">
                <div className="check-step flex items-center justify-center flex-col">
                  <div className="relative">
                    <div className="relative p-[2px] b-brand-700 flex items-center justify-center rounded-full w-6 h-6 z-50">
                      <div className="w-full h-full b-brand-600 flex items-center justify-center rounded-full">
                        <GiCheckMark className="text-white" size={10} />
                      </div>
                    </div>
                  </div>
                  <p className="text-[14px] brand-600 font-semibold mt-4 text-center tracking-widest">
                    Details
                  </p>
                </div>
                <div className="visibility-step flex items-center justify-center flex-col">
                  <div className="relative visibility-checked">
                    <div className="relative p-[2px] b-light-600 flex items-center justify-center rounded-full w-6 h-6 z-50">
                      <div className="w-full h-full bg-white flex items-center justify-center rounded-full">
                        <RiCheckboxBlankCircleFill
                          className="light-700"
                          size={10}
                        />
                      </div>
                    </div>
                  </div>
                  <p className="text-[14px] brand-600 font-semibold mt-4 text-center tracking-widest">
                    Visibility
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <h6 className="sub-2b text-white mb-2">Visibility</h6>
              <p className="body-1r text-white mb-2">Choose when to publish your video</p>
              <div className="mb-4">
                <label className="flex items-center mb-2">
                  <input
                    type="radio"
                    value="publicNow"
                    checked={watch("publishNow")}
                    onChange={() => handleVisibilityChange(true)}
                    className="mr-2"
                  />
                  <span className="text-white text-[16px] font-normal">Public Now</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="schedule"
                    checked={!watch("publishNow")}
                    onChange={() => handleVisibilityChange(false)}
                    className="mr-2"
                  />
                  <span className="text-white text-[16px] font-normal">Schedule</span>
                </label>
              </div>
              {!watch("publishNow") && (
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-start gap-4">
                        <input
                            type="date"
                            {...register("scheduleDate")}
                            className="relative w-[170px] h-10 text-center date-input px-2 rounded bg-transparent text-white border border-[#9fa0a1]"
                        />
              
                        <input
                            type="time"
                            {...register("scheduleTime")}
                            className="relative w-[140px] h-10 text-center date-input px-2 rounded bg-transparent text-white border border-[#9fa0a1]"
                        />
                    </div>
                    <h6 className="flex items-center gap-2 gray-200 body-1r">
                        TIME ZONE
                        <IoIosHelpCircle size={16} className="gray-200" />
                    </h6>
                    <p className="body-1r gray-200">Video will be private before publishing</p>
                </div>
              )}
            </div>
            <div className="b-gray-700 p-6 rounded-lg mt-4">
              <p className="mb-2">
                <strong className="body-1r text-white">Before you publish, check the following:</strong>
              </p>
              <p className="mb-2 body-2r text-white">Do kids appear in this video?</p>
              <p className="mb-4 gray-200 body-2r">
                Make sure you follow our policies to protect minors from harm,
                exploitation, bullying, and violations of labor law.
                <Link to="https://support.google.com/youtube/answer/2801999?hl=en" className="underline ml-1">
                  Learn more
                </Link>
              </p>
              <p className="mb-2 body-2r text-white">Looking for overall content guidance?</p>
              <p className="mb-4 gray-200 body-2r">
              Our Community Guidelines can help you avoid trouble and ensure that AQ GOLD remains a safe and vibrant community.
                <Link to="https://www.youtube.com/yt/about/policies#community-guidelines" className="underline ml-1">
                  Learn more
                </Link>
              </p>
            </div>
          </div>
          <div>
          <div className="w-full relative flex items-center justify-end px-6 py-2 gap-2 border-t border-[#585a5c]">
              <Button label="BACK" onClick={onClose}  outline full small/>
              <Button
                label={watch("publishNow") ? "Public Now" : "Schedule"}
                onClick={() => {}}
                full
                small
                type="submit"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VideoUploadVisibility;
