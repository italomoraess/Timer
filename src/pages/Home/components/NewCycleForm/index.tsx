import { useForm } from 'react-hook-form'
import { FormContainer, MinutesAmout, TaskInput } from './styles'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

export function NewCycleForm() {
  const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod.number().min(1).max(60),
  })

  type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

  const { register, handleSubmit, watch, reset } = useForm<newCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })
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
        step={5}
        min={1}
        max={60}
        disabled={!!activeCycle}
        {...register('minutesAmount', { valueAsNumber: true })}
      />

      <span>minnutos.</span>
    </FormContainer>
  )
}
