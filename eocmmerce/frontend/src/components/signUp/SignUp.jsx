import React, { useState } from 'react';
import validator from 'validator';
import { BsEnvelopeFill, BsFillPersonFill, BsKeyFill } from 'react-icons/bs';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signUpUser } from '../../slices/user/UserSlice';
import { Helmet } from 'react-helmet';
const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (
      !name ||
      !email ||
      !password ||
      !cpassword ||
      !validator.isEmail(email)
    ) {
      alert('please type all field or valid email');
    }
    // if (!validator.isEmail(email)) {
    //   return window.alert('please Type valide email');
    // }

    if (password !== cpassword) {
      alert('Password must be match with Confirm Password');
    }
    dispatch(signUpUser({ name, email, password })).then((res) => {
      if (res.payload.status == 201) {
        window.alert('User is Successfully Registered');
        navigate('/signin');
      }
    });

    setName('');
    setEmail('');
    setPassword('');
    setCpassword('');
  };
  return (
    <div>
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <section className="vh-100 " style={{ marginTop: '20px' }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: '25px' }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Sign up
                      </p>

                      <form className="mx-1 mx-md-4" onSubmit={onSubmitHandler}>
                        <div className="d-flex flex-row align-items-center mb-2">
                          <BsFillPersonFill
                            style={{
                              height: '25px',
                              width: '25px',
                              marginTop: '30px',
                            }}
                            className="fas  fa-lg me-3 fa-fw"
                          />
                          <div className="form-outline flex-fill mb-0">
                            <label
                              className="form-label"
                              htmlFor="form3Example1c"
                            >
                              Name
                            </label>
                            <input
                              type="text"
                              id="form3Example1c"
                              className="form-control"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              required
                            />
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-2">
                          <BsEnvelopeFill
                            style={{
                              height: '25px',
                              width: '25px',
                              marginTop: '30px',
                            }}
                            className="fas  fa-lg me-3 fa-fw"
                          />
                          <div className="form-outline flex-fill mb-0">
                            <label
                              className="form-label"
                              htmlFor="form3Example3c"
                            >
                              Email
                            </label>
                            <input
                              type="email"
                              id="form3Example3c"
                              className="form-control"
                              value={email}
                              onChange={(e) => {
                                setEmail(e.target.value);
                              }}
                              required
                            />
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-2">
                          <BsKeyFill
                            style={{
                              height: '30px',
                              width: '30px',
                              marginTop: '30px',
                            }}
                            className="fas  fa-lg me-3 fa-fw"
                          />
                          <div className="form-outline flex-fill mb-0">
                            <label className="form-label" for="form3Example5c">
                              Password
                            </label>
                            <input
                              type="password"
                              id="form3Example5c"
                              className="form-control"
                              value={password}
                              onChange={(e) => {
                                setPassword(e.target.value);
                              }}
                              required
                            />
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-2">
                          <BsKeyFill
                            style={{
                              height: '30px',
                              width: '30px',
                              marginTop: '30px',
                            }}
                            className="fas  fa-lg me-3 fa-fw"
                          />
                          <div className="form-outline flex-fill mb-0">
                            <label
                              className="form-label"
                              htmlFor="form3Example4cd"
                            >
                              Confirm Password
                            </label>
                            <input
                              type="password"
                              id="form3Example4cd"
                              className="form-control"
                              value={cpassword}
                              onChange={(e) => {
                                setCpassword(e.target.value);
                              }}
                              required
                            />
                          </div>
                        </div>

                        {/* {
                                                    check ?
                                                        <div className='d-flex justify-content-center' style={{ color: "red" }}>
                                                            password is not match
                                                        </div>
                                                        :
                                                        <div className='d-flex justify-content-right' style={{ color: "green" }}>

                                                        </div>
                                                } */}

                        {/* {error} */}
                        {/* {state &&
                                                    <SpinnerRoundFilled size={50} thickness={100} speed={100} color="rgba(57, 122, 172, 1)" />

                                                       }
                                                         */}

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                            onClick={onSubmitHandler}
                          >
                            Register
                          </button>
                        </div>
                        <div className="d-flex justify-content-center mx-4 mb-5 mb-lg-4">
                          <span>
                            Already have an account{' '}
                            <NavLink to="/signin">
                              <span>Login</span>
                            </NavLink>
                          </span>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid"
                        alt="Sample"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
