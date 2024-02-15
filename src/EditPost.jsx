import { Link, useParams } from "react-router-dom"

import PropTypes from 'prop-types'
import { useEffect } from "react"

const EditPost = ({ posts, handleEdit, editBody, editTitle ='default', setEditBody, setEditTitle }) => {
  const { id } = useParams();
  const post = posts.find(post => (post.id).toString() === id);
  useEffect(() => {
    if (post) {
      setEditBody(post.title);
      setEditBody(post.body);
    }

  }, [post, setEditTitle, setEditBody])
  return (

    <main>
      <h2>Edit Post</h2>
      {post && <>
        <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="postTitle">Title:</label>
          <input
            id="postTitle"
            type="text"
            required
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <label htmlFor="postBody">Body:</label>
          <textarea
            id="postBody"
            type="text"
            required
            value={editBody}
            onChange={(e) => setEditBody(e.target.value)}
          />
          <button type='submit' onClick={() => handleEdit(post.id)}>Update Post</button>
        </form>
      </>}{!post &&
        <>
          <h2>Post Not Found</h2>
          <p>Well, that is disappointing </p>
          <p>
            <Link to="/">Visit our HomePage</Link>
          </p>
        </>
      }
    </main>
  )
}

EditPost.propTypes = {
  posts: PropTypes.array,
  editBody: PropTypes.string.isRequired,
  editTitle: PropTypes.string.isRequired,
  setEditBody: PropTypes.func.isRequired,
  setEditTitle: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
}

export default EditPost