import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, removeCartItem } from "../redux/slices/cartSlice";
import type { RootState, AppDispatch } from "../redux/store";
import "./CartPage.css";
import Header from "../common/Header";

const CartPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading } = useSelector((state: RootState) => state.cart);
  const BASE_URL = "http://localhost:3001";

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleRemove = (itemId: string) => {
    dispatch(removeCartItem(itemId));
  };

  const totalPrice = items.reduce((sum, item) => {
    return sum + (item.Product?.price || 0) * item.quantity;
  }, 0);

  if (loading) return <p className="cart-empty">Loading cart...</p>;

  return (
    <>
      <Header />
      <div className="cart-container">
        <h1 className="cart-title">Your Cart</h1>

        <div className="cart-content">
          {/* LEFT: CART LIST */}
          <div className="cart-items-box">
            {items.length === 0 ? (
              <p className="cart-empty">Cart is empty</p>
            ) : (
              <ul className="cart-list">
                {items.map((item) => (
                  <li key={item.id} className="cart-item">
                    <div className="cart-item-left">
                      <img
                        src={`${BASE_URL}${item.Product?.image_url || ""}`}
                        alt={item.Product?.name || "Sản phẩm"}
                      />
                      <div className="cart-item-details">
                        <p className="cart-item-name">{item.Product?.name}</p>
                        <p className="cart-item-quantity">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                    </div>

                    <div className="cart-item-actions">
                      <p className="cart-item-price">
                        $
                        {item.Product
                          ? (item.Product.price * item.quantity).toFixed(2)
                          : "0.00"}
                      </p>

                      <button
                        className="cart-delete-btn"
                        onClick={() => handleRemove(item.id)}
                      >
                        ✖
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* RIGHT: SUMMARY */}
          <div className="cart-summary">
            <h2>Order Summary</h2>

            <div className="summary-line">
              <span>Total Items:</span>
              <span>{items.length}</span>
            </div>

            <div className="summary-line">
              <span>Total Price:</span>
              <span className="summary-total">${totalPrice.toFixed(2)}</span>
            </div>

            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
