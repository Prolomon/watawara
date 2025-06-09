"use client"; // This is a Client Component

import { useState, useRef, useEffect } from 'react';
// Import mammoth instead of docx-preview
import mammoth from 'mammoth';

export default function Home () {
    // Removed selectedFile state as we are fetching a specific file
    const previewContainerRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAndRenderDoc = async () => {
            if (!previewContainerRef.current) {
                return; // Ensure the container is available
            }

            setLoading(true);
            setError(null);
            previewContainerRef.current.innerHTML = ''; // Clear previous content

            try {
                // Fetch the .docx file from the public directory
                const response = await fetch('/documents/terms-and-conditions.docx');

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                // Get the file content as an ArrayBuffer (mammoth.js works with ArrayBuffer)
                const arrayBuffer = await response.arrayBuffer();

                // Use mammoth.js to convert the docx ArrayBuffer to HTML
                const result = await mammoth.convertToHtml({ arrayBuffer: arrayBuffer });

                // Insert the generated HTML into the preview container
                previewContainerRef.current.innerHTML = result.value;

                console.log("DOCX preview rendered successfully using mammoth.js");

            } catch (err) {
                console.error("Error fetching or rendering DOCX preview:", err);
                setError("Failed to load or render the document.");
                previewContainerRef.current.innerHTML = '<p style="color: red;">Error loading document: ' + (err.message || 'Unknown error') + '</p>';
            } finally {
                setLoading(false);
            }
        };

        fetchAndRenderDoc();

    }, []); // Empty dependency array means this effect runs only once on mount

    return (
        // Modified main class to take full width and removed padding/margins
        <main className="w-full">
            {/* You might want to keep the header content centered or add padding here */}
            <div className="w-11/12 py-4 mx-auto">
                {loading && <p className="w-11/12 mx-auto">Loading document preview...</p>}
                {error && <p className="w-11/12 mx-auto" style={{ color: 'red' }}>{error}</p>}
                <div ref={previewContainerRef} className="text-gray-600 docx"></div>
            </div>
        </main>
    )
}