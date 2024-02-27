/*
Author: Ram David Brodett
*/

import '../Styles/Header_Footer.css'

export function BFooter(){
    return(
        <div className="Footer">
                    <footer className="Note">
                        <p id='cred1'>Background by starline on Freepik</p>
                        <p>TechQuiver Reservations &copy; {new Date().getFullYear()}</p>
                    </footer>
                </div>
    )
}