import { useContext, useState } from "react"
/* import CryptoContext from '../contexts/CryptoContext' */
import CurrencyCard from "./CurrencyCard";
import { CryptoContext, ViewContext } from '../contexts/CryptoContext';


export default function ListOfCurrencies(props) {

    let { data, wallet, changeWallet, portfolio, changePortfolio } = useContext(CryptoContext);
    const [view, setView] = useContext(ViewContext);
    let [currName, setCurrName] = useState('');
    let [amount, setAmount] = useState('');
    let [currPrice, setCurrPrice] = useState('');
    let [tradingOption, setTradingOption] = useState('Buy')

    function showDialog(index, currency ,currPrice) {
        console.log("ListOfCurrencies  :" + index)
        setView('flex');
        setCurrName(currency);
        setCurrPrice(currPrice);


    }
    function closedialog() {
        setView('none');
    }
    function changeHandler(e) {
        if((e.target.value==='Buy')||(e.target.value==='Sell'))
        setTradingOption(e.target.value);
        if(e.target.id==='amount'){
            setAmount(e.target.value)

        }




    }
    function clickHandler(){
       if(tradingOption==='Buy'){
           console.log(Number(amount*currPrice))
           console.log(wallet-amount*currPrice)
           // changeWallet:wallet-amount*currPrice;

       }
       if(tradingOption==='Sell'){
        console.log(Number(amount*currPrice))
        console.log(wallet+amount*currPrice)

       }


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

            <div className='dialogbox' style={{ display: view }}>
                <div className='dialog-header'>
                    <div >
                        {tradingOption + " " + currName}
                    </div>
                    <div className='close' onClick={closedialog}> ❌ </div>
                </div>
                <div className='dialog-content'>
                    <span> Current price: {currPrice}</span>
                    <div className='number-input'><input type="number" name="amount" id="amount" min="0"  onChange={changeHandler} /><span>Max: {wallet}</span></div>
                    <span> </span>
                    <div className='TardingOption' id='options' >

                        <div className='option'> <input type="radio" value="Buy" name="currency" onChange={changeHandler}  checked={tradingOption === 'Buy'}/> Buy</div>
                        <div className='option'> <input type="radio" value="Sell" name="currency" onChange={changeHandler}  checked={tradingOption === 'Sell'}/> Sell</div>


                    </div>
                   <button className= 'button' onClick={clickHandler}>{tradingOption}</button>

                </div>
            </div>



        </div>
    )
}