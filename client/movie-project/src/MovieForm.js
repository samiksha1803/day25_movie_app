import { useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function MovieForm(props) {
  const rName = useRef();
  const rYear = useRef();
  const [name, setName] = useState("");
  const [year, setYear] = useState("");

  const hName = (e) => setName(e.target.value);
  const hYear = (e) => setYear(e.target.value);

  const save = (e) => {
    e.preventDefault();
    if (name === "") {
      toast.error("name is empty", { autoClose: 1000 });
      rName.current.focus();
      return;
    }
    if (year === "") {
      toast.error("year is empty", { autoClose: 1000 });
      rYear.current.focus();
      return;
    }

    let data = { name, year };
    let url = "http://localhost:9000/sm";

    axios.post(url, data)
      .then(res => {
        toast.success("saved", { autoClose: 1000 });
        setName("");
        setYear("");
        rName.current.focus();
        props.onAdd();
      })
      .catch(err => toast.error("issue " + err, { autoClose: 1000 }));
  };

  return (
    <>
      <h1>MovieForm</h1>
      <form onSubmit={save}>
        <input type="text" placeholder="enter movie name" ref={rName} onChange={hName} value={name} />
        <input type="number" placeholder="enter movie year" ref={rYear} onChange={hYear} value={year} />
        <input type="submit" />
      </form>
    </>
  );
}
export default MovieForm;
