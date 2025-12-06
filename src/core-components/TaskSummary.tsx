import Badge from "../components/Badge";
import Text from "../components/Text";
import useTasks from "../hooks/useTasks";

export default function TaskSummary() {
  const { completedTaskCount, tasksCount, isLoadingTasks } = useTasks();

  return (
    <>
      <div className="flex items-center gap-2">
        <Text variant="body-sm-bold" className="text-gray-300!">
          Created Tasks
        </Text>
        <Badge variant="secondary" loading={isLoadingTasks}>{tasksCount}</Badge>
      </div>
      <div className="flex items-center gap-2">
        <Text variant="body-sm-bold" className="text-gray-300!">
          Done
        </Text>
        <Badge variant="secondary" loading={isLoadingTasks}>{completedTaskCount} of {tasksCount}</Badge>
      </div>
    </>
  );
}
