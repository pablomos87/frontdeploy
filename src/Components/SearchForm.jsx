import { FaSearch } from 'react-icons/fa';
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import handleSearch from '../Utils/searchUtils';
import { useNavigate } from 'react-router-dom';


const SearchForm = () => {

    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    return (

        <Form className="d-flex" onSubmit={(e) => handleSearch(e, searchQuery, setSearchQuery, navigate)} >
        <Form.Control
          type="search"
          placeholder="Buscar"
          className="me-2 fs-6"
          aria-label="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          id="search"
        />

<Button variant="secondary" onClick={(e) => handleSearch(e, searchQuery, setSearchQuery, navigate)} type='submit'>
<FaSearch />
</Button>
      </Form>
    )

}


export default SearchForm;
