import './App.css';
import Test from './Test';
import axios from 'axios';
import { useState } from 'react';
function App() {
  const [data1, setdata1] = useState([]);
  //   console.log(name);
  //    const submit =()=>{
  //    const attendance = '[{"Make":"0","Model":"0","Year":"0","Color":"0"},{"Make":"1","Model":"1","Year":"1","Color":"1"}]';

  //   axios.post('http://localhost:4000/create',
  //   {

  //     attendance:attendance,
  //     course_name:name



  //   }).then((res)=>{
  //     console.log(res);
  //   }).catch((err)=>console.log(err));
  //  }
  const GetStudentList = () => {
    axios.get('http://localhost:4000/getList').then((response) => {
      //setstudentList(response.data);
      
      const res = response.data;
      setdata1(response.data);
      console.log(res);;

    }).catch((err) => console.log(err));
  }
  return (
    <div className="App">
      <Test />
      {/* <button onClick={submit}>submit</button>
      <input type="text"  name="Color" value={name} onChange={(e)=>setName(e.target.value)} className="color" placeholder="Class name" /><br/>
       */}

      {/* <button onClick={GetStudentList}>submit</button>
      {data1.map((e) => (
        <div>
          <h1>{e.id}</h1>
          {(JSON.parse(e.attendance)).map((f,i)=>(
           <div>
              <h1>num  name {i} to {f.Make}</h1>
               <h1>num  email {i} to {f.Model}</h1>
               <h1>num  prseent {i} to {f.Year}</h1>

               <h1>num  absent {i} to {f.Color}</h1>


           </div>
          ))}
        </div>
      ))} */}

    </div>

  );
}

export default App;
