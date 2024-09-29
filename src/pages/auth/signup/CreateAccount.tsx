import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { Select, Button, message } from 'antd';
import moment from 'moment';  // You can use moment.js for easier date handling
import Input from "../../../components/inputs/Input";
import SelectBox from '../../../components/inputs/Select';
import { useTranslation } from "react-i18next";
import { signUp } from '../../../services/authFunction';
import dayjs from 'dayjs';

const { Option } = Select;

const CreateAccount: React.FC = () => {
  
  const navigate = useNavigate();
  const { t } = useTranslation();
  const location = useLocation();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [gender, setGender] = useState<string>('male');
  const [birthday, setBirthday] = useState<string>('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [selectedYear, setSelectedYear] = useState<number>(dayjs().year());
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null); 
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const currentYear = dayjs().year();
  const currentMonth = dayjs().month() + 1; // month() is zero-based in dayjs
  const currentDay = dayjs().date();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const emailFromQuery = params.get("email");
    if (emailFromQuery) {
      setEmail(emailFromQuery);
    }
  }, [location]);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleCreateAccount = () => {
    setIsLoading(true);
        
    if (!username) {
      message.warning('Username is required for sign up.');
      setIsLoading(false);
      return;
    }
        
    if (!password) {
      message.warning('Please create a password for sign up.');
      setIsLoading(false);
      return;
    }

    if (!email) {
      message.warning('Email address is required for signup.');
      setIsLoading(false);
      return;
    }
    
    if (!selectedDay || !selectedMonth || !selectedYear) {
      message.warning('Please enter your date of birth!');
      setIsLoading(false);
      return;
    }

    const birthday = dayjs(`${selectedYear}-${selectedMonth}-${selectedDay}`).format('YYYY-MM-DD');

    if (password !== passwordConfirm) {
      message.warning('Passwords do not match. Please confirm your password.');
      setIsLoading(false);
      return;
    }
    
    if (!validateEmail(email)) {
      message.warning('Invalid email address. Please enter a valid email.');
      setIsLoading(false);
      return;
    }
    
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

  const renderYearSelector = () => {
    const years = [];
    for (let i = 1900; i <= currentYear; i++) {
      years.push(
        <Option key={i} value={i}>
          {i}
        </Option>
      );
    }
    return (
      <Select
        value={selectedYear}
        onChange={(year) => {
          setSelectedYear(year);
          setSelectedMonth(null);  // Reset month if year is changed
          setSelectedDay(null);    // Reset day if year is changed
        }}
        className="w-1/3 mr-2"
      >
        {years}
      </Select>
    );
  };

  const renderMonthSelector = () => {
    const months = [];
    const limitMonth = selectedYear === currentYear ? currentMonth : 12;
    for (let i = 1; i <= limitMonth; i++) {
      months.push(
        <Option key={i} value={i}>
          {dayjs().month(i - 1).format('MMMM')}
        </Option>
      );
    }
    return (
      <Select
        value={selectedMonth}
        onChange={(month) => {
          setSelectedMonth(month);
          setSelectedDay(null); // Reset day if month is changed
        }}
        className="w-1/3 mr-2"
        disabled={!selectedYear}
      >
        {months}
      </Select>
    );
  };

  const renderDaySelector = () => {
    const days = [];
    if (selectedMonth && selectedYear) {
      const daysInMonth = dayjs(`${selectedYear}-${selectedMonth}`, 'YYYY-MM').daysInMonth();
      const limitDay = selectedYear === currentYear && selectedMonth === currentMonth ? currentDay : daysInMonth;
      for (let i = 1; i <= limitDay; i++) {
        days.push(
          <Option key={i} value={i}>
            {i}
          </Option>
        );
      }
    }
    return (
      <Select
        value={selectedDay}
        onChange={setSelectedDay}
        className="w-1/3 mr-2"
        disabled={!selectedMonth}
      >
        {days}
      </Select>
    );
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center py-20 bg-[#EDEDED]">
      <div className="max-w-[600px] w-full b-brand-50 rounded-lg p-12">
        <p className="body-2r gray-400 mb-4">{t("Step")}<span className="body-1b gray-800 ml-1">1/2</span></p>
        <h6 className="sub-1r gray-800 mb-10">{t("Create your AQ Account")}</h6>
        <form onSubmit={handleSubmit(handleCreateAccount)} className="flex flex-col gap-8">
          <Input
            id="username"
            type='text'
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
            <div className="flex">
              {renderYearSelector()}
              {renderMonthSelector()}
              {renderDaySelector()}
            </div>
          </div>
          <div>
            <h6 className='body-1b gray-700 mb-[2px]'>{t("Gender")}</h6>
            <div className='flex items-center justify-start gap-4'>
              <div className="flex items-center">
                <input
                  checked={gender === 'male'}
                  id="male"
                  type="radio"
                  value="male"
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
                  value="female"
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
              className='w-[320px] btnOk flex-row brand-gradient text-gray-200 border-none button-2b h-10 relative disabled:cursor-not-allowed rounded hover:opacity-80 transition px-4 py-2 flex items-center justify-center'
              onClick={handleSubmit(handleCreateAccount)} 
              loading={isLoading}
            >{t('Next')}</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
