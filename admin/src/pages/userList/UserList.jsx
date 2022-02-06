import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext/UserContext";
import { getUser, deleteUser } from "../../context/userContext/apiCalls";

export default function UserList() {
  const { users, dispatch } = useContext(UserContext);
  const [data, setData] = useState(users);

  // const handleDelete = (id) => {
  //   setData(data.filter((item) => item.id !== id));
  // };

  useEffect(()=>{
    getUser(dispatch);
  }, [dispatch])

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "user",
      headerName: "User",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.profilePicture?params.row.profilePicture:"https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"} alt="" />
            {params.row.userName}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 280 },
    {
      field: "isAdmin",
      headerName: "Admin?",
      width: 140,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id} state={params.row}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              // onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={users}
        disableSelectionOnClick
        columns={columns}
        pageSize={10}
        checkboxSelection
        rowsPerPageOptions={[10]}
        getRowId={row => row._id}
      />
    </div>
  );
}
