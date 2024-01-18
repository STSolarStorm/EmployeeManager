const{Employee} = require('../models')
const jobtitles = ['CEO', 'VP'];
const states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CZ', 'CO', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV',' WI', 'WY'];

module.exports.displayEmployees = async function(req, res){
    const employees = await Employee.findAll();
    res.render('index', {employees})
}

module.exports.renderAddEmployeeForm = function(req, res){
    res.render('createUserForm',
        {
            employee: {
                firstname: '',
                lastname: '',
                jobtitle: jobtitles[0],
                streetline1: '',
                streetline2: '',
                city: '',
                state: states[0],
                zip: '',
                phonenumber: '',
                yearhired: '',
                age: ''
            },
            jobtitles,
            stateslist:states
        });
}

module.exports.addEmployee = async function(req, res){
    await Employee.create(
        {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            jobtitle: req.body.jobtitle,
            streetline1: req.body.streetline1,
            streetline2: req.body.streetline2,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip,
            phonenumber: req.body.phonenumber,
            yearhired: req.body.yearhired,
            age: req.body.age
        });
    res.redirect('/');
}

module.exports.renderUpdateForm = async function(req, res){
    const employee = await Employee.findByPk(req.params.id);
    res.render('edit', {
       employee,
        jobtitles,
        stateslist:states
    });
}

module.exports.updateEmployee = async function(req, res){
    await Employee.update(
        {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            jobtitle: req.body.jobtitle,
            streetline1: req.body.streetline1,
            streetline2: req.body.streetline2,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip,
            phonenumber: req.body.phonenumber,
            yearhired: req.body.yearhired,
            age: req.body.age
    },
        {
            where: {
                id: req.params.id
            }
        });
    res.redirect('/');
}

module.exports.deleteEmployee = async function(req, res){
    await Employee.destroy({
        where:{
            id: req.params.id
        }
    });
    res.redirect('/');
}