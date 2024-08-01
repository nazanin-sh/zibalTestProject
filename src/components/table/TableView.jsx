import React, { useEffect, useState } from "react";
import { CopyOutlined } from "@ant-design/icons";
import { Table } from "antd";
import moment from "moment-jalaali";
import "moment/locale/fa";
import tejaratLogo from "../../assets/img/tejartLogo.png";
import SearchInput from "../searchInput/SearchInput";
import "./TableView.css";
const monthNames = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

const getPersianMonthName = (monthNumber) => {
  return monthNames[monthNumber - 1] || "";
};


function TableView() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [cardSearchText, setCardSearchText] = useState("");

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        setData(data.data);
        setFilteredData(data.data);
      })
      .catch((error) => console.error("Error fetching the data:", error));
  }, []);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    filterData(e.target.value, cardSearchText);
  };

  const handleCardSearch = (e) => {
    setCardSearchText(e.target.value);
    filterData(searchText, e.target.value);
  };

  const filterData = (searchValue, cardValue) => {
    let newData = data;
    if (searchValue) {
      newData = newData.filter((item) =>
        item.trackId
          .toString()
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );
    }
    if (cardValue) {
      newData = newData.filter((item) =>
        item.cardNumber
          .toString()
          .toLowerCase()
          .includes(cardValue.toLowerCase())
      );
    }
    setFilteredData(newData);
  };
 
  const columns = [
    {
      title: (
        <SearchInput
          placeholder="جستجو شماره تراکنش"
          onSearch={handleSearch}
          value={searchText}
          label={"شماره تراکنش"}
        />
      ),
      dataIndex: "trackId",
      key: "trackId",
      align: "center",
      render: (text) => (
        <div className="flex items-center justify-center">
          <div className="flex items-center ml-2 h-8">{text}</div>
          <CopyOutlined className="text-base text-blue-950" />
        </div>
      ),
    },
    {
      title: "وضعیت تراکنش",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (text) => (
        <div className="flex items-baseline justify-center">
          {text === 1 ? (
            <>
              <div className="bg-green-700 h-2 w-2 rounded"></div>
              <div className="mr-2">پرداخت موفق</div>
            </>
          ) : (
            <>
              <div className="bg-red-700 h-2 w-2 rounded"></div>
              <div className="mr-2">پرداخت ناموفق</div>
            </>
          )}
        </div>
      ),
    },
    {
      title: "تاریخ پرداخت",
      dataIndex: "paidAt",
      key: "paidAt",
      align: "center",
      render: (text) => {
        const date = moment(text, "jYYYY/jMM/jDD-HH:mm:ss");
        const day = date.format("jD");
        const month = getPersianMonthName(date.jMonth() + 1); // jMonth() is 0-based
        const year = date.format("jYYYY");
        const time = date.format("HH:mm");
        return (
          <span>
            {day} {month} {year} {time}
          </span>
        );
      },
    },
    {
      title: "مبلغ",
      dataIndex: "amount",
      key: "amount",
      align: "center",
      render: (text) => (
        <>
          {parseInt(text).toLocaleString("fa-IR")}
          <span className="text-gray-900">ریال</span>
        </>
      ),
    },
    {
      title: (
        <SearchInput
          placeholder="جستجو شماره کارت"
          onSearch={handleCardSearch}
          value={cardSearchText}
          label={"شماره کارت"}
        />
      ),
      dataIndex: "cardNumber",
      key: "cardNumber",
      align: "center",
      render: (text) => (
        <div className="flex items-center justify-center">
          <div className="flex items-center ml-2 h-8">{text}</div>
          <img alt="bankLogo" src={tejaratLogo} width="25" height="20" />
        </div>
      ),
    },
  ];

  const footer = () => {
    return (
      <div className="text-right font-bold">
        تعداد نتایج : {filteredData.length}
      </div>
    );
  };


  return (
    <>
      <Table
        dataSource={filteredData}
        columns={columns}
        footer={footer}
        pagination={false}
        className="custom-table"
      />
    </>
  );
}

export default TableView;
