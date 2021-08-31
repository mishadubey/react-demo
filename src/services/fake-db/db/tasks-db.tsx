import _ from 'lodash';
import sub from 'date-fns/sub';
import getUnixTime from 'date-fns/getUnixTime';
import add from 'date-fns/add';
import parse from 'date-fns/parse';
import isValid from 'date-fns/isValid';
import mock from '../mock';
import { AxiosRequestConfig } from 'axios';

const tasksDb = {
  records: [
    {
      id: '2837273da9b93dd84243s0f9',
      name: 'Update generators',
      status: 'Client Review',
      department: 'Development',
      location: 'Remote',
      dueDate: getUnixTime(sub(new Date(), { days: 15 }))
    },
    {
      id: '5603a2a3cab0c8300f6096b3',
      name: 'Change background colors',
      status: 'Done',
      department: 'Design',
      location: 'Remote',
      dueDate: getUnixTime(sub(new Date(), { days: 15 }))
    },
    {
      id: '5637273da9b93bb84743a0f9',
      name: 'Fix splash screen bugs',
      status: 'Done',
      department: 'Development',
      location: 'Remote',
      dueDate: getUnixTime(sub(new Date(), { days: 10 }))
    },
    {
      id: 'd9005a4b89ed2aa7ca48a6ad',
      name: 'Add alternative authentication pages',
      status: 'Internal QA',
      department: 'Development',
      location: 'Remote',
      dueDate: getUnixTime(sub(new Date(), { days: 8 }))
    },
    {
      id: '5787b7e4740c57bf0df7d5b6',
      name: 'Fix the console',
      status: 'Client Review',
      department: 'Development',
      location: 'Remote',
      dueDate: getUnixTime(sub(new Date(), { days: 5 }))
    },
    {
      id: 'f6b9d7a9247e5d794a081927',
      name: 'New media player',
      status: 'Internal QA',
      department: 'Development',
      location: 'Remote',
      dueDate: getUnixTime(sub(new Date(), { days: 4 }))
    },
    {
      id: 'f6b9d7a9247e5d794a081947',
      name: 'Memory Leak',
      status: 'Internal QA',
      department: 'Development',
      location: 'Remote',
      dueDate: getUnixTime(sub(new Date(), { days: 3 }))
    },
    {
      id: '3f6b9d7a9247e5d794a0819',
      name: 'Broken toolbar on profile page',
      status: 'Client Review',
      department: 'Development',
      location: 'Remote',
      dueDate: getUnixTime(add(new Date(), { days: 1 }))
    },
    {
      id: '612a5c73075b6646dea5758f',
      name: 'Button hover style',
      status: 'In Progress',
      department: 'Design',
      location: 'Remote',
      dueDate: getUnixTime(add(new Date(), { days: 3 }))
    },
    {
      id: '612a5c6f6855c4b70bb9c4f3',
      name: 'New header designs',
      status: 'In Progress',
      department: 'Design',
      location: 'Remote',
      dueDate: getUnixTime(add(new Date(), { days: 3 }))
    },
    {
      id: '612a5c690e862b2d127f13a5',
      name: 'Fixed footer',
      status: 'In Progress',
      department: 'Development',
      location: 'Remote',
      dueDate: getUnixTime(add(new Date(), { days: 5 }))
    },
    {
      id: '612a5c6321f14a29caf7b3a2',
      name: 'Collapsable navigation',
      status: 'To Do',
      department: 'Development',
      location: 'Remote',
      dueDate: getUnixTime(add(new Date(), { days: 8 }))
    },
    {
      id: '612a5c5e89867e6daf49015f',
      name: 'Mail app new layout',
      status: 'To Do',
      department: 'Design',
      location: 'Remote',
      dueDate: getUnixTime(add(new Date(), { days: 10 }))
    },
    {
      id: '612a5c5976a36479254592c3',
      name: 'API recover and monitoring',
      status: 'To Do',
      department: 'Development',
      location: 'Remote',
      dueDate: getUnixTime(add(new Date(), { days: 10 }))
    },
    {
      id: '6a36475976a36479254592c3',
      name: 'Calendar App Design',
      status: 'To Do',
      department: 'Design',
      location: 'Remote',
      dueDate: getUnixTime(add(new Date(), { days: 10 }))
    },
    {
      id: 'caf7b75976a36479254592c3',
      name: 'Tax Reports',
      status: 'To Do',
      department: 'Development',
      location: 'Remote',
      dueDate: getUnixTime(add(new Date(), { days: 12 }))
    }
  ],
};

mock.onGet('/api/tasks').reply((request: AxiosRequestConfig) => {
  let response = tasksDb.records;

  const data = request?.data ? JSON.parse(request.data) : {};

  const title = data?.title || '';
  if (title) {
    let searchArray = title.trim().split(' ');
    let regExp = new RegExp(searchArray.join('|'), 'i');
    response = _.filter(response, task => regExp.test(task.name));
  }

  const status = data?.status || '';
  if (status) {
    response = _.filter(response, task => task.status === status);
  }

  const dueFrom = data?.dueDateFrom ? data?.dueDateFrom : null;
  const dueTo = data?.dueDateTo ? data?.dueDateTo : null;
  const dueDateFrom = dueFrom ? parse(dueFrom + ' 00:00:00', 'MM/dd/yyyy HH:mm:ss', new Date()): 0;
  const dueDateTo = dueTo ? parse(dueTo + ' 23:59:59', 'MM/dd/yyyy HH:mm:ss', new Date()) : 0;
  if (dueDateFrom && dueDateTo && isValid(dueDateFrom) && isValid(dueDateTo)) {
    response = _.filter(response, task => (task.dueDate > getUnixTime(dueDateFrom) && task.dueDate < getUnixTime(dueDateTo)));
  } else if (dueDateFrom && isValid(dueDateFrom)) {
    response = _.filter(response, task => (task.dueDate > getUnixTime(dueDateFrom)));
  } else if (dueDateTo && isValid(dueDateTo)) {
    response = _.filter(response, task => (task.dueDate < getUnixTime(dueDateTo)));
  }

  return [200, response];
});
