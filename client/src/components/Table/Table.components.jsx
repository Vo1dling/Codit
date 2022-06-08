import * as React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../Title/Title";
import moment from "moment";
import CustomButton from "../CustomButton/CustomButton.components";
import "./Table.styles.css";

function preventDefault(event) {
  event.preventDefault();
}

export default function UserTable({ data, currentUser }) {
  return (
    <React.Fragment>
      <Title>Registered Users</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Date Of Birth</TableCell>
            <TableCell>ID Number</TableCell>
            <TableCell>Role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                {moment(user.dateOfBirth).format("DD/MM/YYYY")}
              </TableCell>
              <TableCell>{user.idNumber}</TableCell>
              <TableCell>{user.isManager ? "Manager" : "Employee"}</TableCell>
              <TableCell>
                <CustomButton className="button margin" text="Edit" />
                {currentUser._id !== user._id && (
                  <CustomButton className="button" text="Delete" id={user.id} />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
