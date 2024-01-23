import Icon from '../assets/Icon.png'
import XIcon from '../assets/x_icon.png'
import { Link } from 'react-router-dom'

export function Login(){
    return(
        <div className="Login_Container">
            <div className="Login_Blackground">
            </div>
            <div className="LoginContent">
                <div className="Header">
                    <div className='LRS-Banner'>
                        <img id='LRS_Header-Icon' src={Icon}/>
                        <h2 id="HeaderTitle">Computer Lab Reservation System</h2>
                    </div>
                </div>
                <div className="LoginBody">
                    <div className='Login_form'>
                        <div id='Top' >
                            <h2>Log in</h2> 
                            <Link id='exitLogin' to='/'><img src={XIcon}/></Link>
                        </div>
                        <div id='Center'> 
                            <div className='emailform'>
                                <div id='email-signup'>
                                    <label htmlFor='email'>Email</label>
                                    <p>Need an account?</p>
                                    <Link id='link' to='/register'> Sign up </Link>
                                </div>
                                <input type='email' name='email' id='email'/>
                            </div>
                            <div className='passwordform'>
                                <label htmlFor='password'>Password</label>
                                <input type='password' name='password' id='password'/>
                            </div>
                        </div>
                        <div id='Bottom'>
                            <button id='LoginButton'>Log in</button>
                        </div>
                    </div>
                </div>
                <div className="Footer">
                    <footer className="Note">
                        <p id='cred1'>Background by starline on Freepik</p>
                        <p>TechQuiver Reservations &copy; {new Date().getFullYear()}</p>
                    </footer>
                </div>
            </div>
        </div>
    )
}