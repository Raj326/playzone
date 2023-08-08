import axios from 'axios'

export const ApiCep = axios.create({
    baseURL: "https://viacep.com.br/ws/"
})
