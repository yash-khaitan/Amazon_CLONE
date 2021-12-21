import React from "react";
import "./Product.css";
import { useStateValue } from "./StateProvider";

function Product({ id, title, price, image, rating }) {
  const [, dispatch] = useStateValue();

  // console.log(basket);

  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        price: price,
        image: image,
        rating: rating,
      },
    });
  };
  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product__ratings">
          {Array(rating)
            .fill()
            .map((_, i) => {
              return <p key={i}>🌟</p>;
            })}
        </div>
      </div>
      <img className="product__image" src={image} alt="" />

      <button className="product__button" onClick={addToBasket}>
        Add to cart
      </button>
    </div>
  );
}

export default Product;
