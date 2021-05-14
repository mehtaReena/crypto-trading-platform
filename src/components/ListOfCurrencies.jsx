import { useContext } from "react"
import CryptoContext from '../contexts/CryptoContext'
import CurrencyCard from "./CurrencyCard";


export default function ListOfCurrencies(props) {

    let { data, wallet, changeWallet, portfolio, changePortfolio } = useContext(CryptoContext);


    function showDialog(index) {
        console.log("ListOfCurrencies  :" + index)


    }
    return (

        <div className="listofcurrencies">

            {
                data.map((item, idx) =>
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

            <div className='dialogbox'>
                <div className='dialog-header'>
                    <div >

                    </div>
                    <div> X </div>
                </div>
                <div className='dialog-content'>
                    <span> Current price:</span>
                    <div className='number-input'><input type="number" name="amount" id="" min="0"/><span>Max:</span></div>
                    <span> ff</span>
                    <div className='TardingOption' id='options' >

                   <div className='option'> <input type="radio" value="Buy" name="gender"/> Buy</div>
                   <div className='option'> <input type="radio" value="Sell" name="gender"/> Sell</div>


                    </div>
                </div>
            </div>



        </div>
    )
}