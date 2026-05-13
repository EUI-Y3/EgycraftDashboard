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

const Table1 = () => {

  // ================= STATE =================
  const [vendors, setVendors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [booths, setBooths] = useState([]);
  const [products, setProducts] = useState([]);

  // SEARCH & FILTER
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  // CREATE STATE
  const [name, setName] = useState("");
  const [boothId, setBoothId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [productId, setProductId] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  // EDIT STATE
  const [selectedVendor, setSelectedVendor] = useState(null);

  const [editName, setEditName] = useState("");
  const [editBoothId, setEditBoothId] = useState("");
  const [editCategoryId, setEditCategoryId] = useState("");
  const [editProductId, setEditProductId] = useState("");
  const [editProfilePic, setEditProfilePic] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editInstagram, setEditInstagram] = useState("");
  const [editFacebook, setEditFacebook] = useState("");

  const [isEditOpen, setIsEditOpen] = useState(false);

  // ================= GET DATA =================

  const getAllVendors = async () => {
    const { data, error } = await supabase
      .from("vendors")
      .select(`
        *,
        categories:category_ID(title),
        booths:booth_ID(booth_no)
      `);

    if (error) {
      console.log(error);
      return;
    }

    setVendors(data);
  };

  const getCategories = async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("*");

    if (error) {
      console.log(error);
      return;
    }

    setCategories(data);
  };

  const getBooths = async () => {
    const { data, error } = await supabase
      .from("booths")
      .select("*");

    if (error) {
      console.log(error);
      return;
    }

    setBooths(data);
  };

  const getProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*");

    if (error) {
      console.log(error);
      return;
    }

    setProducts(data);
  };

  useEffect(() => {
    getAllVendors();
    getCategories();
    getBooths();
    getProducts();
  }, []);

  // ================= FILTER =================

  const filteredVendors = vendors.filter((i) => {

    const matchesSearch =
      searchQuery === "" ||
      i.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.email?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      filterCategory === "" ||
      String(i.category_ID) === String(filterCategory);

    return matchesSearch && matchesCategory;
  });

  // ================= CREATE =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from("vendors")
      .insert([
        {
          name,
          booth_ID: boothId || null,
          category_ID: categoryId || null,
          product_ID: productId || null,
          profile_pic: profilePic,
          description,
          phone,
          email,
          instagram,
          facebook,
        },
      ]);

    if (error) {
      console.log("Insert error:", error);
      return;
    }

    await getAllVendors();

    setName("");
    setBoothId("");
    setCategoryId("");
    setProductId("");
    setProfilePic("");
    setDescription("");
    setPhone("");
    setEmail("");
    setInstagram("");
    setFacebook("");

    setIsOpen(false);
  };

  // ================= DELETE =================

  const deleteVendor = async (id) => {
    await supabase
      .from("vendors")
      .delete()
      .eq("id", id);

    await getAllVendors();
  };

  // ================= EDIT =================

  const openEdit = (vendor) => {

    setSelectedVendor(vendor);

    setEditName(vendor.name || "");
    setEditBoothId(vendor.booth_ID || "");
    setEditCategoryId(vendor.category_ID || "");
    setEditProductId(vendor.product_ID || "");
    setEditProfilePic(vendor.profile_pic || "");
    setEditDescription(vendor.description || "");
    setEditPhone(vendor.phone || "");
    setEditEmail(vendor.email || "");
    setEditInstagram(vendor.instagram || "");
    setEditFacebook(vendor.facebook || "");

    setIsEditOpen(true);
  };

  const closeEdit = () => {
    setIsEditOpen(false);
    setSelectedVendor(null);
  };

  // ================= UPDATE =================

  const handleUpdate = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from("vendors")
      .update({
        name: editName,
        booth_ID: editBoothId || null,
        category_ID: editCategoryId || null,
        product_ID: editProductId || null,
        profile_pic: editProfilePic,
        description: editDescription,
        phone: editPhone,
        email: editEmail,
        instagram: editInstagram,
        facebook: editFacebook,
      })
      .eq("id", selectedVendor.id);

    if (error) {
      console.log("Update error:", error);
      return;
    }

    await getAllVendors();
    closeEdit();
  };

  // ================= POPUPS =================

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
              placeholder="Search vendor.."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

          </div>

          {/* CATEGORY FILTER */}
          <select
            className="selection"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >

            <option value="">All Categories</option>

            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}

          </select>

          <button className="btn1" onClick={openPopup}>
            New Vendor
          </button>

        </div>

        {/* TABLE */}
        <div className="flex_column table1">

          {/* HEADER */}
          <div className="table1_header">

            <TableItem class="tableitem table1_item3" font="font_bold" text="Actions" />
            <TableItem class="tableitem table1_item1" font="font_bold" text="ID" />
            <TableItem class="tableitem table1_item1" font="font_bold" text="Image" />
            <TableItem class="tableitem table1_item3" font="font_bold" text="Vendor" />
            <TableItem class="tableitem table1_item3" font="font_bold" text="Category" />
            <TableItem class="tableitem table1_item3" font="font_bold" text="Booth" />
            <TableItem class="tableitem table1_item4" font="font_bold" text="Description" />
            <TableItem class="tableitem table1_item5" font="font_bold" text="Phone" />
            <TableItem class="tableitem table1_item5" font="font_bold" text="Email" />
            <TableItem class="tableitem table1_item6" font="font_bold" text="Created At" />

          </div>

          {/* ROWS */}
          {filteredVendors.length > 0 ? (
            filteredVendors.map((i) => (

              <div key={i.id} className="table1_header table_row1">

                {/* ACTIONS */}
                <div className="tableitem table1_item3">

                  <div className="tableitem_img">

                    <button
                      onClick={() => deleteVendor(i.id)}
                      title="delete"
                      className="btn5"
                    >
                      <img src={delete1} alt="" />
                    </button>

                    <button
                      onClick={() => openEdit(i)}
                      title="edit"
                      className="btn5"
                    >
                      <img src={edit} alt="" />
                    </button>

                  </div>

                </div>

                {/* ID */}
                <TableItem
                  class="tableitem table1_item1"
                  font="font_light h5_2"
                  text={i.id}
                />

                {/* IMAGE */}
                <div className="tableitem table1_item1">

                  <div className="tableitem_img">
                    <img src={i.profile_pic} alt="" />
                  </div>

                </div>

                {/* NAME */}
                <TableItem
                  class="tableitem table1_item3"
                  font="font_light"
                  text={i.name}
                />

                {/* CATEGORY */}
                <TableItem
                  class="tableitem table1_item3"
                  font="font_light"
                  text={i.categories?.title}
                />

                {/* BOOTH */}
                <TableItem
                  class="tableitem table1_item3"
                  font="font_light"
                  text={i.booths?.booth_no}
                />

                {/* DESCRIPTION */}
                <TableItem
                  class="tableitem table1_item4"
                  font="font_light h5_2"
                  text={i.description}
                />

                {/* PHONE */}
                <TableItem
                  class="tableitem table1_item5"
                  font="font_light"
                  text={i.phone}
                />

                {/* EMAIL */}
                <TableItem
                  class="tableitem table1_item5"
                  font="font_light"
                  text={i.email}
                />

                {/* CREATED */}
                <div className="tableitem table1_item6">
                  <h5 className="font_light h5_2">
                    {new Date(i.created_at).toLocaleDateString()}
                  </h5>
                </div>

              </div>
            ))
          ) : (
            <div className="table1_header">
              <h5 className="font_light h5_2">
                No vendors found.
              </h5>
            </div>
          )}

        </div>

        {/* CREATE POPUP */}
        <div className={`popUp ${isOpen ? "show" : "hide"}`}>

          <div className="bg div">

            <form className="form1" onSubmit={handleSubmit}>

              <button
                type="button"
                className="btn3 closed"
                onClick={closePopup}
              >
                <img src={close1} alt="" />
              </button>

              <Heading heading="Create Vendor" />

              <div className="chipsFlex">
                <input type="text" placeholder="Vendor Name" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" placeholder="Profile Image URL" value={profilePic} onChange={(e) => setProfilePic(e.target.value)} />
              </div>

              <div className="chipsFlex">
                <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>

              <div className="chipsFlex">
                <input type="text" placeholder="Instagram" value={instagram} onChange={(e) => setInstagram(e.target.value)} />
                <input type="text" placeholder="Facebook" value={facebook} onChange={(e) => setFacebook(e.target.value)} />
              </div>

              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              {/* CATEGORY */}
              <select
                className="selection"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >

                <option value="">Select Category</option>

                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}

              </select>

              {/* BOOTH */}
              <select
                className="selection"
                value={boothId}
                onChange={(e) => setBoothId(e.target.value)}
              >

                <option value="">Select Booth</option>

                {booths.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.booth_no}
                  </option>
                ))}

              </select>

              {/* PRODUCT */}
              <select
                className="selection"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              >

                <option value="">Select Product</option>

                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title}
                  </option>
                ))}

              </select>

              <button type="submit" className="btn1 btn4">
                Create Vendor
              </button>

            </form>

          </div>
        </div>

        {/* EDIT POPUP */}
        <div className={`popUp ${isEditOpen ? "show" : "hide"}`}>

          <div className="bg div">

            <form className="form1" onSubmit={handleUpdate}>

              <button
                type="button"
                className="btn3 closed"
                onClick={closeEdit}
              >
                <img src={close1} alt="" />
              </button>

              <Heading heading="Edit Vendor" />

              <div className="chipsFlex">
                <input type="text" placeholder="Vendor Name" value={editName} onChange={(e) => setEditName(e.target.value)} />
                <input type="text" placeholder="Profile Image URL" value={editProfilePic} onChange={(e) => setEditProfilePic(e.target.value)} />
              </div>

              <div className="chipsFlex">
                <input type="text" placeholder="Phone" value={editPhone} onChange={(e) => setEditPhone(e.target.value)} />
                <input type="email" placeholder="Email" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
              </div>

              <div className="chipsFlex">
                <input type="text" placeholder="Instagram" value={editInstagram} onChange={(e) => setEditInstagram(e.target.value)} />
                <input type="text" placeholder="Facebook" value={editFacebook} onChange={(e) => setEditFacebook(e.target.value)} />
              </div>

              <textarea
                placeholder="Description"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />

              {/* CATEGORY */}
              <select
                className="selection"
                value={editCategoryId}
                onChange={(e) => setEditCategoryId(e.target.value)}
              >

                <option value="">Select Category</option>

                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}

              </select>

              {/* BOOTH */}
              <select
                className="selection"
                value={editBoothId}
                onChange={(e) => setEditBoothId(e.target.value)}
              >

                <option value="">Select Booth</option>

                {booths.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.booth_no}
                  </option>
                ))}

              </select>

              {/* PRODUCT */}
              <select
                className="selection"
                value={editProductId}
                onChange={(e) => setEditProductId(e.target.value)}
              >

                <option value="">Select Product</option>

                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title}
                  </option>
                ))}

              </select>

              <button type="submit" className="btn1 btn4">
                Save Changes
              </button>

            </form>

          </div>
        </div>

      </div>
    </>
  );
};

export default Table1;