import React, {useState, useEffect, useContext} from 'react';
import { AuthContext } from '../../context/AuthContext'


import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Binance = require('node-binance-api');


const ListFutures = ({raws}) => {
  const classes = useStyles();
  const auth = useContext(AuthContext)
const setMyAccount = auth.setMyAccount
const myAccount = auth.myAccount
const setMyAccFiltred = auth.setMyAccFiltred 
const myAccFiltred = auth.myAccFiltred
const [filt, setFilt] = useState({})

const binance = new Binance().options({
        APIKEY: raws.apiKey,
        APISECRET: raws.apiSecret
      });

      const fetchData = async() => {
       const myPos = await binance.futuresAccount()
       setMyAccount(myPos.positions)
       const objFilt = Object.values(myAccount).filter(cryp => parseInt(cryp.initialMargin) > 0)
       setFilt(objFilt)
       setMyAccFiltred(objFilt)
      }

      useEffect(() => {
      fetchData()
      }, []);

    return (
       <div> 
         <TableContainer component={Paper}>
<Table className={classes.table} size="small" aria-label="a dense table">
  <TableHead>
    <TableRow>
      <TableCell>Name of pair xxx/xxx</TableCell>
      <TableCell align="right">Long/Short</TableCell>
      <TableCell align="right">Amount USDT</TableCell>
      <TableCell align="right">PnL</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
      {Object.values(myAccFiltred).map(pos => {
        return(
      <TableRow >
        <TableCell component="th" scope="row">{pos.symbol}</TableCell>
        <TableCell align="right">{pos.positionSide}</TableCell>
        <TableCell align="right">{pos.initialMargin}</TableCell>
        <TableCell align="right">{pos.unrealizedProfit}</TableCell>
      </TableRow>
        )
  })}
  </TableBody>
</Table>
</TableContainer> 
<div>
<button onClick={fetchData} class="btn waves-effect #1e88e5 blue darken-1" type="submit" name="action">Refresh
    <i class="material-icons right">autorenew</i>
                </button> 
</div>
       </div>
    )  
}
export default ListFutures