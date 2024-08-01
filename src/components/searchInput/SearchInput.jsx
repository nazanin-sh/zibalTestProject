import React, { useState } from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const SearchInput = ({ placeholder, onSearch, value, label }) => {
  const [inputVisible, setInputVisible] = useState(false);
  const toggleInputVisibility = () => {
    setInputVisible(!inputVisible);
  };

  return (
    <div className="flex items-center justify-center h-10">
      <div
        className="flex items-center justify-center w-8 h-6 bg-blue-700 ml-2 rounded-md cursor-pointer"
        onClick={toggleInputVisibility}
      >
        <SearchOutlined className=" text-white" />
      </div>

      <span>{label}</span>
      {inputVisible && (
        <Input
          id="search-input"
          className="w-28 mr-2 text-sm"
          placeholder={placeholder}
          onChange={onSearch}
          value={value}
        />
      )}
    </div>
  );
};

export default SearchInput;
