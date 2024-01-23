import './Component.css'
import Icon from '../assets/Icon.png'
import { Link } from 'react-router-dom'

export function Header(){
    return(
        <div className="Header" >
            <div className='LRS-Banner'>
            <img id='LRS_Header-Icon' src={Icon}/>
            <h2 id="HeaderTitle">Computer Lab Reservation System</h2>
            </div>
            <div className="NavMenu">
                <Link to='/'> Home </Link>
                <Link to='/Booking'> Book </Link>
                <Link to='/login'> Log in </Link> {/*Turns into logout when logged in*/}
                {/* <div classname='Account'>
                    <UserIcon/>
                    <UserName>
                </div>  (** make this only show when logged in)*/ }
            </div>

        </div>
    )

}
