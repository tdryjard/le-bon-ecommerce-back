const db = require('../database')

const Purchase = function createPurchase(purchase) {
  this.title = purchase.title;
  this.description = purchase.description;
  this.slogan = purchase.slogan;
  this.logo_id = purchase.logo_id;
  this.illustration_id = purchase.illustration_id;
  this.public_stripe = purchase.public_stripe;
  this.private_stripe = purchase.private_stripe;
  this.email = purchase.email;
  this.name = purchase.name;
  this.color1 = purchase.color1;
  this.color2 = purchase.color2;
  this.domain = purchase.domain;
}

Purchase.create = (Purchase, result) => {
  db.query('INSERT INTO purchase SET ?', [Purchase], (error, dbResult) => {
    if (error) {
      return result(error, null);
    }

    return result(null, { id: dbResult.insertId, ...Purchase });
  });
};


module.exports = Purchase