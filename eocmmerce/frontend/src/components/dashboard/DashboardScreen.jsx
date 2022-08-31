import React, { useState } from 'react';
import '../shippingAddressUi/shippingAddress.css';
import ClipLoader from 'react-spinners/ClipLoader';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import CreateProduct, {
  newProduct,
} from '../../slices/createProduct/CreateProduct';
const DashboardScreen = () => {
  const [name, setName] = useState('');
  const [brand, setbrand] = useState('');
  const [sale, setSale] = useState(0);
  const [countInStock, setCountInStock] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [disable, setDisable] = useState(false);
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.createProduct.loading);
  const options = [
    {
      label: 'Furniture',
      value: 'furniture',
    },
    {
      label: 'Computer Accessories',
      value: 'ComputerAccessories',
    },
    {
      label: 'Grocery',
      value: 'grocery',
    },
    {
      label: 'Fashion',
      value: 'fashion',
    },
    {
      label: 'AutoMobile',
      value: 'autoMobile',
    },
    {
      label: 'LadiesAccessories',
      value: 'ladiesAccessories',
    },
    {
      label: 'Fashion',
      value: 'fashion',
    },
  ];

  const onUploadImageHandler = (e) => {
    e.preventDefault();
    setImage(e.target.files[0]);
    const data = new FormData();
    setDisable(true);
    data.append('file', image);
    data.append('upload_preset', 'abubakarraza');
    data.append('cloud_name', 'abubakarraza64');
    fetch('https://api.cloudinary.com/v1_1/abubakarraza64/image/upload', {
      method: 'post',
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setImageUrl(res.url);
        setDisable(false);
      })
      .catch((e) => console.log(e));
  };
  const onClickHandler = (e) => {
    e.preventDefault();
    if (
      !name ||
      !category ||
      !price ||
      !countInStock ||
      !sale ||
      !description
    ) {
      return window.alert('Please Type all Field');
    }
    if (sale > 99) {
      return window.alert('Please type valid Sale');
    }
    dispatch(
      newProduct({
        name,
        category,
        price,
        countInStock,
        imageUrl,
        sale,
        description,
      })
    ).then(() => {
      setCategory('');
      setName('');
      setPrice('');
      setCountInStock('');
      setDescription('');
    });
  };
  return (
    <div className="container">
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <div className="row mt-3  ">
        {/* <div className="col-md-3"></div> */}

        <div className="col-md-10 offset-1 justify-content-center">
          <div className="card card-custom pb-4">
            <div className="card-body mt-0 mx-5">
              <div className="text-center mb-3 pb-2 mt-3">
                <h4 style={{ color: '#495057' }}>Product Details</h4>
              </div>

              <form className="mb-0" onSubmit={() => {}}>
                <div className="row mb-4">
                  <div className="col">
                    <div className="form-outline">
                      <label className="form-label" htmlFor="form9Example1">
                        Product Name
                      </label>
                      <input
                        type="text"
                        id="form9Example1"
                        className="form-control input-custom"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-outline">
                      <label className="form-label" htmlFor="form9Example2">
                        Category
                      </label>
                      <select
                        className="form-control input-custom"
                        onChange={(e) => setCategory(e.target.value)}
                        value={category}
                      >
                        {options.map((option) => (
                          <option value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col">
                    <div className="form-outline">
                      <label className="form-label" htmlFor="form9Example3">
                        Price
                      </label>
                      <input
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        type="number"
                        id="form9Example3"
                        className="form-control input-custom"
                        required
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-outline">
                      <label className="form-label" htmlFor="form9Example4">
                        Sale in %
                      </label>
                      <input
                        value={sale}
                        onChange={(e) => setSale(e.target.value)}
                        type="number"
                        maxLength={'2'}
                        max="99"
                        min="1"
                        id="form9Example4"
                        className="form-control input-custom"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col">
                    <div className="form-outline">
                      <label className="form-label" htmlFor="form9Example6">
                        Stock Available
                      </label>
                      <input
                        value={countInStock}
                        onChange={(e) => setCountInStock(e.target.value)}
                        type="number"
                        id="form9Example6"
                        className="form-control input-custom"
                        required
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-outline">
                      <label className="form-label" htmlFor="file">
                        Image
                      </label>
                      <input
                        accept=".jpg,.png,.gif,.jpeg,"
                        onChange={(e) => onUploadImageHandler(e)}
                        type="file"
                        id="file"
                        className="form-control input-custom"
                        required
                      />
                    </div>
                  </div>
                  <div className="row mb-4">
                    <div className="col">
                      <div className="form-outline mt-2">
                        <label class="form-label" htmlFor="textAreaExample">
                          Description
                        </label>
                        <textarea
                          className="form-control mt-1"
                          id="textAreaExample1"
                          rows="4"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
                {loading && <ClipLoader />}
                <div className="float-end ">
                  <button
                    type="submit"
                    disabled={disable}
                    onClick={onClickHandler}
                    style={{ backgroundColor: '#0062CC' }}
                    className="btn btn-primary btn-rounded"
                  >
                    Add Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <input>
        <select>
          <option>hello</option>
          <option>hello</option>
          <option>hello</option>
        </select>
        
      </input> */}
    </div>
  );
};

export default DashboardScreen;
