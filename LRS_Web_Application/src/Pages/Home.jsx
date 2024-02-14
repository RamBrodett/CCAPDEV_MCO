import {Header} from '../components/Header.jsx'
import {Footer} from '../components/Footer.jsx'

export function Home(){
    return(
        <>
            <div className="Home_Container">
                <Header/> 
                    <div className="Home_Body">
                        <div className="topContent"></div>
                        <div className="bottomContent"></div>
                        {/*Put the contents here*/}
                        {/* We put real images of dlsu's computer lab */}
                        {/*then add texts about computer lab and features(capability) */}
                        
                    </div>
                <Footer/>
            </div>
        </>
    )

}

