import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import {createPost, fetchPosts} from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
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
    const classes = useStyles();

    const [nameOfCoin, setNameOfCoin] = useState('')
    const [valueOfCoins, setValueOfCoins] = useState('')
    const [numberOfCoins, setNumberOfCoins] = useState('')
    const [plan, setPlan] = useState('')
    const [open, setOpen] = useState(false);

    //Fetch cryptoList
    const dispatch = useDispatch()
    const cryptoTab = useSelector((state) => {
      return state.posts.fetchedPosts
    })
    useEffect(() => {
    dispatch(fetchPosts())
    }, [])

    let crypto = Object.values(cryptoTab).filter(cryp => cryp.id == "eth-ethereum" || cryp.id == "btc-bitcoin" || cryp.id == "ada-cardano" || cryp.id == "cake-pancakeswap" || cryp.id == "dot-polkadot" || cryp.id == "xrp-xrp" || cryp.id == "bnb-binance-coin" || cryp.id == "matic-polygon" || cryp.id == "uni-uniswap")

    //------------------

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

      const handleClose = () => {
        setOpen(false);
      };

      const handleOpen = () => {
        setOpen(true);
      };

    return (
        <div className="center">
       <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="on">

         <FormControl className={classes.formControl}>
           <InputLabel id="demo-controlled-open-select-label">Coin</InputLabel>
           <Select
             labelId="demo-controlled-open-select-label"
             id="demo-controlled-open-select"
             open={open}
             onClose={handleClose}
             onOpen={handleOpen}
             value={nameOfCoin}
             onChange={handleChange}
           >
             <MenuItem value="">
               <em>None</em>
             </MenuItem>
             {crypto.map((coin) => (
             <MenuItem key={coin.id} value={coin.symbol}>{coin.name}</MenuItem>

           ))}
           </Select>
         </FormControl>

       <FormControl className="input">
         <InputLabel htmlFor="component-simple">Amount</InputLabel>
         <Input id="component-simple" type='number' onKeyDown={handlekeyPress} value={valueOfCoins} onChange={event => setValueOfCoins(event.target.value)} />
       </FormControl>

       <FormControl className="input">
         <InputLabel htmlFor="component-simple">Num. of coins</InputLabel>
         <Input id="component-simple" type='number' onKeyDown={handlekeyPress} value={numberOfCoins} onChange={event => setNumberOfCoins(event.target.value)} />
       </FormControl>

       <FormControl className="input">
         <InputLabel htmlFor="component-simple">%</InputLabel>
         <Input id="component-simple" type='number' onKeyDown={handlekeyPress} value={plan} onChange={event => setPlan(event.target.value)} />
       </FormControl>
       <Button type="submit" variant="contained">Submit</Button>
     </form>
     </div>
    );
}

export default SubmitForm;
