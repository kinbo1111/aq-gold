import React, {useState} from "react";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import Input from "../../../components/inputs/Input";
import Button from "../../../components/Button";
import SelectBox from '../../../components/inputs/Select';
import { useTranslation } from "react-i18next";

const CreateAccount = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [gender, setGender] = useState<string>("yes");
    const [selectedYear, setSelectedYear] = useState<string>("");
    const [selectedMonth, setSelectedMonth] = useState<string>("");
    const [selectedDay, setSelectedDay] = useState<string>("");
    const yearOptions = [];
    for (let year = 1970; year <= 2035; year++) {
      yearOptions.push({ value: year.toString(), label: year.toString() });
    }
  
    const monthOptions = [
      { value: "1", label: "January" },
      { value: "2", label: "February" },
      { value: "3", label: "March" },
      { value: "4", label: "April" },
      { value: "5", label: "May" },
      { value: "6", label: "June" },
      { value: "7", label: "July" },
      { value: "8", label: "August" },
      { value: "9", label: "September" },
      { value: "10", label: "October" },
      { value: "11", label: "November" },
      { value: "12", label: "December" },
    ];
  
    const dayOptions = [];
    for (let day = 1; day <= 31; day++) {
      dayOptions.push({ value: day.toString(), label: day.toString() });
    }
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
                    errors={errors}
                    small
                    background
                    required
                />
                <div>
                    <h6 className='body-1b gray-700 mb-[2px]'>{t("Your Birthday")}</h6>
                    <div className='grid grid-cols-3 gap-4'>
                        <SelectBox
                            options={yearOptions}
                            value={selectedYear}
                            onChange={setSelectedYear}
                            detail
                        />
                        <SelectBox
                            options={monthOptions}
                            value={selectedMonth}
                            onChange={setSelectedMonth}
                            detail
                        />
                        <SelectBox
                            options={dayOptions}
                            value={selectedDay}
                            onChange={setSelectedDay}
                            detail
                        />
                    </div>
                </div>
                <div>
                    <h6 className='body-1b gray-700 mb-[2px]'>{t("Gender")}</h6>
                    <div className='flex items-center justify-start gap-4'>
                        <div className="flex items-center">
                            <input
                                checked={gender === "yes"}
                                id="male"
                                type="radio"
                                value="yes"
                                name="gender"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                                onChange={() => setGender("yes")}
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
                                checked={gender === "no"}
                                id="female"
                                type="radio"
                                value="yes"
                                name="gender"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                                onChange={() => setGender("no")}
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
                register={register}
                errors={errors}
                small
                background
                required
                />
               <Input
                id="password"
                label={t("Password Confirm")}
                type="password"
                placeholder={t("Use 6~20 characters with numbers")}
                register={register}
                errors={errors}
                small
                background
                required
                />
                <div className='flex items-center justify-center'>
                    <Button 
                        label={t('Next')} 
                        onClick={() => navigate('/auth/signup/confirm-email')}
                    />
                </div>
            </form>
            </div>
        </div>
    );
};

export default CreateAccount;