import React,{useRef, useState} from "react";
import Footer from "../footer/footer";
import axios from 'axios'
import "./main.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ReactComponent as ReactLogo } from "../../resources/uploadimg.svg";
import fileIcon from "../../resources/file.svg";

toast.configure();
export default function Main() {

  const inputFileRef = useRef();
  const copyContainerRef = useRef();
  const dropZoneRef = useRef(null);
  const progressContainerRef = useRef();
  const sharingConatinerRef = useRef();
  const [isUploading, setIsUploading] = useState(true);
  const maxAllowedSize = 50 * 1024 * 1024; //20Mb
  const serverUrl = "http://localhost:5000/files/";
  const [downloadUrl, setdownloadUrl] = useState();
  const [copyText, setCopyText] = useState("");

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
                console.log("valid");
                uploadFile();
            }else{
                // console.log("file size should be less than 20MB");
                toast.error("File size must be less than 50MB", {position : toast.POSITION.TOP_RIGHT});
            }
        }
        else{
            // console.log("Cant upload multiple files");
            toast.error("Please upload one file at a time", {position : toast.POSITION.TOP_RIGHT});
        }
        dropZoneRef.current.classList.remove("dragged");
        console.log("file value :", inputFileRef.current.value);
    } 

    function handleFileChange(){
        if(inputFileRef.current.files[0].size > maxAllowedSize){
            // console.log("file size should be less than 20MB");
            toast.error("File size must be less than 50MB", {position : toast.POSITION.TOP_RIGHT});
            inputFileRef.current.value = "";
        }
        else
            uploadFile()
    }

    function uploadFile(){
        progressContainerRef.current.style["display"] = "block";
        console.log("inside upload file function ");
        var formData = new FormData();
        formData.append("file", inputFileRef.current.files[0]);
        const config = {
            headers: { 'Content-Type': 'multipart/form-data' }
        };

        axios.post('/files', formData, config)
        .then(function(response){
            console.log(response);
            setCopyText(serverUrl + response.data);
            copyContainerRef.current.value = serverUrl + response.data;
            // setCopyText(serverUrl + response.data);
            progressContainerRef.current.style["display"] = "none";
            sharingConatinerRef.current.style["display"] = "block";
            toast.success("🚀 File uploaded successfully", {position : toast.POSITION.TOP_RIGHT});
            // setdownloadUrl(copyContainerRef.current.value);
        })
        .catch(function (error) {
          console.log(error);
      });
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
                  Drop your File here or <span id="browseBtn" onClick = {browseFile}>(Browse)</span>
                </div>
                {/* <p>{isUploading ? "Uploading" : ""}</p> */}
              </div>
            </form>
            <div class="progress-container" ref={progressContainerRef}>
              <div class="bg-progress"></div>
              <div class="inner-container">
                <div class="status">Uploading...</div>
                <div class="percent-container">
                  <i className="fa fa-spinner fa-pulse fa-3x spin"></i>
                </div>
                {/* <div class="progress-bar"></div> */}
              </div>
            </div>
            <div class="sharing-container" ref={sharingConatinerRef}>
            <p>You can now access your uploaded file at :</p>
              <div class="input-container">
                <input type="text" id="fileURL" ref={copyContainerRef} readOnly = {true} value = " " />
                {/* <i className="fa fa-copy fa-2x copyIcon"></i> */}
                <Tippy placement='bottom' content="Copy to Clipboard">
                    <button type="button" className="btn btn-light discuss-btn" id="discuss-bookmark-btn">
                        <CopyToClipboard text={copyText}>
                            {/* <i className="fa fa-copy" ></i> */}
                            <i className="fa fa-copy fa-2x copyIcon"></i>
                        </CopyToClipboard>
                    </button>
                </Tippy>
              </div>
              {/* <a href= "http://localhost:5000/files/05dc4280b4a79a0e55825a3f79ce17ba" download="05dc4280b4a79a0e55825a3f79ce17ba">Click to download</a> */}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
