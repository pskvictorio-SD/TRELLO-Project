// Middleware para verificar que el usuario tiene el rol en el workspace
export const userRoleWorkspace = (...allowedRoles) => {
  return (req, res, next) => {
    const role = req.userInWorkspace?.role;

    if (!role || !allowedRoles.includes(role)) {
      return res.status(403).json({
        ok: false,
        message: "No tienes permisos",
      });
    }

    next();
  };
};
