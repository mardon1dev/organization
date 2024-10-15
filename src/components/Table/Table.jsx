import React, { useState } from "react";
import { Button, Table, Tag, Pagination } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import ModalWrapper from "../Modal/Modal";
import { Link } from "react-router-dom";

const TableDisplay = ({ data, refreshPage, setRefreshPage }) => {
  const [showModal, setShowModal] = useState(false);
  const [deleteRecord, setDeleteRecord] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const handleCancel = () => {
    setShowModal(false);
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
      render: (status) => (status === "1" ? "Active" : "Inactive"),
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
          <Link
            className="hover:text-blue-500"
            to={`/${record.id}`}
          >
            <SolutionOutlined className="text-xl" />
          </Link>
          <button
            onClick={() => handleShowModal(record)}
            className="hover:text-red-500"
          >
            <DeleteOutlined className="text-xl" />
          </button>
          <button className="hover:text-green-500">
            <EditOutlined className="text-xl" />
          </button>
        </div>
      ),
    },
  ];

  // Show delete modal
  const handleShowModal = (record) => {
    setDeleteRecord(record);
    setShowModal(true);
  };

  // Delete logic
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
        title="Delete Organization"
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
    </>
  );
};

export default TableDisplay;
 