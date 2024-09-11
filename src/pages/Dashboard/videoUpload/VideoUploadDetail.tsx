import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import Button from "../../../components/Button";
import SettingsModalHeader from "../settings/SettingsModalHeader";
import { MdAddPhotoAlternate } from "react-icons/md";
import { RiCheckboxBlankCircleFill } from "react-icons/ri";
import { CiCircleInfo } from "react-icons/ci";
import { IoMdArrowDropdown } from "react-icons/io";
import Input from "../../../components/inputs/Input";
import Textarea from "../../../components/inputs/Textarea";
import DetailImg from "../../../assets/images/default_image.png";
import SelectBox from "../../../components/inputs/Select";
import { useTranslation } from 'react-i18next';
import { VideoDetailData, Thumbnail } from ".";
import { categories, playlist } from '../../../constant/SelectItems';
import { useChannel } from "../../../contexts/ChannelContext";

interface VideoUploadDetailProps {
  isOpen: boolean;
  file: File | null;
  onClose: () => void;
  onNext: (detail: VideoDetailData| null) => void;
}

const VideoUploadDetail: React.FC<VideoUploadDetailProps> = ({
  isOpen,
  file,
  onClose,
  onNext
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const { t } = useTranslation();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [selectedPlaylist, setSelectedPlaylist] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [thumbnails, setThumbnails] = useState<Thumbnail[]>([]);
  const [thumbnailFile, setThumbnailFile] = useState<File>();
  const [vthumbnails, setVThumbnails] = useState<Thumbnail[]>([]);
  const [forKid, setForKid] = useState<boolean>(false);
  const [restrict, setRestrict] = useState<boolean>(true);
  const [isDescriptionVisible, setDescriptionVisible] = useState(false);
  const [isFormComplete, setIsFormComplete] = useState(false);

  const { hasChannel, channelData, loadingChannel, checkUserChannel } = useChannel();

  useEffect(() => {
      console.log(hasChannel, channelData)
      checkUserChannel();
  }, []);

  const toggleDescription = () => {
    setDescriptionVisible(!isDescriptionVisible);
  };

  const onSubmit = (data: VideoDetailData | null) => {
    onNext(data);
  };

  const handleThumbnailUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setThumbnailFile(files[0])
      const newThumbnails = Array.from(files).map((file) => ({
        src: URL.createObjectURL(file),
        alt: file.name,
      }));
      setThumbnails((prev) => [...prev, ...newThumbnails]);
    }
  };

  const handleVThumbnailUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newVThumbnails = Array.from(files).map((file) => ({
        src: URL.createObjectURL(file),
        alt: file.name,
      }));
      setVThumbnails((prev) => [...prev, ...newVThumbnails]);
    }
  };

  const checkFormCompletion = () => {
    const isTitleFilled = !!register("videoTitle");
    const isDescriptionFilled = !!register("videoDescription");
    const isThumbnailUploaded = thumbnails.length > 0;
    const isVThumbnailUploaded = vthumbnails.length > 0;
    const isOptionSelected = selectedPlaylist !== "";

    setIsFormComplete(
      isTitleFilled &&
        isDescriptionFilled &&
        isThumbnailUploaded &&
        isOptionSelected
    );
  };

  const handleClick = () => {
    onSubmit({
      title: title,
      description: description,
      category: selectedCategory,
      thumbnail: thumbnailFile,
      isForKids: forKid,
      isRestricted: restrict,
      playlist: selectedPlaylist,
      channelId: channelData.id
    }); 
  }
  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[999] bg-black bg-opacity-70 py-4">
      <div className="relative w-11/12 md:w-3/4 lg:w-2/3 b-gray-600 rounded-lg h-full max-h-[90vh] overflow-y-auto videoUploadDetail">
        <SettingsModalHeader
          onClose={onClose}
          showCloseButton={true}
          label={title?.length ? title : 'NO TITLE'}
        />
        <form className="w-full">
          <div className="p-6">
            <div className="flex items-center justify-center">
              <div className="flex items-center justify-center">
                <div className="check-step flex items-center justify-center flex-col">
                  <div className="relative detail-checked">
                    <div className="relative p-[2px] b-brand-700 flex items-center justify-center rounded-full w-6 h-6 z-50">
                      <div className="w-full h-full b-brand-600 flex items-center justify-center rounded-full">
                        <RiCheckboxBlankCircleFill
                          className="text-white"
                          size={10}
                        />
                      </div>
                    </div>
                  </div>
                  <p className="text-[14px] brand-600 font-semibold mt-4 text-center tracking-widest">
                    {t("Details")}
                  </p>
                </div>
                <div className="visibility-step flex items-center justify-center flex-col">
                  <div className="relative">
                    <div className="relative p-[2px] b-light-600 flex items-center justify-center rounded-full w-6 h-6 z-50">
                      <div className="w-full h-full bg-white flex items-center justify-center rounded-full">
                        <RiCheckboxBlankCircleFill
                          className="light-700"
                          size={10}
                        />
                      </div>
                    </div>
                  </div>
                  <p className="text-[14px] gray-200 font-semibold mt-4 text-center tracking-widest">
                    {t("Visibility")}
                  </p>
                </div>
              </div>
            </div>
            <h6 className="sub-2b text-white my-6">{t("Details")}</h6>
            <div className="flex items-start justify-between gap-6 flex-col-reverse md:flex-row">
              <div className="w-full md:w-2/3 mt-6 md:mt-0">
                <div className="flex flex-col gap-6">
                  <Input
                    id="videoTitle"
                    label={t("Title")}
                    redRequired
                    placeholder={t("Add a title that describes your video")}
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    register={register}
                    errors={errors}
                    small
                  />
                  <Textarea
                    id="videoDescription"
                    label={t("Description")}
                    placeholder={t("Tell viewers about your video")}
                    register={register}
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    errors={errors}
                    small
                  />
                </div>
                <div className="mt-8 flex flex-col gap-2">
                  <h6 className="body-1b text-white">{t("Thumbnail")}</h6>
                  <p className="body-1r gray-200">
                    {t("Select or upload a picture that shows what's in your video.")}
                    {t("A good thumbnail stands out and draws viewers' attention.")}
                  </p>
                  <div className="flex items-start justify-start gap-4">
                    {thumbnails.map((thumbnail, index) => (
                      <img
                        key={index}
                        src={thumbnail.src}
                        alt={thumbnail.alt}
                        className="w-full max-w-[150px] rounded-lg"
                      />
                    ))}
                    <label className="max-w-[150px] w-full h-20 border border-dashed border-gray-500 flex items-center justify-center cursor-pointer rounded-lg">
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        multiple
                        onChange={handleThumbnailUpload}
                      />
                      <div className="text-gray-500 text-center flex flex-col items-center justify-center">
                        <MdAddPhotoAlternate
                          size={24}
                          className="gray-200 mb-2"
                        />
                        <p className="body-2r gray-200 text-center">
                          {t("Upload image")}
                        </p>
                      </div>
                    </label>
                  </div>
                  <div className="flex items-start justify-start gap-4">
                    {vthumbnails.map((vthumbnail, index) => (
                      <img
                        key={index}
                        src={vthumbnail.src}
                        alt={vthumbnail.alt}
                        className="w-full max-w-[132px] rounded-lg"
                      />
                    ))}
                    <label className="max-w-[132px] w-full h-[185px] border border-dashed border-gray-500 flex items-center justify-center cursor-pointer rounded-lg">
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        multiple
                        onChange={handleVThumbnailUpload}
                      />
                      <div className="text-center flex flex-col items-center justify-center">
                        <MdAddPhotoAlternate
                          size={24}
                          className="gray-200 mb-2"
                        />
                        <p className="body-2r gray-200 text-center">
                          {t("Upload image")}
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
                <div className="mt-6 flex flex-col gap-4">
                  <h6 className="body-1b text-white">{("Playlists")}</h6>
                  <p className="body-1r gray-200">
                    {t("Add your video to one or more playlists to organize your content for viewers.")}
                  </p>
                  <SelectBox
                    options={playlist}
                    value={selectedPlaylist}
                    onChange={setSelectedPlaylist}
                    border
                    standard
                    detail
                  />
                </div>
                <div className="mt-6 flex flex-col gap-4">
                  <h6 className="body-1b text-white">{("Category")}</h6>
                  <p className="body-1r gray-200">
                    {t("Please choose the category that best describes your video.")}
                  </p>
                  <SelectBox
                    options={categories}
                    value={selectedCategory}
                    onChange={setSelectedCategory}
                    border
                    standard
                    detail
                  />
                </div>
                <div className="mt-6 flex flex-col gap-4">
                  <h6 className="body-1b text-white">{t("Audience")}</h6>
                  <p className="body-1r text-white">
                    {t("Is this video made for kids? (required)")}
                  </p>
                  <p className="body-1r gray-200">
                  {t("forth")}
                    <Link
                      to="https://support.google.com/youtube/answer/9528076?hl=en"
                      className="underline"
                    >
                      {("What's content made for kids?")}
                    </Link>
                  </p>
                  <div className="px-3 py-1 border border-[#9fa0a1] rounded flex items-center justify-start">
                    <CiCircleInfo size={16} className="gray-200 mr-2" />
                    <div
                      className="body-1r gray-200"
                      style={{ width: "calc(100% - 24px)" }}
                    >
                      {t("forth")}
                      <Link
                        to="https://support.google.com/youtube/answer/9528076?hl=en"
                        className="underline"
                      >
                        {t("What's content made for kids?")}
                      </Link>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <input
                      checked={forKid}
                      id="audience-yes"
                      type="radio"
                      value="yes"
                      name="audience"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                      onChange={() => setForKid(true)}
                    />
                    <label
                      htmlFor="audience-yes"
                      className="ms-2 text-[16px] font-normal text-white"
                    >
                      {t("Yes, it's made for kids.")}
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      checked={!forKid}
                      id="audience-no"
                      type="radio"
                      value="no"
                      name="audience"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                      onChange={() => setForKid(false)}
                    />
                    <label
                      htmlFor="audience-no"
                      className="ms-2 text-[16px] font-normal text-white"
                    >
                      {t("No, it's not made for kids.")}
                    </label>
                  </div>
                </div>
                <div className="mt-6">
                  <div
                    className="flex items-center justify-start gap-4 mb-7 cursor-pointer"
                    onClick={toggleDescription}
                  >
                    <IoMdArrowDropdown className="brand-600" size={14} />
                    <p className="brand-600 text-[12px] font-bold">
                      {t("Age restriction")}
                    </p>
                  </div>
                  <div
                    className={`text-white body-1r transition-opacity duration-300 flex flex-col gap-4`}
                    style={{ opacity: isDescriptionVisible ? 1 : 0, maxHeight: isDescriptionVisible ? '100%' : '0', overflow: 'hidden', transition: 'max-height 0.3s ease-out, opacity 0.3s ease-out' }}
                  >
                    <p className="body-1r text-white">
                      {t("Do you want to restrict your video to an adult audience?")}
                    </p>
                    <p className="body-1r gray-200">
                      {t("Age-restricted videos are shown only in AQ18+.")}
                      <Link
                        to="https://support.google.com/youtube/answer/2950063?hl=en"
                        className="underline text-[#1570EF]"
                      >
                        {t("Learn more")}
                      </Link>
                    </p>
                    <div className="flex items-center">
                      <input
                        checked={restrict}
                        id="age-yes"
                        type="radio"
                        value="yes"
                        name="age"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                        onChange={() => setRestrict(true)}
                      />
                      <label
                        htmlFor="age-yes"
                        className="ms-2 text-[16px] font-normal text-white"
                      >
                        {t("Yes, restrict my video to viewers over 18")}
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        checked={!restrict}
                        id="age-no"
                        type="radio"
                        value="no"
                        name="age"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                        onChange={() => setRestrict(false)}
                      />
                      <label
                        htmlFor="age-no"
                        className="ms-2 text-[16px] font-normal text-white"
                      >
                        {t("No, don't restrict my video to viewers over 18 only")}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-[350px] h-[450px] flex flex-col bg-zinc-950 text-white rounded-md">
                <img src={thumbnails[0]?.src ?? DetailImg } alt="Video Thumbnail" className="w-full h-3/5" />
                <div className="flex flex-col justify-start pl-2 pt-5">
                  <h3 className="text-gray-400">video link</h3>
                  <a href='https://aq-gold.net/5iekeu.net/' className="text-blue-400 underline">https://aq-gold.net/5iekeu.net/</a>
                  <h3 className="text-gray-400">File name</h3>
                  <h3 className="text-white">{file?.name ? file?.name : 'NO Name'}</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full relative flex items-center justify-end px-6 py-2 gap-2 border-t border-[#585a5c]">
            <Button onClick={onClose} label={t("back")} outline full small />
            <Button
              onClick={handleClick}
              label={t("Next")}
              full
              small
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default VideoUploadDetail;
