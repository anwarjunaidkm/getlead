"use client";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://interview.enfono.com",
});

export default instance;
