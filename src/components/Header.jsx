import {useContext} from "react"
import CryptoContext from '../contexts/CryptoContext'

export default function Header(props){
    // let [data, setData] = useState([])
    let {wallet, portfolio, changePortfolio} = useContext(CryptoContext)
    console.log(wallet, portfolio)
    return (
        <div className="header">
            <h1>Earn some Virtual Money 💰</h1>
            <p>To Buy Virtual Food 🍕</p>
            <h3>🏛 Wallet: ${wallet}</h3>
            <h2>Portfolio Value: {portfolio.reduce((sum, coin) => sum+coin.paid,0)}</h2>
        </div>
    )
}