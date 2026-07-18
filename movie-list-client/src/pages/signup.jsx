import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpUser } from "../services/auth";
import "./Auth.css"
import { validateEmail, validatePassword } from "../utils/validation.js"

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {
      email: validateEmail(email),
      password: validatePassword(password),
    };
    setErrors(newErrors);
    // Valid only if every field returned an empty string
    return Object.values(newErrors).every((err) => err === '');
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      setError("");

      try {
        const response = await signUpUser(name, email, password);

        console.log("SIGN UP SUCCESS:", response);

        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
        }

        navigate("/dashboard");
      } catch (err) {
        const message =
          err.response?.data?.message ||
          err.response?.data ||
          err.message;

        console.log("SIGN UP ERROR:", message);
        setError(message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-sprockets top">
          {Array.from({ length: 5 }).map((_, i) => <span key={i} />)}
        </div>
        <form className="auth-body" onSubmit={handleSignup}>
          <div className="auth-eyebrow">Movie TBR</div>
          <div className="auth-title"> Reel List</div>

          <label className="auth-label" htmlFor="name">Name</label>
          <input
            id="name"
            className="auth-input"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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
          {errors.email && <p className="auth-error">{errors.email}</p>}

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
          {errors.password && <p className="auth-error">{errors.password}</p>}

          {error && <p className="auth-error">{error}</p>}

          <button className="auth-submit" type="submit" disabled={loading}>
            {loading ? "Signing up..." : "Sign in"}
          </button>

          <p className="auth-footer">
            Already have an account?
            <button
              type="button"
              onClick={() => navigate("/")}
              style={{
                background: "none",
                border: "none",
                color: "#2563eb",
                cursor: "pointer",
                textDecoration: "underline",
                padding: 0,
              }}>Log in</button>
          </p>
        </form>
        <div className="auth-sprockets bottom">
          {Array.from({ length: 5 }).map((_, i) => <span key={i} />)}
        </div>
      </div>
    </div>
  )
}

export default Signup;