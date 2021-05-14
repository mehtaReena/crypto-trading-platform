export default function Transaction({value}){
    return (
        <div className="transaction">
            <p>{value.name} - {value.qty}@{value.currentPrice}</p>
            <p>{value.type === 'buy'?'Paid':'Received'}: ${value.value}</p>
            <p>Bought on: {value.timeStamp}</p>
        </div>
    )
}