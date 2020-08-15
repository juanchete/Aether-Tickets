import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Tags from "../Tags";

export default function ClientsCard({ color, color2, tickets, filter }) {
  const [ticketsFiltered, setTickets] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (filter) {
      setTickets(tickets.filter((ticket) => ticket.status === filter));
    } else {
      setTickets(tickets);
    }
    setLoading(false);
  }, [filter]);
  return (
    <>
      {!loading ? (
        <>
          {ticketsFiltered.map((ticket) => (
            <Card color={color} color2={color2}>
              <li className="data">
                <h2>
                  {ticket.name} 
                </h2>
              </li>
              <li className="data">
                <h2>{ticket.lastName}</h2>
              </li>
              <li className="data">
                <h2>{ticket.email}</h2>
              </li>
              { ticket.telephone ? 
              <li className="data">
                 <h2>{ticket.telephone}</h2>
              </li>
            :<></>}
              <li className="data">
                <h2>User</h2>
              </li>
              <li className="data">
                <h2>CREATED AT</h2>
              </li>
            </Card>
          ))}
        </>
      ) : null}
    </>
  );
}
const Card = styled.div`
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #2f2519;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  list-style: none;

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
`;
