/*
Author: Ram David Brodett
*/
import {useState} from 'react'
import { Link } from 'react-router-dom'
import XIcon from '../Assets/x_icon.png'
import { BHeader } from '../Components/basicHeader.jsx'
import { BFooter } from '../Components/basicFooter.jsx'
import '../Styles/Log_Reg.css'
import { useAuth} from '../AuthContext.jsx'

export function Login(){
    const {setLoggedIn} = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });

    const handleInputChange = (e) =>{
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await fetch('http://localhost:3000/login',{
                method : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),

            });

            if (response.ok){
                const { success, userData } = await response.json();
                console.log(success, userData);
                setLoggedIn(userData)

            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
        
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
                        <div className='rememberMeCheckbox'>
                                <input
                                    type='checkbox'
                                    name='rememberMe'
                                    id='rememberMe'
                                    checked={formData.rememberMe}
                                    onChange={handleInputChange}
                                />
                                <label htmlFor='rememberMe'>Remember Me</label>
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