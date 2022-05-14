import React from 'react'
import { Container, Row, Col, Button, FloatingLabel, Form } from 'react-bootstrap'
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux'; 
import { addContact } from '../../store/features/user/UserAction';
import GeneralValidation from "../../helper/GeneralValidation"

function Contact() {
  const [message, setMessage] = React.useState({ firstName: '',lastName: '', email: '',  message: '' })
  const dispatch = useDispatch(); 
  const fnameEle = React.useRef(null);
  const lnameEle = React.useRef(null);
  const messageEle = React.useRef(null);
  const emailEle = React.useRef(null);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMessage({ ...message, [name]: value })
  }
  const send = () => {
    if (!GeneralValidation([["required", message.firstName]])) {
      toast.error("First Name is Required")
    } else if (!GeneralValidation([["full_name", message.firstName, 1, 50]])) {
      toast.error("First Name field Lenght Must be greater then 0 and less the 50")
    }else if (!GeneralValidation([["required", message.lastName]])) {
      toast.error("Last Name is Required")
    } else if (!GeneralValidation([["full_name", message.lastName, 1, 50]])) {
      toast.error("Last Name field Lenght Must be greater then 0 and less the 50")
    }
    else if (!GeneralValidation([["required", message.email]])) {
      toast.error("Email is Required")
    }
    else if (!GeneralValidation([["email", message.email]])) {
      toast.error("Email Format is invalid")
    }  else if (!GeneralValidation([["required", message.message]])) {
      toast.error("Message is Required")
    } else {
      dispatch(addContact(message))
      setMessage({ firstName: '', lastName:'', email: '', phone: '', message: '' })
      fnameEle.current.value = ''
      lnameEle.current.value = ''
      emailEle.current.value = ''
      messageEle.current.value = ''
    }
  }
  return (
    <section className="featured-posts container mt-5 " id="contact-us">
      {/* <div className="section-title">
        <h2><span>Contact Us</span></h2>
      </div> */}
      <div className="row">
        <div className="col-sm-12 col-md-6 align-self-center">

          <h1 className='text-info'>Contact us</h1>
          <p className='text-secondary'>Any Question or remarks? Just write us a message.</p>
        </div>
        <div className="col-sm-12 mb-4 col-md-6">
          <div className="card h-100 border-info rounded">
            <div className="card-header p-0">
              <div className="bg-info text-white text-center py-3">
                <h3><i className="fa fa-envelope"></i> Write to us:</h3>
                <p className="m-0">We’ll write rarely, but only the best content.</p>
              </div>
            </div>
            <div className="card-body p-5">
              <div className='d-flex justify-content-between'>
                <Form.Floating className="mb-3" style={{ width: "48%" }}>
                  <Form.Control
                    id="firstName"
                    ref={fnameEle}
                    onChange={handleInputChange}
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                  />
                  <label htmlFor="firstName">First Name</label>
                </Form.Floating>
                <Form.Floating className="mb-3" style={{ width: "48%" }}>
                  <Form.Control
                    id="lastName"
                    onChange={handleInputChange}
                    ref={lnameEle}
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                  />
                  <label htmlFor="lastName">Last Name</label>
                </Form.Floating>
              </div>
              <Form.Floating className="mb-3">
                <Form.Control
                  onChange={handleInputChange}
                  id="email"
                  ref={emailEle}
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                />
                <label htmlFor="email">Email address</label>
              </Form.Floating>
              <FloatingLabel controlId="floatingTextarea2" className="mb-3" label="Message">
                <Form.Control
                  as="textarea"
                  onChange={handleInputChange}
                  name="message"
                  ref={messageEle}
                  placeholder="Leave a message here"
                  style={{ height: '100px' }}
                />
              </FloatingLabel>
              <div className="text-center">
                <button className="btn btn-info btn-block rounded py-2" onClick={send}>Send</button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  )
}

export default Contact