import {Header} from '../components/Header.jsx'
import {Footer} from '../components/Footer.jsx'

export function Checkout(){
    return(
        <div className="checkoutContainer">
            <Header/>
            <div className="checkoutBody">
                {/* checking out leads to login page with option at the bottom to reserver anonymously*/}
            </div>
            <Footer />
        </div>
    )
}