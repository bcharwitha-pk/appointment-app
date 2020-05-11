const Appointment = require('./../../models/appointment');

/**
 * @swagger
 * /api/get/appointments/{patient}:
 *   get:
 *     tags:
 *       - Appointment
 *     name: Appointment list of the patient
 *     summary: Fetch all appointments of the patient available in db
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: patient
 *         schema: 
 *           type: string
 *         required: 
 *           - patient
 *     responses:
 *       '200':
 *         description: Fetched all appointments of the patients successfully
 *       '401':
 *         description: No list found in the database to fetch
 *       '500':
 *         description: Internal server error
 */

module.exports = function(app) {
    app.get('/api/get/appointments/:patient', (req,res) => {
        Appointment.find({patientId: req.params.patient})
        .populate([
            {path: 'doctor', select: ['name']}
        ]).then((appointments) => {
            res.send({
                data: appointments,
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
 * /api/get/appointment/{id}:
 *   get:
 *     tags:
 *       - Appointment
 *     name: Get Appointment of the patient
 *     summary: Fetch selected appointment of the patient available in db
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: 
 *           type: string
 *         required: 
 *           - id
 *     responses:
 *       '200':
 *         description: Fetched the requested appointment successfully
 *       '401':
 *         description: No list found in the database to fetch
 *       '500':
 *         description: Internal server error
 *
 */

    app.get('/api/get/appointment/:id', (req,res) => {
        Appointment.findOne({_id: req.params.id})
        .then((appointment) => {
            res.send({
                data: appointment,
                status: 'success',
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
 * /api/save/appointment:
 *   post:
 *     tags:
 *       - Appointment
 *     name: Save appointment
 *     summary: Save appointment for the patient into db
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *      - in: body
 *        name: body
 *        schema: 
 *          type: object
 *          properties:
 *            patientId:
 *              type: string
 *            patient:
 *              type: string
 *            slot:
 *              type: string
 *            doctor:
 *              type: string
 *            createdBy: 
 *              type: string
 *        required: 
 *          - patient
 *          - patientId
 *          - slot
 *          - doctor
 *          - createdBy
 *     responses:
 *       '200':
 *         description: Appointment booked successfully
 *       '500':
 *         description: Internal server error
 */

    app.post('/api/save/appointment', (req,res) => {
        var newAppointment = new Appointment(req.body);

        Appointment.find({
            date: req.body.date,
            patientId: req.body.patientId,
            doctor: req.body.doctor
        }).then(app => {
            if(app.length !== 0) {
                res.status(200).send({
                    status: 'booked',
                    message: 'You already have an appointment on ' + req.body.date
                })
            } else {
                newAppointment.save()
                .then(() => {
                    res.status(200).send({
                        status: 'success',
                        message: 'New Appointment added.'
                    })
                }).catch(err => {
                    res.status(500).send({
                        status: 'error',
                        message: err.message
                    });
                })
            }
        }).catch(err => {
            res.status(500).send({
                status: 'error',
                message: err.message
            });
        })
    });

/**
 * @swagger
 * /api/edit/appointment/{id}:
 *   put:
 *     tags:
 *       - Appointment
 *     name: Edit appointment
 *     summary: Edit appointment for the patient in db
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *      - in: body
 *        name: body
 *        schema: 
 *          type: object
 *          properties:
 *            patientId:
 *              type: string
 *            patient:
 *              type: string
 *            slot:
 *              type: string
 *            doctor:
 *              type: string
 *            createdBy: 
 *              type: string
 *        required: 
 *          - patient
 *          - patientId
 *          - slot
 *          - doctor
 *          - createdBy
 *     responses:
 *       '200':
 *         description: Appointment updated successfully
 *       '500':
 *         description: Internal server error
 */

    app.put('/api/edit/appointment/:id', (req,res) => {
        Appointment.findOne({
            date: req.body.date,
            patientId: req.body.patientId,
            doctor: req.body.doctor
        }).then(app => {
            if(app === null) {
                Appointment.findOneAndUpdate({_id: req.params.id}, req.body, {useFindAndModify: false}).then(app => {
                    res.status(200).send({
                        status: 'success',
                        message: 'Appointment updated successfully.'
                    }).catch(err => {
                        res.status(500).send({
                            status: 'error',
                            message: err.message
                        });
                    })
                })
            } else {
                res.status(200).send({
                    status: 'booked',
                    message: 'You already have an appointment on ' + req.body.date
                })
            }
        }).catch(err => {
            res.status(500).send({
                status: 'error',
                message: err.message
            });
        })
    })   

/**
 * @swagger
 * /api/delete/appointment/{id}:
 *   delete:
 *     tags:
 *       - Appointment
 *     name: Cancel appointment
 *     summary: Cancel selected appointment of the patient in db
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: 
 *           type: string
 *         required: 
 *           - id
 *     responses:
 *       '200':
 *         description: Appointment cancelled successfully
 *       '401':
 *         description: No list found in the database to fetch
 *       '500':
 *         description: Internal server error
 *
 */
    
    app.delete('/api/delete/appointment/:id', (req,res) => {
        Appointment.findOneAndDelete({_id: req.params.id}).then(app => {
            res.status(200).send({
                status: 'success',
                message: 'Appointment cancelled successfully.'
            }).catch(err => {
                res.status(500).send({
                    status: 'error',
                    message: err.message
                });
            })
        })
    })
}
