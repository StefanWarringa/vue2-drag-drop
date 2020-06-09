import { uuid } from './utils'

export default {
  name: 'myfirstboard',
  columns: [
    {
      name: 'todo',
      tasks: [
        {
          description: 'This is the first task to complete',
          name: 'first task',
          id: uuid(),
          userAssigned: null
        },
        {
          description: 'This is to be done after the first task',
          name: 'second task',
          id: uuid(),
          userAssigned: null
        },
        {
          description: '',
          name: 'and third',
          id: uuid(),
          userAssigned: null
        }
      ]
    },
    {
      name: 'in-progress',
      tasks: [
        {
          description: '',
          name: 'first task',
          id: uuid(),
          userAssigned: null
        }
      ]
    },
    {
      name: 'done',
      tasks: [
        {
          description: '',
          name: 'first task',
          id: uuid(),
          userAssigned: null
        }
      ]
    }
  ]
}
