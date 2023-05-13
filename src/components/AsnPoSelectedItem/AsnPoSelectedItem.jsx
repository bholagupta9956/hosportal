import React, { useState } from "react";
import "./asnPoSelectedItem.css";
import MUIDataTable from "mui-datatables";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import ScreenLoader from "../../elements/screenLoader/ScreenLoader";
import Pagination from "../Pagination/Pagination";
import { AiFillFileText } from "react-icons/ai";

const AsnPoSelectedItem = (props) => {
  const {
    title,
    data,
    column,
    getList,
    isLoading,
    setShowTextPopup,
    handleSubmitAsn,
    supplierName,
    setSupplierName,
    supplierEmail,
    setSupplierEmail,
    headerText,
    setHeaderText,
    deliveryDate,
    setDeliveryDate,
    deliveryTime,
    setDeliveryTime,
    truckNo,
    setTruckNo,
    noOfTruck,
    setNoOfTrucks,
  } = props;

  const options = {
    confirmFilters: false,
    selectableRowsHeader: false,
    selectableRows: "none",
    responsive: true,
    tableBodyMinHeight: "220px",
    tableBodyMaxHeight: "220px",
    print: false,
    search: false,
    viewColumns: false,
    download: false,
    filter: false,
    rowsPerPage: 20,

    customFooter: (
      count,
      page,
      rowsPerPage,
      changeRowsPerPage,
      changePage,
      textLabels
    ) => {
      return (
        <CustomFooter
          count={count}
          page={page}
          rowsPerPage={rowsPerPage}
          changeRowsPerPage={changeRowsPerPage}
          changePage={changePage}
          textLabels={textLabels}
          {...props}
        />
      );
    },
  };

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + "-" + dd + "-" + yyyy;


  return (
    <div className="asnPoSld">
      <h3>Selected Po Item List</h3>
      <div className="sup2ndBox">
        <div className="sup2ndrow">
          <div className="sup2ndrow1">
            <h6>Vendor</h6>: <span> </span>
          </div>
          <div className="sup2ndrow1">
            <h6>Vendor Name</h6>: <span></span>
          </div>
          <div className="sup2ndrow1">
            <h6>Ship To</h6>: <span> </span>
          </div>
          <div className="sup2ndrow1">
            <h6>Supplier Contact Name</h6>:
            <input
              type="text"
              value={supplierName}
              onChange={(e) => {
                setSupplierName(e.target.value);
              }}
            />
          </div>
          <div className="sup2ndrow1">
            <h6>Supplier Contact Email</h6>:
            <input
              type="text"
              value={supplierEmail}
              onChange={(e) => setSupplierEmail(e.target.value)}
            />
          </div>
          <div className="sup2ndrow1">
            <h6>Header Text</h6>:
            <AiFillFileText
              size={20}
              onClick={() => setShowTextPopup(true)}
              style={{ marginLeft: "9%" }}
            />
          </div>
        </div>

        <div className="sup2ndrow" style={{ width: "30% !important" }}>
          <div className="sup2ndrow1">
            <h6>Pallet Count</h6>:<span> 0</span>
          </div>
          <div className="sup2ndrow1">
            <h6>Delivery Date</h6>
            :
            <input
              type="date"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              min={new Date().toLocaleDateString('en-ca')}
            />
          </div>
          <div className="sup2ndrow1">
            <h6>Delivery Time</h6>:
            <select value={deliveryTime} onChange={(e) =>{setDeliveryTime(e.target.value)}}>
              <option value="">Select Delivery Time</option>
              <option value="09:00 AM">09:00 AM</option>
              <option value="10:00 AM">10:00 AM</option>
              <option value="11:00 AM">11:00 AM</option>
              <option value="12:00 AM">12:00 AM</option>
              <option value="01:00 PM">01:00 PM</option>
              <option value="02:00 PM">02:00 PM</option>
              <option value="03:00 PM">03:00 PM</option>
              <option value="04:00 PM">04:00 PM</option>
            </select>
          </div>
          <div className="sup2ndrow1">
            <h6>Truck No</h6>
            :<input type="text" value={truckNo} style={{textTransform : "uppercase"}} onChange={(e) => setTruckNo(e.target.value)} maxLength={15}/>
          </div>
          <div className="sup2ndrow1">
            <h6>No of Trucks</h6>:
            <input type="number" value={noOfTruck} onChange={(e) =>{setNoOfTrucks(e.target.value)}} maxLength={3} />
          </div>
        </div>
      </div>

      <div className="asnPoSelectedDtaTable">
        <div className="supDtaTable supdtaTabless">
          <div className="supDtaTableCont supdtaHeaderss">
            <MUIDataTable
              title={
                <h5 style={{ fontFamily: "Tahoma-Bold", color: "#373757" }}>
                  {title}
                </h5>
              }
              data={data}
              columns={column}
              options={options}
              getList={getList}
            />
          </div>
        </div>
      </div>

      {isLoading && <ScreenLoader />}
    </div>
  );
};

export default AsnPoSelectedItem;

const CustomFooter = (props) => {
  const {
    createInvoiceBtn,
    handleCreateInvoice,
    getList,
    totalData,
    handleSubmitAsn,
    pageCount,
  } = props;

  const [listNumber, setListNumber] = useState(1);
  const pageCounts = parseInt(pageCount);
  const totalItems = parseInt(totalData);

  return (
    <>
      <div>
        <div className="customFooter">
          <div className="csmFtleft">
            {pageCount > 0 ? (
              <h6>
                Showing {listNumber * 20 - 19} to{" "}
                {listNumber == pageCounts ? totalData : listNumber * 20} of{" "}
                {totalData} entries
              </h6>
            ) : (
              <h6> showing 0 to 0 of 0 entries </h6>
            )}
          </div>
          <div className="csmFtright">
            {pageCounts > 1 && (
              <Pagination
                totalPages={totalItems}
                perpageCount={20}
                getList={getList}
                setListNumber={setListNumber}
              />
            )}
          </div>
        </div>
        {createInvoiceBtn && (
          <div className="ftBtn createInvceBtn" onClick={handleCreateInvoice}>
            <button>Create Invoice</button>
          </div>
        )}

        <div className="ftBtn" style={{ marginTop: "-66px" }}>
          <button style={{ margin: "6px 12px" }} onClick={handleSubmitAsn}>
            Submit ASN
          </button>
        </div>
      </div>
    </>
  );
}



