import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import Navbar  from '../components/Navbar';
import Sidebar  from '../components/Sidebar';
import TextInput2 from "../components/Elements/TextInput2";
import TextInput3 from "../components/Elements/TextInput3";
import { FiPlusCircle } from "react-icons/fi";
import { FaSave, FaTrashAlt } from "react-icons/fa";
import Buttons from "../components/Buttons";
import { MdDelete } from "react-icons/md";
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const ProductUpdate = () => {
  const { productName } = useParams(); 
  const navigate = useNavigate();

  const [product, setProduct] = useState({});

  const { activeMenu } = useStateContext();

  const [editFields, setEditFields] = useState({
    productName: "",
    brandName: "",
    productPrice: 0,
    offeredPrice: 0,
    offerName: "",
    productDescription: "",
    stocks: 0,
    category: "",
    subcategory: "",
    images: [""],
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/products/${productName}`)
      .then((response) => {
        const productData = response.data;
        setProduct(productData);

        setEditFields({
          productName: productData.productName,
          brandName: productData.brandName,
          productPrice: productData.productPrice,
          offeredPrice: productData.offeredPrice,
          offerName: productData.offerName,
          productDescription: productData.productDescription,
          stocks: productData.stocks,
          category: productData.category,
          subcategory: productData.subcategory,
          images: productData.images
        });
      })
      .catch((error) => console.log(productName));
  }, [productName]);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setEditFields({ ...editFields, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:8000/api/products/${productName}`, editFields, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success("product updated successfully")
          setTimeout(() => {
            navigate("/products");
          }, 2000);
        }else{
          toast.error("somthing went wrong")
        }
      })
      .catch((error) => {
        console.error("Error editing product:", error);
      });
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      fetch(`http://localhost:8000/api/products/${productName}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            toast.success("product deleted successfully")
            setTimeout(() => {
              navigate("/products");
            }, 2000);
          } else {
            throw new Error("Failed to delete product");
          }
        })
        .catch((error) => {
          console.error("Error deleting product:", error);
        });
    }
  };

  const handleImageChange = (index, value) => {
    const newImages = [...editFields.images];
    newImages[index] = value;
    setEditFields({ ...editFields, images: newImages });
  };

  const handleAddImage = () => {
    setEditFields({ ...editFields, images: [...editFields.images, ""] });
  };

  const handleRemoveImage = (index) => {
    const newImages = [...editFields.images];
    newImages.splice(index, 1);
    setEditFields({ ...editFields, images: newImages });
  };

  if (!product.images || product.images.length === 0) {
    return <div>No images found.</div>;
  }

  return (
    <div>
      <div className="flex relative ">
        {activeMenu ? (
          <div className="w-64 fixed sidebar  bg-white ">
            <Sidebar />
          </div>
        ) : (
          <div className="w-0 ">
            <Sidebar />
          </div>
        )}
        <div
          className={
            activeMenu
              ? "  bg-main-bg min-h-screen md:ml-64 w-full  "
              : "bg-main-bg   w-full min-h-screen flex-2 "
          }
        >
          <div className="xl:fixed bg-main-bg  navbar w-full ">
            <Navbar />
          </div>
          <div className=" flex mt-20 flex-wrap justify-center ">
            <div className="bg-white shadow-xl p-8 uppercase tracking-wider w-full m-12 rounded-2xl">
              <div>
                <a href="/">
                  <h3 className="text-xl uppercase font-bold text-black">
                    Update Product
                  </h3>
                </a>
                <div className=" my-4">
                  {product.images.map((image, index) => (
                    <div className="flex justify-center">
                      <img
                        src={image}
                        alt={product.productName}
                        className=" object-cover w-96 h-72"
                      />
                    </div>
                  ))}

                  <div className="px-44 mt-20">
                    <form onSubmit={handleSubmit}>
                      <div name="images">
                        {editFields.images.map((image, index) => (
                          <div
                            className="flex flex-wrap items-center justify-between"
                            key={index}
                          >
                            <div className="mb-3">
                              <label
                                htmlFor={`images.${index}`}
                                className="font-semibold"
                              >
                                Image {index + 1}
                              </label>
                              <br />
                              <TextInput2
                                name={`images.${index}`}
                                placeholder="Enter Image Url"
                                type="text"
                                className="mt-2"
                                value={editFields.images}
                                onChange={(e) =>
                                  handleImageChange(index, e.target.value)
                                }
                              />
                            </div>
                            <div className="">
                              <button
                                type="button"
                                className="btn btn-sm btn-primary"
                                onClick={() => handleRemoveImage(index)}
                              >
                                <FaTrashAlt />
                              </button>
                            </div>
                          </div>
                        ))} 
                        <button
                          type="button"
                          className=" transition 
                                    shadow-xl duration-700 mb-10 border-1 hover:bg-black hover:text-white p-2 rounded-full"
                          onClick={handleAddImage}
                        >
                          <FiPlusCircle />
                              </button>
                      </div>
                      <TextInput2
                        type="text"
                        id="productName"
                        name="productName"
                        label="product name"
                        value={editFields.productName}
                        onChange={handleFieldChange}
                      />
                     <div className="flex flex-wrap items-center my-3">
                     <label htmlFor="productDescription"
                      className="font-semibold mr-[505px]" >
                        product Description
                        </label>
                      <textarea  
                        id="productDescription"
                        name="productDescription"
                        value={editFields.productDescription}
                        onChange={handleFieldChange}
                        className="ml-68"
                        style={{fontWeight :"normal"}} 
                        rows={4} cols={30} />
                     </div>
                      <TextInput2
                        type="text"
                        label="brand name"
                        id="brandName"
                        name="brandName"
                        value={editFields.brandName}
                        onChange={handleFieldChange}
                      />
                      <TextInput2
                        type="text"
                        label="category"
                        id="category"
                        name="category"
                        value={editFields.category}
                        onChange={handleFieldChange}
                      />
                      <TextInput2
                        type="text"
                        label="subcategory"
                        id="subcategory"
                        name="subcategory"
                        value={editFields.subcategory}
                        onChange={handleFieldChange}
                      />
                      <TextInput2
                        type="text"
                        label="stocks"
                        id="stocks"
                        name="stocks"
                        value={editFields.stocks}
                        onChange={handleFieldChange}
                      />
                      <TextInput2
                        type="text"
                        label="productPrice"
                        id="productPrice"
                        name="productPrice"
                        value={editFields.productPrice}
                        onChange={handleFieldChange}
                      />
                      <TextInput3
                        type="text"
                        label="offeredPrice"
                        id="offeredPrice"
                        name="offeredPrice"
                        value={editFields.offeredPrice}
                        onChange={handleFieldChange}
                      />
                      <TextInput3
                        type="text"
                        label="offerName"
                        id="offerName"
                        name="offerName"
                        value={editFields.offerName}
                        onChange={handleFieldChange}
                      />

                      <div className=" mt-12 mb-10 flex flex-wrap justify-evenly">
                        <Buttons
                          type="submit"
                          btnlabel="save"
                          icons={<FaSave />}
                        />
                        <Buttons
                          type="button"
                          func={handleDelete}
                          btnlabel="delete"
                          icons={<MdDelete />}
                        />
                      </div>
                    </form>
                  </div>
                </div>
                <ToastContainer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
