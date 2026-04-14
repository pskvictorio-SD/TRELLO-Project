import Card from "../ui/Card.jsx";
import Badge from "../ui/Badge.jsx";
import useFetch from "../../hooks/useFetch.js";
import { getWorkspace } from "../../services/workspace.service.js";

export default function BoardCard({ board }) {
  return (
    <Card size="fluid" className="hover:scale-105 cursor-pointer">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold">{board.name}</h2>
          <p className="text-sm text-gray-500">{board.description}</p>
        </div>
        <div className="flex justify-end">
          <p>
            <Badge variant="info">
              <b>Created at:</b>
              {board.createdAt}
            </Badge>
          </p>
        </div>
      </div>
    </Card>
  );
}
