

function CurrencyCard(props) {

    function clickHandler(){

        props.method(props.index, props.name ,props.currentPrice);

    }

//    console.log(  "CurrencyCard " + props)

    return (
        <div className='currencycard'  onClick={clickHandler}>
            <div className='currencyImage'>
            <img src={props.image} alt="bitcoin"></img>
            </div>
            <div className='card-info'   >

                <h3> {(props.currentPrice).toFixed(5)}</h3>
                <h4>{props.name}   </h4>
                <p> last24h {(props.percentageChange).toFixed(5)}</p>


            </div>
        </div>
    )

}
export default CurrencyCard;