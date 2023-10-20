import axios from 'axios'
import {AuthModel, UserModel} from './_models'

const API_URL = process.env.REACT_APP_API_URL

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/verify_token`
export const LOGIN_URL = `${API_URL}/usr/login`
export const REGISTER_URL = `${API_URL}/register`
export const REQUEST_PASSWORD_URL = `${API_URL}/forgot_password`

// Server should return AuthModel
export function login(id: number, usuario: string, password: string, rol: string) {
  return axios.post<any>(LOGIN_URL, {
    id,
    usuario,
    password,
    rol,
  }).then(function (response){
    console.log(response.data);
    console.log(response.data._token);
    console.log("No hay error")
    return response.data;
  }).catch(function (error){
    console.log('Error: ' + error);
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message); // Lanzar el mensaje de error del servidor
    } else {
      throw new Error('Error en la solicitud de inicio de sesión'); // Mensaje de error genérico
    }
  });
}

// Server should return AuthModel
export function register(
  email: string,
  firstname: string,
  lastname: string,
  password: string,
  password_confirmation: string
) {
  return axios.post(REGISTER_URL, {
    email,
    first_name: firstname,
    last_name: lastname,
    password,
    password_confirmation,
  })
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  return axios.post<{result: boolean}>(REQUEST_PASSWORD_URL, {
    email,
  })
}

export function getUserByToken(token: string) {
  return axios.post<UserModel>(GET_USER_BY_ACCESSTOKEN_URL, {
    api_token: token,
  })
}
