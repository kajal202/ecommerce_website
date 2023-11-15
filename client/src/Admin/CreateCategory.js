import React, { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import CategoryForm from "./CategoryForm";
import axios from "axios";
import { Modal } from "antd";
import { BiTrash } from "react-icons/bi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/create-category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    const json = await res.json();
    if (res.status === 200) {
      window.alert("category created successfully");
      getAllCategory();
    } else {
      window.alert("Opps error");
    }
  };
// eslint-disable-next-line
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/get-category", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
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

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { data } = await axios.put(`/update-category/${selected._id}`, {
      name: updatedName,
    });
    if (data?.success) {
      window.alert(`${updatedName} is updated`);
      setSelected(null);
      setUpdatedName("");
      setOpen(false);
      getAllCategory();
    } else {
      window.alert(data?.message);
    }
  };

  const handleDelete = async (cId) => {
    const { data } = await axios.delete(`/delete-category/${cId}`);
    if (data.success) {
      window.alert(`category is deleted`);
      getAllCategory();
    } else {
      window.alert(data.error);
    }
  };

  return (
    <>
    <Navbar/>
    <div
      className="create-category"
      style={{ minHeight: "90vh", marginTop: "-16px" }}
    >
      <div className=" conatiner-fluid  m-3 p-3 ">
        <div
          className="row justify-content-between"
          style={{ paddingTop: "70px" }}
        >
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-7">
            <h1 className="pb-3 text-center" style={{ marginLeft: "-240px" }}>
              Manage Category
            </h1>
            <div className="p-4 col-9 ">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-75">
              <table className="table border">
                <thead>
                  <tr>
                    <th scope="col">No.</th>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c, index) => (
                    <>
                      <tr>
                        <td>{index + 1}</td>
                        <td key={c._id}>{c.name}</td>
                        <td>
                          <button
                            className="btn btn-primary ms-2"
                            onClick={() => {
                              setOpen(true);
                              setUpdatedName(c.name);
                              setSelected(c);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger ms-2"
                            onClick={() => {
                              handleDelete(c._id);
                            }}
                          >
                            <BiTrash />
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal onCancel={() => setOpen(false)} footer={null} open={open}>
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default CreateCategory;
