import React from "react";
import { useRouter } from "next/router";
import { MongoClient, ObjectId } from "mongodb";

const InvoiceDetails = (props) => {
  const router = useRouter();
  const { data } = props;

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

          <button className="pending__status">{data.status}</button>
        </div>

        <div className="details__btns">
          <button
            className="edit__btn"
            onClick={() => router.push(`/edit/${data.id}`)}
          >
            Modifier
          </button>

          <button className="delete__btn">Supprimer</button>

          <button className="mark__as-btn">Marquer Comme Payé</button>
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
