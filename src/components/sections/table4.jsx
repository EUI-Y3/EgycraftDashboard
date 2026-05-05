import React, { useState, useEffect } from "react";
import "./table1.css";
import "./../layout/popup.css";

import search from "./../../assets/seaechbar.svg";
import delete1 from "./../../assets/delete.svg";
import edit from "./../../assets/edit.svg";
import TableItem from "../common/tableitem";
import close1 from "./../../assets/close.svg";

import { supabase } from "../../supabase";
import Heading from "../common/heading";

const Table4 = () => {
  // CATEGORES STATE
  const [categories, setCategories] = useState([]);

  // SEARCH STATE
  const [searchQuery, setSearchQuery] = useState("");

  // CREATE STATE
  const [title, setTitle] = useState("");
  const [titleAr, setTitleAr] = useState("");
  const [image, setImage] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  // EDIT STATE
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editTitleAr, setEditTitleAr] = useState("");
  const [editImage, setEditImage] = useState("");

  const [isEditOpen, setIsEditOpen] = useState(false);

  // GET CATEGORIES
  const getAllCategories = async () => {
    const { data, error } = await supabase.from("Category").select("*");

    if (error) {
      console.log(error);
      return;
    }

    setCategories(data);
  };

  // GET ALL ON LOAD
  useEffect(() => {
    getAllCategories();
  }, []);

  // FILTERED CATEGORIES
  const filteredCategories = categories.filter((i) => {
    const matchesSearch =
      searchQuery === "" ||
      i.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.title_AR?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  // CREATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("Category").insert([
      {
        title: title,
        title_AR: titleAr,
        image: image,
      },
    ]);

    if (error) {
      console.log("Insert error:", error);
      return;
    }

    await getAllCategories();

    // RESET
    setTitle("");
    setTitleAr("");
    setImage("");
    setIsOpen(false);
  };

  // DELETE
  const deleteCategory = async (id) => {
    await supabase.from("Category").delete().eq("id", id);
    await getAllCategories();
  };

  // OPEN EDIT POPUP
  const openEdit = (category) => {
    setSelectedCategory(category);
    setEditTitle(category.title || "");
    setEditTitleAr(category.title_AR || "");
    setEditImage(category.image || "");
    setIsEditOpen(true);
  };

  const closeEdit = () => {
    setIsEditOpen(false);
    setSelectedCategory(null);
  };

  // UPDATE
  const handleUpdate = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from("Category")
      .update({
        title: editTitle,
        title_AR: editTitleAr,
        image: editImage,
      })
      .eq("id", selectedCategory.id);

    if (error) {
      console.log("Update error:", error);
      return;
    }

    await getAllCategories();
    closeEdit();
  };

  // CREATE POPUP
  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  return (
    <>
      <div className="container_3 table_container">
        {/* HEADER */}
        <div className="heading_buttonflex1">

          {/* SEARCH */}
          <div className="searchbar2">
            <button className="btn5" type="button">
              <img src={search} alt="search" />
            </button>
            <input
              type="text"
              placeholder="Search category.."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <button className="btn1" onClick={openPopup}>
            New Category
          </button>
        </div>

        {/* TABLE */}
        <div className="flex_column table1">
          {/* HEADER */}
          <div className="table1_header">
            <TableItem class="tableitem table1_item3" font="font_bold" text="Actions" />
            <TableItem class="tableitem table1_item1" font="font_bold" text="ID" />
            <TableItem class="tableitem table1_item1" font="font_bold" text="Image" />
            <TableItem class="tableitem table1_item3" font="font_bold" text="Title" />
            <TableItem class="tableitem table1_item3" font="font_bold" text="Title AR" />
            <TableItem class="tableitem table1_item6" font="font_bold" text="Created At" />
          </div>

          {/* ROWS */}
          {filteredCategories.length > 0 ? (
            filteredCategories.map((i) => (
              <div key={i.id} className="table1_header table_row1">
                <div className="tableitem table1_item3">
                  <div className="tableitem_img">
                    <button onClick={() => deleteCategory(i.id)} title="delete" className="btn5">
                      <img src={delete1} alt="" />
                    </button>
                    <button onClick={() => openEdit(i)} title="edit" className="btn5">
                      <img src={edit} alt="" />
                    </button>
                  </div>
                </div>

                <TableItem class="tableitem table1_item1" font="font_light h5_2" text={i.id} />

                <div className="tableitem table1_item1">
                  <div className="tableitem_img">
                    <img src={i.image} alt="" />
                  </div>
                </div>

                <TableItem class="tableitem table1_item3" font="font_light" text={i.title} />
                <TableItem class="tableitem table1_item3" font="font_light" text={i.title_AR} />

                <div className="tableitem table1_item6">
                  <h5 className="font_light h5_2">{i.created_at}</h5>
                </div>
              </div>
            ))
          ) : (
            <div className="table1_header">
              <h5 className="font_light h5_2">
                No categories found.
              </h5>
            </div>
          )}
        </div>

        {/* CREATE POPUP */}
        <div className={`popUp ${isOpen ? "show" : "hide"}`}>
          <div className="bg div">
            <form className="form1" onSubmit={handleSubmit}>
              <button type="button" className="btn3 closed" onClick={closePopup}>
                <img src={close1} alt="" />
              </button>
              <Heading heading="Create Category" />

              <div className="chipsFlex">
                <input
                  type="text"
                  placeholder="Category Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Arabic Title"
                  value={titleAr}
                  onChange={(e) => setTitleAr(e.target.value)}
                />
              </div>

              <input
                type="text"
                placeholder="Image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />

              <button type="submit" className="btn1 btn4">Create Category</button>
            </form>
          </div>
        </div>
        {/* EDIT POPUP */}
        <div className={`popUp ${isEditOpen ? "show" : "hide"}`}>
          <div className="bg div">
            <form className="form1" onSubmit={handleUpdate}>
              <button type="button" className="btn3 closed" onClick={closeEdit}>
                <img src={close1} alt="" />
              </button>
              <Heading heading="Edit Category" />

              <div className="chipsFlex">
                <input
                  type="text"
                  placeholder="Category Title"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Arabic Title"
                  value={editTitleAr}
                  onChange={(e) => setEditTitleAr(e.target.value)}
                />
              </div>

              <input
                type="text"
                placeholder="Image URL"
                value={editImage}
                onChange={(e) => setEditImage(e.target.value)}
              />

              <button type="submit" className="btn1 btn4">Save Changes</button>
            </form>
          </div>
        </div>

      </div>
    </>
  );
};

export default Table4;