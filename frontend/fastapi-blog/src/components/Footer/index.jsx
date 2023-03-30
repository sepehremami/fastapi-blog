import React from 'react';

function Footer() {

  return (
      <footer className="text-left">

          <div
            style={{ position: 'absolote', bottom: 0, height: 'auto'}}
            className="block text-gray-300 py-4 md:grid-cols-5 sm:grid-cols-1 border-t border-primary bg-gradient-to-t from-slate-900 to-secondary-2 text-slate-300 p-20">
                <h4 className="lg:text-2xl md:text-2xl text-xl font-semibold">Maktab Third Group</h4>
                <div className='line-clamp-1'>
                <p className="text-slate-500 font-light lg:text-xl">This blog utilizes FastAPI to create its backend endpoints and React to build its frontend application. The combination of both technologies provides efficient and fast communication between the server and client.</p><br/>
                </div>
                <div className='line-clamp-1'>
                <p className="text-slate-200">All rights reserved for Maktab_Group_3 @1401-1402</p>
                </div>  
              </div>
      </footer>
  );
}

export default Footer;
