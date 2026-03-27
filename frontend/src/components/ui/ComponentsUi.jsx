import Button from "./Button.jsx";
import Card from "./Card.jsx";
import Input from "./Input.jsx";
import Modal from "./Modal.jsx";
import Textarea from "./Textarea.jsx";
import Avatar from "./Avatar.jsx";
import Dropdown from "./Dropdown.jsx";
import Badge from "./Badge.jsx";
import Spinner from "./Spinner.jsx";
import Link from "./Link.jsx";
import TaskCard from "../task/TaskCard.jsx";
import { useState } from "react";

function ComponentsUi() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-5">
      {/* Avatars */}
      <h1 className="text-3xl text-center my-2 font-bold">Avatars</h1>
      <div className="App flex flex-col justify-evenly gap-5 p-3">
        <Avatar src="https://i.pravatar.cc/150?img=1" alt="avatar" />
        <Avatar src="https://i.pravatar.cc/150?img=2" alt="avatar" />
        <Avatar src="https://i.pravatar.cc/150?img=3" alt="avatar" />
      </div>
      {/* Modals */}
      <h1 className="text-3xl text-center my-2 font-bold">Modal</h1>
      <div className="App">
        <Button onClick={() => setOpen(true)}>Open modal</Button>

        <Modal isOpen={open} onClose={() => setOpen(false)}>
          <Card size="fluid">
            <h1 className="text-3xl font-bold">Modal</h1>
            <p className="text-gray-500 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              elementum, nulla sed elementum varius, nisi est egestas nisi, vel
            </p>

            <Button>Primary</Button>
          </Card>
        </Modal>
      </div>
      {/* Buttons */}
      <h1 className="text-3xl text-center my-2 font-bold">Buttons</h1>
      <div className="App">
        <Button>Primary</Button>

        <Button variant="secondary">Cancelar</Button>

        <Button variant="edit">Editar</Button>

        <Button variant="delete">Eliminar</Button>
      </div>
      {/* Cards */}
      <h1 className="text-3xl text-center my-2 font-bold">Cards</h1>
      <div className="App">
        <Card size="sm">
          <h1 className="text-3xl font-bold">Card</h1>
          <p className="text-gray-500 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            elementum, nulla sed elementum varius, nisi est egestas nisi, vel
          </p>

          <div className="flex justify-around">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
          </div>
        </Card>

        <Card size="md">
          <h1 className="text-3xl font-bold">Card</h1>
          <p className="text-gray-500 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            elementum, nulla sed elementum varius, nisi est egestas nisi, vel
          </p>

          <Button>Primary</Button>
        </Card>
        <Card size="fluid">
          <h1 className="text-3xl font-bold">Card</h1>
          <p className="text-gray-500 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            elementum, nulla sed elementum varius, nisi est egestas nisi, vel
          </p>

          <Button>Primary</Button>
        </Card>
      </div>
      {/* Inputs */}
      <h1 className="text-3xl text-center my-2 font-bold">Inputs</h1>
      <div className="App flex flex-col justify-evenly gap-5 p-3">
        <Textarea placeholder="Textarea" />

        <Input placeholder="Nombre" />

        <Input type="email" placeholder="Email" />

        <Input type="password" placeholder="Password" />

        <Input type="date" />
      </div>
      {/* Dropdowns */}
      <h1 className="text-3xl text-center my-2 font-bold">Dropdowns</h1>
      <div className="App max-w-md mx-auto mt-10 space-y-4">
        {/* <Dropdown /> */}
        <Dropdown title="¿Qué es React?">
          <p className="text-gray-700">
            React es una librería de JavaScript para construir interfaces de
            usuario.
          </p>
        </Dropdown>

        <Dropdown title="Más información">
          <ul className="list-disc pl-5 text-gray-700">
            <li>Componentes reutilizables</li>
            <li>Virtual DOM</li>
            <li>Gran ecosistema</li>
          </ul>
        </Dropdown>
        <Dropdown title="Navegación">
          <ul className="flex flex-col gap-2">
            <a className="" href="">
              <Button className="w-full">Perfil</Button>
            </a>
            <a className="" href="">
              <Button className="w-full">Home</Button>
            </a>
            <a className="" href="">
              <Button className="w-full" variant="secondary">
                Contacto
              </Button>
            </a>
          </ul>
        </Dropdown>
      </div>
      {/* Badges */}
      <h1 className="text-3xl text-center my-2 font-bold">Badges</h1>
      <div className="App flex flex-col justify-evenly gap-5 p-3">
        {/* Prioridad badges */}
        <h2>Prioridad badges</h2>
        <div className="flex flex-col gap-2">
          <Badge variant="danger">Alta</Badge>
          <Badge variant="warning">Media</Badge>
          <Badge variant="success">Baja</Badge>
        </div>

        <hr />

        {/* Estado badges */}
        <h2>Estado de tasks</h2>
        <div className="flex flex-col gap-2">
          <Badge variant="info">En progreso</Badge>
          <Badge variant="success">Completado</Badge>
          <Badge variant="danger">Bloqueado</Badge>
        </div>

        <hr />

        {/* Etiquetes de las tareas */}
        <h2>Etiquetas de las tareas</h2>
        <div className="flex flex-col gap-2">
          <Badge variant="purple">Frontend</Badge>
          <Badge variant="info">Backend</Badge>
          <Badge variant="warning">Bug</Badge>
        </div>

        <hr />

        {/* Ejemplo de uso */}
        <h2>Ejemplo de uso</h2>
        <div className="flex flex-col gap-2">
          <Card size="md">
            <h3 className="text-3xl font-bold">
              Implementar Inicio de sesion con JWT
            </h3>

            <div className="flex gap-2 flex-wrap bg-blue-500 p-2 rounded-lg">
              <Badge variant="danger">
                <b>Priodidad:</b>Alta
              </Badge>
              <Badge variant="info">
                <b>Estado:</b>En progreso
              </Badge>
              <Badge variant="purple">
                <b>Etiqueta:</b>Frontend
              </Badge>
            </div>

            <div className="flex gap-2">
              <Badge>JP</Badge>
              <Badge>ML</Badge>
            </div>
          </Card>
        </div>
      </div>
      {/* Spinner */}
      <h1 className="text-3xl text-center my-2 font-bold">Spinner</h1>
      <div className="App flex flex-col justify-evenly gap-5 p-3">
        <Spinner />
      </div>
      <div className="App flex flex-col justify-evenly gap-5 p-3">
        <Link to="/login" variant="primary" className="">
          Iniciar sesion
        </Link>
      </div>
      {/* TaskCard */}
      <h1 className="text-3xl text-center my-2 font-bold">TaskCard</h1>
      <div className="App flex flex-col justify-evenly gap-5 p-3">
        <TaskCard task={{
          name: "Task name",
          description: "Task description",
          priority: "High",
          dueDate: "2023-01-01",
          isCompleted: true,
          createdAt: "2023-01-01"
        }} />
      </div>
    </div>
  );
}

export default ComponentsUi;
