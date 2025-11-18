import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import {
  fetchProductById,
  clearProductDetail,
} from "../redux/slices/productSlice";
import { addToCart, fetchCart } from "../redux/slices/cartSlice";
import Header from "../common/Header";
import { toast } from "react-toastify";
import "./ProductDetails.css";

const BASE_URL = "http://localhost:3001/";

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const {
    productDetail: product,
    loading,
    error,
  } = useSelector((state: RootState) => state.products);
  const { user } = useSelector((state: RootState) => state.auth);

  const [quantity, setQuantity] = useState(1);
  const [addedEffect, setAddedEffect] = useState(false);
  const [addedText, setAddedText] = useState(false);

  useEffect(() => {
    if (id) dispatch(fetchProductById(id));
    return () => {
      dispatch(clearProductDetail());
    };
  }, [id, dispatch]);

  const increase = () => setQuantity((q) => q + 1);
  const decrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const handleAddToCart = async () => {
    if (!product) return;

    if (!user?.id) {
      toast.error("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!");
      return;
    }

    try {
      await dispatch(addToCart({ product_id: product.id, quantity })).unwrap();
      dispatch(fetchCart());
      toast.success(`${product.name} đã được thêm vào giỏ hàng!`);

      setAddedEffect(true);
      setAddedText(true);
      setTimeout(() => setAddedEffect(false), 500);
      setTimeout(() => setAddedText(false), 2000);
    } catch (err: any) {
      console.error(err);
      toast.error("Thêm vào giỏ hàng thất bại. Vui lòng thử lại!");
    }
  };

  if (loading) return <p className="pd-loading">Đang tải...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!product) return <p>Không tìm thấy sản phẩm</p>;

  const imageUrl = product.image_url?.startsWith("http")
    ? product.image_url
    : `${BASE_URL}${product.image_url}`;

  return (
    <>
      <Header />
      <div className="pd-container">
        <div className="pd-card">
          <div className="pd-image">
            <img src={imageUrl} alt={product.name} />
          </div>
          <div className="pd-info">
            <h1 className="pd-title">{product.name}</h1>
            <p className="pd-price">
              {(product.price * quantity).toLocaleString()} VND
              <span className="pd-unit">
                {" "}
                ({product.price.toLocaleString()} / sản phẩm)
              </span>
            </p>
            <p className="pd-description">
              {product.description || "Không có mô tả"}
            </p>

            <div className="pd-quantity-box">
              <button onClick={decrease} className="pd-qty-btn">
                -
              </button>
              <span className="pd-qty-number">{quantity}</span>
              <button onClick={increase} className="pd-qty-btn">
                +
              </button>
            </div>

            <button
              className={`pd-btn-buy ${addedEffect ? "added" : ""}`}
              onClick={handleAddToCart}
              disabled={!user?.id}
            >
              {addedText ? "Đã thêm vào giỏ" : "Thêm vào giỏ"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailsPage;
