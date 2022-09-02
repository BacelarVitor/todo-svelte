<script>
    import '../global.css' 
    import  Header from '../components/header.svelte' 
    import tasks from '../stores/taskstore'


</script>

<Header />
<div class="wrapper">
    <Input onCreateTask={handleNewTask} />
    <main>
    <TodoList tasks={tasks} handleCheckTask={checkTask} handleDeleteTask={deleteTask} />
    </main>
</div>

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