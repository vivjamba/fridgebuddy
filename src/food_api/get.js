// const axios = require('axios');
import axios from 'axios';

/*getAllIds (foodItem : String) => id : Number
*/
export async function getAllIds(foodItem) {

    try{
        //returns an array
        console.log('searching for ',foodItem);
        const config = {
            headers :{
             "Access-Control-Allow-Origin": "*"
            }
          };
        const response = await axios.get(`https://shelf-life-api.herokuapp.com/search?q=${foodItem}`,config);
        //Add case where response is an empty array aka no results found
        // console.log(response.data);
        console.log('response  ', response.data)
        return response.data;
        // return await response.json()[0]["id"];
    }catch(error) {
        console.log('error searching', error) 
        return [];
    }
    
}

// export async function createUser(data) {
//     const response = await fetch(`/api/user`, {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({user: data})
//       })
//     return await response.json();
// }