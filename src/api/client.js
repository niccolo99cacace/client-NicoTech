import axios from "axios";

//withCredentials:true serve per permettere il passaggio dei cookie (in particolare il nostro cookie contentente
// il session id) dal back-end in node.js al nostro front-end React
const client = axios.create({withCredentials: true, baseURL: "http://localhost:8000/api" });

export default client;
