import  DataContext from './context/DataContext'
import Feed from './Feed'
import  {useContext} from 'react'

// eslint-disable-next-line no-unused-vars
export const Home = () => {
  const {searchResults, fetchError, isLoading} = useContext(DataContext)

  return (
      <main className='Home'>
        {isLoading && <p className='statusMsg'> Loading Posts...</p>}
        {!isLoading && fetchError && <p className='statusMsg' style={{color: "red"}}>{fetchError}</p>}
        {!isLoading && !fetchError && (searchResults.length ? <Feed posts={searchResults}/> : <p className='statusMsg'> No post to display</p>)}
      </main>
  )
}


export default Home