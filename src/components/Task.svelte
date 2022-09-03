<script lang="ts">
    import { CheckCircle, Circle, Trash } from 'phosphor-svelte';
    import type { ITask } from "src/interfaces/ITask";
    import { createEventDispatcher } from 'svelte'
    export let task: ITask

    const dispath = createEventDispatcher();

    function deleteTask() {
        dispath('delete', task.id)    
    }

    function toogle() {
        dispath('toggle', task.id)
    }

</script>
<div class="wrapper">
    <div class="task">
        <label>
            <input type="checkbox" name="task" bind:checked={task.isDone} on:click={toogle} />
            {#if task.isDone} 
                <span class="checkIcon">
                    <CheckCircle size={24} /> 
                </span>
            {:else} 
                <span class="checkIcon">
                    <Circle size={24}/> 
                </span>
            {/if}
            <span class="labelText"> {task.label}</span>
        </label>
    </div>
    <button on:click={deleteTask}>
        <span class="trash">
            <Trash size={24} />
        </span>
    </button>
</div>

<style>
    .wrapper {
        width: 100%;
        border: 1px solid var(--gray-400);
        border-radius: 8px;
        padding: 1rem;
        background: var(--gray-500);

        box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.6);

        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .task {
        font-size: 0.875rem;
        color: var(--gray-100);
        line-height: 140%;
    }

    .task label {
        display: flex;
        align-items: center;
        cursor: pointer;
    }

    .task .labelText {
        padding: 0 0.75rem;
    }

    .task input[type="checkbox"] {
        display: none;
    }

    .task .checkIcon {
        color: var(--blue-300)
    }

    .task label input[type="checkbox"]:checked  + .checkIcon + .labelText {
        color: var(--gray-300);
        text-decoration: line-through;
    }

    .wrapper button {
        background: transparent;
        border: none;
        cursor: pointer;
    }
    .trash {
        color: var(--gray-300);
    }
</style>