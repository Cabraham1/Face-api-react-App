import React, { useRef, useEffect, useState }  from 'react';
import * as faceapi from 'face-api.js';

const NewPost = ({image}) => {
  const {url,width,height} = image;
  const [faces, setFaces] = useState([]);
  const [friends, setFriends] = useState([]);

  const imgRef = useRef();  
  const canvasRef = useRef(); 

  const handleImage = async () => {
    const detections = await faceapi.detectAllFaces(
      imgRef.current, new faceapi
    .TinyFaceDetectorOptions()
    );

      setFaces(detections.map((d) => Object.values(d.box)));

  
};
  const enter = () => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'yellow';
    faces.map((face) => ctx.strokeRect(...face));
  }

useEffect(() => {
  const loadModal = () => {
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
      faceapi.nets.faceExpressionNet.loadFromUri('/models')
    ]).then(handleImage)
    // .catch(err => console.log(err));
  };
  imgRef.current && loadModal();
}, [])

    const addFriend = (e) => {
      setFriends(prev=>({...prev,[e.target.name]:e.target.value}));
    };
    console.log(friends);
  return (
    <div className='container'>
      <div className="left" style={{width,height }}>
        <img ref={imgRef} crossOrigin='anonymous' src={url} alt="" />
        <canvas onMouseEnter={enter} ref={canvasRef} width={width} height={height}/>

       {faces.map((face,i)=>(
         <input
         name={`input${i}`} 
         style={{left: face[0], top: face[1] + face[3]+ 5}} 
         placeholder='Tage your friends' key={i} 
         className='friendsInput'
         onChange={addFriend}/>
       ))} 
      
      </div>
      <div className="right">
      <h1>Share your post</h1>
      <input type="text" 
      placeholder="Whats on your mind?"
      className="righInput"
      />
      <button className='rightButton'>Send</button>
      </div>
    </div>
  )
}

export default NewPost