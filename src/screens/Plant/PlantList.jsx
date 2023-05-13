import React, { useState, useEffect } from "react";
import DataTableContainer from "../../components/DataTable/DataTableContainer";
import { generatePath, useNavigate } from "react-router-dom";
import axios from "axios";
import { IconContext } from "react-icons";
import { FaDownload, FaEdit, FaEye, FaTrash, FaTrashAlt } from "react-icons/fa";
import FooterComponent from "../../components/Footer/FooterComponent";
import HeaderContainer from "../../components/Header/HeaderContainer";
import SideBarComponent from "../../components/SideBar/SideBarComponent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { endpoints } from "../../services/endpoints,";



const PlantList = () => {

  const navigate = useNavigate();

  const addUser = () => {
    navigate("/plant/add");
  };

  const editUser = () => {};

  const [list, setList] = useState([]);
  const [columns, setColumns] = useState([]);
  const [records, setRecords] = useState([]);
  const [updateList, setUpdateList] = useState(false);
  const [loading, setLoading] = useState(false);

  const users = localStorage.getItem("adminUsersData");
  const usersData = JSON.parse(users);

 

  const updateStatus = (e, record) => {
    const value = e.target.value;
  };

  const editItem = (record) => {
    const plantId = record?.Plant_Id
    const path = generatePath("/plant/update/:plantId" , {plantId : plantId})
    navigate(path)
  };

  const deleteItem = (record) => {
    const headers = { Authorization: `${usersData.MemberToken}` };
    const deleteUrl = endpoints.admin.supplyingPlant.delete;

    const val = {
      Plant_Id : record?.Plant_Id
    };

    axios
      .post(deleteUrl, val, { headers: headers })
      .then((res) => {
        if (res.data.status === "Success") {
          toast("Plant deleted successfully" , {type : "success"})
          setUpdateList(!updateList);
        } else if (res.data.status === "Failed") {
          toast("Plant not deleted " , {type : "error"})
        }
      })
      .catch((err) => {});
  };

  const getList = () => {
    const headers = { Authorization: `${usersData.MemberToken}` };
    const url = endpoints.admin.supplyingPlant.list;

    axios
      .get(url , { headers: headers })
      .then((res) => {
        console.log(res , "dta")
        if (res.data.status === "Success") {
          const dta = res.data.data;
          setList(dta);
        
          const columnsData = [
            {
              key: "id",
              text: "S NO.",
              className: "id",
              align: "center",
              sortable: true,
              cell: (record, index) => {
                return (
                  <>
                    <div style={{ textAlign: "center" }} className="headings">
                      <h6 className="cellText">{index + 1}</h6>
                    </div>
                  </>
                );
              },
            },
            {
              key: "Plant_Name",
              text: "Plant Name",
              className: "typehead",
              align: "center",
              sortable: true,
              cell: (record) => {
                return (
                  <>
                    <div style={{ textAlign: "center" }} className="headings">
                      <h6 className="cellText">{record.Plant_Name}</h6>
                    </div>
                  </>
                );
              },
            },
            {
              key: "Plant_NameArrabic",
              text: "Plant Name (ar)",
              className: "typehead",
              align: "center",
              sortable: true,
              cell: (record) => {
                return (
                  <>
                    <div style={{ textAlign: "center" }} className="headings">
                      <h6 className="cellText">{record.Plant_NameArabic}</h6>
                    </div>
                  </>
                );
              },
            },
            {
              key: "PlantCode",
              text: "Plant Code",
              className: "typehead",
              align: "center",
              sortable: true,
              cell: (record) => {
                return (
                  <>
                    <div style={{ textAlign: "center" }} className="headings">
                      <h6 className="cellText">{record.Plant_Code}</h6>
                    </div>
                  </>
                );
              },
            },
            {
              key: "Address",
              text: "Location",
              className: "typehead",
              align: "center",
              sortable: true,
              cell: (record) => {
                return (
                  <>
                    <div style={{ textAlign: "center" }} className="headings">
                      <h6 className="cellText">{record.Address}</h6>
                    </div>
                  </>
                );
              },
            },
            {
              key: "City",
              text: "City",
              className: "typehead",
              align: "center",
              sortable: true,
              cell: (record) => {
                return (
                  <>
                    <div style={{ textAlign: "center" }} className="headings">
                      <h6 className="cellText">{record.City}</h6>
                    </div>
                  </>
                );
              },
            },

            {
              key: "IsActive",
              text: "Active Status",
              className: "active",
              align: "center",
              sortable: true,
              cell: (record) => {
                return (
                  <>
                    <div style={{ textAlign: "center" }} className="headings">
                      <input
                        type="checkbox"
                        defaultChecked={record.IsActive}
                        // value={}
                        style={{ width: "18px", height: "18px" }}
                        onChange={(e) => updateStatus(e, record)}
                      />
                    </div>
                  </>
                );
              },
            },
            {
              key: "action",
              text: "Action",
              className: "action",
              align: "center",
              sortable: false,
              cell: (record) => {
                return (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <button
                      onClick={() => editItem(record)}
                      style={{
                        border: "none",
                        outline: "none",
                        background: "transparent",
                        margin: "0px 6px",
                      }}
                    >
                      <IconContext.Provider
                        value={{ color: "var(--lightBlue)", size: 22 }}
                      >
                        <div>
                          <FaEdit />
                        </div>
                      </IconContext.Provider>
                    </button>
                    <button
                      onClick={() => deleteItem(record)}
                      style={{
                        border: "none",
                        outline: "none",
                        background: "transparent",
                        margin: "0px 6px",
                      }}
                    >
                      <IconContext.Provider
                        value={{ color: "var(--lightBlue)", size: 20 }}
                      >
                        <div style={{ marginLeft: "9px" }}>
                          <FaTrashAlt />
                        </div>
                      </IconContext.Provider>
                    </button>
                  </div>
                );
              },
            },
          ];

          setColumns(columnsData);
          setRecords(dta);
        } else if (res.data.status === "Failed") {
        }
      })
      .catch((err) => {});
  }

  useEffect(() =>{
    if (users) {
      getList(1);
    } else {
      navigate("/");
    }
  },[updateList])

  
  return (
    <>
      <div className="home">
        <SideBarComponent />
        <div className="homeContent">
          <HeaderContainer />
          <DataTableContainer
            addUser={addUser}
            editUser={editUser}
            columns={columns}
            records={records}
            title="Plant"
          />
          
          <FooterComponent />
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default PlantList;
