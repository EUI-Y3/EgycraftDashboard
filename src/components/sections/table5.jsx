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

const Table5 = () => {
  // STATE
  const [navItems, setNavItems] = useState([]);

  // SEARCH STATE
  const [searchQuery, setSearchQuery] = useState("");

  // CREATE STATE
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // EDIT STATE
  const [selectedItem, setSelectedItem] = useState(null);
  const [editName, setEditName] = useState("");
  const [editLink, setEditLink] = useState("");
  const [isEditOpen, setIsEditOpen] = useState(false);

  // GET ALL
  const getAllNavItems = async () => {
    const { data, error } = await supabase.from("navigation").select("*");

    if (error) {
      console.log(error);
      return;
    }

    setNavItems(data);
  };

  useEffect(() => {
    getAllNavItems();
  }, []);

  // FILTERED
  const filteredNavItems = navItems.filter((i) => {
    return (
      searchQuery === "" ||
      i.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.link?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // CREATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("navigation").insert([
      { name, link },
    ]);

    if (error) {
      console.log("Insert error:", error);
      return;
    }

    await getAllNavItems();
    setName("");
    setLink("");
    setIsOpen(false);
  };

  // DELETE
  const deleteNavItem = async (id) => {
    await supabase.from("navigation").delete().eq("id", id);
    await getAllNavItems();
  };

  // OPEN EDIT POPUP
  const openEdit = (item) => {
    setSelectedItem(item);
    setEditName(item.name || "");
    setEditLink(item.link || "");
    setIsEditOpen(true);
  };

  const closeEdit = () => {
    setIsEditOpen(false);
    setSelectedItem(null);
  };

  // UPDATE
  const handleUpdate = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from("navigation")
      .update({ name: editName, link: editLink })
      .eq("id", selectedItem.id);

    if (error) {
      console.log("Update error:", error);
      return;
    }

    await getAllNavItems();
    closeEdit();
  };

  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  return (
    <>
      <div id="header-management" data-section className="container_3 table_container">
        {/* HEADER */}
        <h2>
          Website Main Navigations
        </h2>
        <div className="heading_buttonflex1">
          <div className="searchbar2">
            <button className="btn5" type="button">
              <img src={search} alt="search" />
            </button>
            <input
              type="text"
              placeholder="Search navigation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <button className="btn1" onClick={openPopup}>
            New Nav Item
          </button>
        </div>

        {/* TABLE */}
        <div className="flex_column table1">
          {/* HEADER ROW */}
          <div className="table1_header">
            <TableItem class="tableitem table1_item3" font="font_bold" text="Actions" />
            <TableItem class="tableitem table1_item1" font="font_bold" text="ID" />
            <TableItem class="tableitem table1_item3" font="font_bold" text="Name" />
            <TableItem class="tableitem table1_item4" font="font_bold" text="Link" />
            <TableItem class="tableitem table1_item6" font="font_bold" text="Created At" />
          </div>

          {/* ROWS */}
          {filteredNavItems.length > 0 ? (
            filteredNavItems.map((i) => (
              <div key={i.id} className="table1_header table_row1">
                <div className="tableitem table1_item3">
                  <div className="tableitem_img">
                    <button onClick={() => deleteNavItem(i.id)} title="delete" className="btn5">
                      <img src={delete1} alt="" />
                    </button>
                    <button onClick={() => openEdit(i)} title="edit" className="btn5">
                      <img src={edit} alt="" />
                    </button>
                  </div>
                </div>

                <TableItem class="tableitem table1_item1" font="font_light h5_2" text={i.id} />
                <TableItem class="tableitem table1_item3" font="font_light" text={i.name} />
                <TableItem class="tableitem table1_item4" font="font_light h5_2" text={i.link} />

                <div className="tableitem table1_item6">
                  <h5 className="font_light h5_2">{i.created_at}</h5>
                </div>
              </div>
            ))
          ) : (
            <div className="table1_header">
              <h5 className="font_light h5_2">No navigation items found.</h5>
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
              <Heading heading="Create Nav Item" />

              <div className="inputFlex">
                <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                type="text"
                placeholder="Link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
              </div>

              <button type="submit" className="btn1 btn4">Create Nav Item</button>
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
              <Heading heading="Edit Nav Item" />

              <div className="inputFlex">
                <input
                type="text"
                placeholder="Name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />

              <input
                type="text"
                placeholder="Link"
                value={editLink}
                onChange={(e) => setEditLink(e.target.value)}
              />
              </div>

              <button type="submit" className="btn1 btn4">Save Changes</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Table5;