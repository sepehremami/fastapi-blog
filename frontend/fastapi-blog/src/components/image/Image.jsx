import React, { useState, useEffect } from 'react';
import FastAPIClient from '../../client';
import config from '../../config';

const client = new FastAPIClient(config)

function ImageViewer(props) {
  const [imageSrc, setImageSrc] = useState(null);

  const loadImage = async () => {
        try {
            const response = await client.getImage();
            console.log(response)
            const blob =  new Blob([response.data], {type: 'application/jpeg'});
            const reader = new FileReader();
            setImageSrc(blob)
            reader.onload = () => {
                setImageSrc('gggg');}
        } catch (error) {
          console.error('Error loading image:', error);
        }
      }
      

    
  return (
    <div>
      <button onClick={() => loadImage()}>Load Image</button>
      {imageSrc && (
        <div className='bg-black'>
            <h1>there is a heading</h1>
            <img src={imageSrc} />
            

        </div>
      )}
    </div>
  );
}

export default ImageViewer;