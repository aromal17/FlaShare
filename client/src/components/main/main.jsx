import React,{useRef, useState} from "react";
import Footer from "../footer/footer";
import "./main.css";
import { ReactComponent as ReactLogo } from "../../resources/uploadimg.svg";
import fileIcon from "../../resources/file.svg";
export default function Main() {

  const inputFileRef = useRef();
  const dropZoneRef = useRef(null);
  const maxAllowedSize = 20 * 1024 * 1024; //20Mb

    function browseFile(){
        inputFileRef.current.click();
        console.log(inputFileRef.current.value);
    }

    function handleDragOver(e){
        e.preventDefault();
        dropZoneRef.current.classList.add("dragged");
        console.log("dragged in")
    }

    function handleDragLeave(e){
        e.preventDefault();
        dropZoneRef.current.classList.remove("dragged");
        console.log("dragged out");
    }

    function handleDrop(e){
        e.preventDefault();
        const files = e.dataTransfer.files;
        if(files.length === 1){
            if(files[0].size <= maxAllowedSize){
                inputFileRef.current.files = files;
                console.log("valid")
            }else{
                console.log("file size should be less than 20MB")
            }
        }
        else{
            console.log("Cant upload multiple files");
        }
        dropZoneRef.current.classList.remove("dragged");
        console.log("file value :", inputFileRef.current.value);
    } 

    function handleFileChange(){
        if(inputFileRef.current.files[0].size > maxAllowedSize){
            console.log("file size should be less than 20MB");
            inputFileRef.current.value = "";
        }
        // else
        //     uploadFile()
    }



  return (
    <>
      <div className="container-sm head">
        <div className="row mt-5 justify-content-between parent">
        <div className="upload-img">
            <ReactLogo className="image-vector" />
          </div>
          <section class="upload-container">
            <form action="">
              <div class="drop-zone" ref={dropZoneRef} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
                <div class="icon-container">
                  <img src={fileIcon} draggable="false" class="center" alt="File Icon"/>
                  <img src={fileIcon} draggable="false" class="left" alt="File Icon"/>
                  <img src={fileIcon} draggable="false" class="right" alt="File Icon"/>
                </div>
                <input type="file" id="fileInput" ref={inputFileRef} onChange={handleFileChange}/>
                <div class="title">
                  Drop your File here : <span id="browseBtn" onClick = {browseFile}>(Browse)</span>
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
            </div>
          </section>
          {/* <div className="upload-img">
            <ReactLogo className="image-vector" />
          </div> */}
        </div>
      </div>
    </>
  );
}
