import "./Modal.css";

import Login from "../containers/Login";

const ModalLogin = ({
  setModalLogin,
  setModalRegister,
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
              setModalLogin(false);
            }}
          >
            &times;
          </span>
        </div>
        <Login
          setModalLogin={setModalLogin}
          setModalRegister={setModalRegister}
          setUser={setUser}
          setUser_Id={setUser_Id}
          redirectPublish={redirectPublish}
        />
      </div>
    </div>
  );
};

export default ModalLogin;
