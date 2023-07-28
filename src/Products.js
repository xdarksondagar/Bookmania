export const Products = () => {
  const books = [
    {
      title: "Life of Pi",
      type: "Action and Adventure",
    },
    {
      title: "Watchmen",
      type: "Comic Book",
    },
    {
      title: "And Then There Were None",
      type: "Detective and Mystery",
    },
    {
      title: "Circe",
      type: "Fantasy",
    },
    {
      title: "The Three Musketeers",
      type: "Action and Adventure",
    },
  ];
  const booksEls = books.map((book) => {
    return (
      <li key={book.title}>
        <h3>
          <strong>Title:</strong>&nbsp;{book.title}
        </h3>
        <p>
          <strong>Type:</strong>&nbsp;{book.type}
        </p>
      </li>
    );
  });
  return <ol>{booksEls}</ol>;
};
