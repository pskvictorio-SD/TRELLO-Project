import Card from "../ui/Card.jsx";
import Badge from "../ui/Badge.jsx";

export default function WorkspaceCard({ workspace, onclick }) {
  return (
    <Card
      size="fluid"
      className="hover:scale-105 cursor-pointer py-10"
      onclick={onclick}
    >
      <div className="flex flex-col gap-5">
        <div className="">
          <h2 className="text-xl font-bold">{workspace.name}</h2>
          <p className="text-sm text-gray-500">{workspace.description}</p>
        </div>
        <div className="">
          <p>
            <Badge variant="info">
              <b>Created by:</b>
              {workspace.creator}
            </Badge>
          </p>
          <p>
            <Badge variant="info">
              <b>Created at:</b>
              {workspace.createdAt}
            </Badge>
          </p>
        </div>
      </div>
    </Card>
  );
}
