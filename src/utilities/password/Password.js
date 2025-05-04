"use client"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

// Added name, value, required, minLength, and onChange props
export default function Password ({title, name = "password", value, required, minLength = 8, onChange}) {
    const [show, setShow] = useState(false);
    const [error, setError] = useState(''); // State for error message

    const reveal = () => {
        setShow(!show);
    };

    const validateInput = (currentValue) => {
        setError(''); // Reset error on each change
        let currentError = ''; // Temporary error message

        if (required && !currentValue) {
            currentError = `${title || 'Password'} is required.`;
        } else if (currentValue) {
            if (minLength && currentValue.length < minLength) {
                currentError = `Password must be at least ${minLength} characters long.`;
            } else if (!/[A-Z]/.test(currentValue)) { // Check for uppercase letter
                currentError = 'Password must contain at least one uppercase letter.';
            } else if (!/[a-z]/.test(currentValue)) { // Check for lowercase letter
                currentError = 'Password must contain at least one lowercase letter.';
            } else if (!/[0-9]/.test(currentValue)) { // Check for number
                currentError = 'Password must contain at least one number.';
            } else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(currentValue)) { // Check for special character
                currentError = 'Password must contain at least one special character (e.g., !@#$%).';
            }
        }

        setError(currentError); // Set the final error message
        return !currentError; // Return true if valid, false otherwise
    };

    const handleChange = (event) => {
        const currentValue = event.target.value;
        validateInput(currentValue);
        // Call the passed onChange handler if provided (for form libraries)
        if (onChange) {
          onChange(event);
        }
    };

    const inputId = title?.replace(/\s+/g, "-") || 'password-input'; // Generate ID

    return (
      <div className="mb-1.5">
        <label
          htmlFor={inputId}
          className="text-sm font-semibold text-gray-700 capitalize"
        >
          {title ? title : "password"}
        </label>
        {/* Added error border style */}
        <div
          className={`flex items-center w-full rounded-md border ${error ? "border-red-500" : "border-gray-400"} px-2 py-1.5 mt-1 bg-transparent outline-amber-500`}
        >
          <input
            id={inputId}
            type={show ? "text" : "password"}
            name={name} // Use the name prop
            className="w-full border-none outline-none text-gray-800 text-sm bg-transparent" // Removed redundant mt-1
            defaultValue={value} // Use defaultValue prop
            onChange={handleChange} // Added onChange handler
            required={required} // Pass required attribute
            aria-invalid={!!error} // Accessibility
            aria-describedby={error ? `${inputId}-error` : undefined} // Accessibility
          />
          <button
            type="button"
            onClick={reveal}
            aria-label={show ? "Hide password" : "Show password"}
          >
            {!show ? (
              <Eye size={18} className="text-gray-600" />
            ) : (
              <EyeOff size={18} className="text-gray-600" />
            )}
          </button>
        </div>
        {/* Display error message */}
        {error && (
          <p
            id={`${inputId}-error`}
            className="text-sm text-red-600 mt-1"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
}