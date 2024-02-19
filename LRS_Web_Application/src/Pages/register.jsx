/*
Author: Ram David Brodett
*/

import {useState} from 'react'
import XIcon from '../Assets/x_icon.png'
import { Link } from 'react-router-dom'
import { BHeader } from '../Components/basicHeader'
import { BFooter } from '../Components/basicFooter'
import '../Styles/Log_Reg.css'

export function Register(){
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errorMessage, setErrorMessage] = useState('');

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

        if(formData.password !== formData.confirmPassword){
            setErrorMessage('Passwords do not match!');
            return;
        }

        setErrorMessage('');

        console.log('Form submitted: ', formData); {/*TESTING THE DATA*/}
    }

    return(
        <div className="Register_Container">
            <div className="Register_Background">
            </div>
            <div className="RegisterContent">
                <BHeader/>
                <div className="RegisterBody">
                    <div className='Register_form'>
                        <div id='Top' >
                            <h2>Sign Up</h2> 
                            <Link id='exitLogin' to='/'><img src={XIcon}/></Link>
                        </div>
                        <div id='Center'> 
                            <div className="nameform">
                                <div className='FirstName'>
                                    <label htmlFor="firstname">First Name</label>
                                    <input
                                        type='text'
                                        name='fname'
                                        id='fname'
                                        value={formData.fname}
                                        onChange={handleInputChange}
                                        required
                                        placeholder='First Name'
                                    />

                                </div>
                                <div className="LastName">
                                    <label htmlFor="lastname">Last Name</label>
                                    <input
                                        type='text'
                                        name='lname'
                                        id='lname'
                                        value={formData.lname}
                                        onChange={handleInputChange}
                                        required
                                        placeholder='Last Name'
                                    />
                                </div>
                            </div>
                            <div className='emailform'>
                                <div id='email-signup'>
                                    <label htmlFor='email'>Email</label>
                                </div>
                                <input 
                                    type='email' 
                                    name='email' 
                                    id='emailReg' 
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
                                    id='passwordReg' 
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required/>

                                <label  id='passwordReg1Label'
                                    htmlFor='confirmPassword'>Confirm password</label>
                                <input type='password' 
                                    name='confirmPassword' 
                                    id='passconfirm' 
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    required/>
                            </div>
                            {errorMessage && <div className="error-message">{errorMessage}</div>}
                        </div>
                        <div id='Bottom'>
                            <button id='RegButton' onClick={handleFormSubmit}>Sign up</button>
                        </div>
                    </div>
                </div>
                <BFooter/>
            </div>
        </div>
    )
}