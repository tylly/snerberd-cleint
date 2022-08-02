import { useState } from "react";
import { createSnowboard } from "../../api/snowboards";
import { useNavigate } from "react-router-dom";
import { createSnowboardSuccess, createSnowboardFailure } from "../shared/AutoDismissAlert/messages";
import SnowboardForm from "../shared/SnowboardForm";

const CreateSnowboard = (props) => {
  console.log("props", props);
  const { user, msgAlert } = props;
  const navigate = useNavigate()
  const [snowboard, setSnowboard] = useState({
    name: "",
    length: 0,
    channelBindings: false
  });

  console.log("this is Snowboard in create Snowboard", snowboard);

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
      } else if (updatedName === "adoptable" && !e.target.checked) {
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

  //We'll add handle submit here that makes an api request
  //and handles response

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('hit')
    createSnowboard(user, snowboard)
    .then(res => {navigate(`/snowboards/${res.data.snowboard.id}`)})
      .then(() =>
        msgAlert({
          heading: "oh yea!",
          message: createSnowboardSuccess,
          variant: "success",
        })
      )
      .catch(() =>
        msgAlert({
          heading: "oh no!",
          message: createSnowboardFailure,
          variant: "danger",
        })
      );
  };
  return (
    <SnowboardForm
    snowboard={snowboard}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      heading="add a new snowboard"
    />
  );
};

export default CreateSnowboard;
