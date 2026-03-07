import { conn } from "../database/db.js";

export const createTask = (req, res) => {
  const { title, description, priority, dueDate } = req.body;
  const createdBy = req.user.id;
  const { listId } = req.params;

  if (!title || !title.trim()) {
    return res.status(400).json({
      ok: false,
      message: "El título es requerido",
    });
  }
  if (createdBy === undefined) {
    return res.status(400).json({
      ok: false,
      message: "El usuario es requerido",
    });
  }

  const allowedPriorities = ["low", "medium", "high"];
  if (priority && !allowedPriorities.includes(priority)) {
    return res.status(400).json({
      ok: false,
      message: "Prioridad inválida",
    });
  }

  const trimmedTitle = title.trim();

  // TODO: Validar que el dueDate sea válido

  conn.query(
    "SELECT MAX(position) AS maxPosition FROM tasks WHERE list_id = ?",
    [listId],
    (err, results) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          message: "Error en el servidor",
          error: err.message,
        });
      }

      const position =
        results[0].maxPosition !== null ? results[0].maxPosition + 10 : 10;

      conn.query(
        "INSERT INTO tasks (list_id, title, description, priority, due_date, position, created_by) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          listId,
          trimmedTitle,
          description,
          priority,
          dueDate,
          position,
          createdBy,
        ],
        (err, insertResult) => {
          if (err) {
            return res.status(500).json({
              ok: false,
              message: "Error en el servidor",
              error: err.message,
            });
          }

          return res.status(201).json({
            ok: true,
            message: "Tarea creada correctamente",
            task: {
              id: insertResult.insertId,
              title: trimmedTitle,
              description,
              priority,
              dueDate,
              position,
              createdBy,
            },
          });
        },
      );
    },
  );
};

export const getTasksOfList = (req, res) => {
  const { listId } = req.params;

  conn.query(
    "SELECT * FROM tasks WHERE list_id = ? ORDER BY position ASC",
    [listId],
    (err, results) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          message: "Error en el servidor",
          error: err.message,
        });
      }
      return res.status(200).json({
        ok: true,
        message: "Tareas obtenidas correctamente",
        tasks: results,
      });
    },
  );
};

export const updateTask = (req, res) => {
  const { taskId } = req.params;
  const { title, description, priority, dueDate } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({
      ok: false,
      message: "El título es requerido",
    });
  }

  if (!description || !description.trim()) {
    return res.status(400).json({
      ok: false,
      message: "La descripción es requerida",
    });
  }

  if (dueDate && !isValidDate(dueDate)) {
    return res.status(400).json({
      ok: false,
      message: "La fecha no es válida",
    });
  }

  const allowedPriorities = ["low", "medium", "high"];
  if (priority && !allowedPriorities.includes(priority)) {
    return res.status(400).json({
      ok: false,
      message: "La prioridad no es válida",
    });
  }

  const trimmedTitle = title.trim();
  const trimmedDescription = description.trim();

  conn.query(
    `UPDATE tasks 
     SET title = ?, description = ?, priority = ?, due_date = ?
     WHERE id = ?`,
    [trimmedTitle, trimmedDescription, priority, dueDate, taskId],
    (err, results) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          message: "Error en el servidor",
          error: err.message,
        });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({
          ok: false,
          message: "Tarea no encontrada",
        });
      }

      return res.status(200).json({
        ok: true,
        message: "Tarea actualizada correctamente",
      });
    },
  );
};

export const moveTask = (req, res) => {
  const { taskId, listId } = req.params;
  const { position } = req.body;

  const parsedPosition = Number(position);

  if (!Number.isFinite(parsedPosition)) {
    return res.status(400).json({
      ok: false,
      message: "La posición debe ser un número válido",
    });
  }

  conn.query(
    "UPDATE tasks SET list_id = ?, position = ? WHERE id = ?",
    [listId, parsedPosition, taskId],
    (err, results) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          message: "Error en el servidor",
          error: err.message,
        });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({
          ok: false,
          message: "Tarea no encontrada",
        });
      }

      return res.status(200).json({
        ok: true,
        message: "Tarea movida correctamente",
      });
    },
  );
};

export const deleteTask = (req, res) => {
  const { taskId } = req.params;

  conn.query("DELETE FROM tasks WHERE id = ?", [taskId], (err, results) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: "Error en el servidor",
        error: err.message,
      });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({
        ok: false,
        message: "Tarea no encontrada",
      });
    }

    return res.status(200).json({
      ok: true,
      message: "Tarea eliminada correctamente",
    });
  });
};
