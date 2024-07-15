import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Input from "../../components/inputs/Input";
import Button from "../../components/Button";
import { useTranslation } from "react-i18next";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { register, handleSubmit, formState: { errors } } = useForm();
    return (
        <div className="relative w-full h-screen flex items-center justify-center py-20">
            <div className="max-w-[600px] w-full b-brand-50 rounded-lg p-12">
                <h6 className="sub-1b gray-800 mb-5">{t("Forgot Password")}</h6>
                <form onSubmit={() => {}} className="flex flex-col gap-5">
                    <Input
                    id="email"
                    type='email'
                    label={t("Email address")}
                    placeholder="Email"
                    register={register}
                    errors={errors}
                    small
                    background
                    required
                    />
                    <p className='sub-2r gray-700'>{t("We will send you an email with instructions on how to reset your password")}</p>
                    <div className='flex items-center justify-center'>
                        <Button 
                            label={t('Email Me')} 
                            onClick={() => navigate('/auth/signup/authenticate-code')}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;