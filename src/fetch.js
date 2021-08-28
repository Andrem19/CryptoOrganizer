import {useState} from "react"
import axios from "axios"



export const Fetch = () => {
    const [data, setData] = useState({})
    const [coins, setCoins] = useState({})
    const [appState, setAppState] = useState({})
    const [postApi, setPostApi] = useState({})
    const [myAccount, setMyAccount] = useState({})
    const [myAccFiltred, setMyAccFiltred] = useState({})
    const [users, setUsers] = useState({})
    const [myUser, setMyUser] = useState({})
    const [name, setName] = useState('')
    const [myAvatar, setMyAvatar] = useState("")

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
    const getUsers = async () => {
      await axios.get('http://localhost:5000/user/')
           .then(res => {  
               const post = res.data           
                   setUsers(post)  
           } )                
           } 
    const getAvatar = async () => {
        await axios.get('http://localhost:5000/image/')
        .then(res => {  
            const post = res.data           
                setMyAvatar(post)
    })
}
      return {data, getPosition, getCrypto, coins, appState, setAppState, refreshPosition, postApi, setPostApi, getApi, setMyAccount, myAccount, myAccFiltred, setMyAccFiltred, users, getUsers, myUser, setMyUser, name, setName, getAvatar, myAvatar}
        }