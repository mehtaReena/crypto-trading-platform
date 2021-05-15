import { useEffect, useState } from "react";
import Header from "./Header";
import ListOfCurrencies from './ListOfCurrencies'
import { useContext } from 'react'
import {CryptoContext , ViewContext} from '../contexts/CryptoContext'
import DisplayBoard from "./DisplayBoard";

export default function App(props) {
    let [loading, setLoading] = useState(true)
    let [data, setData] = useState([])
    let [wallet, setWallet] = useState(100);
    let [display, setDisplay] = useState('none');
    let [transactions, setTransactions] = useState([{name: 'Bitcoin', qty: 0.0005, currentPrice: 49000, transactiontype: 'buy', value: 24.5, timeStamp: Date.now()}])  //{proforma for individual value: {name: , qty: , currentPrice: , transactiontype: , value: , timeStamp:}
    let [portfolio, setPortfolio] = useState([{ name: 'Bitcoin', currentHolding: 0, paid: 0 }, { name: 'Ethereum', currentHolding: 0, paid: 0 }, { name: 'Dogecoin', currentHolding: 0, paid: 0 }])

    useEffect(() => {
        let intervalId = setInterval(() => { getData() }, 10000)
        return () => clearInterval(intervalId)
    }, [])

    async function getData() {
        let response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2C%20dogecoin%2C%20ethereum&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h')
        let data = await response.json()
        data = data.map(val => ({ percentageChange: val.price_change_percentage_24h_in_currency, name: val.name, image: val.image, currentPrice: val.current_price }))
        console.log(data)
        setData(data)

        setLoading(false)

    }
    return (
        <ViewContext.Provider value={[display, setDisplay] }>
        <CryptoContext.Provider value={{transactions: transactions, changeTransactions: setTransactions,  data: data, wallet: wallet, changeWallet: setWallet, portfolio: portfolio, changePortfolio: setPortfolio }}>
            <div className="app">
                {loading && <h1> Loading...</h1>}

                {
                    !loading && <>
                        <Header />
                        <ListOfCurrencies />
                        <DisplayBoard />
                    </>
                }

            </div>
        </CryptoContext.Provider>
        </ViewContext.Provider>
    )
}

// price_change_percentage_24h_in_currency
// name
// image:
// current_price