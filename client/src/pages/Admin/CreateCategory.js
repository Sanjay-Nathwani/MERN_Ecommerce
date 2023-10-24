import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  const [isLoading,setIsLoading] = useState(false);

  // handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `/api/v1/category/create-category`,
        {
          name,
        }
      );

      if (data?.success) {
        toast.success(`${name} is created!`, { theme: "dark" });
        setName("");
        getAllCategory();
      } else {
        toast.error(data.message, { theme: "dark" });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in category form!", { theme: "dark" });
    }
  };

  // handle update form
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );

      if (data.success) {
        toast.success(
          `${selected.name} category is updated to ${updatedName}!`,
          { theme: "dark" }
        );
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message, { theme: "dark" });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in updating category!", {
        theme: "dark",
      });
    }
  };

  // handle delete form
  const handleDelete = async (id,cname) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/category/delete-category/${id}`
      );

      if (data.success) {
        toast.success(
          `${cname} category is deleted!`,
          { theme: "dark" }
        );
        getAllCategory();
      } else {
        toast.error(data.message, { theme: "dark" });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in updating category!", {
        theme: "dark",
      });
    }
  };

  // get all categories
  const getAllCategory = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/all-categories`
      );
      setIsLoading(false);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.error("Something went wrong in getting categories!", {
        theme: "dark",
      });
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <Layout title={"Dashboard - Create Category"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
            <div className="p-3 w-50">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>

            {!isLoading ? (
              <div className="w-75">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories?.map((c) => (
                      <>
                        <tr>
                          <td key={c._id}>{c.name}</td>
                          <td>
                            <button
                              className="btn btn-primary ms-2"
                              onClick={() => {
                                setVisible(true);
                                setUpdatedName(c.name);
                                setSelected(c);
                              }}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger ms-2"
                              onClick={() => handleDelete(c._id, c.name)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}

            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              open={visible}
            >
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
