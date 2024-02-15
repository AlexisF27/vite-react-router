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
import { format } from 'date-fns'

function App() {
    const [search, setSearch] = useState('')
    // eslint-disable-next-line no-unused-vars
    const [searchResults, setSearchResults] = useState('')
    const [postTitle, setPostTitle] = useState('')
    const [postBody, setPostBody] = useState('')
    const [posts, setPosts] = useState([
        {
            id: 1,
            title: 'Item 1',
            datetime: '2024-02-13T12:30:00.000Z',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        },
        {
            id: 2,
            title: 'Item 2',
            datetime: '2024-02-14T08:45:00.000Z',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        },
        {
            id: 3,
            title: 'Item 3',
            datetime: '2024-02-15T17:00:00.000Z',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        },
    ])

    const history = useHistory()

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

    const handleSubmit = (event) => {
        // eslint-disable-next-line no-unused-vars
        event.preventDefault()
        const id = posts.length ? posts[posts.length - 1].id + 1 : 1
        const datetime = format(new Date(), 'MMMM dd, yyyy pp')
        const newPost = { id, title: postTitle, datetime, body: postBody }
        const allPosts = [...posts, newPost]
        setPosts(allPosts)
        setPostTitle('')
        setPostBody('')
        history.push('/')
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
