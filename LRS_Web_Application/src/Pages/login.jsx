/*
Author: Ram David Brodett
*/
import {useState} from 'react'
import XIcon from '../assets/x_icon.png'
import { Link } from 'react-router-dom'
import { BHeader } from '../components/basicHeader.jsx'
import { BFooter } from '../components/basicFooter.jsx'

export function Login(){

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleInputChange = (e) =>{
        const {name , value} = e.target;
        setFormData((prevData) =>({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        {/*PUT LOGIC FOR FORM SUBMISSION*/}
        console.log('Form submitted: ', formData); {/*TESTING THE DATA*/}
    };

    return(
        <div className="Login_Container">
            <div className="Login_Background">
            </div>
            <div className="LoginContent">
                <BHeader/>
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
                                <input 
                                    type='email'
                                    name='email'
                                    id='email' 
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required 
                                    placeholder='example@email.com'/>
                            </div>
                            <div className='passwordform'>
                                <label htmlFor='password'>Password</label>
                                <input 
                                type='password' 
                                name='password' 
                                id='password' 
                                value={formData.password}
                                onChange={handleInputChange}
                                required/>
                            </div>
                        </div>
                        <div id='Bottom'>
                            <button id='LoginButton' onClick={handleFormSubmit}>Log in</button>
                        </div>
                    </div>
                </div>
                <BFooter/>
            </div>
        </div>
    )
}