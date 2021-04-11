const router = require('express').Router();
const controller = require('./../controllers/session.controller');

router.route('/info/:sessionType/:showVR').get((req, res) => {
    let sessionType = req.params.sessionType;
    let showVR = req.params.showVR == 'true';
    res.json(controller.getSessionInfo(sessionType, showVR));
});

module.exports = router;
