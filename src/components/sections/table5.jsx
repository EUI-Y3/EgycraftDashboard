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
  const [headerItems, setHeaderItems] = useState([]);

  // SEARCH STATE
  const [searchQuery, setSearchQuery] = useState("");

  // CREATE STATE
  const [titleEn, setTitleEn] = useState("");
  const [titleAr, setTitleAr] = useState("");
  const [link, setLink] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  // EDIT STATE
  const [selectedItem, setSelectedItem] = useState(null);
  const [editTitleEn, setEditTitleEn] = useState("");
  const [editTitleAr, setEditTitleAr] = useState("");
  const [editLink, setEditLink] = useState("");

  const [isEditOpen, setIsEditOpen] = useState(false);

  // GET HEADER ITEMS
  const getAllHeaderItems = async () => {
    const { data, error } = await supabase.from("header_item").select("*");

    if (error) {
      console.log(error);
      return;
    }

    setHeaderItems(data);
  };

  // GET ALL ON LOAD
  useEffect(() => {
    getAllHeaderItems();
  }, []);

  // FILTERED HEADER ITEMS
  const filteredHeaderItems = headerItems.filter((i) => {
    const matchesSearch =
      searchQuery === "" ||
      i.title_EN?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.title_AR?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.link?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  // CREATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("header_item").insert([
      {
        title_EN: titleEn,
        title_AR: titleAr,
        link: link,
      },
    ]);

    if (error) {
      console.log("Insert error:", error);
      return;
    }

    await getAllHeaderItems();

    // RESET
    setTitleEn("");
    setTitleAr("");
    setLink("");
    setIsOpen(false);
  };

  // DELETE
  const deleteHeaderItem = async (id) => {
    await supabase.from("header_item").delete().eq("id", id);
    await getAllHeaderItems();
  };

  // OPEN EDIT POPUP
  const openEdit = (item) => {
    setSelectedItem(item);
    setEditTitleEn(item.title_EN || "");
    setEditTitleAr(item.title_AR || "");
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
      .from("header_item")
      .update({
        title_EN: editTitleEn,
        title_AR: editTitleAr,
        link: editLink,
      })
      .eq("id", selectedItem.id);

    if (error) {
      console.log("Update error:", error);
      return;
    }

    await getAllHeaderItems();
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
              placeholder="Search header item.."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <button className="btn1" onClick={openPopup}>
            New Header Item
          </button>
        </div>

        {/* TABLE */}
        <div className="flex_column table1">
          {/* HEADER */}
          <div className="table1_header">
            <TableItem class="tableitem table1_item3" font="font_bold" text="Actions" />
            <TableItem class="tableitem table1_item1" font="font_bold" text="ID" />
            <TableItem class="tableitem table1_item3" font="font_bold" text="Title EN" />
            <TableItem class="tableitem table1_item3" font="font_bold" text="Title AR" />
            <TableItem class="tableitem table1_item4" font="font_bold" text="Link" />
            <TableItem class="tableitem table1_item6" font="font_bold" text="Created At" />
          </div>

          {/* ROWS */}
          {filteredHeaderItems.length > 0 ? (
            filteredHeaderItems.map((i) => (
              <div key={i.id} className="table1_header table_row1">
                <div className="tableitem table1_item3">
                  <div className="tableitem_img">
                    <button onClick={() => deleteHeaderItem(i.id)} title="delete" className="btn5">
                      <img src={delete1} alt="" />
                    </button>
                    <button onClick={() => openEdit(i)} title="edit" className="btn5">
                      <img src={edit} alt="" />
                    </button>
                  </div>
                </div>

                <TableItem class="tableitem table1_item1" font="font_light h5_2" text={i.id} />
                <TableItem class="tableitem table1_item3" font="font_light" text={i.title_EN} />
                <TableItem class="tableitem table1_item3" font="font_light" text={i.title_AR} />
                <TableItem class="tableitem table1_item4" font="font_light h5_2" text={i.link} />

                <div className="tableitem table1_item6">
                  <h5 className="font_light h5_2">{i.created_at}</h5>
                </div>
              </div>
            ))
          ) : (
            <div className="table1_header">
              <h5 className="font_light h5_2">
                No header items found.
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
              <Heading heading="Create Header Item" />

              <div className="chipsFlex">
                <input
                  type="text"
                  placeholder="Title EN"
                  value={titleEn}
                  onChange={(e) => setTitleEn(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Title AR"
                  value={titleAr}
                  onChange={(e) => setTitleAr(e.target.value)}
                />
              </div>

              <input
                type="text"
                placeholder="Link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />

              <button type="submit" className="btn1 btn4">Create Header Item</button>
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
              <Heading heading="Edit Header Item" />

              <div className="chipsFlex">
                <input
                  type="text"
                  placeholder="Title EN"
                  value={editTitleEn}
                  onChange={(e) => setEditTitleEn(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Title AR"
                  value={editTitleAr}
                  onChange={(e) => setEditTitleAr(e.target.value)}
                />
              </div>

              <input
                type="text"
                placeholder="Link"
                value={editLink}
                onChange={(e) => setEditLink(e.target.value)}
              />

              <button type="submit" className="btn1 btn4">Save Changes</button>
            </form>
          </div>
        </div>

      </div>
    </>
  );
};

export default Table5;