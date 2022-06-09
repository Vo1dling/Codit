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

function preventDefault(event) {
	event.preventDefault();
}
export default function UserTable({
	data,
	currentUser,
	setEdit,
	setUser,
	setDelete,
	sortingType,
	setSort,
	search,
	searchValue,
}) {
	const onClickSort = (e) => {
		if (sortingType.type !== e.target.innerText) setSort({ type: e.target.innerText, isAsc: true });
		else {
			if (sortingType.isAsc) setSort({ type: sortingType.type, isAsc: false });
			else setSort({ type: "off", isAsc: true });
		}
	};
	return (
		<React.Fragment>
			<Title variant="h6" color="primary">
				Registered Users
			</Title>
			<CustomInput label="Search" onChange={search} value={searchValue} />
			<Table size="small">
				<TableHead>
					<TableRow>
						<TableCell>
							<span className="sortable" onClick={onClickSort}>
								Name
							</span>
							{sortingType.type === "Name" && (
								<i class={sortingType.isAsc ? "fas fa-arrow-up" : "fas fa-arrow-down"}></i>
							)}
						</TableCell>
						<TableCell>Email</TableCell>
						<TableCell>Date Of Birth</TableCell>
						<TableCell>
							<span className="sortable" onClick={onClickSort}>
								ID Number
							</span>
							{sortingType.type === "ID Number" && (
								<i class={sortingType.isAsc ? "fas fa-arrow-up" : "fas fa-arrow-down"}></i>
							)}
						</TableCell>
						<TableCell>
							<span className="sortable" onClick={onClickSort}>
								Role
							</span>
							{sortingType.type === "Role" && (
								<i class={sortingType.isAsc ? "fas fa-arrow-up" : "fas fa-arrow-down"}></i>
							)}
						</TableCell>
						<TableCell>Actions</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data.map((user) => (
						<TableRow key={user._id}>
							<TableCell>{user.name}</TableCell>
							<TableCell>{user.email}</TableCell>
							<TableCell>{moment(user.dateOfBirth).format("DD/MM/YYYY")}</TableCell>
							<TableCell>{user.idNumber}</TableCell>
							<TableCell>{user.isManager ? "Manager" : "Employee"}</TableCell>
							<TableCell>
								<CustomButton
									className="button margin"
									text="Edit"
									onClick={() => {
										setEdit(true);
										setUser(user);
									}}
								/>
								{currentUser._id !== user._id && (
									<CustomButton
										className="button"
										text="Delete"
										id={user.id}
										onClick={() => {
											setDelete(true);
											setUser(user);
										}}
									/>
								)}
							</TableCell>
						</TableRow>
					))}
					<TableRow>
						<CustomButton
							text="Add User"
							onClick={() => {
								setEdit(true);
							}}
						/>
					</TableRow>
				</TableBody>
			</Table>
		</React.Fragment>
	);
}
