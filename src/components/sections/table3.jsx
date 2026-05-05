import React, { useState, useEffect } from "react";
import "./table1.css";
import "./../layout/popup.css";

import search from "./../../assets/seaechbar.svg";
import delete1 from "./../../assets/delete.svg";
import edit from "./../../assets/edit.svg";
import close1 from "./../../assets/close.svg";
// import TableItem from "../common/tableitem";
import Heading from "../common/heading";

import { supabase } from "../../supabase";
import "./sectioncont.css";

const Table3 = () => {
  // STATESS
  const [sections, setSections] = useState([]);
// SEARCH

  // EDIT STATE
  const [selectedSection, setSelectedSection] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [heading, setHeading] = useState("");
  const [headingAR, setHeadingAR] = useState("");
  const [subheading, setSubheading] = useState("");
  const [subheadingAR, setSubheadingAR] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [paragraphAR, setParagraphAR] = useState("");
  const [image, setImage] = useState("");

  // CREATE STATE
  const [isNewOpen, setIsNewOpen] = useState(false);

  const [newHeading, setNewHeading] = useState("");
  const [newHeadingAR, setNewHeadingAR] = useState("");
  const [newSubheading, setNewSubheading] = useState("");
  const [newSubheadingAR, setNewSubheadingAR] = useState("");
  const [newParagraph, setNewParagraph] = useState("");
  const [newParagraphAR, setNewParagraphAR] = useState("");
  const [newImage, setNewImage] = useState("");

  // GET ALL SECTIONS
  const getAllSections = async () => {
    const { data, error } = await supabase.from("section").select("*");

    if (error) {
      console.log(error);
      return;
    }

    setSections(data);
  };

  // GET ALL ON LOAD
  useEffect(() => {
    getAllSections();
  }, []);

  // CREATE
  const handleCreate = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("section").insert([
      {
        heading: newHeading,
        headingAR: newHeadingAR,
        subheading: newSubheading,
        subheadingAR: newSubheadingAR,
        paragraph: newParagraph,
        paragraphAR: newParagraphAR,
        image: newImage,
      },
    ]);

    if (error) {
      console.log("Insert error:", error);
      return;
    }

    await getAllSections();

    // RESET
    setNewHeading("");
    setNewHeadingAR("");
    setNewSubheading("");
    setNewSubheadingAR("");
    setNewParagraph("");
    setNewParagraphAR("");
    setNewImage("");
    setIsNewOpen(false);
  };

  // DELETE
  const deleteSection = async (id) => {
    await supabase.from("section").delete().eq("id", id);
    await getAllSections();
  };

  // OPEN EDIT POPUP
  const openEdit = (section) => {
    setSelectedSection(section);
    setHeading(section.heading || "");
    setHeadingAR(section.headingAR || "");
    setSubheading(section.subheading || "");
    setSubheadingAR(section.subheadingAR || "");
    setParagraph(section.paragraph || "");
    setParagraphAR(section.paragraphAR || "");
    setImage(section.image || "");
    setIsEditOpen(true);
  };

  const closeEdit = () => {
    setIsEditOpen(false);
    setSelectedSection(null);
  };

  // OPEN NEW POPUP
  const openNew = () => setIsNewOpen(true);
  const closeNew = () => {
    setNewHeading("");
    setNewHeadingAR("");
    setNewSubheading("");
    setNewSubheadingAR("");
    setNewParagraph("");
    setNewParagraphAR("");
    setNewImage("");
    setIsNewOpen(false);
  };

  // EDIT / UPDATE
  const handleUpdate = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from("section")
      .update({
        heading,
        headingAR,
        subheading,
        subheadingAR,
        paragraph,
        paragraphAR,
        image,
      })
      .eq("id", selectedSection.id);

    if (error) {
      console.log("Update error:", error);
      return;
    }

    await getAllSections();
    closeEdit();
  };

  return (
    <>
      <div className="container_3 table_container">
        {/* HEADER */}
        <div className="heading_buttonflex1">
          <div className="searchbar2">
            <button className="btn5" type="button">
              <img src={search} alt="search" />
            </button>
            <input type="text" placeholder="Search section.." />
          </div>

          <button className="btn1" onClick={openNew}>
            New Section
          </button>
        </div>

        {/* TABLE */}
        <div className="flex_column table1">
          {/* TABLE HEADER */}
          <div className="table1_header">
            <h5>All Sections ({sections.length})</h5>
          </div>

          {/* ROWS */}
          {sections.map((i) => (
            <div key={i.id} className="sections_container background2">
              {/* SECTION NO AND CONTROLS */}
              <div className="flex heading_buttonflex1">
                <h1 className="font_bold"> #{`${i.id}`}
                </h1>
                <div className="flex relatedcontrols">
                  <div>
                    <button onClick={() => deleteSection(i.id)} title="delete" className="btn5">
                      <img src={delete1} alt="" />
                    </button>
                    <button onClick={() => openEdit(i)} title="edit" className="btn5">
                      <img src={edit} alt="" />
                    </button>
                  </div>
                </div>
              </div>

              {/* CONTENT START */}
              <div className="sections_containerheadercontent sections_titles">
                <div className="flex_column label_inputflex">
                  <h5 className="font_bold">Heading</h5>
                  <p>{i.heading}</p>
                </div>
                <div className="flex_column label_inputflex">
                  <h5 className="font_bold">Heading AR</h5>
                  <p>{i.headingAR}</p>
                </div>
              </div>
              {/* 2 */}
               <div className="sections_containerheadercontent sections_titles">
                <div className="flex_column label_inputflex">
                  <h5 className="font_bold">Subheading</h5>
                  <p>{i.subheading}</p>
                </div>
                <div className="flex_column label_inputflex">
                  <h5 className="font_bold">Subheading AR</h5>
                  <p>{i.subheadingAR}</p>
                </div>
              </div>
              {/* 3 */}
               <div className="sections_containerheadercontent sections_titles">
                <div className="flex_column label_inputflex">
                  <h5 className="font_bold">Paragraph</h5>
                  <p>{i.paragraph}</p>
                </div>
                <div className="flex_column label_inputflex">
                  <h5 className="font_bold">Paragraph AR</h5>
                  <p>{i.paragraphAR}</p>
                </div>
              </div>
              {/* 4 */}
              <div className="flex_column label_inputflex">
                <h5 className="font_bold">Image</h5>
                      <img className="secImg" src={i.image} alt="section" />
                
              </div>

              <div className="sections_status">
                <h5> Last Updated </h5>
                <p className="highlighted">{`  ${i.updated_at} `}</p>
                
              </div>
            </div>
          ))}
        </div>

        {/* CREATE POPUP */}
        <div className={`popUp ${isNewOpen ? "show" : "hide"}`}>
          <div className="bg div">
            <form className="form1" onSubmit={handleCreate}>
              <button type="button" className="btn3 closed" onClick={closeNew}>
                <img src={close1} alt="" />
              </button>

              <Heading heading="New Section" />

              <div className="chipsFlex">
                <input
                  type="text"
                  placeholder="Heading"
                  value={newHeading}
                  onChange={(e) => setNewHeading(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Heading AR"
                  value={newHeadingAR}
                  onChange={(e) => setNewHeadingAR(e.target.value)}
                />
              </div>

              <div className="chipsFlex">
                <input
                  type="text"
                  placeholder="Subheading"
                  value={newSubheading}
                  onChange={(e) => setNewSubheading(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Subheading AR"
                  value={newSubheadingAR}
                  onChange={(e) => setNewSubheadingAR(e.target.value)}
                />
              </div>

              <div className="chipsFlex">
                <input
                  type="text"
                  placeholder="Paragraph"
                  value={newParagraph}
                  onChange={(e) => setNewParagraph(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Paragraph AR"
                  value={newParagraphAR}
                  onChange={(e) => setNewParagraphAR(e.target.value)}
                />
              </div>

              <input
                type="text"
                placeholder="Image URL"
                value={newImage}
                onChange={(e) => setNewImage(e.target.value)}
              />

              <button type="submit" className="btn1 btn4">
                Create Section
              </button>
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

              <Heading heading="Edit Section" />

              <div className="chipsFlex">
                <input
                  type="text"
                  placeholder="Heading"
                  value={heading}
                  onChange={(e) => setHeading(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Heading AR"
                  value={headingAR}
                  onChange={(e) => setHeadingAR(e.target.value)}
                />
              </div>

              <div className="chipsFlex">
                <input
                  type="text"
                  placeholder="Subheading"
                  value={subheading}
                  onChange={(e) => setSubheading(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Subheading AR"
                  value={subheadingAR}
                  onChange={(e) => setSubheadingAR(e.target.value)}
                />
              </div>

              <div className="chipsFlex">
                <input
                  type="text"
                  placeholder="Paragraph"
                  value={paragraph}
                  onChange={(e) => setParagraph(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Paragraph AR"
                  value={paragraphAR}
                  onChange={(e) => setParagraphAR(e.target.value)}
                />
              </div>

              <input
                type="text"
                placeholder="Image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
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

export default Table3;