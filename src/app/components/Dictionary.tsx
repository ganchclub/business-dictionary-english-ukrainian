"use client"; // Add this line

import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

const Dictionary = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // Fetch and parse the CSV file
        Papa.parse('/dictionary.csv', {
            header: true,
            download: true,
            complete: (results) => {
                setData(results.data);
            },
        });
    }, []);

    // Filter data based on search term
    const filteredData = data.filter(item =>
        (item.English && item.English.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.Ukrainian && item.Ukrainian.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Function to highlight the search term
    const highlightText = (text, search) => {
        if (!search) return text; // Return original text if no search term
        const parts = text.split(new RegExp(`(${search})`, 'gi')); // Split text by search term
        return parts.map((part, index) =>
            part.toLowerCase() === search.toLowerCase() ? (
                <span key={index} style={{ backgroundColor: 'yellow' }}>{part}</span>
            ) : part
        );
    };

    return (
        <div>
            <h1 className="main-heading">BUSINESS DICTIONARY</h1>
            <h2 className="sub-heading">Economics • Finance • Banking Investments • Bank Loans</h2>
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <table>
                <thead>
                <tr>
                    <th>English</th>
                    <th>Ukrainian</th>
                </tr>
                </thead>
                <tbody>
                {filteredData.map((item, index) => (
                    <tr key={index}>
                        <td>{highlightText(item.English, searchTerm)}</td>
                        <td>{highlightText(item.Ukrainian, searchTerm)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dictionary;