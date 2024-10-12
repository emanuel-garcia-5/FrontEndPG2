import axios from "./axios";
import React from "react";

const API = import.meta.env.VITE_HOST_API

export const registerRequest = user => axios.post(`${API}/auth`, user)
export const loginrequest = user => axios.post(`${API}/login`, user)
export const verifyTokenRequest = () => axios.get('/login/verify')