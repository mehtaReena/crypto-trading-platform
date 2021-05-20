import { useContext, useEffect, useRef, useState } from "react";
import { CryptoContext, ViewContext } from "../contexts/CryptoContext";


function Trading({currPrice,currency}) {

    let { data, wallet, changeWallet, portfolio, changePortfolio, transactions, changeTransactions } = useContext(CryptoContext);
    const { dialog } = useContext(ViewContext);
    const { disable } = useContext(ViewContext);
    // let [currency, setCurrName] = useState('');
    let [qty, setQty] = useState(0);
    // let [currPrice, setCurrPrice] = useState(0);
    let [tradingOption, setTradingOption] = useState('Buy');
    let [view, setView] = dialog;
    let [background, setbg] = disable;
    let[disabled,setdisabled]=useState(false);

     let[maxValue,setMax]=useState(0)
     let inputRef=useRef();



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
        //setdisabled(false)
        let max = (e.target.nextElementSibling.innerHTML).split(':')
        setMax(max[1]);
        setQty(Number(inputRef.current.value))


        // if (Number(e.target.value) > max[1]) {
        //     console.log("   setdisabled  " + e.target.value, max[1])
        //     setdisabled(true)
        // }


    }

    useEffect(()=>{
        // if(tradingOption==='Buy')
        console.log(maxValue , qty, inputRef.current.value)
        qty>maxValue ||  Number(qty) <=0 ?setdisabled(true)  : setdisabled(false)
        // else if(tradingOption==='Sell'){

        //     qtymaxValue && qty <=0 ?setdisabled(true)  : setdisabled(false)
        // }

    },[qty])

     useEffect(()=>{
         if(view==='none'){
            inputRef.current.value=0;
            setQty(Number( inputRef.current.value));
            setTradingOption('Buy');

         }
         else{

         }

     },[view])




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
                    if (currentState[i].currentHolding > 0) {
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
                    <div className='number-input'><input type="number" name="qty" id="qty" min="0"  ref={inputRef}/* value={qty === 0 ? 0 : qty} */ step="1" onChange={changeInput} />
                        <span id='max' onClick={()=>inputRef.current.value=Number(maxValue)}> Max: {tradingOption === 'Buy' ? (wallet / currPrice).toFixed(6) : portfolio.filter(coin => coin.name === currency)[0].currentHolding}

                        </span></div>
                    <div className='message'><span>{tradingOption === 'Buy' ? ' you will be charged $' : 'you will received $'} </span> {Number(qty * currPrice).toFixed(2)}</div>
                    <div className='TardingOption' id='options' >

                        <div className='option'> <input type="radio" value="Buy" name="currency" onChange={changeHandler} checked={tradingOption === 'Buy'} /> Buy</div>
                        <div className='option'> <input type="radio" value="Sell" name="currency" onChange={changeHandler} checked={tradingOption === 'Sell'} /> Sell</div>


                    </div>
                    <button className= {disabled ?'button' : 'button active' } disabled={disabled} onClick={clickHandler}>{tradingOption}</button>

                </div>
            </div>


        </div>
    );

}

export default Trading;