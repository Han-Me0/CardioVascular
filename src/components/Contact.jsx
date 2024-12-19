import React from "react";
import '../styles/Contact.css'; // Import CSS for styling

function Contact() {
    return (
        <div className="box-container">
            <section className="contact-container">
                <h2>Contact</h2>
                <h3>Find us at:</h3>
                <p><i className="fa fa-map-marker" aria-hidden="true"></i> Data Mining <br /> Johannes Gutenberg University<br />Staudingerweg 9, 55128 Mainz, Germany</p>
                <p><i className="fa fa-envelope" aria-hidden="true"></i> <a href="mailto:hlane@uni-mainz.de">hlane@uni-mainz.de</a></p>
                <p><i className="fa fa-linkedin" aria-hidden="true"></i> <a href="https://www.linkedin.com/search/results/all/?fetchDeterministicClustersOnly=true&heroEntityKey=urn%3Ali%3Aorganization%3A76533930&keywords=nightingale%20project&origin=RICH_QUERY_SUGGESTION&position=0&searchId=a4520a12-e02e-45d9-8412-5b309efcde81&sid=LA5&spellCorrectionEnabled=false" target="_blank" rel="noopener noreferrer">Our LinkedIn</a></p>
            </section>
        </div>
    );
}

export default Contact;
