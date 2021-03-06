import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Layout from '../core/Layout';
import axios from 'axios';
import Logo from '../core/Logo';
import { isAuth } from './helpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import '../assets/scss/now-ui-kit.scss';
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
  Row,
  Navbar
} from 'reactstrap';

import Footer from '../core/Footer';

const ForgotPw = ({ history }) => {
  const [values, setValues] = useState({
    email: '',
    buttonText: 'Request Password Reset'
  });

  const { email, buttonText } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText: 'Loading...' });
    axios({
      method: 'PUT',
      url: `${process.env.REACT_APP_API}/forgot-password`,
      data: { email }
    })
      .then((response) => {
        console.log('FORGOT PW REQUEST SUCCESS', response);
        toast(response.data.message);
        setValues({ ...values, buttonText: 'Submitted' });
      })
      .catch((error) => {
        console.log('FORGOT PW ERROR', error.response.data);
        toast(error.response.data.error);
        setValues({ ...values, buttonText: 'Request Password Reset' });
      });
  };
  const [firstFocus, setFirstFocus] = useState(false);
  useEffect(() => {
    document.body.classList.add('login-page');
    // document.body.classList.add('sidebar-collapse');
    document.documentElement.classList.remove('nav-open');
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove('login-page');
      // document.body.classList.remove('sidebar-collapse');
    };
  }, []);

  return (
    <>
      <ToastContainer position='bottom-right' />
      {isAuth() ? <Redirect to='/private' /> : null}
      <div className='page-header header-filter'>
        <div
          className='page-header-image'
          style={{
            backgroundColor: '#1E1D2D'
          }}></div>
        <div className='content'>
          <Container>
            <Row>
              <Col className='ml-auto mr-auto' md='5'>
                <Card className='card-login card-plain'>
                  <Form action='' className='form' method=''>
                    <CardHeader className='text-center'>
                      <Logo />
                    </CardHeader>
                    <CardBody>
                      <InputGroup
                        className={
                          'no-border input-lg' +
                          (firstFocus ? ' input-group-focus' : '')
                        }>
                        <InputGroupAddon addonType='prepend'>
                          <InputGroupText>
                            <i className='now-ui-icons ui-1_email-85'></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder='Email'
                          type='email'
                          onFocus={() => setFirstFocus(true)}
                          onBlur={() => setFirstFocus(false)}
                          onChange={handleChange('email')}
                          value={email}></Input>
                      </InputGroup>
                    </CardBody>
                    <CardFooter className='text-center'>
                      <Button
                        block
                        className='btn-round'
                        color='info'
                        onClick={clickSubmit}
                        size='lg'>
                        Request Password Reset
                      </Button>
                    </CardFooter>
                    <div className='pull-left'>
                      <h6>
                        <Link to='/signup'>Create Account</Link>
                      </h6>
                    </div>
                    <div className='pull-right'>
                      <h6>
                        <Link to='/signin'>Already Registered?</Link>
                      </h6>
                    </div>
                  </Form>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ForgotPw;
