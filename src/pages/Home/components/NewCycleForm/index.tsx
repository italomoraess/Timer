import { useFormContext } from 'react-hook-form'
import { FormContainer, MinutesAmout, TaskInput } from './styles'
import { useContext } from 'react'
import { CyclesContext } from '../../../../contexts/CycleContext'

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext)
  const { register } = useFormContext()

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        id="task"
        list="task-sugestions"
        placeholder="Dê um nome para o seu projeto"
        disabled={!!activeCycle}
        {...register('task')}
      />

      <datalist id="task-sugestions">
        <option value="wqweq"></option>
      </datalist>

      <label htmlFor="minutesAmount">durante</label>
      <MinutesAmout
        type="number"
        id="minutesAmount"
        placeholder="00"
        step={1}
        min={1}
        max={60}
        disabled={!!activeCycle}
        {...register('minutesAmount', { valueAsNumber: true })}
      />

      <span>minnutos.</span>
    </FormContainer>
  )
}
