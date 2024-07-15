import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Input from "../../../components/inputs/Input";
import Button from "../../../components/Button";
import { useTranslation } from "react-i18next";

const AuthenticateCode = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { register, handleSubmit, formState: { errors } } = useForm();
    return (
        <div className="relative w-full h-screen flex items-center justify-center py-20">
            <div className="max-w-[600px] w-full b-brand-50 rounded-lg p-12">
                <p className="body-2r gray-400 mb-4">Step<span className="body-1b gray-800 ml-1">3/3</span></p>
                <h6 className="sub-1r gray-800 mb-10 text-center">{t("Enter Authentication Code")}</h6>
                <p className='text-[20px] text-black mb-10'>
                   {t("Please enter the authentication code (6 numbers) that sent to your email address")}<br/>
                   {t("and press the Start AQ GOLD button")}
                </p>
                <form onSubmit={() => {}} className="flex flex-col gap-10">
                <Link to="/auth/signup/confirm-email" className='body-1r text-[#1570EF] underline'>{t("I haven't received an authentication code")}</Link>
                <Input
                    id="number"
                    type='number'
                    label={t("Authentication Code")}
                    placeholder="123456"
                    register={register}
                    errors={errors}
                    small
                    background
                    required
                />
                <div className='flex items-center justify-center'>
                    <Button 
                        label={t('Send Code')} 
                        onClick={() => navigate('/auth/signup/confirm-email')}
                    />
                </div>
            </form>
            </div>
        </div>
    );
};

export default AuthenticateCode;