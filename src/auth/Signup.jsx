import React, { useState, useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { signup, login } = useContext(AppContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLogin, setIsLogin] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      let success;
      if (isLogin) {
        success = await login(email, password);
      } else {
        success = await signup(email, password);
      }

      if (success) {
        navigate("/"); // Redirect to home after successful auth
      }
    } catch (err) {
      console.error("Auth error:", err);
      setError(
        isLogin
          ? "Failed to log in. Please check your credentials."
          : "Failed to create account. Please try again."
      );
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto mt-25 text-gray-800">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {isLogin ? "Login" : "Sign Up"}
      </h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-6 rounded-2xl shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff]"
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-xl bg-[#e0e0e0] shadow-inner outline-none"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-xl bg-[#e0e0e0] shadow-inner outline-none"
          required
          minLength={6}
        />
        {!isLogin && (
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 rounded-xl bg-[#e0e0e0] shadow-inner outline-none"
            required
            minLength={6}
          />
        )}
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl shadow-md transition"
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>
      </form>
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      <div className="text-center mt-4">
        <button
          onClick={() => {
            setIsLogin(!isLogin);
            setError(null);
          }}
          className="text-orange-500 hover:text-orange-600 focus:outline-none"
        >
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
};

export default Signup;
