import { useEffect, useState } from "react";
import Header from "./Header";
import ListOfCurrencies from './ListOfCurrencies'

export default function App(props){
    let [loading, setLoading] = useState(true)
    let [data, setData] = useState([])

    useEffect(()=>{
        getData()
    }, [])

    async function getData(){
        let response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2C%20dogecoin%2C%20ethereum&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h')
        let data = await response.json()
        data = data.map(val => ({percentageChange: val.price_change_percentage_24h_in_currency, name: val.name, image: val.image, currentPrice: val.current_price}))
        console.log(data)
    }
    return (
        <div className="app">
            <Header />
            <ListOfCurrencies />
        </div>
    )
}

// price_change_percentage_24h_in_currency
// name
// image:
// current_price