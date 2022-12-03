import React, { useRef } from "react";
import { useRouter } from "next/router";
import { MongoClient, ObjectId } from "mongodb";
import { toast } from "react-toastify";

const InvoiceDetails = (props) => {
  const router = useRouter();
  const { data } = props;
  const modalRef = useRef(null);

  const goBack = () => router.push("/");

  // update invoice status in db

  const updateStatus = async (invoiceId) => {
    const res = await fetch(`/api/invoices/${invoiceId}`, {
      method: "PUT",
    });
    const data = await res.json();
  };

  // open modal

  const modalToggle = () => modalRef.current.classList.toggle("showModal");

  // delete invoice

  const deleteInvoice = async (invoiceId) => {
    try {
      const res = await fetch(`/api/invoices/${invoiceId}`, {
        method: "DELETE",
      });

      const data = await res.json()
      toast.success(data.message)
      router.push('/')


    } catch (error) {

      toast.error('Une erreur est survenue !')

    }
  };

  return (
    <div className="main__container">
      <div className="back__btn">
        <h6 onClick={goBack}>Retour</h6>
      </div>

      {/*===== invoice details header =====*/}
      <div className="invoice__details-header">
        <div className="details__status">
          <p>Status</p>

          <button
            className={`${
              data.status === "Payé"
                ? "paid__status"
                : data.status === "En attente"
                ? "pending__status"
                : "draft__status"
            }`}
          >
            {data.status}
          </button>
        </div>

        <div className="details__btns">
          <button
            className="edit__btn"
            onClick={() => router.push(`/edit/${data.id}`)}
          >
            Modifier
          </button>

          {/* deletion modal start  */}

          <div className="delete__modal" ref={modalRef}>
            <div className="modal">
              <h3>Suppression</h3>
              <p>
                Ete vous sur de vouloir supprimer la facture #
                {data.id.substr(0, 6).toUpperCase()}?
              </p>

              <div className="details__btns modal__btns">
                <button className="edit__btn" onClick={modalToggle}>
                  Annuler
                </button>
                <button className="delete__btn" onClick={() => deleteInvoice(data.id)}>Confirmez</button>
              </div>
            </div>
          </div>

          {/* Confirm deletion modal end */}

          <button className="delete__btn" onClick={modalToggle}>
            Supprimer
          </button>

          <button
            onClick={() => updateStatus(data.id)}
            className={`${
              data.status === "Payé" || data.status === "Brouillons"
                ? "disable"
                : ""
            }  mark__as-btn`}
          >
            Marquer Comme Payé
          </button>
        </div>
      </div>

      {/* invoice details*/}
      <div className="invoice__details">
        <div className="details__box">
          <div>
            <h4>{data.id.substr(0, 6).toUpperCase()}</h4>
            <p>{data.description}</p>
          </div>
          <div>
            <p>{data.senderAddress.street}</p>
            <p>{data.senderAddress.city}</p>
            <p>{data.senderAddress.postalCode}</p>
            <p>{data.senderAddress.country}</p>
          </div>
        </div>

        {/* details box 2 */}
        <div className="details__box">
          <div>
            <div className="invoice__created__date">
              <p>Date de Facture</p>
              <h4>{data.createdAt}</h4>
            </div>
            <div>
              <p className="invoice__payment">Payer le</p>
              <h4>{data.paymentDue}</h4>
            </div>
          </div>

          {/* invoice client adress */}
          <div className="invoice__client-address">
            <p>Facture pour</p>
            <h4>{data.clientName}</h4>
            <div>
              <p>{data.clientAddress.street}</p>
              <p>{data.clientAddress.city}</p>
              <p>{data.clientAddress.postalCode}</p>
              <p>{data.clientAddress.country}</p>
            </div>
          </div>
          <div>
            <p>Envoyée à</p>
            <h4>{data.clientEmail}</h4>
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
            {data.items?.map((item, index) => (
              <li className="list__item" key={index}>
                <div className="item__name-box">
                  <h5>{item.name}</h5>
                </div>

                <div className="list__item-box">
                  <p>{item.quantity}</p>
                </div>
                <div className="list__item-box">
                  <p>{item.price} €</p>
                </div>
                <div className="list__item-box">
                  <h5>{item.total} €</h5>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/*  grand total  */}
        <div className="grand__total">
          <h5>Total</h5>
          <h2>{data.total} €</h2>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://20100:loveangie02@cluster0.3znwwtw.mongodb.net/invoices2?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  );

  const db = client.db();
  const collection = db.collection("allInvoices");

  const invoices = await collection.find({}, { _id: 1 }).toArray();

  return {
    fallback: "blocking",
    paths: invoices.map((invoice) => ({
      params: {
        invoiceId: invoice._id.toString(),
      },
    })),
  };
}

export async function getStaticProps(context) {
  const { invoiceId } = context.params;
  const client = await MongoClient.connect(
    "mongodb+srv://20100:loveangie02@cluster0.3znwwtw.mongodb.net/invoices2?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  );

  const db = client.db();
  const collection = db.collection("allInvoices");

  const invoice = await collection.findOne({ _id: ObjectId(invoiceId) });

  return {
    props: {
      data: {
        id: invoice._id.toString(),
        senderAddress: invoice.senderAddress,
        clientAddress: invoice.clientAddress,
        clientName: invoice.clientName,
        clientEmail: invoice.clientEmail,
        description: invoice.description,
        createdAt: invoice.createdAt,
        paymentDue: invoice.paymentDue,
        items: invoice.items,
        total: invoice.total,
        status: invoice.status,
        // paymentTerms: invoice.paymentTerms,
      },
    },
    revalidate: 1,
  };
}
