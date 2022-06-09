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
import CustomInput from "../CustomInput/CustomInput.components";

export default function CustomTable({
  data,
  currentUser,
  setEdit,
  setUser,
  setDelete,
  sortingType,
  setSort,
  search,
  searchValue,
  header,
  title,
  buttonText,
  updateStatus,
  setStatus,
}) {
  const onClickSort = (e) => {
    if (sortingType.type !== e.target.innerText)
      setSort({ type: e.target.innerText, isAsc: true });
    else {
      if (sortingType.isAsc) setSort({ type: sortingType.type, isAsc: false });
      else setSort({ type: "off", isAsc: true });
    }
  };
  return (
    <React.Fragment>
      <Title variant="h6" color="primary">
        {title}
      </Title>
      <CustomInput label="Search" onChange={search} value={searchValue} />
      <Table size="small">
        <TableHead>
          <TableRow>
            {header.map((key) => (
              <TableCell>
                {key.isSortable ? (
                  <>
                    <span className="sortable" onClick={onClickSort}>
                      {key.label}
                    </span>
                    {sortingType.type === key.label && (
                      <i
                        class={
                          sortingType.isAsc
                            ? "fas fa-arrow-up"
                            : "fas fa-arrow-down"
                        }
                      ></i>
                    )}
                  </>
                ) : (
                  key.label
                )}
              </TableCell>
            ))}
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item._id}>
              {header.map((key) => (
                <TableCell>
                  {key.prop === "dateOfBirth" ? (
                    moment(item[key.prop]).format("DD/MM/YYYY")
                  ) : (
                    <>
                      {key.prop === "isManager" ? (
                        item[key.prop] ? (
                          "Manager"
                        ) : (
                          "Employee"
                        )
                      ) : key.prop === "taskCreator" ? (
                        item[key.prop].name
                      ) : key.prop === "assignedEmployees" ? (
                        <>
                          {item[key.prop].map((employee) => (
                            <>{employee.employee.name},</>
                          ))}
                        </>
                      ) : (
                        <>{item[key.prop]}</>
                      )}
                    </>
                  )}
                </TableCell>
              ))}
              <TableCell>
                {currentUser.isManager && (
                  <>
                    {" "}
                    <CustomButton
                      className="button margin"
                      text={buttonText === "Add User" ? "Edit" : "Info"}
                      onClick={() => {
                        setEdit(true);
                        setUser(item);
                      }}
                    />
                    {currentUser._id !== item._id && (
                      <CustomButton
                        className="button"
                        text="Delete"
                        id={item.id}
                        onClick={() => {
                          setDelete(true);
                          setUser(item);
                        }}
                      />
                    )}
                  </>
                )}
                {!currentUser.isManager && (
                  <>
                    <select
                      onChange={(e) => {
                        setStatus(e.target.value);
                      }}
                    >
                      <option hidden>Select a Status</option>
                      <option value="Handling">Handling</option>
                      <option value="Ready">Ready</option>
                    </select>
                    <CustomButton
                      text="Update"
                      onClick={updateStatus}
                      id={item._id}
                    />
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            {currentUser.isManager === true && (
              <CustomButton
                text={buttonText}
                onClick={() => {
                  setEdit(true);
                }}
              />
            )}
          </TableRow>
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
