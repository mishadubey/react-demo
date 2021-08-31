import React from 'react';
import ITask from '../../types/task';
import format from 'date-fns/format';
import fromUnixTime from 'date-fns/fromUnixTime';
import getUnixTime from 'date-fns/getUnixTime';
import clsx from 'clsx';
import { Users, Clock } from 'react-feather';

interface IProps {
  tasks: Array<ITask>;
}

const List: React.FC<IProps> = ({ tasks }) => {
  return (
    <div className="mt-8 bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-100">
      <div className="bg-gray-50 px-4 py-5 sm:px-6">
        <h2 className="text-xl leading-6 font-medium text-gray-900">
          Results
        </h2>
      </div>
      <div className="px-4 py-4 sm:px-6">
          {tasks.length > 0 ?
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {tasks.map((task: ITask) => (
                      <li key={task.id}
                          className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200 hover:bg-gray-50">
                          <div className="px-4 py-4 sm:px-6">
                              <div className="flex items-center justify-between">
                                  <p className="text-sm font-semibold text-gray-700 truncate">
                                      {task.name}
                                  </p>
                                  <div className="ml-2 flex-shrink-0 flex">
                                      <span
                                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                        {task.status}
                                      </span>
                                  </div>
                              </div>
                              <div className="mt-2 sm:flex sm:justify-between">
                                  <div className="sm:flex">
                                      <p className="flex items-center text-sm text-gray-500">
                                          <Users className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"/>
                                          {task.department}
                                      </p>
                                  </div>
                                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                      <Clock className={clsx(
                                          'flex-shrink-0 mr-1.5 h-5 w-5',
                                          getUnixTime(new Date()) > task.dueDate
                                              ? 'text-red-400'
                                              : 'text-green-400'
                                      )}/>
                                      <p>
                                          {format(fromUnixTime(task.dueDate), 'MMM d, yyyy')}
                                      </p>
                                  </div>
                              </div>
                          </div>
                      </li>
                  ))}
              </ul> :
              <div className="text-base font-normal text-gray-700">No records found for your search. Try different or less specific search terms.</div>
          }
      </div>
    </div>
  );
};

export default List;
