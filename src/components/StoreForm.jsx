import React, { useState } from 'react';
import '../styles/StoreForm.css';
import { BsSearch } from 'react-icons/bs';


function StoreForm({ filterProduct }) {
    const [fields, setFields] = useState({ search: '' });

    const handleChange = event => {
        let currentValue = event.target.value;
        setFields({ ...fields, [event.target.name]: currentValue });

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        filterProduct(fields.search);
    }

    return (
        <form action="" onSubmit={handleSubmit}>
            <div className="text-form">
                <input
                    type="text"
                    placeholder='Pesquisar por nome do item...'
                    id='search' name='search'
                    value={fields.search}
                    onChange={handleChange}
                    autoComplete='off'
                />
            </div>
            <button className='btn-search' type='submit'><BsSearch />Pesquisar</button>
        </form>
    );
}

export default StoreForm;