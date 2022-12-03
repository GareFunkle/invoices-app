import { MongoClient, ObjectId } from "mongodb";

async function handler(req, res) {
  const { invoiceId } = req.query;

  const client = await MongoClient.connect(
    "mongodb+srv://20100:loveangie02@cluster0.3znwwtw.mongodb.net/invoices2?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  );

  const db = client.db();
  const collection = db.collection("allInvoices");

  if (req.method === "PUT") {
    await collection.updateOne(
      { _id: ObjectId(invoiceId) },
      {
        $set: {
          status: "payé",
        },
      }
    );
    client.close();
  }

  // delte rquest
  if (req.method === "DELETE") {
    await collection.deleteOne({ _id: ObjectId(invoiceId) });

    res.status(200).json({ message: "Facture supprimer avec succes" });

    client.close();
  }
}

export default handler;
