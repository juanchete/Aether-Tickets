import React, { useState } from "react";
import styled from "styled-components";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { storage } from "../firebaseConfig";

const __ISMSIE__ = navigator.userAgent.match(/Trident/i) ? true : false;

// Quill.register('modules/clipboard', PlainClipboard, true);

const BlockEmbed = Quill.import("blots/block/embed");

class ImageBlot extends BlockEmbed {
  static create(value) {
    const imgTag = super.create();
    imgTag.setAttribute("src", value.src);
    imgTag.setAttribute("alt", value.alt);
    imgTag.setAttribute("width", "100%");
    return imgTag;
  }

  static value(node) {
    return { src: node.getAttribute("src"), alt: node.getAttribute("alt") };
  }
}

ImageBlot.blotName = "image";
ImageBlot.tagName = "img";
Quill.register(ImageBlot);

class VideoBlot extends BlockEmbed {
  static create(value) {
    if (value && value.src) {
      const videoTag = super.create();
      videoTag.setAttribute("src", value.src);
      videoTag.setAttribute("title", value.title);
      videoTag.setAttribute("width", "100%");
      videoTag.setAttribute("controls", "");

      return videoTag;
    } else {
      const iframeTag = document.createElement("iframe");
      iframeTag.setAttribute("src", value);
      iframeTag.setAttribute("frameborder", "0");
      iframeTag.setAttribute("allowfullscreen", true);
      iframeTag.setAttribute("width", "100%");
      return iframeTag;
    }
  }

  static value(node) {
    if (node.getAttribute("title")) {
      return { src: node.getAttribute("src"), alt: node.getAttribute("title") };
    } else {
      return node.getAttribute("src");
    }
    // return { src: node.getAttribute('src'), alt: node.getAttribute('title') };
  }
}

VideoBlot.blotName = "video";
VideoBlot.tagName = "video";
Quill.register(VideoBlot);

export default class QuillEditor extends React.Component {
  bandId;
  onEditorChange;
  onFilesChange;
  _isMounted;

  constructor(props) {
    super(props);

    this.state = {
      editorHtml: __ISMSIE__ ? "<p>&nbsp;</p>" : "",
      files: [],
    };

    this.reactQuillRef = null;

    this.inputOpenImageRef = React.createRef();
    this.inputOpenVideoRef = React.createRef();
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleChange = (html) => {
    console.log("html", html);
    // https://youtu.be/BbR-QCoKngE
    // https://www.youtube.com/embed/ZwKhufmMxko
    // https://tv.naver.com/v/9176888
    // renderToStaticMarkup(ReactHtmlParser(html, options));

    this.setState(
      {
        editorHtml: html,
      },
      () => {
        this.props.onEditorChange(this.state.editorHtml);
      }
    );
  };

  imageHandler = () => {
    this.inputOpenImageRef.current.click();
  };

  videoHandler = () => {
    this.inputOpenVideoRef.current.click();
  };

  insertImage = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (
      e.currentTarget &&
      e.currentTarget.files &&
      e.currentTarget.files.length > 0
    ) {
      const file = e.currentTarget.files[0];

      if (file) {
        const fileType = file["type"];
        const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
        if (validImageTypes.includes(fileType)) {
          const uploadTask = storage.ref(`images/${file.name}`).put(file);
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress = Math.round(
                (snapshot.bytesTransfered / snapshot.totalBytes) * 100
              );
            },
            (error) => {
              console.log(error);
            },
            () => {
              storage
                .ref("images")
                .child(file.name)
                .getDownloadURL()
                .then(async (url) => {
                  const quill = this.reactQuillRef.getEditor();
                  quill.focus();

                  let range = quill.getSelection();
                  let position = range ? range.index : 0;

                  quill.insertEmbed(position, "image", {
                    src: url,
                  });
                  quill.setSelection(position + 1);

                  if (this._isMounted) {
                    this.setState(
                      {
                        files: [...this.state.files, file],
                      },
                      () => {
                        this.props.onFilesChange(url);
                      }
                    );
                  }
                });
            }
          );
        } else {
          console.log("Please Select An Image to Upload");
        }
      } else {
      }

      let formData = new FormData();
      const config = {
        header: { "content-type": "multipart/form-data" },
      };
      formData.append("file", file);

