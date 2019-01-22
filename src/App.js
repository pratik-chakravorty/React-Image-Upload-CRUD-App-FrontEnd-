import React, { Component } from "react";
import Dataform from "./components/Dataform";
import axios from "axios";
class App extends Component {
  state = {
    datas: [],
    editable: false,
    editData: {},
    editId: ""
  };
  handleSubmit = data => {
    axios
      .post("http://localhost:3000/put", data)
      .then(res => {
        console.log(res.data);
        const newData = res.data;
        this.setState({
          datas: [...this.state.datas, newData]
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  componentDidMount() {
    axios.get("http://localhost:3000/get").then(res => {
      console.log(res.data);
      this.setState({ datas: res.data });
    });
  }
  handleDelete = id => {
    axios
      .delete(`http://localhost:3000/data/${id}`)
      .then(res => {
        const newData = this.state.datas.filter(data => data._id !== id);
        this.setState({
          datas: newData
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  editForm = id => {
    const data = this.state.datas.filter(data => data._id === id);
    console.log(data);
    this.setState({
      editable: true,
      editData: data[0],
      editId: id
    });
  };

  handleUpdate = (id, data) => {
    axios
      .put(`http://localhost:3000/data/${id}`, data)
      .then(res => {
        const updatedData = this.state.datas.map(item => {
          if (item._id === id) {
            item.name = res.data.name;
            item.description = res.data.description;
            item.photo = res.data.photo ? res.data.photo : item.photo;
          }
          return data;
        });
        this.setState({
          datas: updatedData,
          editable: false,
          editId: "",
          editData: ""
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    return (
      <div className="App">
        <h1>Data</h1>
        <Dataform
          handleSubmit={this.handleSubmit}
          edit={this.state.editable}
          datas={this.state.editData}
          id={this.state.editId}
          handleUpdate={this.handleUpdate}
        />
        <ul className="items">
          {this.state.datas.map(data => {
            return (
              <div key={data._id}>
                <h2>{data.name}</h2>
                <p>{data.description}</p>
                <img
                  src={`http://localhost:3000/controllers/uploads/${
                    data.photo
                  }`}
                />
                <button onClick={this.handleDelete.bind(this, data._id)}>
                  X
                </button>
                <button onClick={this.editForm.bind(this, data._id)}>
                  Edit
                </button>
              </div>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default App;
