

function CurrencyCard(props) {
    return (

        <div className='CurrencyCard'>
            <img src='../images/bitcoin.png' alt="bitcoin"></img>

            <div className='Currency-info'>

                <h2>{'props.currencyValue'}   </h2>
                <p> {'props.currencyType'}</p>
                <p> last24h {'props.latest'}</p>

            </div>
        </div>
    )

}
export default CurrencyCard;