import React from 'react';
import ReactDOM from 'react-dom';
import LocalApi from '../api/localApi';

class ImageUpload extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = { locations: [], selectedLocationId: undefined, message: "" };
  }

  async componentDidMount() {
    const locations = await LocalApi.getLocations();
    let defaultLocationId = undefined;
    locations.forEach((location) => {
        // Default to the latest location with an uploaded photo
        // That makes it easy to keep uploading photos to the same location or to move onto the next
        if (location.photosExist) {
            defaultLocationId = location.id;
        }
    });

    this.setState({ locations, selectedLocationId: defaultLocationId });
  }

  setMessage(message) {
    this.setState({ locations: this.state.locations, selectedLocationId: this.state.selectedLocationId, message });
  }

  async submitForm() {
      console.log("Hello?");
    this.setMessage("Uploading photo...");
    const formData = new FormData(ReactDOM.findDOMNode(this.refs.uploadForm));
console.log(formData);
    try {
      await LocalApi.uploadPhoto(formData);
      this.setMessage("Upload complete!");
      ReactDOM.findDOMNode(this.refs.captionInput).value = "";
      ReactDOM.findDOMNode(this.refs.descriptionInput).value = "";
      ReactDOM.findDOMNode(this.refs.fileInput).value = "";
    }
    catch (err) {
        console.log(err);
      this.setMessage("Upload failed!");
    }

    return false;
  }

  changeLocation() {
    let newLocationId = ReactDOM.findDOMNode(this.refs.locationSelection).value;
    this.setState({ locations: this.state.locations, selectedLocationId: newLocationId });
  }

  render() {
    let locationOptions = [];
    this.state.locations.forEach((location) => {
        locationOptions.push(<option key={location.id} value={location.id}>{location.name}</option>);
    });

    return (
      <div className="imageUpload">
        <form ref="uploadForm">
          <table>
            <tbody>
              <tr><td>Admin password:</td><td><input ref="password" name="uploadpwd" type="password" /></td></tr>
              <tr><td>Select an image to upload:</td><td><input ref="fileInput" type="file" name="image" /></td></tr>
              <tr><td>Caption:</td><td><input ref="captionInput" name="caption" /></td></tr>
              <tr><td>Description:</td><td><input ref="descriptionInput" name="description" /></td></tr>
              <tr><td>Location:</td><td><select ref="locationSelection" name="locationId" value={this.state.selectedLocationId} onChange={this.changeLocation.bind(this)}>{locationOptions}</select></td></tr>
              <tr><td colSpan="2"><button type="button" onClick={this.submitForm.bind(this)}>Upload Image</button></td></tr>
            </tbody>
          </table>
        </form>
        <br />
        <span>{this.state.message}</span>
      </div>
    );
  }
}

export default ImageUpload;
