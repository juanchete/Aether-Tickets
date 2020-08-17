import React, { useState, useEffect, useContext } from "react";
import "firebase";
import firebase from "firebase";
import { useUser, useFirebaseApp } from "reactfire";
import styled from "styled-components";
import SidebarUser from "../../components/sidebars/SidebarUser";
import TextEditor from "../../components/inputs/TextEditor";
import { UserContext } from "../../CreateContext";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useParams } from "react-router";

export default function TicketAsesor() {
  const { user, setUser } = useContext(UserContext);
  const firebaseReact = useFirebaseApp();
  const db = firebaseReact.firestore();
  const [text, setText] = useState("");
  const [ticket, setTicket] = useState();
  const [asesor, setAsesor] = useState();
  const [toggleDet, setToggleDet] = useState(false);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  let { id } = useParams();
  const onEditorChange = (value) => {
    setText(value);
    console.log(text);
  };
  const onFilesChange = (files) => {
    setFiles(files);
  };
  useEffect(() => {
    setLoading(true);
    const db = firebase.firestore();

    let docRef = db.collection("tickets").doc(id);
    docRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          if (doc.data().asesor) {
            let docRef2 = db.collection("asesores").doc(doc.data().asesor);
            docRef2
              .get()
              .then(function (doc2) {
                if (doc2.exists) {
                  setAsesor(doc2.data());
                } else {
                  // doc.data() will be undefined in this case
                  console.log("No such document!");
                }
              })
              .catch(function (error) {
                console.log("Error getting document:", error);
              });
          }
          setTicket(doc.data());
          setLoading(false);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
          setLoading(false);
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
    setLoading(false);
  }, [ticket]);

  const assumeTicket = async () => {
    console.log(id);
    console.log(user.id);
    try {
      await db
        .collection("tickets")
        .doc(id)
        .update({
          asesor: user.id,
          asesores: firebase.firestore.FieldValue.arrayUnion(user.id),
        })
        .then(() => {
          let newTicket = ticket;
          newTicket.asesor = user.id;
          setTicket(newTicket);
          getAsesor(newTicket, user.id);
          var ref = db.collection("asesores").doc(user.id);
          ref.update({
            tickets: firebase.firestore.FieldValue.arrayUnion(id),
          });
        });
    } catch (error) {}
  };

  const getAsesor = async (ticket, id) => {
    const db = firebaseReact.firestore();
    let docRef = db.collection("asesores").doc(id);
    await docRef.get().then(function (doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        let name = {
          name: doc.data().name,
          lastName: doc.data().lastName,
          id: id,
        };
        setAsesor(name);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    });
  };
  return (
    <HomeStyle toggleDet={toggleDet} screenWidth={window.innerWidth}>
      <SidebarUser ticket={true} />
      <div className="home-view">
        <div className="home-view-title">
          <div style={{ display: "flex", flexDirection: "row" }}>
            <h2>Ticket</h2>
            <h1>{id.substring(0, 7)}</h1>
            <AiOutlineInfoCircle
              className="icon"
              onClick={(event) => {
                setToggleDet(!toggleDet);
              }}
            />
          </div>
        </div>
        {!loading && ticket ? (
          <div className="container">
            <div className="chat">
              <div className="chat-screen">
                <div className="chat-screen-header"></div>
              </div>
              <div className="chat-text-box">
                {" "}
                <TextEditor
                  onEditorChange={onEditorChange}
                  onFilesChange={onFilesChange}
                />
                <div className="button-container">
                  <button className="button-submit" type="submit">
                    <h2>Submit</h2>
                  </button>
                </div>
              </div>
            </div>

            <div className="ticket-detail">
              <div className="ticket-detail-title">
                <h2>Details</h2>
              </div>
              <div className="ticket-detail-info">
                <div className="ticket-detail-info-title">
                  <h2>Ticket Info </h2>
                </div>
                <div className="ticket-detail-info-item">
                  <h2>Ticket ID: </h2>
                  <h3>{id.substring(0, 7)}</h3>
                </div>
                <div className="ticket-detail-info-item">
                  <h2>Created: </h2>
                  <h3>7/08/2020</h3>
                </div>
                <div className="ticket-detail-info-item">
                  <h2>Last Message: </h2>
                  <h3>7/08/2020</h3>
                </div>
                <div className="ticket-detail-info-item">
                  <h2>Status: </h2>
                  <h3>{ticket.status}</h3>
                </div>
                <div className="ticket-detail-info-item">
                  <h2>Category: </h2>
                  <h3>LOGIN</h3>
                </div>
              </div>
              <div className="ticket-detail-info">
                <div className="ticket-detail-info-title">
                  <h2>Responsability </h2>
                </div>

                {ticket.asesor && asesor ? (
                  <>
                    <div className="ticket-detail-info-item">
                      <h2>Assigned to: </h2>
                      <h3>
                        {asesor.name} {asesor.lastName}
                      </h3>
                    </div>
                    <div className="ticket-detail-info-item">
                      <h2>Rating: </h2>
                      <h3>5</h3>
                    </div>
                  </>
                ) : (
                  <div className="ticket-detail-info-item">
                    <h2>Assigned to: </h2>
                    <h3>Unnasigned</h3>
                  </div>
                )}
              </div>
              <div className="ticket-detail-info">
                <div className="ticket-detail-info-title">
                  <h2>Requester </h2>
                </div>
                <div className="ticket-detail-info-item">
                  <h2>
                    {ticket.usuario.name} {ticket.usuario.lastName}
                  </h2>
                </div>
                <div className="ticket-detail-info-item">
                  <h2>Total Tickets: </h2>
                  <h3>20</h3>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </HomeStyle>
  );
}
const HomeStyle = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: row;
  .home-view {
    width: 70%;
    margin-left: 30%;
    .home-view-title {
      width: 70%;
      position: fixed;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      text-align: center;
      height: 80px;
      background: #4a3f35;
      border-bottom: 1px solid #2f2519;
      .icon {
        display: none;
      }
      h1 {
        font-size: 22px;
        font-family: "Raleway", sans-serif;
        letter-spacing: 0.2em;
        font-weight: 500;
        font-style: normal;
        color: #2f2519;
        text-transform: uppercase;
        width: 100%;
        display: flex;
        align-self: center;
      }
      h2 {
        font-size: 22px;
        font-family: "Raleway", sans-serif;
        letter-spacing: 0.2em;
        font-weight: 300;
        font-style: normal;
        color: #ff4301;
        text-transform: uppercase;
        width: 100%;
        margin-right: 5px;
        display: flex;
        align-self: center;
      }
    }
    .container {
      margin-top: 80px;
      width: 70vw;
      height: auto;
      padding: 10px;
      display: flex;

      .chat {
        width: 50vw;
        height: 70vh;
        padding: 10px;
        padding-top: 0px;
        .chat-screen {
          width: 100%;
          height: 75%;
          background: #4a3f35;
          border: 1px solid #2f2519;
          border-radius: 5px;

          .chat-screen-header {
            width: 100%;
            height: 50px;
            background: #2f2519;
            border: 1px solid #2f2519;
            border-radius: 5px;
          }
        }
        .chat-text-box {
          width: 100%;
          margin-top: 10px;
          .button-container {
            width: 100%;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            .button-submit {
              padding-left: 50px;
              padding-right: 50px;
              height: 40px;
              background: #4a3f35;
              border: 1px solid #ff4301;
              border-radius: 5px;

              h2 {
                font-size: 12px;
                font-family: "Raleway", sans-serif;
                letter-spacing: 0.2em;
                font-weight: 300;
                font-style: normal;
                color: #ff4301;
                text-transform: uppercase;
              }
            }
          }
        }
      }
      .ticket-detail {
        width: 20vw;
        height: 500px;

        .assume-ticket {
          height: 30px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          width: fit-content;
          margin-right: 10px !important;
          padding-left: 10px;
          padding-right: 10px;
          border: 2px solid white;
          border-radius: 20px;
          background: white;

          h2 {
            font-size: 10px !important;
            font-family: "Raleway", sans-serif;
            letter-spacing: 0.2em;
            font-weight: 500;
            font-style: normal;
            margin-left: 0px !important;
            color: #ff4301 !important;
            text-transform: uppercase;
            width: 100%;
          }
        }
        .button-container {
          width: 100%;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          .button-submit {
            height: 50px;
            border: 1px solid #ff4301;
            border-radius: 5px;
            width: 70%;

            h2 {
              font-size: 18px;
              font-family: "Raleway", sans-serif;
              letter-spacing: 0.2em;
              font-weight: 300;
              font-style: normal;
              color: #ff4301;
              text-transform: uppercase;
            }
          }
        }
        .ticket-detail-title {
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          text-align: center;
          height: 50px;
          background: #4a3f35;
          border: 1px solid #2f2519;
          border-radius: 5px;
          h2 {
            font-size: 25px;
            font-family: "Raleway", sans-serif;
            letter-spacing: 0.2em;
            font-weight: 300;
            font-style: normal;
            color: #ff4301;
            text-transform: uppercase;
            width: 100%;
          }
        }
        .ticket-detail-info {
          width: 100%;
          display: flex;
          flex-direction: column;
          height: auto;
          background: #ff4301;
          border: 1px solid #ff4301;
          border-radius: 5px;
          margin-top: 5px;
          padding-bottom: 10px;
          .ticket-detail-info-title {
            width: 100%;
            display: flex;
            align-items: center;
            height: 50px;
            h2 {
              font-size: 18px;
              font-family: "Raleway", sans-serif;
              letter-spacing: 0.2em;
              font-weight: 300;
              font-style: normal;
              color: white;
              text-transform: uppercase;
              width: 100%;
              margin-left: 8px;
            }
          }
          .ticket-detail-info-item {
            width: 100%;
            display: flex;
            align-items: center;
            height: auto;
            flex-direction: row;
            margin-top: 5px;
            h2 {
              font-size: 12px;
              font-family: "Raleway", sans-serif;
              letter-spacing: 0.2em;
              font-weight: 300;
              font-style: normal;
              color: white;
              width: 100%;
              margin-left: 15px;
            }
            h3 {
              font-size: 12px;
              font-family: "Raleway", sans-serif;
              letter-spacing: 0.2em;
              font-weight: 500;
              font-style: normal;
              color: white;
              width: 100%;
            }
          }
        }
      }
    }
  }

  @media only screen and (max-width: 1100px) and (min-width: 768px) {
    flex-direction: column;
    width: 100vw;

    .home-view {
      width: 100vw;
      margin-top: 90px;
      margin-left: 0;
      .home-view-title {
        width: 100%;
        height: 80px;
        width: 100vw;
        align-items: center;
        justify-content: center;
      }
      .container {
        margin-top: 80px;
        width: 100vw;
        height: auto;
        padding: 10px;
        margin-right: 0 !important;

        .chat {
          width: 70%;
        }
        .ticket-detail {
          width: 30%;
        }
      }
    }
  }
  @media only screen and (max-width: 767px) {
    flex-direction: column;

    .home-view {
      width: 100vw;
      margin-top: 90px;
      margin-left: 0;
      .home-view-title {
        width: 100%;
        height: 80px;

        .icon {
          width: 40px;
          height: 40px;
          color: #2f2519;
          display: flex;
          margin-left: 5px;
        }
        h2 {
          width: auto;
        }
        h1 {
          width: auto;
        }
      }
      .container {
        margin-top: 80px;
        width: 100%;
        height: auto;
        padding: 10px;
        margin-right: 0 !important;

        .chat {
          width: 100%;
          ${(props) => (props.toggleDet ? "" : "display:none")};
        }

        .ticket-detail {
          width: 100%;
          ${(props) => (props.toggleDet ? "display:none" : "")};
        }
      }
    }
  }
`;
