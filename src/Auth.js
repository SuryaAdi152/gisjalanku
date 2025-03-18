import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault(); 

    // Simpan status login ke localStorage
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("user", JSON.stringify({ name: "User", email }));

    // Arahkan ke halaman Home setelah login
    navigate("/home");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-left">
          <img src="/auth.jpg" alt="Auth Illustration" />
        </div>

        <div className="auth-right">
          <div className="auth-header">
            <h2>{isLogin ? "Sign In" : "Create an Account"}</h2>
            <p>{isLogin ? "Welcome back! Please login to your account." : "Join us today by creating an account!"}</p>
          </div>

          <form className="auth-form" onSubmit={handleLogin}>
            {!isLogin && (
              <div className="form-group">
                <label>Name</label>
                <input type="text" placeholder="Enter your name" required />
              </div>
            )}

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button className="auth-button" type="submit">
              {isLogin ? "Sign In" : "Sign Up"}
            </button>
          </form>

          <div className="auth-toggle">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <span onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? " Sign Up" : " Sign In"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
