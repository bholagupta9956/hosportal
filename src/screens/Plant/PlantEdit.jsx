import React, { useState, useEffect } from "react";
import AddFormContainer from "../../components/AddForm/AddFormContainer";
import Input from "../../elements/Input/Input";
import { useNavigate, useParams } from "react-router-dom";
import EditFormContainer from "../../components/EditForm/EditFormContainer";
import Button from "../../elements/button/Button";
import BackButton from "../../elements/button/BackButton";
import SelectBox from "../../elements/SelectBox/SelectBox";
import axios from "axios";
import FooterComponent from "../../components/Footer/FooterComponent";
import HeaderContainer from "../../components/Header/HeaderContainer";
import SideBarComponent from "../../components/SideBar/SideBarComponent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { endpoints } from "../../services/endpoints,";


const PlantEdit = () => {

  const [editRecordsData, setEditRecordsData] = useState({});
  const [plantName, setPlantName] = useState("");
  const [plantArabicName, setPlantArabicName] = useState("");
  const [plantCode, setPlantCode] = useState("");
  const [location, setLocation] = useState("");
  const [city, setCity] = useState("");
  const [plantActive, setPlantActive] = useState(true);
  const [address , setAddress] = useState("");

  const navigate = useNavigate();

  const { plantId } = useParams();

  const users = localStorage.getItem("adminUsersData");
  const usersData = JSON.parse(users);
  const headers = { Authorization: `${usersData.MemberToken}` };

  const updateForm = () => {
    const url = endpoints.admin.supplyingPlant.getSingle;
    const val = {
      Plant_Id : Number(plantId),
    };

    axios
      .post(url, val , { headers: headers })
      .then((res) => {
        if(res.data.status === "Success"){
          const val = res.data.data?.[0]
          setPlantName(val?.Plant_Name)
          setPlantArabicName(val?.Plant_NameArabic)
          setCity(val?.City)
          setPlantCode(val?.Plant_Code)
          setAddress(val?.Address)
        }
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };


  const saveForm = () => {

    const url = endpoints.admin.supplyingPlant.update;
    const headers = { Authorization: `${usersData.MemberToken}` };

    const val = {
      Plant_Id : Number(plantId),
      Plant_Name: plantName,
      Plant_NameArabic: plantArabicName,
      Plant_Code: plantCode,
      Address: location,
      City: city,
      ActiveStatus: plantActive,
    };

    axios
      .post(url, val, { headers: headers })
      .then((res) => {
        if (res.data.status === "Success") {
          toast("Plant edited successfully", { type: "success" });
          navigate("/plant/list");
        } else if ((res.data.status = "Failed")) {
          toast("Plant edited failed", { type: "error" });
        }
      })
      .catch((err) => {
        console.log(err, "this is the error");
      });
  };

  useEffect(() => {
    if (!users) {
      navigate("/");
    } else {
      updateForm();
    }
  },[]);

  return (
    <>
      <div className="home">
        <SideBarComponent />
        <div className="homeContent">
          <HeaderContainer />
          <EditFormContainer title="Plant">
            <div className="addForm">
              <Input
                type="text"
                labels="Plant Name"
                onChange={(e) => setPlantName(e.target.value)}
                value={plantName}
                required
                placeholder="Enter plant name"
              />

              <Input
                type="text"
                labels="Plant Arabic Name"
                onChange={(e) => setPlantArabicName(e.target.value)}
                value={plantArabicName}
                required
                placeholder="Enter plant in arabic"
              />

              <Input
                type="text"
                labels="Plant Code"
                onChange={(e) => setPlantCode(e.target.value)}
                value={plantCode}
                required
                placeholder="Enter plant code"
              />

              <Input
                type="text"
                labels="Location"
                onChange={(e) => setLocation(e.target.value)}
                value={location}
                required
                placeholder="Enter Location"
              />

              <Input
                type="text"
                labels="City"
                onChange={(e) => setCity(e.target.value)}
                value={city}
                required
                placeholder="Enter City"
              />
              <Input
                type="text"
                labels="Address"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                required
                placeholder="Enter City"
              />

              {/* <div className="allOrder">
            <h5>Active Status</h5>
            <input
              type="checkbox"
              value={plantActive}
              defaultChecked={plantActive}
              onChange={(e) => setPlantActive(!plantActive)}
              name=""
              id=""
              style={{
                width: "25px",
                height: "25px",
                margin: "14px",
                marginLeft: "33px",
              }}
            />
          </div> */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Button text="Save" onClick={saveForm} />
                <BackButton text="Go Back" onClick={() => navigate(-1)} />
              </div>
            </div>
          </EditFormContainer>
          <FooterComponent />
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default PlantEdit;
