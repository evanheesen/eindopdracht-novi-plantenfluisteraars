import React from 'react';
import './FileUpload.css'

function FileUpload() {
    return (
        <div className="fileUpload">
            <form id="uploadFileForm" name="uploadFileForm">
                <input id="uploadFileInput" type="file" name="file" className="file-input" required/>
                <button type="submit" className="fileUploadButton"></button>
            </form>
            <div className="upload-response">
                <div id="fileUploadError"></div>
                <div id="fileUploadSucces"></div>
            </div>
        </div>
    );
}

export default FileUpload;