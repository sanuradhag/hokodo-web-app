import { Routes, Route, Navigate } from "react-router-dom";

import BookListWrapper from "./components/book-list/BookListWrapper";
import BookList from "./components/book-list/BookList";
import BookDetails from "./components/book-list/BookDetails";

function App() {
  return (
    <div className="App bg-bg h-screen">
      <Routes>
        <Route path="/book-list" element={<BookListWrapper />}>
          <Route path="/book-list" element={<BookList />} />
          <Route path="/book-list/:bookId" element={<BookDetails />} />
        </Route>
        <Route path="/" element={<Navigate replace to="/book-list" />} />
        {/* Could add a wild card route to capture 404 pages */}
      </Routes>
    </div>
  );
}

export default App;
