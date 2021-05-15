import { useContext, useEffect } from "react"
import {CryptoContext} from '../contexts/CryptoContext'

export default function Header() {
    let { data, wallet, portfolio } = useContext(CryptoContext)

    useEffect(() => { }, [wallet, portfolio])
    let getCurrentPrice = (name) => {
        return data.filter(coin => coin.name.toLowerCase() === name.toLowerCase())[0].currentPrice
    }

    return (
        <div className="header">
            <h1>Earn some Virtual Money 💰</h1>
            <p>To Buy Virtual Food 🍕</p>
            <h3>🏛 Wallet: ${wallet}</h3>
            <h2>Portfolio Value: ${portfolio.reduce((sum, coin) => sum + (coin.currentHolding * getCurrentPrice(coin.name)), 0)}</h2>
        </div>
    )
}