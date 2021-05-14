import { useContext } from "react"
import CryptoContext from '../contexts/CryptoContext'
import CurrencyCard from "./CurrencyCard";


export default function ListOfCurrencies(props) {

    let { data, wallet, changeWallet, portfolio, changePortfolio } = useContext(CryptoContext);


    function showDialog(index){
       console.log("ListOfCurrencies  :" + index)

    }
    return (

        <div className="listofcurrencies">

            {
                data.map((item, idx)=>
                <CurrencyCard
                 name={item.name}
                 percentageChange={item.percentageChange}
                 currentPrice={item.currentPrice}
                 image={item.image}
                 method={showDialog}
                 key={idx}
                 index={idx}

                />

                )
            }

            <div style={{ top:'-23000'}} >
               <div>
                   <p></p>
                   <div> X </div>
                   <div>
                       <input type="text" name="" id="" />
                       <input type="radio" />
                   </div>
              </div>

            </div>

        </div>
    )
}