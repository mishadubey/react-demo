import React, { ChangeEvent, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setFormData as setFormDataStore, clearFormData as clearFormDataStore, selectFormDataState } from '../../store/slices/tasks';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import useQueryParam from '../../hooks/useQueryParam';

const Search: React.FC = () => {
  const dispatch = useAppDispatch();
  const formDataState = useAppSelector(selectFormDataState);

  const [titleQueryParam, setTitleQueryParam] = useQueryParam('title', '');
  const [statusQueryParam, setStatusQueryParam] = useQueryParam('status', '');
  const [dueDateFromQueryParam, setDueDateFromQueryParam] = useQueryParam('dueDateFrom', '');
  const [dueDateToQueryParam, setDueDateToQueryParam] = useQueryParam('dueDateTo', '');
  const [title, setTitle] = useState<string>(titleQueryParam);
  const [status, setStatus] = useState<string>(statusQueryParam);
  const [dueDateFrom, setDueDateFrom] = useState<Date | null>(dueDateFromQueryParam ? parse(dueDateFromQueryParam + ' 00:00:00', 'MM/dd/yyyy HH:mm:ss', new Date()) : null);
  const [dueDateTo, setDueDateTo] = useState<Date | null>(dueDateToQueryParam ? parse(dueDateToQueryParam + ' 00:00:00', 'MM/dd/yyyy HH:mm:ss', new Date()) : null);
  const [formData, setFormData] = useState<Object>({});

  useEffect(() => {
    setFormData({
      title,
      status,
      dueDateFrom: dueDateFrom ? format(dueDateFrom, 'MM/dd/yyyy') : null,
      dueDateTo: dueDateTo ? format(dueDateTo, 'MM/dd/yyyy') : null,
    });
  }, [title, status, dueDateFrom, dueDateTo]);

  useEffect(() => {
    if (title || status || dueDateFrom || dueDateTo) {
      const formDataNewState = {
        title,
        status,
        dueDateFrom: dueDateFrom ? format(dueDateFrom, 'MM/dd/yyyy') : null,
        dueDateTo: dueDateTo ? format(dueDateTo, 'MM/dd/yyyy') : null,
      }
      setFormData(formDataNewState);
      dispatch(setFormDataStore(formDataNewState));
    }
  }, []);

  useEffect(() => {
    setTitleQueryParam(title);
    setStatusQueryParam(status);
    setDueDateFromQueryParam(dueDateFrom ? format(dueDateFrom, 'MM/dd/yyyy') : '');
    setDueDateToQueryParam(dueDateTo ? format(dueDateTo, 'MM/dd/yyyy') : '');
  }, [formDataState]);


  const clearHandler = () => {
    setTitle('');
    setStatus('');
    setDueDateFrom(null);
    setDueDateTo(null);
    setFormData({});
    dispatch(clearFormDataStore({}));
  }

  const submitHandler = () => {
    dispatch(setFormDataStore(formData));
  }

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
                value={title}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
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
                value={status}
                autoComplete="status"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setStatus(e.target.value)}
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
              onClick={clearHandler}
            >
              Clear
            </button>
            <button
              type="submit"
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={submitHandler}
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
