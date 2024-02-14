import Feed from './Feed'
import PropTypes from 'prop-types'

// eslint-disable-next-line no-unused-vars
export const Home = ({posts, setPosts}) => {
  return (
      <main className='Home'>
        {posts.length ? (<Feed posts={posts}/>) : (<p style={{marginTop: "2rem"}}> No post to display</p>)}
      </main>
  )
}

Home.propTypes = {
  posts: PropTypes.array.isRequired,
  setPosts: PropTypes.func.isRequired,
}
export default Home