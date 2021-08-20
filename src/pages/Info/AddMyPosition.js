import React, {useState, useContext, useEffect} from 'react'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import ListFutures from './ListFutures';
const Binance = require('node-binance-api');

const storageName = 'apiKeys'

const AddMyPosition = () => {
    const auth = useContext(AuthContext)
    // Const save
    const [apiKey, setApiKey] = useState('')
    const [secretKey, setSecretKey] = useState('')

    //Handle Submit
    const handleSubmit = async () => {
       const newApi = {
           userId: auth.userId,
           apiKey: apiKey,
           apiSecret: secretKey
       } 
       const saveApi = async () => {
        await axios.post('http://localhost:5000/apiKeys/add', {...newApi})
             .then(res => console.log(res.data));
        }   
          await saveApi() 
     }
    
    return (
        <div>
            <p>To continue add your Binance API</p>
            <form onSubmit={handleSubmit} autoComplete="on">
               <div>
                   <div>Api key</div>
               <input 
               value={apiKey} 
               onChange={event => setApiKey(event.target.value)}
               />
               </div>
               <div>
                   <div>Api secret</div>
               <input 
               value={secretKey} 
               onChange={event => setSecretKey(event.target.value)}
               />
               </div>
               <button class="btn waves-effect #1e88e5 blue darken-1" type="submit" name="action">ADD
    <i class="material-icons right">add</i>
                </button>             
            </form>
        </div>
    );
}

export default AddMyPosition;
