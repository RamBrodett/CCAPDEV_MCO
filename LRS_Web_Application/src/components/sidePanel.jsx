import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import './spStyle.css'

export const SidePanel=({visibility, onClose}) => {

    const containerClassName = `sidepanelContainer ${visibility ? 'active' : ''}`;

    return(
        <div className={containerClassName}>
            <div id="sidepanelContent">
                <div id="sidepanelClose">
                    <button onClick={onClose}>close</button>
                </div>
                <Link to='/profile'>Profile</Link>
                <Link to='/settings'>Settings</Link>
            </div>
        </div>
    )
}

SidePanel.propTypes = {
    onClose: PropTypes.func,
    visibility: PropTypes.bool,
}