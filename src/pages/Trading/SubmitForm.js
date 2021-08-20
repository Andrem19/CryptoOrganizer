import React, {useState, useContext, useEffect} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { AuthContext } from '../../context/AuthContext';
import './style.css';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const SubmitForm = ({addPosition}) => {
  const auth = useContext(AuthContext)
    const classes = useStyles();

    const [nameOfCoin, setNameOfCoin] = useState('')
    const [valueOfCoins, setValueOfCoins] = useState('')
    const [numberOfCoins, setNumberOfCoins] = useState('')
    const [plan, setPlan] = useState('')
    const [open, setOpen] = useState(false);

    const handleClose = () => {
      setOpen(false);
    };

    const handleOpen = () => {
      setOpen(true);
    };

    useEffect(() => {
        auth.getCrypto()        
    }, []);
     

    let crypto = Object.values(auth.coins).filter(cryp => cryp.id === "eth-ethereum" || cryp.id === "btc-bitcoin" || cryp.id === "ada-cardano" || cryp.id === "cake-pancakeswap" || cryp.id === "dot-polkadot" || cryp.id === "xrp-xrp" || cryp.id === "bnb-binance-coin" || cryp.id === "matic-polygon" || cryp.id === "uni-uniswap")

       const handleSubmit = (event) => {
        event.preventDefault()
        addPosition(nameOfCoin, valueOfCoins, numberOfCoins, plan)
        setNameOfCoin("")
        setValueOfCoins("")
        setNumberOfCoins("")
        setPlan("")
      }
      const handleChange = (event) => {
        setNameOfCoin(event.target.value);
      };

      const handlekeyPress = (event) => {
        if(event.key === "Enter") {
          handleSubmit(event)
        }
      }

    return (
        <div className="center">
       <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
         
            <Select
             labelId="demo-controlled-open-select-label"
             id="demo-controlled-open-select"
             open={open}
             onClose={handleClose}
             onOpen={handleOpen}
             value={nameOfCoin}
             onChange={handleChange}
             className="input chousecrypto"
             style={{marginTop: 45}}
           >
             <MenuItem value="">
               <em>None</em>
             </MenuItem>
             {crypto.map((coin) => (
             <MenuItem key={coin.id} value={coin.symbol}>{coin.name}</MenuItem>

           ))}
           </Select>
         

       <div className="input">
         <div>Value</div>
       <input 
       defaultValue="Value" 
       style={{marginLeft: 30}} 
       type='number' 
       onKeyDown={handlekeyPress} 
       value={valueOfCoins} 
       onChange={event => setValueOfCoins(event.target.value)}
       />
       </div>
       
       <div className="input">
       <div>Amount</div>
       <input 
       defaultValue="Amount" 
       style={{marginLeft: 30}} 
       type='number' 
       onKeyDown={handlekeyPress} 
       value={numberOfCoins} 
       onChange={event => setNumberOfCoins(event.target.value)}
       />
       </div>
       
       <div className="input">
       <div>Percentage</div>
       <input 
       defaultValue="Percentage" 
       style={{marginLeft: 30}} 
       type='number' 
       onKeyDown={handlekeyPress} 
       value={plan} 
       onChange={event => setPlan(event.target.value)}
       />
       </div>
       <Button className="input" style={{marginTop: 40, marginLeft: 40}} type="submit" variant="contained">Submit</Button>       
     </form>
     </div>
    );
}

export default SubmitForm;
