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

const Table7 = () => {
  const [faqs, setFaqs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // CREATE STATE
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [icon, setIcon] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // EDIT STATE
  const [selectedFaq, setSelectedFaq] = useState(null);
  const [editQuestion, setEditQuestion] = useState("");
  const [editAnswer, setEditAnswer] = useState("");
  const [editIcon, setEditIcon] = useState("");
  const [isEditOpen, setIsEditOpen] = useState(false);

  // GET FAQS
  const getAllFaqs = async () => {
    const { data, error } = await supabase
      .from("faq")
      .select("id, created_at, question, answer, icon");

    if (error) {
      console.log(error);
      return;
    }

    setFaqs(data);
  };

  useEffect(() => {
    getAllFaqs();
  }, []);

  // FILTERED FAQS
  const filteredFaqs = faqs.filter((i) =>
    searchQuery === "" ||
    i.question?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.answer?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // CREATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("faq").insert([
      {
        question,
        answer,
        icon,
      },
    ]);

    if (error) { console.log("Insert error:", error); return; }

    await getAllFaqs();
    setQuestion("");
    setAnswer("");
    setIcon("");
    setIsOpen(false);
  };

  // DELETE
  const deleteFaq = async (id) => {
    await supabase.from("faq").delete().eq("id", id);
    await getAllFaqs();
  };

  // OPEN EDIT POPUP
  const openEdit = (faq) => {
    setSelectedFaq(faq);
    setEditQuestion(faq.question || "");
    setEditAnswer(faq.answer || "");
    setEditIcon(faq.icon || "");
    setIsEditOpen(true);
  };

  const closeEdit = () => {
    setIsEditOpen(false);
    setSelectedFaq(null);
  };

  // UPDATE
  const handleUpdate = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from("faq")
      .update({
        question: editQuestion,
        answer: editAnswer,
        icon: editIcon,
      })
      .eq("id", selectedFaq.id);

    if (error) { console.log("Update error:", error); return; }

    await getAllFaqs();
    closeEdit();
  };

  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  return (
    <>
      <div id="FAQ-management" data-section className="container_3 table_container">
        <h2>FAQ Management</h2>
        {/* HEADER */}
        <div className="heading_buttonflex1">
          <div className="searchbar2">
            <button className="btn5" type="button" aria-label="Search">
              <img src={search} alt="" aria-hidden="true" />
            </button>
            <input
              type="text"
              placeholder="Search FAQ.."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search FAQs"
            />
          </div>
          <button className="btn1" onClick={openPopup} aria-label="Create new FAQ">
            New FAQ
          </button>
        </div>

        {/* TABLE */}
        <div className="flex_column table1" role="table" aria-label="FAQ table">

          {/* TABLE HEADER */}
          <div className="table1_header" role="row">
            <TableItem class="tableitem table1_item3" font="font_bold" text="Actions"    role="columnheader" />
            <TableItem class="tableitem table1_item1" font="font_bold" text="ID"         role="columnheader" />
            <TableItem class="tableitem table1_item1" font="font_bold" text="Icon"       role="columnheader" />
            <TableItem class="tableitem table1_item3" font="font_bold" text="Question"   role="columnheader" />
            <TableItem class="tableitem table1_item3" font="font_bold" text="Answer"     role="columnheader" />
            <TableItem class="tableitem table1_item6" font="font_bold" text="Created At" role="columnheader" />
          </div>

          {/* TABLE ROWS */}
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((i) => (
              <div
                key={i.id}
                className="table1_header table_row1"
                role="row"
                tabIndex={0}
                aria-label={`FAQ: ${i.question}`}
              >
                {/* ACTIONS */}
                <div className="tableitem table1_item3" role="cell">
                  <div className="tableitem_img">
                    <button
                      onClick={() => deleteFaq(i.id)}
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

                {/* ICON */}
                <div className="tableitem table1_item1" role="cell">
                  <div className="tableitem_img">
                    <img src={i.icon} alt={i.question} />
                  </div>
                </div>

                {/* QUESTION */}
                <TableItem class="tableitem table1_item3" font="font_light" text={i.question} role="cell" />

                {/* ANSWER */}
                <TableItem class="tableitem table1_item3" font="font_light" text={i.answer}   role="cell" />

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
              <h5 className="font_light h5_2">No FAQs found.</h5>
            </div>
          )}
        </div>

        {/* CREATE POPUP */}
        <div
          className={`popUp ${isOpen ? "show" : "hide"}`}
          role="dialog"
          aria-modal="true"
          aria-label="Create FAQ"
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
              <Heading heading="Create FAQ" />

              <div className="inputFlex">
                <input
                  type="text"
                  placeholder="Question"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  aria-label="Question"
                />
                <input
                  type="text"
                  placeholder="Icon URL"
                  value={icon}
                  onChange={(e) => setIcon(e.target.value)}
                  aria-label="Icon URL"
                />
              </div>
              <input
                type="text"
                placeholder="Answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                aria-label="Answer"
              />

              <button type="submit" className="btn1 btn4">Create FAQ</button>
            </form>
          </div>
        </div>

        {/* EDIT POPUP */}
        <div
          className={`popUp ${isEditOpen ? "show" : "hide"}`}
          role="dialog"
          aria-modal="true"
          aria-label="Edit FAQ"
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
              <Heading heading="Edit FAQ" />

              <div className="inputFlex">
                <input
                  type="text"
                  placeholder="Question"
                  value={editQuestion}
                  onChange={(e) => setEditQuestion(e.target.value)}
                  aria-label="Question"
                />
                <input
                  type="text"
                  placeholder="Icon URL"
                  value={editIcon}
                  onChange={(e) => setEditIcon(e.target.value)}
                  aria-label="Icon URL"
                />
              </div>
              <input
                type="text"
                placeholder="Answer"
                value={editAnswer}
                onChange={(e) => setEditAnswer(e.target.value)}
                aria-label="Answer"
              />

              <button type="submit" className="btn1 btn4">Save Changes</button>
            </form>
          </div>
        </div>

      </div>
    </>
  );
};

export default Table7;