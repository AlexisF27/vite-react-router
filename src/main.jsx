import './index.css'

import { Route, BrowserRouter as Router } from 'react-router-dom'

import App from './App.jsx'
import ReactDOM from 'react-dom/client'

ReactDOM.createRoot(document.getElementById('root')).render(
    <Router>
        <Route path="/" component={App} />
    </Router>,
)
