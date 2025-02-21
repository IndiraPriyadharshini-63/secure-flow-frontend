import { useState, useEffect } from "react";
import axios from "axios";
const Protected = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchProtectedData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first");
        return;
      }

      try {
        const response = await axios.get("http://localhost:3000/protected", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
      } catch (err) {
        alert("Access denied or invalid token", err);
      }
    };

    fetchProtectedData();
  }, []);
  return (
    <div>
      <h2>Protected Data</h2>
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
