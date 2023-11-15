import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminMenu from "./AdminMenu";
import axios from "axios";
import { Select } from "antd";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const { Option } = Select;
const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      window.alert("Something went wrong in getting product catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);

      const { data } = await axios.post("/create-product", productData);
      if (data?.success) {
        window.alert("Product Created Successfully");
        navigate("/dashboard/AdminDashBoard/products");
      } else {
        //error
        window.alert(data?.message);
      }
    } catch (error) {
      //console.log(error);
      window.alert("something went wrong");
    }
  };

  return (
    <>
    <Navbar/>
    <div
      className=" create-product"
      style={{ minHeight: "90vh", marginTop:"-16px"}}
    >
      <div className="p-4 container-fluid  m-3  ">
        <div className="row justify-content-between" style={{paddingTop:"60px"}}>
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-7 ">
            <h2 className="text-center pb-1" style={{ marginLeft: "-240px" }}>
              Create Product
            </h2>

            <div className="bg-white px-2 col-8 border ">
              <label className="d-flex ">Category: </label>
              <Select
                className=" form-select p-0"
                bordered={false}
                placeholder="Select a category..."
                size="small "
                showSearch
                value={category}
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}{" "}
                  </Option>
                ))}
              </Select>

              <div className="mb-3 p-0">
                <label className="px-2">Product Photo: </label>
                <label className=" btn btn-outline-secondary col-md-10 p-0">
                  {photo ? photo.name : "Upload Photo here.."}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>

              <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"250px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label className="d-flex p-0">Product Name:</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="d-flex p-0">Price:</label>
                <input
                  type="number"
                  className="form-control"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="d-flex m-0">Quantity:</label>
                <input
                  type="number"
                  className="form-control "
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="d-flex ">Shipping:</label>
                <Select
                  className="form-select "
                  bordered={false}
                  placeholder="Select Shipping"
                  size="small"
                  showSearch
                  onChange={(value) => {
                    setShipping(value);
                  }}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>

              <div className="mb-3">
                <textarea
                  type="text"
                  className="form-control p-0"
                  value={description}
                 
                  placeholder="write a description..."
                  size="small"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-3 d-flex justify-content-center align-items-center">
                <button className="btn btn-primary" onClick={handleCreate}>
                  Create Product
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

export default CreateProduct;
