/*
Author: Ram David Brodett
*/
import '../Styles/ADStyle.css'
import PropTypes from 'prop-types';
import { useAuth } from '../AuthContext.jsx';

export function AccDisplay(){
    const {user} = useAuth();

    if(!user.isLoggedIn){
        return null;}

    return(
        <div className="accDisp">
            <span id='AccLogo'></span>
            <span id='AccDisplayName'>{user.fname}</span>
        </div>

    )

}

AccDisplay.propTypes = {
    name: PropTypes.string,
};