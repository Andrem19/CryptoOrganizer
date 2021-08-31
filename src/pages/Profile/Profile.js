import React, {useState, useContext, useEffect} from 'react';
import './profile.css'
import logo from './avatar.jpg'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'
import Update from './update'
import Chat from './Chat'


const Profile = () => {

    const auth = useContext(AuthContext)
    const userId = auth.userId

    const [uName, setUName] = useState('')
    const [file, setFile] = useState("")
    const users = auth.users
    const myAvatar = auth.myAvatar

    const setItem = (event) => {
        setFile(event.target.files[0])
    }

    const handleSubmit = async(e) => {
        e.preventDefault()

        const formData = new FormData();

        formData.append("userId", userId)
        formData.append("articleImage", file)

      
        const saveImage = async () => {
            await axios.post('http://localhost:5000/image/add', formData)
                 .then(res => console.log(res.data))
                 .catch((err) => { console.log(err)});
            }   
              await saveImage() 
              setFile("")
    }
    useEffect(async() => {
        auth.getUsers()
        setUName(auth.userName)   
        console.log("userName: ", uName)   
        console.log(filtUser)  
    }, []);

    useEffect(async() => {
        auth.getAvatar()
        console.log("filtAvatar: ", filtAvatar) 
    }, []);

    const filtAvatar = Object.values(myAvatar).filter(ava => ava.userId === userId)
    const filtUser = Object.values(users).filter(us => us._id === userId)
    if (filtAvatar.length > 0) {
    return(
        <div className="container">
            
            {filtAvatar.map(ava => { return(
                
                <div className="avatar_container" key={ava._id}> 
                <Update 
                oldAvatarId={ava._id} 
                oldAvatarPath={ava.articleImage}
                />
                
                <img className="avatar" src={`/uploads/${ava.articleImage}`} alt="..." />
                </div>
                )})}
                {filtUser.map(usr => { return(
                <div className="username"><h2>User: {usr.name} </h2></div> )})}
        <div className="chat"><Chat /></div>
        </div>
    )
    } else {
    return (
        <div className="container">
            <div className="avatar_container"><img className="avatar" src={logo} alt={logo}/></div>
           
            {filtUser.map(usr => { return(
                <div className="username"><h2>User: {usr.name} </h2></div> )})}
            <div className="input_file">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div><input filename="articleImage" type="file" onChange={setItem} /></div>
            
            <div className="button"><button type="submit">--SEND FILE--</button></div>
            </form>
            </div>
        </div>
    )
}
}

export default Profile;
