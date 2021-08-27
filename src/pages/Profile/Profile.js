import React, {useState, useContext} from 'react';
import './profile.css'
import logo from './avatar.jpg'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'



const Profile = () => {
    const auth = useContext(AuthContext)

    const [file, setFile] = useState()

    const setItem = (event) => {
        setFile(event.target.value)
        console.log(event.target.value)
    }
    const handleSubmit = async() => {
        const newImage = {
            userId: auth.userId,
            img: file
        }
        const saveImage = async () => {
            await axios.post('http://localhost:5000/image/add', newImage)
                 .then(res => console.log(res.data));
            }   
              await saveImage() 
    }


    return (
        <div className="container">
     
            <div className="avatar_container"><img className="avatar" src={logo} alt={logo}/></div>
            <div className="username"><h2>User:</h2></div>
            <form onSubmit={handleSubmit}>
            <div><input value={file} type="file" onChange={setItem} /></div>
            
            <div className="button"><button type="submit">SEND FILE</button></div>
            </form>
        </div>
    );
}

export default Profile;
