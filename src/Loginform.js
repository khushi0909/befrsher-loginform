import React from 'react'
import { useState } from 'react';
import {Formik,Form,Field,ErrorMessage} from 'formik'
import clsx from 'clsx';
import * as Yup from 'yup'
import CustomInput from './CustomInput';

const initialValues={
    phone:'',
    otp:'',
    password:'',
}

const onSubmit= values=>{
    console.log("Form Values",values)
}

const validationSchema = Yup.object({
    phone:Yup.string()
    .matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    ,  'Phone number is not valid').min(10,'number must be atleast 10 digit'),

    otp:Yup.number().typeError("Must be a number")
    .when("password",{
        is:(password)=> true,
        then:Yup.number().nullable().notRequired(),
        otherwise:Yup.number().required()
    }),
    password:Yup
    .string()
    .required('Password Required')
    .min(8, 'Password too short')
    .test(
      'isValidPass',
      'Passowrd must be 8 char (One UpperCase & One Symbol)',
      (value: any, context: any) => {
        const hasUpperCase = /[A-Z]/.test(value);
        const hasNumber = /[0-9]/.test(value);
        const hasLowerCase = /[a-z]/.test(value);
        const hasSymbole = /["!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"]/.test(value);
        let validConditions = 0;
        const numberOfMustBeValidConditions = 3;
        const conditions = [hasUpperCase, hasLowerCase, hasNumber, hasSymbole];
        conditions.forEach(condition => (condition ? validConditions++ : null));
        if (validConditions >= numberOfMustBeValidConditions) {
          return true;
        }
        return false;
      },
    ).when("otp",{
            is:(otp)=>true,
            then:Yup.string().nullable().notRequired(),
            otherwise:Yup.string().required()
        }),
})


const LoginForm = () => {
    const [activeButtonIndex, setActiveButtonIndex] = useState(0);
    const [activeButtonLogin, setActiveButtonLogin] = useState(0);

    const SignupHandler = () =>{
        setActiveButtonIndex(1) ;
         setActiveButtonLogin(0);
    }

    const LoginHandler = () => {
        setActiveButtonLogin(1) ;
        setActiveButtonIndex(0);
    }

  return (
    <div className="grid grid-cols-2 gap-[5.63rem] justify-items-center border-2 border-red-500 mt-[2.19rem]">

      <div  className=" max-w-[31.25rem] max-h-[50.625rem] ">

            <Formik
            initialValues={initialValues}
            validationSchema = {validationSchema}
            onSubmit = {onSubmit}>
            <Form  className="max-w-[31.25rem] max-h-[50.625rem]">
        <div className='flex gap-x-[1.88rem]'>       

        <div onClick={SignupHandler}
            className={clsx(
            {  "text-white bg-[#484FA2]" : activeButtonIndex===1,
             "text-black" : activeButtonIndex===0
            } ,
            ' flex justify-center items-center w-[12.5rem] h-[3.125rem] rounded-[0.3125rem]  text-[#fff] text-[1.3125rem] border-[#484FA2] border-[1px] font-semibold leading-1.31 tracking-light ]'
            )}>Sign Up</div>
        <div onClick={LoginHandler}
             className={clsx(
            {  "text-white bg-[#484FA2]" : activeButtonLogin===1,
             "text-black" : activeButtonLogin===0
            } ,
            'flex justify-center items-center w-[12.5rem] h-[3.125rem] rounded-[0.3125rem] border-[1px] border-[#484FA2]  text-[1.3125rem] font-semibold leading-1.31 tracking-lighttext-black')}>Login</div>

        </div>
        
        <div className='flex flex-col mt-[3.62rem]'>
            <CustomInput
            label=""
            name="phone"
            type="text"
            placeholder="Phone*"
          />
         
        </div>

            <div className='flex flex-col mt-[3.62rem] '>
                    <Field className="border-[1px]    py-[1.06rem] pl-[1.56rem]    max-w-[28.125rem] h-[3.125rem] border-[#8A8A8A] rounded-[0.3125rem] " type="number" name="otp" id="otp" placeholder="One Time Password (OTP) *"></Field>
                    <ErrorMessage name='otp'/>
            </div>

            <p className='flex  mt-[1.31rem] justify-center items-center max-w-[28.125rem]'>OR</p>

            <div className='flex flex-col mt-[1.31rem]'>
                    <Field className="border-[1px]    py-[1.06rem] pl-[1.56rem]    max-w-[28.125rem] h-[3.125rem] border-[#8A8A8A] rounded-[0.3125rem] " type="password" name="password" id="password" placeholder="Password*"></Field>
                    <ErrorMessage name='password'/>
            </div>

            <div className='mt-[0.75rem] text-base font-normal tracking-tight leading-4'>
            Don't have an account? <span className='text-[#484FA2] text-base font-normal tracking-tight'>Signup</span> 
            </div>

            <div className="max-w-[8rem] text-[#484FA2] text-[1rem] mt-[0.88rem] font-normal leading-4 tracking-tight">Forget password</div>

            <button type='submit' className='p-4 mt-[3.75rem] max-w-[28.125rem] w-full h-[3.13rem] rounded-[2.5rem] bg-[#494DA2] text-white text-[1.3125rem] font-semibold leading-1.31 tracking-tight' >Login</button>


                    </Form>


            </Formik>

    </div>

</div>
  )

}

export default LoginForm