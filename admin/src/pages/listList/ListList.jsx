import "./listList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { ListContext } from "../../context/listContext/ListContext";
import { getList, deleteList } from "../../context/listContext/apiCalls";

export default function ListList() {
  const { list, dispatch } = useContext(ListContext);

  const handleDelete = (id) => {
    deleteList(id, dispatch);
  };

  const capatilizeFirst = (ele) => {
    return ele.charAt(0).toUpperCase() + ele.slice(1);
  }

  useEffect(() => {
    getList(dispatch);
  }, [dispatch]);


  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    { field: "title", headerName: "Title", width: 250 },
    {
      field: "genre", headerName: "Genre", width: 150,
      renderCell: (params) => {
        return (
          <>
            {capatilizeFirst(params.row.genre)}
          </>
        )
      }
    },
    { field: "type", headerName: "Type", width: 150 },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={'/list/' + params.row._id} state={params.row} >
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={list}
        disableSelectionOnClick
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        getRowId={row => row._id}
      />
      <Link to="/newList">
        <button className="productAddButton">Create</button>
      </Link>
    </div>
  );
}
