import { createContext, useState } from 'react'

import PropTypes from 'prop-types'
import api from '../api/posts'
import { format } from 'date-fns'
import useAxiosFetch from '../hooks/useAxiosFetch'
import { useHistory } from 'react-router'

const DataContext = createContext({});


export const DataProvider = ({ children }) => {
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState('')

  const [editTitle, setEditTitle] = useState('')
  const [editBody, setEditBody] = useState('')
  const [posts, setPosts] = useState([])
  // eslint-disable-next-line no-unused-vars
  const [findPost, setFindPost] = useState([]);
  const history = useHistory()
  const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts');

  useEffect(() => {
    setPosts(data);
  }, [data])

  useEffect(() => {
    const filteredResults = posts.filter(post =>
      ((post.body).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase()));
    setSearchResults(filteredResults.reverse());
  }, [posts, search])

  const handleId = (id) => {
    setFindPost(posts.find((post) => post.id.toString() === id))
  }

  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp')
    const editedPost = { id, title: editTitle, datetime, body: editBody }
    try {
      const response = await api.put(`/posts/${id}`, editedPost);
      setPosts(posts.map(post => post.id === id ? { ...response.data } : post))
      setEditBody('')
      setEditTitle('')
      history.push('/')
    } catch (error) {
      console.log(`Error:${error.message}`)
    }
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`)
      const postToDelete = posts.filter((post) => post.id !== id)
      setPosts(postToDelete)
      history.push('/')
    } catch (error) {
      console.log(`Error:${error.message}`)

    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const datetime = format(new Date(), 'MMMM dd, yyyy pp')
    const newPost = { title: postTitle, datetime, body: postBody }
    try {
      const response = await api.post('/posts', newPost);
      const allPosts = [...posts, response.data]
      setPosts(allPosts)
      setPostTitle('')
      setPostBody('')
      history.push('/')
    } catch (error) {
      console.log(`Error:${error.message}`)
    }
  }

  return (
    <DataContext.Provider value={{
      search, setSearch, searchResults, setPosts, fetchError, isLoading, postBody, postTitle,
      setPostBody, setPostTitle, handleSubmit, posts, handleEdit, editBody, editTitle, setEditBody, 
      setEditTitle, handleDelete, handleId
    }}>
      {children}
    </DataContext.Provider>
  )

}

export default DataProvider

DataProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.func,
    // Add more data types as needed
  ]),
}
