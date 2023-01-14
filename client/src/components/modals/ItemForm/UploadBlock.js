import React from "react";

const UploadBlock = (props) => {

  const {fileInput} = props

  return (
    <div className="col-span-10">
   <label className="block">
    <span className="sr-only">Choose preview image</span>
    <input type="file" ref={fileInput} 
    className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-sky-50 file:text-sky-600
      hover:file:bg-sky-100
    "/>
  </label>
       </div>
  );
};

export default UploadBlock;
