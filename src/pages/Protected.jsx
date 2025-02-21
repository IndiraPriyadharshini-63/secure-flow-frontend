import { useState, useEffect } from "react";
import axios from "axios";

const Protected = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProtectedData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login first");
        return;
      }

      try {
        const response = await axios.get("http://localhost:3000/protected", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
        setError(null);
        // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError("Access denied or invalid token");
      }
    };

    fetchProtectedData();
  }, []);
  return (
    <div>
      <h2>Protected Data</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {data ? (
        <div>
          <p>{data.message}</p>
          <p>Welcome, {data.user}!</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Protected;
