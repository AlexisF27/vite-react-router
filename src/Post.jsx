import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Post = ({ post }) => {
    return (
        <article className="post">
            <Link to={`/post/${post.id}`}>
                <h2>{post.title}</h2>
                <p className="postDate">{post.datetime}</p>
            </Link>
            <p className='postBody'>{(post.body).length <= 25 ? post.body : `${(post.body).slice(0,25)}... ` }</p>
        </article>
    )
}

Post.propTypes = {
    post: PropTypes.string.isRequired,
}

export default Post
