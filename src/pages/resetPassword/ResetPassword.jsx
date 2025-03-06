import axios from "axios";
import { useState } from "react";
// import "./style.css";
import { baseAssoUrl } from "../../lib";
const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    //   const user
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await axios.patch(`${baseAssoUrl}/resetPassword`, {
        email,
        password,
      });
      console.log(response);
      if (response.status === 200) {
        setMessage("Password updated successfully");
      } else {
        setMessage("Error updating password");
      }
    } catch {
      setMessage("Error updating password");
    }
  };

  return (
    <div className="forgot-password">
      <h2>Reset Password</h2>
      <form className="forgot-password-form" onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;
