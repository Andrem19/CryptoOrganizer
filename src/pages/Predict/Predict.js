import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios'

const Predict = () => {

const handleClick = async() => {
    await axios.get(`http://localhost:5000/predict/`)
        .then(res => console.log(res.data))
        .catch((err) => {
            console.log(err)
        });
}

    return (
        <div>
            <button className="btn btn-success" onClick={handleClick}>SEND</button>
        </div>
    );
}

export default Predict;
