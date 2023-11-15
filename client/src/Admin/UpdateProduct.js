import React, { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");

  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(`/get-product/${params.slug}`);
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setPhoto(data.product.photo);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);
  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      window.alert("Something wwent wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //create product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);

      const { data } = await axios.put(`/update-product/${id}`,
      productData);
      if (data?.success) {
        window.alert("Updated Successfully");
        navigate("/dashboard/AdminDashBoard/products");
      } else {
        //error
        window.alert(data?.message)
      }
    } catch (error) {
      //console.log(error);
      window.alert("something went wrong");
    }
  };

  //delete a product
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are You Sure want to delete this product ? ");
      if (!answer) return;
      const { data } = await axios.delete(`/delete-product/${id}`
      );
      window.alert("Product Deleted Successfully !!");
      navigate("/dashboard/AdminDashBoard/products");
    } catch (error) {
      console.log(error);
      window.alert("Something went wrong");
    }
 };

  return (
    <>
    <Navbar/>
    <div className="update-product">

<div className="container-fluid m-3 p-3" style={{ minHeight: "90vh" }}>
        <div className="row justify-content-between">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="py-2 col-md-7">
            <h1 className="pb-4" style={{marginLeft: '-240px'}}>Update Product</h1>

            <div className="py-3 px-3 col-8 border bg-white">
              <label className="d-flex">Category:  </label>
              <Select
                className="form-select" bordered={false} placeholder="Select a category" size="small" 
                showSearch  value={category} onChange={(value) => { setCategory(value); }} 
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}> {c.name} </Option>
                ))}
              </Select>
              <div className="mb-3">
              <label className="px-2">Product Photo: </label>
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input 
                  type="file" name="photo" accept="image/*" 
                    onChange={(e) => setPhoto(e.target.files[0])} hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)} alt="product_photo" height={"90px"} 
                      className="img img-responsive border"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`/product-photo/${id}`} alt="product_photo" height={"90px"} 
                      className="img img-responsive  border "
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
              <label className="d-flex">Product Name:</label>
                <input
                  type="text" className="form-control" value={name} placeholder="write a name" 
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mb-3">
              <label className="d-flex">Price:</label>
                <input
                  type="number" className="form-control" value={price} placeholder="write a Price" 
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
              <label className="d-flex">Quantity:</label>
                <input
                  type="number" className="form-control" value={quantity} placeholder="write a quantity" 
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
              <label className="d-flex">Shipping:</label>
                <Select className="form-select" bordered={false} placeholder="Select Shipping" size="small" 
                  showSearch onChange={(value) => { setShipping(value); }}value={shipping ? "yes" : "No"}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>

              <div className="mb-3">
                <textarea type="text" className="form-control" value={description} placeholder="write a description"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-3 ">
                <button className="btn btn-primary me-3" onClick={handleUpdate}>
                  UPDATE 
                </button>
              {/* </div> */}
              {/* <div className="mb-3"> */}
                <button className="btn btn-danger" onClick={handleDelete}>
                  DELETE 
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default UpdateProduct;