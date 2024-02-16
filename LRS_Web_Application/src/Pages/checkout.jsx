import {Header} from '../components/Header.jsx'
import {Footer} from '../components/Footer.jsx'

export function Checkout(){
    return(
        <div className="bookBody">  
            <Header />
            <div className="booking">
                <div className="center">
                    <div className="tickets" id="checkoutContainer"> 
                        <div id="checkoutBox">
                            
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}