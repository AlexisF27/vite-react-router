import { createContext, useEffect, useState } from 'react'

import  DataContext from './context/DataContext'
import  {useContext} from 'react'

export const NewPost = () => {
    const [postTitle, setPostTitle] = useState('')
    const [postBody, setPostBody] = useState('')
    const { handleSubmit } = useContext(DataContext)
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


export default NewPost
