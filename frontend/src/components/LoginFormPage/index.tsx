import React, { useState, Dispatch } from 'react';
import { SampleState } from '../../store';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { store } from '../../index';

const LoginFormPage = () => {
  const sessionDispatch = useDispatch<Dispatch<sessionActions.SessionActions>>();
  const sessionUser: sessionActions.UserAttrs = useSelector((state: SampleState) => state.session.user);
  const [credential, setCredential] = useState('Demo-lition');
  const [password, setPassword] = useState('hunter2');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return (<Navigate to='/' />);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    setErrors([]);
    // return dispatch(sessionActions.login({ credential, password }))
    //   .catch(async (res) => {

    // })
    
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Log In</button>
    </form>
  )

};

export default LoginFormPage;