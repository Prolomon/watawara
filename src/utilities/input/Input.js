"use client"; 

import { useState } from 'react'; 

export default function Input ({title, id, name, type, value, required, readOnly}) { // Added required prop
    const [error, setError] = useState(''); // State for error message

    const validateInput = (currentValue) => {
        setError(''); 

        if (required && !currentValue) {
            setError(`${title || 'This field'} is required.`);
            return;
        }

        switch (type) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (currentValue && !emailRegex.test(currentValue)) {
                    setError('Please enter a valid email address.');
                }
                break;
            case 'number':
                if (currentValue && isNaN(Number(currentValue))) {
                    setError('Please enter a valid number.');
                }
                break;
            case 'tel':
                const phoneRegex = /^\+?[0-9\s\-()]*$/;
                if (currentValue && !phoneRegex.test(currentValue)) {
                     setError('Please enter a valid phone number.');
                }
                break;
            case 'file':
                const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
                const file = currentValue instanceof File ? currentValue : event?.target?.files?.[0];
                
                if (file && !allowedTypes.includes(file.type)) {
                    setError('Please upload a valid file (JPEG, PNG, GIF, or PDF).');
                } else if (file && file.size > 5 * 1024 * 1024) { // 5MB limit
                    setError('File size should not exceed 5MB.');
                }
                break;

            default:
                // No specific validation for other types by default
                break;
        }
    };

    const handleChange = (event) => {
        validateInput(event.target.value);
    };

    const inputId = id || title?.replace(/\s+/g, "-");

    return (
        <div className="mb-1.5">
            <label htmlFor={inputId} className="text-sm font-semibold text-gray-700 capitalize">{title}</label>
            <input
                type={type}
                name={name}
                id={inputId}
                className={`w-full rounded-md border ${error ? 'border-red-500' : 'border-gray-400'} outline-none text-gray-800 text-sm mt-1 px-2 py-1.5 bg-transparent focus:border-amber-400`} // Added focus styles and error border
                defaultValue={value}
                onChange={handleChange} // Added onChange handler
                required={required} // Pass required attribute
                aria-invalid={!!error} // Accessibility: indicate invalid input
                aria-describedby={error ? `${inputId}-error` : undefined}
                readOnly={readOnly}
            />
            {/* Display error message */}
            {error && (
                <p id={`${inputId}-error`} className="text-sm text-red-600 mt-1" role="alert">
                    {error}
                </p>
            )}
        </div>
    )
}