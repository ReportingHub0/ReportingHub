import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../Features/UserSlice";
import React from 'react';
const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logout());
    dispatch(logout())
    navigate("/");
  }, [dispatch, navigate]);

  return <div></div>;
};

export default Logout;
