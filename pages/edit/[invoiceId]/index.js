import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { MongoClient, ObjectId } from "mongodb";
import { toast } from "react-toastify";

const EditItem = (props) => {
  const invoice = props.data;
  const router = useRouter();
  const [items, setItems] = useState(invoice.items);

  const [senderStreet, setSenderStreet] = useState("");
  const [senderCity, setSenderCity] = useState("");
  const [senderPostalCode, setSenderPostalCode] = useState("");
  const [senderCountry, setSenderCountry] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientStreet, setClientStreet] = useState("");
  const [clientCity, setClientCity] = useState("");
  const [clientPostalCode, setClientPostalCode] = useState("");
  const [clientCountry, setClientCountry] = useState("");
  const [description, setDescription] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [paymentTerms, setPaymentTerms] = useState("");
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

  // total

  const totalAmount = items.reduce((acc, curr) => acc + curr.total, 0);

  // update invoice in database

  const updateInvoice = async (invoiceId, status) => {
    try {
      const res = await fetch(`/api/edit/${invoiceId}`, {
        method: "PUT",
        heqders: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderStreet: senderStreet,
          senderCity: senderCity,
          senderPostalCode: senderPostalCode,
          senderCountry: senderCountry,
          clientName: clientName,
          clientEmail: clientEmail,
          clientStreet: clientStreet,
          clientCity: clientCity,
          clientPostalCode: clientPostalCode,
          clientCountry: clientCountry,
          description: description,
          createdAt: createdAt,
          paymentDue: createdAt,
          paymentTerms: paymentTerms,
          status: status,
          items: items,
          total: totalAmount,
        }),
      });

      const data = await res.json();

      router.push(`/invoices/${invoiceId}`);

      toast.success(data.message);
    } catch (error) {
      toast.error("Une erreur est survenue !");
    }
  };

  // set default input data

  useEffect(() => {
    setSenderCity(invoice.senderAddress.city);
    setSenderStreet(invoice.senderAddress.street);
    setSenderPostalCode(invoice.senderAddress.postalCode);
    setSenderCountry(invoice.senderAddress.country);

    setClientCity(invoice.clientAddress.city);
    setClientStreet(invoice.clientAddress.street);
    setClientPostalCode(invoice.clientAddress.postalCode);
    setClientCountry(invoice.clientAddress.country);

    setClientName(invoice.clientName);
    setClientEmail(invoice.clientEmail);
    setDescription(invoice.description);
    setCreatedAt(invoice.createdAt);
    setPaymentTerms(invoice.paymentTerms);
  }, [invoice]);

  return (
    <div className="main__container">
      <div className="new__invoice">
        <div className="new__invoice-header">
          <h3>Modifier #{invoice.id.substr(0, 6).toUpperCase()}</h3>
        </div>
        {/* new invoice body */}

        <div className="new__invoice-body">
          {/* bill from */}
          <div className="bill__from">
            <p className="bill__title">Facture de</p>
            <div className="form__group">
              <p>Adresse</p>
              <input
                type="text"
                value={senderStreet}
                onChange={(e) => setSenderStreet(e.target.value)}
              />
            </div>

            <div className="form__group inline__form-group">
              <div>
                <p>Ville</p>
                <input
                  type="text"
                  value={senderCity}
                  onChange={(e) => setSenderCity(e.target.value)}
                />
              </div>

              <div>
                <p>Code Postal</p>
                <input
                  type="text"
                  value={senderPostalCode}
                  onChange={(e) => setSenderPostalCode(e.target.value)}
                />
              </div>

              <div>
                <p>Pays</p>
                <input
                  type="text"
                  value={senderCountry}
                  onChange={(e) => setSenderCountry(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Bill to */}

          <div className="bill__to">
            <p className="bill__title">Facture pour</p>
            <div className="form__group">
              <p>Nom du client</p>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
              />
            </div>

            <div className="form__group">
              <p>Client Email</p>
              <input
                type="email"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
              />
            </div>

            <div className="form__group">
              <p>Adresse</p>
              <input
                type="text"
                value={clientStreet}
                onChange={(e) => setClientStreet(e.target.value)}
              />
            </div>

            <div className="form__group inline__form-group">
              <div>
                <p>Ville</p>
                <input
                  type="text"
                  value={clientCity}
                  onChange={(e) => setClientCity(e.target.value)}
                />
              </div>

              <div>
                <p>Code Postal</p>
                <input
                  type="text"
                  value={clientPostalCode}
                  onChange={(e) => setClientPostalCode(e.target.value)}
                />
              </div>

              <div>
                <p>Pays</p>
                <input
                  type="text"
                  value={clientCountry}
                  onChange={(e) => setClientCountry(e.target.value)}
                />
              </div>
            </div>

            <div className="form__group inline__form-group">
              <div className="inline__group">
                <p>Date de Facture</p>
                <input
                  type="date"
                  value={createdAt}
                  onChange={(e) => setCreatedAt(e.target.value)}
                />
              </div>

              <div className="inline__group">
                <p>Modalités de Paiement</p>
                <input
                  type="text"
                  value={paymentTerms}
                  onChange={(e) => setPaymentTerms(e.target.value)}
                />
              </div>
            </div>

            <div className="form__group">
              <p>Description</p>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
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
                      value={item.name}
                      onChange={(e) => handlerChange(e, i)}
                    />
                  </div>

                  <div>
                    <p>Qte</p>
                    <input
                      type="number"
                      name="quantity"
                      value={item.quantity}
                      onChange={(e) => handlerChange(e, i)}
                    />
                  </div>

                  <div>
                    <p>Prix</p>
                    <input
                      type="number"
                      name="price"
                      value={item.price}
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

          <div className="new__invoice__btns" style={{ justifyContent: "end" }}>
            <div>
              <button
                className="draft__btn"
                onClick={() => router.push(`/invoices/${invoice.id}`)}
              >
                Annuler
              </button>

              <button
                className="mark__as-btn"
                onClick={() => updateInvoice(invoice.id, invoice.status)}
              >
                Sauvegarder{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditItem;

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
        paymentTerms: invoice.paymentTerms,
      },
    },
    revalidate: 1,
  };
}
