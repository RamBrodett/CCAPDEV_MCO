import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { useAuth } from '../AuthContext.jsx';
import '../Styles/sidePanelStyle.css'


export const SidePanel=({visibility, onClose}) => {

    const containerClassName = `sidepanelContainer ${visibility ? 'active' : ''}`;
    const {user} = useAuth();
    return(
        <div className={containerClassName}>
            <div id="sidepanelContent">
                <div id="sidepanelClose">
                    <button onClick={onClose}>close</button>
                </div>
                <Link to={`/profile/${user.firstname}-${user.lastname}+${user.userID}`}>Profile</Link>
                <Link to={`/settings`}>Settings</Link>
            </div>
        </div>
    )
}

SidePanel.propTypes = {
    onClose: PropTypes.func,
    visibility: PropTypes.bool,
    userId: PropTypes.number,
}