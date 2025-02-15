import { Link } from 'react-router-dom';
import Page from '../../components/layout/Page';
import './NotFoundPage.css';

function NotFoundPage() {
    return (
        <Page title="404 Not Found">
        <div className="not-found">
            <h2>Oops! Page not found.</h2>
            <p>The page you are looking for does not exist.</p>
            <Link to="/adverts">
            <button>Go back to adverts</button>
            </Link>
        </div>
        </Page>
    );
}

export default NotFoundPage;