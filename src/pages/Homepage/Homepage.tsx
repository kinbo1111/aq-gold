import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from "../../components/Button";
import Input from "../../components/inputs/Input";
import Container from "../../components/Container";
import FaqList from "../../components/faq/FaqList";
import Slider from "./Slider";
import { SlArrowRight } from "react-icons/sl";
import { FieldValues, useForm } from "react-hook-form";
import Video02 from "../../assets/images/movie02.png"
import Footer from "../../components/footer/Footer";
import { useTranslation } from "react-i18next";
import { ReactHTMLElement } from "react";

const Homepage = () => {
  const {
    register,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/auth/signup/create-account');
  }
  
  return (
    <div>
      <div
        className="relative w-full mainvisual h-[610px] flex items-center justify-center border-b-4 border-[#2a2d2e]"
        >
          <Container>
          <h6 className="h6 text-center text-white mb-6">{t("Unlimited 360° video contents")}</h6>
          <p className="sub-1r text-center text-white mb-6">{t("Watch anywhere anytime with Free.")}</p>
            <p className="sub-1r text-center text-white">{t("Ready to watch? Enter your email to create or restart your AQ account.")}</p>
            <div className="flex items-center justify-center flex-col md:flex-row gap-4 mt-9">
              <Input
                register={register}
                id="email"
                type="email"
                label=""
                disabled={false}
                errors={errors}
                success
              standard
              onChange={e => setEmail(e.target.value)}
              value={email}
                placeholder={t("Email address")}
                full
                required
              />
                <Button
                  label={t("Get Started")}
                  onClick={handleStart}
                  iconExist
                  icon={SlArrowRight }
                  full
                />
            </div>
          </Container>
      </div>
      <div className="relative border-b-4 border-[#2a2d2e]">
        <Container>
          <div className="py-[84px] flex items-center justify-center md:justify-between flex-col-reverse md:flex-row">
            <div className="w-full md:w-[48%]">
              <h6 className="h7 brand-600 mb-4">{t("Enjoy 360° video contents")}</h6>
              <p className="sub-2r text-white">{t("Watch 360° video contents such as Natural view, relaxation, travel adventure, sport, games and more.")}</p>
            </div>
            <div className="w-full md:w-[48%] rounded-3xl">
              <Slider/>
            </div>
          </div>
          <div className="py-[84px] flex items-center justify-center md:justify-between flex-col md:flex-row">
            <div className="w-full md:w-[48%] rounded-3xl">
              <img src={Video02} alt="" />
            </div>
            <div className="w-full md:w-[48%]">
              <h6 className="h7 brand-600 mb-4">{t("Free for watch all contents")}</h6>
              <p className="sub-2r text-white">{t("Enjoy all contents for Free.")}</p>
            </div>
          </div>
          <div className="py-[84px] flex items-center justify-center md:justify-between flex-col-reverse md:flex-row">
            <div className="w-full md:w-[48%]">
              <h6 className="h7 brand-600 mb-4">{t("Upload your 360° video contents")}</h6>
              <p className="sub-2r text-white">{t("Be AQvar to upload and share your 360° video contents.")}</p>
            </div>
            <div className="w-full md:w-[48%] rounded-3xl">
              <Slider/>
            </div>
          </div>
          <div className="py-[84px] flex items-center justify-center md:justify-between flex-col md:flex-row">
            <div className="w-full md:w-[48%] rounded-3xl">
              <img src={Video02} alt="" />
            </div>
            <div className="w-full md:w-[48%]">
              <h6 className="h7 brand-600 mb-4">{t("Watch everywhere")}</h6>
              <p className="sub-2r text-white">{t("Stream unlimited 360° video contents on your phone, tablet, laptop, and VR goggle.")}</p>
            </div>
          </div>
        </Container>
      </div>
      <div className="relative py-[80px] border-b-4 border-[#2a2d2e]">
        <Container>
          <FaqList />
          <p className="sub-1r text-center text-white mt-12">{t("Ready to watch? Enter your email to create or restart your AQ account.")}</p>
          <div className="flex items-center justify-center flex-col md:flex-row gap-4 mt-9">
            <Input
              register={register}
              id="email"
              type="email"
              label=""
              disabled={false}
              errors={errors}
              onChange={e => setEmail(e.target.value)}
              value={email}
              success
              standard
              placeholder={t("Email address")}
              full
              required
            />
              <Button
                label={t("Get Started")}
                onClick={handleStart}
                iconExist
                icon={SlArrowRight }
                full
              />
          </div>
        </Container>
      </div>
      <Footer/>
    </div>
  );
};

export default Homepage;
