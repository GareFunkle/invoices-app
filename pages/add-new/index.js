import React, { useState, useRef } from 'react'
import { useRouter } from 'next/router'

import { toast } from 'react-toastify'

const AddNew = () => {
  const router = useRouter()
  const [items, setItems] = useState([])

  const senderStreet = useRef('')
  const senderCity = useRef('')
  const senderPostalCode = useRef('')
  const senderCountry = useRef('')
  const clientName = useRef('')
  const clientEmail = useRef('')
  const clientStreet = useRef('')
  const clientCity = useRef('')
  const clientPostalCode = useRef('')
  const clientCountry = useRef('')
  const description = useRef('')
  const createdAt = useRef('')
  const paymentTerms = useRef('')

  // add products items

  const addItem = () => {
    setItems([...items, { name: '', quantity: 0, price: 0, total: 0 }])
  }

  // handler change

  const handlerChange = (event, i) => {
    const { name, value } = event.target
    const list = [...items]
    list[i][name] = value
    list[i]['total'] = list[i]['quantity'] * list[i]['price']
    setItems(list)
  }

  // delete products

  const deleteItem = (i) => {
    const inputData = [...items]
    inputData.splice(i, 1)
    setItems(inputData)
  }

  // total amount of all product
  const totalAmount = items.reduce((acc, curr) => acc + curr.total, 0)

  // submit data to db

  const createInvoice = async (status) => {
    try {
      const res = await fetch('/api/add-new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          senderStreet: senderStreet.current.value,
          senderCity: senderCity.current.value,
          senderPostalCode: senderPostalCode.current.value,
          senderCountry: senderCountry.current.value,
          clientName: clientName.current.value,
          clientEmail: clientEmail.current.value,
          clientStreet: clientStreet.current.value,
          clientCity: clientCity.current.value,
          clientPostalCode: clientPostalCode.current.value,
          clientCountry: clientCountry.current.value,
          description: description.current.value,
          createdAt: createdAt.current.value,
          paymentDue: createdAt.current.value,
          paymentTerms: paymentTerms.current.value,
          status: status,
          items: items,
          total: totalAmount,
        }),
      })
      const data = await res.json()
      router.push('/')
      toast.success(data.message)
    } catch (error) {
      toast.error('Une erreur est survenue!')
    }
  }

  return (
    <div className="main__container">
      <div className="new__invoice">
        <div className="new__invoice-header">
          <h3>Nouvelle Facture</h3>
        </div>
        {/* new invoice body */}

        <div className="new__invoice-body">
          {/* bill from */}
          <div className="bill__from">
            <p className="bill__title">Facture de</p>
            <div className="form__group">
              <p>Adresse</p>
              <input type="text" ref={senderStreet} />
            </div>

            <div className="form__group inline__form-group">
              <div>
                <p>Ville</p>
                <input type="text" ref={senderCity} />
              </div>

              <div>
                <p>Code Postal</p>
                <input type="text" ref={senderPostalCode} />
              </div>

              <div>
                <p>Pays</p>
                <input type="text" ref={senderCountry} />
              </div>
            </div>
          </div>

          {/* Bill to */}

          <div className="bill__to">
            <p className="bill__title">Facture pour</p>
            <div className="form__group">
              <p>Nom du client</p>
              <input type="text" ref={clientName} />
            </div>

            <div className="form__group">
              <p>Client Email</p>
              <input type="email" ref={clientEmail} />
            </div>

            <div className="form__group">
              <p>Adresse</p>
              <input type="text" ref={clientStreet} />
            </div>

            <div className="form__group inline__form-group">
              <div>
                <p>Ville</p>
                <input type="text" ref={clientCity} />
              </div>

              <div>
                <p>Code Postal</p>
                <input type="text" ref={clientPostalCode} />
              </div>

              <div>
                <p>Pays</p>
                <input type="text" ref={clientCountry} />
              </div>
            </div>

            <div className="form__group inline__form-group">
              <div className="inline__group">
                <p>Date de Facture</p>
                <input type="date" ref={createdAt} />
              </div>

              <div className="inline__group">
                <p>Modalités de Paiement</p>
                <input type="text" ref={paymentTerms} />
              </div>
            </div>

            <div className="form__group">
              <p>Description</p>
              <input type="text" ref={description} />
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

          <div className="new__invoice__btns">
            <button className="edit__btn" onClick={() => router.push('/')}>
              Annuler
            </button>
            <div>
              <button
                className="draft__btn"
                onClick={() => createInvoice('Brouillons')}
              >
                Enregistrer Comme Brouillon
              </button>

              <button
                className="mark__as-btn"
                onClick={() => createInvoice('En attente')}
              >
                Sauvegarder & envoyee
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddNew
