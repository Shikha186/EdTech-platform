import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../services/operations/authAPI";
import Spinner from "../components/common/Spinner";

const UpdatePassword = () => {
  const { token } = useParams(); // Gets the token from the route parameter
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const { newPassword, confirmPassword } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const response = await resetPassword(token, newPassword, confirmPassword);
      setMessage(response.message || "Password updated successfully!");
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md w-full p-6 border rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Choose New Password</h2>
        
        <form onSubmit={handleOnSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            name="newPassword"
            value={newPassword}
            onChange={handleOnChange}
            placeholder="New Password"
            required
            className="p-2 border rounded"
          />
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleOnChange}
            placeholder="Confirm New Password"
            required
            className="p-2 border rounded"
          />
          
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white p-2 rounded disabled:bg-gray-400"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        {message && <p className="text-green-600 mt-4">{message} Redirecting...</p>}
        {error && <p className="text-red-600 mt-4">{error}</p>}

        <div className="mt-4">
          <Link to="/login" className="text-blue-500 hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;