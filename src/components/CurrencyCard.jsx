import { useContext, useState } from "react"
import { ViewContext } from '../contexts/CryptoContext';

function CurrencyCard(props) {

    const {disable} = useContext(ViewContext);
    let[disableCard ,setDisableCard  ]=disable;
    let theme='transparent'
     props.percentageChange >0 ?theme= 'green' : theme='red'

    function clickHandler(){

        props.method(props.index, props.name ,props.currentPrice);

    }


    const rightToggleStyle = {

        cursor: (disableCard) ? 'none' : ''

     };
//    console.log(  "CurrencyCard " + props)

    return (
        <div className='currencycard'  style={rightToggleStyle}  onClick={clickHandler}>
            <div className='currencyImage'>
            <img src={props.image} alt="bitcoin"></img>
            </div>
            <div className='card-info'   >

                <h3> {(props.currentPrice).toFixed(5)}</h3>
                <h4>{props.name}   </h4>
                <p style={{color: theme}}> last24h {(props.percentageChange).toFixed(5) }</p>


            </div>
        </div>
    )

}
export default CurrencyCard;