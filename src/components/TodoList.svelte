<script lang="ts">
    import type { ITask } from "src/interfaces/ITask";
    import { createEventDispatcher } from "svelte";
    import Task from "./Task.svelte";
    export let tasks: ITask[]; 

    const dispath = createEventDispatcher();

    function deleteTask(event: CustomEvent) {
        dispath('delete', event.detail)
    }

    function check(event: CustomEvent) {
        const taskId = event.detail
        dispath('checkTask', taskId)
    }
</script>


<div class="wrapper">
    <div class="info">    
        <p>Tarefas criadas <span>{tasks.length}</span></p>
        <p>
            Concluídas <span>
                {tasks.filter(t => t.isDone)?.length + ' de ' + tasks.length}
            </span>
        </p>
    </div>
    <div class="tasks">
        {#if tasks.length} 
            {#each tasks as task}
                <Task 
                    task={task} 
                    on:delete={deleteTask} 
                    on:toggle={check} 
                />
            {/each}
        {:else}
            <div class="empty">
                <span>
                    Você ainda não tem tarefas cadastradas
                </span>
                <span>
                    Crie tarefas e organize seus itens a fazer
                </span>
            </div>
        {/if}
    </div> 
</div>

<style>
    .wrapper {
        display: grid;   
        align-items: center;
        width: 100%;
        gap: 1.5rem;
        margin-top: 5.625rem;
    }

    .info {
        display: flex;
        justify-content: space-between;
    }

    .info span {
        color: var(--gray-100);
        background-color: var(--gray-400);
        padding: 0.125rem 0.5rem;
        border-radius: 62.4rem;
    }

    .info p:nth-child(2) {
        color: var(--purple-300);
    } 

    .tasks {
        padding-top: 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .empty {
        display: flex; 
        justify-content: center;
        align-items: center;
        background: url(assets/clipboard.svg) no-repeat center;
        height: 15.25rem;
        flex-direction: column;
        padding: 4rem 1.5rem;

        border-top: 1px solid var(--gray-400);
        border-radius: 8px;
    }

    .empty span {
        display: block;
        line-height: 1.4rem;
        color: var(--gray-300);
    }

    .empty span:nth-child(1) {
        font-weight: bold;
        padding-top: 8.5rem;
    }

    @media (max-width: 768px) {
        .wrapper{
            margin-top: 7rem; 
        }
    }
</style>