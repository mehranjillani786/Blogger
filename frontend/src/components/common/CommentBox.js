import React from 'react'
import avatar from "../../assets/avatar.jpg"
import { useSelector, useDispatch } from 'react-redux';
import { deleteComment, loadCommentsByid, updateComment } from '../../store/features/blog/BlogAction';
import { Container, Row, Col, Button, FloatingLabel, Form } from 'react-bootstrap'
import GeneralValidation from "../../helper/GeneralValidation"
import toast from 'react-hot-toast';

function CommentBox({ comment }) {
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector(state => state.user)
    const [updateStatus, setUpdateStatus] = React.useState(false)
    const [message, setMessage] = React.useState("")
    const messageEle = React.useRef(null);

    React.useEffect(() => {
        dispatch(loadCommentsByid(comment.id))
    }, [])

    const update = () => {
        if (!updateStatus) {
            setMessage(comment?.attributes?.message)
            setUpdateStatus(true)
        } else {
            console.log("update message", message)
            // call update api
            if (!GeneralValidation([["required", message]])) {
                toast.error("Comment field is Required")
            } else {
                dispatch(updateComment({ id: comment?.id, message }))
                setMessage('')
                messageEle.current.value = ''
                setUpdateStatus(false)
            }
        }
    }
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setMessage(value)
    }
    const delComent = () => {
        // call delete api
        console.log(comment?.id)
        dispatch(deleteComment({ id: comment?.id }))
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            update()
        }
    }
    return (
        <div className="card d-flex flex-row h-100  align-items-center">
            <img src={avatar} className="card-img-top  align-self-start" style={{ width: "100px", height: "100px" }} alt="avatar" />
            <div className="card-body">
                <h6 className="lead">{comment?.attributes?.user?.data?.attributes?.name}</h6>
                {!updateStatus ? <p className="card-text">{comment?.attributes?.message}</p> : <FloatingLabel controlId="floatingTextarea2" className="mb-3" label="Message">
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
                </FloatingLabel>}
                <span className='text-muted'>{new Date(comment?.attributes?.updatedAt).toLocaleString()}</span>

            </div>
            {isAuthenticated && user.id === comment?.attributes?.user?.data?.id ?
                <div className='d-flex flex-column'>
                    <button className='btn btn-warning btn-sm mb-1'><i className="fa-solid fa-pen d-flex flex-row py-1" onClick={update}><span className='ps-2 '> {updateStatus ? "Update" : "Edit"}</span></i>
                    </button>
                    <button className='btn btn-danger btn-sm'><i className="fa-solid fa-trash d-flex flex-row py-1" onClick={delComent}><span className='ps-2 '> Delete</span></i>
                    </button>
                </div>
                : null}
        </div>
    )
}

export default CommentBox