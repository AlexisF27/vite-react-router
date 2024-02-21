import Feed from './Feed'
import PropTypes from 'prop-types'

// eslint-disable-next-line no-unused-vars
export const Home = ({posts, setPosts, fetchError, isLoading}) => {
  return (
      <main className='Home'>
        {isLoading && <p className='statusMsg'> Loading Posts...</p>}
        {!isLoading && fetchError && <p className='statusMsg' style={{color: "red"}}>{fetchError}</p>}
        {!isLoading && !fetchError && (posts.length ? <Feed posts={posts}/> : <p className='statusMsg'> No post to display</p>)}
      </main>
  )
}

Home.propTypes = {
  posts: PropTypes.array.isRequired,
  setPosts: PropTypes.func.isRequired,
  fetchError: PropTypes.string,
  isLoading: PropTypes.bool,
}
export default Home