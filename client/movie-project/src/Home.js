import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import MovieForm from "./MovieForm";
import MovieList from "./MovieList";

function Home() {
  const [info, setInfo] = useState([]);

  const fetchMovies = () => {
    let url = "http://localhost:9000/gm";
    axios.get(url)
      .then(res => {
        console.log("Fetched data from /gm:", res.data);  // ✅ DEBUG line added
        setInfo(res.data);
      })
      .catch(err => toast.error("issue " + err, { autoClose: 1000 }));
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <>
      <ToastContainer />
      <h1>Movies to be Watched</h1>
      <MovieForm onAdd={fetchMovies} />
      <br />
      <MovieList info={info} onDelete={fetchMovies} onUpdate={fetchMovies} />
    </>
  );
}
export default Home;
