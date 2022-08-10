import { differenceInSeconds } from "date-fns";
import {
  createContext,
  ReactNode,
  useState,
  useReducer,
  useEffect,
} from "react";
import {
  createNewCycleAction,
  interruptCurrentCycleAction,
  markCurrentCycleAsFinishedAction,
} from "../reducers/cycles/actions";
import { Cycle } from "../reducers/cycles/reducer";
import { cyclesReducer } from "../reducers/cycles/reducer";

interface CreateCycleData {
  task: string;
  minutesAmount: number;
}

interface CycleContextType {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  markCurrentCycleAsFinished: () => void;
  setSecondsPassed: (seconds: number) => void;
  createNewCycle: (data: CreateCycleData) => void;
  interruptCurrentCycle: () => void;
}

interface CycleContextProviderProps {
  children: ReactNode;
}

export const CycleContext = createContext({} as CycleContextType);

export const CycleContextProvider = ({
  children,
}: CycleContextProviderProps) => {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    () => {
      const storedStateJSON = localStorage.getItem(
        "@time-zone:cycles-state-1.0.0"
      );
      if (storedStateJSON) {
        return JSON.parse(storedStateJSON);
      }
    }
  );

  const { cycles, activeCycleId } = cyclesState;
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startData));
    }
    return 0
  });

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState);
    localStorage.setItem("@time-zone:cycles-state-1.0.0", stateJSON);
  }, [cyclesState]);

  const setSecondsPassed = (seconds: number) => {
    setAmountSecondsPassed(seconds);
  };
  const markCurrentCycleAsFinished = () => {
    dispatch(markCurrentCycleAsFinishedAction());
  };
  const createNewCycle = (data: CreateCycleData) => {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startData: new Date(),
    };
    dispatch(createNewCycleAction(newCycle));
    setAmountSecondsPassed(0);
  };
  const interruptCurrentCycle = () => {
    dispatch(interruptCurrentCycleAction());
  };
  return (
    <CycleContext.Provider
      value={{
        cycles,
        setSecondsPassed,
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CycleContext.Provider>
  );
};
function addNewCycleAction(): any {
  throw new Error("Function not implemented.");
}
