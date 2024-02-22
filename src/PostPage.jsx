import { Link, useParams } from 'react-router-dom'

import  DataContext from './context/DataContext'
import  {useContext} from 'react'

export const PostPage = () => {
    const { posts, handleDelete,handleId } = useContext(DataContext)
    //NOTE:
    //A esta pagina se le va a dar el chance de borrar por eso el handledelete
    //id es a lo que lo llamamos al route '/id' si a eso lle llamos diferentes en la ruta hay que cambiar esto
    const { id } = useParams()
    const post = posts.find((post) => post.id.toString() === id)
    return (
        <main className="PostPage">
            <article className="post">
                {post && (
                    <>
                        <h2>{post.title}</h2>
                        <p className="postDate">{post.datetime}</p>
                        <p className="body">{post.body}</p>
                        <Link to={`/edit/${post.id}`}>
                            <button  className="editButton" onClick={() => handleId(post.id)}>Edit Post</button>
                        </Link>
                        <button className="deleteButton" onClick={() => handleDelete(post.id)}>Delete Post</button>
                    </>
                )}{!post && <>
                    <h2>Post not found</h2>
                    <h2>well that is dissapointed</h2>
                    <p>
                        <Link to="/">Visit our Homepage</Link>
                    </p>
                </>}
            </article>
        </main>
    )
}

export default PostPage
