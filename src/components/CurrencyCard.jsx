

function CurrencyCard(props) {

    function clickHandler(){
        props.method(props.index)
    }

//    console.log(  "CurrencyCard " + props)

    return (
        <div className='currencycard'  onClick={clickHandler}>
            <img src={props.image} alt={props.name}></img>
            <div className='card-info'   >
                <p>${props.currentPrice}</p>
                <p>{props.name}</p>
                <p><strong>Last 24h:</strong> {(props.percentageChange).toFixed(5)}%</p>
            </div>
        </div>
    )

}
export default CurrencyCard;