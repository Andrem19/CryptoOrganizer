import React, { useEffect, useContext } from 'react';
import List from './List';
import ToDoForm from './SubmitForm';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';


const Trading = () => {
  const auth = useContext(AuthContext)

  const appState = auth.appState
  const setAppState = auth.setAppState 
  

  const addPosition = (nameOfCoin, valueOfCoins, numberOfCoins, plan) => {
    let buyPrice, kof1, step1, step2, step3
    buyPrice = valueOfCoins/numberOfCoins
    kof1 = valueOfCoins / "100" * plan + parseFloat(valueOfCoins)
    step1 = kof1/numberOfCoins
    step2 = kof1/(valueOfCoins/step1)
    step3 = kof1/(valueOfCoins/step2)
    if(nameOfCoin && valueOfCoins && numberOfCoins && plan) {
      const newItem = {
        id: Math.random().toString(36).substr(2,9),
        name: nameOfCoin,
        userId: auth.userId,
        val: valueOfCoins,
        amount: numberOfCoins,
        amount2: numberOfCoins,
        pl: plan,
        buyPrice: buyPrice,
        step1: step1,
        step2: step2,
        step3: step3,
        complete1: false,
        complete2: false,
        complete3: false,
        d1: true,
        d2: true,
        d3: true
      }
      const savePosition = async () => {
        setAppState([...appState, newItem])
        await axios.post('http://localhost:5000/position/add', {...newItem})
             .then(res => console.log(res.data));
      }
      const ref = async () => {
    await savePosition()
    await auth.refreshPosition()
      }
      ref()
    }
  }
  
   useEffect(() => {
     auth.refreshPosition()
     console.log(appState)
   },[]);

   const rawsMap = Object.values(appState).filter(raw => raw.userId === auth.userId)

    return (
        <div>
          <header>
            <ToDoForm addPosition={addPosition}/>
            {Object.values(rawsMap).map((raws) => {
                return (
                <List 
                raws={raws}                
                />
                )
            })}             
           </header>
        </div>
    )
}

export default Trading