import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';
import p1 from '../../assests/pic1.jpg';
import Rating from '../rating/Rating';

const Card = (props) => {
  return (
    <>
      <section>
        <div className="container-fluid">
          <div className="card mx-auto col-md-3 col-10 mt-5 pt-4">
            <div className="d-flex sale ">
              <div className="btnBorder btn">SALE {props.sale}%</div>
            </div>
            <Link to={`/product/${props._id}`}>
              <img
                className="mx-auto img-thumbnail"
                src={props.imageUrl}
                alt="something is wrong"
                width="450px"
                height="450px"
              />
            </Link>
            <div className="card-body text-center mx-auto">
              <h5 className="card-title">{props.name}</h5>
              <p className="card-text">{props.price}</p>
              <Rating rating={props.rating} />
            </div>
            <p style={{ textAlign: 'center' }}>{props.title} </p>

            {/* <button className="btn btn-danger m-2">Add to cart</button> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Card;
