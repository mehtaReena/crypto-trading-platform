import { useContext, useState } from "react"
/* import CryptoContext from '../contexts/CryptoContext' */
import CurrencyCard from "./CurrencyCard";
import { CryptoContext, ViewContext } from '../contexts/CryptoContext';


export default function ListOfCurrencies(props) {

    let { data, wallet, changeWallet, portfolio, changePortfolio, changeTransactions } = useContext(CryptoContext);
    const { dialog } = useContext(ViewContext);
    const { disable } = useContext(ViewContext);
    let [currName, setCurrName] = useState('');
    let [qty, setQty] = useState(0);
    let [currPrice, setCurrPrice] = useState('');
    let [tradingOption, setTradingOption] = useState('Buy');
    let [view, setView] = dialog;
    let [background, setbg] = disable;
    let [charged, setChargedAmt] = useState(0)
    let [received, setReceviedAmt] = useState(0)



    function showDialog(index, currency, currPrice) {
        console.log("ListOfCurrencies  :" + index)
        setView('flex');
        setCurrName(currency);
        setCurrPrice(currPrice);
        setbg(true)


    }
    function closedialog() {
        setView('none');
        setbg(false)

    }
    function changeHandler(e) {
        if ((e.target.value === 'Buy') || (e.target.value === 'Sell')) {
        setTradingOption(e.target.value);
        setChargedAmt(Number(qty * currPrice).toFixed(4))
        }

    }
    function changeInput(e) {
         if (e.target.id === 'qty') {
         setQty(e.target.value)
         setChargedAmt(Number(qty * currPrice).toFixed(4))

         }

     }





    function clickHandler() {
        if (tradingOption === 'Buy') {
            setChargedAmt(Number(qty * currPrice).toFixed(4))
            // console.log(wallet - qty * currPrice)
            //console.log("changeWallet " + changeWallet)

            changeWallet = wallet - qty * currPrice;
            changeTransactions = [{ name: { currName }, qty: { qty }, currentPrice: { currPrice }, transactiontype: { tradingOption }, value: 24.5, timeStamp: Date.now() }];
        }
        if (tradingOption === 'Sell') {

            setReceviedAmt(Number(qty * currPrice).toFixed(4))
            //console.log(Number(qty * currPrice))
            //console.log(wallet + qty * currPrice)

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
                    <div className='close' onClick={closedialog}>✖️ </div>
                </div>
                <div className='dialog-content'>
                    <span> Current price: {currPrice}</span>
                    <div className='number-input'><input type="number" name="qty" id="qty" min="0" value={qty}step="1" onChange={changeInput} /><span>Max: {wallet}</span></div>
                    <div className='message'><span>{tradingOption === 'Buy' ? ' you will be charged $' + charged : 'you will received $' + received} </span></div>
                    <div className='TardingOption' id='options' >

                        <div className='option'> <input type="radio" value="Buy" name="currency" onChange={changeHandler} checked={tradingOption === 'Buy'} /> Buy</div>
                        <div className='option'> <input type="radio" value="Sell" name="currency" onChange={changeHandler} checked={tradingOption === 'Sell'} /> Sell</div>


                    </div>
                    <button className='button' onClick={clickHandler}>{tradingOption}</button>

                </div>
            </div>



        </div>
    )
}