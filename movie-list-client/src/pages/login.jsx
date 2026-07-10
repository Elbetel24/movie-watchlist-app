import { useState } from "react";
import { useNavigate} from "react-router-dom";
import { loginUser } from "../services/auth";

function Login(){


    const navigate= useNavigate();
    const [email, setEmail]= useState("");
    const [ password, setPassword]= useState("");
    const [ error, setError]= useState("");

    const handleLogin= async (e) => {
        e.preventDefault();
        try {
            const response= await loginUser( email, password);
            console.log("LOGIN SUCCESS:" , response);
            if(response.data.token){
                localStorage.setItem("token",response.data.token);
            }
            

        }catch(err){
            const message= err.response?.data?.message || err.response?.data || err.message;
            console.log("LOGIN ERROR: ", message);
            setError(message);
        }
    };


    return  (
        < div 
        style={{
            display: "flex",
            justifyContent: "center",
            alignItems : "center",
            height: "100vh",
            backgroundColor: "beige",
         }}
        >
        <form 
        onSubmit={handleLogin}
        style={{
            background: "cbeige",
            padding: "30px",
            borderRadius: "35px",
            borderBlockColor: "black",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
        >
            <h1 style={{
                textAlign: "center",
                font: "Cambria",
                color:"black",
              
            }}>Login</h1>
         <div style={{ marginBottom: "15px" }}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
        <h3>Don't have an account?<button
            type="button"
            onClick={() => navigate("/Signup")}
            style={{
              background: "none",
              border: "none",
              color: "#2563eb",
              cursor: "pointer",
              textDecoration: "underline",
              padding: 0,
            }}
          >
            Sign up
          </button></h3>   

        </form>
        </div>
    );
}

export default Login;