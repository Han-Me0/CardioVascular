import { Link } from 'react-router-dom';

function Navigation() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to='/'>World Map</Link>
                </li>
                <li>
                    <Link to='/uk-map'>UK Map</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;