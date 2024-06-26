import './App.css';
import Footer from './Layout/Footer';
import Header from './Layout/Header';
import './Layout/sudoku.css'
import SudokuBox from './Layout/SudokuBox';

function App() {
  return (
    <div className="App">
      <section>
        <Header/>
        <SudokuBox/>
        <Footer/>
      </section>

    </div>
  )
}

export default App;
