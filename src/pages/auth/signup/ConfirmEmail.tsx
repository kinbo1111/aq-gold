import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Input from "../../../components/inputs/Input";
import Button from "../../../components/Button";
import SelectBox from "../../../components/inputs/Select";

const ConfirmEmail = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <div className="relative w-full h-screen flex items-center justify-center py-20">
      <div className="max-w-[600px] w-full b-brand-50 rounded-lg p-12">
        <p className="body-2r gray-400 mb-4">
          Step<span className="body-1b gray-800 ml-1">2/3</span>
        </p>
        <h6 className="sub-1r gray-800 mb-10 text-center">
          Confirm your email address
        </h6>
        <p className="text-[20px] text-black mb-10">
          Authentication code will be sent to your email address.If your email
          address is incorrect, please edit it and press the "Send Code" button.
        </p>
        <form onSubmit={() => {}} className="flex flex-col gap-10">
          <Input
            id="email"
            type="email"
            label="Email address"
            placeholder="Email"
            register={register}
            errors={errors}
            small
            background
            required
          />
          <Link
            to="/auth/forgot-password"
            className="body-1r text-[#1570EF] underline"
          >
            Edit my email address.
          </Link>
          <div className="flex items-center justify-center">
            <Button
              label="Send Code"
              onClick={() => navigate("/auth/signup/authenticate-code")}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConfirmEmail;
