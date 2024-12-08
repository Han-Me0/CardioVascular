import { Link } from 'react-router-dom';
import '../styles/Navigation.css'; // Import CSS for styling

function Navigation() {
    return (
        <nav className="navigation">
            <ul className="nav-list">
                <li className="nav-item">
                    <Link to="/" className="nav-link">World Map</Link>
                </li>
                <li className="nav-item">
                    <Link to="/uk-map" className="nav-link">UK Map</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;
