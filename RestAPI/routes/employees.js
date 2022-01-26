const express = require("express");
const { connection } = require("mongoose");
const router = express.Router();
const Employee = require("../models/employee");


/**
 * @swagger
 * components:
 *  schemas:
 *      Employee:
 *          type: object
 *          required:
 *              - name
 *              - contractType
 *              - employDate
 *          properties:
 *              id:
 *                  type: string
 *                  description: Autogenerated id 
 *              name:
 *                  type: string
 *                  description: Name of the employee
 *              contractType:
 *                  type: string
 *                  description: Typ of the employee's contract
 *              employDate:
 *                  type: date
 *                  description: The date of employ
 *          example:
 *              id: 61f11a7a124b9d2337e1f595
 *              name: Maniek
 *              contractType: UoD
 *              employDate: 2022-01-26T09:55:06.071Z
 */            

/**
 * @swagger
 * tags:
 *  name: Employees
 *  description: Employee management API
 */

/**
 * @swagger
 * /employees:
 *  get:
 *      summary: Returns the list of all employees
 *      tags: [Employees]
 *      responses:
 *          200:
 *              description: List of the employees
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: "#/components/schemas/Employee"
 */

router.get("/", async (req, res)=>{
    try{
        const employees = await Employee.find();
        res.json(employees);

    }
    catch(err){
        res.status(500).json({message: err.message});

    }
});

/**
 * @swagger
 * /employees/{id}:
 *  get:
 *      summary: Returns the employee by id
 *      tags: [Employees]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *              required: true
 *              description: ID of the employee  
 *      responses:
 *          200:
 *              description: Descriptions of the employee by id
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/Employee"
 *          404:
 *              description: Employee not found
 *          500:
 *              description: Error 500
 */

router.get("/:id", getEmployeer, (req, res)=>{
    res.send(res.employee);
});


/**
 * @swagger
 * /employees:
 *  post:
 *      summary: Create a new employee
 *      tags: [Employees]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: ID of the employee  
 *      requestBody:
 *          required: true
 *          content:
 *               application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/Employee"
 *      responses:
 *          200: 
 *              description: The employee was updated
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/Employee"
 *          400:
 *              description: Error 400
 */
router.post("/", async (req, res)=>{
    const employee = new Employee({
        name: req.body.name,
        contractType: req.body.contractType
    })

    try{
        const newEmployee = await employee.save();
        res.status(201).json(newEmployee);
    }catch(err){
        res.status(400).json({message: err.message});
    }
});
/**
 * @swagger
 * /employees/{id}:
 *  patch:
 *      summary: Update the employee by id
 *      tags: [Employees]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *              required: true
 *              description: ID of the employee  
 *      requestBody:
 *          required: true
 *          content:
 *               application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/Employee"
 *      responses:
 *          200: 
 *              description: The employee was successfully created
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/Employee"
 *          400:
 *              description: Error 400
 */
router.patch("/:id", getEmployeer, async (req, res)=>{
    try{
        res.employee.name = req.body.name;
        res.employee.contractType = req.body.contractType;
        const updatedEmployee = await res.employee.save();
        res.json(updatedEmployee);
    }catch(err){
        res.status(400).json({message: err.message});
    }
});

/**
 * @swagger
 * /employees/{id}:
 *  delete:
 *      summary: Delete the employee by id
 *      tags: [Employees]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *              required: true
 *              description: ID of the employee  
 *      responses:
 *          200: 
 *              description: The employee was successfully created
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/Employee"
 *          500:
 *              description: Error 500
 */

router.delete("/:id", getEmployeer, async (req, res)=>{
    try{
        await res.employee.remove();
        res.json({message: "Employee deleted succesfully"});
    }catch(err){
        res.status(500).json({message: err.message});
    }
});

async function getEmployeer(req,res,next){
    let employee;
    try{
        employee = await Employee.findById(req.params.id);

        if(employee == null){
            return res.status(404).json({message: "Employee not found"});
        }
    }catch(err){
        return res.status(500).json({message: err.message});
    }
    res.employee = employee;
    next();
}

module.exports = router;