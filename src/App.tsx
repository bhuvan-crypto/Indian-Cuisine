import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import DishesList from './components/DishesList';
import DishDetails from './components/DishDetails';
import DishSuggester from './components/DishSuggester';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';

const App = () => {
  return (
    <FluentProvider theme={webLightTheme}>
      <Router>
        <div className="h-screen bg-gray-50 flex flex-col">
          <Header />
          <main className="py-6 overflow-auto flex-grow">
            <Routes>
              <Route path="/" element={<DishesList />} />
              <Route path="/dish/:id" element={<DishDetails />} />
              <Route path="/suggest" element={<DishSuggester />} />
            </Routes>
          </main>
        </div>
      </Router>
    </FluentProvider>)
    
}

export default App;
