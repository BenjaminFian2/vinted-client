import "./Publish.css";
import { Redirect, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import checkedInput from "../assets/img/checked.svg";

const Publish = ({ tokenId, editMode, setEditMode }) => {
  const [data, setData] = useState({
    title: "",
    description: "",
    price: null,
    condition: "",
    city: "",
    brand: "",
    size: "",
    color: "",
    picture: null,
  });

  useEffect(() => {
    if (editMode.active) {
      setData({
        title: editMode.offer.product_name,
        description: editMode.offer.product_description,
        price: editMode.offer.product_price,
        condition: editMode.offer.product_details[2].ÉTAT,
        city: editMode.offer.product_details[4].EMPLACEMENT,
        brand: editMode.offer.product_details[0].MARQUE,
        size: editMode.offer.product_details[1].TAILLE,
        color: editMode.offer.product_details[3].COULEUR,
        picture: null,
      });
    }
  }, [editMode]);

  const [errorMessage, setErrormessage] = useState("");
  const [checked, setChecked] = useState(false);

  let history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (editMode.active) {
      try {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("price", data.price);
        formData.append("condition", data.condition);
        formData.append("city", data.city);
        formData.append("brand", data.brand);
        formData.append("size", data.size);
        formData.append("color", data.color);
        if (data.picture) {
          formData.append("picture", data.picture);
        }
        const response = await axios.put(
          `https://benalgo-vinted-server.herokuapp.com/offer/update/${editMode.offer._id}`,
          formData,
          { headers: { authorization: `Bearer ${tokenId}` } }
        );
        console.log(response);
        setEditMode({ active: false, offer: {} });
        history.push(`/offer/${editMode.offer._id}`);
      } catch (error) {
        console.log(error.mesage);
      }
    } else {
      try {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("price", data.price);
        formData.append("condition", data.condition);
        formData.append("city", data.city);
        formData.append("brand", data.brand);
        formData.append("size", data.size);
        formData.append("color", data.color);
        formData.append("picture", data.picture);

        const response = await axios.post(
          `https://benalgo-vinted-server.herokuapp.com/offer/publish`,
          formData,
          { headers: { authorization: `Bearer ${tokenId}` } }
        );
        history.push(`/offer/${response.data._id}`);
      } catch (error) {
        if (error.response.status === 400) {
          setErrormessage("Veuillez renseigner tous les champs");
        }
        if (error.response.status === 401) {
          setErrormessage("Vous n'êtes pas autorisé à publier une annonce.");
        }
        console.log(error.message);
      }
    }
  };

  console.log(data);

  return tokenId ? (
    <div className="Publish">
      <div className="Publish-container">
        {editMode.active ? (
          <h2>Modifie ton annonce</h2>
        ) : (
          <h2>Vends ton article</h2>
        )}
        <form
          className="Publish-form"
          onSubmit={(event) => handleSubmit(event)}
        >
          <div className="Publish-file-box">
            {editMode.offer.product_image ? (
              <div className="Publish-file-withImage">
                <img
                  src={editMode.offer.product_image.secure_url}
                  alt="prévisualisation"
                />
                <div
                  className="Publish-remove-img-button"
                  onClick={() => {
                    const obj = { ...editMode };
                    obj.offer.product_image = null;
                    setEditMode(obj);
                  }}
                >
                  X
                </div>
              </div>
            ) : data.picture ? (
              <div className="Publish-file-withImage">
                <img
                  src={URL.createObjectURL(data.picture)}
                  alt="prévisualisation"
                />
                <div
                  className="Publish-remove-img-button"
                  onClick={() => {
                    const obj = { ...data };
                    obj.picture = null;
                    setData(obj);
                  }}
                >
                  X
                </div>
              </div>
            ) : (
              <div className="Publish-file-without">
                <div className="Publish-file">
                  <label htmlFor="file" className="Publish-file-label">
                    <span className="Publish-file-label-sign">+</span>
                    <span>Ajoute une photo</span>
                  </label>
                  <input
                    id="file"
                    type="file"
                    required
                    className="Publish-file-input"
                    onChange={(event) => {
                      const obj = { ...data };
                      obj.picture = event.target.files[0];
                      setData(obj);
                    }}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="Publish-container-input-text">
            <div className="Publish-input-text">
              <h4>Titre</h4>
              <input
                defaultValue={data.title}
                type="text"
                placeholder="ex: Chemise Sézane verte"
                onChange={(event) => {
                  const obj = { ...data };
                  obj.title = event.target.value;
                  setData(obj);
                }}
              />
            </div>
            <div className="Publish-input-text">
              <h4>Décris ton article</h4>
              <textarea
                defaultValue={data.description}
                name="description"
                id="description"
                rows="5"
                placeholder="ex: porté quelquefois, taille correctement"
                onChange={(event) => {
                  const obj = { ...data };
                  obj.description = event.target.value;
                  setData(obj);
                }}
              ></textarea>
            </div>
          </div>
          <div className="Publish-container-input-text">
            <div className="Publish-input-text">
              <h4>Marque</h4>
              <input
                defaultValue={data.brand}
                type="text"
                placeholder="ex: Zara"
                onChange={(event) => {
                  const obj = { ...data };
                  obj.brand = event.target.value;
                  setData(obj);
                }}
              />
            </div>
            <div className="Publish-input-text">
              <h4>Taille</h4>
              <input
                defaultValue={data.size}
                type="text"
                placeholder="ex: L / 40 / 12"
                onChange={(event) => {
                  const obj = { ...data };
                  obj.size = event.target.value;
                  setData(obj);
                }}
              />
            </div>
            <div className="Publish-input-text">
              <h4>Couleur</h4>
              <input
                defaultValue={data.color}
                type="text"
                placeholder="ex: Fushia"
                onChange={(event) => {
                  const obj = { ...data };
                  obj.color = event.target.value;
                  setData(obj);
                }}
              />
            </div>
            <div className="Publish-input-text">
              <h4>État</h4>
              <input
                defaultValue={data.condition}
                type="text"
                placeholder="ex: Neuf avec étiquette"
                onChange={(event) => {
                  const obj = { ...data };
                  obj.condition = event.target.value;
                  setData(obj);
                }}
              />
            </div>
            <div className="Publish-input-text">
              <h4>Lieu</h4>
              <input
                defaultValue={data.city}
                type="text"
                placeholder="ex: Paris"
                onChange={(event) => {
                  const obj = { ...data };
                  obj.city = event.target.value;
                  setData(obj);
                }}
              />
            </div>
          </div>
          <div className="Publish-container-input-text">
            <div className="Publish-input-text">
              <h4>Prix</h4>
              <div className="Publish-input-checkbox">
                <input
                  defaultValue={data.price}
                  min="1"
                  max="500"
                  type="number"
                  placeholder="0,00 €"
                  onChange={(event) => {
                    const obj = { ...data };
                    obj.price = Number(event.target.value);
                    setData(obj);
                  }}
                />
                <div className="Publish-checkbox">
                  {checked ? (
                    <label htmlFor="exchange" className="checked">
                      <img src={checkedInput} alt="checked" />
                    </label>
                  ) : (
                    <label htmlFor="exchange" className="unChecked"></label>
                  )}

                  <input
                    type="checkbox"
                    value="exchange"
                    id="exchange"
                    onChange={(event) => {
                      if (event.target.checked) {
                        setChecked(true);
                      } else {
                        setChecked(false);
                      }
                    }}
                  />
                  <span>Je suis intéressé(e) par les échanges</span>
                </div>
              </div>
            </div>
          </div>
          <p>{errorMessage}</p>
          <div className="Publish-submit">
            {editMode.active ? (
              <input type="submit" value="Modifier" />
            ) : (
              <input type="submit" />
            )}
          </div>
        </form>
      </div>
    </div>
  ) : (
    <Redirect to="/" />
  );
};

export default Publish;
