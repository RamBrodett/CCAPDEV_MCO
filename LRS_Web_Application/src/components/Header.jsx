import './Component.css'

export function Header(){
    return(
        <div className="Header" >
            <h2 id="HeaderTitle">Lab Reservation System</h2>
            <div className="NavMenu">
                <a href='#'>About</a>
                <a href='#'>Book Now</a>
                <a href='#'>Sign In</a>
            </div>

        </div>
    )

}
