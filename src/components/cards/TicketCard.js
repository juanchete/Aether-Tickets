import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Tags from "../Tags";
import PopUp from "../PopUp";
import { BsThreeDots } from "react-icons/bs";
import { NavLink, withRouter } from "react-router-dom";

export default function TicketCard({ color, color2, tickets, filter }) {
  const [ticketsFiltered, setTickets] = useState();
  const [loading, setLoading] = useState(true);
  let [path, setPath] = React.useState("/asesores/ticket/");
  useEffect(() => {
    setLoading(true);
    if (filter) {
      setTickets(tickets.filter((ticket) => ticket.status === filter));
    } else {
      setTickets(tickets);
    }
    setLoading(false);
  }, [filter]);

  const click = () => {
    return (
      <div className="option" style={{ width: "300px" }}>
        HOLA
      </div>
    );
  };
  return (
    <>
      {!loading ? (
        <>
          {ticketsFiltered.map((ticket) => (
            <Card color={color} color2={color2}>
              <ul className="ticket-view">
                <NavLink className="data" to={path + ticket.id}>
                  <h2>
                    {ticket.usuario.name} {ticket.usuario.lastName}
                  </h2>
                  <h3>{ticket.usuario.email}</h3>
                </NavLink>
                <NavLink className="data" to={path + ticket.id}>
                  <h2>{ticket.subject}</h2>
                </NavLink>
                <NavLink className="data" to={path + ticket.id}>
                  {ticket.asesors.length > 0 ? (
                    <h2>{ticket.asesors[ticket.asesors.length - 1]}</h2>
                  ) : (
                    <h2>Unnasigned</h2>
                  )}
                </NavLink>
                <NavLink className="data" to={path + ticket.id}>
                  <Tags title={ticket.priority} color="#EE220C" />
                </NavLink>
                <NavLink className="data" to={path + ticket.id}>
                  <Tags title={ticket.status} color="#29E2F3" />
                </NavLink>
                <NavLink className="data" to={path + ticket.id}>
                  <h2>CREATED AT</h2>
                </NavLink>
                <li className="data-2">
                  <PopUp ticket={ticket} />
                </li>
              </ul>
            </Card>
          ))}
        </>
      ) : null}
    </>
  );
}
const Card = styled.div`
  .ticket-view {
    width: 100%;
    height: 60px;
    border-bottom: 1px solid #2f2519;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 10px;
    padding-right: 10px;
    list-style: none;
    .data-2 {
      width: 10%;
    }
    .data {
      width: 16.66%;

      h2 {
        font-size: 14px;
        font-family: "Raleway", sans-serif;
        font-weight: 500;
        font-style: normal;
        color: #2f2519;
        width: 100%;
        margin-right: 5px;
      }
      h3 {
        font-size: 10px;
        font-family: "Raleway", sans-serif;
        font-weight: 500;
        font-style: normal;
        color: ${(props) => (props.color ? props.color : "#fa7d09")};
        width: 100%;
        margin-right: 5px;
      }
      .tag {
        height: 30px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: fit-content;
        padding-left: 15px;
        padding-right: 10px;
        border: 2px solid #ee220c;
        border-radius: 20px;
        h2 {
          font-size: 10px;
          font-family: "Raleway", sans-serif;
          letter-spacing: 0.2em;
          font-weight: 500;
          font-style: normal;
          color: #ee220c;
          text-transform: uppercase;
          width: 100%;
        }
      }
    }
  }
`;
