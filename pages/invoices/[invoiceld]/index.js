import React from "react";
import { useRouter } from "next/router";

const InvoiceDetails = () => {
  const router = useRouter();

  const goBack = () => router.push("/");

  return (
    <div className="main__container">
      <div className="back__btn">
        <h6 onClick={goBack}>Retour</h6>
      </div>

      {/*===== invoice details header =====*/}
      <div className="invoice__details-header">
        <div className="details__status">
          <p>Status</p>

          <button className="pending__status">En attente</button>
        </div>

        <div className="details__btns">
          <button className="edit__btn">Modifier</button>

          <button className="delete__btn">Supprimer</button>

          <button className="mark__as-btn">Marquer Comme Payé</button>
        </div>
      </div>

      {/* invoice details*/}
      <div className="invoice__details">
        <div className="details__box">
          <div>
            <h4>RT580G</h4>
            <p>Re-branding</p>
          </div>
          <div>
            <p>Block - B, Road - 41</p>
            <p>Sylhet</p>
            <p>SYL 3108</p>
            <p>Bangladesh</p>
          </div>
        </div>

        {/* details box 2 */}
        <div className="details__box">
          <div>
            <div className="invoice__created__date">
              <p>Date de Facture</p>
              <h4>17-11-2022</h4>
            </div>
            <div>
              <p className="invoice__payment">Paiement Dû</p>
              <h4>17-11-2022</h4>
            </div>
          </div>

          {/* invoice client adress */}
          <div className="invoice__client-address">
            <p>Bill to </p>
            <h4>Vincent Durret</h4>
            <div>
              <p>Block - B, Road - 41</p>
              <p>Sylhet</p>
              <p>SYL 3108</p>
              <p>Bangladesh</p>
            </div>
          </div>
          <div>
            <p>Send to</p>
            <h4>dev.gmail.com</h4>
          </div>
        </div>

        {/* invoice items */}
        <div className="invoice__item-box">
          <ul className="list">
            <li className="list__item">
              <p className="item__name-box">Item Name</p>
              <p className="list__item-box">Qté</p>
              <p className="list__item-box">Prix</p>
              <p className="list__item-box">Total</p>
            </li>

            {/* invoice item */}
            <li className="list__item">
              <div className="item__name-box">
                <h5>Ecommerce Website</h5>
              </div>

              <div className="list__item-box">
                <p>2</p>
              </div>
              <div className="list__item-box">
                <p>$225</p>
              </div>
              <div className="list__item-box">
                <h5>$450</h5>
              </div>
            </li>
          </ul>
        </div>
        {/*  grand total  */}
        <div className="grand__total">
            <h5>Total</h5>
            <h2>450$</h2>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;
