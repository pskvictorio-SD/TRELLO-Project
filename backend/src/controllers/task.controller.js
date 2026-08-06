import { conn } from "../database/db.js";

export const createTask = (req, res) => {
  const { title, description, priority, dueDate, assignedTo } = req.body;
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
        "INSERT INTO tasks (list_id, title, description, priority, due_date, position, created_by, assigned_to) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [
          listId,
          trimmedTitle,
          description,
          priority,
          dueDate,
          position,
          createdBy,
          assignedTo || null,
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
              assignedTo: assignedTo || null,
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
    `SELECT
      t.id,
      t.list_id,
      t.title,
      t.description,
      t.priority,
      t.due_date,
      t.position,
      t.created_by,
      t.created_at,
      t.assigned_to,
      u.id AS assigned_user_id,
      u.username AS assigned_username,
      u.avatar AS assigned_avatar
    FROM tasks t
    LEFT JOIN users u ON t.assigned_to = u.id
    WHERE t.list_id = ?
    ORDER BY t.position ASC`,
    [listId],
    (err, results) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          message: "Error en el servidor",
          error: err.message,
        });
      }

      const tasks = results.map((task) => ({
        id: task.id,
        list_id: task.list_id,
        title: task.title,
        description: task.description,
        priority: task.priority,
        due_date: task.due_date,
        position: task.position,
        created_by: task.created_by,
        created_at: task.created_at,
        assigned_to: task.assigned_to
          ? {
              id: task.assigned_user_id,
              username: task.assigned_username,
              avatar: task.assigned_avatar,
            }
          : null,
      }));

      return res.status(200).json({
        ok: true,
        message: "Tareas obtenidas correctamente",
        tasks,
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

// Asignar/desasignar una tarea a un miembro del board (solo admin)
export const assignTask = (req, res) => {
  const { taskId } = req.params;
  const { boardId } = req.params;
  const { assignedTo } = req.body;

  // Si assignedTo es null/undefined, se desasigna la tarea
  if (assignedTo === undefined || assignedTo === null || assignedTo === "") {
    conn.query(
      "UPDATE tasks SET assigned_to = NULL WHERE id = ?",
      [taskId],
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
          message: "Tarea desasignada correctamente",
        });
      },
    );
    return;
  }

  // Verificar que el usuario asignado sea miembro del board
  conn.query(
    "SELECT * FROM board_members WHERE user_id = ? AND board_id = ?",
    [assignedTo, boardId],
    (err, members) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          message: "Error en el servidor",
          error: err.message,
        });
      }
      if (members.length === 0) {
        return res.status(400).json({
          ok: false,
          message: "El usuario no es miembro de este board",
        });
      }

      conn.query(
        "UPDATE tasks SET assigned_to = ? WHERE id = ?",
        [assignedTo, taskId],
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
            message: "Tarea asignada correctamente",
          });
        },
      );
    },
  );
};

export const moveTask = (req, res) => {
  const { taskId, listId } = req.params;
  const { position, reorder } = req.body;

  const parsedPosition = Number(position);

  if (!Number.isFinite(parsedPosition)) {
    return res.status(400).json({
      ok: false,
      message: "La posición debe ser un número válido",
    });
  }

  conn.query(
    `UPDATE tasks SET list_id = ?, position = ? WHERE id = ?`,
    [listId, parsedPosition, taskId],
    (err, results) => {
      if (err)
        return res.status(500).json({
          ok: false,
          message: "Error en el servidor",
          error: err.message,
        });

      if (results.affectedRows === 0) {
        return res.status(404).json({
          ok: false,
          message: "Tarea no encontrada",
        });
      }

      if (reorder) {
        conn.query(
          "SELECT id FROM tasks WHERE list_id = ? ORDER BY position ASC",
          [listId],
          (err, results) => {
            if (err) {
              return res.status(500).json({
                ok: false,
                message: "Error en el servidor",
                error: err.message,
              });
            }
            let currentPosition = 10;
            results.forEach((task) => {
              conn.query(
                `
                  UPDATE tasks
                  SET position = ?
                  WHERE id = ?
                `,
                [currentPosition, task.id],
              );
              currentPosition += 10;
            });
          },
        );
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