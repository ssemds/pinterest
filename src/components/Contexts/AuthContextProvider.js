import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { API } from "../helpers/const";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const authContext = createContext();
export const useAuth = () => useContext(authContext);

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const notify = (message) =>
    toast.error(message.toString(), { theme: "dark" });

  async function handleRegister(formData) {
    setLoading(true);
    try {
      await axios.post(`${API}/accounts/register/`, formData);
      navigate("/");
    } catch (error) {
      if (error.response) {
        if (error.response.data.detail) {
          notify(error.response.data.detail);
        } else {
          for (let key in error.response.data) {
            notify(`${key}: ${error.response.data[key]}`);
          }
        }
      } else {
        notify(error);
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin(formData, email) {
    setLoading(true);
    try {
      const res = await axios.post(`${API}/accounts/login/`, formData);
      localStorage.setItem("tokens", JSON.stringify(res.data));
      localStorage.setItem("email", email);
      setCurrentUser(email);
      console.log(res);
      navigate("/");
    } catch (error) {
      if (error.response) {
        if (error.response.data.detail) {
          notify(error.response.data.detail);
        } else {
          for (let key in error.response.data) {
            notify(`${key}: ${error.response.data[key]}`);
          }
        }
      } else {
        notify(error);
      }
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem("tokens");
    localStorage.removeItem("email");
    setCurrentUser("");
    navigate("/login");
  }

  async function checkAuth() {
    setLoading(true);
    try {
      const tokens = JSON.parse(localStorage.getItem("tokens"));
      const res = await axios.post(`${API}/accounts/refresh/`, {
        refresh: tokens.refresh,
      });
      console.log(res)
      localStorage.setItem(
        "tokens",
        JSON.stringify({ access: res.data.access, refresh: res.data.refresh })
      );
      const email = localStorage.getItem("email");
      setCurrentUser(email);
    } catch (error) {
      if (error.response) {
        if (error.response.data.detail) {
          notify(error.response.data.detail);
        } else {
          for (let key in error.response.data) {
            notify(`${key}: ${error.response.data[key]}`);
          }
        }
      } else {
        notify(error);
      }
      logout();
    } finally {
      setLoading(false);
    }
  }
  const values = {
    handleRegister,
    handleLogin,
    currentUser,
    logout,
    checkAuth,
    loading,
    error,
  };
  return <authContext.Provider value={values}>{children}</authContext.Provider>;
};

export default AuthContextProvider;
