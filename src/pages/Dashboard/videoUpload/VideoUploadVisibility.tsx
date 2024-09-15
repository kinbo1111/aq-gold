import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import SettingsModalHeader from "../settings/SettingsModalHeader";
import { RiCheckboxBlankCircleFill } from "react-icons/ri";
import { GiCheckMark } from "react-icons/gi";
import { IoIosHelpCircle } from "react-icons/io";
import { useTranslation } from 'react-i18next';
import { Select, Button, message, DatePicker } from 'antd';
import { GoTriangleDown } from "react-icons/go";
import { ScheduleDataProps } from ".";
import dayjs, { Dayjs } from 'dayjs';

export type VideoUploadVisibilityProps = {
  videoTitle: string,
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  onSchedule: (data: ScheduleDataProps | null) => void
}


const VideoUploadVisibility: React.FC<VideoUploadVisibilityProps> = ({
  videoTitle,
  isOpen,
  isLoading,
  onClose,
  onSchedule
}) => {

  const { register, handleSubmit, watch, setValue } = useForm<ScheduleDataProps>({
    defaultValues: {
      publishNow: true,
      scheduleDate: "",
      scheduleTime: "",
    },
  });
  const [timezone, setTimeZone] = useState<string>('')
  const [publishNow, setPublishNow] = useState<boolean>(true);
  const [scheduleDate, setScheduleDate] = useState<string>('');
  const [scheduleTime, setScheduleTime] = useState<string>('10:00');


  const [selectedValue, setSelectedValue] = useState(null);
  const options = ['Japan (GMT＋0700)','US (GMT＋0700)','UK (GMT＋0700)'];

  const { t } = useTranslation();

  const handleClick = () => {
    if (!publishNow) {
      if (timezone === '') {
        message.warning('please select timezone!')
        return;      
      }

      if (scheduleDate === '') {
        message.warning('please select schedule date!')
        return;      
      }

      if (scheduleTime === '') {
        message.warning('Please select schedule time!')
        return;      
      }
    }
    onSchedule({
      publishNow: publishNow,
      scheduleDate: scheduleDate,
      scheduleTime: scheduleTime,
      timezone: timezone
    })
  }

  const handleChangeTimeZone = (value: string) => setTimeZone(value); 
  const handleScheduleTime = (e: React.ChangeEvent<HTMLInputElement>) => setScheduleTime(e.target.value); 
  const handlePublishNow = (value: boolean) => setPublishNow(value); 
  const onChange = (dateString: string) => setScheduleDate(dateString);

   const disabledDate = (current: Dayjs) => {
    // Can not select days before today
    return current && current < dayjs().startOf('day');
  };

  // Disable times for today
  const disabledDateTime = () => {
    const currentHour = dayjs().hour();
    const currentMinute = dayjs().minute();

    return {
      disabledHours: () =>
       Array.from({ length: 24 }, (_, i) => i).filter((hour) => hour < currentHour),
      disabledMinutes: (selectedHour: number) =>
        selectedHour === currentHour
          ? Array.from({ length: 24 }, (_, i) => i).filter((hour) => hour < currentHour)
          : [],
    };
  };

  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[999] bg-black bg-opacity-70 py-4">
      <div className="relative w-11/12 md:w-3/4 lg:w-2/3 b-gray-600 rounded-lg h-fit max-h-[90vh] overflow-y-auto videoUploadDetail">
        <SettingsModalHeader
          onClose={onClose}
          showCloseButton={true}
          label={videoTitle}
        />
        <form className="w-full">
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
                    {t("Details")}
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
                    {t("Visibility")}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <h6 className="sub-2b text-white mb-2">{t("Visibility")}</h6>
              <p className="body-1r text-white mb-2">{t("Choose when to publish your video")}</p>
              <div className="mb-4">
                <label className="flex items-center mb-2">
                  <input
                    type="radio"
                    value="publicNow"
                    checked={publishNow}
                    onChange={() => handlePublishNow(true)}
                    className="mr-2"
                  />
                  <span className="text-white text-[16px] font-normal">{t("Publish Now")}</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="schedule"
                    checked={!publishNow}
                    onChange={() => handlePublishNow(false)}
                    className="mr-2"
                  />
                  <span className="text-white text-[16px] font-normal">{t("Schedule")}</span>
                </label>
              </div>
              {!publishNow && (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-start gap-4">
                    <DatePicker
                      onChange={onChange}
                      className="custom-datepicker relative w-[170px] h-10 text-center date-input px-2 rounded bg-transparent text-white border border-[#9fa0a1]"
                      placeholder="Select Date"
                      disabledDate={disabledDate}
                      disabledTime={disabledDateTime}
                    />
              
                        <input
                            type="time"
                           {...register("scheduleTime")}
                           onChange={handleScheduleTime}
                           className="relative w-[140px] h-10 text-center date-input px-2 rounded bg-transparent text-white border border-[#9fa0a1] "
                        />
                    </div>
                    <div className="flex items-center gap-2 gray-200 body-1r">
                    <Select                      
                      onChange={handleChangeTimeZone}
                      defaultValue="japan"
                      dropdownStyle={{ backgroundColor: '#212324', borderRadius: '10px', width: "300px", border: "1px #C7A76B solid", color: "white" }}
                      popupClassName="custom-dropdown"
                      suffixIcon={<GoTriangleDown className="text-[#9fa0a1] text-sm" />}
                      options={[
                          { value: 'japan', label: 'Japan (GMT＋0700)' },
                          { value: 'us', label: 'US (GMT＋0700)' },
                          { value: 'uk', label: 'UK (GMT＋0700)' },
                      ]}
                      
                        >
                          {options.map(option => (
                              <Select.Option
                                key={option}
                                value={option}
                                className={`custom-option ${selectedValue === option ? 'selected' : ''}`}
                              >
                                {option}
                              </Select.Option>
                            ))}
                      </Select>
                      <IoIosHelpCircle size={16} className="gray-200" />
                    </div>
                    <p className="body-1r gray-200">{t("Video will be private before publishing")}</p>
                </div>
              )}
            </div>
            <div className="b-gray-700 p-6 rounded-lg mt-4">
              <p className="mb-2">
                <strong className="body-1r text-white">{t("Before you publish, check the following:")}</strong>
              </p>
              <p className="mb-2 body-2r text-white">{t("Do kids appear in this video?")}</p>
              <p className="mb-4 gray-200 body-2r">
               {t("seven")}
                <Link to="/learn-more" className="underline ml-1">
                  {t("Learn more")}
                </Link>
              </p>
              <p className="mb-2 body-2r text-white">{t("Looking for overall content guidance?")}</p>
              <p className="mb-4 gray-200 body-2r">
              {t("Our Community Guidelines can help you avoid trouble and ensure that AQ GOLD remains a safe and vibrant community.")}
                <Link to="/learn-more" className="underline ml-1">
                  {t("Learn more")}
                </Link>
              </p>
            </div>
          </div>
          <div>
            <div className="w-full relative flex items-center justify-end px-6 py-2 gap-2 border-t border-[#585a5c]">
              <Button
                className='btnClose w-[120px] flex-row bg-[#181A1B] border-[#DDB951] border-solid text-[#DDB951] button-1b h-10 relative disabled:cursor-not-allowed disabled:text-[#DDB951] rounded hover:bg-blue-500 transition px-4 py-2 flex items-center justify-center'
                onClick={onClose}
              >
                {t("BACK")}
              </Button>
              <Button
                className={`btnOk flex-row brand-gradient text-white border-none button-2b h-10 relative disabled:cursor-not-allowed disabled:bg-[#ceac02] disabled:text-gray-00 rounded  transition px-4 py-2 flex items-center justify-center ${publishNow ? 'w-30' : 'w-40'}`}
                onClick={handleClick}
                loading={isLoading} >
                {publishNow ? t("Publish Now") : t("Schedule")}
              </Button>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
};

export default VideoUploadVisibility;
