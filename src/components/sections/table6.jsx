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

const Table6 = () => {
  // ================= STATE =================
  const [reviews, setReviews] = useState([]);

  // SEARCH STATE
  const [searchQuery, setSearchQuery] = useState("");

  // CREATE STATE
  const [name, setName] = useState("");
  const [rating, setRating] = useState("");
  const [quote, setQuote] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  // EDIT STATE
  const [selectedReview, setSelectedReview] = useState(null);
  const [editName, setEditName] = useState("");
  const [editRating, setEditRating] = useState("");
  const [editQuote, setEditQuote] = useState("");

  const [isEditOpen, setIsEditOpen] = useState(false);

  // GET REVIEWS
  const getAllReviews = async () => {
    const { data, error } = await supabase.from("Review").select("*");

    if (error) {
      console.log(error);
      return;
    }

    setReviews(data);
  };

  // GET ALL ON LOAD
  useEffect(() => {
    getAllReviews();
  }, []);

  // FILTERED REVIEWS — derived from search, no extra fetches needed
  const filteredReviews = reviews.filter((i) => {
    const matchesSearch =
      searchQuery === "" ||
      i.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.quote?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  // CREATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("Review").insert([
      {
        name: name,
        rating: rating,
        quote: quote,
      },
    ]);

    if (error) {
      console.log("Insert error:", error);
      return;
    }

    await getAllReviews();

    // RESET
    setName("");
    setRating("");
    setQuote("");
    setIsOpen(false);
  };

  // DELETE
  const deleteReview = async (id) => {
    await supabase.from("Review").delete().eq("id", id);
    await getAllReviews();
  };

  // OPEN EDIT POPUP
  const openEdit = (review) => {
    setSelectedReview(review);
    setEditName(review.name || "");
    setEditRating(review.rating || "");
    setEditQuote(review.quote || "");
    setIsEditOpen(true);
  };

  const closeEdit = () => {
    setIsEditOpen(false);
    setSelectedReview(null);
  };

  // UPDATE
  const handleUpdate = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from("Review")
      .update({
        name: editName,
        rating: editRating,
        quote: editQuote,
      })
      .eq("id", selectedReview.id);

    if (error) {
      console.log("Update error:", error);
      return;
    }

    await getAllReviews();
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
              placeholder="Search review.."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <button className="btn1" onClick={openPopup}>
            New Review
          </button>
        </div>

        {/* TABLE */}
        <div className="flex_column table1">
          {/* HEADER */}
          <div className="table1_header">
            <TableItem class="tableitem table1_item3" font="font_bold" text="Actions" />
            <TableItem class="tableitem table1_item1" font="font_bold" text="ID" />
            <TableItem class="tableitem table1_item3" font="font_bold" text="Name" />
            <TableItem class="tableitem table1_item1" font="font_bold" text="Rating" />
            <TableItem class="tableitem table1_item4" font="font_bold" text="Quote" />
            <TableItem class="tableitem table1_item6" font="font_bold" text="Created At" />
          </div>

          {/* ROWS */}
          {filteredReviews.length > 0 ? (
            filteredReviews.map((i) => (
              <div key={i.id} className="table1_header table_row1">
                <div className="tableitem table1_item3">
                  <div className="tableitem_img">
                    <button onClick={() => deleteReview(i.id)} title="delete" className="btn5">
                      <img src={delete1} alt="" />
                    </button>
                    <button onClick={() => openEdit(i)} title="edit" className="btn5">
                      <img src={edit} alt="" />
                    </button>
                  </div>
                </div>

                <TableItem class="tableitem table1_item1" font="font_light h5_2" text={i.id} />
                <TableItem class="tableitem table1_item3" font="font_light" text={i.name} />
                <TableItem class="tableitem table1_item1" font="font_light" text={i.rating} />
                <TableItem class="tableitem table1_item4" font="font_light h5_2" text={i.quote} />

                <div className="tableitem table1_item6">
                  <h5 className="font_light h5_2">{i.created_at}</h5>
                </div>
              </div>
            ))
          ) : (
            <div className="table1_header">
              <h5 className="font_light h5_2">
                No reviews found.
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
              <Heading heading="Create Review" />

              <div className="chipsFlex">
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Rating"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                />
              </div>

              <input
                type="text"
                placeholder="Quote"
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
              />

              <button type="submit" className="btn1 btn4">Create Review</button>
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
              <Heading heading="Edit Review" />

              <div className="chipsFlex">
                <input
                  type="text"
                  placeholder="Name"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Rating"
                  value={editRating}
                  onChange={(e) => setEditRating(e.target.value)}
                />
              </div>

              <input
                type="text"
                placeholder="Quote"
                value={editQuote}
                onChange={(e) => setEditQuote(e.target.value)}
              />

              <button type="submit" className="btn1 btn4">Save Changes</button>
            </form>
          </div>
        </div>

      </div>
    </>
  );
};

export default Table6;