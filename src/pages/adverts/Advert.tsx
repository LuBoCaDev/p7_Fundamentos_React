import { Link } from 'react-router-dom';
import type { Advert } from './types';
import './Advert.css';

const TransactionObject = ({ name, sale, price, tags, id }: Advert) => {
  return (
    <div className="advert-container" key={id}>
      <Link to={`/adverts/${id}`}>
        <p className="ad-name">{name}</p>
      </Link>

      <span className="separator"></span>
      <p className="ad-price">{price}</p>
      <p className="ad-sale">{sale ? 'sell' : 'buy'}</p>
      <p className="ad-tags">{tags.join(', ')}</p>
    </div>
  );
};

export default TransactionObject;
