import React, {useState} from "react";
import './Modal.css';

export default function Modal ({visibility, setVisibility}) {

  // useEffect(() => {
  //   const handleWindowClick = () => setVisibility(false);
  //   if(visibility) {
  //     window.addEventListener('click', handleWindowClick);
  //   } else {
  //     window.removeEventListener('click', handleWindowClick);
  //   }
  //   return () => window.removeEventListener('click', handleWindowClick);
  // }, [visibility, setVisibility]);

  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    dob: ""
  });

  const handleWindowClick = (e) => {
    setVisibility(false);   // to close the form when we click outside of the modal form
    setUser({
      username: "",
      email: "",
      phone: "",
      dob: ""
    })
  }

  const handleInputs = (e, inputField) => {
    
    setUser((prev) => ({
      ...prev,
      [inputField]: e.target.value
    }));
  }

  const handleSubmit = (e) => {

    e.preventDefault();

    let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

    if(!user.email.match(emailRegex)) {
      alert("Invalid email. Please check your email address.");
      
    } else if(user.phone.length !== 10) {
      // e.preventDefault();   // this will prevent from submitting the form because that is the default behaviour of onSubmit. Else, when we click the Ok button on alert, it will submit and modal disappears. We can add this at the entry also.
      alert("Invalid phone number. Please enter a 10-digit phone number.");

    } else if(new Date().getTime() <= new Date(user.dob).getTime()) {
      // e.preventDefault();
      alert("Invalid date of birth. Date of birth cannot be in the future.");

    } else {
      setUser({
        username: "",
        email: "",
        phone: "",
        dob: ""
      })
    }
  }

  console.log(user);

  if(!visibility) {
    return null;
  }

  return(
    <div className="modal" onClick={(e) => handleWindowClick(e)}> {/* But onClick to this div is common to all its child. SO, it will close even clicking on modal. Here, event (e) is also essential */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}> {/* So, add this e.stopPropagation() to prevent the above error */}
        <form onSubmit={(e) => handleSubmit(e)}> {/* Here, (e) is essential or else it won't work */}
          <h2>Fill Details</h2>
          <label htmlFor="username">Username:</label><br/>
          <input type="text" id="username" onChange={(e) => handleInputs(e, e.target.id)} value={user.username} required/>
          <br/>
          <label htmlFor="email">Email Address:</label><br/> {/* HTML5's type="email" attribute checks for a standard email format */}
          <input type="text" id="email" onChange={(e) => handleInputs(e, e.target.id)} value={user.email} required/>
          <br/>
          <label htmlFor="phone">Phone Number:</label><br/>
          <input type="text" id="phone" onChange={(e) => handleInputs(e, e.target.id)} value={user.phone} required/>
          <br/>
          <label htmlFor="dob">Date of Birth:</label><br/>
          <input type="date" id="dob" onChange={(e) => handleInputs(e, e.target.id)} value={user.dob} required/>
          <br/>
          <button className="submit-button">Submit</button>
        </form>
      </div>
    </div>
  );
}