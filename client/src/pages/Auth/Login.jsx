import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import styles from "./Login.module.css";
import login from "../../assets/login.png";
import { Input, Button, message } from "antd";
import AuthServices from "../../services/authServices";
import { getErrorMessage } from "../../util/GetError";
// import { set } from "mongoose";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async() => {
    console.log("Login");
    try{
     setLoading(true);
     let data ={
      username,
      password
     }
     console.log("data",data);
     const response = await AuthServices.loginUser(data);
     console.log("response", response.data);
     localStorage.setItem('toDoAppUser',JSON.stringify(response.data));
     message.success("Logged In Successfully!");
     navigate('/to-do-list');
     setLoading(false);
    }catch(err){
     console.log(err);
     message.error(getErrorMessage(err));
     setLoading(false);
    }
  };

  return (
    <div className={styles.overall}>
      <div className={styles.login__card}>
        <img src={login} alt=".." />
        <h2>Login</h2>
        <div className={styles.input__wrapper}>
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className={styles.input__wrapper}>
          <Input.Password
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className={styles.input__info}>
          New User? <Link to="/register">Register</Link>
        </div>

        <Button
          type="primary"
          size="large"
          disabled={!username || !password}
          onClick={handleSubmit}
          loading={loading}
        >
          Login
        </Button>
      </div>
    </div>
  );
}

export default Login;
