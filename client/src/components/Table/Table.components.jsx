import "./Table.styles.css";

function preventDefault(event) {
  event.preventDefault();
}

export default function UserTable({
  data,
  currentUser,
  setEdit,
  setUser,
  setDelete,
}) {
  return (
    <React.Fragment>
      <Title variant="h6" color="primary">
        Registered Users
      </Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Date Of Birth</TableCell>
            <TableCell>ID Number</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Actions</TableCell>
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
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
