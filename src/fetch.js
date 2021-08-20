import {useState} from "react"
import axios from "axios"

export const Fetch = () => {
    const [data, setData] = useState({})
    const [coins, setCoins] = useState({})
    const [appState, setAppState] = useState({})
    const [postApi, setPostApi] = useState({})
    

    const getPosition = async () => {
    await axios.get('http://localhost:5000/position/')
         .then(res => {  
             const post = res.data           
                 setData(post)  
         } )                
         } 
    const getCrypto = async () => {
        await axios.get('https://api.coinpaprika.com/v1/tickers')
        .then(res => {  
            const post = res.data           
              setCoins(post) 
                console.log(res.status) 
    })
}
    const refreshPosition = async () => {
    await axios.get('http://localhost:5000/position/')
         .then(res => {  
             const post = res.data           
                 setAppState(post)  
         } )
      }
    const getApi = async () => {
       await axios.get('http://localhost:5000/apikeys/')
        .then(res => {  
             const post = res.data           
                 setPostApi(post)  
         } )
    }
      return {data, getPosition, getCrypto, coins, appState, setAppState, refreshPosition, postApi, setPostApi, getApi }
        }