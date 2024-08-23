import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const Notes = () => {
  const {Logout} = useContext(AuthContext)
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [create,setCreate] = useState({
    title:"",
    status: "pending",
    description: ""
  })

  async function fetchNotes() {
    const token = localStorage.getItem("token");

    try {
      const res = await axios({
        method: "get",
        url: "https://kanban-app-hr2u.onrender.com/note",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(res.data.notes);
      console.log(res.data.notes);
    } catch (error) {
      console.log(`Error occured while getting data`);
    }
  }

  async function handleDelete(id) {
    const token = localStorage.getItem("token");
    try {
      let deleteTask = await axios({
        method: "delete",
        url: `https://kanban-app-hr2u.onrender.com/note/delete/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchNotes();
    } catch (error) {
      alert(`Unable to delete note ${error}`);
    }
  }

  function handleEdit(id){
    navigate(`/note/edit/${id}`)
  }

  function handleLogout(){
    Logout()
    navigate("/login")
  }

  function handleChange(event){
    const {name, value} = event.target;
    setCreate({...create, [name]:value})
  }

  async function handleCreate(event){
    event.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await axios({
        method: "post",
        url: "https://kanban-app-hr2u.onrender.com/note/create",
        data: create,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setCreate({title: "", status: "", description: ""})
      fetchNotes()
      
    } catch (error) {
      alert(`Error occured ${error}`)
    }
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <div>
      <form onSubmit={handleCreate} id="registerForm">
        <h1>Create Notes Form</h1>
        <div className="registerFormInput">
          <label htmlFor="">Title</label>
          <br />
          <input
            type="text"
            placeholder="Enter Title"
            name="title"
            value={create.title}
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
            value={create.status}
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
            value={create.description}
            onChange={handleChange}
          />
        </div>

        <input type="submit" value="Create Notes" />
      </form>
      </div>
      
      <div>
       <h1>List of notes</h1>
      <div>
        {data.map((note) => (
          <ul key={note._id}>
            <li>Title: {note.title}</li>
            <li>Status: {note.status}</li>
            <li>Description: {note.description}</li>
            <button onClick={() => handleDelete(note._id)}>🗑️</button>
            <button id="edit" onClick={()=> handleEdit(note._id)}>📝</button>
          </ul>
        ))}
      </div> 
      </div>
      
    </div>
  );
};

export default Notes;
