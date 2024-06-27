import './App.css';
import Footer from './Layout/Footer';
import Header from './Layout/Header';
import './Layout/sudoku.css'
import SudokuBox from './Layout/SudokuBox';

function App() {

  return (
    <div className="App">
      <div className='container'>
          <h1>스도쿠 게임</h1>
        <section>
          <Header/>
          <SudokuBox/>
          <Footer/>
        </section>
      </div>
    </div>
  )
}

export default App;
