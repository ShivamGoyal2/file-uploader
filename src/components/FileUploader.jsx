import { useState, useRef } from "react";
import "../App.css";

const FileUploader = () => {
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleSubmit = () => {
    console.log(files);
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];

    const newFiles = selectedFiles.map((file) => {
      const isValidtype = allowedTypes.includes(file.type);
      const isValidSize = file.size <= 2 * 1024 * 1024;

      return {
        file: file,
        status: isValidSize && isValidtype ? "Accepted" : "Rejected",
      };
    });

    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleDeleteFile = (fileToDelete) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file !== fileToDelete));
  };

  return (
    <div className="uploader-container">
      <h2>File Uploader</h2>
      <p className="subtitle">Upload PDF, JPG or PNG files (Max 2 MB)</p>

      <div className="upload-box">
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileChange}
          accept=".pdf,.jpg,.jpeg,.png"
          hidden
        />

        <div className="upload-icon">📁</div>
        <p>Choose files to upload</p>
        <button
          className="choose-btn"
          onClick={() => fileInputRef.current.click()}
        >
          Choose Files
        </button>
        <p className="file-count">{files.length} files selected</p>
      </div>

      {files.length > 0 && (
        <div className="file-list">
          <h3>Selected Files</h3>

          {files.map((item, index) => (
            <div className="file-card" key={index}>
              <div className="file-info">
                <div className="file-icon">📄</div>

                <div className="file-details">
                  <p className="file-name">{item.file.name}</p>
                  <p className="file-meta">
                    {item.file.type} ·{" "}
                    {(item.file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  <span
                    className={
                      item.status === "Accepted" ? "accepted" : "rejected"
                    }
                  >
                    {item.status}
                  </span>
                </div>
              </div>

              <button
                className="delete-btn"
                onClick={() => handleDeleteFile(item)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        className="submit-btn"
        onClick={handleSubmit}
        disabled={!files.some((item) => item.status === "Accepted")}
      >
        Submit Files
      </button>
    </div>
  );
};
export default FileUploader;
