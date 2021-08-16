import React from "react";
import Footer from "../footer/footer";
import "./main.css";
import { ReactComponent as ReactLogo } from "../../resources/uploadimg.svg";
import fileIcon from "../../resources/file.svg";
export default function Main() {
  return (
    <>
      <div className="container-sm head">
        <div className="row mt-5 justify-content-between parent">
          <section class="upload-container">
            <form action="">
              <div class="drop-zone">
                <div class="icon-container">
                  <img src={fileIcon} draggable="false" class="center" alt="File Icon"/>
                  <img src={fileIcon} draggable="false" class="left" alt="File Icon"/>
                  <img src={fileIcon} draggable="false" class="right" alt="File Icon"/>
                </div>
                <input type="file" id="fileInput"/>
                <div class="title">
                  Drop your Files here now: <span id="browseBtn">(Browse)</span>
                </div>
              </div>
            </form>
            <div class="progress-container">
              <div class="bg-progress"></div>
              <div class="inner-container">
                <div class="status">Uploading...</div>
                <div class="percent-container">
                  <span class="percentage" id="progressPercent">
                    0
                  </span>
                  %
                </div>
                <div class="progress-bar"></div>
              </div>
            </div>
            <div class="sharing-container">
              <div class="input-container">
                <input type="text" id="fileURL" readonly />
                <img
                  src="/img/copy.svg"
                  id="copyURLBtn"
                  alt="copy to clipboard icon"
                />
              </div>
              <p class="email-info">Or Send via Email</p>
              </div>
          </section>
          <div className="upload-img">
            <ReactLogo className="image-vector" />
            {/* <p> Upload file once. <br/> Share it in a ⚡ to your loved ones </p> */}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
