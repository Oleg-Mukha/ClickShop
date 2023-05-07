import React from "react";
import { useNavigate } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/clickShopSlice";
import { ToastContainer, toast } from "react-toastify";
import RoundedPriceContext from "../context/RoundedPriceContext";

const ProductsCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const _id = String(product.id);
  const idString = (_id) => {
    return String(_id).toLowerCase().split(" ").join("");
  };
  const rootId = idString(_id);

  const handleDetails = () => {
    navigate(`/product/${rootId}`, {
      state: {
        item: product,
      },
    });
  };

  return (
    <RoundedPriceContext.Consumer>
      {({ roundedPrice }) => (
        <div className="w-full relative group">
          <div
            onClick={handleDetails}
            className="w-full h-96 cursor-pointer overflow-hidden"
          >
            <img
              className="w-full h-full object-cover group-hover:scale-110 duration-500"
              src={product.thumbnail}
              alt={product.title}
            />
          </div>
          <div className="w-full border-[1px] px-2 py-4">
            <div className="flex justify-between items-center">
              <div className="w-full flex flex-col">
                <div className="flex justify-between mb-2 px-2 items-center">
                  <h2 className="font-titleFont text-base font-bold">
                    {product.title}
                  </h2>
                  <div className="flex justify-between items-center text-sm relative">
                    <div className="flex gap-2 justify-end">
                      <p className="line-through text-gray-500">
                        ${product.price}
                      </p>
                      <p className="font-semibold">${roundedPrice}</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between mb-2 items-center">
                  <p className="text-gray-500 ">{product.category}</p>
                  <button
                    onClick={() =>
                      dispatch(
                        addToCart({
                          _id: product.id,
                          title: product.title,
                          image: product.thumbnail,
                          price: roundedPrice,
                          quantity: 1,
                          description: product.description,
                        })
                      ) & toast.success(`${product.title} is added`)
                    }
                    className="bg-light-gray text-blue-600 hover:text-blue-400 rounded-md px-4 py-2 flex items-center gap-2"
                  >
                    <span>Add to Cart</span>
                    <BsArrowRight />
                  </button>
                </div>
                <div className="absolute top-4 right-0">
                  {product.isNew && (
                    <p className="bg-black text-white font-semibold font-titleFont px-6 py-1 rounded-md">
                      Sale
                    </p>
                  )}
                </div>
              </div>
              <ToastContainer
                position="top-left"
                autoClose={3000}
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
          </div>
        </div>
      )}
    </RoundedPriceContext.Consumer>
  );
};

export default ProductsCard;
