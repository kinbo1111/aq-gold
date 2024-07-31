import React, {useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import Input from '../inputs/Input';
import { Link } from 'react-router-dom';
import { message, Button } from 'antd';
import { signIn } from '../../services/authFunction';
import { useNavigate } from 'react-router-dom';

const LoginModal = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);     
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMessage] = useState('');

  const handleLogIn = () => {
    setIsLoading(true);
    signIn(username, password, (err, accessToken) => {
      if (err) {
        setMessage(err.message);
        message.warning(t(err.message));
        setIsLoading(false);
        return;
      }
      message.success(t("Login successful"));
      setMessage(`Access Token: ${accessToken}`);
      navigate('/dashboard');
      setIsLoading(false);
    });
  };

  // const handleLogIn = async () => {
  //     try {
  //         setIsLoading(true);
  //         await signIn({ username, password });
  //         setError('');
  //         setIsLoading(false);
  //         message.success(t("Login successful"));
  //   } catch (err: any) {
  //         if (err.message.length > 40) setError(err.message.slice(0, 40) + '...')
  //         else message.warning(err.message);
  //         setIsLoading(false);
  //   }
  // };
  

  return (
    <div className='fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center z-50'>
        <div className='bg-[rgba(19,21,21,0.95)] rounded-2xl max-w-[420px] p-12 border border-[#737576]'>
            <h6 className='sub-1b text-white mb-6'>{t("sign in to aq gold")}</h6>
        <div className="flex flex-col gap-4">
                  <Input
                  id="email"
                  type='email'
                  label={t("email")}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Email address"
                  register={register}
                  errors={errors}
                  small
                  required
                />
                <Input
                    id="password"
                    label={t("password")}
                    type="password"
                    placeholder={t("password")}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    register={register}
                    errors={errors}
                    required
                    small
                />
                <div className="inline-flex items-center mb-2">
                    <label className="relative flex items-center rounded-full cursor-pointer" htmlFor="check">
                        <input type="checkbox"
                        className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                        id="check" />
                        <span
                            className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
                            stroke="currentColor" stroke-width="1">
                            <path fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clip-rule="evenodd"></path>
                            </svg>
                        </span>
                    </label>
                    <label className="body-1r ml-2 light-50 cursor-pointer select-none" htmlFor="check">
                        {t("remember me")}
                    </label>
                </div> 
                  <Button 
                    className='w-[320px] flex-row brand-gradient text-gray-200 border-none button-2b h-10 relative disabled:cursor-not-allowed rounded hover:opacity-80 transition px-4 py-2 flex items-center justify-center'
                    loading={isLoading}
                    onClick={handleLogIn}
                  >
                      {t('sign in')}
            </Button>
                <Link to="/auth/forgot-password" className='body-1r text-[#1570EF] underline'>{t("Forgot Password?")}</Link>
                <div className="flex items-start">
                    <p className='body-1r text-white mr-1'>{t("New to AQ Gold?")}</p>
                    <Link to="/auth/signup/create-account" className='body-1r text-[#1570EF] underline'>{t("Sign up now")}</Link>
                  </div>
                  </div>     
            </div>
        </div>
  );
};

export default LoginModal;