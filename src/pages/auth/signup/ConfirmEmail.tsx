import React, {useState} from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Input from "../../../components/inputs/Input";
import Button from "../../../components/Button";
import { useTranslation } from "react-i18next";
import { confirmSignUp } from '../../../services/authFunction';
import SelectBox from "../../../components/inputs/Select";

const ConfirmEmail = () => {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');

  const { register, formState: { errors } } = useForm();

  const handleSend = () => {
    confirmSignUp(username, code, (err, result) => {
      if (err) {
        setMessage(err.message);
        return;
      }
      setMessage('User confirmed successfully.');
      navigate("auth/signup/authenticate-code");
    });
  };
  const navigate = useNavigate();
  return (
    <div className="relative w-full h-screen flex items-center justify-center py-20 bg-[#EDEDED]">
      <div className="max-w-[600px] w-full b-brand-50 rounded-lg p-12">
        <p className="body-2r gray-400 mb-4">
          {t("Step")}<span className="body-1b gray-800 ml-1">2/2</span>
        </p>
        <h6 className="sub-1r gray-800 mb-10 text-center">
          {t("Confirm your email address")}
        </h6>
        <p className="text-[20px] text-black mb-10">
          {t("third")}
        </p>
        <div className="flex flex-col gap-10">
          <Input
            id="email"
            type="email"
            label={t("Email address")}
            placeholder={t("Email")}
            register={register}
            errors={errors}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            small
            background
            required
          />
          <Link
            to="/auth/forgot-password"
            className="body-1r text-[#1570EF] underline"
          >
            {t("Edit my email address")}
          </Link>
          <div className="flex items-center justify-center">
            <Button
              label={t("Send Code")}
              onClick={handleSend}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmEmail;
