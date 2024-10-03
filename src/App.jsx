import { useState , useRef } from 'react';
import './App.css'
import Swal from 'sweetalert2';
import { MdOutlineDeleteOutline } from "react-icons/md";

function App() {
  const [toDoItems, setToDoItems] = useState([]);
  let inputRef = useRef(null);

  const addToDoItems = () => {
    let copyToDoItems = [...toDoItems];
    let item = inputRef.current.value.trim();
    let listId = "to-do-item-" + Math.floor(Math.random() * 100);
    if(item){
      copyToDoItems.push({ title: item , id: listId });
      setToDoItems(copyToDoItems);
      inputRef.current.value = '';
      Swal.fire('Success', 'Item added successfully','success');
    }else{
      Swal.fire('Error', 'Please enter a valid to-do item', 'error');
    }
  }

  const markAsDoneToDoList = (id) => {
    let copyToDoItems = [...toDoItems];
    let itemIndex = copyToDoItems.findIndex(item => item.id === id);
    let item = copyToDoItems[itemIndex];
    if(itemIndex > -1){
      item.splice(itemIndex, 1);
    }
    setToDoItems(copyToDoItems);
  }

  const removeItem = (id) => {
    let copyToDoItems = [...toDoItems];
    let filterData = copyToDoItems.filter(item => item.id !== id);
    setToDoItems(filterData);
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
                  <input type="checkbox" onChange={() => markAsDoneToDoList(item.id)}/>
                  <p>{item.title}</p>
                </div>
                <button onClick={()=> removeItem(item.id)}><MdOutlineDeleteOutline /></button>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default App
