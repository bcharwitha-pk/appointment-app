const Doctor = require('./../../models/doctor');

/**
 * @swagger
 * /api/get/doctor-list:
 *   get:
 *     tags:
 *       - Doctor
 *     name: Doctors list in db
 *     summary: Fetch all doctors list available in db
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: Fetched doctors list successfully
 *       '401':
 *         description: No list found in the database to fetch
 *
 */

module.exports = function(app) {
    app.get('/api/get/doctor-list', (req,res) => {
        Doctor.find().then((doctors) => {
            res.send({
                data: doctors,
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
 * /api/get/doctor/{id}:
 *   get:
 *     tags:
 *       - Doctor
 *     name: Doctor details
 *     summary: Fetch specific doctor details available in db
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *      - in: path
 *        name: id
 *        schema: 
 *         type: string
 *        required: 
 *         - id
 *     responses:
 *       '200':
 *         description: Fetched doctor details successfully
 *       '401':
 *         description: No doctor found in the database to fetch
 *       '500':
 *         description: Internal server error
 */

    app.get('/api/get/doctor/:id', (req,res) => {
        Doctor.findOne({_id: req.params.id}).then((doctor) => {
            res.send({
                data: doctor,
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
 * /api/doctor/save:
 *   post:
 *     tags:
 *       - Doctor
 *     name: Save doctor details
 *     summary: Create new doctor in db
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
 *             name:
 *               type: string
 *             dept:
 *               type: string
 *             timing:
 *               type: array
 *               items: 
 *                 type: string
 *             ailments:
 *               type: array
 *               items: 
 *                 type: string
 *         required: 
 *           - name
 *           - dept
 *           - ailments
 *           - timing
 *     responses:
 *       '200':
 *         description: Saved doctor details successfully
 *       '500':
 *         description: Internal server error
 *
 */
    app.post('/api/doctor/save', (req,res) => {
        var newDoctor = new Doctor(req.body)

        newDoctor.save()
        .then(() => {
            res.status(200).send({
                status: 'Success',
                message: 'New Doctor added.'
            })
        }).catch(err => {
            res.status(500).send({
                status: 'error',
                message: err.message
            });
        })
    });
}