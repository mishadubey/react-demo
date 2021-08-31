import React, { useEffect, useState } from 'react';
import Layout from '../../layouts';
import Wrapper from './wrapper';
import Search from './search';
import List from './list';
import TaskService from '../../services/task';
import ITask from '../../types/task';
import { useAppSelector } from '../../store/hooks';
import { selectFormData, selectFormDataState } from '../../store/slices/tasks';

const Tasks: React.FC = () => {

  const [tasks, setTaskList] = useState<ITask[]>([]);

  const formData = useAppSelector(selectFormData);
  const formDataState = useAppSelector(selectFormDataState);

  useEffect(() => {
    TaskService.getTasks(formData)
      .then(response => {
        setTaskList(response.data);
      });
  }, [formDataState, formData]);

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
