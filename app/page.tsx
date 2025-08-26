'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import Video from '@/components/video'

type Todo = {
  id: string
  text: string
  completed: boolean
  createdAt: Date
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  // Simulate loading for a better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([
        ...todos,
        {
          id: Date.now().toString(),
          text: newTodo.trim(),
          completed: false,
          createdAt: new Date()
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

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo()
    }
  }

  const completedCount = todos.filter(t => t.completed).length
  const completionPercentage = todos.length > 0 ? Math.round((completedCount / todos.length) * 100) : 0

  return (
    <div className="min-h-full">
      {/* Animated Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Fallback to static image if video doesn't load */}
          <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('/images/hero-background.jpg')" }} />
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 to-background/95 dark:from-background/80 dark:to-background/90"></div>
        </div>
        
        <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Productivity Redefined
            </motion.h1>
            <motion.p 
              className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Transform your tasks into achievements with our beautifully designed todo app
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Badge variant="secondary" className="text-sm py-1 px-3">
                {todos.length} {todos.length === 1 ? 'task' : 'tasks'} managed
              </Badge>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Todo App Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center flex items-center justify-center gap-3">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                  Smart Todo App
                </span>
              </CardTitle>
              <p className="text-center text-muted-foreground">
                Organize your life, one task at a time
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-6">
                <Input
                  type="text"
                  placeholder="What needs to be done?"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button onClick={addTodo} className="px-6">
                  Add
                </Button>
              </div>
              
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : todos.length === 0 ? (
                <motion.div 
                  className="text-center py-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-5xl mb-4">📝</div>
                  <h3 className="text-xl font-semibold mb-2">No tasks yet</h3>
                  <p className="text-muted-foreground">
                    Add your first task to get started!
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <ul className="space-y-3">
                    {todos.map((todo, index) => (
                      <motion.li 
                        key={todo.id} 
                        className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted transition-all duration-200 shadow-sm"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Checkbox
                          checked={todo.completed}
                          onCheckedChange={() => toggleTodo(todo.id)}
                          className="h-5 w-5"
                        />
                        <div className="flex-1">
                          <span className={`text-lg ${todo.completed ? 'line-through text-muted-foreground' : ''}`}>
                            {todo.text}
                          </span>
                          <div className="text-xs text-muted-foreground mt-1">
                            Added: {todo.createdAt.toLocaleDateString()}
                          </div>
                        </div>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => deleteTodo(todo.id)}
                          className="transition-all duration-200 hover:scale-105"
                        >
                          Delete
                        </Button>
                      </motion.li>
                    ))}
                  </ul>
                  
                  <div className="mt-8 pt-6 border-t">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{completionPercentage}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2.5">
                      <motion.div 
                        className="bg-primary h-2.5 rounded-full" 
                        style={{ width: `${completionPercentage}%` }}
                        initial={{ width: 0 }}
                        animate={{ width: `${completionPercentage}%` }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      ></motion.div>
                    </div>
                    <div className="mt-4 text-sm text-muted-foreground flex justify-between items-center">
                      <div>
                        <span>{completedCount} completed</span> • <span>{todos.length - completedCount} remaining</span>
                      </div>
                      {completedCount > 0 && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={clearCompleted}
                          className="transition-all duration-200 hover:scale-105"
                        >
                          Clear Completed
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}





