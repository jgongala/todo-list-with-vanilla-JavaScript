// selectors
const todo_input = document.querySelector('.todo-input');
const todo_btn = document.querySelector('.todo-btn');
const todo_list = document.querySelector('.todo-list');
const filter_option = document.querySelector('.filter-todo')


// event listeners
document.addEventListener('DOMContentLoaded', display_todo);
todo_btn.addEventListener('click', add_todo);
todo_list.addEventListener('click', delete_check);
filter_option.addEventListener('change', filter);


// functions
function add_todo(event){
    // prevent form from submitting
    event.preventDefault();
    
    // create todo-list-container
    const todo_list_container =  document.createElement('div');
    todo_list_container.classList.add('todo-list-container');

    // create li
    const new_todo = document.createElement('li');
    new_todo.innerText = todo_input.value;
    new_todo.classList.add('todo-item');
    todo_list_container.appendChild(new_todo);

    // add todo to local storage
    save_local(todo_input.value);

    // check mark button
    const completed_btn = document.createElement('button');
    completed_btn.innerHTML = '<i class="fas fa-check"></i>';
    completed_btn.classList.add('complete-btn');
    todo_list_container.appendChild(completed_btn);

    // delete button
    const delete_btn = document.createElement('button');
    delete_btn.innerHTML = '<i class="fas fa-trash"></i>';
    delete_btn.classList.add('delete-btn');
    todo_list_container.appendChild(delete_btn);
    
    // create and append todo list
    todo_list.appendChild(todo_list_container);
    
    // clear todo input value
    todo_input.value = "";
}

function delete_check(e){
    const item = e.target;

    // delete todo
    if (item.classList[0] === 'delete-btn'){
        const todo_item = item.parentElement;

        // animation
        todo_item.classList.add('fall-animation');
        delete_local_storage(todo_item);
        todo_item.addEventListener('transitionend', function(){
            todo_item.remove();
        });
    }

    // check mark
    if (item.classList[0] === 'complete-btn'){
        const todo_item = item.parentElement;
        todo_item.classList.toggle('completed');
    }
}

function filter(e){
    const todos = todo_list.childNodes;
    todos.forEach(function(todo_item){
        switch (e.target.value) {
            case 'all':
                todo_item.style.display = 'flex';
                break;
            case 'completed':
                if (todo_item.classList.contains('completed')){
                    todo_item.style.display = 'flex';
                } else {
                    todo_item.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if (!todo_item.classList.contains('completed')){
                    todo_item.style.display = 'flex';
                } else {
                    todo_item.style.display = 'none';
                }
                break;
        }
    });
}

function save_local(todo){
    // check for local storage
    let todos

    if (localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function display_todo(){
    let todos;

    if (localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo){
        // create todo-list-container
        const todo_list_container =  document.createElement('div');
        todo_list_container.classList.add('todo-list-container');

        // create li
        const new_todo = document.createElement('li');
        new_todo.innerText = todo;
        new_todo.classList.add('todo-item');
        todo_list_container.appendChild(new_todo);

        // check mark button
        const completed_btn = document.createElement('button');
        completed_btn.innerHTML = '<i class="fas fa-check"></i>';
        completed_btn.classList.add('complete-btn');
        todo_list_container.appendChild(completed_btn);

        // delete button
        const delete_btn = document.createElement('button');
        delete_btn.innerHTML = '<i class="fas fa-trash"></i>';
        delete_btn.classList.add('delete-btn');
        todo_list_container.appendChild(delete_btn);
        
        // create and append todo list
        todo_list.appendChild(todo_list_container);
    })
}

function delete_local_storage(todo){
    let todos;

    if (localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todo_index = todo.children[0].innerText;
    todos.splice(todos.indexOf(todo_index), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}