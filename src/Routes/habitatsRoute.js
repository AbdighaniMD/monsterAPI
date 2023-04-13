const express = require('express');
const {
    createHabitats,
    getAllHabitats,
    getAHabitat,
    updateHabitat,
    deleteHabitat
} = require('../Controllers/habitatsCtrl');

const Router = express.Router();
Router.route('/').post(createHabitats).get(getAllHabitats);
Router.route('/:id').get(getAHabitat).put(updateHabitat).delete(deleteHabitat)

module.exports = Router;