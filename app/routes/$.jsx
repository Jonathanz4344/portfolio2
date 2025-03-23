import { useEffect, useState } from 'react';
import { Error } from '~/layouts/error';

export default function NotFound() {
  const [error, setError] = useState({
    status: 404,
    statusText: 'Not found',
    data: null
  });

  useEffect(() => {
    // Set document title
    document.title = '404 | Redacted';
  }, []);

  return <Error error={error} />;
}