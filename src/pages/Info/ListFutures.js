import React, {useState, useCallback, useEffect} from 'react';
const Binance = require('node-binance-api');

export const ListFutures = ({raws}) => {
 const [myAccount, setMyAccount] = useState()

const binance = new Binance().options({
        APIKEY: raws.apiKey,
        APISECRET: raws.apiSecret
      });
      
      const tryBin = () => {
      
        const myAc = binance.futuresAccount()
        setMyAccount(myAc)
        console.log(myAccount)
     }

     return (
        <div>
            <button onClick={tryBin} class="btn waves-effect #1e88e5 blue darken-1" name="action">ADD
    <i class="material-icons right">add</i>
                </button>s
        </div>
    );
}