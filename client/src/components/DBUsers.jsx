import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllUsers } from "../api";
import { Avatar } from "../assets";
import { setAllUserDetails } from "../context/actions/allUsersAction";
import DataTable from "./DataTable";

const DBUsers = () => {
  const allUsers = useSelector((state) => state.allUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!allUsers) {
      getAllUsers().then((data) => {
        dispatch(setAllUserDetails(data));
      });
    }
  }, [allUsers, dispatch]);

  return (
    <div className="flex items-center justify-center gap-4 pt-6 w-full">
      <DataTable
        columns={[
          { title: "Image", field: "photoURL", render: (rowData) => (
            <img
              src={rowData.photoURL ? rowData.photoURL : Avatar}
              alt="photoURL"
              className="w-32 h-16 object-contain rounded-full"
            />
          )}, {
            title: "Name",
            field: "displayName",
          },
          {
            title: "Email",
            field: "email",
          },
          {
            title: "Verified",
            field: "email",
            render: (rowData) => (
              <p className={`px-2 py-1 w-32 text-center text-primary text-sm tracking-wide rounded-md ${rowData.emailVerified ? "bg-emerald-500" : "bg-orange-500"}`}>
                {rowData.emailVerified ? "Verified" : "Not Verified"}
              </p>
            ),
          },
        ]}
        data={allUsers}
        title="List of Users"
      //   actions={[
      //     {
      //       icon: "edit",
      //       tooltip: "Edit Data",
      //       onClick: (event, rowData) => {
      //         alert("Edit " + rowData.productId);
      //       },
      //     },
      //     {
      //       icon: "delete",
      //       tooltip: "Delete Data",
      //       onClick: (event, rowData) => {
      //         if (window.confirm("Are you sure you want to delete?")) {
      //           deleteAProduct(rowData.productId).then((res) => {
      //             dispatch(alertSuccess("Product Deleted Successfully"));
      //             setInterval(() => {
      //               dispatch(alertNull());
      //             }, 3000);
      //             getAllProducts().then((data) => {
      //               dispatch(setAllProducts(data));
      //             });
      //           });
      //         }
      //       },
      //     },
      //   ]}
      />
    </div>
  );
};

export default DBUsers;