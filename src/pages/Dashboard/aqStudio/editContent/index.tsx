import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { MdAddPhotoAlternate } from "react-icons/md";
import { RiCheckboxBlankCircleFill } from "react-icons/ri";
import { CiCircleInfo } from "react-icons/ci";
import { IoMdArrowDropdown } from "react-icons/io";
import { useTranslation } from 'react-i18next';
import { VideoDetailData, Thumbnail } from "../../videoUpload";
import { categories, playlist } from '../../../../constant/SelectItems';
import { useChannel } from "../../../../contexts/ChannelContext";
import { uploadThumbnail, uploadVthumbnail, getThumbnailUrl} from "../../../../services/storageService";
import { updateVideoMetadata } from '../../../../services/VideoService'; 
import Button from "../../../../components/Button";
import SettingsModalHeader from "../../settings/SettingsModalHeader";
import Input from "../../../../components/inputs/Input";
import Textarea from "../../../../components/inputs/Textarea";
import SelectBox from "../../../../components/inputs/Select";
import { VideoData } from "../../../../types";
import { Select } from "antd";

interface VideoDetailProps {
  isOpen: boolean;
  videoData: VideoData;
  onClose: () => void;
}

export type PlaylistOption = {
  value: string;
  label: string;
}


const VideoDetail: React.FC<VideoDetailProps> = ({
  videoData,
  isOpen,
  onClose,
}) => {

  const {
    register,
    formState: { errors },
  } = useForm();
  
  const { t } = useTranslation();
  const [title, setTitle] = useState<string>(videoData.title);
  const [description, setDescription] = useState<string | undefined>(videoData.description);
  const [selectedPlaylist, setSelectedPlaylist] = useState<string>(videoData.playlist);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(videoData.category);
  const [thumbnails, setThumbnails] = useState<Thumbnail[]>([]);
  const [thumbnailFile, setThumbnailFile] = useState<File>();
  const [vthumbnails, setVThumbnails] = useState<Thumbnail[]>([]);
  const [vThumbnailFile, setVthumbnailFile] = useState<File>();
  const [forKid, setForKid] = useState<boolean>(videoData.isForKids);
  const [restrict, setRestrict] = useState<boolean>(videoData.isRestricted);
  const [isDescriptionVisible, setDescriptionVisible] = useState(false);
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [loading, setLoading] = useState(false);
  const { channelData, checkUserChannel } = useChannel();

  const [playlists, setPlaylists] = useState<PlaylistOption[]>([
      { value: "1", label: "Playlist 1" },
      { value: "2", label: "Playlist 2" },
      { value: "3", label: "Playlist 3" },
      { value: "4", label: "Playlist 4" },
    ]);

    useEffect(() => {
      const vThumbnails = [{ 
        src: videoData.vThumbnailUrl ?? '', 
        alt: "vertical thumbnail"
      }];
      const thumbnails = [{
        src: videoData.thumbnailUrl ?? '', 
        alt: "thumbnail"
      }];

      checkUserChannel();
      setThumbnails(thumbnails);
      setVThumbnails(vThumbnails);
    }, []);


  const toggleDescription = () => {
    setDescriptionVisible(!isDescriptionVisible);
  };

  const onSubmit = (data: VideoDetailData | null) => {
    onClose()
  };

  const handleSelectChange = (value: string) => {
    setSelectedPlaylist(value);
  };

  const handleAddPlaylist = (newValue: string) => {
    if (!playlists.some((playlist) => playlist.label === newValue)) {
      const newPlaylist = { value: String(playlists.length + 1), label: newValue };
      setPlaylists([...playlists, newPlaylist]);
    }
    setSelectedPlaylist(newValue);
  };

 const handleThumbnailUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setThumbnailFile(files[0]);
      const newThumbnails = Array.from(files).map((file) => ({
        src: URL.createObjectURL(file),
        alt: file.name,
      }));
      setThumbnails(newThumbnails);
    }
  };

  const handleVThumbnailUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setVthumbnailFile(files[0]);
      const newVThumbnails = Array.from(files).map((file) => ({
        src: URL.createObjectURL(file),
        alt: file.name,
      }));
      setVThumbnails(newVThumbnails);
    }
  };


   const handleSaveVideo = async () => {
    if (!channelData || !channelData.id) return;

    try {
      setLoading(true);
     const thumbnailUrl = thumbnailFile 
        ? await getThumbnailUrl(await uploadThumbnail(thumbnailFile)) 
        : videoData.thumbnailUrl;

    const vThumbnailUrl = vThumbnailFile 
        ? await getThumbnailUrl(await uploadVthumbnail(vThumbnailFile)) 
        : videoData.vThumbnailUrl;

    const updatedVideoData = {
        id: videoData.id,
        title,
        description,
        category: selectedCategory,
        thumbnailUrl, 
        vThumbnailUrl,
        isForKids: forKid,
        isRestricted: restrict,
        playlist: selectedPlaylist,
        channelId: videoData.channelId
    };

    await updateVideoMetadata(updatedVideoData);
    } catch (error) {
      console.error('Error updating video:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;
  

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[999] bg-black bg-opacity-70 py-4">
      <div className="relative w-11/12 md:w-3/4 lg:w-2/3 b-gray-600 rounded-lg h-full max-h-[90vh] overflow-y-auto videoDetail">
        <SettingsModalHeader
          onClose={onClose}
          showCloseButton={true}
          label={title?.length ? title : t('NO TITLE')}
        />
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
                        src={thumbnail?.src ?? ''}
                        alt={thumbnail?.alt ?? ''}
                        className="w-full max-w-[150px] rounded-lg"
                      />
                    ))}
                    <label className={`max-w-[150px] w-full h-20 border border-dashed border-gray-500 flex items-center justify-center cursor-pointer rounded-lg ${thumbnails.length ? 'hover:bg-gray-300' : ''}`}>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        multiple
                        onChange={handleThumbnailUpload}
                        onClick={(e) => {
                          (e.target as HTMLInputElement).value = '';
                        }}
                      />
                      <div className="text-gray-500 text-center flex flex-col items-center justify-center">
                        <MdAddPhotoAlternate size={24} className="gray-200 mb-2" />
                        <p className="body-2r gray-200 text-center">
                          {t("Upload image")}
                        </p>
                      </div>
                    </label>
                  </div>
                  <div className="flex items-start justify-start gap-4">
                    {vthumbnails.map((thumbnail, index) => (
                      <img
                        key={index}
                        src={thumbnail?.src ?? ''}
                        alt={thumbnail?.alt ?? ''}
                        className="w-full max-w-[150px] rounded-lg"
                      />
                    ))}
                    <label className={`max-w-[150px] w-full h-20 border border-dashed border-gray-500 flex items-center justify-center cursor-pointer rounded-lg ${vthumbnails.length ? 'hover:bg-gray-300' : ''}`}>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        multiple
                        onChange={handleVThumbnailUpload}
                        onClick={(e) => {
                          (e.target as HTMLInputElement).value = '';
                        }}
                      />
                      <div className="text-gray-500 text-center flex flex-col items-center justify-center">
                        <MdAddPhotoAlternate size={24} className="gray-200 mb-2" />
                        <p className="body-2r gray-200 text-center">
                          {t("Upload image")}
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
                <div className="mt-6 flex flex-col gap-4">
                  <h6 className="body-1b text-white">{t("Playlists")}</h6>
                  <p className="body-1r gray-200">
                    {t("Add your video to one or more playlists to organize your content for viewers.")}
                  </p>
                      <Select
                        mode="tags"
                        placeholder={t("Select or add a playlist")}
                        value={selectedPlaylist}
                        onChange={handleSelectChange}
                        onSelect={handleAddPlaylist}
                        options={playlists.map((playlist) => ({
                        value: playlist.label,
                        label: playlist.label,
                        }))}
                      popupClassName="playlist"
                      getPopupContainer={(triggerNode) => triggerNode.closest('.playlist')}
                      className="playlist bg-[#2e3133] text-white rounded border border-[#9fa0a1] w-[356px] px-4 py-2 max-h-[44px]"
                    />
                </div>
                <div className="mt-6 flex flex-col gap-4">
                  <h6 className="body-1b text-white">{t("Category")}</h6>
                  <p className="body-1r gray-200">
                    {t("Please choose the category that best describes your video.")}
                  </p>
                  <SelectBox
                    options={categories}
                    value={selectedCategory ?? ''}
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
                  <div className="px-3 py-1 border border-[#9fa0a1] rounded flex items-center justify-start">
                    <CiCircleInfo size={16} className="gray-200 mr-2" />
                    <div
                      className="body-1r gray-200"
                      style={{ width: "calc(100% - 24px)" }}
                    >
                      {t("Regardless")}
                      <Link
                        to="https::/aqgold.net/faq"
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
                      <a
                        href="#"
                        className="underline text-[#1570EF]"
                      >
                        {t("Learn more")}
                      </a>
                    </p>
                    <div className="flex items-center">
                      <input
                        checked={restrict}
                        id="age-yes"
                        type="radio"
                        value="no"
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
            </div>
          </div>
          <div className="w-full relative flex items-center justify-end px-6 py-2 gap-2 border-t border-[#585a5c]">
            <Button
              onClick={handleSaveVideo}
              full
              small
              label={loading ? t("Saving...") : t("Edit")}
            />
          </div>
      </div>
    </div>
  );
};

export default VideoDetail;
