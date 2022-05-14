import React from 'react'
import BlogDetailHero from '../common/BlogDetailHero'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getBlogBySlug, loadComments, addComment } from '../../store/features/blog/BlogAction';
import { setCommentsArray, clearComment } from "../../store/features/blog/BlogSlice"
import ReactMarkdown from "react-markdown";
import CommentBox from '../common/CommentBox';
import { Header, Footer } from "../index"
import { Container, Row, Col, Button, FloatingLabel, Form } from 'react-bootstrap'
import GeneralValidation from '../../helper/GeneralValidation';
import toast from 'react-hot-toast';

function Blog() {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const { selectedBlog, comments } = useSelector(state => state.blog)
    const { isAuthenticated, user } = useSelector(state => state.user)
    const [message, setMessage] = React.useState("")
    const messageEle = React.useRef(null);

    React.useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        let slug = params.get('slug')
        if (slug) {
            dispatch(getBlogBySlug(slug));
            dispatch(loadComments())
        }
        else {
            navigate('/#home')
        }
        return () => {
            dispatch(clearComment())
        }
    }, [])
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setMessage(value)
    }
    const add = () => {
        console.log("call add comment api", message)
        if (!GeneralValidation([["required", message]])) {
            toast.error("Comment field is Required")
        } else {
            dispatch(addComment({ user: user.id, message, blog: selectedBlog?.id }))
            setMessage('')
            messageEle.current.value = ''
        }
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            add()
        }
    }
    return (
        <div className='blog-details'>
            <BlogDetailHero title={selectedBlog?.attributes?.title} tagline={selectedBlog?.attributes?.tagline} image={selectedBlog?.attributes?.feature_image?.data?.attributes?.url} publishedAt={selectedBlog?.attributes?.publishedAt} />
            <div className='container py-5'>
                <ReactMarkdown>{selectedBlog?.attributes?.description}</ReactMarkdown>
                <section className="featured-posts pt-5">
                    {Array.isArray(comments.filter(c => c?.attributes?.blog?.data?.id === selectedBlog?.id)) && comments.filter(c => c?.attributes?.blog?.data?.id === selectedBlog?.id).length > 0 ? <div className="section-title">
                        <h5><span>Comments</span></h5>
                    </div> : null}
                    {comments.filter(c => c?.attributes?.blog?.data?.id === selectedBlog.id).map((c, i) => {
                        return <CommentBox comment={c} key={i} />
                    })}
                    {isAuthenticated ? <><FloatingLabel controlId="floatingTextarea2" className="mb-2" label="Add Comment">
                        <Form.Control
                            as="textarea"
                            name="message"
                            value={message}
                            ref={messageEle}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            placeholder="Leave a message here"
                            style={{ height: '100px' }}
                        />
                    </FloatingLabel>
                        <button className='btn btn-primary' onClick={add}> Add </button></> : null}
                </section>
            </div>

        </div>
    )
}

export default Blog