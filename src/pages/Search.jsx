import React, { useState } from 'react';

const Search = () => {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setResults([]);

    try {
      const response = await fetch(`/search?query=${encodeURIComponent(keyword)}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Search Page</h1>
      <form onSubmit={handleSearch}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>
      <hr />
      <h3>Results:</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      {isLoading && <p>Loading...</p>}
      {!isLoading && !error && results.length === 0 && <p>No results found.</p>}
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Document Name</th>
            <th>Ranking</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={index}>
              <td>{result.documentName}</td>
              <td>{result.ranking}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Search;
