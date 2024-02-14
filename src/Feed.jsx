import Post from './Post'
import PropTypes from 'prop-types'
// eslint-disable-next-line no-unused-vars
const Feed = ({posts}) => {
  return (
    <>
      {posts.map(post => (
        <Post key ={post.id} post={post} />
      ))}
    </>
  )
}

Feed.propTypes = {
  posts: PropTypes.string.isRequired,
}

export default Feed