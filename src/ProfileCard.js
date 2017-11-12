import React, { Component, PropTypes } from 'react';
import FileInput from 'react-file-input';
import { storage, database } from './firebase';
import './ProfileCard.css';

class ProfileCard extends Component {
  constructor(props) {
    super(props);

    this.storageRef = storage.ref('/userimages');
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const file = event.target.files[0];
    const uploadTask = this.storageRef.child(this.props.uid).child(file.name)
                                      .put(file, { contentType: file.type});
    uploadTask.then((snapshot)=> {
      console.log('snapshot =' + snapshot);
      console.log('usersRef =' + this.props.usersRef.child(this.props.uid).child('photoURL'));
      this.props.usersRef.child(this.props.uid).update( {altphotoURL: snapshot.downloadURL});
      console.log(snapshot.downloadURL);
    });

    console.log('file = '+ file);
  }

  render() {
    const { displayName, photoURL, altphotoURL } = this.props.user;
    return (
      <article className="ProfileCard">
        <img
          className="ProfileCard--photo"
          src= { altphotoURL? altphotoURL:photoURL }
        />
        <h3> {displayName} </h3>
        <FileInput
          accept=".png,.gif,.jpg"
          placeholder="Select an image"
          onChange={this.handleSubmit}
        />
      </article>
    );
  }
}

ProfileCard.propTypes = {
  displayName: PropTypes.string,
  email: PropTypes.string,
  imageName: PropTypes.string,
  imageURL: PropTypes.string,
  photoURL: PropTypes.string,
  uid: PropTypes.string
};

export default ProfileCard;
