import React, { useState, useMemo } from 'react'
import { getCurrentUser, editProfile } from '../../firebase/FireStoreApi';
import "./editProfile.scss"
function EditProfile({ onEdit }) {

  const [editInputs, setEditInputs] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);

  const getInput = (event) => {
    let { name, value } = event.target;
    let input = { [name]: value };
    setEditInputs({ ...editInputs, ...input });
  };


  const updateProfileData = async () => {
    await editProfile(currentUser?.id, editInputs);
    await onEdit();
  };
  return (
    <div className='editPage' >
      <div className='formContainer' >
        <div className="profile_edit_inputs">
          <label>Name</label>
          <input
            onChange={getInput}
            className="common-input"
            placeholder="Name"
            name="name"
            value={editInputs.name}

          />
          <label>Age</label>
          <input
            onChange={getInput}
            className="common-input"
            placeholder="age"
            name="age"
            value={editInputs.age}

          />
          <label>Gender</label>
          <input
            onChange={getInput}
            className="common-input"
            placeholder="Gender"
            name="Gender"
            value={editInputs.gender}

          />
          <label>About</label>
          <textarea
            placeholder="About Me"
            className="common-textArea"
            onChange={getInput}
            rows={5}
            name="aboutMe"
            value={editInputs.about}

          />
        </div>
        <button className="save_btn" onClick={updateProfileData}>
          Save
        </button>
      </div>
   
        <button className='edit_btn' onClick={onEdit} >Go Back</button>
   
    </div>

  )
}

export default EditProfile;