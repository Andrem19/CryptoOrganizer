import React, {useState, useEffect, useContext, useCallback} from 'react';
import { AuthContext } from '../../context/AuthContext'
import AddMyPosition from './AddMyPosition';
import axios from 'axios'
import {ListFutures} from './ListFutures';


const Info = () => {
    const auth = useContext(AuthContext)

const postApi = auth.postApi
const setPostApi = auth.setPostApi


    useEffect(() => {
        auth.getApi() 
         console.log(postApi)
     },[]);
      
           const post = Object.values(postApi).filter(cryp => cryp.userId === auth.userId)
    return (
        <div>
            <AddMyPosition />
            {Object.values(post).map((raws) => {
                return (
                <ListFutures 
                raws={raws}                
                />
                )
            })}             
            
        </div>
    );
}

export default Info;
