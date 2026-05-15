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

const Table9 = () => {

  const [details, setDetails] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // CREATE STATE
  const [detailTitle, setDetailTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  const [className, setClassName] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  // EDIT STATE
  const [selectedDetail, setSelectedDetail] = useState(null);

  const [editDetailTitle, setEditDetailTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editIcon, setEditIcon] = useState("");
  const [editClassName, setEditClassName] = useState("");

  const [isEditOpen, setIsEditOpen] = useState(false);

  //  GET DATA 

  const getAllDetails = async () => {

    const { data, error } = await supabase
      .from("exhibitionDetails")
      .select("*");

    if (error) {
      console.log(error);
      return;
    }

    setDetails(data);
  };

  useEffect(() => {
    getAllDetails();
  }, []);

  // FILTER

  const filteredDetails = details.filter(
    (i) =>
      searchQuery === "" ||
      i.detailTitle
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||

      i.description
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  // CREATE 

  const handleSubmit = async (e) => {

    e.preventDefault();

    const { error } = await supabase
      .from("exhibitionDetails")
      .insert([
        {
          detailTitle,
          description,
          icon,
          class: className,
        },
      ]);

    if (error) {
      console.log("Insert error:", error);
      return;
    }

    await getAllDetails();

    setDetailTitle("");
    setDescription("");
    setIcon("");
    setClassName("");

    setIsOpen(false);
  };

  //DELETE

  const deleteDetail = async (id) => {

    await supabase
      .from("exhibitionDetails")
      .delete()
      .eq("id", id);

    await getAllDetails();
  };

  // EDIT

  const openEdit = (detail) => {

    setSelectedDetail(detail);

    setEditDetailTitle(detail.detailTitle || "");
    setEditDescription(detail.description || "");
    setEditIcon(detail.icon || "");
    setEditClassName(detail.class || "");

    setIsEditOpen(true);
  };

  const closeEdit = () => {

    setIsEditOpen(false);
    setSelectedDetail(null);
  };

  // UPDATE 

  const handleUpdate = async (e) => {

    e.preventDefault();

    const { error } = await supabase
      .from("exhibitionDetails")
      .update({
        detailTitle: editDetailTitle,
        description: editDescription,
        icon: editIcon,
        class: editClassName,
      })
      .eq("id", selectedDetail.id);

    if (error) {
      console.log("Update error:", error);
      return;
    }

    await getAllDetails();

    closeEdit();
  };

  // POPUPS 

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
              placeholder="Search detail.."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

          </div>

          <button className="btn1" onClick={openPopup}>
            New Detail
          </button>

        </div>

        {/* TABLE */}
        <div
          className="flex_column table1"
          role="table"
          aria-label="Exhibition details table"
        >

          {/* HEADER */}
          <div className="table1_header" role="row">


            <TableItem
              class="tableitem table1_item1"
              font="font_bold"
              text="ID"
              role="columnheader"
            />

            <TableItem
              class="tableitem table1_item1"
              font="font_bold"
              text="Icon"
              role="columnheader"
            />

            <TableItem
              class="tableitem table1_item3"
              font="font_bold"
              text="Detail Title"
              role="columnheader"
            />

            <TableItem
              class="tableitem table1_item4"
              font="font_bold"
              text="Description"
              role="columnheader"
            />

            <TableItem
              class="tableitem table1_item3"
              font="font_bold"
              text="Class"
              role="columnheader"
            />

            <TableItem
              class="tableitem table1_item6"
              font="font_bold"
              text="Created At"
              role="columnheader"
            />
          <TableItem
              class="tableitem table1_item1"
              font="font_bold"
              text="Actions"
              role="columnheader"
            />
          </div>

          {/* ROWS */}
          {filteredDetails.length > 0 ? (
            filteredDetails.map((i) => (

              <div
                key={i.id}
                className="table1_header table_row1"
                role="row"
              >

                {/* ID */}
                <TableItem
                  class="tableitem table1_item1"
                  font="font_light h5_2"
                  text={i.id}
                  role="cell"
                />

                {/* ICON */}
                <div className="tableitem table1_item1" role="cell">

                  <div className="tableitem_img">
                    <img src={i.icon} alt="" />
                  </div>

                </div>

                {/* TITLE */}
                <TableItem
                  class="tableitem table1_item3"
                  font="font_light"
                  text={i.detailTitle}
                  role="cell"
                />

                {/* DESCRIPTION */}
                <TableItem
                  class="tableitem table1_item4"
                  font="font_light h5_2"
                  text={i.description}
                  role="cell"
                />

                {/* CLASS */}
                <TableItem
                  class="tableitem table1_item3"
                  font="font_light"
                  text={i.class}
                  role="cell"
                />

                {/* CREATED */}
                <div className="tableitem table1_item6" role="cell">

                  <h5 className="font_light h5_2">
                    {new Date(i.created_at).toLocaleDateString()}
                  </h5>

                </div>

                 {/* ACTIONS */}
                <div className="tableitem table1_item1" role="cell">

                  <div className="tableitem_img">

                    <button
                      onClick={() => deleteDetail(i.id)}
                      className="btn5"
                    >
                      <img src={delete1} alt="" />
                    </button>

                    <button
                      onClick={() => openEdit(i)}
                      className="btn5"
                    >
                      <img src={edit} alt="" />
                    </button>

                  </div>

                </div>

              </div>
            ))
          ) : (
            <div className="table1_header">

              <h5 className="font_light h5_2">
                No details found.
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

              <Heading heading="Create Detail" />

              <div className="inputFlex">

                <input
                  type="text"
                  placeholder="Detail Title"
                  value={detailTitle}
                  onChange={(e) => setDetailTitle(e.target.value)}
                />

                <input
                  type="text"
                  placeholder="Icon URL"
                  value={icon}
                  onChange={(e) => setIcon(e.target.value)}
                />

              </div>

              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <input
                type="text"
                placeholder="Class Name"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
              />

              <button type="submit" className="btn1 btn4">
                Create Detail
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

              <Heading heading="Edit Detail" />

              <div className="inputFlex">

                <input
                  type="text"
                  placeholder="Detail Title"
                  value={editDetailTitle}
                  onChange={(e) => setEditDetailTitle(e.target.value)}
                />

                <input
                  type="text"
                  placeholder="Icon URL"
                  value={editIcon}
                  onChange={(e) => setEditIcon(e.target.value)}
                />

              </div>

              <textarea
                placeholder="Description"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />

              <input
                type="text"
                placeholder="Class Name"
                value={editClassName}
                onChange={(e) => setEditClassName(e.target.value)}
              />

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

export default Table9;