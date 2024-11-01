import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import SettingsModalHeader from "../settings/SettingsModalHeader";
import { RiCheckboxBlankCircleFill } from "react-icons/ri";
import { GiCheckMark } from "react-icons/gi";
import { IoIosHelpCircle } from "react-icons/io";
import { useTranslation } from 'react-i18next';
import { Select, Button, message, DatePicker, Progress } from 'antd';
import { ScheduleDataProps } from ".";
import dayjs, { Dayjs } from 'dayjs';
import TimeZoneSelect from "../../../components/TimeZoneSelect";

export type VideoUploadVisibilityProps = {
  videoTitle: string;
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  onSchedule: (data: ScheduleDataProps | null) => void;
  uploadProgress: number; 
};

const VideoUploadVisibility: React.FC<VideoUploadVisibilityProps> = ({
  videoTitle,
  isOpen,
  isLoading,
  onClose,
  onSchedule,
  uploadProgress 
}) => {
  const { register, handleSubmit, watch, setValue } = useForm<ScheduleDataProps>({
    defaultValues: {
      publishNow: true,
      scheduleDate: "",
      scheduleTime: "",
      timezone: "Asia/Tokyo"
    },
  });

  const [timezone, setTimeZone] = useState<string>("");
  const [publishNow, setPublishNow] = useState<boolean>(true);
  const [scheduleDate, setScheduleDate] = useState<string>("");
  const [scheduleTime, setScheduleTime] = useState<string>("10:00");
  const [timeOptions, setTimeOptions] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [selectedTime, setSelectedTime] = useState<string>("");

  const { t } = useTranslation();

  useEffect(() => {
    generateTimeOptions();
  }, [selectedDate]);

    const generateTimeOptions = () => {
      const options: string[] = [];
      const now = new Date();
      const selected = new Date(selectedDate);
      const isToday = selected.toDateString() === now.toDateString();
      
      const startHour = isToday ? now.getHours() : 0;
      const startMinute = isToday ? Math.ceil(now.getMinutes() / 30) * 30 : 0;

      for (let hour = startHour; hour < 24; hour++) {
        for (let min = (hour === startHour ? startMinute : 0); min < 60; min += 30) {
          const time = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
          options.push(time);
        }
      }

      setTimeOptions(options);
    };


  const handleChangeTimeZone = (value: string) => {
    setTimeZone(value);
};

const handleDateChange = (date: any) => {
  if (date) {
    const formattedDate = date.toISOString(); 
    setScheduleDate(formattedDate);
    setSelectedDate(date)
  } else {
    setScheduleDate(""); 
  }
  setSelectedTime(""); 
};

  const handleTimeChange = (value: string) => {
    setSelectedTime(value);
    setScheduleTime(value);
  };
  const handleClick = () => {
    if (!publishNow) {
      if (timezone === '') {
        message.warning('please select timezone!');
        return;
      }

      if (scheduleDate === '') {
        message.warning('please select schedule date!');
        return;
      }

      if (scheduleTime === '') {
        message.warning('Please select schedule time!');
        return;
      }
    }
    onSchedule({
      publishNow: publishNow,
      scheduleDate: scheduleDate,
      scheduleTime: scheduleTime,
      timezone: timezone
    });
  };
  
  const handlePublishNow = (value: boolean) => setPublishNow(value);

  const disabledDate = (current: Dayjs) => {
    return current && current < dayjs().startOf('day');
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
            <div className="flex flex-row justify-between">
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
                      onChange={handleDateChange}
                      className="custom-datepicker relative w-[170px] h-10 text-center date-input px-2 rounded bg-transparent text-white border border-[#9fa0a1]"
                      placeholder="Select Date"
                      disabledDate={disabledDate}
                    />
                     <Select
                      {...register("scheduleTime")}
                      value={selectedTime}
                      onChange={handleTimeChange}
                      placeholder="Select Time"
                      dropdownStyle={{ backgroundColor: '#2e3133' }}
                      popupClassName="custom-dropdown"
                      className="time h-10 text-center rounded bg-transparent text-white border"
                    >
                      {timeOptions.map((time) => (
                        <Select.Option key={time} value={time}>
                          <span className="text-white">{time}</span>
                        </Select.Option>
                      ))}
                    </Select>
                  </div>
                  <div className="flex items-center gap-2 gray-200 body-1r">
                    <TimeZoneSelect handleChangeTimeZone={handleChangeTimeZone}/>
                      <IoIosHelpCircle size={16} className="gray-200" />
                    </div>
                    <p className="body-1r gray-200">{t("Video will be private before publishing")}</p>
                </div>
              )}
            </div>
            <Progress
                type="dashboard"
                className="text-white"
                      steps={12}
                      percent={uploadProgress}
                      trailColor="rgba(0, 0, 0, 0.06)"
                      strokeWidth={20}
            />
            </div>
            <div className="b-gray-700 p-6 rounded-lg mt-4">
              <p className="mb-2">
                <strong className="body-1r text-white">{t("Before you publish, check the following:")}</strong>
              </p>
              <p className="mb-2 body-2r text-white">{t("Do kids appear in this video?")}</p>
              <p className="mb-4 gray-200 body-2r">
                {t("seven")}
                <a href="#" className="underline ml-1">
                  {t("Learn more")}
                </a>
              </p>
              <p className="mb-2 body-2r text-white">{t("Looking for overall content guidance?")}</p>
              <p className="mb-4 gray-200 body-2r">
                {t("Our Community Guidelines can help you avoid trouble and ensure that AQ GOLD remains a safe and vibrant community.")}
                <a href="#" className="underline ml-1">
                  {t("Learn more")}
                </a>
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
                loading={isLoading}
              >
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
