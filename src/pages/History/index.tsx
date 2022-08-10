import { useContext } from "react";
import { formatDistanceToNow } from "date-fns";
import  ptBR  from 'date-fns/locale/pt-BR';
import { HistoryContainer, HistoryList, Status } from "./styles";
import { CycleContext } from "../../contexts/CycleContext";

export function History() {
  const { cycles } = useContext(CycleContext);
  return (
    <HistoryContainer>
      <h1>Meu historico</h1>
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duracao</th>
              <th>Inicio</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => {
              return (
                <tr key={cycle.id}>
                  <td>{cycle.task}</td>
                  <td>{cycle.minutesAmount } minutos</td>
                  <td>{formatDistanceToNow(new Date(cycle.startData), {
                    addSuffix:true,
                    locale: ptBR,
                  })}</td>
                  <td>
                    {cycle.finishedDate && (
                      <Status statusColor="blue">Concluido</Status>
                    )}
                    {cycle.interruptedDate && (
                      <Status statusColor="red">Interrompido</Status>
                    )}
                    {!cycle.finishedDate && !cycle.interruptedDate && (
                      <Status statusColor="yellow">Em andamento</Status>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
}
function CyclesContext(CyclesContext: any): { cycles: any } {
  throw new Error("Function not implemented.");
}
