import "./Modal.css";

import Login from "../containers/Login";

const ModalLogin = ({ setModalLogin, setModalRegister, setUser }) => {
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
        />
      </div>
    </div>
  );
};

export default ModalLogin;
