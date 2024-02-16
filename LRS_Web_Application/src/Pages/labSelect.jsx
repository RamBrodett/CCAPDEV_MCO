import React,{ useState } from "react";
import { Header } from '../components/Header.jsx';
import { Footer } from '../components/Footer.jsx';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export function LabSelect() {
    const [selectedLab, setSelectedLab] = useState('');
    const [selectRow, setSelectRow] = useState('');
    const [selectCol, setSelectCol] = useState('');

    const navigate = useNavigate();

    const handleSelectChange = (event) => {
        const selectedLab = event.target.value;
        if (selectedLab) {
            navigate(`/book`);
        }
        setSelectedLab(selectedLab);
        // Set selectRow and selectCol based on the selected laboratory
        if (selectedLab === 'Velasco-205-206') {
            setSelectRow(8);
            setSelectCol(3);
        } else if (selectedLab === 'LS-Hall-229') {
            setSelectRow(9);
            setSelectCol(3);
        } else {
            // Reset selectRow and selectCol for other laboratories
            setSelectRow('');
            setSelectCol('');
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