import { ChangeEvent, useEffect, useState } from 'react';
import { getLatestAdverts } from './service';
import Button from '../../components/shared/Button';
import { Link } from 'react-router-dom';
import Page from '../../components/layout/Page';
import FormField from '../../components/shared/FormField';
import TransactionObject from './Advert';
import type { Advert } from './types';
import placeholderImage from '../../assets/placeholder.png';
import './AdvertsPage.css';

const EmptyList = () => (
  <div className="advertsPage-empty">
    <p>The advert list is empty.</p>
    <p>Be the first one!</p>
    <Link to="/adverts/new">
      <Button $variant="primary">Create new advert</Button>
    </Link>
  </div>
);

function AdvertsPage() {
  const [adverts, setAdverts] = useState<Advert[]>([]);
  const [nameToFilter, setNameToFilter] = useState('');
  const [saleToFilter, setSaleToFilter] = useState('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');

  useEffect(() => {
    getLatestAdverts()
      .then((response) => {
        console.log('Adverts response:', response);
        setAdverts(response);
      })
      .catch((error) => console.error('Error fetching adverts:', error));
  }, []);

  const handleSearch = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNameToFilter(event.target.value);
  };

  const handleRadio = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setSaleToFilter(event.target.value);
  };

  const handleTagChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    setSelectedTags((prevTags) =>
      checked ? [...prevTags, value] : prevTags.filter((tag) => tag !== value)
    );
  };

  const handlePriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'minPrice') {
      setMinPrice(value === '' ? '' : parseInt(value));
    } else if (name === 'maxPrice') {
      setMaxPrice(value === '' ? '' : parseInt(value));
    }
  };

  const nameFilter = (advert: Advert) =>
    advert.name.toLowerCase().includes(nameToFilter.toLowerCase());

  const saleFilter = (advert: Advert) => {
    const sellBuy = advert.sale ? 'sell' : 'buy';
    return saleToFilter === 'all' || saleToFilter === sellBuy;
  };

  const tagsFilter = (advert: Advert) => {
    if (selectedTags.length === 0) return true;
    return selectedTags.every((tag) => advert.tags.includes(tag));
  };

  const priceFilter = (advert: Advert) => {
    const price = advert.price;
    const minValid = minPrice === '' || price >= minPrice;
    const maxValid = maxPrice === '' || price <= maxPrice;
    return minValid && maxValid;
  };

  const filteredAdverts =
    adverts?.filter(
      (advert: Advert) => nameFilter(advert) && saleFilter(advert) && tagsFilter(advert) && priceFilter(advert)
    ) || [];

  return (
    <Page title="Advert List">
      <FormField type="text" name="query" onChange={handleSearch} label={'Filter by name'} />

      <div className="filter-section">
        <p>Filter by transaction type:</p>
        <label>
          <input type="radio" name="sale" value="sell" onChange={handleRadio} />
          Sell
        </label>
        <label>
          <input type="radio" name="sale" value="buy" onChange={handleRadio} />
          Buy
        </label>
        <label>
          <input type="radio" name="sale" value="all" onChange={handleRadio} />
          All
        </label>
      </div>

      <div className="filter-section">
        <p>Filter by tags:</p>
        {['lifestyle', 'mobile', 'motor', 'work'].map((tag) => (
          <label key={tag}>
            <input type="checkbox" value={tag} checked={selectedTags.includes(tag)} onChange={handleTagChange} />
            {tag}
          </label>
        ))}
      </div>

      <div className="filter-section">
        <p>Filter by price range:</p>
        <label>
          Min Price:
          <input type="number" name="minPrice" value={minPrice === '' ? '' : minPrice} onChange={handlePriceChange} />
        </label>
        <label>
          Max Price:
          <input type="number" name="maxPrice" value={maxPrice === '' ? '' : maxPrice} onChange={handlePriceChange} />
        </label>
      </div>

      <div className="advertsPage">
        {filteredAdverts.length !== 0 ? (
          <div className="adsList">
            {filteredAdverts.map((advert) => (
              <div key={advert.id} className="advert">
                <Link to={`/adverts/${advert.id}`} className="advert-image">
                  <img
                    src={typeof advert.photo === 'string' ? advert.photo : placeholderImage}
                    alt={advert.name}
                  />
                </Link>

                <TransactionObject {...advert} />
              </div>
            ))}
          </div>
        ) : (
          <EmptyList />
        )}
      </div>
    </Page>
  );
}

export default AdvertsPage;
