import React, { useState } from "react";
import { Button, Modal, Row, Col, Tabs, Select, Form, Input } from "antd";
import "./modalView.css";
const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;

const options = [
  "IR12345678910123666663",
  "IR12345678910123566655",
  "IR12345678910123666666",
];

const ModalView = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [price, setPrice] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [errorText, setErrorText] = useState("");

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handelEmptyFeild = () => {
    setErrorText("");
    setSelectValue("");
    setDescriptionValue("");
    setPrice("");
  };

  const handleOk = () => {
    if (!selectValue && price) {
      setErrorText("مقصد تسویه را انتخاب کنید.");
    } else if (selectValue && !price) {
      setErrorText(" مبلغ تسویه را وارد کنید.");
    } else if (!selectValue && !price) {
      setErrorText("مقصد تسویه و مبلغ را وارد کنید.");
    } else {
      setIsModalVisible(false);
      handelEmptyFeild();
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    handelEmptyFeild();
  };

  const handleTextAreaChange = (e) => {
    setDescriptionValue(e.target.value);
  };

  const handleSelectChange = (value) => {
    setSelectValue(value);
  };

  const modalTitle = (
    <div className="flex gap-2 border-b border-r-slate-100 pb-3">
      <span className="font-bold text-black">تسویه کیف پول</span>
      <span className="text-gray-700">اصلی زیب</span>
    </div>
  );
  const handleInputChange = (e) => {
    setPrice(formatInputValue(e.target.value));
  };

  const formatInputValue = (value) => {
    const englishNum = convertFarsiToEnglish(value);
    const numericValue = englishNum.replace(/\D/g, "");
    const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return formattedValue;
  };

  const convertFarsiToEnglish = (num) => {
    const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    const englishDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    for (let i = 0; i < farsiDigits.length; i++) {
      num = num.replace(new RegExp(farsiDigits[i], "g"), englishDigits[i]);
    }
    return num;
  };
  return (
    <>
      <Button type="primary mt-5" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title={modalTitle}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="ثبت درخواست تسویه"
        cancelText="انصراف"
      >
        <Row gutter={[16, 16]}>
          <Col span={24} className="mt-5 mb-2 border-b border-r-slate-100 pb-3">
            <div className="mb-4 text-gray-700 font-bold">موجودی فعلی :</div>
            <div>{Number(150000).toLocaleString("fa-IR")} ریال</div>
          </Col>
          <Col span={24}>
            <Tabs className="custom-tabs">
              <TabPane tab="به حساب" key="1">
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <Form layout="vertical" className="w-full">
                      <Form.Item
                        label={
                          <>
                            <span className="text-red-800">*</span> مقصد تسویه
                          </>
                        }
                      >
                        <Select
                          defaultValue=""
                          placeholder="انتخاب شماره شبا"
                          onChange={handleSelectChange}
                          value={selectValue}
                        >
                          {options.map((option, index) => {
                            return (
                              <Option value={option} key={index}>
                                {option}
                              </Option>
                            );
                          })}
                        </Select>
                      </Form.Item>
                      <Form.Item
                        label={
                          <>
                            <span className="text-red-800">*</span> مبلغ تسویه
                          </>
                        }
                      >
                        <Input
                          value={price}
                          onChange={handleInputChange}
                          placeholder=""
                        />
                      </Form.Item>

                      <Form.Item label="توضیحات (بابت)">
                        <TextArea
                          rows={3}
                          value={descriptionValue}
                          onChange={handleTextAreaChange}
                          placeholder=""
                        />
                      </Form.Item>
                    </Form>
                  </Col>
                  {errorText && (
                    <Col span={24}>
                      <div className="mb-4 text-red-800 font-bold">
                        {errorText}
                      </div>
                    </Col>
                  )}
                </Row>
              </TabPane>
              <TabPane tab="به کیف پول" key="2">
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <div>
                      <div>اطلاعات موجود نیست</div>
                    </div>
                  </Col>
                </Row>
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default ModalView;
