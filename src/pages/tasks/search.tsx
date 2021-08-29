import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Search: React.FC = () => {

  const [dueDateFrom, setDueDateFrom] = useState<Date | null>();
  const [dueDateTo, setDueDateTo] = useState<Date | null>();

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-100">
      <div className="bg-gray-50 px-4 py-5 sm:px-6">
        <h2 className="text-xl leading-6 font-medium text-gray-900">
          Filters
        </h2>
      </div>
      <div className="px-4 py-4 sm:px-6">
        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-12">
          <div className="sm:col-span-3">
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
              Name
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="name"
                id="name"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div className="sm:col-span-3">
            <label htmlFor="status" className="block text-sm font-semibold text-gray-700">
              Status
            </label>
            <div className="mt-1">
              <select
                id="status"
                name="status"
                autoComplete="status"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              >
                <option></option>
                <option>To Do</option>
                <option>In Progress</option>
                <option>Internal QA</option>
                <option>Client Review</option>
                <option>Done</option>
              </select>
            </div>
          </div>
          <div className="sm:col-span-3">
            <label htmlFor="zip" className="block text-sm font-semibold text-gray-700">
              Due Date (From)
            </label>
            <div className="mt-1">
              <DatePicker
                selected={dueDateFrom}
                onChange={(date: Date | null) => setDueDateFrom(date)}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div className="sm:col-span-3">
            <label className="block text-sm font-semibold text-gray-700">
              Due Date (To)
            </label>
            <div className="mt-1">
              <DatePicker
                selected={dueDateTo}
                onChange={(date: Date | null) => setDueDateTo(date)}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex justify-center">
            <button
              type="button"
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Clear
            </button>
            <button
              type="submit"
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
