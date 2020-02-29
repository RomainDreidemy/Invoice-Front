import React from 'react';
import PictoSearch from './img/search.png';
import './NavigationAlt.scss';

function NavigationAlt(){
    return (
        <div id="NavigationAlt">
            <input type="text" placeholder="Seacrh"/>
            <img src={PictoSearch} alt="Search"/>
            <div className="profile">

            </div>
        </div>
    )
}

export default NavigationAlt;