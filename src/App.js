import './App.css';
import Test from './Test';
import axios from 'axios';
import { useEffect, useState } from 'react';
function App() {
  const [data1, setdata1] = useState([]);
  const [counter, setCounter] = useState("");
  const [name, setName] = useState([]);
  const [name1, setName1] = useState([]);
  
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
      console.log(response.data);
      const id = "1";
      // console.log(data1);
      let makeData = [];
      let modelData = [];

      for (let i = 0; i < res.length; i++) {
        var data2 = JSON.parse(res[i].attendance);
        for (let j = 0; j < data2.length; j++) {
          //console.log(data2[j].makeData);
          makeData.push(data2[j].Make);
          modelData.push(data2[j].Model);

        }
      }

      // prevent duplicate array's element
      // setName((Array.from(new Set(makeData))));
      // setName1((Array.from(new Set(modelData))));
      setName1(modelData);
      setName(makeData);

      const make1Count = (response.data).reduce(
        (total, current) => total + (JSON.parse(current.attendance)).some((el) => (

          el.Make === id

        )),
        0
      );
      //console.log(make1Count);
      setCounter(make1Count);
      //   var count = (response.data).reduce((acc, cur) => cur.id === id ? ++acc : acc, 0);
      //   console.log(count);


    }).catch((err) => console.log(err));
  }


  return (
    <div className="App">
      {/* <Test /> */}
      {/* <button onClick={submit}>submit</button>
      <input type="text"  name="Color" value={name} onChange={(e)=>setName(e.target.value)} className="color" placeholder="Class name" /><br/>
       */}

      
      <button onClick={GetStudentList}>submit</button>


      {/* Count a key when equal to make and present key thake */}
      {name.map(e => (
        <div>
          <h1>name {e} is -- </h1>
          <h1>{data1.reduce(
            (total, current) => total + (JSON.parse(current.attendance)).some((el) => el.Make === e && el.Present === "present"),
            0
          )}</h1>
        </div>
      ))}


      {/* Find make and model value from db then show them. */}
      <table>
        <thead>
          <tr>
            <td>make</td>
            <td>model</td>
          </tr>
        </thead>
        <tbody>
          {name.map((e, i) =>
            <tr style={{ border: '2px solid red', background: 'red' }} >
               <td>
                {name[i]}
              </td>
              <td>
                {name1[i]}
              </td>
           </tr>
          )}
        </tbody>
      </table>


      {/* <h1>{counter}</h1> */}


      {/* Retrieve  nested array of objects and access all the keys   */}
      {data1.map((e, i) => (
        <div>
          <h1 key={i}>{e.id}</h1>
          {/* <p>{ statusCounter(e.attendance) }</p> */}
          {(JSON.parse(e.attendance)).map((f, i) => (
            <div key={i}>


              <h1>num  name {i} to {f.Make}</h1><br></br>
              {/* <h1>num  email {i} to {f.Model}</h1><br></br>
               <h1>num of present {i} to {f.Present}</h1><br></br>

               <h1>num of  absent {i} to {f.Absent}</h1><br></br> */}


            </div>
          ))}
        </div>
      ))}

    </div>

  );
}

export default App;
