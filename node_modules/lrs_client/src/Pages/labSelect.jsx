import React,{ useState } from "react";
import { Header } from '../Components/Header.jsx';
import { Footer } from '../Components/Footer.jsx';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../Styles/labselect.css'

export function LabSelect() {
    const navigate = useNavigate();
    const [selectedLab, setSelectedLab] = useState(''); // Initialize selectedLab state variable


    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedLab(selectedValue);
        localStorage.setItem('selectedLab', selectedValue);
        navigate(`/book`);
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
                                <option value="Velasco 205">Velasco 205</option>
                                <option value="Velasco 206">Velasco 206</option>
                                <option value="LS Hall 212">LS Hall 212</option>
                                <option value="LS Hall 229">LS Hall 229</option>
                                <option value="Gokongwei 306A">Gokongwei 306A</option>
                                <option value="Gokongwei 306B">Gokongwei 306B</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}