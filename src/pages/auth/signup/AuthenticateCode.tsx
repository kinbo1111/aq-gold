import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Input from "../../../components/inputs/Input";
import { SiAuthelia } from "react-icons/si";
import {Button} from 'antd'
import { useTranslation } from "react-i18next";
import { IoIosSend } from "react-icons/io";
import { confirmSignUp, resendConfirmationCode } from '../../../services/authFunction';
import { message } from 'antd';

const AuthenticateCode = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [sendLoading, setSendingLoading] = useState(false);
    const [reSendLoading, setReSendingLoading] = useState(false);
    const [code, setCode] = useState('');
    const [msg, setMessage] = useState('');
    const { register, formState: { errors } } = useForm();

    const handleSend = async () => {
        setSendingLoading(true);
        const username = await localStorage.getItem('username')
        if (!username) {
            message.warning('unexpected error!');
            setSendingLoading(false)
            return;
        }
        confirmSignUp(username, code, (err, result) => {
        if (err) {
            message.warning(err.message);
            setSendingLoading(false)
            return;
        }
        setSendingLoading(false)
        message.success('User confirmed successfully.');
        navigate("/auth/signin");
        });
    };

    const handleResendCode = async () => {
        setReSendingLoading(true);
        const username = await localStorage.getItem('username')
        if (!username) {
            message.warning('unexpected error!');
            setReSendingLoading(false);
            return;
        }
        resendConfirmationCode(username, (err, result) => {
        if (err) {
            setReSendingLoading(false);
            message.warning(err.message);
            return;
        }
        setReSendingLoading(false);
        message.success('Confirmation code resent successfully. Please check your email.');
        });
    };
    
    return (
        <div className="relative w-full h-screen flex items-center justify-center py-20">
            <div className="max-w-[600px] w-full b-brand-50 rounded-lg p-12">
                <p className="body-2r gray-400 mb-4">Step<span className="body-1b gray-800 ml-1">2/2</span></p>
                <h6 className="sub-1r gray-800 mb-10 text-center">{t("Enter Authentication Code")}</h6>
                <p className='text-[20px] text-black mb-10'>
                   {t("Please enter the authentication code (6 numbers) that sent to your email address")}<br/>
                   {t("and press the Start AQ GOLD button")}
                </p>
                <div className="flex flex-col gap-10">
                <Link to="/auth/signup/confirm-email" className='body-1r text-[#1570EF] underline'>{t("I haven't received an authentication code")}</Link>
                <Input
                    id="number"
                    type='number'
                    label={t("Authentication Code")}
                    placeholder="123456"
                    register={register}
                    errors={errors}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    small
                    background
                    required
                />
                    <div className='flex items-center flex-col justify-center'>
                        <Button
                             className='w-[320px] flex-row brand-gradient text-gray-200 border-none button-2b h-10 relative disabled:cursor-not-allowed rounded hover:opacity-80 transition px-4 py-2 flex items-center justify-center my-2'
                            onClick={handleResendCode}
                            loading={reSendLoading}
                            icon={<IoIosSend />}
                        >{t('Resend Code')}
                            </Button>
                        <Button 
                            className='w-[320px] flex-row brand-gradient text-gray-200 border-none button-2b h-10 relative disabled:cursor-not-allowed rounded hover:opacity-80 transition px-4 py-2 flex items-center justify-center'
                            loading={sendLoading}
                            icon={<SiAuthelia />}
                            onClick={handleSend}
                        >{t('Authenticate Email')}
                            </Button>
    
                </div>
            </div>
            </div>
        </div>
    );
};

export default AuthenticateCode;