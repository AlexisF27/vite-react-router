import PropTypes from 'prop-types'

export const NewPost = ({ postBody, postTitle, setPostBody, setPostTitle, handleSubmit }) => {
    return (
        <form className="newPostForm" onSubmit={handleSubmit}>
            <label htmlFor="postTitle">Title:</label>
            <input
                id="postTitle"
                type="text"
                required
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
            />
            <label htmlFor="postBody">Body:</label>
            <textarea
                id="postBody"
                type="text"
                required
                value={postBody}
                onChange={(e) => setPostBody(e.target.value)}
            />
            <button type='submit'>Create Post</button>
        </form>
    )
}
NewPost.propTypes = {
    postBody: PropTypes.string.isRequired,
    postTitle: PropTypes.string.isRequired,
    setPostBody: PropTypes.func.isRequired,
    setPostTitle: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
}

export default NewPost
