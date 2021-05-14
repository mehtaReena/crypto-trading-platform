import { useContext } from "react"
import CryptoContext from '../contexts/CryptoContext'
import CurrencyCard from "./CurrencyCard";


export default function ListOfCurrencies(props) {

    let { data, wallet, changeWallet, portfolio, changePortfolio } = useContext(CryptoContext);
    console.log(" CurrencyCard  :" + data[0].name)
    data.forEach((item)=>{
        console.log(item.name)
    })
    return (

        <div className="listofcurrencies">

            {
                data.map((item, idx)=>
                <CurrencyCard
                 name={item.name}
                 percentageChange={item.percentageChange}
                 currentPrice={item.currentPrice}
                 image={item.image}
                />






                )












            }

        </div>
    )
}