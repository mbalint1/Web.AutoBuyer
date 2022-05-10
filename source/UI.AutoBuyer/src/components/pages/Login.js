import React from 'react'
import { Link } from 'react-router-dom'
import '../../App.css'
import axios from "axios";
import { cacheAdapterEnhancer } from "axios-extensions";

import { useHistory } from "react-router-dom";

export default function LoginPage() {

  let history = useHistory();

  const handleSubmit = event => {
    event.preventDefault();
    const tokenEndpoint = "https://www.google.com/";
    const postBody = {
      username: "",
      password: ""
    };
    fetchApi("GET", tokenEndpoint, postBody, false)
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
                    <input type="text" name="first_name" required />
                </p>
                <p>
                    <label>Password</label>
                    <br/>
                    <input type="password" name="password" required />
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


