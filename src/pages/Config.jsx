import React, { useState } from 'react';

const Config = () => {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [inputKey, setInputKey] = useState(Date.now());

  const handleFileChange = (event) => {
    setFiles(event.target.files);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true); // Briefly lock button to prevent double-clicks
    setNotification(null);

    const formData = new FormData();
    for (const file of files) {
      formData.append('files', file);
    }

    // Immediately free up the UI
    setFiles([]);
    setInputKey(Date.now());
    setIsLoading(false); // Unlock button right away
    setNotification({ type: 'info', message: 'File upload initiated...' });

    // Handle the upload in the background
    fetch('http://localhost:8080/ingest', {
      method: 'POST',
      body: formData,
    })
    .then(response => {
      if (response.ok) {
        setNotification({ type: 'success', message: 'Files uploaded successfully!' });
      } else {
        // Get detailed error from response body
        response.text().then(text => {
          setNotification({ type: 'danger', message: `File upload failed: ${text || 'Server error'}` });
        }).catch(() => {
          setNotification({ type: 'danger', message: 'File upload failed and could not parse error message.' });
        });
      }
    })
    .catch(error => {
      setNotification({ type: 'danger', message: 'Error uploading files: ' + error.message });
    });
  };

  return (
    <div>
      <h1>Add Files To Search Engine</h1>
      {notification && (
        <div className={`alert alert-${notification.type}`} role="alert">
          {notification.message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="file-upload">Upload .txt files</label>
          <input
            key={inputKey}
            type="file"
            className="form-control-file"
            id="file-upload"
            multiple
            accept=".txt"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? (
            <>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              {' '}Uploading...
            </>
          ) : (
            'Submit'
          )}
        </button>
      </form>
    </div>
  );
};

export default Config;
