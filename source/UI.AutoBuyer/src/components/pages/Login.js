import React , { useState } from "react";
import { Link } from 'react-router-dom'
import '../../App.css'
import axios from "axios";
import { cacheAdapterEnhancer } from "axios-extensions";
import { useHistory } from "react-router-dom";

export default function LoginPage() {
  const [values, setValues] = useState({
    username: "",
    password: ""
  });
  const history = useHistory();
  const handleInputChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleSubmit = event => {
    event.preventDefault();
    const tokenEndpoint = "https://autobuyer-api.azurewebsites.net/auth/token/";
    const postBody = {
      username: values.username.toLowerCase(),
      password: values.password,
      appname: "Desktop.AutoBuyer"
    };
    fetchApi("POST", tokenEndpoint, postBody, false)
      .then(response => {
        if (response.status === 200) {

          // do something
          history.push("/main")
        } else {

          // do something
          history.push("/")
        }
      })
      .catch(error => {

          // do something
          history.push("/")
      });
  };

    return (
        <div className="text-center m-5-auto">
            <h2>Sign in using your desktop autobuyer credentials</h2>
            <form id="login" onSubmit={handleSubmit}>
                <p>
                    <label>Username</label><br/>
                    <br/>
                    <input type="username" name="username" required onChange={handleInputChange("username")} />
                </p>
                <p>
                    <label>Password</label>
                    <br/>
                    <input type="password" name="password" required onChange={handleInputChange("password")} />
                </p>
                <p>
                    <button id="sub_btn" type="submit">Login</button>
                </p>
            </form>
            <footer>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
    )
}

    function fetchApi(
    method,
    url,
    data = {},
    useCache = true,
    accessToken = sessionStorage.getItem("accessToken")
      ? `Bearer ${sessionStorage.getItem("accessToken")}`
      : null
  ) {
    return new Promise((resolve, reject) => {
      const config = {
        method: method,
        url: url,
        data: data,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
          "Access-Control-Allow-Origin": "*",
          Authorization: accessToken
        },
        useCache: useCache
      };
      http(config)
        .then(response => {
          if (response.status === 200) {
            resolve(response);
          } else {
            reject(response);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  const http = axios.create({
    adapter: cacheAdapterEnhancer(axios.defaults.adapter, {
      enabledByDefault: true,
      cacheFlag: "useCache"
    })
  });


