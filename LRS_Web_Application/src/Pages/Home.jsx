import {Header} from '../components/Header.jsx'
import {Footer} from '../components/Footer.jsx'


export function Home(){
    return(
        <>
            <div className="Home_Container">
                <Header /> {/* Header and footer are still empty, complete it first in components */}
                    <div className="Home_Body">
                        {/*Put the contents here*/}
                        <h1>Home</h1>

                    </div>
                <Footer />
            </div>
        </>
    )

}

