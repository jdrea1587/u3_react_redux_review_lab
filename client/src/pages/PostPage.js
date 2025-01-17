import '../styles/index.css'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { LoadPostsById, LoadDeletePost, LoadPosts } from '../store/actions/PostAction'
import { Link, useNavigate } from 'react-router-dom'


const mapStateToProps = ({ postState }) => {
    return { postState }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPost: (id) => dispatch(LoadPostsById(id)),
        deletePost: (id) => dispatch(LoadDeletePost(id)),
        fetchPosts: () => dispatch(LoadPosts())
    }
}

function PostPage(props) {

    let navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {

        props.fetchPost(id)

    }, [])

    const handleSubmit = () => {
        props.deletePost(id)
        props.fetchPosts()
        navigate('/')
    }

    // console.log('in post page details', props.postState)
    console.log('props postState.post', props.postState.post)
    return (
        <div>
            < Link to={'/'}>
                <div className="addBtn">Home Page</div>
            </Link>
            <div>
                {props.postState.post.post_location} <br />
                <img src={props.postState.post.post_image} alt='pic' width={200} height={200} />
            </div>
            <div className='form'>

                <Link to={`/editPostPage/${id}`}>
                    <button>
                        Edit details
                    </button>
                </Link>  


                    <button
                        type='submit'
                        onClick={handleSubmit}
                    >
                        Delete post
                    </button>
            </div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPage)