import axios from "axios";
const BASE_URL_LOGIN =
  "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
const BASE_URL_REGISTER =
  "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
const API_KEY = "AIzaSyAKpyiIeUXITdvknew7Gd5qPXoNuhohtnA";

export async function login(email, password) {
  const response = await axios.post(
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAKpyiIeUXITdvknew7Gd5qPXoNuhohtnA",
    {
      email: email,
      password: password,
      returnSecureToken: true,
    }
  );
  const token = response.data.idToken;
  return token;
}

export async function registration(email, password) {
  const response = await axios.post(
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAKpyiIeUXITdvknew7Gd5qPXoNuhohtnA",
    {
      email: email,
      password: password,
      returnSecureToken: true,
    }
  );
  const token = response.data.idToken;
  return token;
}

export function logOut() {}
