import Button from "../../components/Button";
import Input from "../../components/inputs/Input";
import Container from "../../components/Container";
import FaqList from "../../components/faq/FaqList";
import Slider from "./Slider";
import { SlArrowRight } from "react-icons/sl";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Video02 from "../../assets/images/movie02.png"
import Footer from "../../components/footer/Footer";

const Homepage = () => {
  const {
    register, handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = data => {
    console.log(data);
  };
  return (
    <div>
      <div
        className="relative w-full mainvisual h-[610px] flex items-center justify-center border-b-4 border-[#2a2d2e]"
        >
          <Container>
            <h6 className="h6 text-center text-white mb-6">Unlimited 360° video contents</h6>
            <p className="sub-1r text-center text-white mb-6">Watch anywhere anytime with Free.</p>
            <p className="sub-1r text-center text-white">Ready to watch? Enter your email to create or restart your AQ account.</p>
            <form onSubmit={handleSubmit(onSubmit)} className="flex items-center justify-center flex-col md:flex-row gap-4 mt-9">
              <Input
                register={register}
                id="email"
                type="email"
                label=""
                disabled={false}
                errors={errors}
                success
                standard
                placeholder="tamdt03@gmail.com"
                full
                required
              />
                <Button
                  label="Get Started"
                  onClick={() => {}}
                  iconExist
                  icon={SlArrowRight }
                  full
                />
            </form>
          </Container>
      </div>
      <div className="relative border-b-4 border-[#2a2d2e]">
        <Container>
          <div className="py-[84px] flex items-center justify-center md:justify-between flex-col-reverse md:flex-row">
            <div className="w-full md:w-[48%]">
              <h6 className="h7 brand-600 mb-4">Enjoy 360° video contents</h6>
              <p className="sub-2r text-white">Watch 360° video contents such as Natural view, relaxation, travel adventure, sport, games and more.</p>
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
              <h6 className="h7 brand-600 mb-4">Free for watch all contents</h6>
              <p className="sub-2r text-white">Enjoy all contents for Free.</p>
            </div>
          </div>
          <div className="py-[84px] flex items-center justify-center md:justify-between flex-col-reverse md:flex-row">
            <div className="w-full md:w-[48%]">
              <h6 className="h7 brand-600 mb-4">Upload your 360° video contents</h6>
              <p className="sub-2r text-white">Be AQvr to upload and share your 360° video contents.</p>
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
              <h6 className="h7 brand-600 mb-4">Watch everywhere</h6>
              <p className="sub-2r text-white">Stream unlimited 360° video contents on your phone, tablet, laptop, and VR goggle.</p>
            </div>
          </div>
        </Container>
      </div>
      <div className="relative py-[80px] border-b-4 border-[#2a2d2e]">
        <Container>
          <FaqList />
          <p className="sub-1r text-center text-white mt-12">Ready to watch? Enter your email to create or restart your AQ account.</p>
          <form onSubmit={handleSubmit(onSubmit)} className="flex items-center justify-center flex-col md:flex-row gap-4 mt-9">
            <Input
              register={register}
              id="email"
              type="email"
              label=""
              disabled={false}
              errors={errors}
              success
              standard
              placeholder="tamdt03@gmail.com"
              full
              required
            />
              <Button
                label="Get Started"
                onClick={() => {}}
                iconExist
                icon={SlArrowRight }
                full
              />
          </form>
        </Container>
      </div>
      <Footer/>
    </div>
  );
};

export default Homepage;
