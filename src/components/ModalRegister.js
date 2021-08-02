import "./Modal.css";

import Signup from "../containers/Signup";

const ModalRegister = ({
  setModalRegister,
  setModalLogin,
  setUser,
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
          redirectPublish={redirectPublish}
        />
      </div>
    </div>
  );
};

export default ModalRegister;
