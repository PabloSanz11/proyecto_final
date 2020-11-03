const express = require('express');
const recurso = express.Router();
const db = require('../config/database');

//Post
recurso.post("/", async (req, res, next) =>
{
    const {f_name, lastname} = req.body; //Lo que viene de req body en esas variables

    if(f_name && lastname)
    {
        let query = "INSERT INTO customers (f_name, lastname)";
        query += ` VALUES('${f_name}', '${lastname}')`;
        
        const rows = await db.query(query);
        
        if(rows.affectedRows == 1)
        {
            return res.status(201).json({code: 201, message: "Customer Insertado correctamente"});
        }

        return res.status(500).json({code: 500, message: "El Customer no ha sido agregado"});
    }

    return res.status(500).json({code: 500, message: "Campos incompletos"});
});

recurso.delete("/:id([0-9]{1,3})", async (req, res, next) =>
{
    const query = `DELETE FROM customers WHERE pok_id =${req.params.id}`;

    const rows = await db.query(query);

    if(rows.affectedRows == 1)
    {
        return res.status(200).json({code: 200, message: "Pokemon Eliminado Correctamente"});
    }

    return res.status(404).send({code: 404, message: "El pokemon no ha sido encontrado"});
});

recurso.put("/:id([0-9]{1,3})", async (req, res, next) =>
{
    const {pok_name, pok_height, pok_weight, pok_base_experience} = req.body;

    if(pok_name && pok_height && pok_weight && pok_base_experience)
    {
        let query = `UPDATE pokemon SET pok_name='${pok_name}',pok_height= ${pok_height},`;
        query += `pok_weight= ${pok_weight},pok_base_experience=${pok_base_experience} WHERE pok_id = ${req.params.id}`;
        
        const rows = await db.query(query);
        
        if(rows.affectedRows == 1)
        {
            return res.status(200).json({code: 200, message: "Pokemon Actualizado correctamente"});
        }

        return res.status(500).json({code: 500, message: "Pokemon NO Actualizado"});
    }

    return res.status(500).json({code: 500, message: "Campos incompletos"});
});

recurso.patch("/:id([0-9]{1,3})", async (req, res, next) =>
{
    if(req.body.pok_name)
    {
        let query = `UPDATE pokemon SET pok_name='${req.body.pok_name}' WHERE pok_id = ${req.params.id}`;
        const rows = await db.query(query);
            
        if(rows.affectedRows == 1)
        {
            return res.status(200).json({code: 200, message: "Dato Actualizado"});
        }
    
        return res.status(500).json({code: 500, message: "Dato no Actualizado"});
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});
});

recurso.get("/", async (req, res, next) =>
{
    const pkmn =  await db.query("SELECT * FROM customers"); //Es el query
    return res.status(200).json({code: 200, message: pkmn}); //Solo cuando ya viene en formato json 
});

recurso.get('/:id([0-9]{1,3})', async (req, res, next) =>
{
    const id = req.params.id;
    
    if(id >= 1 && id <= 722)
    {
       const pkmn =  await db.query("SELECT * FROM pokemon WHERE pok_id ="+ id); //Es el query
       return res.status(200).json({code: 200, message: pkmn});
    }  
    
    return res.status(404).send({code: 404, message: "El pokemon no ha sido encontrado"});
});

recurso.get('/:name([A-Za-z]+)', async (req, res, next) =>
{
    const name = req.params.name;
    const pkmn = await db.query("SELECT * FROM pokemon WHERE pok_name = '" + name + "'"); //Es el query

    try 
    {
        if(pkmn.length > 0)
        {
            return res.status(200).json({code: 1, message: pkmn});
        }

        return res.status(404).send({code: 404, message: "El pokemon no ha sido encontrado"});
    } catch (error) {
        console.log(error);
    }
});

module.exports = recurso;