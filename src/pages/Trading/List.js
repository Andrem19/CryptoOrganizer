import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import {fetchPosts} from '../../redux/actions';
import axios from 'axios'

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto'
  },
  table: {
    minWidth: 650
  }
});


const ExpandableTableRow = ({ children, expandComponent, ...otherProps }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <>
      <TableRow {...otherProps}>
        <TableCell padding="checkbox">
          <IconButton onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {children}
      </TableRow>
      {isExpanded && (
        <TableRow>
          <TableCell padding="checkbox" />
          {expandComponent}
        </TableRow>
      )}
    </>
  );
};

const List = ({syncPosts, raws, refreshPosition}) => {

 
  const classes = useStyles();

  
  //Fetch cryptoList
  const dispatch = useDispatch()
  const cryptos = useSelector((state) => {
    return state.posts.fetchedPosts
  })
  useEffect(() => {
  dispatch(fetchPosts())
  }, [])
  //Delete Position

  const deletePost = async (id) => {
    await axios.delete('http://localhost:5000/position/'+id)
    .then(res => console.log(res.data));
    refreshPosition()
  }
  //Update styles
    const [postius1, setPostius1] = useState({
    id: raws.id,
    name: raws.name,
    userId: raws.userId,
    val: raws.val,
    amount: raws.amount,
    amount2: raws.amount2,
    pl: raws.pl,
    buyPrice: raws.step1,
    step1: raws.step1,
    step2: raws.step2,
    step3: raws.step3,
    complete1: true,
    complete2: false,
    complete3: false,
    d1: false,
    d2: true,
    d3: true
  })
  const [postius2, setPostius2] = useState({
    id: raws.id,
    name: raws.name,
    userId: raws.userId,
    val: raws.val,
    amount: raws.amount,
    amount2: raws.amount2,
    pl: raws.pl,
    buyPrice: raws.step2,
    step1: raws.step1,
    step2: raws.step2,
    step3: raws.step3,
    complete1: true,
    complete2: true,
    complete3: false,
    d1: false,
    d2: false,
    d3: true
  })
  const [postius3, setPostius3] = useState({
    id: raws.id,
    name: raws.name,
    userId: raws.userId,
    val: raws.val,
    amount: raws.amount,
    amount2: raws.amount2,
    pl: raws.pl,
    buyPrice: raws.step3,
    step1: raws.step1,
    step2: raws.step2,
    step3: raws.step3,
    complete1: true,
    complete2: true,
    complete3: true,
    d1: false,
    d2: false,
    d3: false
  })
  
  const updateStyles1 = async (_id) => {
    await axios.post('http://localhost:5000/position/update/'+_id, postius1)
           .then(res => console.log(res.data));
    refreshPosition()
  }
  const updateStyles2 = async (_id) => {
    await axios.post('http://localhost:5000/position/update/'+_id, postius2)
           .then(res => console.log(res.data));
    refreshPosition()
  }
  const updateStyles3 = async (_id) => {
    await axios.post('http://localhost:5000/position/update/'+_id, postius3)
           .then(res => console.log(res.data));
    refreshPosition()
  }
  const filt = Object.values(cryptos).filter(cryp => cryp.symbol === raws.name).map((n) => (n.quotes.USD.price))*raws.amount-raws.val

  const amountOfSell1 = raws.amount2-raws.val/raws.step1
  const amountOfSell2 = raws.amount2-amountOfSell1-raws.val/raws.step2
  const amountOfSell3 = raws.amount2-amountOfSell1-amountOfSell2-raws.val/raws.step3

  const className1 = raws.complete1 ? 'x' : 'xx'
  const className2 = raws.complete2 ? 'x' : 'xx'
  const className3 = raws.complete3 ? 'x' : 'xx'

  return (
    <div className="withdel">
    <div className="border">
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="simple table">

        <TableHead>
          <TableRow>
            <TableCell padding="checkbox"><div onClick={() => deletePost(raws._id)} className="del"><IconButton className="del" aria-label="delete"><DeleteIcon /></IconButton></div> </TableCell>
            <TableCell align="left">COIN</TableCell>
            <TableCell align="right">VALUE</TableCell>
            <TableCell align="right">AMOUNT</TableCell>
            <TableCell align="right">PERCENT</TableCell>
            <TableCell align="right">BUY PRICE</TableCell>
          </TableRow>
        </TableHead>

      <TableBody>

        <ExpandableTableRow expandComponent={
         <TableCell colSpan="5">

   <TableHead className="tablerow">
      <TableRow>
         <TableCell align="left"><div onClick={raws.d1 ? () => updateStyles1(raws._id) : ''}className="d">x </div>Sell Price 1</TableCell>
         <TableCell align="left"><div onClick={raws.d2 && !raws.d1 ? () => updateStyles2(raws._id, amountOfSell2) : ''}className="d">x </div>Sell Price 2</TableCell>
         <TableCell align="left"><div onClick={raws.d3 && !raws.d1 && !raws.d2 ? () => updateStyles3(raws._id, amountOfSell3) : ''}className="d">x </div>Sell Price 3</TableCell>
         <TableCell align="left">Profit/Lose</TableCell>
      </TableRow>
   </TableHead>

          <TableBody>
            <TableRow key={raws._id}>
              <TableCell className={className1} align="right">{((parseInt(raws.step1 * 100)) / 100)}</TableCell>
              <TableCell className={className2} align="right">{((parseInt(raws.step2 * 100)) / 100)}</TableCell>
              <TableCell className={className3} align="right">{((parseInt(raws.step3 * 100)) / 100)}</TableCell>
            <TableCell align="right">{filt.toFixed(3)}</TableCell>
          </TableRow>

          <TableRow key={raws._id}>
            <TableCell className={className1} align="right">{(amountOfSell1).toFixed(6)}</TableCell>
            <TableCell className={className2} align="right">{(amountOfSell2).toFixed(6)}</TableCell>
            <TableCell className={className3} align="right">{(amountOfSell3).toFixed(6)}</TableCell>
          <TableCell align="right"></TableCell>
        </TableRow>

          </TableBody>

         </TableCell>}>

              <TableCell component="th" scope="row">
                {raws.name}
              </TableCell>
              <TableCell align="right">{raws.val}</TableCell>
              <TableCell align="right">{raws.amount}</TableCell>
              <TableCell align="right">{raws.pl}</TableCell>
              <TableCell align="right">{((parseInt(raws.buyPrice * 100)) / 100)}</TableCell>

        </ExpandableTableRow>

        </TableBody>
      </Table>
    </Paper>
    </div>
    </div>
  )
}
const mapStateToProps = state => {
  return {
    syncPosts: state.posts.posts
  }
}

export default connect(mapStateToProps, null)(List)
