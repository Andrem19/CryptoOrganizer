import React, {useState, useEffect, useContext, useCallback} from 'react';
import { AuthContext } from '../../context/AuthContext'
import AddMyPosition from './AddMyPosition';
import ListFutures from './ListFutures';




const Info = () => {
    const auth = useContext(AuthContext)

const postApi = auth.postApi

    useEffect(() => {
        auth.getApi() 
         console.log(postApi)
     },[]);
      
     const post = Object.values(postApi).filter(cryp => cryp.userId === auth.userId)
    return (
        <div>
         {post.length > 0 ?
          (<div><h2>Opened Positions</h2></div>) : (<AddMyPosition />)
         }
         {Object.values(post).map((raws) => {
           return (
        <ListFutures raws={raws}/>  
           )
         })}
         </div>
    );
}

export default Info;
