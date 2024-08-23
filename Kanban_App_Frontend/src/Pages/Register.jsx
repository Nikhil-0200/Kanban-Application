import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [register, setRegister] = useState({
    userName: "",
    password: "",
    role: "user",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setRegister({ ...register, [name]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const res = await axios({
        method: "post",
        url: "https://kanban-app-hr2u.onrender.com/user/register",
        data: register,
        headers: {
          "Content-Type": "application/json",
        },
      });

      alert(`User registered successfully`);
      navigate("/login")
    } catch (error) {
      alert(`Error while registering user`);
    }
  }

  return (
    <div id="registerPage">
      <form onSubmit={handleSubmit} id="registerForm">
        <h1>Register Form</h1>
        <div className="registerFormInput">
          <label htmlFor="">User Name</label>
          <br />
          <input
            type="text"
            placeholder="Enter UserName"
            name="userName"
            value={register.userName}
            onChange={handleChange}
          />
        </div>

        <div className="registerFormInput">
          <label htmlFor="">Password</label>
          <br />
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            value={register.password}
            onChange={handleChange}
          />
        </div>

        <div className="registerFormInput">
          <label htmlFor="">Role</label>
          <br />
          <input
            type="text"
            placeholder="Enter Role"
            name="role"
            value={register.role}
            onChange={handleChange}
          />
        </div>

        <input type="submit" value="Register" />
      </form>
    </div>
  );
};

export default Register;
