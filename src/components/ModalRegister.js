import "./Modal.css";

import Signup from "../containers/Signup";

const ModalRegister = ({
  setModalRegister,
  setModalLogin,
  setUser,
  setUser_Id,
  redirectPublish,
}) => {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="boxClose-btn">
          <span
            className="close-btn"
            onClick={() => {
              setModalRegister(false);
            }}
          >
            &times;
          </span>
        </div>
        <Signup
          setModalRegister={setModalRegister}
          setModalLogin={setModalLogin}
          setUser={setUser}
          setUser_Id={setUser_Id}
          redirectPublish={redirectPublish}
        />
      </div>
    </div>
  );
};

export default ModalRegister;
