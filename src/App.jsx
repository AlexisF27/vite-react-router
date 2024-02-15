// eslint-disable-next-line no-unused-vars
import { Route, Switch, useHistory } from 'react-router'
// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from 'react'

import About from './About'
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
    const [posts, setPosts] = useState([])

    const history = useHistory()

    useEffect(()=> {
        const fetchPosts = async () => {
            try {
                const response = await api.get('/posts')
                setPosts(response.data);
            } catch (err) {
                if(err.response) {

                    console.log(err.response.data);
                    console.log(err.response.staus);
                    console.log(err.response.headers);
                }else{
                    console.log(`Error: ${err.message}`)
                }
            }
        }
        fetchPosts()
    },[]) 

    const handleDelete = (postId) => {
        // eslint-disable-next-line no-unused-vars
        const postToDelete = posts.filter((post) => post.id !== postId)
        setPosts(postToDelete)
        history.push('/')
    }

    useEffect(() => {
        const filteredResults = posts.filter(post =>
            ((post.body).toLowerCase()).includes(search.toLowerCase())
            || ((post.title).toLowerCase()).includes(search.toLowerCase()));

            setSearchResults(filteredResults.reverse());
    }, [posts, search])

    const handleSubmit = async (event) => {
        // eslint-disable-next-line no-unused-vars
        event.preventDefault()
        const id = posts.length ? posts[posts.length - 1].id + 1 : 1
        const datetime = format(new Date(), 'MMMM dd, yyyy pp')
        const newPost = { id, title: postTitle, datetime, body: postBody }
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
                    <Home posts={searchResults} setPosts={setPosts} />
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
                <Route path="/post/:id">
                    <PostPage posts={posts} handleDelete={handleDelete} />
                </Route>
            </Switch>
            <Footer />
        </div>
    )
}

export default App
