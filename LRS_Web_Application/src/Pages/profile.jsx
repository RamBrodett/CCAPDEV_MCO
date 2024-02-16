import '../components/style.css'
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { useParams } from 'react-router-dom' 
import { useState } from 'react';



export function Profile(){
    const { userId } = useParams();
    const [userData, setUserData] = useState(null);

    return(
        <div id="profile_Container">
            <Header/>
            <div id="profile_body">
                
            </div>
            <Footer />
        </div>
    )

}