const Purchase = require('../../models/purchase/purchase.model')

exports.create = (request, response) => {

    const {
        title,
        description,
        slogan,
        logo_id,
        illustration_id,
        public_stripe,
        private_stripe,
        email,
        name,
        color1,
        color2
    } = request.body;

    // Creer un utilisateur
    const purchase = new Purchase({
        title: title || null,
        description: description || null,
        slogan: slogan || null,
        logo_id: logo_id || null,
        illustration_id : illustration_id || null,
        public_stripe: public_stripe || null,
        private_stripe: private_stripe || null,
        email: email || null,
        name: name || null,
        color1: color1 || null,
        color2: color2 || null
    });

    if (!request.body) {
        return response.status(400).send({
            message: 'Content can not be empty!'
        });
    }

    return Purchase.create(purchase, (error, data) => {
        if (error) {
            console.log(error)
            return response.status(500).send({
                message:
                    error.message || 'Some error occurred while creating the category.'
            })
        }

        return response.status(201).send(data);
    })
}