import { useEffect, useState } from "react";
import Header from "./Header";
import ListOfCurrencies from './ListOfCurrencies'
import {useContext} from 'react'
import CryptoContext from '../contexts/CryptoContext'

export default function App(props){
    let [loading, setLoading] = useState(true)
    let [data, setData] = useState([])
    let [wallet, setWallet] = useState(100);
    let [portfolio, setPortfolio] = useState([{name: 'Bitcoin', currentHolding: 0, paid: 0},{name: 'Ethereum', currentHolding: 0, paid: 0},{name: 'Dogecoin', currentHolding: 0, paid: 0}])

    useEffect(()=>{
        let intervalId = setInterval(() => {getData()}, 60000)
        return () => clearInterval(intervalId)
    }, [])

    async function getData(){
        let response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2C%20dogecoin%2C%20ethereum&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h')
        let data = await response.json()
        data = data.map(val => ({percentageChange: val.price_change_percentage_24h_in_currency, name: val.name, image: val.image, currentPrice: val.current_price}))
        setData(data)
        setLoading(false)
        // console.log(data)
    }
    return (
        <CryptoContext.Provider value = {{data: data, wallet: wallet, changeWallet: setWallet, portfolio: portfolio, changePortfolio: setPortfolio}}>
        <div className="app">
            {loading && <h1> Loading...</h1>}

            {
               !loading && <>
                   <Header />
                   <ListOfCurrencies />

               </>
            }

        </div>
        </CryptoContext.Provider>
    )
}

// price_change_percentage_24h_in_currency
// name
// image:
// current_price