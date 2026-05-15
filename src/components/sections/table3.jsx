import React, { useState, useEffect } from "react";
import "./table1.css";
import "./../layout/popup.css";

import search from "./../../assets/seaechbar.svg";
import delete1 from "./../../assets/delete.svg";
import edit from "./../../assets/edit.svg";
import close1 from "./../../assets/close.svg";
import Heading from "../common/heading";

import { supabase } from "../../supabase";
import "./sectioncont.css";

const Table3 = () => {
  // STATE
  const [sections, setSections] = useState([]);

  // EDIT STATE
  const [selectedSection, setSelectedSection] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [subtitile, setSubtitile] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  // CREATE STATE
  const [isNewOpen, setIsNewOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newSubtitile, setNewSubtitile] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newImage, setNewImage] = useState("");

  // GET ALL
  const getAllSections = async () => {
    const { data, error } = await supabase.from("section").select("*");

    if (error) {
      console.log(error);
      return;
    }

    setSections(data);
  };

  useEffect(() => {
    getAllSections();
  }, []);

  // CREATE
  const handleCreate = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("section").insert([
      {
        title: newTitle,
        subtitile: newSubtitile,
        description: newDescription,
        image: newImage,
      },
    ]);

    if (error) {
      console.log("Insert error:", error);
      return;
    }

    await getAllSections();
    setNewTitle("");
    setNewSubtitile("");
    setNewDescription("");
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
    setTitle(section.title || "");
    setSubtitile(section.subtitile || "");
    setDescription(section.description || "");
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
    setNewTitle("");
    setNewSubtitile("");
    setNewDescription("");
    setNewImage("");
    setIsNewOpen(false);
  };

  // UPDATE
  const handleUpdate = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from("section")
      .update({ title, subtitile, description, image })
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
      <div id="section-management" data-section className="container_3 table_container">
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
          <div style={{ border: "none" }} className="table1_header">
            <h5>All Sections ({sections.length})</h5>
          </div>

          {/* ROWS */}
          {sections.map((i) => (
            <div key={i.id} className="sections_container background2">
              {/* ID AND CONTROLS */}
              <div className="flex heading_buttonflex1">
                <h1 className="font_bold">#{i.id}</h1>
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

              {/* CONTENT */}
              <div className="sections_containerheadercontent sections_titles">
                <div className="flex_column label_inputflex">
                  <h5 className="font_bold">Title</h5>
                  <p>{i.title}</p>
                </div>
                <div className="flex_column label_inputflex">
                  <h5 className="font_bold">Subtitle</h5>
                  <p>{i.subtitile}</p>
                </div>
              </div>

              <div className="flex_column label_inputflex">
                <h5 className="font_bold">Description</h5>
                <p>{i.description}</p>
              </div>

              <div className="flex_column label_inputflex">
                <h5 className="font_bold">Image</h5>
                <img className="secImg" src={i.image} alt="section" />
              </div>

              <div className="sections_status">
                <h5>Created At</h5>
                <p className="highlighted">{i.created_at}</p>
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

              <input
                type="text"
                placeholder="Title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />

              <input
                type="text"
                placeholder="Subtitle"
                value={newSubtitile}
                onChange={(e) => setNewSubtitile(e.target.value)}
              />

              <input
                type="text"
                placeholder="Description"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />

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

              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <input
                type="text"
                placeholder="Subtitle"
                value={subtitile}
                onChange={(e) => setSubtitile(e.target.value)}
              />

              <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

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