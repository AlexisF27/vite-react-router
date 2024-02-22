import { Route, Switch } from 'react-router-dom';

import About from './About'
import { DataProvider } from './context/DataContext'
import EditPost from './EditPost'
import Footer from './Footer'
import Header from './Header'
import Home from './Home'
import Missing from './Missing'
import Nav from './Nav'
import NewPost from './NewPost'
import PostPage from './PostPage'

function App() {

    return (
        <div className="App">

            <Header title="React JS Blog" />
            <DataProvider>
                <Nav />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/about" component={About} />
                    <Route path="/*" component={Missing} />
                    <Route exact path="/post" component={NewPost} />
                    <Route path="/edit/:id" component={EditPost} />
                    <Route exact path="/post/:id" component={PostPage} />
                </Switch>
            </DataProvider>
            <Footer />

        </div>
    )
}

export default App
