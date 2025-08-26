'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ThemeToggle } from '@/components/theme-toggle'

type Todo = {
  id: string
  text: string
  completed: boolean
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState('')

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([
        ...todos,
        {
          id: Date.now().toString(),
          text: newTodo.trim(),
          completed: false
        }
      ])
      setNewTodo('')
    }
  }

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo()
    }
  }

  return (
    <div className="min-h-full">
      <section className="container mx-auto px-4 pt-24 pb-20">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-3xl font-bold">Simple Todo App</CardTitle>
              <ThemeToggle />
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-6">
                <Input
                  type="text"
                  placeholder="Add a new todo..."
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button onClick={addTodo}>Add</Button>
              </div>
              
              {todos.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No todos yet. Add your first todo above!
                </p>
              ) : (
                <ul className="space-y-3">
                  {todos.map((todo) => (
                    <li 
                      key={todo.id} 
                      className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted transition-colors"
                    >
                      <Checkbox
                        checked={todo.completed}
                        onCheckedChange={() => toggleTodo(todo.id)}
                      />
                      <span className={`flex-1 ${todo.completed ? 'line-through text-muted-foreground' : ''}`}>
                        {todo.text}
                      </span>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => deleteTodo(todo.id)}
                      >
                        Delete
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
              
              {todos.length > 0 && (
                <div className="mt-6 text-sm text-muted-foreground">
                  {todos.filter(t => t.completed).length} of {todos.length} completed
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}


