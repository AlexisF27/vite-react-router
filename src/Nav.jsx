import  DataContext from './context/DataContext'
import { Link } from 'react-router-dom'
import  {useContext} from 'react'
const Nav = () => {
    const {search, setSearch} = useContext(DataContext);

    return (
        <nav className="Nav">
            <form className="searchForm" onSubmit={(event) => event.preventDefault()}>
                <label htmlFor="search">Search Posts</label>
                <input
                    id="search"
                    type="text"
                    placeholder="Search Posts"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                ></input>
            </form>
            <ul>
                <li>
                    <Link to="/"> Home</Link>
                </li>
                <li>
                    <Link to="/post"> Post</Link>
                </li>
                <li>
                    <Link to="/about"> About</Link>
                </li>
            </ul>
        </nav>
    )
}


export default Nav
