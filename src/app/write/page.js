"use client"
import { useState } from 'react';
import ReactMarkdown from 'react-markdown'
import { render } from 'react-dom'
export default function Writer() {
    const [title, setTitle] = useState('');
    const [apiResponse, setApiResponse] = useState('');
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e) => {
        console.log("title", title)
        setLoading(true)
        e.preventDefault();
        const apiUrl = '/api/articleWrite';
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: title,
                }),
            });

            if (response.ok) {

                const result = await response.json();
                setApiResponse(result.groqresult);

            } else {
                console.error('Failed to send data:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {

            setLoading(false); // Set the loading state back to false
        }

    };

    return (
        <div className="flex items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md mx-auto">
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                            Title
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center justify-center">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Generate Article
                        </button>
                    </div>
                </form>
                <div>
                {loading && <p className="font-beautiful">Please wait while I fetch the information ....</p>}
                    {apiResponse && (
                <div className="flex flex-col items-center rounded-lg rounded-md  pt-5 border border-black  p-4">

                    <ReactMarkdown
                        components={{
                            p: ({ node, ...props }) => <p {...props} />,
                        }}
                    >
                        {apiResponse}
                    </ReactMarkdown>

                </div>
            )}
                </div>
            </div>
        </div>
    );
}