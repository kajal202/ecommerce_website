import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
     <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 d-flex justify-content-center align-items-center">
          <input
            type="text"
            className="form-control"
            placeholder="Enter new category"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <div className="d-flex justify-content-center align-items-center">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        </div>
      </form> 

      
    </>
  );
};

export default CategoryForm;
