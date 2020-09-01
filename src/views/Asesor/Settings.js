import React, { useState, useEffect, useContext } from "react";
import "firebase";
import { useUser, useFirebaseApp } from "reactfire";
import { storage } from "../../components/firebaseConfig";
import { useFormik } from "formik";
import { ThemeContext } from "../../CreateContext";
import { LogoContext } from "../../CreateContext";
import styled from "styled-components";
import SidebarAdmin from "../../components/sidebars/SidebarAdmin";
import UserCard from "../../components/cards/ClientReportCard";
import { IoIosCloseCircle } from "react-icons/io";
import { IoIosCheckmarkCircle } from "react-icons/io";
import Spinner from "../../components/Spinner";
import { MdSave } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";

export default function Settings({ theme, logo }) {
  const { themes, setTheme } = useContext(ThemeContext);
  const { logos, setLogos } = useContext(LogoContext);
  const firebase = useFirebaseApp();
  const [asesores, setAsesores] = useState();
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitting] = useState(true);
  const [photo1, setPhoto] = React.useState(null);
  const [url, setUrl] = React.useState(null);
  const [progress, setProgress] = React.useState(0);
  const [photo1E, setPhotoE] = React.useState(null);
  const db = firebase.firestore();
  const logout = async () => {
    await firebase.auth().signOut();
  };

  const formik = useFormik({
    initialValues: {
      photo: null,
    },

    onSubmit: async (valores) => {
      setSubmitting(true);
      console.log(photo1);
      let image = new FormData();
      let file = document.querySelector("#photoId");
      image.append("image", file.files[0]);
      console.log(image);
      if (photo1) {
        const uploadTask = storage.ref(`images/${photo1.name}`).put(photo1);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransfered / snapshot.totalBytes) * 100
            );
            setProgress(progress);
          },
          (error) => {
            setPhotoE(error);
            console.log(error);
          },
          () => {
            storage
              .ref("images")
              .child(photo1.name)
              .getDownloadURL()
              .then(async (url) => {
                try {
                  await db
                    .collection("company")
                    .doc("logo")
                    .update({
                      logoImage: url,
                    })
                    .then(() => {
                      setLogos({ logoImage: url });
                    });
                } catch (error) {}
                setProgress(0);
                setPhoto(null);
              });
          }
        );
      } else {
        setPhotoE("Please Select An Image to Upload");
      }

      setSubmitting(false);
    },
  });

  useEffect(() => {
    setLoading(true);
    const db = firebase.firestore();

    return (
      db
        .collection("asesores")
        // .where("role", "==", "asesor")
        .orderBy("name", "desc")
        .onSnapshot((snapshot) => {
          const asesoresData = [];
          snapshot.forEach((doc) =>
            asesoresData.push({ ...doc.data(), id: doc.id })
          );
          console.log(asesoresData); // <------
          setAsesores(asesoresData);
          setLoading(false);
        })
    );
  }, []);

  const changeTheme = async (
    event,
    primaryColor,
    primaryCColor,
    secondaryColor,
    thirdColor
  ) => {
    try {
      await db
        .collection("company")
        .doc("color")
        .update({
          primaryColor: primaryColor,
          primaryCColor: primaryCColor,
          secondaryColor: secondaryColor,
          thirdColor: thirdColor,
        })
        .then(() => {
          setTheme({
            primaryColor: primaryColor,
            primaryCColor: primaryCColor,
            secondaryColor: secondaryColor,
            thirdColor: thirdColor,
          });
        });
    } catch (error) {}
  };

  const user = useUser();
  return (
    <HomeStyle theme={theme}>
      <SidebarAdmin setting={true} theme={theme} logo={logo} />
      <div className="home-view">
        <div className="home-view-title">
          <div style={{ display: "flex", flexDirection: "row" }}>
            <h2>Settings</h2>
          </div>
        </div>

        <div className="content">
          <h2>Color Scheme</h2>
          <div className="content-color">
            <div
              className="content-color-item-grey"
              onClick={(event) => {
                changeTheme(event, "#d6e0f0", "#f1f3f8", "#8d93ab", "#393b44");
              }}
            ></div>
            <div
              className="content-color-item-orange"
              onClick={(event) => {
                changeTheme(event, "#fa7d09", "#ff4301", "#4a3f35", "#2f2519");
              }}
            ></div>
            <div
              className="content-color-item-brown"
              onClick={(event) => {
                changeTheme(event, "#f6b61e", "#ffebaf", "#df760b", "#743c08");
              }}
            ></div>
            <div
              className="content-color-item-yellow"
              onClick={(event) => {
                changeTheme(event, "#f6c90e", "#eeeeee", "#3a4750", "#303841");
              }}
            ></div>
            <div
              className="content-color-item-blue"
              onClick={(event) => {
                changeTheme(event, "#3282b8", "#bbe1fa", "#0f4c75", "#1b262c");
              }}
            ></div>
            <div
              className="content-color-item-blue-1"
              onClick={(event) => {
                changeTheme(event, "#5f85db", "#90b8f8", "#353941", "#26282b");
              }}
            ></div>
            <div
              className="content-color-item-purple"
              onClick={(event) => {
                changeTheme(event, "#5c5470", "#dbd8e3", "#352f44", "#2a2438");
              }}
            ></div>
            <div
              className="content-color-item-purple-1"
              onClick={(event) => {
                changeTheme(event, "#827397", "#d8b9c3", "#4d4c7d", "#363062");
              }}
            ></div>
            <div
              className="content-color-item-pink"
              onClick={(event) => {
                changeTheme(event, "#8d6262", "#ed8d8d", "#4d4545", "#393232");
              }}
            ></div>
            <div
              className="content-color-item-pink-1"
              onClick={(event) => {
                changeTheme(event, "#d9adad", "#fccbcb", "#ad9d9d", "#838383");
              }}
            ></div>
            <div
              className="content-color-item-green"
              onClick={(event) => {
                changeTheme(event, "#a7d129", "#f8eeb4", "#616f39", "#1b1919");
              }}
            ></div>
            <div
              className="content-color-item-green-1"
              onClick={(event) => {
                changeTheme(event, "#bac7a7", "#e5e4cc", "#889e81", "#698474");
              }}
            ></div>
          </div>
          <div className="logo-container">
            <h2>Logo</h2>
            <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
              <div className="edit">
                <input
                  className="inputPhoto"
                  type="file"
                  name="image"
                  id="photoId"
                  style={{ display: "none" }}
                  onChange={(event) => {
                    const file = event.currentTarget.files[0];

                    if (file) {
                      const fileType = file["type"];
                      const validImageTypes = [
                        "image/gif",
                        "image/jpeg",
                        "image/png",
                      ];
                      if (validImageTypes.includes(fileType)) {
                        setPhotoE(null);
                        setPhoto(event.currentTarget.files[0]);
                      } else {
                        setPhotoE("Please Select An Image to Upload");
                        console.log("Please Select An Image to Upload");
                      }
                    } else {
                    }
                  }}
                />

                <label htmlFor="photoId" className="settings" type="button">
                  <MdModeEdit className="icon" />
                </label>

                {photo1 ? (
                  <button type="submit" className="saveP">
                    <MdSave className="icon" />
                  </button>
                ) : null}
              </div>
            </form>
          </div>
          {logos ? <img className="photo" src={logos.logoImage} /> : null}
        </div>
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
      background: ${(props) =>
        props.theme ? props.theme.secondaryColor : "#4a3f35"};
      border-bottom: 1px solid
        ${(props) => (props.theme ? props.theme.thirdColor : "#2f2519")};

      h1 {
        font-size: 22px;
        font-family: "Raleway", sans-serif;
        letter-spacing: 0.2em;
        font-weight: 500;
        font-style: normal;
        color: ${(props) => (props.theme ? props.theme.thirdColor : "#2f2519")};
        text-transform: uppercase;
        width: 100%;
      }
      h2 {
        font-size: 22px;
        font-family: "Raleway", sans-serif;
        letter-spacing: 0.2em;
        font-weight: 300;
        font-style: normal;
        color: ${(props) =>
          props.theme ? props.theme.primaryColor : "#fa7d09"};
        text-transform: uppercase;
        width: 100%;
        margin-right: 5px;
      }
    }
    .PageLoading {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100%;
      width: 100%;
      margin-top: 200px;
    }
    .content {
      width: 100%;
      height: auto;
      margin-top: 80px;
      padding: 20px;

      .photo {
        margin-top: 20px;
        width: 200px;
        height: 200px;
        margin-left: 20px;
        border: 2px solid transparent;
        border-radius: 5px;
      }

      .logo-container {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: 20px;

        .icon {
          margin-left: 10px;
          width: 30px;
          height: 30px;
          color: ${(props) =>
            props.theme ? props.theme.secondaryColor : "#4a3f35"};
          ourline: none;
          &:focus {
            outline: none;
          }
        }
      }

      h2 {
        font-size: 22px;
        font-family: "Raleway", sans-serif;
        letter-spacing: 0.2em;
        font-weight: 300;
        font-style: normal;
        color: ${(props) =>
          props.theme ? props.theme.primaryColor : "#fa7d09"};
        text-transform: uppercase;
      }

      .content-color {
        width: 100%;
        height: auto;
        margin-top: 15px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;

        .content-color-item-orange {
          width: 50px;
          height: 50px;
          margin: 10px;
          cursor: pointer;
          border: 2px solid transparent;
          border-radius: 5px;
          background: rgb(250, 125, 9);
          background: linear-gradient(
            135deg,
            rgba(250, 125, 9, 1) 50%,
            rgba(255, 67, 1, 1) 50%
          );
        }

        .content-color-item-brown {
          width: 50px;
          height: 50px;
          margin: 10px;
          cursor: pointer;
          border: 2px solid transparent;
          border-radius: 5px;
          background: rgb(246, 182, 30);
          background: linear-gradient(
            135deg,
            rgba(246, 182, 30, 1) 50%,
            rgba(255, 235, 175, 1) 50%
          );
        }

        .content-color-item-yellow {
          width: 50px;
          height: 50px;
          margin: 10px;
          cursor: pointer;
          border: 2px solid transparent;
          border-radius: 5px;
          background: rgb(246, 201, 14);
          background: linear-gradient(
            135deg,
            rgba(246, 201, 14, 1) 50%,
            rgba(238, 238, 238, 1) 50%
          );
        }

        .content-color-item-blue {
          width: 50px;
          height: 50px;
          margin: 10px;
          cursor: pointer;
          border: 2px solid transparent;
          border-radius: 5px;
          background: rgb(50, 130, 184);
          background: linear-gradient(
            135deg,
            rgba(50, 130, 184, 1) 50%,
            rgba(187, 225, 250, 1) 50%
          );
        }
        .content-color-item-blue-1 {
          width: 50px;
          height: 50px;
          cursor: pointer;
          margin: 10px;
          border: 2px solid transparent;
          border-radius: 5px;
          background: rgb(95, 133, 219);
          background: linear-gradient(
            135deg,
            rgba(95, 133, 219, 1) 50%,
            rgba(144, 184, 248, 1) 50%
          );
        }
        .content-color-item-purple {
          width: 50px;
          height: 50px;
          cursor: pointer;
          margin: 10px;
          border: 2px solid transparent;
          border-radius: 5px;
          background: rgb(92, 84, 112);
          background: linear-gradient(
            135deg,
            rgba(92, 84, 112, 1) 50%,
            rgba(219, 216, 227, 1) 50%
          );
        }
        .content-color-item-purple-1 {
          width: 50px;
          height: 50px;
          margin: 10px;
          cursor: pointer;
          border: 2px solid transparent;
          border-radius: 5px;
          background: rgb(130, 115, 151);
          background: linear-gradient(
            135deg,
            rgba(130, 115, 151, 1) 50%,
            rgba(216, 185, 195, 1) 50%
          );
        }
        .content-color-item-grey {
          width: 50px;
          cursor: pointer;
          height: 50px;
          margin: 10px;
          border: 2px solid transparent;
          border-radius: 5px;
          background: rgb(214, 224, 240);
          background: linear-gradient(
            135deg,
            rgba(214, 224, 240, 1) 50%,
            rgba(57, 59, 68, 1) 50%
          );
        }
        .content-color-item-pink {
          width: 50px;
          height: 50px;
          margin: 10px;
          cursor: pointer;
          border: 2px solid transparent;
          border-radius: 5px;
          background: rgb(141, 98, 98);
          background: linear-gradient(
            135deg,
            rgba(141, 98, 98, 1) 50%,
            rgba(237, 141, 141, 1) 50%
          );
        }
        .content-color-item-pink-1 {
          width: 50px;
          height: 50px;
          cursor: pointer;
          margin: 10px;
          border: 2px solid transparent;
          border-radius: 5px;
          background: rgb(217, 173, 173);
          background: linear-gradient(
            135deg,
            rgba(217, 173, 173, 1) 50%,
            rgba(252, 203, 203, 1) 50%
          );
        }
        .content-color-item-green {
          width: 50px;
          height: 50px;
          margin: 10px;
          cursor: pointer;
          border: 2px solid transparent;
          border-radius: 5px;
          background: rgb(167, 209, 41);
          background: linear-gradient(
            135deg,
            rgba(167, 209, 41, 1) 50%,
            rgba(248, 238, 180, 1) 50%
          );
        }
        .content-color-item-green-1 {
          width: 50px;
          height: 50px;
          cursor: pointer;
          margin: 10px;
          border: 2px solid transparent;
          border-radius: 5px;
          background: rgb(186, 199, 167);
          background: linear-gradient(
            135deg,
            rgba(186, 199, 167, 1) 50%,
            rgba(229, 228, 204, 1) 50%
          );
        }
      }
    }
  }

  @media only screen and (max-width: 1100px) {
    flex-direction: column;
    .home-view {
      width: 100%;
      margin-left: 0;
      .PageLoading {
        margin-top: 300px;
      }
      .content {
        width: 100%;
        height: auto;
        margin-top: 260px;
      }
      .home-view-title {
        height: 80px;
        margin-top: 90px;
        width: 100%;
      }
    }
  }
`;
