import React, { useEffect, useState } from 'react';
import Layout from '../../layouts';
import Wrapper from './wrapper';
import Search from './search';
import List from './list';
import TaskService from '../../services/task';
import ITask from '../../types/task';

const Tasks: React.FC = () => {

  const [tasks, setTaskList] = useState<ITask[]>([]);

  useEffect(() => {
    TaskService.getTasks()
      .then(response => {
        setTaskList(response.data);
      });
  }, []);

  return (
    <Layout hideHeader hideFooter>
      <Wrapper>
        <Search />
        <List tasks={tasks} />
      </Wrapper>
    </Layout>
  );
};

export default Tasks;
