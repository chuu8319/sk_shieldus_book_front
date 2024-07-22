import './App.css';
import {Route, Routes} from 'react-router-dom';
import BookList from './book/BookList';
import BookWrite from './book/BookWrite';
import BookDetail from './book/BookDetail';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/list" element={<BookList />} />
        <Route path="/write" element={<BookWrite />} />
        <Route path="/detail/:bookId" element={<BookDetail />} />  
      </Routes>
    </>
  )
}

export default App;
