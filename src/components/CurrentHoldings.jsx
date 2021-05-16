import {useContext} from 'react'
import {CryptoContext} from '../contexts/CryptoContext'
import Holding from './Holding'

export default function CurrentHoldings(){
    let {data, portfolio} = useContext(CryptoContext)
    let activeHoldings = portfolio.filter(coin => coin.currentHolding>0)
    return (
        <div className="current-holdings">
            <h1>Current Holdings</h1>
            {!activeHoldings.length && <p>Go buy some 🚀</p>}
            {activeHoldings.length > 0 && portfolio.map((coin,idx) => <Holding coin = {coin} data = {data} key = {idx}/>)}
        </div>
    )
}