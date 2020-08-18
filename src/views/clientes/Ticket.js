import React, { useState, useEffect, useContext } from "react";
import "firebase";
import firebase from "firebase";
import { useUser, useFirebaseApp } from "reactfire";
import styled from "styled-components";
import SidebarUser from "../../components/sidebars/SidebarUser";
import TextEditor from "../../components/inputs/TextEditor";
import { UserContext } from "../../CreateContext";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Feedback from "../../components/Feedback";
import { useParams } from "react-router";
import moment from "moment";

export default function Ticket() {
  const { user, setUser } = useContext(UserContext);
  const firebaseReact = useFirebaseApp();
  const db = firebaseReact.firestore();
  const [text, setText] = useState("");
  const [content, setContent] = useState("");
  const [ticket, setTicket] = useState();
  const [messages, setMessages] = useState();
  const [asesor, setAsesor] = useState();
  const [toggleDet, setToggleDet] = useState(false);
  const [feedbackShow, setFeedbackShow] = useState(false);
  const [show, setShow] = useState(false);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  let { id } = useParams();

  const showFeedback = (e) => {
    setFeedbackShow(!feedbackShow);
  };

  const onEditorChange = (value) => {
    setText(value);
    let texto = text;
    texto = texto.replace(/(<([^>]+)>)/gi, "");
    setContent(texto);
  };
  const onFilesChange = (file) => {
    setFiles([...files, file]);
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
                  const asesorLast = {
                    id: doc2.id,
                    name: doc2.data().name,
                    lastName: doc2.data().lastName,
                  };
                  setAsesor(asesorLast);
                } else {
                  console.log("No such document!");
                }
              })
              .catch(function (error) {
                console.log("Error getting document:", error);
              });
          }
          db.collection("messages")
            .where("ticket", "==", id)
            .orderBy("date", "asc")
            .onSnapshot((snapshot) => {
              const messagesData = [];
              snapshot.forEach((doc) =>
                messagesData.push({ ...doc.data(), id: doc.id })
              );
              setMessages(messagesData);
            });

          setTicket(doc.data());
          setLoading(false);
        } else {
          console.log("No such document!");
          setLoading(false);
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
    setLoading(false);
  }, [ticket]);

  const sendMessage = async (e) => {
    try {
      await db
        .collection("messages")
        .add({
          sender: {
            id: user ? user.id : null,
            email: user.email,
            name: user.name,
            lastName: user.lastName,
          },
          contentHtml: text,
          ticket: id,
          content: content,
          files: files,
          date: new Date(),
        })
        .then(async function (doc) {
          var ref = db.collection("tickets").doc(id);
          ref.update({
            messages: firebase.firestore.FieldValue.arrayUnion(id),
          });
        });
    } catch (error) {}
  };

  const closeTicket = async (e) => {
    e.preventDefault();
    console.log(ticket.asesores[ticket.asesores.length - 1]);
    if (ticket.asesores.length > 0) {
      setShow(false);
      showFeedback(true);
    }
    try {
      await db
        .collection("tickets")
        .doc(id)
        .update({
          status: "Solved",
        })
        .then(() => {
          showFeedback(true);
          setShow(false);
        });
    } catch (error) {}
  };

  return (
    <>
      {asesor ? (
        <Feedback
          show={feedbackShow}
          showFeedback={showFeedback}
          asesor={asesor}
          ticket={id}
        />
      ) : null}
      <HomeStyle
        toggleDet={toggleDet}
        screenWidth={window.innerWidth}
        show={show}
      >
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
          {!loading && ticket && messages ? (
            <div className="container">
              <div className="chat">
                <div className="chat-screen">
                  {messages.map((message) => (
                    <div className="chat-message">
                      <div className="chat-screen-header">
                        <div className="name">
                          <h2>Valeska Silva</h2>
                        </div>
                        <div className="time">
                          <h2>
                            {" "}
                            {moment(message.date.toDate()).fromNow().toString()}
                          </h2>
                        </div>
                      </div>
                      <div className="chat-screen-content">
                        <div
                          className="content"
                          dangerouslySetInnerHTML={{
                            __html: message.contentHtml,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="chat-text-box">
                  {" "}
                  <TextEditor
                    onEditorChange={onEditorChange}
                    onFilesChange={onFilesChange}
                  />
                  <div className="button-container">
                    <button
                      className="button-submit"
                      type="button"
                      onClick={sendMessage}
                      disbled={
                        ticket.status != "Solved" && ticket.status != "Unsolved"
                          ? false
                          : true
                      }
                    >
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
                    <h3>
                      {moment(ticket.createdAt.toDate())
                        .format("DD/MM/yyyy")
                        .toString()}
                    </h3>
                  </div>
                  <div className="ticket-detail-info-item">
                    <h2>Last Message: </h2>
                    <h3>
                      {moment(messages[messages.length - 1].date.toDate())
                        .fromNow()
                        .toString()}
                    </h3>
                  </div>
                  <div className="ticket-detail-info-item">
                    <h2>Status: </h2>
                    <div className="button-container-status">
                      <button
                        type="button"
                        className="status-button"
                        onClick={() => {
                          setShow(!show);
                        }}
                        disabled={
                          ticket.status != "Solved" &&
                          ticket.status != "Unsolved"
                            ? false
                            : true
                        }
                      >
                        <h2>{ticket.status}</h2>
                      </button>
                      <ul className="status-options">
                        <li
                          className="status-options-item"
                          onClick={closeTicket}
                        >
                          <h2>Ticket Solved</h2>
                        </li>
                      </ul>
                    </div>
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
    </>
  );
}
const HomeStyle = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: row;
  .home-view {
    width: 70%;
    height: 100vh;
    margin-left: 30%;
    display: flex;
    justify-content: center;

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
      width: 100%;
      height: 100%;
      overflow-y: hidden;
      display: flex;
      flex-direction: row;
      padding: 10px;
      padding-top: 90px;

      .chat {
        width: 70%;
        height: 100%;

        .chat-screen {
          width: 100%;
          height: 70%;
          overflow-y: scroll;
          background: #4a3f35;
          padding-top: 10px;
          padding-bottom: 10px;
          padding-right: 5px;
          padding-left: 5px;
          margin-bottom: 10px;
          border: 1px solid #4a3f35;
          border-radius: 5px;

          .chat-message {
            margin-bottom: 15px;
            width: 100%;
            height: auto;
            background: white;
            border: 1px solid #2f2519;
            border-radius: 5px;

            .chat-screen-header {
              width: 100%;
              background: #2f2519;
              height: 50px;
              border: 1px solid transparent;
              border-radius: 5px;
              display: flex;
              flex-direction: row;

              .name {
                display: flex;
                align-items: center;
                width: 50%;
                height: 100%;
                padding-left: 10px;

                h2 {
                  font-size: 15px;
                  font-family: "Raleway", sans-serif;
                  letter-spacing: 0.2em;
                  font-weight: 300;
                  font-style: italics;
                  color: #ff4301;
                  margin-right: 5px;
                }
              }
              .time {
                display: flex;
                align-items: center;
                justify-content: flex-end;
                text-align: flex-end;
                width: 50%;
                height: 100%;

                h2 {
                  font-size: 12px;
                  font-family: "Raleway", sans-serif;
                  letter-spacing: 0.2em;
                  font-weight: 300;
                  font-style: italics;
                  color: #ff4301;
                  margin-right: 5px;
                }
              }
            }
            .chat-screen-content {
              width: 100%;
              padding: 10px;
              height: auto;

              .content {
                font-family: "Raleway", sans-serif !important;
              }
            }
          }
        }

        .chat-text-box {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 30%;

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
        width: 30%;
        height: 100%;
        margin-left: 10px;
        overflow-y: scroll;

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
            margin-top: 10px;
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
            .status-options {
              position: absolute;
              width: 120px;
              height: auto;
              background: white;
              padding-top: 5px;
              padding-bottom: 5px;
              border: 1px solid white;
              border-radius: 5px;
              margin-top: 5px;
              box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
              ${(props) => (props.show ? "" : "display:none;")}
              .status-options-item {
                width: 100%;
                height: 40px;
                display: flex;
                border: 1px solid white;
                border-radius: 5px;
                align-items: center;
                h2 {
                  font-size: 12px;
                  font-family: "Raleway", sans-serif;
                  letter-spacing: 0.2em;
                  font-weight: 300;
                  font-style: normal;
                  color: #fa7d09;
                  text-transform: uppercase;
                  width: 100%;
                  margin-left: 5px;
                }
                &:hover {
                  background: #fafafa;
                  outline: none;
                }
                &:focus {
                  outline: none;
                }
              }
            }
            .button-container-status {
              width: 100%;
              height: fit-content;
              .status-button {
                height: 30px;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                width: fit-content;
                padding-left: 10px;
                padding-right: 10px;
                border: 2px solid white;
                border-radius: 20px;
                background: white;

                h2 {
                  font-size: 12px !important;
                  font-family: "Raleway", sans-serif;
                  letter-spacing: 0.2em;
                  font-weight: 500;
                  font-style: normal;
                  margin-left: 0px !important;
                  color: #fa7d09 !important;
                  text-transform: uppercase;
                  width: 100%;
                }
              }
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

    .home-view {
      width: 100vw;
      margin-left: 0;
      .home-view-title {
        margin-top: 90px;
        height: 80px;
        width: 100vw;
        align-items: center;
        justify-content: center;
      }
      .container {
        width: 100vw;
        padding-top: 200px;
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
      margin-left: 0;
      .home-view-title {
        margin-top: 90px;
        height: 80px;
        width: 100vw;
        align-items: center;
        justify-content: center;

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
        width: 100vw;
        padding-top: 180px;
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
  @media only screen and (max-height: 900px) {
    .home-view {
      .container {
        .chat {
          .chat-screen {
            height: 50%;
          }
        }
      }
    }
  }
`;
