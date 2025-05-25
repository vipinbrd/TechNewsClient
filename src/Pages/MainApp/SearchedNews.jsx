import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setShowSearchResults } from '../../Redux/newsSlice';

const SearchedNews = ({ onClearSearchTerm }) => {
    const dispatch = useDispatch();
    const showSearchResults = useSelector((state) => state.news.showSearchResults);
    const filteredNews = useSelector((state) => state.news.filteredNews);

    const handleClose = () => {
        dispatch(setShowSearchResults(false));
        onClearSearchTerm(); // Call the clear function
    };

    return (
        <div className={`${showSearchResults ? 'block' : 'hidden'} container w-full md:w-1/2 lg:w-1/3 mx-auto absolute top-16 left-10 z-50 p-5 bg-white shadow-lg`}>
            {filteredNews.length > 0 ? (
                filteredNews.map((newsItem) => (
                    <div key={newsItem.id} className="p-2">
                        <Link onClick={handleClose} to={`/news/${newsItem.id}`} className="text-sm font-bold">
                            {newsItem.title}
                        </Link>
                    </div>
                ))
            ) : (
                <div className="text-sm text-gray-600">No articles found</div>
            )}
        </div>
    );
};

export default SearchedNews;
