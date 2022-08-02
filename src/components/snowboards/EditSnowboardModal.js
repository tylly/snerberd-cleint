import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import SnowboardForm from '../shared/SnowboardForm';
import { updateSnowboardSuccess, updateSnowboardFailure } from '../shared/AutoDismissAlert/messages';

export default function EditSnowboardModal(props) {
    const { user, show, handleClose, updateSnowboard, msgAlert, triggerRefresh } = props

    const [snowboard, setSnowboard] = useState(props.snowboard)
    
    console.log(snowboard)
    
    const handleChange = (e) => {
        setSnowboard((prevSnowboard) => {
          let updatedValue = e.target.value;
          const updatedName = e.target.name;
          console.log(e.target.type);
          if (e.target.type === "number") {
            //this looks at input type and changes it from default (which is string)
            //into an actual number
            updatedValue = parseInt(e.target.value);
          }
    
          if (updatedName === "channelBindings" && e.target.checked) {
            updatedValue = true;
          } else if (updatedName === "channelBindings" && !e.target.checked) {
            updatedValue = false;
          }
          const updatedSnowboard = {
            [updatedName]: updatedValue,
          };
          return {
            ...prevSnowboard,
            ...updatedSnowboard,
          };
        });
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        updateSnowboard(user, snowboard)
        .then(() => handleClose())
          .then(() =>
            msgAlert({
              heading: "oh yea!",
              message: updateSnowboardSuccess,
              variant: "success",
            })
          )
          //this is that set update fucntion in showpet component
          //update is in the showpets useffects dependency array
          //changes to the updated boolean cuase showPets useEffect to run again
          .then(() => triggerRefresh())
          .catch(() =>
            msgAlert({
              heading: "oh no!",
              message: updateSnowboardFailure,
              variant: "danger",
            })
          );
      };



  return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton />
        <Modal.Body>
            <SnowboardForm 
            snowboard={snowboard}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            heading="Update pet"
            />
        </Modal.Body>
    </Modal>
  )
}
