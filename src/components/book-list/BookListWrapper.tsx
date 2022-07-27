import React, { useEffect, useState } from "react";

import { Outlet } from "react-router-dom";

import AuthorsProvider from "../../context/AuthorsProvider";
import BooksProvider from "../../context/BooksProvider";

const BookListWrapper = (): JSX.Element => {
  return (
    <BooksProvider>
      <AuthorsProvider>
        <Outlet />
      </AuthorsProvider>
    </BooksProvider>
  );
};

export default BookListWrapper;
