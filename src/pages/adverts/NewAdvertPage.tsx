import { ChangeEvent, useState } from 'react';
import Button from '../../components/shared/Button';
import { createAdvert } from './service';
import { useNavigate } from 'react-router-dom';
import { NewAdvert } from './types';
import { isApiClientError } from '../../api/client';
import FormField from '../../components/shared/FormField';
import './NewAdvertPage.css';
import Page from '../../components/layout/Page';

function NewAdvertPageForm() {
  const navigate = useNavigate();
  const [advert, setAdvert] = useState<NewAdvert>({
    name: '',
    sale: true,
    price: 0,
    tags: [],
    photo: null,
  });

  const { name, price, tags } = advert;
  const isDisabled = !name || price <= 0 || tags.length === 0;

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, files, checked } = event.target as HTMLInputElement;

    setAdvert((prevAdvert) => {
      if (type === 'file' && files) {
        return { ...prevAdvert, photo: files[0] };
      }

      if (type === 'checkbox') {
        const newTags = checked
          ? [...prevAdvert.tags, value]
          : prevAdvert.tags.filter((tag) => tag !== value);
        return { ...prevAdvert, tags: newTags };
      }

      if (name === 'price') {
        return { ...prevAdvert, price: Number(value) };
      }

      if (name === 'sale') {
        return { ...prevAdvert, sale: value === 'true' };
      }

      return {
        ...prevAdvert,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Submit event fired');

    const formData = new FormData();
    formData.append('name', advert.name);
    formData.append('sale', String(advert.sale));
    formData.append('price', String(advert.price));
    advert.tags.forEach((tag) => formData.append('tags', tag));
    if (advert.photo) {
      formData.append('photo', advert.photo);
    }

    try {
      const createdAdvert = await createAdvert(formData);
      navigate(`/adverts/${createdAdvert.id}`);
    } catch (error) {
      if (isApiClientError(error) && error.code === 'UNAUTHORIZED') {
        navigate('/login');
      }
      console.log(error);
    }
  };

  return (
    <Page title="Create your advert">
      <form className="newAdvertPage-form" onSubmit={handleSubmit}>
        <FormField
          type="text"
          name="name"
          label="Name of your item"
          className="name"
          value={advert.name}
          onChange={handleChange}
          required
        />

        <FormField
          type="radio"
          name="sale"
          label="Sell"
          className="sale"
          value="true"
          onChange={handleChange}
          checked={advert.sale === true}
        />

        <FormField
          type="radio"
          name="sale"
          label="Buy"
          className="sale"
          value="false"
          onChange={handleChange}
          checked={advert.sale === false}
        />

        <FormField
          type="number"
          name="price"
          label="Price of your item"
          className="price"
          value={advert.price}
          onChange={handleChange}
          required
        />

        <div className="formField">
          <span>Tags</span>
          <label>
            <input
              type="checkbox"
              name="tags"
              value="lifestyle"
              checked={advert.tags.includes('lifestyle')}
              onChange={handleChange}
            />
            Lifestyle
          </label>
          <label>
            <input
              type="checkbox"
              name="tags"
              value="mobile"
              checked={advert.tags.includes('mobile')}
              onChange={handleChange}
            />
            Mobile
          </label>
          <label>
            <input
              type="checkbox"
              name="tags"
              value="motor"
              checked={advert.tags.includes('motor')}
              onChange={handleChange}
            />
            Motor
          </label>
          <label>
            <input
              type="checkbox"
              name="tags"
              value="work"
              checked={advert.tags.includes('work')}
              onChange={handleChange}
            />
            Work
          </label>
        </div>

        <FormField
          type="file"
          name="photo"
          label="Photo"
          className="photo"
          onChange={handleChange}
        />

        <Button className="button" type="submit" $variant="primary" disabled={isDisabled}>
          Create Advert
        </Button>
      </form>
    </Page>
  );
}

export default NewAdvertPageForm;
