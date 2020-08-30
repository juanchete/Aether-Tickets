import React, { useState, useEffect, useContext } from "react";
import "firebase";
import firebase from "firebase";
import { useUser, useFirebaseApp } from "reactfire";
import styled from "styled-components";
import SidebarAdmin from "../../components/sidebars/SidebarAdmin";
import TextEditor from "../../components/inputs/TextEditor";
import Feedback from "../../components/Feedback";
import SolvedModal from "../../components/SolvedModal";
import { UserContext } from "../../CreateContext";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { IoMdRefresh } from "react-icons/io";
import { useParams } from "react-router";
import moment from "moment";
import Swal from "sweetalert2";

export default function TicketAsesor() {
  const { user, setUser } = useContext(UserContext);
  const firebaseReact = useFirebaseApp();
  const db = firebaseReact.firestore();
  const [text, setText] = useState("");
  const [content, setContent] = useState("");
  const [ticket, setTicket] = useState();
  const [category, setCategory] = useState();
  const [messages, setMessages] = useState();
  const [asesor, setAsesor] = useState();
  const [toggleDet, setToggleDet] = useState(false);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [feedbackShow, setFeedbackShow] = useState(false);
  const [solvedShow, setSolvedShow] = useState(false);
  let { id } = useParams();

  const onEditorChange = (value) => {
    setText(value);
    let texto = text;
    texto = texto.replace(/(<([^>]+)>)/gi, "");
    setContent(texto);
  };
  const onFilesChange = (file) => {
    setFiles([...files, file]);
  };
  const fieldRef = React.useRef(null);

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
          let docRef3 = db.collection("categories").doc(doc.data().category);
          docRef3
            .get()
            .then(function (doc3) {
              if (doc3.exists) {
                const categor = {
                  id: doc3.id,
                  name: doc3.data().name,
                };

                setCategory(categor);
              } else {
                console.log("No such document!");
              }
            })
            .catch(function (error) {
              console.log("Error getting document:", error);
            });
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

          if (doc.data().status === "Solved" && !doc.data().solvedModal) {
            setSolvedShow(true);
          }
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
    if (fieldRef.current) {
      fieldRef.current.scrollIntoView({ behavior: "smooth" });
    }
    setLoading(false);
  }, [ticket]);

  const sendMessage = async (e) => {
    try {
      await db
        .collection("messages")
        .add({
          sender: {
            id: user.id ? user.id : null,
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

          let lifespan = ticket.lifespan;
          console.log(lifespan);
          if ((ticket.status = "Open")) {
            lifespan =
              lifespan +
              Math.round(
                ((Math.abs(
                  firebase.firestore.Timestamp.now().toDate() -
                    ticket.statusUpdatedAt.toDate()
                ) %
                  86400000) %
                  3600000) /
                  60000
              );
          }

          console.log(lifespan);
          ref.update({
            messages: firebase.firestore.FieldValue.arrayUnion(id),
            status: "Pending",
            statusUpdatedAt: firebase.firestore.Timestamp.now(),
            lastMessage: firebase.firestore.Timestamp.now(),
            lifespan: lifespan,
          });
          console.log("asas");
        });
      const check = await db.collection("mail").add({
        to: ticket.usuario.email,
        message: {
          subject: `Response of your ticket with id: ${id}`,
          text: text,
          html: text,
        },
      });
      console.log(check);
      // Swal.fire("Correcto", "Inicio sesion Correcctamente", "success");
    } catch (error) {
      console.log(error);
    }
  };

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
          asesorUpdate: firebase.firestore.Timestamp.now(),
        })
        .then(() => {
          let newTicket = ticket;
          newTicket.asesor = user.id;
          setTicket(newTicket);
          getAsesor(newTicket, user.id);
          var ref = db.collection("asesores").doc(user.id);
        });
    } catch (error) {}
  };

  const changeStatus = async (status) => {
    if (status != ticket.status) {
      if (status == "Delegate") {
        try {
          await db
            .collection("tickets")
            .doc(id)
            .update({
              asesor: null,
              asesorUpdate: firebase.firestore.Timestamp.now(),
            })
            .then(async function (doc) {
              var ref = db.collection("asesores").doc(user.id);
              ref.update({
                tickets: firebase.firestore.FieldValue.arrayUnion({
                  ticket: id,
                  status: "Delegated",
                  updatedAt: firebase.firestore.Timestamp.now(),
                }),
              });
            });
        } catch (error) {}
      } else {
        try {
          await db.collection("tickets").doc(id).update({
            status: status,
            statusUpdatedAt: firebase.firestore.Timestamp.now(),
          });
        } catch (error) {}
      }
    }
    setShow(false);
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

  const callFirebaseFunction = (event) => {
    const callableReturnMessage = firebase
      .functions()
      .httpsCallable("addMessage");

    callableReturnMessage()
      .then((result) => {
        console.log("Revisa si funciona");
      })
      .catch((error) => {
        console.log(`error: ${JSON.stringify(error)}`);
      });
  };

  const showFeedback = (e) => {
    setFeedbackShow(!feedbackShow);
  };
  const showSolved = (e) => {
    setSolvedShow(!feedbackShow);
  };
  return (
    <>
      <Feedback show={feedbackShow} showFeedback={showFeedback} />
      {!loading && ticket && user && asesor ? (
        <>
          {asesor.email == user.email ? (
            <>
              <SolvedModal show={solvedShow} showFeedback={showSolved} />
            </>
          ) : null}
        </>
      ) : null}

      <HomeStyle
        toggleDet={toggleDet}
        screenWidth={window.innerWidth}
        show={show}
      >
        <SidebarAdmin ticket={true} />
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
          {!loading && ticket && messages && category ? (
            <div className="container">
              {showSolution && ticket.solvedModal ? (
                <div className="solution">
                  <h1>Problem</h1>
                  <h2>{ticket.solvedModal.problem}</h2>
                  <h1>Estimated Time to Resolve</h1>
                  <h2>{ticket.solvedModal.lifespan} minutes</h2>
                  <h1>Steps</h1>
                  {[...Array(ticket.solvedModal.steps.length)].map(
                    (star, i) => {
                      const stepValue = i + 1;
                      return (
                        <>
                          <h2>
                            {i + 1}. {ticket.solvedModal.steps[i]}
                          </h2>
                        </>
                      );
                    }
                  )}
                  <h1>Result</h1>
                  <h2>{ticket.solvedModal.result}</h2>
                </div>
              ) : (
                <div className="chat">
                  <div className="chat-screen" id="chat-screen-1">
                    {messages.map((message) => (
                      <div className="chat-message">
                        <div
                          className={
                            message.sender
                              ? message.sender.id === user.id
                                ? "chat-screen-header"
                                : "chat-screen-header-2"
                              : "chat-screen-header"
                          }
                        >
                          <div className="name">
                            {message.sender ? (
                              <>
                                {message.sender.id === user.id ? (
                                  <h2>
                                    {user.name} {user.lastName}
                                  </h2>
                                ) : (
                                  <h2>
                                    {" "}
                                    {message.sender.name}{" "}
                                    {message.sender.lastName}{" "}
                                  </h2>
                                )}
                              </>
                            ) : (
                              <h2>
                                {" "}
                                {user.name} {user.lastName}
                              </h2>
                            )}
                          </div>
                          <div className="time">
                            <h2>
                              {" "}
                              {moment(message.date.toDate())
                                .fromNow()
                                .toString()}
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
                    <div ref={fieldRef} />
                  </div>

                  <div className="chat-text-box">
                    {" "}
                    <TextEditor
                      onEditorChange={onEditorChange}
                      onFilesChange={onFilesChange}
                    />
                    <div className="button-container">
                      <IoMdRefresh
                        class="icon-refresh"
                        disabled={user.id === ticket.asesor ? false : true}
                        onClick={(a) => {
                          callFirebaseFunction();
                        }}
                      />
                      <button
                        className="button-submit"
                        type="button"
                        onClick={sendMessage}
                        disabled={
                          ticket.status === "Solved" ||
                          ticket.status === "Unsolved" ||
                          ticket.asesor != user.id
                            ? true
                            : false
                        }
                      >
                        <h2>Submit</h2>
                      </button>
                    </div>
                  </div>
                </div>
              )}

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
                        disabled={user.id == ticket.asesor ? false : true}
                        onClick={() => {
                          setShow(!show);
                        }}
                      >
                        <h2>{ticket.status}</h2>
                      </button>
                      <ul className="status-options">
                        <li
                          className="status-options-item"
                          onClick={() => {
                            changeStatus("Open");
                          }}
                        >
                          <h2>Open</h2>
                        </li>
                        <li
                          className="status-options-item"
                          onClick={() => {
                            changeStatus("Delegate");
                          }}
                        >
                          <h2>Delegate</h2>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="ticket-detail-info-item">
                    <h2>Category: </h2>
                    <h3>{category.name}</h3>
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
                    <>
                      {user.role == "admin" ? (
                        <>
                          <div className="ticket-detail-info-item">
                            <h2>Assigned to: </h2>
                            <div className="button-container-status">
                              <button
                                type="button"
                                className="status-button"
                                onClick={assumeTicket}
                              >
                                <h2>Assume</h2>
                              </button>
                            </div>
                          </div>
                          <div className="ticket-detail-info-item">
                            <h2> </h2>
                            <div className="button-container-status">
                              <button
                                type="button"
                                className="status-button"
                                onClick={() => {
                                  showFeedback(true);
                                }}
                              >
                                <h2>Asign</h2>
                              </button>
                            </div>
                          </div>
                        </>
                      ) : null}
                    </>
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
                {ticket.status != "Solved" && ticket.status != "Unsolved" ? (
                  <div className="button-container">
                    <button
                      className="button-submit"
                      type="submit"
                      disabled={user.id === ticket.asesor ? false : true}
                    >
                      <h2>Unsolved</h2>
                    </button>
                  </div>
                ) : (
                  <>
                    {showSolution ? (
                      <div className="button-container">
                        <button
                          className="button-submit"
                          onClick={() => {
                            setShowSolution(!showSolution);
                          }}
                        >
                          <h2>Chat</h2>
                        </button>
                      </div>
                    ) : (
                      <>
                        {ticket.solvedModal ? (
                          <div className="button-container">
                            <button
                              className="button-submit"
                              onClick={() => {
                                setShowSolution(!showSolution);
                              }}
                            >
                              <h2>Solution</h2>
                            </button>
                          </div>
                        ) : null}
                      </>
                    )}
                  </>
                )}
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
        color: #fa7d09;
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
      .solution {
        width: 70%;
        height: 100%;
        overflow-y:auto;

        h1 {
          font-size: 22px;
          font-family: "Raleway", sans-serif;
          letter-spacing: 0.2em;
          font-weight: 300;
          font-style: normal;
          color: #fa7d09;
          text-transform: uppercase;
          width: 100%;
          margin-right: 5px;
          display: flex;
          align-self: center;
          margin-bottom: 10px;
          margin-top: 20px;
        }
        h2 {
          font-size: 18px;
          font-family: "Raleway", sans-serif;
          letter-spacing: 0.2em;
          font-weight: 400;
          font-style: normal;
          color: #2f2519;
          width: 100%;
          display: flex;
          align-self: center;
          margin-left: 10px;
        }
      }
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

            .chat-screen-header-2 {
              width: 100%;
              background: #fa7d09;
              height: 50px;
              border: 1px solid transparent;
              border-radius: 3px;
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
                  color: #2f2519;
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
                  color: #2f2519;
                  margin-right: 5px;
                }
              }
            }

            .chat-screen-header {
              width: 100%;
              background: #2f2519;
              height: 50px;
              border: 1px solid transparent;
              border-radius: 3px;
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
                  color: #fa7d09;
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
                  color: #fa7d09;
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
            .icon-refresh {
              height: 30px;
              width: 30px;
              margin-right: 10px;
              color: #fa7d09;
              cursor: pointer;
              &:hover {
                color: #2f2519;
              }
            }
            .button-submit {
              padding-left: 50px;
              padding-right: 50px;
              height: 40px;
              background: #4a3f35;
              border: 1px solid #fa7d09;
              border-radius: 5px;

              h2 {
                font-size: 12px;
                font-family: "Raleway", sans-serif;
                letter-spacing: 0.2em;
                font-weight: 300;
                font-style: normal;
                color: #fa7d09;
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
            color: #fa7d09 !important;
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
            border: 1px solid #fa7d09;
            border-radius: 5px;
            width: 70%;
            outline: none;
            &:focus {
              outline: none;
            }

            h2 {
              font-size: 18px;
              font-family: "Raleway", sans-serif;
              letter-spacing: 0.2em;
              font-weight: 300;
              font-style: normal;
              color: #fa7d09;
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
            color: #fa7d09;
            text-transform: uppercase;
            width: 100%;
          }
        }
        .ticket-detail-info {
          width: 100%;
          display: flex;
          flex-direction: column;
          height: auto;
          background: #fa7d09;
          border: 1px solid #fa7d09;
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
        .solution{
          70%;
        }
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

        .solution {
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
  @media only screen and (max-height: 800px) {
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
