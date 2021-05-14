import {useContext} from 'react'
import CryptoContext from '../contexts/CryptoContext'
import Holding from './Holding'

export default function CurrentHoldings(){
    let {data, portfolio} = useContext(CryptoContext)
    return (
        <div className="current-holdings">
            <h1>Current Holdings</h1>
            {portfolio.map((coin,idx) => <Holding coin = {coin} data = {data} key = {idx}/>)}
        </div>
    )
}