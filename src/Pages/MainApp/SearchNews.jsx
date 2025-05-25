import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setFilteredNews, setShowSearchResults } from '../../Redux/newsSlice';
import axios from 'axios';

const SearchNews = ({ onClearSearchTerm }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [allArticles, setAllArticles] = useState([]); 
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get('https://techservice.myhealthgainer.in/article/all');
                setAllArticles(response.data); 
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        };

        fetchArticles();
    }, []);

    const handleSearch = (event) => {
        const searchValue = event.target.value.toLowerCase();
        setSearchTerm(searchValue);

        if (searchValue.length > 2) {
            const filteredArticles = allArticles.filter((article) =>
                article.title.toLowerCase().includes(searchValue)
            );
            dispatch(setFilteredNews(filteredArticles));
            dispatch(setShowSearchResults(true));
        } else {
            dispatch(setShowSearchResults(false));
        }
    };

    // Clear the search term when the results are closed
    useEffect(() => {
        if (!searchTerm) {
            dispatch(setShowSearchResults(false));
        }
    }, [searchTerm, dispatch]);

    // Automatically clear search term after a search result is clicked or closed
    useEffect(() => {
        if (!onClearSearchTerm) {
            setSearchTerm(''); // Clear the input field when search results are closed
        }
    }, [onClearSearchTerm]);

    return (
        <div className="flex items-center">
            <input
                type="text"
                placeholder="Search news..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full px-3 py-2 rounded-md text-black outline-none border border-gray-300 focus:border-blue-500"
            />
        </div>
    );
};

export default SearchNews;
