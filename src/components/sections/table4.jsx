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
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // CREATE STATE
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [vendorsLength, setVendorsLength] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // EDIT STATE
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editImage, setEditImage] = useState("");
  const [editVendorsLength, setEditVendorsLength] = useState("");
  const [isEditOpen, setIsEditOpen] = useState(false);

  // GET CATEGORIES
  const getAllCategories = async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("id, created_at, title, image, vendorsLength");

    if (error) {
      console.log(error);
      return;
    }

    setCategories(data);
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  // FILTERED CATEGORIES
  const filteredCategories = categories.filter((i) =>
    searchQuery === "" ||
    i.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // CREATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("categories").insert([
      {
        title,
        image,
        vendorsLength: Number(vendorsLength),
      },
    ]);

    if (error) { console.log("Insert error:", error); return; }

    await getAllCategories();
    setTitle("");
    setImage("");
    setVendorsLength("");
    setIsOpen(false);
  };

  // DELETE
  const deleteCategory = async (id) => {
    await supabase.from("categories").delete().eq("id", id);
    await getAllCategories();
  };

  // OPEN EDIT POPUP
  const openEdit = (category) => {
    setSelectedCategory(category);
    setEditTitle(category.title || "");
    setEditImage(category.image || "");
    setEditVendorsLength(category.vendorsLength ?? "");
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
      .from("categories")
      .update({
        title: editTitle,
        image: editImage,
        vendorsLength: Number(editVendorsLength),
      })
      .eq("id", selectedCategory.id);

    if (error) { console.log("Update error:", error); return; }

    await getAllCategories();
    closeEdit();
  };

  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  return (
    <>
      <div className="container_3 table_container">

        {/* HEADER */}
        <div className="heading_buttonflex1">
          <div className="searchbar2">
            <button className="btn5" type="button" aria-label="Search">
              <img src={search} alt="" aria-hidden="true" />
            </button>
            <input
              type="text"
              placeholder="Search category.."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search categories"
            />
          </div>
          <button className="btn1" onClick={openPopup} aria-label="Create new category">
            New Category
          </button>
        </div>

        {/* TABLE */}
        <div className="flex_column table1" role="table" aria-label="Categories table">

          {/* TABLE HEADER */}
          <div className="table1_header" role="row">
            <TableItem class="tableitem table1_item3" font="font_bold" text="Actions"        role="columnheader" />
            <TableItem class="tableitem table1_item1" font="font_bold" text="ID"             role="columnheader" />
            <TableItem class="tableitem table1_item1" font="font_bold" text="Image"          role="columnheader" />
            <TableItem class="tableitem table1_item3" font="font_bold" text="Title"          role="columnheader" />
            <TableItem class="tableitem table1_item3" font="font_bold" text="No. of Vendors" role="columnheader" />
            <TableItem class="tableitem table1_item6" font="font_bold" text="Created At"     role="columnheader" />
          </div>

          {/* TABLE ROWS */}
          {filteredCategories.length > 0 ? (
            filteredCategories.map((i) => (
              <div
                key={i.id}
                className="table1_header table_row1"
                role="row"
                tabIndex={0}
                aria-label={`Category: ${i.title}`}
              >
                {/* ACTIONS */}
                <div className="tableitem table1_item3" role="cell">
                  <div className="tableitem_img">
                    <button
                      onClick={() => deleteCategory(i.id)}
                      className="btn5"
                      aria-label="Delete"
                    >
                      <img src={delete1} alt="" aria-hidden="true" />
                    </button>
                    <button
                      onClick={() => openEdit(i)}
                      className="btn5"
                      aria-label="Edit"
                    >
                      <img src={edit} alt="" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                {/* ID */}
                <TableItem class="tableitem table1_item1" font="font_light h5_2" text={i.id} role="cell" />

                {/* IMAGE */}
                <div className="tableitem table1_item1" role="cell">
                  <div className="tableitem_img">
                    <img src={i.image} alt={i.title} />
                  </div>
                </div>

                {/* TITLE */}
                <TableItem class="tableitem table1_item3" font="font_light" text={i.title}         role="cell" />

                {/* VENDORS LENGTH */}
                <TableItem class="tableitem table1_item3" font="font_light" text={i.vendorsLength}  role="cell" />

                {/* CREATED AT */}
                <div className="tableitem table1_item6" role="cell">
                  <h5 className="font_light h5_2">
                    {new Date(i.created_at).toLocaleDateString()}
                  </h5>
                </div>

              </div>
            ))
          ) : (
            <div className="table1_header" role="row">
              <h5 className="font_light h5_2">No categories found.</h5>
            </div>
          )}
        </div>

        {/* CREATE POPUP */}
        <div
          className={`popUp ${isOpen ? "show" : "hide"}`}
          role="dialog"
          aria-modal="true"
          aria-label="Create category"
        >
          <div className="bg div">
            <form className="form1" onSubmit={handleSubmit}>
              <button
                type="button"
                className="btn3 closed"
                onClick={closePopup}
                aria-label="Close create popup"
              >
                <img src={close1} alt="" aria-hidden="true" />
              </button>
              <Heading heading="Create Category" />

              <div className="inputFlex">
                <input
                type="text"
                placeholder="Category Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                aria-label="Category title"
              />
              <input
                type="text"
                placeholder="Image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                aria-label="Image URL"
              />
              </div>
              <input
                type="number"
                placeholder="Number of Vendors"
                value={vendorsLength}
                onChange={(e) => setVendorsLength(e.target.value)}
                aria-label="Number of vendors"
              />

              <button type="submit" className="btn1 btn4">Create Category</button>
            </form>
          </div>
        </div>

        {/* EDIT POPUP */}
        <div
          className={`popUp ${isEditOpen ? "show" : "hide"}`}
          role="dialog"
          aria-modal="true"
          aria-label="Edit category"
        >
          <div className="bg div">
            <form className="form1" onSubmit={handleUpdate}>
              <button
                type="button"
                className="btn3 closed"
                onClick={closeEdit}
                aria-label="Close edit popup"
              >
                <img src={close1} alt="" aria-hidden="true" />
              </button>
              <Heading heading="Edit Category" />

             <div className="inputFlex">
               <input
                type="text"
                placeholder="Category Title"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                aria-label="Category title"
              />
              <input
                type="text"
                placeholder="Image URL"
                value={editImage}
                onChange={(e) => setEditImage(e.target.value)}
                aria-label="Image URL"
              />
             </div>
              <input
                type="number"
                placeholder="Number of Vendors"
                value={editVendorsLength}
                onChange={(e) => setEditVendorsLength(e.target.value)}
                aria-label="Number of vendors"
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