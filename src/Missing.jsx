import { Link } from 'react-router-dom';
export const Missing = () => {
  return (
    <main className='Missing'>
      <h2>Page not found</h2>
      <p>Missing</p>
      <p>
        <Link to='/'>Visit our Homepage</Link>
      </p>
    </main>
  )
}

export default Missing