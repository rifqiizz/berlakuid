
import EditTaskForm from '@/components/dashboard/components/editTaskForm';


const Page = (params) => {
  const data = params.params.id;
  
  return (
    <div>
      <EditTaskForm taskParam={data} />
    </div>
  );
}

export default Page;
