import { useContext, useEffect } from "react"
import CryptoContext from '../contexts/CryptoContext'

export default function Header() {
    let { data, wallet, portfolio } = useContext(CryptoContext)

    useEffect(() => { }, [wallet, portfolio])
    let getCurrentPrice = (name) => {
        return data.filter(coin => coin.name.toLowerCase() === name.toLowerCase())[0].currentPrice
    }

    return (
        <div className="header">
            <h1>Earn some Virtual Money <img src="./images/bag.png" alt="money bag" /></h1>
            <p>To Buy Virtual Food <img src="./images/pizza-slice.png" alt="pizza" /></p>
            <h3> <img src="/images/bank.png" alt="bank" /> Wallet: ${wallet}</h3>
            <h2>Portfolio Value: ${portfolio.reduce((sum, coin) => sum + (coin.currentHolding * getCurrentPrice(coin.name)), 0)}</h2>
        </div>
    )
}