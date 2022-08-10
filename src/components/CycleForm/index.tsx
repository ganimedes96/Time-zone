import { useFormContext } from "react-hook-form";
import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import { CycleContext } from "../../contexts/CycleContext";
import { useContext } from "react";


export const CycleForm = () => {
   const { activeCycle } = useContext(CycleContext)
   const { register } = useFormContext()
  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        id="task"
        list="task"
        placeholder="De um nome para seu projeto"
        disabled={!!activeCycle }
        {...register("task")}
      />
      <label htmlFor="minutesAmount">Durante</label>
      <MinutesAmountInput
        type="number"
        id="minutesAmount"
        placeholder="00"
        step={5}
        min={5}
        max={60}
        {...register("minutesAmount", { valueAsNumber: true })}
      />
      <span>minutos .</span>
    </FormContainer>
  );
};
