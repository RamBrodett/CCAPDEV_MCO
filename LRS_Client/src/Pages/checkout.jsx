
import {useState} from 'react'
import {Header} from '../Components/Header.jsx'
import {Footer} from '../Components/Footer.jsx'
import XIcon from '../Assets/x_icon.png'
import { Link } from 'react-router-dom'
import '../Styles/checkout.css'

export function Checkout(){
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
        <div className="bookBody">
    <Header />
    <div className="booking">
        <div className="center">
        <div id="checkoutBox"></div>
        </div>
        <div className='Login_form' id="checkout_form">
        <div id='Top'>
            <h2>Log in</h2>
            <Link id='exitLogin' to='/'><img src={XIcon} alt="Exit Login" /></Link>
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
                placeholder='example@email.com' />
            </div>
            <div className='passwordform'>
            <label htmlFor='password'>Password</label>
            <input
                type='password'
                name='password'
                id='password'
                value={formData.password}
                onChange={handleInputChange}
                required />
            </div>
        </div>
        <div className='rememberMeCheckbox' id="checkoutAnon">
            <label htmlFor='rememberMe'><a href="">checkout anonymously instead</a></label>
        </div>
        <div id='Bottom'>
            <button id='LoginButton' onClick={handleFormSubmit}>Log in</button>
        </div>
        </div>
    </div>
    <Footer />
    </div>
    )
}