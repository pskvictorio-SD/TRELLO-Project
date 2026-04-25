import Card from "../ui/Card.jsx";
import Badge from "../ui/Badge.jsx";
import trash_svg from "../../public/trash.svg";
import calender_svg from "../../public/calender.svg";
import pencil_svg from "../../public/pencil.svg";
import books_svg from "../../public/books.svg";

export default function BoardCard({ board }) {
  return (
    <Card size="sm" className="hover:scale-105 cursor-pointer">
      <div className="flex items-center justify-between gap-10">
        <img
          className="w-1/3 h-16 object-cover"
          src={board.image ? board.image : books_svg}
          alt="Imagen descriptiva de board"
        />
        <div className="flex flex-col gap-5 w-full">
          <h2 className="text-xl font-bold">{board.title}</h2>
          <p className="text-sm text-gray-500">{board.description}</p>
        </div>
      </div>
      <hr />
      <div className="flex justify-between">
        <Badge variant="info">
          <img className="h-6" src={calender_svg} alt="Icono de calendario" />
          <strong>Created at:</strong>
          {board.created_at.slice(0, 10)}
        </Badge>

        <div className="flex gap-2">
          <Badge
            variant="danger"
            className="flex items-center justify-center p-2 cursor-pointer transition-transform hover:scale-110"
            title="Eliminar tablero"
          >
            <img className="h-5 w-5" src={trash_svg} alt="Eliminar" />
          </Badge>

          <Badge
            variant="info"
            className="flex items-center justify-center p-2 cursor-pointer transition-transform hover:scale-110"
            title="Editar tablero"
          >
            <img className="h-5 w-5" src={pencil_svg} alt="Editar" />
          </Badge>
        </div>
      </div>
    </Card>
  );
}
