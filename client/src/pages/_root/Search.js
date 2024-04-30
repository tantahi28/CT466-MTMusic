import React, { useState, useEffect } from 'react';
import SongList from '../../components/UI/SongList';
import SongService from '../../services/SongService';

const Search = () => {
    const [searchResults, setSearchResults] = useState([]);
    const searchQuery = new URLSearchParams(window.location.search).get('q') || '';

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (searchQuery.trim() !== '') {
                    const searchData = await SongService.search(searchQuery);
                    setSearchResults(searchData.songs);
                } else {
                    setSearchResults([]);
                }
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };
        fetchData();
    }, [searchQuery]);

    return (
        <div className='w-100'>
            {searchResults.length > 0 ? (
                <SongList songs={searchResults} title={`Search Results for "${searchQuery}"`} />
            ) : (
                <p>No results found.</p>
            )}
        </div>
    );
}

export default Search;
