const pool = require('../Config/db');

/**
 * @desc    create a habitats
 * @route   POST /api/v1/habitats
 * @access  Public
 */
const createHabitats = async (request, response, next) => {
    const {name, climate, temperature} = request.body;
    console.log(name,climate,temperature);
    pool.query('INSERT INTO habitats(name, climate, temperature) VALUES($1, $2, $3)', [name, climate, temperature], (err, res) => {
        if (err){
            return next(err);
        }
    
        response.status(201).json({
            status: "success",
            message: "Habitat created successfully",
        });
    });
}

/**
 * @desc    GET all Habitats
 * @route   GET /api/v1/Habitats
 * @access  Public
 */
const getAllHabitats = async (request, response, next) => {
    pool.query('select * from habitats order by id ASC', (err, res) => {
        if (err){
            return next(err);
        }
    
        response.status(200).json({
            status: "success",
            message: "Habitats fetched successfully",
            data: res.rows,
        });
    });
}

/**
 * @desc    GET Single Habitat
 * @route   GET /api/v1/Habitats
 * @access  Public
 */
const getAHabitat = async (request, response, next) => {
    const {id} = request.params;
    pool.query('select * from habitats where id = $1', [id], (err, res) => {
        const {id} = request.params
        if (err){
            return next(err);
        }
    
        response.status(200).json({
            status: "success",
            message: "Habitats fetched successfully",
            data: res.rows,
        });
    });
}


/**
 * @desc    GET Single Habitat
 * @route   GET /api/v1/habitats
 * @access  Public
 */
const updateHabitat = async (request, response, next) => {
    const { id } = request.params;
    const key = ['name', 'climate', 'temperature'];
    const fields = [];

    key.forEach(key => {
        if (request.body[key]) fields.push(key);
    });

    fields.forEach((fields, index) => {
        pool.query(`UPDATE habitats SET ${fields}=($1) WHERE id=($2)`, [request.body[fields], id], (err, res) => {
            const { id } = request.params
            if (err) {
                return next(err);
            }

            response.status(200).json({
                status: "success",
                message: "Habitat updated successfully", 
            });
        });
    });
}

/**
 * @desc    get Single Habitat
 * @route   DELETE /api/v1/habitats/:id
 * @access  Public
 */
const deleteHabitat = async (request, response, next) => {
    const {id} = request.params;
    pool.query('DELETE FROM habitats WHERE id=($1)', [id], (err, res) => {
        if (err){
            return next(err);
        }
    
        response.status(200).json({
            status: "success",
            message: "Successfully deleted Habitat",
        });
    });
}


module.exports = {
    createHabitats,
    getAllHabitats,
    getAHabitat,
    updateHabitat,
    deleteHabitat
}