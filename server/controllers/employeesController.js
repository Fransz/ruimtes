const data = {
  employees: require("../users.json"),
  setEmployees(es) {
    this.employees = es;
  },
};

function getEmployees(req, res) {
  return res.json(data.employees);
}

function addEmployee(req, res) {
  const nw = {
    id: data.employees?.length
      ? data.employees[data.employees.length - 1].id + 1
      : 1,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };

  if (!nw.firstname || !nw.lastname)
    res.status(400).json({ error: "firstname and lastname are required" });

  data.setEmployees([...data.employees, nw]);
  res.status(201).json(data.employees);
}

function updateEmployee(req, res) {
  const id = parseInt(req.body.id);
  const employee = data.employees.find((e) => e.id === id);
  if (!employee)
    res.status(400).json({ error: `Employee id ${id} not found.` });

  if (req.body.firstname) employee.firstname = req.body.firstname;
  if (req.body.lastname) employee.lastname = req.body.lastname;

  const others = data.employees.filter((e) => e.id !== id);
  const sorted = [...others, employee].sort((e, ee) => e.id - ee.id);
  data.setEmployees(sorted);
  res.status(200).json(sorted);
}

function deleteEmployee(req, res) {
  const id = parseInt(req.body.id);
  const employee = data.employees.find((e) => e.id === id);
  if (!employee)
    res.status(400).json({ error: `Employee id ${id} not found.` });

  const others = data.employees.filter((e) => e.id !== id);
  data.setEmployees(others);
  res.status(200).json(others);
}

function getEmployee(req, res) {
  const id = parseInt(req.params.id);
  const employee = data.employees.find((e) => e.id === id);
  if (!employee)
    res.status(400).json({ error: `Employee id ${id} not found.` });

  res.status(200).json(employee);
}

module.exports = {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
