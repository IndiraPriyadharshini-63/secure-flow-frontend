import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Protected from "./pages/Protected";

function App() {
  const [authToken, setAuthToken] = useState(localStorage.getItem("token"));
  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuthToken(null);
  };
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link>
          {!authToken && <Link to="/login">Login</Link>}
          {!authToken && <Link to="/register">Register</Link>}
          {authToken && <Link to="/protected">Protected</Link>}
          {authToken && <button onClick={handleLogout}>Logout</button>}
        </nav>
        <Routes>
          <Route
            exact
            path="/login"
            element={<Login setAuthToken={setAuthToken} />}
          />

          <Route exact path="/register" element={<Register />} />
          <Route
            exact
            path="/protected"
            element={
              authToken ? (
                <Protected />
              ) : (
                <p>Please log in to access protected data.</p>
              )
            }
          />

          {/* <Route path="/">
            <h1>
              Welcome to <i>Secure Flow</i>
            </h1>
          </Route> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
