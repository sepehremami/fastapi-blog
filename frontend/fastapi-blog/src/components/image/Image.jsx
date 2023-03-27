import React, { useState, useEffect } from 'react';
import FastAPIClient from '../../client';
import config from '../../config';

const client = new FastAPIClient(config)

function ImageViewer({id}) {
  const [imageSrc, setImageSrc] = useState(null)
  useEffect(() => {
    const response = client.getImage()
    .then((data) => {setImageSrc(data.data)});
  }, []);
  

  return (
    <div>
      {imageSrc && (
        <img className='h-64 w-64 rounded-full object-cover' src={`data:image/jpeg;base64,${imageSrc}`}></img>
      )}
    </div>
  );
}

export default ImageViewer;