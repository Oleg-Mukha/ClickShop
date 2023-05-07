import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { MdOutlineStar } from "react-icons/md";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/clickShopSlice";
import { ToastContainer, toast } from "react-toastify";

import useProductDetailsHook from "../hooks/useProductDetailsHook";
import useExchangeRateHook from "../hooks/useExchangeRateHook";
import useQuantityHook from "../hooks/useQuantityHook";

import styled from "styled-components";
import Slider from "react-slick";
import Spinner from "./Spinner";

const Product = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { item } = location.state;

  const [isLoading, setIsLoading] = useState(true);
  const details = useProductDetailsHook(item.id);

  useEffect(() => {
    if (details.id) {
      setIsLoading(false);
    }
  }, [details]);

  const [quantity, handleIncrement, handleDecrement] = useQuantityHook(1);
  const [comment, setComment] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Submitting comment: ${comment}`);
    setComment("");
    alert(
      `Your feedback: '${comment}' added successfully! Sent for moderation review`
    );
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const exchangeRate = useExchangeRateHook();

  const convertedPrice = (price) => {
    return (price * exchangeRate).toFixed(0);
  };

  const roundedPrice = Math.round(
    (details.price * (100 - details.discountPercentage)) / 100
  );

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="max-w-screen-xl mx-auto my-10 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="relative">
              <Slider {...settings}>
                {details.images.map((image, index) => (
                  <div key={index}>
                    <img
                      className="w-full h-[550px] object-contain cursor-grab"
                      src={image}
                      alt={`productImage-${index}`}
                    />
                  </div>
                ))}
              </Slider>
              <div className="absolute top-4 right-0">
                {details.isNew && (
                  <p className="bg-black text-white font-semibold font-titleFont px-8 py-1">
                    Sale
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col justify-center gap-12">
              <div>
                {/* <h2 className="text-4xl font-semibold">{details.title}</h2> */}
                <Title>{details.title}</Title>
                <div className="flex items-center gap-4 mt-3">
                  <p className="line-through font-base text-gray-500">
                    ${details.price}
                  </p>
                  <p className="text-2xl font-medium text-gray-900">
                    ${roundedPrice} ({convertedPrice(roundedPrice)} UAH)
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex text-base">
                  <MdOutlineStar />
                  <MdOutlineStar />
                  <MdOutlineStar />
                  <MdOutlineStar />
                  <MdOutlineStar />
                </div>
                <p className="text-xs text-gray-500">(1 Customer review)</p>
              </div>
              <p className="text-base text-gray-500 -mt-3">
                {details.description}
              </p>
              <div className="flex gap-4">
                <div className="w-54 flex items-center justify-between text-gray-500 gap-4 border p-3">
                  <p className="text-sm">Qty</p>
                  <div className="flex items-center gap-4 text-sm font-semibold">
                    <Button onClick={() => handleDecrement()}>-</Button>
                    {quantity}
                    <Button primary onClick={() => handleIncrement()}>
                      +
                    </Button>
                  </div>
                </div>
                <button
                  onClick={() =>
                    dispatch(
                      addToCart({
                        _id: details.id,
                        title: details.title,
                        image: details.thumbnail,
                        price: roundedPrice,
                        quantity: quantity,
                        description: details.description,
                      })
                    ) & toast.success(`${details.title} is added`)
                  }
                  className="bg-black text-white py-3 px-6 active:bg-gray-800"
                >
                  add to cart
                </button>
              </div>
              <p className="text-base text-gray-500">
                Category:{" "}
                <span className="font-medium capitalize">
                  {details.category}
                </span>
              </p>

              <div className="mt-8">
                <h3 className="text-lg font-medium mb-2">Leave a comment</h3>
                <form onSubmit={handleSubmit}>
                  <div>
                    <textarea
                      cols="30"
                      rows="4"
                      placeholder="Enter your comment here..."
                      value={comment}
                      onChange={handleCommentChange}
                      className="w-full h-40 border border-gray-400 rounded-lg py-2 px-4 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="bg-black text-white py-3 px-6 active:bg-gray-800"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
          <ToastContainer
            position="top-left"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </div>
      )}
    </>
  );
};

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;

  @media screen and (max-width: 1025px) {
    font-size: 2rem;
  }
`;

const Button = styled.button`
  background-color: ${(props) => (props.primary ? "#007bff" : "#6c757d")};
  color: #fff;
  padding: 0.5rem 1.5rem;
  border: none;
  &:hover {
    background-color: ${(props) => (props.primary ? "#0069d9" : "#5a6268")};
  }
  &:focus {
    box-shadow: var(--tw-ring-inset) 0 0 0
      calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  }
`;

export default Product;
