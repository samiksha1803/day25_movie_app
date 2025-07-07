import axios from "axios";

function MovieList(props) {
  const delMovie = (id) => {
    let url = "http://localhost:9000/dm";
    let d = { data: { "id": id } };
    axios.delete(url, d)
      .then(res => props.onDelete())
      .catch(err => console.log("err" + err));
  };

	const updateMovie=(id)=>{
		let url="http://localhost:9000/um";
		let data={id};
		axios.put(url,data)
		.then(res=>{
			props.onUpdate();
		})
		.catch(err =>{
			console.log("err" +err);
		});
	
	}
  return (
    <>
      <h1>Movie List</h1>
      <table border="5">
	<thead>
        <tr>
          <th>Name</th>
          <th>Year</th>
          <th>Did u See</th>
          <th>Watched</th>
          <th>Delete</th>
        </tr>
	</thead>
	<tbody>
{
  Array.isArray(props.info) &&
  props.info.map((e) => (
    <tr key={e._id}>
      <td>{e.name}</td>
      <td>{e.year}</td>
      <td>{e.watched === false ? "❌" : "✅"}</td>
      <td><button onClick={() => updateMovie(e._id)}>Watched</button></td>
      <td><button onClick={() => {
        if (window.confirm('r u sure ???')) delMovie(e._id);
      }}>Delete</button></td>
    </tr>
  ))
}
	</tbody>
      </table>
    </>
  );
}
export default MovieList;
