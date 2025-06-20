"use client";
import { useState } from "react";

export default function Home() {
  const [feedback, setFeedback] = useState({
    rating: 0,
    comment: "",
    email: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the feedback to your backend
    console.log("Feedback submitted:", feedback);
    alert("Thank you for your feedback!");
  };

  return (
    <main className="w-full min-h-screen bg-gray-50">
      <div className="w-11/12 py-4 mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Customer Experience Survey</h1>
        <p className="text-center text-gray-600 mb-8">Your feedback helps us improve our services. Please take a moment to share your thoughts.</p>

        <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-lg shadow">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Overall, how satisfied are you with our service?
            </label>
            <div className="flex gap-4 justify-center">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  type="button"
                  className={`p-2 rounded-full w-12 h-12 ${
                    feedback.rating === num
                      ? "bg-primary text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => setFeedback({ ...feedback, rating: num })}
                >
                  {num}
                </button>
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>Very Dissatisfied</span>
              <span>Very Satisfied</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What aspects of our service did you find most valuable?
            </label>
            <textarea
              className="w-full p-3 border rounded-md"
              rows="3"
              placeholder="Please share specific examples..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Were there any challenges or difficulties you encountered?
            </label>
            <textarea
              className="w-full p-3 border rounded-md"
              rows="3"
              placeholder="Please describe any issues..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              How likely are you to recommend our service to others?
            </label>
            <select className="w-full p-3 border rounded-md bg-white">
              <option value="">Please select...</option>
              <option value="very-likely">Very Likely</option>
              <option value="likely">Likely</option>
              <option value="neutral">Neutral</option>
              <option value="unlikely">Unlikely</option>
              <option value="very-unlikely">Very Unlikely</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Comments or Suggestions
            </label>
            <textarea
              className="w-full p-3 border rounded-md"
              rows="4"
              value={feedback.comment}
              onChange={(e) =>
                setFeedback({ ...feedback, comment: e.target.value })
              }
              placeholder="Please share any other thoughts or suggestions for improvement..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address (optional)
            </label>
            <input
              type="email"
              className="w-full p-3 border rounded-md"
              value={feedback.email}
              onChange={(e) =>
                setFeedback({ ...feedback, email: e.target.value })
              }
              placeholder="your@email.com"
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter your email if you&apos;d like us to follow up on your feedback
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-3 px-4 rounded-md hover:bg-primary transition-colors font-medium"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </main>
  );
}
