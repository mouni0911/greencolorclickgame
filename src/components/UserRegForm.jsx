import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserRegForm.css";

const UserRegForm = ({ onGameLevelChange, initialGameLevel }) => {
  const navigate = useNavigate();
  const [gamelevel, setGameLevel] = useState(initialGameLevel);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    difficulty: "easy",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    mobile: "",
  });
  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };
  const validateMobile = (mobile) => {
    return /^[0-9]{10}$/.test(mobile);
  };
  const isFormValid = () => {
    const { name, email, mobile } = formData;
    const newErrors = {};

    if (name.trim() === "") {
      newErrors.name = "Name is required";
    }

    if (email.trim() === "") {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Invalid email address";
    }

    if (mobile.trim() === "") {
      newErrors.mobile = "Mobile number is required";
    } else if (!validateMobile(mobile)) {
      newErrors.mobile = "Invalid mobile number (10 digits)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setGameLevel({ name, value });
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };
  const handleGameLevel = (e) => {
    const selectedGameLevel = e.target.value;
    setGameLevel(selectedGameLevel);
    onGameLevelChange(selectedGameLevel);
    setErrors("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      navigate(`/greencolorbox/${formData.difficulty}`);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1>User Registration</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <lable htmlFor="name" style={{ fontWeigth: "5px" }}>
              Name:
            </lable>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <p className="error">{errors.name}</p>
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              pattern="/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/"
              value={formData.email}
              onChange={handleInputChange}
            />
            <p className="error">{errors.email}</p>
          </div>
          <div>
            <label htmlFor="mobile">Mobile Number:</label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              pattern="[0-9]{10}"
              value={formData.mobile}
              onChange={handleInputChange}
              required
            />
            <p className="error">{errors.mobile}</p>
          </div>
          <div>
            <label htmlFor="difficutly">Difficulty Level:</label>
            <select
              id="difficulty"
              name="difficulty"
              value={gamelevel}
              onChange={handleGameLevel}
              required
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default UserRegForm;
