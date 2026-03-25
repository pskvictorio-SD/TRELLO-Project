import BoardCard from "../components/board/BoardCard.jsx";

export default function Workspace() {
  return (
    <div className="p-5">
      <h1>Workspace</h1>

      <div className="App grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 p-10 gap-5">
        <BoardCard
        board={{
          name: "BoardName",
          description: "BoardDescription",
          createdAt: "00/00/0000",
        }}
      /><BoardCard
        board={{
          name: "BoardName",
          description: "BoardDescription",
          createdAt: "00/00/0000",
        }}
      /><BoardCard
        board={{
          name: "BoardName",
          description: "BoardDescription",
          createdAt: "00/00/0000",
        }}
      />
      </div>
    </div>
  );
}
