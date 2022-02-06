import "./movieList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { getMovie, deleteMovie } from "../../context/movieContext/apiCalls";

export default function MovieList() {
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
    { field: "_id", headerName: "ID", width: 210 },
    {
      field: "movie",
      headerName: "Movie",
      width: 190,
      renderCell: (params) => {
        return (
          <div className="movieListItem">
            <img className="movieListImg" src={params.row.imageSm ? params.row.imageSm : "https://media.istockphoto.com/vectors/error-page-or-file-not-found-icon-vector-id924949200?k=20&m=924949200&s=170667a&w=0&h=-g01ME1udkojlHCZeoa1UnMkWZZppdIFHEKk6wMvxrs="} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    {
      field: "genre", headerName: "Genre", width: 140,
      renderCell: (params) => {
        return (
          <>
            {params.row.genre && capatilizeFirst(params.row.genre)}
          </>
        )
      }
    },
    { field: "year", headerName: "Year", width: 110 },
    { field: "limit", headerName: "Limit", width: 110 },
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
            <Link to={'/movies/' + params.row._id} state={params.row} >
              <button className="movieListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="movieListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="movieList">
      <DataGrid
        rows={movies}
        disableSelectionOnClick
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        getRowId={row => row._id}
      />
      <Link to="/newMovie">
        <button className="movieAddButtonRight">Create</button>
      </Link>
    </div>
  );
}
