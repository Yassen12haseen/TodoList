import SpringModal from "./model";
import Todo from "./Todo";
function TodoList() {
  return (
    <div
      // style={{ fontFamily: "'Poppins', sans-serif" }}
      className="my-scroll bg-[#242731] relative pr-8 pl-5 pt-5 pb-10 w-full max-w-[450px] max-h-[600px] min-h-[300px] rounded-2xl flex flex-col items-center"
    >
      <header className="w-full flex flex-col items-left gap-1 border-b-2 border-[#A78BFA] pb-3">
        <h1 className="text-[#F5F5F5] text-2xl font-bold">Today's Goals</h1>
        <h2 className="text-sm font-medium text-gray-400">
          Step by step build your path to success
        </h2>
      </header>
      <Todo />

      <div className="absolute right-1 bottom-3">
        <SpringModal />
      </div>
    </div>
  );
}

export default TodoList;
