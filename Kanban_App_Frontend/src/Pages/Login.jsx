import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";

const Login = () => {
  const { auth, Login, Logout } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    userName: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setLoginData({ ...loginData, [name]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setLoading(true)
      const res = await axios({
        method: "post",
        url: "https://kanban-app-hr2u.onrender.com/user/login",
        data: loginData,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.data?.token) {
        Login(res.data.token)
        alert(`${res.data.msg}`)
        navigate("/notes")
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setError(true)
      alert(`Error occured while login`);
    }
  }

  if(loading){
    return <h1>Loading...</h1>
  }

  
  if(error){
    return <h1>Error...</h1>
  }

  return (
    <div id="registerPage">
      <form onSubmit={handleSubmit} id="registerForm">
        <h1>Login Form</h1>
        <div className="registerFormInput">
          <label htmlFor="">User Name</label>
          <br />
          <input
            type="text"
            placeholder="Enter UserName"
            name="userName"
            value={loginData.userName}
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
            value={loginData.password}
            onChange={handleChange}
          />
        </div>

        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;
