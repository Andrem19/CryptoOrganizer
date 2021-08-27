import React, {useState, useEffect, useContext} from 'react';
import {AuthContext} from '../../context/AuthContext'
import axios from 'axios'
import ListOfPosition from './ListOfPosition';

const Trader = () => {
    const auth = useContext(AuthContext)
const myUser = auth.myUser
const postApi = auth.postApi

useEffect(() => {
 auth.getApi()
}, []);

const post = Object.values(postApi).filter(cryp => cryp.userId === myUser)

    return (
        <div>
        <div><h2>User: {auth.name}</h2></div>
        {post.length > 0 ?
        (<div>{post.map(raws => {
            return (
         <ListOfPosition raws={raws}/>  
            )
          })}</div>) : (<h3>User don't have positions</h3>)

        }
        </div>
    );
}

export default Trader;
