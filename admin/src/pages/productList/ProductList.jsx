import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { getMovie, deleteMovie } from "../../context/movieContext/apiCalls";

export default function ProductList() {
  const { movies, dispatch } = useContext(MovieContext);

  const handleDelete = (id) => {
    deleteMovie(id, dispatch);
  };

  const capatilizeFirst = (ele) => {
    return ele.charAt(0).toUpperCase() + ele.slice(1);
  }

  useEffect(() => {
    getMovie(dispatch);
  }, [dispatch]);


  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "movie",
      headerName: "Movie",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.image} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    {
      field: "genre", headerName: "Genre", width: 120,
      renderCell: (params) => {
        return (
          <>
            {capatilizeFirst(params.row.genre)}
          </>
        )
      }
    },
    { field: "year", headerName: "Year", width: 120 },
    { field: "limit", headerName: "Limit", width: 120 },
    {
      field: "isSeries", headerName: "Type", width: 120,
      renderCell: (params) => {
        return (
          <>
            {params.row.isSeries ? <>Series</> : <>Movies</>}
          </>
        )
      }
    },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={'/movies/'+ params.row._id} state = {params.row} >
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
        rows={movies}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        rowsPerPageOptions={[8]}
        checkboxSelection
        getRowId={row => row._id}
      />
    </div>
  );
}
