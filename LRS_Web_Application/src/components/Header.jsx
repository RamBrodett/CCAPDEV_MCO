import './Component.css'
import Icon from '../assets/Icon.png'

export function Header(){
    return(
        <div className="Header" >
            <div className='LRS-Banner'>
            <img id='LRS_Header-Icon' src={Icon}/>
            <h2 id="HeaderTitle">Computer Lab Reservation System</h2>
            </div>
            <div className="NavMenu">
                <a href='#'>Home</a>
                <a href='#'>Book</a>
                <a id='credStat' href='#'>Sign in</a> {/*Turns into logout when logged in*/}
                {/* <div classname='Account'>
                    <UserIcon/>
                    <UserName>
                </div>  (** make this only show when logged in)*/ }
            </div>

        </div>
    )

}
