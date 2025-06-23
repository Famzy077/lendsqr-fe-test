import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div className='error-page'>
      <h1>404 <span>Error page</span></h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <p>Please check the URL or return to the <Link to={'/dashboard'}> homepage</Link> .</p>
    </div>
  )
}

export default ErrorPage
