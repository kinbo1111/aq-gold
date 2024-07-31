import React, {useState} from "react";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import type { DatePickerProps } from 'antd';
import { DatePicker } from 'antd';
import type { Dayjs } from 'dayjs';

import Input from "../../../components/inputs/Input";
// import Button from "../../../components/Button";
import { Button, message } from 'antd';
import SelectBox from '../../../components/inputs/Select';
import { useTranslation } from "react-i18next";
import { signUp } from '../../../services/authFunction';

const CreateAccount = () => {
  
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [gender, setGender] = useState<string>('');
  const [birthday, setBirthday] = useState<any>('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleCreateAccount = () => {
    
    setIsLoading(true);
    signUp(username, password, email, birthday, gender, (err, result) => {
      if (err) {
        message.warning(err.message);
        setIsLoading(false);

        return;
      }
      setIsLoading(false);
      localStorage.setItem('username', username);
      message.success('User signed up successfully. Please check your email for the confirmation code.');
      navigate('/auth/signup/authenticate-code');

    });
  };

  const onChange: DatePickerProps<Dayjs[]>['onChange'] = (date, dateString) => {
    setBirthday(dateString);
  };
  
    return (
        <div className="relative w-full h-screen flex items-center justify-center py-20">
            <div className="max-w-[600px] w-full b-brand-50 rounded-lg p-12">
                <p className="body-2r gray-400 mb-4">{t("Step")}<span className="body-1b gray-800 ml-1">1/3</span></p>
                <h6 className="sub-1r gray-800 mb-10">{t("Creat your AQ Account")}</h6>
                <form onSubmit={() => {}} className="flex flex-col gap-8">
                <Input
                    id="username"
                    type='email'
                    label={t("Username")}
                    placeholder="Maruko"
                    register={register}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    errors={errors}
                    small
                    background
                    required
                />
                <div>
                    <h6 className='body-1b gray-700 mb-[2px]'>{t("Your Birthday")}</h6>
                      <DatePicker onChange={onChange} className="w-full h-10"/>
                </div>
                <div>
                    <h6 className='body-1b gray-700 mb-[2px]'>{t("Gender")}</h6>
                    <div className='flex items-center justify-start gap-4'>
                        <div className="flex items-center">
                            <input
                                checked={gender === 'male'}
                                id="male"
                                type="radio"
                                value="yes"
                                name="gender"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                                onChange={() => setGender('male')}
                            />
                            <label
                            htmlFor="male"
                            className="ms-2 text-[16px] font-normal gray-800"
                            >
                            {t("Male")}
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                checked={gender === 'female'}
                                id="female"
                                type="radio"
                                value="yes"
                                name="gender"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                                onChange={() => setGender('female')}
                            />
                            <label
                            htmlFor="female"
                            className="ms-2 text-[16px] font-normal gray-800"
                            >
                            {t("Female")}
                            </label>
                        </div>
                    </div>
                </div>
                <Input
                  id="email"
                  type='email'
                  label={t("Email address")}
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  register={register}
                  errors={errors}
                  small
                  background
                  required
                />
                <Input
                  id="password"
                  label={t("Password")}
                  type="password"
                  placeholder={t("Use 6~20 characters with numbers")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  register={register}
                  errors={errors}
                  small
                  background
                  required
                />
               <Input
                  id="passwordConfirm"
                  label={t("Password Confirm")}
                  type="password"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  placeholder={t("Use 6~20 characters with numbers")}
                  register={register}
                  errors={errors}
                  small
                  background
                  required
                />
                <div className='flex items-center justify-center'>
              <Button 
                  className='w-[320px] flex-row brand-gradient text-gray-200 border-none button-2b h-10 relative disabled:cursor-not-allowed rounded hover:opacity-80 transition px-4 py-2 flex items-center justify-center'
                  onClick={handleCreateAccount} 
                  loading={isLoading}
              >{t('Next')}</Button>
              
                </div>
            </form>
            </div>
        </div>
    );
};

export default CreateAccount;