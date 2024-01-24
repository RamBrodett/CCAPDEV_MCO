import './style.css'
export function Footer(){
    return(
        <div className="Footer" >
            <footer className="Note">
                <p>TechQuiver Reservations &copy; {new Date().getFullYear()}</p>
                <p></p>
            </footer>
        </div>
    )

}