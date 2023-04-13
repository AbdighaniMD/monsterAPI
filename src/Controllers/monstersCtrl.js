const pool = require('../Config/db');

/**
 * @desc    create a monster
 * @route   POST /api/v1/monsters
 * @access  Public
 */
const createMonsters = async (request, response, next) => {
    const {name, personlity, habitats_id} = request.body;
    console.log(name, personlity, habitats_id);
    pool.query('INSERT INTO monsters(name, personlity, habitats_id) VALUES($1, $2, $3)', [name, personlity, habitats_id], (err, res) => {
        if (err){
            return next(err);
        }
    
        response.status(201).json({
            status: "success",
            message: "Monster created successfully",
        });
    });
}

/**
 * @desc    GET monsters and their habitats
 * @route   GET /api/v1/monsters/conditions
 * @access  Public
 */
const getconditions = async (request, response, next) => {
    const {id} = request.params;
    pool.query('SELECT * FROM habitats JOIN monsters ON habitats.id = monsters.habitats_id where monsters.id = $1', [id],(err, res) => {
        if (err){
            return next(err);
        }
    
        response.status(200).json({
            status: "success",
            message: "Monsters fetched successfully",
            data: res.rows,
        });
    });
}


/**
 * @desc    GET monster
 * @route   GET /api/v1/monsters
 * @access  Public
 */
const getAllMonsters = async (request, response, next) => {
    pool.query('select * from monsters order by id ASC', (err, res) => {
        if (err){
            return next(err);
        }
    
        response.status(200).json({
            status: "success",
            message: "Monsters fetched successfully",
            data: res.rows,
        });
    });
}

/**
 * @desc    GET Single monster
 * @route   GET /api/v1/monsters/:id
 * @access  Public
 */
const getAMonster = async (request, response, next) => {
    const {id} = request.params;
    pool.query('select * from monsters where id = $1', [id], (err, res) => {
        const {id} = request.params
        if (err){
            return next(err);
        }
    
        response.status(200).json({
            status: "success",
            message: "Monsters fetched successfully",
            data: res.rows,
        });
    });
}

/**
 * @desc    update Single monster
 * @route   PUT /api/v1/monsters/:id
 * @access  Public
 */
const updateMonster = async (request, response, next) => {
    const { id } = request.params;
    const key = ['name', 'personlity', 'habitats_id'];
    const fields = [];

    key.forEach(key => {
        if (request.body[key]) fields.push(key);
    });

    fields.forEach((fields, index) => {
        pool.query(`UPDATE monsters SET ${fields}=($1) WHERE id=($2)`,
            [request.body[fields], id], (err, res) => {
                if (err) {
                    return next(err);
                }

                response.status(200).json({
                    status: "success",
                    message: "Monster updated successfully",
                });
            });
    });
}
 
/**
 * @desc    delete Single monster
 * @route   DELETE /api/v1/monsters/:id
 * @access  Public
 */
const deleteMonster = async (request, response, next) => {
    const {id} = request.params;
    pool.query('DELETE FROM monsters where id=($1)',[id], (err, res) => {
        if (err){
            return next(err);
        }

        response.status(200).json({
            status: "success",
            message: "Successfully deleted Monster",
        });
    });
}

module.exports = {
    createMonsters,
    getAllMonsters,
    getAMonster,
    updateMonster,
    deleteMonster,
    getconditions
}