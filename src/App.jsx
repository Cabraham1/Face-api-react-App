import React,{ useState, useEffect } from 'react';
import Navbar from '../src/components/Navbar';
import './App.css'
import { FcAddImage } from 'react-icons/fc'
import { GrMapLocation } from "react-icons/gr";
import { FcCalendar } from "react-icons/fc";
import NewPost from './components/NewPost';


function App() {

  const [file, setFile] = useState()
  const [image, setImage] = useState()

  useEffect(() => {
    const getImage = () =>{
      const img = new Image()
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        setImage({
        url: img.src,
        width: img.width,
        height: img.height,
        });

      };
      
    };

      file && getImage();
  }, [file])
  return (
    <div>
      <Navbar />
      {image ? (
        <NewPost image={image} />
      ) : (
        <div className="newPostCard">
          <div className="addPost">
            <img
              src="https://media.istockphoto.com/photos/portrait-of-a-young-adult-asian-woman-in-venice-picture-id1157741177?k=20&m=1157741177&s=612x612&w=0&h=gp_dPgVEMhzGrTO1gOwnDwawsrTvgGDIeRwetEwyk14="
              alt=""
              className="Avatar"
            />
            <div className="postForm">
              <input
                type="text"
                placeholder="Whats on your mind?"
                className="postInput"
              />
              <label htmlFor="file">
                <FcAddImage className="addImg" />
                <GrMapLocation className="addImg" />
                <FcCalendar className="addImg" />
                <button>Send</button>
              </label>
              <input
                onChange={(e) => setFile(e.target.files[0])}
                id="file"
                style={{ display: "none" }}
                type="file"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
