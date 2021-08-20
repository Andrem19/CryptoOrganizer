import React, {useEffect, useContext, useState} from 'react'
import { AuthContext } from '../../context/AuthContext'
import Coin from './Coin'
import axios from 'axios'
import './Dashboard.css';
import 'materialize-css'


const Dashboard = () => {
    const auth = useContext(AuthContext)

    const [cryptoList, setCryptoList] = useState([])
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false)

    useEffect(() => {
      setLoading(true)
     axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false')
      .then(res => {
       
         setCryptoList(res.data)
      }).catch(error => console.log(error))
      setLoading(false)
    }, []);

    const handleChange = e => {
      setSearch(e.target.value);
    };
   
    const filteredCoins = cryptoList.filter(coin =>
      coin.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
     <div className='coin-app'>
      <div className='coin-search'>
        <h1 className='coin-text'>Search a currency</h1>
        <form>
          <input
            className='coin-input'
            type='text'
            onChange={handleChange}
            placeholder='Search'
          />
        </form>
      </div>
     {filteredCoins.map(coin => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            price={coin.current_price}
            symbol={coin.symbol}
            marketcap={coin.total_volume}
            volume={coin.market_cap}
            image={coin.image}
            priceChange={coin.price_change_percentage_24h}
            loading={loading}
          />
        );
      })}
    </div>
    )
}
export default Dashboard
