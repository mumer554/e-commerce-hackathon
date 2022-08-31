import React from 'react';

import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarItem,
  MDBAccordion,
  MDBAccordionItem,
} from 'mdb-react-ui-kit';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { NavLink } from 'react-router-dom';
import { BsFillCartFill } from 'react-icons/bs';
import Badge from 'react-bootstrap/Badge';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../slices/user/UserSlice';
import { NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-bootstrap/';

export default function App() {
  const dispatch = useDispatch();

  const quantity = useSelector((state) => state.cart.carts);
  const login = useSelector((state) => state.user.login);
  const name = useSelector((state) => state.user.userDetail.name);
  const admin = useSelector((state) => state.user.userDetail.isAdmin);
  console.log(login);
  console.log(quantity.length);
  const onClickHandler = () => {
    alert('Are you sure you want to logout');
    dispatch(logoutUser()).then(() => window.location.reload(false));
  };
  return (
    <>
      <MDBNavbar light bgColor="dark">
        <MDBContainer>
          <MDBNavbarBrand>
            <NavLink to="/">
              <img
                src={require('../../assests/logo.jpg')}
                height="50"
                alt="raza"
                loading="lazy"
              />
            </NavLink>
          </MDBNavbarBrand>

          <MDBNavbarItem>
            <NavLink to={'/cart'}>
              <BsFillCartFill
                style={{ color: 'white', width: '30px', height: '30px' }}
              />
            </NavLink>
            {quantity.length > 0 && (
              <Badge pill bg="danger">
                {quantity.length}
              </Badge>
            )}
            <div className="btn-group" style={{ marginLeft: '20px' }}>
              <button type="button" className="btn btn-danger">
                {login ? name : <span>Action</span>}
              </button>
              <button
                type="button"
                className="btn btn-danger dropdown-toggle dropdown-toggle-split"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span className="sr-only">Toggle Dropdown</span>
              </button>
              <div className="dropdown-menu">
                {login ? (
                  <>
                    <div onClick={onClickHandler} className="dropdown-item btn">
                      logout
                    </div>
                    <NavLink className="dropdown-item" to={'/dashboard'}>
                      Create Product
                    </NavLink>
                  </>
                ) : (
                  <div>
                    <NavLink className="dropdown-item" to={'/signin'}>
                      Sign In
                    </NavLink>
                    <NavLink className="dropdown-item" to={'/signup'}>
                      Sign Up
                    </NavLink>{' '}
                  </div>
                )}
                {/* {login && (
                  <div>
                   
                    <NavDropdown title="Post" id="admin-nav-dropdown">
                      <NavDropdown.Item>
                        <NavLink to="/dashboard"> Create Product</NavLink>
                      </NavDropdown.Item>
                    </NavDropdown>
                  </div>
                )} */}
              </div>
            </div>
          </MDBNavbarItem>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
}
