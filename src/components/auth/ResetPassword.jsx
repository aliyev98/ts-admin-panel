import React from 'react'
import { setStep } from '../../redux/features/authSlice'
import InputWithIcon from '../../ui/inputs/InputWithIcon'
import InputWithLabel from '../../ui/inputs/InputWithLabel'
import { Lock } from 'lucide-react'
import FormButton from '../../ui/buttons/FormButton'

const ResetPassword = () => {
    return (
        <div className='reset-password-container centered-div'>

            <span className='title'>Şifrəni yenilə</span>

            <InputWithIcon
                type="password"
                placeholder="Yeni şifrə"
                icon={<Lock />}
            />

            <InputWithIcon
                type="password"
                placeholder="Yeni şifrə (təkrar)"
                icon={<Lock />}
            />

            <FormButton content="Təstiqlə" />

        </div>
    )
}

export default ResetPassword