import Link from "next/link";
import { useRouter } from "next/router";
import { MongoClient } from "mongodb";

export default function Home(props) {
  const router = useRouter();
  const { data } = props;

  const navigatePage = () => router.push("/add-new");

  return (
    <div className="main__container">
      <div className="invoice__header">
        <div className="invoice__header-logo">
          <h3>Factures</h3>
          <p>{data.length} factures au total</p>
        </div>

        <button className="btn" onClick={navigatePage}>
          Ajouter
        </button>
      </div>

      <div className="invoice__container">
        {/*=====Invoice item=====*/}
        {data?.map((invoice) => (
          <Link href={`/invoices/${invoice.id}`} passref="true" key={invoice.id}>
            <div className="invoice__item">
              <div>
                <h5 className="invoice__id">
                  {invoice.id.substr(0, 6).toUpperCase()}
                </h5>
              </div>

              <div>
                <h6 className="invoice__client">{invoice.clientName}</h6>
              </div>

              <div>
                <p className="invoice_created">{invoice.createdAt}</p>
              </div>

              <div>
                <h3 className="invoice__total">{invoice.total} €</h3>
              </div>

              <div>
                <button
                  className={`${
                    invoice.status === "Payé"
                      ? "paid__status"
                      : invoice.status === "En attente"
                      ? "pending__status"
                      : "draft__status"
                  }`}
                >
                  {invoice.status}
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://20100:loveangie02@cluster0.3znwwtw.mongodb.net/invoices2?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  );

  const db = client.db();
  const collection = db.collection("allInvoices");

  const invoices = await collection.find({}).toArray();

  return {
    props: {
      data: invoices.map((invoice) => {
        return {
          id: invoice._id.toString(),
          clientName: invoice.clientName,
          createdAt: invoice.createdAt,
          total: invoice.total,
          status: invoice.status,
        };
      }),
    },
    revalidate: 1,
  };
}
