import React from 'react'
import InputWithIcon from '../ui/inputs/InputWithIcon'
import { Lock, UserRound } from 'lucide-react'

const Login = () => {


    return (
        <div className='login-page-container'>

            <div className="centered-div">
                <span>Login</span>
                <InputWithIcon type="text" placeholder="E-mail" icon={<UserRound />} />
                <InputWithIcon type="password" placeholder="Şifrə" icon={<Lock />} />
            </div>

        </div>
    )
}

export default Login