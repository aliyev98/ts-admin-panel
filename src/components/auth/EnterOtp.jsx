import React, { useRef, useState } from 'react'
import FormButton from '../../ui/buttons/FormButton';
import { useDispatch } from 'react-redux';
import { setStep } from '../../redux/features/authSlice';

const EnterOtp = () => {

  const inputRefs = [useRef(), useRef(), useRef(), useRef()];
  const [otp, setOtp] = useState(["", "", "", ""]);

  const dispatch = useDispatch()

  const handleChange = (index, e) => {
    const value = e.target.value;

    if (/^\d$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (index < inputRefs.length - 1) {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newOtp = [...otp];

      if (otp[index] !== "") {
        newOtp[index] = "";
        setOtp(newOtp);

        if (index > 0) {
          setTimeout(() => {
            inputRefs[index - 1].current.focus();
          }, 0);
        }
      } else if (index > 0) {
        // Eğer zaten boşsa, direkt bir önceki input'a odakla ve onu da temizle
        newOtp[index - 1] = "";
        setOtp(newOtp);
        setTimeout(() => {
          inputRefs[index - 1].current.focus();
        }, 0);
      }
    }
  };

  const isOtpComplete = otp.every(num => num !== "");

  const handleContinue = () => {
    dispatch(setStep('resetPassword'));
  }



  return (
    <div className='enter-otp-container centered-div'>

      <span>E - mail adresinizə göndərilən <br /> OTP kodunu daxil edin</span>

      <div className="code-inputs">

        {otp.map((digit, index) => (
          <div className="code-input" key={index}>
            <input
              type="text"
              maxLength={1}
              value={digit}
              ref={inputRefs[index]}
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
            />
          </div>
        ))}



      </div>

      <FormButton content="Təstiqlə" onClick={handleContinue} isActive={true} />

    </div>
  )
}

export default EnterOtp