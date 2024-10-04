import { useState, useRef } from 'react';
import './App.css'
import Swal from 'sweetalert2';
import { MdOutlineDeleteOutline } from "react-icons/md";

function App() {
  const [toDoItems, setToDoItems] = useState(JSON.parse(localStorage.getItem('toDoItems'))||[]);
  let inputRef = useRef(null);

  const addToDoItems = () => {
    let copyToDoItems = [...toDoItems];
    let item = inputRef.current.value.trim();
    let listId = "to-do-item-" + Math.floor(Math.random() * 100);
    if (item) {
      copyToDoItems.push({ title: item, id: listId, flag: false });
      localStorage.setItem("toDoItems", JSON.stringify(copyToDoItems));
      setToDoItems(copyToDoItems);
      inputRef.current.value = '';
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Please enter your work",
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  const markAsDoneToDoList = (e, id) => {
    if (e.target.checked) {
      let copyToDoItems = [...toDoItems];
      copyToDoItems.forEach(item => {
        if (item.id === id) {
          item.flag = true;
        }
      });
      setToDoItems(copyToDoItems);
    } else {
      let copyToDoItems = [...toDoItems];
      copyToDoItems.forEach(item => {
        if (item.id === id) {
          item.flag = false;
        }
      });
      setToDoItems(copyToDoItems);
    }

  }

  const removeItem = (id) => {
    let copyToDoItems = [...toDoItems];
    let filterData = copyToDoItems.filter(item => item.id !== id);
    setToDoItems(filterData);
    localStorage.setItem("toDoItems", JSON.stringify(filterData));
  }
  

  return (
    <>
      <div className="container">
        <h1>grocery bud</h1>
        <div className="input-field">
          <input type="text" placeholder='Add your ToDo list here..' ref={inputRef} />
          <button onClick={addToDoItems}>Add Item</button>
        </div>

        <div className="list-container">
          {
            toDoItems.map((item, index) => (
              <div key={item.id} className="list-item">
                <div className="box">
                  <input type="checkbox" id={`checkbox-${item.id}`} onChange={(e) => markAsDoneToDoList(e, item.id)} />
                  <label style={item.flag ? { textDecoration: 'line-through' } : {}} htmlFor={`checkbox-${item.id}`} className="todo-text" >{item.title}</label>
                </div>
                <button onClick={() => removeItem(item.id)}><MdOutlineDeleteOutline className='icon' /></button>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default App
