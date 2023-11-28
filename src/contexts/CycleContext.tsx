import { createContext, useState } from 'react'

interface CreateCycleData {
  task: string;
  minutesAmount: number;
}

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CyclesContext {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  CreateNewCycle: ()
  InterruptCycle
}

export const CyclesContext = createContext({} as CyclesContext)

export function CyclesContextProvider() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function markCurrentAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
  }

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function CreateNewCycle(data: newCycleFormData) {
    const id = String(new Date().getTime())

    const newCycles: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setCycles((state) => [...state, newCycles])
    setActiveCycleId(id)
    setAmountSecondsPassed(0)
    reset()
  }

  function InterruptCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
    setActiveCycleId(null)
  }
  
  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        activeCycleId,
        markCurrentAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
      }}
    ></CyclesContext.Provider>\
  )
}
