import Header from "./Header";
import ListOfCurrencies from './ListOfCurrencies'

export default function App(props){
    return (
        <div className="app">
            <Header />
            <ListOfCurrencies />
        </div>
    )
}