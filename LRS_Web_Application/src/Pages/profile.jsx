import '../components/style.css'
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { useParams } from 'react-router-dom' 



export function Profile(){
    return(
        <div id="profile_Container">
            <Header/>
            <div id="profile_body">
                
            </div>
            <Footer />
        </div>
    )

}