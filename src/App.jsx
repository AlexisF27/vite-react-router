// eslint-disable-next-line no-unused-vars
import { Route, Switch, useHistory } from 'react-router'
// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from 'react'

import About from './About'
import EditPost from './EditPost'
import Footer from './Footer'
import Header from './Header'
import Home from './Home'
import Missing from './Missing'
import Nav from './Nav'
import NewPost from './NewPost'
import PostPage from './PostPage'
import api from './api/posts'
import { format } from 'date-fns'

function App() {
    const [search, setSearch] = useState('')
    // eslint-disable-next-line no-unused-vars
    const [searchResults, setSearchResults] = useState('')
    const [postTitle, setPostTitle] = useState('')
    const [postBody, setPostBody] = useState('')
    const [editTitle, setEditTitle] = useState('')
    const [editBody, setEditBody] = useState('')
    const [posts, setPosts] = useState([])
    const history = useHistory()

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await api.get('/posts')
                setPosts(response.data);
            } catch (err) {
                if (err.response) {
                    console.log(err.response.data);
                    console.log(err.response.staus);
                    console.log(err.response.headers);
                } else {
                    console.log(`Error: ${err.message}`)
                }
            }
        }
        fetchPosts()
    }, [])

    useEffect(() => {
        const filteredResults = posts.filter(post =>
            ((post.body).toLowerCase()).includes(search.toLowerCase())
            || ((post.title).toLowerCase()).includes(search.toLowerCase()));
        setSearchResults(filteredResults.reverse());
    }, [posts, search])

    const handleEdit = async (id) => {
        const datetime = format(new Date(), 'MMMM dd, yyyy pp')
        const post = posts.find((post) => post.id.toString() === id)

        const updatedPost = { id, title: post.title , datetime, body: post.body }
        console.log(updatedPost);
        try {
            const response = await api.put(`/posts/${id}`, updatedPost);
            console.log(response);
            setPosts(posts.map(post => post.id === id ? { ...response.data } : post))
            setEditBody('')
            setEditTitle('')
            history.push('/')

        } catch (error) {
            console.log(`Error:${error.message}`)
            // eslint-disable-next-line no-debugger

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
            // eslint-disable-next-line no-debugger

        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        // eslint-disable-next-line no-unused-vars
        const id = posts.length ? posts[posts.length - 1].id + 1 : 1
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
        <div className="App">
            <Header title="React JS Blog" />
            <Nav search={search} setSearch={setSearch} />
            <Switch>
                <Route exact path="/">
                    <Home posts={[...searchResults]} setPosts={setPosts} />
                </Route>
                <Route path="/about" component={About} />
                <Route path="/missing" component={Missing} />
                <Route exact path="/post">
                    <NewPost
                        postBody={postBody}
                        postTitle={postTitle}
                        setPostBody={setPostBody}
                        setPostTitle={setPostTitle}
                        handleSubmit={handleSubmit}
                    />
                </Route>
                <Route exact path="/edit/:id">
                    <EditPost
                        posts={posts}
                        editBody={editBody}
                        editTitle={editTitle}
                        setEditBody={setEditBody}
                        setEditTitle={setEditTitle}
                        handleEdit={handleEdit}
                    />
                </Route>
                <Route path="/post/:id">
                    <PostPage posts={posts} handleDelete={handleDelete} handleEdit={handleEdit} />
                </Route>
            </Switch>
            <Footer />
        </div>
    )
}

export default App
