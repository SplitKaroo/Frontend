import axios from 'axios';


export const getUserInfo = (headers)=>{
    axios.get('http://localhost:3030/login', headers)
    .then(response=>{
        console.log(response.data);
    })    
}