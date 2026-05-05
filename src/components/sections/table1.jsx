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
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);

  // SEARCH & FILTER STATE
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  // CREATE STATE
  const [eventTitle, setEventTitle] = useState("");
  const [titleAr, setTitleAr] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [image, setImage] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  // EDIT STATE
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editTitleAr, setEditTitleAr] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editTime, setEditTime] = useState("");
  const [editImage, setEditImage] = useState("");
  const [editCategoryId, setEditCategoryId] = useState("");

  const [isEditOpen, setIsEditOpen] = useState(false);

  // GET EVENTS
  const getAllEvents = async () => {
    const { data, error } = await supabase
      .from("event")
      .select("*, Category(title)");

    if (error) {
      console.log(error);
      return;
    }

    setEvents(data);
  };

  // GET CATEGORIES
  const getCategories = async () => {
    const { data, error } = await supabase.from("Category").select("*");

    if (error) {
      console.log(error);
      return;
    }

    setCategories(data);
  };

  // GET ALL ON LOAD
  useEffect(() => {
    getAllEvents();
    getCategories();
  }, []);

  // FILTERED EVENTS — derived from search + category filter, no extra fetches needed
  const filteredEvents = events.filter((i) => {
    const matchesSearch =
      searchQuery === "" ||
      i.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.title_Ar?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.description?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      filterCategory === "" || String(i.category_id) === String(filterCategory);

    return matchesSearch && matchesCategory;
  });

  // CREATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("event").insert([
      {
        title: eventTitle,
        title_Ar: titleAr,
        description: description,
        image: image,
        date: date,
        time: time,
        location: location,
        price: price,
        category_id: categoryId,
      },
    ]);

    if (error) {
      console.log("Insert error:", error);
      return;
    }

    await getAllEvents();

    // RESET
    setEventTitle("");
    setTitleAr("");
    setDescription("");
    setLocation("");
    setPrice("");
    setDate("");
    setTime("");
    setImage("");
    setCategoryId("");
    setIsOpen(false);
  };

  // DELETE
  const deleteEvent = async (id) => {
    await supabase.from("event").delete().eq("id", id);
    await getAllEvents();
  };

  // OPEN EDIT POPUP
  const openEdit = (event) => {
    setSelectedEvent(event);
    setEditTitle(event.title || "");
    setEditTitleAr(event.title_Ar || "");
    setEditDescription(event.description || "");
    setEditLocation(event.location || "");
    setEditPrice(event.price || "");
    setEditDate(event.date || "");
    setEditTime(event.time || "");
    setEditImage(event.image || "");
    setEditCategoryId(event.category_id || "");
    setIsEditOpen(true);
  };

  const closeEdit = () => {
    setIsEditOpen(false);
    setSelectedEvent(null);
  };

  // UPDATE
  const handleUpdate = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from("event")
      .update({
        title: editTitle,
        title_Ar: editTitleAr,
        description: editDescription,
        image: editImage,
        date: editDate,
        time: editTime,
        location: editLocation,
        price: editPrice,
        category_id: editCategoryId,
      })
      .eq("id", selectedEvent.id);

    if (error) {
      console.log("Update error:", error);
      return;
    }

    await getAllEvents();
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
              placeholder="Search event.."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* FILTER BY CATEGORY */}
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
            New Event
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
            <TableItem class="tableitem table1_item1" font="font_bold" text="Location" />
            <TableItem class="tableitem table1_item4" font="font_bold" text="Description" />
            <TableItem class="tableitem table1_item5" font="font_bold" text="Price" />
            <TableItem class="tableitem table1_item5" font="font_bold" text="title_AR" />
            <TableItem class="tableitem table1_item4" font="font_bold" text="Description AR" />
            <TableItem class="tableitem table1_item6" font="font_bold" text="Last Updated" />
          </div>

          {/* ROWS */}
          {filteredEvents.length > 0 ? (
            filteredEvents.map((i) => (
              <div key={i.id} className="table1_header table_row1">
                <div className="tableitem table1_item3">
                  <div className="tableitem_img">
                    <button onClick={() => deleteEvent(i.id)} title="delete" className="btn5">
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
                <TableItem class="tableitem table1_item1" font="font_light h5_2" text={i.location} />
                <TableItem class="tableitem table1_item4" font="font_light h5_2" text={i.description} />
                <TableItem class="tableitem table1_item5" font="font_light" text={`  ${i.price} EGP`} />
                <TableItem class="tableitem table1_item5" font="font_light" text={i.title_Ar} />
                <TableItem class="tableitem table1_item5" font="font_light" text={i.description_Ar} />

                <div className="tableitem table1_item6">
                  <h5 className="font_light h5_2">{i.updated_at}</h5>
                </div>
              </div>
            ))
          ) : (
            <div className="table1_header">
              <h5 className="font_light h5_2">
                No events found.
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
              <Heading heading="Create Event" />

              <div className="chipsFlex">
                <input type="text" placeholder="Event Title" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} />
                <input type="text" placeholder="Arabic Title" value={titleAr} onChange={(e) => setTitleAr(e.target.value)} />
              </div>

              <div className="chipsFlex">
                <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
                <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>

              <div className="chipsFlex">
                <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </div>

              <div className="chipsFlex">
                <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
                <input type="text" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} />
              </div>
              <select className="selection" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.title}</option>
                ))}
              </select>

              <button type="submit" className="btn1 btn4">Create Event</button>
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
              <Heading heading="Edit Event" />

              <div className="chipsFlex">
                <input type="text" placeholder="Event Title" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                <input type="text" placeholder="Arabic Title" value={editTitleAr} onChange={(e) => setEditTitleAr(e.target.value)} />
              </div>

              <div className="chipsFlex">
                <input type="text" placeholder="Location" value={editLocation} onChange={(e) => setEditLocation(e.target.value)} />
                <input type="text" placeholder="Description" value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />
              </div>

              <div className="chipsFlex">
                <input type="number" placeholder="Price" value={editPrice} onChange={(e) => setEditPrice(e.target.value)} />
                <input type="date" value={editDate} onChange={(e) => setEditDate(e.target.value)} />
              </div>

              <div className="chipsFlex">
                <input type="time" value={editTime} onChange={(e) => setEditTime(e.target.value)} />
                <input type="text" placeholder="Image URL" value={editImage} onChange={(e) => setEditImage(e.target.value)} />
              </div>

              <select className="selection" value={editCategoryId} onChange={(e) => setEditCategoryId(e.target.value)}>
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.title}</option>
                ))}
              </select>

              <button type="submit" className="btn1 btn4">Save Changes</button>
            </form>
          </div>
        </div>

      </div>
    </>
  );
};

export default Table1;