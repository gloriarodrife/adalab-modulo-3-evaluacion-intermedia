import '../styles/reset.css';
import '../styles/App.scss';
import { useEffect, useState } from 'react';
import { callToApi } from '../services/api';
function App() {
  const [quotes, setQuotes] = useState([]);
  const [filters, setFilters] = useState({ character: 'Todos' });
  const [newQuote, setNew] = useState({ quote: '', character: '' });

  useEffect(() => {
    callToApi().then((response) => {
      setQuotes(response);
    });
  }, []);

  const renderList = () => {
    const dataFiltered = getFilteredData();
    return dataFiltered.map((item, index) => (
      <li key={index} className="quote">
        {item.quote} - <span className="character">{item.character}</span>
      </li>
    ));
  };

  const handleInput = (event) => {
    const { name, value } = event.target;

    setFilters({
      ...filters,
      [name]: value,
    });
  };

  function getFilteredData() {
    if (!filters.search) {
      if (filters.character === 'Todos') {
        return quotes;
      }
      return quotes.filter((item) => item.character === filters.character);
    }

    if (filters.character === 'Todos') {
      return quotes.filter((item) =>
        item.quote.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    return quotes
      .filter((item) =>
        item.quote.toLowerCase().includes(filters.search.toLowerCase())
      )
      .filter((item) => item.character === filters.character);
  }

  const createQuote = (event) => {
    event.preventDefault();

    const quoteData = [...quotes, newQuote];

    if (newQuote.quote === '' || newQuote.character === '') {
      alert('Falta algún dato!');
    } else {
      setQuotes(quoteData);
      setNew({ quote: '', character: '' });
    }
  };

  const handleInputNew = (event) => {
    const { name, value } = event.target;
    setNew({ ...newQuote, [name]: value });
  };
  return (
    <div className="App">
      <header className="header">
        <h1>Frases friends</h1>
      </header>
      <section className="form">
        <form className="form__search">
          <section className="section_filter">
            <label htmlFor="search">Filtrar por frase</label>
            <input
              type="search"
              name="search"
              autoComplete="off"
              onChange={handleInput}
            />
          </section>
          <section className="section_filter">
            <label htmlFor="character">Filtrar por personaje</label>

            <select name="character" onChange={handleInput}>
              <option value="Todos">Todos</option>
              <option value="Ross">Ross</option>
              <option value="Monica">Monica</option>
              <option value="Joey">Joey</option>
              <option value="Phoebe">Phoebe</option>
              <option value="Chandler">Chandler</option>
              <option value="Rachel">Rachel</option>
            </select>
          </section>
        </form>
        <form className="form__create">
          <h2 className="title_newQuote">Añadir una nueva frase</h2>
          <label htmlFor="quote">Frase</label>
          <input
            type="text"
            name="quote"
            value={newQuote.quote}
            onChange={handleInputNew}
          />
          <label htmlFor="character">Personaje</label>
          <input
            type="text"
            name="character"
            value={newQuote.character}
            onChange={handleInputNew}
          />
          <input
            type="submit"
            value="Añadir nueva frase"
            className="submit"
            onClick={createQuote}
          />
        </form>
      </section>
      <ul className="list">{renderList()}</ul>
    </div>
  );
}

export { App };
