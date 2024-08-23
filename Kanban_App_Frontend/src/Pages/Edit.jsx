import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Edit = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { id } = useParams();
  const [note, setNote] = useState({
    title: "",
    status: "",
    description: "",
  });

  async function getNoteData() {
    const token = localStorage.getItem("token");
    try {
      setLoading(true)
      let res = await axios({
        method: "get",
        url: `https://kanban-app-hr2u.onrender.com/note/id?_id=${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNote(res.data.searchNote[0]);
      setLoading(false);
      
    } catch (error) {
      setLoading(false)
      setError(true)
      alert(`Error occured while fetching note ${error}`);
    }
  }

  async function updateNote(event){
    event.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const res = await axios({
        method: "patch",
        url: `https://kanban-app-hr2u.onrender.com/note/update/${id}`,
        data: note,
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      alert(`Note Updated Successfully`)
    } catch (error) {
      alert(`Error occured while updating note`)
    }

  }

  function handleChange(event){
    const {name, value} = event.target;
    setNote({...note, [name]: value})
  }

  useEffect(() => {
    getNoteData();
  }, []);

  if(loading){
    return <h1>Loading...</h1>
  }
  
  
  if(error){
    return <h1>Error...</h1>
  }

  return (
    <div>
      <h1>Note Edit Form {id}</h1>

      <div>
        <form onSubmit={updateNote} id="registerForm">
          <h1>Create Notes Form</h1>
          <div className="registerFormInput">
            <label htmlFor="">Title</label>
            <br />
            <input
              type="text"
              placeholder="Enter Title"
              name="title"
              value={note.title}
                onChange={handleChange}
            />
          </div>

          <div className="registerFormInput">
            <label htmlFor="">Status</label>
            <br />
            <input
              type="text"
              placeholder="Enter Status"
              name="status"
              value={note.status}
                onChange={handleChange}
            />
          </div>

          <div className="registerFormInput">
            <label htmlFor="">Description</label>
            <br />
            <input
              type="text"
              placeholder="Enter Status"
              name="description"
              value={note.description}
                onChange={handleChange}
            />
          </div>

          <input type="submit" value="Edit Notes" />
        </form>
      </div>
    </div>
  );
};

export default Edit;
