import React, { useState } from "react";
import axios from "axios";
import InputWithIcon from "../../ui/inputs/InputWithIcon";
import FormButton from "../../ui/buttons/FormButton";
import { Lock, UserRound } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setStep, setEmail, setPassword, setToken } from '../../redux/features/authSlice';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const email = useSelector((state) => state.auth.email)
  const password = useSelector((state) => state.auth.password)

  const isActive = email.trim() && password.trim();

  const [loading, setLoading] = useState(false);
  const [wrongAuth, setWrongAuth] = useState(false);
  const [fatalError, setFatalError] = useState(null);

  const handleContinue = async () => {
    if (!isActive || loading) return;

    setWrongAuth(false);
    setFatalError(null);
    setLoading(true);

    try {
      const res = await axios.post("https://8000.jobing.az/api/auth/login", {
        email,
        password,
      });

      const token = res.data?.token ?? res.data?.data?.token;
      const user = res.data?.user ?? res.data?.data?.user;

      console.log(token);


      if (!token) throw new Error("Token not found!");

      localStorage.setItem("auth_token", token);
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;

      navigate("/dashboard");
      
    } catch (err) {
      const status = err?.response?.status;
      if (status === 401 || status === 400) {
        setWrongAuth(true);
      } else {
        setFatalError(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container centered-div">
      {wrongAuth && (
        <span className="wrong-auth">E-mail və ya şifrə yanlışdır!</span>
      )}
      {fatalError && <span className="fatal-auth">{fatalError}</span>}

      <span>Daxil ol</span>

      <InputWithIcon
        type="text"
        placeholder="E-mail"
        icon={<UserRound />}
        value={email}
        onChange={(e) => dispatch(setEmail(e.target.value))}
      />

      <InputWithIcon
        type="password"
        placeholder="Şifrə"
        icon={<Lock />}
        value={password}
        onChange={(e) => dispatch(setPassword(e.target.value))}
      />

      <button
        onClick={() => dispatch(setStep("forgotPassword"))}
        className="forgot-password"
        type="button"
      >
        Şifrəni unutmusan?
      </button>

      <FormButton
        content={loading ? "Daxil olunur..." : "Daxil ol"}
        onClick={handleContinue}
        isActive={!!isActive && !loading}
        disabled={!isActive || loading}
      />
    </div>
  );
};

export default Login;
