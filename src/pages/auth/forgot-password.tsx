

// const ForgotPassword = () => {
//     const navigate = useNavigate();
//     const { t } = useTranslation();
//     const { register, handleSubmit, formState: { errors } } = useForm();
//     return (
//         <div className="relative w-full h-screen flex items-center justify-center py-20">
//             <div className="max-w-[600px] w-full b-brand-50 rounded-lg p-12">
//                 <h6 className="sub-1b gray-800 mb-5">{t("Forgot Password")}</h6>
//                 <form onSubmit={() => {}} className="flex flex-col gap-5">
//                     <Input
//                     id="email"
//                     type='email'
//                     label={t("Email address")}
//                     placeholder="Email"
//                     register={register}
//                     errors={errors}
//                     small
//                     background
//                     required
//                     />
//                     <p className='sub-2r gray-700'>{t("We will send you an email with instructions on how to reset your password")}</p>
//                     <div className='flex items-center justify-center'>
//                         <Button
//                             label={t('Email Me')}
//                             onClick={() => navigate('/auth/signup/authenticate-code')}
//                         />
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default ForgotPassword;

import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { message} from 'antd';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Input from "../../components/inputs/Input";
import {Button} from "antd";
import { useTranslation } from "react-i18next";
import { IoIosSend } from "react-icons/io";
import { MdOutlineLockReset } from "react-icons/md";

const ForgotPassword: React.FC = () => {
 
    const [email, setEmail] = useState<string>('');
    const [step, setStep] = useState<number>(1);
    const [verificationCode, setVerificationCode] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [isVerifyLoading, setIsVerifyLoading] = useState<boolean>(false);
    const [isResetLoading, setIsResetLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { register, formState: { errors } } = useForm();

    const handleSendCode = async () => {
        setIsVerifyLoading(true);
        try {
            await Auth.forgotPassword(email);
            message.success('Verification code sent to your email.');
            setIsVerifyLoading(false);
            setStep(2);
        } catch (error) {
            message.error(`Error sending verification code: ${(error as Error).message}`);
            setIsVerifyLoading(false);    
        }
    };

    const handleResetPassword = async () => {
        setIsResetLoading(true);
        try {
            await Auth.forgotPasswordSubmit(email, verificationCode, newPassword);
            message.success('Password reset successfully. Please log in with your new password.');
            setIsResetLoading(false);
            navigate('/auth/signin')
            setStep(1);
        } catch (error) {
            message.error(`Error resetting password: ${(error as Error).message}`);
            setIsResetLoading(false);
        }
    };
  
    return (
        <div>
            {step === 1 && (
              <div className="relative w-full h-screen flex items-center justify-center py-20">    
                  <div className="max-w-[600px] w-full b-brand-50 rounded-lg p-12 flex flex-col gap-5">
                      <h2 className='sub-1r gray-800 mb-10'>Forgot Password</h2>
                      <Input
                        id='email'
                        type='email'
                        label={t("User Name")}
                        placeholder="Email"
                        register={register}
                        errors={errors}
                        small
                        background
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <div className='flex items-center justify-center'>
                          <Button
                              className='w-[320px] btnOk flex-row brand-gradient text-gray-200 border-none button-2b h-10 relative disabled:cursor-not-allowed rounded hover:opacity-80 transition px-4 py-2 flex items-center justify-center'
                              type="primary"
                              icon={<IoIosSend className='w-6 h-6'/>}
                              onClick={handleSendCode}
                              loading={isVerifyLoading}
                          >
                              Send Verification Code
                          </Button>
                      </div>
                  </div>
              </div>
            )}
            {step === 2 && (
                <div className="relative w-full h-screen flex items-center justify-center py-20">               
                    <div className="max-w-[600px] w-full b-brand-50 rounded-lg p-12 justify-center flex flex-col gap-5">
                        <h2 className='sub-1r gray-800 mb-10'>Reset Password</h2>
                        <Input
                            id='verification-code'
                            type='text'
                            label={t("Verification Code")}
                            register={register}
                            errors={errors}
                            small
                            background
                            required
                            placeholder="Enter verification code"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                        />
                        <Input
                            id='new-password'
                            type='password'
                            label={t("New Password")}
                            register={register}
                            errors={errors}
                            small
                            background
                            required
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <div className='flex items-center justify-center'>
                       
                            <Button
                                className='w-[320px] btnOk flex-row brand-gradient text-gray-200 border-none button-2b h-10 relative disabled:cursor-not-allowed rounded hover:opacity-80 transition px-4 py-2 flex items-center justify-center'
                                type="primary"
                                icon={<MdOutlineLockReset className='w-6 h-6'/>}
                                loading={isResetLoading}
                                onClick={handleResetPassword}
                            >
                                Reset Password
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ForgotPassword;
