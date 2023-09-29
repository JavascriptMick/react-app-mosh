import axios, {CanceledError} from 'axios';

export default axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    // headers: {'api-key': 'xxxxxx'}
})

export {CanceledError}

//use....
//import apiClient, { CanceledError } from "../services/api-client";