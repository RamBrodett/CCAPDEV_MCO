import './ADStyle.css'
import PropTypes from 'prop-types';

export function AccDisplay(props){
    const {name,accLoggedIn} = props;

    if(!accLoggedIn) return null;

    return(
        <div className="accDisp">
            <span id='AccLogo'></span>
            <span id='AccDisplayName'>{name}</span>
        </div>

    )

}

AccDisplay.propTypes = {
    name: PropTypes.string,
    accLoggedIn: PropTypes.bool.isRequired,
};