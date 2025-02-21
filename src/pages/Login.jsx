import axios from "axios";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
const Login = ({ setAuthToken }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/login", {
        userName,
        password,
      });
      const token = response.data.token;
      setAuthToken(token);
      localStorage.setItem("token", token);
      alert("Logged in successfully");
    } catch (error) {
      alert("Login failed", error);
    }
  };
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
