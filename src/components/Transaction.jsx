export default function Transaction({value}){
    return (
        <div className="transaction" style = {{borderLeft:value.type==='buy'?'5px solid #34aa33':'5px solid #f44646'}}>
            <p>{value.name} - {value.qty}@{value.currentPrice}</p>
            <p>{value.type === 'buy'?'Paid':'Received'}: ${value.value}</p>
            <p>Bought on: {value.timeStamp}</p>
        </div>
    )
}