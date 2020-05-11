const Slot = require('./../../models/slot');

/**
 * @swagger
 * /api/get/slot/:
 *   post:
 *     tags:
 *       - Slot
 *     name: Doctor's slot details
 *     summary: Fetch fetch doctor's slot detials for selected date in db
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         schema: 
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *             date:
 *               type: string
 *         required: 
 *           - id
 *     responses:
 *       '200':
 *         description: Fetched slot details successfully
 *       '401':
 *         description: No slot found in the database to fetch
 *       '500':
 *         description: Internal server error
 *
 */

module.exports = function(app) {
    app.post('/api/get/slot/', (req,res) => {
        Slot.findOne({"doctor": req.body.id, "date": req.body.date}).then((slot) => {
            res.send({
                data: slot,
                status: 'Success',
            });
        }).catch(err => {
            res.status(500).send({
                status: 'error',
                message: err.message
            });
        });
    });

/**
 * @swagger
 * /api/edit/slot:
 *   put:
 *     tags:
 *       - Slot
 *     name: Update doctor's slot details
 *     summary: Update/Create doctor's slot detials for selected date in db
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         schema: 
 *           type: object
 *           properties:
 *             doctor:
 *               type: string
 *             date:
 *               type: string
 *             slot:
 *               type: string
 *             booked:
 *               type: integer
 *         required: 
 *           - id
 *           - date
 *           - slot
 *     responses:
 *       '200':
 *         description: Updated slot successfully
 *       '500':
 *         description: Internal server error
 *
 */

    app.put('/api/edit/slot', (req,res) => {
        Slot.findOneAndUpdate({doctor: req.body.doctor, date: req.body.date}, 
            req.body,
            {upsert: true, new: true})
        .then((slot) => {
            res.send({
                status: 'success',
            });
        }).catch(err => {
            res.status(500).send({
                status: 'error',
                message: err.message
            });
        });
    });
}
