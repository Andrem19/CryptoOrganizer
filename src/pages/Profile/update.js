import React, {useState, useContext} from 'react';
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'

const Update = ({oldAvatarId, oldAvatatarPath}) => {
    const auth = useContext(AuthContext)
    const userId = auth.userId
    const _id = oldAvatarId

    const [updFile, setUpdFile] = useState("")
    
    const onChange = (event) => {
        setUpdFile(event.target.files[0])
        
    }
    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData();

        formData.append("userId", userId);
        formData.append("articleImage", updFile);

    const updateImage = async () => {
        await axios.put(`http://localhost:5000/image/update/${_id}`, formData)
        .then(res => console.log(res.data))
        .catch((err) => {
            console.log(err)
        });
    }
    updateImage()
    setUpdFile("")
    }
   
    return (
        <div>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div>
                    <input filename="articleImage" type="file" onChange={onChange} />
                </div>
                <div><button type="submit">update</button></div>
            </form>
        </div>
    );
}

export default Update;
