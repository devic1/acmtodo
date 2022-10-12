import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";

function Todo() {
  const [data, setdata] = useState(() => {
    if (!localStorage.getItem("id")) {
      localStorage.setItem("id", 1);
    }

    if (localStorage.getItem("todos")) {
      return JSON.parse(localStorage.getItem("todos"));
    } else {
      return [];
    }
  });
  const [edit, setedit] = useState({
    edittext: "",
    editid: 0,
    editstatuts: false,
  });
  const [completed, setcompleted] = useState(() => {
    if (localStorage.getItem("completed")) {
      return JSON.parse(localStorage.getItem("completed"));
    } else {
      return [];
    }
  });
  const [inp, setinp] = useState("");
  function UpdateValue(event) {
    setinp(event.target.value);
  }

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(data));
  }, [data]);
  useEffect(() => {
    localStorage.setItem("completed", JSON.stringify(completed));
  }, [completed]);

  function Entered(event) {
    event.preventDefault();
    setdata([
      ...data,
      [parseInt(JSON.parse(localStorage.getItem("id"))) + 1, inp],
    ]);
    localStorage.setItem("id", parseInt(localStorage.getItem("id")) + 1);
    setinp("");
    if (edit.editstatuts == true) {
      Deletetodo([edit.editid, edit.edittext]);
      setedit({ editid: 0, edittext: "", editstatuts: false });
    }
  }

  function Deletetodo(props) {
    var arr = [];
    for (let index = 0; index < data.length; index++) {
      if (props[0] !== data[index][0]) {
        arr.push([data[index][0], data[index][1]]);
      }
    }
    setdata(arr);
  }
  function Deletecompleted(props) {
    var yar = [];
    for (let index = 0; index < completed.length; index++) {
      if (props[0] !== completed[index][0]) {
        yar.push([completed[index][0], completed[index][1]]);
      }
    }
    setcompleted(yar);
  }
  function Editit(props) {
    console.log(props);
    setedit({ edittext: props[1], editid: props[0], editstatuts: true });
    setinp(props[1]);
  }
  function Comp(props) {
    setcompleted([...completed, [props[0], props[1]]]);
    Deletetodo(props);
  }
  console.log(localStorage.getItem("id"));
  return (
    <div>
      <div className="topbar">Todo ☑</div>
      <div className="input">
        <form>
          <input
            className="inp"
            type={"text"}
            name="todo"
            onChange={UpdateValue}
            value={inp}
          />
          <button
            className="add"
            disabled={!inp}
            type={"submit"}
            onClick={Entered}
          >
            Add
          </button>
        </form>
      </div>
      <div className="todo">
        <div>
          <div className="tit">
            <h3>Todo</h3>
          </div>

          <ol>
            {data.map((ele) => (
              <div className="ok" key={ele[0]}>
                <li>
                  <div className="listext">{ele[1]}</div>
                </li>
                <div className="tk">
                  <input
                    className="ch"
                    type={"checkbox"}
                    onChange={() => Comp(ele)}
                  ></input>
                  <button type={"button"} onClick={() => Editit(ele)}>
                    Edit
                  </button>

                  <button type={"button"} onClick={() => Deletetodo(ele)}>
                    <MdDelete />
                  </button>
                </div>
              </div>
            ))}
          </ol>
        </div>
      </div>

      <div className="Completedtasks">
        <h3>Completed</h3>
        <ol>
          {completed.map((el) => (
            <div className="ok" key={el[0]}>
              <li>
                <div className="listext">{el[1]}</div>
              </li>
              <div className="tig">
                <button type={"button"} onClick={() => Deletecompleted(el)}>
                  <MdDelete />
                </button>
              </div>
            </div>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default Todo;
