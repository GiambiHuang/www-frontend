import { store } from "@/stores/RootStore";
import { useCallback } from "react";

const useResetGame = () => {
  const handleReset = useCallback(() => {
    store.reset();
  }, []);

  return handleReset;
}

export default useResetGame;
