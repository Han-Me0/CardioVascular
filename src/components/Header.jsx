import React from 'react';
import '../styles/Navigation.css'; // Import CSS for styling


function Header() {
    const refresh = () => {
        window.location.reload();
    };

    return (
        <header class="navigation-header">
            <button className="navigation-pageName" type="button" onClick={refresh}>
                CardioVascularView
            </button>
            <div className="butt">
                {/* Navigation buttons can go here if needed */}
            </div>
            <h2 className="tagline">
                Prevalence Rate of Cardiovascular Diseases in the UK
            </h2>
        </header>
    );
}

export default Header;
