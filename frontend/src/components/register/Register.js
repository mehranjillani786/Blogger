import React from 'react' 
import { Modal, Button, FloatingLabel, Form } from 'react-bootstrap'
import usePasswordToggle from "../../hooks/usePasswordToggle";
import { registerUser } from '../../store/features/user/UserAction';
import GeneralValidation from "../../helper/GeneralValidation"
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
function Register({show, handleClose}) {
  const [state, setState] = React.useState({ email: '', password: '', name:"" })
  const [PasswordInputType, ToggleIcon] = usePasswordToggle();
  const dispatch = useDispatch();

  const onChange = (event) => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value
    });
  }
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      register()
    }
  }
  const register = () => {
    if (!GeneralValidation([["required", state.name]])) {
      toast.error("Name is required")
    } else if (!GeneralValidation([["full_name", state.name, 1, 50]])) {
      toast.error("Name lenght must be less then 50 and greater then 1")
    }
    else if (!GeneralValidation([["required", state.email]])) {
      toast.error("Email is required")
    }
    else if (!GeneralValidation([["email", state.email]])) {
      toast.error("Email Format is incorrect")
    } else if (!GeneralValidation([["required", state.password]])) {
      toast.error("Password is required")
    }
    else {
      dispatch(registerUser(state));
      handleClose()
    }
  }

  return (

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Register</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <FloatingLabel
          controlId="floatingInput"
          label="Your Name"
          className="mb-3"
        >
          <Form.Control type="text" placeholder="Name"
            name='name'
            onChange={onChange}
            onKeyDown={handleKeyDown} />
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingInput"
          label="Email address"
          className="mb-3"
        >
          <Form.Control type="email" placeholder="name@example.com"
            name='email'
            onChange={onChange}
            onKeyDown={handleKeyDown} />
        </FloatingLabel>

        <FloatingLabel controlId="floatingPassword" label="Password">
          <Form.Control type={PasswordInputType} placeholder="Password"
            onChange={onChange}
            name="password"
            onKeyDown={handleKeyDown} />
          <span className="password-toogle-icon position-absolute fs-18 " style={{ top: "20px", right: "10px" }}>
            {ToggleIcon}
          </span>
        </FloatingLabel>


      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={register}>
          Register
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default Register