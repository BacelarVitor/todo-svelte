<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { PlusCircle } from 'phosphor-svelte'

    const dispath = createEventDispatcher();
    let newTask: string = ''
    const handleCreateTask = (event: SubmitEvent) => {
        dispath('addTask', newTask)
        newTask = ''
    } 


</script>
<form on:submit|preventDefault={handleCreateTask} class="form">
    <input 
        class="input" 
        required
        bind:value={newTask}
        placeholder="Adicione uma nova tarefa" />
    
    <button 
        type="submit" 
        class="button">
            Criar 
            <PlusCircle size={16} />
    </button>
</form>

<style>
    .form {
        width: 100%;
        gap: 8px;
        display: flex;
        flex-direction: row;
        align-items: center;
        
        position: absolute;
        top: 11.68rem;
    }
    .input {
        padding: 1rem;
        color: var(--gray-300);
        background-color: var(--gray-500);
        border: 1px solid var(--gray-700);
        border-radius: 8px;
        width: 40rem;
    }

    .button {
        padding: 1rem;
        background-color: var(--blue-600);
        color: var(--gray-100);
        border-radius: 8px;
        border: none;
        cursor:pointer;

        display: flex;
        align-items: center;
        gap: 6px;
    }
    
    @media (max-width: 768px) {
        .form {
            max-width: 80%;
            flex-direction: column;
            justify-content: center;
        }

        .input {
            width: 100%;
        }

        .button {
            width: 100%;
            justify-content: center;
        }
    }
</style>