/** @format */

import React from "react";

import { IconPaperclip } from "@tabler/icons-react";

const FileUpload = ({ handleFileUpload }) => {
  return (
    <label htmlFor="file-upload" className="cursour-pointer">
      <IconPaperclip size={21} />
      <input
        id="file-ipload"
        type="file"
        className="hidden"
        onChange={handleFileUpload}
      />
    </label>
  );
};

export default FileUpload;
