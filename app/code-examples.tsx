// Example Code Blocks

// Import all React hooks at the top to avoid duplicate imports
import { useState, useContext, createContext, ComponentType } from 'react';
import { Component } from 'react';

// 1. TypeScript Interface
interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

// 2. React Component with TypeScript

interface Props {
  title: string;
  items: string[];
}

const TodoList = ({ title, items }: Props) => {
  const [todos, setTodos] = useState<string[]>(items);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, newTodo]);
      setNewTodo('');
    }
  };

  return (
    <div>
      <h2>{title}</h2>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
      <input 
        value={newTodo} 
        onChange={(e) => setNewTodo(e.target.value)} 
        placeholder="Add new todo"
      />
      <button onClick={addTodo}>Add</button>
    </div>
  );
};

// 3. Async/Await with Error Handling
async function fetchUserData(id: number): Promise<User | null> {
  try {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const user: User = await response.json();
    return user;
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    return null;
  }
}

// 4. Custom Hook

function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

// 5. Utility Functions
const utils = {
  formatDate: (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  },

  debounce: <T extends (...args: any[]) => any>(func: T, timeout = 300) => {
    let timer: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(args), timeout);
    };
  },

  capitalize: (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
};

// 6. Class Component (legacy but still relevant)

interface CounterState {
  count: number;
}

class Counter extends Component<{}, CounterState> {
  state: CounterState = {
    count: 0
  };

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  decrement = () => {
    this.setState({ count: this.state.count - 1 });
  };

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>+</button>
        <button onClick={this.decrement}>-</button>
      </div>
    );
  }
}

// 7. Context API Example

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// 8. Higher-Order Component (HOC) Pattern

interface WithLoadingProps {
  loading: boolean;
}

function withLoading<P extends object>(
  WrappedComponent: ComponentType<P>
) {
  return function WithLoadingComponent(props: P & WithLoadingProps) {
    const { loading, ...rest } = props;
    if (loading) return <div>Loading...</div>;
    return <WrappedComponent {...(rest as P)} />;
  };
}

// 9. CSS-in-JS Styled Component Example (simplified)
// Note: This would require installing @emotion/styled for actual use
const StyledButton = ({ primary, children, ...props }: { 
  primary?: boolean; 
  children: React.ReactNode;
  [key: string]: any;
}) => {
  const baseStyles = {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    backgroundColor: primary ? '#007bff' : '#6c757d',
    color: 'white',
    fontWeight: 'bold',
  };

  const hoverStyles = {
    opacity: 0.9,
  };

  const disabledStyles = {
    opacity: 0.5,
    cursor: 'not-allowed',
  };

  return (
    <button 
      style={{ 
        ...baseStyles, 
        ...(props.disabled ? disabledStyles : {}), 
      }} 
      {...props}
    >
      {children}
    </button>
  );
};

// 10. API Service Class
class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }
}

export const apiService = new ApiService('/api');



