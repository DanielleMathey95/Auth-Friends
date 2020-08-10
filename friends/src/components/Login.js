import React, {useState} from 'react';
import {axiosWithAuth} from '../utils/axiosWithAuth';

const LoginForm = (props) => {
  console.log("props.history", props.history);

  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const handleChange = (event) => {
    setCredentials({...credentials, [event.target.name] : event.target.value})
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(credentials);
      axiosWithAuth()
        .post('api/login', credentials)
        .then(response => {
          console.log(response.data.payload);
          window.localStorage.setItem("token", response.data.payload);
          props.history.push('/protected');
        })
        .catch(error => console.log({error: error.message}))
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <label>
        Username
          <input
            name="username"
            value={credentials.username}
            onChange={handleChange}
          />
      </label>
      <label>
        Password
          <input
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />
      </label>
      <button>Log In</button>
    </form>
  )
}

export default LoginForm;