import React,{ useState } from "react";
import { Header } from '../Components/Header.jsx';
import { Footer } from '../Components/Footer.jsx';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../Styles/labselect.css'

export function LabSelect() {
    const navigate = useNavigate();

    const handleSelectChange = (event) => {
        const selectedLab = event.target.value;
        if (selectedLab) {
            navigate(`/book`);
        }
        setSelectedLab(selectedLab);
        //
        if (selectedLab === 'Velasco-205-206') {

        } else if (selectedLab === 'LS-Hall-229') {

        } else {
            //
            
        }
    };
    return (
        <div className="bookBody">  
            <Header />
            <div className="booking">
                <div className="center">
                    <div className="tickets" id="labSelectorBoxBox"> 
                        <span id="selectorHeader">CHOOSE A LABORATORY:</span>
                        <div id="labSelectorBox">
                            <select id="labSelectDropdown" onChange={handleSelectChange}>
                                <option value="">Select Laboratory</option>
                                <option value="Velasco-205-206" href="/login.jsx">Velasco 205-206</option>
                                <option value="LS-Hall-212">LS Hall 212</option>
                                <option value="LS-Hall-229">LS Hall 229</option>
                                <option value="Gokongwei-306AB">Gokongwei 306AB</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}