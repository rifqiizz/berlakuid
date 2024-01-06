
import EditTaskForm from '@/components/dashboard/components/editTaskForm';


const Page = ({params}) => {
  const taskId = params.id;

  return (
    <div>
      <EditTaskForm taskId={taskId} />
    </div>
  );
}

export default Page;
