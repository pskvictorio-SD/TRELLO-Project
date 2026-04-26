import Modal from "../ui/Modal.jsx";
import Input from "../ui/Input.jsx";
import Textarea from "../ui/Textarea.jsx";
import Button from "../ui/Button.jsx";
import Form from "../ui/Form.jsx";

export default function CreateBoardModal({isOpen}) {
  return (
    <>
        <Modal isOpen={isOpen}>
          <h2 className="mb-10 text-2xl font-bold">Crear un nuevo tablero</h2>

          <Form size="fluid" className="gap-10">
            <fieldset>
              <label htmlFor="title">Titulo del tablero *</label>
              <Input placeholder="Ej. Plan de Marketing"></Input>
            </fieldset>
            <fieldset>
              <label htmlFor="description">Descripción</label>
              <Textarea
                maxLength={130}
                placeholder="Describe berevemente el propósito de este tablero..."
              ></Textarea>
            </fieldset>

            <hr />

            <Input type="submit" variant="button" />
          </Form>
        </Modal>
    </>
  );
}
