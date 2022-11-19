import React, { useState, useRef } from "react";
import { useRouter } from "next/router";

const EditItem = () => {
  const router = useRouter();
  const [items, setItems] = useState([]);

  // add products items

  const addItem = () => {
    setItems([...items, { name: "", quantity: 0, price: 0, total: 0 }]);
  };

  // handler change

  const handlerChange = (event, i) => {
    const { name, value } = event.target;
    const list = [...items];
    list[i][name] = value;
    list[i]["total"] = list[i]["quantity"] * list[i]["price"];
    setItems(list);
  };

  // delete products

  const deleteItem = (i) => {
    const inputData = [...items];
    inputData.splice(i, 1);
    setItems(inputData);
  };

  return (
    <div className="main__container">
      <div className="new__invoice">
        <div className="new__invoice-header">
          <h3>Modifier #RT5840</h3>
        </div>
        {/* new invoice body */}

        <div className="new__invoice-body">
          {/* bill from */}
          <div className="bill__from">
            <p className="bill__title">Facture de</p>
            <div className="form__group">
              <p>Adresse</p>
              <input type="text" />
            </div>

            <div className="form__group inline__form-group">
              <div>
                <p>Ville</p>
                <input type="text" />
              </div>

              <div>
                <p>Code Postal</p>
                <input type="text" />
              </div>

              <div>
                <p>Pays</p>
                <input type="text" />
              </div>
            </div>
          </div>

          {/* Bill to */}

          <div className="bill__to">
            <p className="bill__title">Facture pour</p>
            <div className="form__group">
              <p>Nom du client</p>
              <input type="text" />
            </div>

            <div className="form__group">
              <p>Client Email</p>
              <input type="email" />
            </div>

            <div className="form__group">
              <p>Adresse</p>
              <input type="text" />
            </div>

            <div className="form__group inline__form-group">
              <div>
                <p>Ville</p>
                <input type="text" />
              </div>

              <div>
                <p>Code Postal</p>
                <input type="text" />
              </div>

              <div>
                <p>Pays</p>
                <input type="text" />
              </div>
            </div>

            <div className="form__group inline__form-group">
              <div className="inline__group">
                <p>Date de Facture</p>
                <input type="date" />
              </div>

              <div className="inline__group">
                <p>Modalités de Paiement</p>
                <input type="text" />
              </div>
            </div>

            <div className="form__group">
              <p>Description</p>
              <input type="text" />
            </div>
          </div>
          {/* invoice product items */}

          <div className="invoice__items">
            <h3>Liste Item</h3>

            {items?.map((item, i) => (
              <div className="item" key={i}>
                <div className="form__group inline__form-group">
                  <div>
                    <p>Nom Item</p>
                    <input
                      type="text"
                      name="name"
                      onChange={(e) => handlerChange(e, i)}
                    />
                  </div>

                  <div>
                    <p>Qte</p>
                    <input
                      type="number"
                      name="quantity"
                      onChange={(e) => handlerChange(e, i)}
                    />
                  </div>

                  <div>
                    <p>Prix</p>
                    <input
                      type="number"
                      name="price"
                      onChange={(e) => handlerChange(e, i)}
                    />
                  </div>

                  <div>
                    <p>Total</p>
                    <h4>{item.total}</h4>
                  </div>

                  <button className="edit__btn" onClick={() => deleteItem(i)}>
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button className="add__item-btn" onClick={addItem}>
            Ajouter un Item
          </button>

          <div className="new__invoice__btns" style={{justifyContent:'end'}}>

            <div>
              <button className="draft__btn" onClick={`/invoices/id`}>
                Annuler
              </button>

              <button className="mark__as-btn">Sauvegarder </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditItem;
