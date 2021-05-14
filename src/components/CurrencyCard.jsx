

function CurrencyCard(props) {
   console.log(  "CurrencyCard " + props)
    return (
        <div className='currencycard'>
            <div className='currencyImage'>
            <img src={props.image} alt="bitcoin"></img>
            </div>
            <div className='card-inf0'>

                <h3> {(props.percentageChange).toFixed(4)}</h3>
                <h4>{props.name}   </h4>
                <p> last24h {props.currentPrice}</p>


            </div>

        </div>
    )

}
export default CurrencyCard;