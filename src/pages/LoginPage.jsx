import React from 'react'
import Login from '../components/Auth/Login'
import EnterOtp from '../components/Auth/EnterOtp'
import { useSelector } from 'react-redux'
import ForgotPassword from '../components/auth/ForgotPassword'
import ResetPassword from '../components/auth/ResetPassword'

const LoginPage = () => {

    const step = useSelector(state => state.auth.step)

    return (
        <div className='login-page-container'>

            {step === "login" && <Login />}
            {step === "forgotPassword" && <ForgotPassword />}
            {step === "enterOtp" && <EnterOtp />}
            {step === "resetPassword" && <ResetPassword />}


        </div>
    )
}

export default LoginPage