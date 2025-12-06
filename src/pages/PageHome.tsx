import Container from "../components/Container";
import TaskList from "../core-components/TaskList";
import TaskSummary from "../core-components/TaskSummary";

export default function PageHome() {
  return (
    <Container as="article" className="space-y-3">
      <header className="flex items-center justify-between">
        <TaskSummary />
      </header>

      <TaskList />
    </Container>
  );
}
