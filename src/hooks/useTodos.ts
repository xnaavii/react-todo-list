import { useContext } from "react";
import { TodoContext } from "../store/TodoProvider";

// Custom hook to consume the todo context provider
export function useTodos() {
  const ctx = useContext(TodoContext);
  if (!ctx) {
    throw new Error("useTodos must be used inside <TodoProvider>");
  }
  return ctx;
}
