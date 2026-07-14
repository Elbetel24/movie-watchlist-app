import { useState } from "react";
import { useNavigate} from "react-router-dom";
import { loginUser } from "../services/auth";
import './Auth.css'
import { validateEmail, validatePassword } from "../utils/validation.js"
function Login(){


    const navigate= useNavigate();
    const [email, setEmail]= useState("");
    const [ password, setPassword]= useState("");
    const [ error, setError]= useState("");
    const [errors, setErrors]= useState({});


    const validate = () => {
    const newErrors = {
      email: validateEmail(email),
      password: validatePassword(password),
    };
    setErrors(newErrors);
    // Valid only if every field returned an empty string
    return Object.values(newErrors).every((err) => err === '');
  };
    const handleLogin= async (e) => {
        e.preventDefault();
        if(validate()){
        try {
            const response= await loginUser( email, password);
            console.log("LOGIN SUCCESS:" , response);
            if(response.data.token){
                localStorage.setItem("token",response.data.token);
            }
            
    navigate("/Dashboard");
        }catch(err){
            const message= err.response?.data?.message || err.response?.data || err.message;
            console.log("LOGIN ERROR: ", message);
            setError(message);
        }
    };
  }

    return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-sprockets top">
          {Array.from({ length: 5 }).map((_, i) => <span key={i} />)}
        </div>

        <form className="auth-body" onSubmit={handleLogin}>
          <div className="auth-eyebrow">Movie TBR</div>
          <div className="auth-title">Reel List</div>

          <label className="auth-label" htmlFor="email">Email</label>
          <input
            id="email"
            className="auth-input"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="auth-label" htmlFor="password">Password</label>
          <input
            id="password"
            className="auth-input"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {errors && <p className="auth-error">{error}</p>}

          <button className="auth-submit" type="submit">Sign in</button>

          <p className="auth-footer">
            New here?  <button
            type="button"
            onClick={() => navigate("/Signup")}
            style={{
              background: "none",
              border: "none",
              color: "#2563eb",
              cursor: "pointer",
              textDecoration: "underline",
              padding: 0,
            }}>Create an Account?</button>
          </p>
        </form>

        <div className="auth-sprockets bottom">
          {Array.from({ length: 5 }).map((_, i) => <span key={i} />)}
        </div>
      </div>
    </div>
  );
}

export default Login;