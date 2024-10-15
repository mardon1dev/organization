import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loaging/Loading";
import { LeftCircleOutlined } from "@ant-design/icons";

const SinglePage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const result = `http://localhost:3000/organization/${id}`
    fetch(result)
      .then((response) => response.json())
      .then((data) => {
        setTimeout(() => {
          setData(data);
          setLoading(false);
        }, 500);
      })
      .catch((error) => console.error(error));
  }, [id]);

  if (loading) return <Loading />;

  return (
    <div>
      <button onClick={() => navigate(-1)}>
        <LeftCircleOutlined className="text-[30px]" />
      </button>
      <div className="flex items-start space-x-10 mt-10">
        <div className="bg-[#F5F5F7] rounded-lg py-11 px-8">
          <h1>{data.name}</h1>
          <p>Status: {data.status === "1" ? "Active" : "Inactive"}</p>
          <p>Region Place: {data.regionPlace}</p>
          <p>Address: {data.address}</p>
          <p>Created Time: {new Date(data.createdTime).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
