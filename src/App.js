import { useEffect, useState } from "react";
import styled from "styled-components";


const HrTest = styled.hr`
  margin-bottom: 10;
`;

const Circle = styled.div`
  width: 100px;
  height: 100px;
  border: 1px solid black;
  border-radius: 50%;
  background-color: #00cdcd;
`;

function App() {
  const [todo, setTodo] = useState('');
  const [id, setId] = useState(1);
  const [todoList, setTodoList] = useState([]);
  const onAdd = () => {
    setTodoList(prev => [
      ...prev,
      {
        id,
        todo 
      }
    ]);
    
    setId(prev => prev + 1);
    setTodo('');
    localStorage.setItem('todoList',todoList);
  };

  const onDelete = (id) => {
    const tempArr = todoList.filter(item => item.id !== id);
    setTodoList(tempArr);
    localStorage.setItem('todoList',todoList);
  };

  const getItem = async() => {
    const item = await localStorage.getItem('todoList');
    return item;
  }

  useEffect(() => {
    setTodoList(getItem());
  }, [])

  return (
    <>
      <div>
        <input name="todo" placeholder="새 할일을 추가헤주세요" value={todo} onChange={(e) => setTodo(e.target.value)} />
        <button onClick={onAdd}>추가</button>
      </div>
      <hr className="mb"/>
      <div className="circle" />
      <ul>
        {todoList.length > 0 && todoList.map((item) => (
          <TodoItem key={item.id} item={item} todoList={todoList} setTodoList={setTodoList} onDelete={(id) => onDelete(id)} />
        ))}
      </ul>
    </>

  );
};

const TodoItem = (props) => {

  const {item, todoList,setTodoList, onDelete} = props;

 
  const [isUpdate, setIsUpdate] = useState(false);
  const [inputUpdate, setInputUpdate] = useState('');

  const onModify = (id) => {
    setTodoList(todoList.map((item) => (
      item.id === id ? {...item, todo: inputUpdate} : item
    )));
    setInputUpdate('');
    setIsUpdate(false);
    localStorage.setItem('todoList',todoList);
  }

  return (
    <li>
      
      {isUpdate ?
        <>
          {item.id} : <input value={inputUpdate} onChange={(e) => setInputUpdate(e.target.value)}  />
          <button onClick={() => onModify(item.id)}>수정완료</button>
          <button onClick={() => setIsUpdate(prev => !prev)}>수정취소</button>
        </>
        :
        <>
        {item.id} : <span style={{marginRight: 10}}>{item.todo}</span>
        <button onClick={() => setIsUpdate(prev => !prev)}>수정</button>
        </>
        
      }
      
      <button onClick={() => onDelete(item.id)}>삭제</button>
    </li>
  )
}



export default App;
