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

const Table8 = () => {
  const [booths, setBooths] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // CREATE STATE
  const [boothNo, setBoothNo] = useState("");
  const [boothCap, setBoothCap] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // EDIT STATE
  const [selectedBooth, setSelectedBooth] = useState(null);
  const [editBoothNo, setEditBoothNo] = useState("");
  const [editBoothCap, setEditBoothCap] = useState("");
  const [isEditOpen, setIsEditOpen] = useState(false);

  // GET BOOTHS
  const getAllBooths = async () => {
    const { data, error } = await supabase
      .from("booths")
      .select("id, created_at, booth_no, booth_cap, updated_at");

    if (error) {
      console.log(error);
      return;
    }

    setBooths(data);
  };

  useEffect(() => {
    getAllBooths();
  }, []);

  // FILTERED BOOTHS
  const filteredBooths = booths.filter(
    (i) =>
      searchQuery === "" ||
      i.booth_no?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // CREATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("booths").insert([
      {
        booth_no: boothNo,
        booth_cap: boothCap,
      },
    ]);

    if (error) {
      console.log("Insert error:", error);
      return;
    }

    await getAllBooths();

    setBoothNo("");
    setBoothCap("");
    setIsOpen(false);
  };

  // DELETE
  const deleteBooth = async (id) => {
    await supabase.from("booths").delete().eq("id", id);
    await getAllBooths();
  };

  // OPEN EDIT
  const openEdit = (booth) => {
    setSelectedBooth(booth);

    setEditBoothNo(booth.booth_no || "");
    setEditBoothCap(booth.booth_cap || "");

    setIsEditOpen(true);
  };

  const closeEdit = () => {
    setIsEditOpen(false);
    setSelectedBooth(null);
  };

  // UPDATE
  const handleUpdate = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from("booths")
      .update({
        booth_no: editBoothNo,
        booth_cap: editBoothCap,
        updated_at: new Date(),
      })
      .eq("id", selectedBooth.id);

    if (error) {
      console.log("Update error:", error);
      return;
    }

    await getAllBooths();
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
              placeholder="Search booth.."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search booths"
            />
          </div>

          <button
            className="btn1"
            onClick={openPopup}
            aria-label="Create new booth"
          >
            New Booth
          </button>
        </div>

        {/* TABLE */}
        <div
          className="flex_column table1"
          role="table"
          aria-label="Booths table"
        >

          {/* TABLE HEADER */}
          <div className="table1_header" role="row">
            <TableItem class="tableitem table1_item1" font="font_bold" text="ID" role="columnheader"/>
            <TableItem class="tableitem table1_item3"font="font_bold" text="Booth No."  role="columnheader" />
            <TableItem class="tableitem table1_item3" font="font_bold" text="Capacity" role="columnheader" />
            <TableItem class="tableitem table1_item6" font="font_bold"text="Created At"role="columnheader"/>
            <TableItem class="tableitem table1_item6"font="font_bold" text="Updated At"role="columnheader"/>
            <TableItem class="tableitem table1_item1"font="font_bold"text="Actions" role="columnheader"/>

          </div>

          {/* TABLE ROWS */}
          {filteredBooths.length > 0 ? (
            filteredBooths.map((i) => (
              <div
                key={i.id}
                className="table1_header table_row1"
                role="row"
                tabIndex={0}
                aria-label={`Booth ${i.booth_no}`}
              >

               
                {/* ID */}
                <TableItem
                  class="tableitem table1_item1"
                  font="font_light h5_2"
                  text={i.id}
                  role="cell"
                />

                {/* BOOTH NO */}
                <TableItem
                  class="tableitem table1_item3"
                  font="font_light"
                  text={i.booth_no}
                  role="cell"
                />

                {/* CAPACITY */}
                <TableItem
                  class="tableitem table1_item3"
                  font="font_light"
                  text={i.booth_cap}
                  role="cell"
                />

                {/* CREATED */}
                <div className="tableitem table1_item6" role="cell">
                  <h5 className="font_light h5_2">
                    {new Date(i.created_at).toLocaleDateString()}
                  </h5>
                </div>

                {/* UPDATED */}
                <div className="tableitem table1_item6" role="cell">
                  <h5 className="font_light h5_2">
                    {i.updated_at
                      ? new Date(i.updated_at).toLocaleDateString()
                      : "-"}
                  </h5>
                </div>

               {/* ACTIONS */}
                <div className="tableitem table1_item1" role="cell">
                  <div className="tableitem_img">

                    <button
                      onClick={() => deleteBooth(i.id)}
                      className="btn5"
                      aria-label="Delete booth"
                    >
                      <img src={delete1} alt="" aria-hidden="true" />
                    </button>

                    <button
                      onClick={() => openEdit(i)}
                      className="btn5"
                      aria-label="Edit booth"
                    >
                      <img src={edit} alt="" aria-hidden="true" />
                    </button>

                  </div>
                </div>
        

              </div>
            ))
          ) : (
            <div className="table1_header" role="row">
              <h5 className="font_light h5_2">No booths found.</h5>
            </div>
          )}
        </div>

        {/* CREATE POPUP */}
        <div
          className={`popUp ${isOpen ? "show" : "hide"}`}
          role="dialog"
          aria-modal="true"
          aria-label="Create booth"
        >
          <div className="bg div">

            <form className="form1" onSubmit={handleSubmit}>

              <button
                type="button"
                className="btn3 closed"
                onClick={closePopup}
                aria-label="Close popup"
              >
                <img src={close1} alt="" aria-hidden="true" />
              </button>

              <Heading heading="Create Booth" />

              <div className="inputFlex">

                <input
                  type="text"
                  placeholder="Booth Number"
                  value={boothNo}
                  onChange={(e) => setBoothNo(e.target.value)}
                  aria-label="Booth number"
                />

                <input
                  type="text"
                  placeholder="Booth Capacity"
                  value={boothCap}
                  onChange={(e) => setBoothCap(e.target.value)}
                  aria-label="Booth capacity"
                />

              </div>

              <button type="submit" className="btn1 btn4">
                Create Booth
              </button>

            </form>
          </div>
        </div>

        {/* EDIT POPUP */}
        <div
          className={`popUp ${isEditOpen ? "show" : "hide"}`}
          role="dialog"
          aria-modal="true"
          aria-label="Edit booth"
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

              <Heading heading="Edit Booth" />

              <div className="inputFlex">

                <input
                  type="text"
                  placeholder="Booth Number"
                  value={editBoothNo}
                  onChange={(e) => setEditBoothNo(e.target.value)}
                  aria-label="Booth number"
                />

                <input
                  type="text"
                  placeholder="Booth Capacity"
                  value={editBoothCap}
                  onChange={(e) => setEditBoothCap(e.target.value)}
                  aria-label="Booth capacity"
                />

              </div>

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

export default Table8;