import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export const getUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = {
        'firstName' : Cookies.get("firstName"),
        'lastName' : Cookies.get("lastName"),
        'userId' : Cookies.get("userId"),
        'username' : Cookies.get("username")
    };
    //localStorage.setItem("userId", Cookies.get("userId"));
    //const userData = JSON.parse(localStorage.getItem("userdata"));
    setUser(userData);
  }, []);

  return { user };
};
