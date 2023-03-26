import React, { useState, useEffect } from 'react';
import FastAPIClient from '../../client';
import config from '../../config';

const client = new FastAPIClient(config)

function ImageViewer(props) {
  const [imageSrc, setImageSrc] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  
  const response = client.getImage()
  .then((data) => {setImageSrc(data.data)});

  console.log(response);
  


    
  return (
    <div>
     
      {imageSrc && (
        <img src={`data:image/jpeg;base64,${imageSrc}`}></img>

      )}
    </div>
  );
}

export default ImageViewer;