import React, { Component } from "react";

class Dataform extends Component {
  state = {
    name: "",
    description: "",
    photo: ""
  };
  getData = e => {
    e.preventDefault();
    const name = this.state.name;
    const description = this.state.description;
    const photo = this.state.photo;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("photo", photo);
    this.props.handleSubmit(formData);
    this.fileInput.value = null;
    this.setState({
      name: "",
      description: "",
      photo: ""
    });
  };
  handleEdit = e => {
    e.preventDefault();
    const { name, description, photo } = this.state;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("photo", photo);
    this.setState({
      name: "",
      description: "",
      photo: ""
    });
    this.props.handleUpdate(this.props.id, formData);
    this.fileInput.value = null;
  };
  componentWillReceiveProps(nextProps) {
    this.setState({
      name: nextProps.datas.name,
      description: nextProps.datas.description
    });
  }
  handleChange = e => {
    switch (e.target.name) {
      case "photo":
        this.setState({ photo: e.target.files[0] });
        break;
      default:
        this.setState({
          [e.target.name]: e.target.value
        });
    }
  };
  render() {
    console.log(this.state);
    return (
      <div>
        <form
          encType="multipart/form-data"
          onSubmit={this.props.edit ? this.handleEdit : this.getData}
        >
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={this.state.name || ""}
            onChange={this.handleChange}
          />
          <br />
          <br />
          <textarea
            name="description"
            value={this.state.description || ""}
            placeholder="Enter Message"
            onChange={this.handleChange}
          />
          <br />
          <br />
          <input
            type="file"
            name="photo"
            onChange={this.handleChange}
            ref={input => (this.fileInput = input)}
          />
          <br />
          <br />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default Dataform;
