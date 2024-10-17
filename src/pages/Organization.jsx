import React, { useEffect, useState } from "react";
import TableDisplay from "../components/Table/Table";
import Loading from "../components/Loaging/Loading";
import ModalWrapper from "../components/Modal/Modal";
import { Input, Select } from "antd";
import NoData from "../components/Empty/Empty";

const Organizations = () => {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [refreshPage, setRefreshPage] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [regionFilter, setRegionFilter] = useState(""); 
  const [filteredOrganizations, setFilteredOrganizations] = useState([]); 
  const [newOrganization, setNewOrganization] = useState({
    name: "",
    status: "1",
    regionPlace: "",
    createdTime: new Date().toISOString().split("T")[0],
    address: "",
  });

  useEffect(() => {
    const fetchOrganizations = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/organization`);
        const data = await response.json();
        setTimeout(() => {
          setOrganizations(data);
          setFilteredOrganizations(data);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrganizations();
  }, [refreshPage]);

  useEffect(() => {
    let filtered = organizations;
    if (searchTerm) {
      filtered = filtered.filter((org) =>
        org.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (regionFilter){
        if (regionFilter === "Barcha hududlar") {
            filtered = organizations;
        }
        else {
            filtered = filtered.filter((org) => org.regionPlace === regionFilter);
        }
    }
    setFilteredOrganizations(filtered);
  }, [searchTerm, regionFilter, organizations]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRegionFilterChange = (value, obj) => {
    setRegionFilter(obj.label);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:3000/organization", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOrganization),
      });
      setRefreshPage(!refreshPage);
      setShowModal(false);
      setNewOrganization({
        name: "",
        status: "1",
        regionPlace: "",
        createdTime: new Date().toISOString().split("T")[0],
        address: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrganization((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setShowModal(false);
    setNewOrganization({
      name: "",
      status: "1",
      regionPlace: "",
      createdTime: new Date().toISOString().split("T")[0],
      address: "",
    });
  };

  const regionOptions = [
    { value: "1", label: "Tashkent shahri" },
    { value: "2", label: "Samarqand viloyati" },
    { value: "3", label: "Jizzax viloyati" },
    { value: "4", label: "Qashqadaryo viloyati" },
  ];

  const handleRegionChange = (value, obj) => {
    setNewOrganization((prevState) => ({
      ...prevState,
      regionPlace: obj.label,
    }));
  };

  return (
    <div className="w-full">
      <div className="w-full flex justify-between my-5">
        <h1 className="text-sxl font-semibold">Tashkilotlar ro'yhati</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#000]/20 px-4 rounded py-1 font-semibold active:bg-[#000]/30"
        >
            Tashkilot qo'shish
        </button>
      </div>
      <div className="mb-5 flex space-x-4">
        <Input
          placeholder="Tashkilot nomi bo'yicha qidirish..."
          value={searchTerm}
          onChange={handleSearchChange}
          allowClear
        />
        <Select
          className="w-64"
          placeholder="Filter by region"
          value={regionFilter}
          onChange={handleRegionFilterChange}
          allowClear
          options={[
            { value: "", label: "Barcha hududlar" },
            ...regionOptions,
          ]}
        />
      </div>
      <div>
        {loading ? (
          <Loading />
        ) : filteredOrganizations.length > 0 ? (
          <TableDisplay
            data={filteredOrganizations}
            refreshPage={refreshPage}
            setRefreshPage={setRefreshPage}
          />
        ) : (
          <div className="w-full text-center">
            <NoData />
          </div>
        )}
      </div>
      <ModalWrapper
        open={showModal}
        setOpen={setShowModal}
        title={"Tashkilot qo'shish"}
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
                value={newOrganization.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mt-2">
              <label>Tashkilot holati:</label>
              <Select
                className="mt-2 w-full"
                value={newOrganization.status}
                onChange={(value) =>
                  setNewOrganization((prevState) => ({
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
                value={newOrganization.regionPlace}
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
                value={newOrganization.address}
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
                value={newOrganization.createdTime}
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
                Qo'shish
              </button>
            </div>
          </form>
        </div>
      </ModalWrapper>
    </div>
  );
};

export default Organizations;
