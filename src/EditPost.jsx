import { Link, useParams } from "react-router-dom"

import  DataContext from './context/DataContext'
import  {useContext} from 'react'
import { useEffect } from "react"

const EditPost = () => {
  const { posts, handleEdit, editBody, editTitle, setEditBody, setEditTitle } = useContext(DataContext)
  const { id } = useParams();
  const post = posts.find(post => (post.id).toString() === id);
  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
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



export default EditPost