import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { storage, db } from "./firebase";
import firebase from "firebase";
import "./ImageUpload.css";

function ImageUpload({ username }) {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleClose = (e) => {
    window.location.reload();
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`/images/${image.name}`).put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress function...
        const progress =
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        // Error function
        console.log(error);
        alert(error.message);
      },
      () => {
        // Complete upload function
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            // Post the image inside db
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
            });
            setProgress(0);
            setCaption("");
            setImage(null);
          });
      }
    );
  };

  return (
    <div>
      <center>
        <h3>Upload an Image</h3>
      </center>
      <div className="imageUpload">
        <progress
          className="imageUpload__progress"
          value={progress}
          max="100"
        />
        <input
          className="imageUpload__caption"
          type="text"
          placeholder="Enter a caption"
          onChange={(e) => setCaption(e.target.value)}
          value={caption}
        />
        <input
          className="imageUpload__type"
          type="file"
          onChange={handleChange}
        />
        <div className="imageUpload__button">
          <Button onClick={handleUpload}>Upload</Button>
          <Button onClick={handleClose}>Close</Button>
        </div>
      </div>
    </div>
  );
}

export default ImageUpload;
