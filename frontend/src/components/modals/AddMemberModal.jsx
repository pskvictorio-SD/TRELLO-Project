import Modal from "../ui/Modal.jsx";
import Input from "../ui/Input.jsx";
import Button from "../ui/Button.jsx";
import Dropdown from "../ui/Dropdown.jsx";
import Form from "../ui/Form.jsx";

import useInvitation from "../../hooks/useInvitation.js";
import { useState } from "react";

export default function AddMemberModal({ isOpen, onClose, boardId }) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState(false);

  const { handleCreateInvitation } = useInvitation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!role) {
      setError("Debes seleccionar un rol");
      return;
    }

    try {
      await handleCreateInvitation(boardId, email, role);

      setEmail("");
      setRole("");

      onClose();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <h2 className="mb-10 text-2xl font-bold">Añadir un nuevo miembro</h2>

        <Form onSubmit={handleSubmit} size="fluid" className="p-6">
          <fieldset>
            <label>Email del miembro</label>
            <Input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ej. mi@email.com"
            />
          </fieldset>

          <fieldset>
            <Dropdown variant="input" title={role || "Selecciona un rol"}>
              <div className="">
                <Button
                  type="button"
                  className="w-full"
                  variant="outline"
                  onClick={() => setRole("admin")}
                >
                  Administrador
                </Button>
                <Button
                  type="button"
                  className="w-full"
                  variant="outline"
                  value="member"
                  onClick={() => setRole("member")}
                >
                  Miembro
                </Button>
                <Button
                  type="button"
                  className="w-full"
                  variant="outline"
                  value="viewer"
                  onClick={() => setRole("viewer")}
                >
                  Observador
                </Button>
              </div>
            </Dropdown>
          </fieldset>

          {error && <p className="text-red-500">{error}</p>}

          <Button type="submit" variant="primary">
            Añadir
          </Button>
        </Form>
      </Modal>
    </>
  );
}
