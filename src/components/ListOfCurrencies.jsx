import { useContext, useState } from "react"
/* import CryptoContext from '../contexts/CryptoContext' */
import CurrencyCard from "./CurrencyCard";
import { CryptoContext, ViewContext } from '../contexts/CryptoContext';


export default function ListOfCurrencies(props) {

    let { data, wallet, changeWallet, portfolio, changePortfolio, transactions, changeTransactions } = useContext(CryptoContext);
    const { dialog } = useContext(ViewContext);
    const { disable } = useContext(ViewContext);
    let [currency, setCurrName] = useState('');
    let [qty, setQty] = useState(0);
    let [currPrice, setCurrPrice] = useState(0);
    let [tradingOption, setTradingOption] = useState('Buy');
    let [view, setView] = dialog;
    let [background, setbg] = disable;
    let[disabled,setdisabled]=useState(false);

     let[maxValue,setMax]=useState(0)



    function showDialog(index, currency, currPrice) {
        console.log("ListOfCurrencies  :" + index)
        setView('flex');
        setCurrName(currency);
        setCurrPrice(currPrice);
        setbg(true)


    }
    function closedialog() {
        setView('none');
        setbg(false);
        setQty(0);
        setdisabled(false);

    }
    function changeHandler(e) {
        setTradingOption(e.target.value);
    }
    function changeInput(e) {

        let max= (e.target.nextElementSibling.innerHTML).split(':')
        setMax(max[1]);
        setQty(e.target.value)


        if(Number(e.target.value) > max[1]){
            console.log("   setdisabled  "+   e.target.value  ,max[1])
            setdisabled(true)
        }


    }





    function clickHandler() {
        if (tradingOption === 'Buy') {
            let newTransaction = { name: currency, qty: qty, currentPrice: currPrice, transactiontype: tradingOption.toLowerCase(), value: Number((qty * currPrice)).toFixed(2), timeStamp: Date.now() }
            changeWallet(wallet - qty * currPrice);
            let currTransaction = [...transactions];
            currTransaction.push(newTransaction);
            changeTransactions(currTransaction);

            updatePortfolio(newTransaction, tradingOption)
        }

        if (tradingOption === 'Sell') {
            let newTransaction = { name: currency, qty: qty, currentPrice: currPrice, transactiontype: tradingOption.toLowerCase(), value: (qty * currPrice).toFixed(2), timeStamp: Date.now() }
            changeWallet(wallet + qty * currPrice);
            let currTransaction = [...transactions];
            currTransaction.push(newTransaction);
            changeTransactions(currTransaction);

            updatePortfolio(newTransaction, tradingOption)


        }

        closedialog();


    }


    function updatePortfolio(newTransaction, tradingOption) {
        let newPortfolio = { name: newTransaction.name, currentHolding: newTransaction.qty, paid: newTransaction.value };

        if (tradingOption === 'Buy') {
            let currentState = [...portfolio];
            for (let i in currentState) {
                // console.log(currentState[i].name + "    portfolio.name  " + newPortfolio.name)
                if (currentState[i].name === newPortfolio.name) {
                    currentState[i].currentHolding = Number(currentState[i].currentHolding) + Number(newPortfolio.currentHolding);
                    currentState[i].paid = (Number(currentState[i].paid) + Number(newPortfolio.paid)).toFixed(2);
                    changePortfolio(currentState => [...currentState]);
                    break;

                }
            }

        }

        if (tradingOption === 'Sell') {
            let currentState = [...portfolio];
            for (let i in currentState) {
                // console.log(currentState[i].name + "    portfolio.name  " + newPortfolio.name)
                if (currentState[i].name === newPortfolio.name) {
                    if( currentState[i].currentHolding>0){
                    currentState[i].currentHolding = Number(currentState[i].currentHolding) - Number(newPortfolio.currentHolding);
                    currentState[i].paid = (Number(currentState[i].paid) + Number(newPortfolio.paid)).toFixed(2);
                    changePortfolio(currentState => [...currentState]);
                    }
                    break;

                }
            }

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
            <div className='dialogWrapper' style={{ display: view }}>

                <div className='dialogbox' >
                    <div className='dialog-header'>
                        <div >
                            {tradingOption + " " + currency}
                        </div>
                        <div className='close' onClick={closedialog}>✖️ </div>
                    </div>
                    <div className='dialog-content'>
                        <span> Current price: {currPrice}</span>
                        <div className='number-input'><input type="number" name="qty" id="qty" min="0" value={qty} step="1" onChange={changeInput} />
                        <span id='max'> Max: {tradingOption === 'Buy' ? (wallet / currPrice).toFixed(6) : portfolio.filter(coin => coin.name === currency)[0].currentHolding}

                        </span></div>
                        <div className='message'><span>{tradingOption === 'Buy' ? ' you will be charged $' : 'you will received $'} </span> {Number(qty * currPrice).toFixed(2)}</div>
                        <div className='TardingOption' id='options' >

                            <div className='option'> <input type="radio" value="Buy" name="currency" onChange={changeHandler} checked={tradingOption === 'Buy'} /> Buy</div>
                            <div className='option'> <input type="radio" value="Sell" name="currency" onChange={changeHandler} checked={tradingOption === 'Sell'} /> Sell</div>


                        </div>
                        <button className='button '  disabled={disabled} onClick={clickHandler}>{tradingOption}</button>

                    </div>
                </div>


            </div>
        </div>
    )
}