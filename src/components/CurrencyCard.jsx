import { useContext } from "react"
import CryptoContext from '../contexts/CryptoContext'

function CurrencyCard(props) {

    let {data,wallet,changeWallet,portfolio , changePortfolio}  = useContext(CryptoContext);
    console.log(data)

    return (

        <div className='CurrencyCard'>
            <img src={data.image} alt="bitcoin"></img>
            <div className='card-inf0'>

                <h2>{data.name}   </h2>
                <p> {data.percentageChange}</p>
                <p> last24h {data.currentPrice}</p>


            </div>

        </div>
    )

}
export default CurrencyCard;