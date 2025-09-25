import React, { useState } from 'react';
import axios from 'axios';
import InputWithIcon from '../../ui/inputs/InputWithIcon';
import { UserRound } from 'lucide-react';
import FormButton from '../../ui/buttons/FormButton';
import { useDispatch, useSelector } from 'react-redux';
import { setStep, setEmail, setPassword, setToken } from '../../redux/features/authSlice';

const ForgotPassword = () => {
    
    const dispatch = useDispatch();
    const email = useSelector(state => state.auth.email)
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState(null);       // bilgilendirme
    const [errMsg, setErrMsg] = useState(null); // hata mesajı (422/429/500 vs.)
    const isActive = email.trim().length > 0;


    const handleContinue = async () => {
        if (!isActive || loading) return;

        setMsg(null);
        setErrMsg(null);
        setLoading(true);

        try {

            const res = await axios.post(
                'https://8000.jobing.az/api/auth/send-otp',
                { email },
                { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } }
            );

            setMsg("OTP kodu göndərildi");

            dispatch(setStep('enterOtp'));

        }
        catch (err) {
            const status = err?.response?.status;
            const data = err?.response?.data;

            if (status === 422) {
                const detail = data?.errors
                    ? Object.values(data.errors).flat().join(' ')
                    : (data?.message || 'Doğrulama hatası.');
                setErrMsg(detail);
            } else if (status === 404) {
                setErrMsg('Bu e-mail adresi tapılmadı!');
            } else if (status === 429) {
                setErrMsg('Ard-arda çox sınadınız. Daha sonra təkrar sınayın!');
            } else {
                setErrMsg('Bir xəta oldu. Daha sonra təkrar sınayın!');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="forgot-password-container centered-div">
            <span>Şifrəni yenilə</span>

            {msg && <div className="info-banner">dsdsd</div>}
            {errMsg && <div className="error-banner">dsdsd</div>}

            <InputWithIcon
                type="text"
                placeholder="E-mail"
                icon={<UserRound />}
                value={email}
                onChange={(e) => dispatch(setEmail(e.target.value))}
            />

            <FormButton
                content={loading ? 'Göndərilir...' : 'Kodu göndər'}
                onClick={handleContinue}
                isActive={isActive && !loading}
                disabled={!isActive || loading}
            />
        </div>
    );
};

export default ForgotPassword;
