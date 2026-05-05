import React, { useState, useEffect } from "react";
import "./table1.css";
import "./../layout/popup.css";

import search from "./../../assets/seaechbar.svg";
import delete1 from "./../../assets/delete.svg";
import TableItem from "../common/tableitem";

import { supabase } from "../../supabase";

const Table2 = () => {
  // STATESS
  const [bookings, setBookings] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterEvent, setFilterEvent] = useState("");

  // GET BOOKINGS 
  const getAllBookings = async () => {
    const { data, error } = await supabase
      .from("booking")
      .select("*, event(title)");

    if (error) {
      console.log(error);
      return;
    }

    setBookings(data);
  };

  useEffect(() => {
    getAllBookings();
  }, []);

  // GETEVENTS2
  const allEvents = [
    ...new Map(
      bookings.map((e) => [
        e.event_id,
        { id: e.event_id, name: e.event?.title }
      ])
    ).values(),
  ];

  // FILTER 
  const filteredBookings = bookings.filter((i) => {
    const query = searchQuery.toLowerCase();

    const matchesSearch =
      searchQuery === "" ||
      i.event?.title?.toLowerCase().includes(query) ||
      i.email?.toLowerCase().includes(query) ||
      String(i.id).includes(query);

    const matchesEvent =
      filterEvent === "" || String(i.event_id) === String(filterEvent);

    return matchesSearch && matchesEvent;
  });

  // DELETE
  const deleteBooking = async (id) => {
    await supabase.from("booking").delete().eq("id", id);
    await getAllBookings();
  };

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
              placeholder="Search booking.."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* FILTER */}
          <select
            className="selection filter"
            value={filterEvent}
            onChange={(e) => setFilterEvent(e.target.value)}
          >
            <option value="">All Events</option>
            {allEvents.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
          </select>
        </div>

        {/* TABLE */}
        <div className="flex_column table1">

          {/* HEADER */}
          <div className="table1_header">
            <TableItem class="tableitem table1_item3" font="font_bold" text="Actions" />
            <TableItem class="tableitem table1_item1" font="font_bold" text="ID" />
            <TableItem class="tableitem table1_item3" font="font_bold" text="Event Name" />
            <TableItem class="tableitem table1_item1" font="font_bold" text="No of Tickets" />
            <TableItem class="tableitem table1_item1" font="font_bold" text="Phone" />
            <TableItem class="tableitem table1_item3" font="font_bold" text="Email" />
            <TableItem class="tableitem table1_item6" font="font_bold" text="Booked At" />
          </div>

          {/* ROWS */}
          {filteredBookings.length > 0 ? (
            filteredBookings.map((i) => (
              <div key={i.id} className="table1_header table_row1">

                {/* ACTIONS */}
                <div className="tableitem table1_item3">
                  <div className="tableitem_img">
                    <button
                      onClick={() => deleteBooking(i.id)}
                      className="btn5"
                    >
                      <img src={delete1} alt="delete" />
                    </button>
                  </div>
                </div>

                {/* ID */}
                <TableItem class="tableitem table1_item1" font="font_light h5_2" text={i.id} />

                {/* EVENT NAME */}
                <TableItem
                  class="tableitem table1_item3"
                  font="font_light"
                  text={i.event?.title}
                />

                {/* TICKETS */}
                <TableItem class="tableitem table1_item1" font="font_bold h5_2" text={i.tickets_number} />

                {/* PHONE */}
                <TableItem class="tableitem table1_item1" font="font_light h5_2" text={i.phone} />

                {/* EMAIL */}
                <TableItem class="tableitem table1_item3" font="font_light h5_2" text={i.email} />
                {/* CREATED AT */}
                <div className="tableitem table1_item6">
                  <h5 className="font_light h5_2">{i.created_at}</h5>
                </div>

              </div>
            ))
          ) : (
            <div className="table1_header">
              <h5 className="font_light h5_2">No bookings found.</h5>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Table2;