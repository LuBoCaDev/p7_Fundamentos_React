import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Advert } from './types';
import { deleteAdvert, getAdvert } from './service';
import { isApiClientError } from '../../api/client';
import Page from '../../components/layout/Page';
import DeleteConfirmation from '../../components/shared/DeleteConfirmation'; 
import placeholderImage from '../../assets/placeholder.png';
import './AdvertPage.css';

function AdvertPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [advert, setAdvert] = useState<Advert | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      getAdvert(id)
        .then((data) => {
          console.log("Retrieved advert:", data);
          setAdvert(data);
        })
        .catch((error) => {
          if (isApiClientError(error) && error.code === 'NOT_FOUND') {
            navigate('/404');
          }
          console.log("Error getting advert:", error);
        });
    }
  }, [id, navigate]);

  const handleDelete = async () => {
    if (!advert || !id) return;
    setLoading(true);
    try {
      await deleteAdvert(id);
      navigate('/adverts');
    } catch (error) {
      console.log('Error deleting advert:', error);
    } finally {
      setLoading(false);
      setShowConfirmation(false);
    }
  };

  return (
    <Page title="Advert Detail">
      {advert ? (
        <div className="advert-details">
          <h2>{advert.name}</h2>
          <img
            src={typeof advert.photo === 'string' ? advert.photo : placeholderImage}
            alt={advert.name}
          />
          <p><strong>Price:</strong> {advert.price} €</p>
          <p><strong>Type:</strong> {advert.sale ? 'SALE' : 'BUY'}</p>
          <p><strong>Tags:</strong> {advert.tags.join(', ')}</p>
          <button onClick={() => setShowConfirmation(true)}>Delete Advert</button>
          {showConfirmation && (
            <DeleteConfirmation
              message="Do you really want to delete your advert?"
              onConfirm={handleDelete}
              onCancel={() => setShowConfirmation(false)}
              loading={loading}
            />
          )}
        </div>
      ) : (
        <p>Loading advert details...</p>
      )}
    </Page>
  );
}

export default AdvertPage;
