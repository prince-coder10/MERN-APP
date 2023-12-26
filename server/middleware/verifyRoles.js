const verifyRoles = (...allowedRoles) => {
  return (req, res) => {
    if (!req?.roles) return res.sendStatus(401); // unauthorized
    const rolesArray = [...allowedRoles];
    console.log(rolesArray, req.roles);
    const result = req.roles
      .map((role) => rolesArray.includes(role))
      .find((val) => val === true);
    if (!result) return res.sendStatus(401);
  };
};

module.exports = verifyRoles;
