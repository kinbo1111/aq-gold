import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { RootState } from '../../redux/store';
import { login } from '../../redux/slices/authSlice';
import { useAuth } from '../../context/AuthContext';
import Input from '../inputs/Input';
import Button from '../Button';
import { Link } from 'react-router-dom';

const LoginModal = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useAuth();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);

  const onSubmit = (data: { email: string; password: string }) => {
    login();
  };

  return (
    <div className='fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center z-50'>
        <div className='bg-[rgba(19,21,21,0.95)] rounded-2xl max-w-[420px] p-12 border border-[#737576]'>
            <h6 className='sub-1b text-white mb-6'>Sign In to AQ Gold</h6>
            {error && <div>{error}</div>}
            <form onSubmit={() => {}} className="flex flex-col gap-4">
                <Input
                id="email"
                type='email'
                label="Email"
                placeholder="Email address"
                register={register}
                errors={errors}
                small
                required
                />
                <Input
                id="password"
                label="Password"
                type="password"
                placeholder="Password"
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
                        Remember Me
                    </label>
                </div> 
                <Button 
                    label='Sign In' 
                    disabled={isLoading}
                    small
                    onClick={() => {}}
                />
                <Link to="/auth/forgot-password" className='body-1r text-[#1570EF] underline'>Forgot Password?</Link>
                <div className="flex items-start">
                    <p className='body-1r text-white mr-1'>New to AQ Gold?</p>
                    <Link to="/auth/signup/create" className='body-1r text-[#1570EF] underline'>Forgot Password?</Link>
                </div>
            </form>
        </div>
    </div>
  );
};

export default LoginModal;