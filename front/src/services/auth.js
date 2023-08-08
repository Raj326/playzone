import axios from "axios";

//TODO - Recuperar a url do arquivo .env
const baseUrl = "http://127.0.0.1:8000/login/";

export const getToken = async (e, email, password) => {
  e.preventDefault();
  const user = { email, password };
  try {
    const response = await axios.post(baseUrl, user);
    localStorage.setItem("user", response.data.token);
  } catch (e) {
    console.log(e);
  }
};
