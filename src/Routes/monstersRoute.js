const express = require('express');
const {
    createMonsters,
    getAllMonsters,
    getAMonster,
    updateMonster,
    deleteMonster,
    getconditions
} = require('../Controllers/monstersCtrl');

const Router = express.Router();
Router.route('/').post(createMonsters).get(getAllMonsters);
Router.route('/conditions/:id').get(getconditions)
Router.route('/:id').get(getAMonster);
Router.route('/:id').put(updateMonster);
Router.route('/:id').delete(deleteMonster);

module.exports = Router;