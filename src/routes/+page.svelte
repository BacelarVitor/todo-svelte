<script lang="ts">
    import '../global.css' 
    import  Header from '../components/header.svelte' 
    import TaskForm from '../components/TaskForm.svelte'
    import TodoList from '../components/TodoList.svelte';
    import tasks from '../stores/taskstore'

    function handleAddTask(event: CustomEvent) {
        const todo = event.detail;
        tasks.addTask(todo)
    }

    function handleCheckTask(event: CustomEvent) {
        const {taskId, currentState }= event.detail;
        tasks.checkTask(taskId, currentState)
    }

    function handleDeleteTask(event: CustomEvent) {
        const taskId = event.detail;
        tasks.deleteTask(taskId)
    }
</script>

<Header />
<div class="wrapper">
    <TaskForm on:addTask={handleAddTask}/>
    <main>
        <TodoList tasks={$tasks} on:checkTask={handleCheckTask} on:delete={handleDeleteTask} />
    </main>
</div>
<!--//s...37 -->
<style>
    .wrapper {
        max-width: 46rem;
        display: grid;
        align-items: center;
        margin: auto;
    }

    @media (max-width: 768px) {
        html {
            font-size: 87.5%;
        }
        .wrapper {
            max-width: 80%;
        }
    }

    @media (max-width: 320px) {
        .wrapper {
            max-width: 90%;
        }
    }
</style>