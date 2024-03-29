const state = {
  employees: require("../models/employees.json"),
  setEmployees(es) {
    this.employees = es;
  },
};

function getEmployees(req, res) {
  return res.json(state.employees);
}

function addEmployee(req, res) {
  const nw = {
    id: state.employees?.length
      ? state.employees[state.employees.length - 1].id + 1
      : 1,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };

  if (!nw.firstname || !nw.lastname)
    return res.status(400).json({ error: "firstname and lastname are required" });

  state.setEmployees([...state.employees, nw]);
  return res.status(201).json(state.employees);
}

function updateEmployee(req, res) {
  const id = parseInt(req.body.id);
  const employee = state.employees.find((e) => e.id === id);
  if (!employee)
    return res.status(400).json({ error: `Employee id ${id} not found.` });

  if (req.body.firstname) employee.firstname = req.body.firstname;
  if (req.body.lastname) employee.lastname = req.body.lastname;

  const others = state.employees.filter((e) => e.id !== id);
  const sorted = [...others, employee].sort((e, ee) => e.id - ee.id);
  state.setEmployees(sorted);
  return res.status(200).json(sorted);
}

function deleteEmployee(req, res) {
  const id = parseInt(req.body.id);
  const employee = state.employees.find((e) => e.id === id);
  if (!employee)
    return res.status(400).json({ error: `Employee id ${id} not found.` });

  const others = state.employees.filter((e) => e.id !== id);
  state.setEmployees(others);
  return res.status(200).json(others);
}

function getEmployee(req, res) {
  const id = parseInt(req.params.id);
  const employee = state.employees.find((e) => e.id === id);
  if (!employee)
    return res.status(400).json({ error: `Employee id ${id} not found.` });

  return res.status(200).json(employee);
}

module.exports = {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
