import React from 'react';
import { Link } from 'react-router';

export default function NotFound() {
  return (
    <div className='not-found'>
      <h2>Page Not Found</h2>
      <p>Sorry, the page you&apos;re looking for doesn&apos;t exist.</p>
      <Link to='/'>Return to Home</Link>
    </div>
  );
}