      console.log(formData);
    }
  };

  insertVideo = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (
      e.currentTarget &&
      e.currentTarget.files &&
      e.currentTarget.files.length > 0
    ) {
      const file = e.currentTarget.files[0];

      let formData = new FormData();
      const config = {
        header: { "content-type": "multipart/form-data" },
      };
      formData.append("file", file);
      const uploadTask = storage.ref(`videos/${file.name}`).put(file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransfered / snapshot.totalBytes) * 100
          );
        },
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("videos")
            .child(file.name)
            .getDownloadURL()
            .then(async (url) => {
              const quill = this.reactQuillRef.getEditor();
              quill.focus();

              let range = quill.getSelection();
              let position = range ? range.index : 0;
              quill.insertEmbed(position, "video", {
                src: url,
              });
              quill.setSelection(position + 1);

              if (this._isMounted) {
                this.setState(
                  {
                    files: [...this.state.files, file],
                  },
                  () => {
                    this.props.onFilesChange(url);
                  }
                );
              }
            });
        }
      );
      console.log(formData);
    }
  };

  render() {
    return (
      <textEditorStyle theme={this.props.theme}>
        <div>
          <div
            id="toolbar"
            style={{
              backgroundColor: this.props.theme
                ? this.props.theme.thirdColor
                : "#2f2519",
              border: this.props.theme
                ? `2px solid ${this.props.theme.thirdColor}`
                : "2px solid #2f2519",
              borderRadius: "5px",
              color: "#434343",
            }}
          >
            <select
              className="ql-header"
              defaultValue={""}
              onChange={(e) => e.persist()}
            >
              <option value="1" />
              <option value="2" />
              <option value="" />
            </select>
            <button className="ql-bold" />
            <button className="ql-italic" />
            <button className="ql-underline" />
            <button className="ql-strike" />
            <button className="ql-insertImage">I</button>
            <button className="ql-insertVideo">V</button>
            <button className="ql-link" />
            <button className="ql-code-block" />
            <button className="ql-video" />
            <button className="ql-blockquote" />
            <button className="ql-clean" />
            <select
              className="ql-color"
              defaultValue={"white"}
              onChange={(e) => e.persist()}
            >
              <option selected="selected" value="white" />
              <option
                value={
                  this.props.theme ? this.props.theme.primaryCColor : "#ff4301"
                }
              />
              <option
                value={
                  this.props.theme ? this.props.theme.primaryColor : "#fa7d09"
                }
              />
            </select>
            <select
              className="ql-align"
              defaultValue={""}
              onChange={(e) => e.persist()}
            >
              <option value="center" />
              <option value="justify" />
              <option value="right" />
            </select>
            <button className="ql-list" value="ordered" />
          </div>
          <ReactQuill
            ref={(el) => {
              this.reactQuillRef = el;
            }}
            theme={"snow"}
            onChange={this.handleChange}
            modules={this.modules}
            formats={this.formats}
            value={this.state.editorHtml}
            className="font"
            style={{
              backgroundColor: this.props.theme
                ? this.props.theme.secondaryColor
                : "#4A3F35",
              border: this.props.theme
                ? `2px solid ${this.props.theme.secondaryColor}`
                : "2px solid #4a3f35",
              borderRadius: "5px",
              color: "white",
              height: "100px",
              overflowY: "scroll",
            }}
          />
          <input
            type="file"
            accept="image/*"
            ref={this.inputOpenImageRef}
            style={{ display: "none" }}
            onChange={this.insertImage}
          />
          <input
            type="file"
            accept="video/*"
            ref={this.inputOpenVideoRef}
            style={{ display: "none" }}
            onChange={this.insertVideo}
          />
        </div>
      </textEditorStyle>
    );
  }

  modules = {
    syntax: true,
    toolbar: {
      container: "#toolbar",

      handlers: {
        insertImage: this.imageHandler,
        insertVideo: this.videoHandler,
      },
    },
  };

  formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "image",
    "video",
    "link",
    "code-block",
    "video",
    "blockquote",
    "clean",
    "color",
    "align",
    "list",
  ];
}
const textEditorStyle = styled.div`
  .font {
    font-family: "Raleway", sans-serif;
  }
`;
