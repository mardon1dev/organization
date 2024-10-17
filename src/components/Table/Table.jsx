import React, { useState } from "react";
import { Button, Table, Tag, Pagination, Input, Select } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import ModalWrapper from "../Modal/Modal";
import { Link } from "react-router-dom";

const TableDisplay = ({ data, refreshPage, setRefreshPage, regionOptions }) => {
  const [showModal, setShowModal] = useState(false);
  const [deleteRecord, setDeleteRecord] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const [editRecord, setEditRecord] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  console.log(data);

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const handleCancel = () => {
    setShowModal(false);
    setShowEditModal(false);
  };

  const columns = [
    {
      title: "Tashkilot nomi",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Holati",
      dataIndex: "status",
      key: "status",
      render: (status) => (status === "1" ? "Faol" : "Faol emas"),
    },
    {
      title: "Hudud joyi",
      dataIndex: "regionPlace",
      key: "regionPlace",
    },
    {
      title: "Manzil",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Yaratilgan vaqt",
      dataIndex: "createdTime",
      key: "createdTime",
    },
    {
      title: "Qo'shimcha",
      key: "action",
      render: (_, record) => (
        <div className="flex items-center space-x-3">
          <Link className="hover:text-blue-500" to={`/${record.id}`}>
            <SolutionOutlined className="text-xl" />
          </Link>
          <button
            onClick={() => handleShowModal(record)}
            className="hover:text-red-500"
          >
            <DeleteOutlined className="text-xl" />
          </button>
          <button
            onClick={() => handleEditModal(record)}
            className="hover:text-green-500"
          >
            <EditOutlined className="text-xl" />
          </button>
        </div>
      ),
    },
  ];

  const handleRegionChange = (value, obj) => {
    setEditRecord((prevState) => ({
      ...prevState,
      regionPlace: obj.label,
    }));
  };

  const handleShowModal = (record) => {
    setDeleteRecord(record);
    setShowModal(true);
  };

  const handleDelete = () => {
    fetch(`http://localhost:3000/organization/${deleteRecord.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        setRefreshPage(!refreshPage);
        setShowModal(false);
      })
      .catch((error) => console.error(error));
  };

  const handleEditModal = (record) => {
    setEditRecord(record);
    setShowEditModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditRecord((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/organization/${editRecord.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editRecord),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update the organization");
        }
        return response.json();
      })
      .then(() => {
        setRefreshPage(!refreshPage);
        setShowEditModal(false);
      })
      .catch((error) => {
        console.error("Error updating the organization:", error);
      });
  };

  const dataSlice = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <>
      <Table
        columns={columns}
        dataSource={dataSlice}
        pagination={false}
        rowKey="id"
      />
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={data.length}
        onChange={handlePageChange}
        pageSizeOptions={[5, 10, 20, 50]}
        className="flex justify-end mt-5"
      />
      <ModalWrapper
        open={showModal}
        setOpen={setShowModal}
        handleCancel={handleCancel}
        title="Tashkilotni o'chirish"
      >
        <div>
          <p>Ushbu tashkilotni o'chirib yuborishga tayyormisiz?</p>
          <div className="flex items-center justify-end space-x-3">
            <button onClick={() => setShowModal(false)}>Orqaga</button>
            <Button
              htmlType="submit"
              type="primary"
              danger
              onClick={handleDelete}
            >
              Yo'q qilish
            </Button>
          </div>
        </div>
      </ModalWrapper>
      <ModalWrapper
        open={showEditModal}
        setOpen={setShowEditModal}
        title={"Tashkilotni tahrirlash"}
        handleCancel={handleCancel}
      >
        <div>
          <form onSubmit={handleSubmit} className="p-2" autoComplete="off">
            <div className="mt-2">
              <label>Tashkilot nomi:</label>
              <Input
                className="mt-2"
                allowClear
                type="text"
                name="name"
                value={editRecord?.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mt-2">
              <label>Tashkilot holati:</label>
              <Select
                className="mt-2 w-full"
                value={editRecord?.status}
                onChange={(value) =>
                  setEditRecord((prevState) => ({
                    ...prevState,
                    status: value,
                  }))
                }
                options={[
                  { value: "1", label: "Faol" },
                  { value: "0", label: "Faol emas" },
                ]}
              />
            </div>
            <div className="mt-2">
              <label>Hudud joyi:</label>
              <Select
                className="mt-2 w-full"
                placeholder="Select region"
                value={editRecord?.regionPlace}
                onChange={handleRegionChange}
                options={regionOptions}
              />
            </div>
            <div className="mt-2">
              <label>Tashkilot manzili:</label>
              <Input
                className="mt-2"
                allowClear
                type="text"
                name="address"
                value={editRecord?.address}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mt-2">
              <label>Yaratilgan vaqti:</label>
              <Input
                className="mt-2"
                type="date"
                name="createdTime"
                value={editRecord?.createdTime}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="w-full flex items-center justify-end space-x-5 mt-5">
              <button
                type="button"
                className="text-[16px]"
                onClick={handleCancel}
              >
                Orqaga
              </button>
              <button
                type="submit"
                className="bg-[#000]/20 active:bg-[#000]/30 px-2 rounded text-[16px]"
              >
                Saqlash
              </button>
            </div>
          </form>
        </div>
      </ModalWrapper>
    </>
  );
};

export default TableDisplay;
