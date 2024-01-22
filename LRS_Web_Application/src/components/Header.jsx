import './Component.css'
import Icon from '../assets/Icon.png'

export function Header(){
    return(
        <div className="Header" >
            <div className='LRS-Banner'>
            <img id='LRS_Header-Icon' src={Icon}/>
            <h2 id="HeaderTitle">Lab Reservation System</h2>
            </div>
            <div className="NavMenu">
                <a href='#'>About</a>
                <a href='#'>Book</a>
                <a href='#'>Sign In</a>
            </div>

        </div>
    )

}
