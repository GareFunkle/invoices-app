import React from "react";

const AddNew = () => {
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
                <p className="bill__title">Bill from</p>
                <div className="form__group">
                    <p>Adresse</p>
                    <input type="text" />
                </div>

                <div className="form__group inline_form-group">
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
        </div>
      </div>
    </div>
  );
};

export default AddNew;
