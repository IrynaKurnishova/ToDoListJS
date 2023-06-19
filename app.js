const tasks = [
  {
    _id: '5d2ca9e2e03d40b326596aa7',
    completed: true,
    body:
      'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.',
  },
  {
    _id: '5d2ca9e29c8a94095c1288e0',
    completed: false,
    body:
      'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
      'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
  },
  {
    _id: '5d2ca9e2e03d40b3232496aa7',
    completed: true,
    body:
      'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.',
  },
  {
    _id: '5d2ca9e29c8a94095564788e0',
    completed: false,
    body:
      'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
      'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
  },
];

(function (arrOfTasks) {
  const objOfTasks = arrOfTasks.reduce((acc, task) => {
    acc[task._id] = task;
    return acc
  }, {});

  //Elements UI
  const listContainer = document.querySelector
    ('.tasks-list-section .list-group',
  );
  //находим до-элементы с помощью свойств
  const form = document.forms['addTask'];
  //форма добавления задачи addTask(свойство form)
  const inputTitle = form.elements['title'];
  //форма добавления title (свойство elements)
  const inputBody = form.elements['body'];
  //форма добавления body (свойство elements)

  
  //Events
  renderAllTasks(objOfTasks);
  form.addEventListener('submit', onFormSubmitHandler);
//к форме добавляем обработчик события и передаем функцию
  // submit вызывает перезагрузку страницы поэтому в
  //функции обработчике вызываем метод e.preventDefault()
  listContainer.addEventListener('click', onDeleteHandler)
  //повесили обработчик на весь список в которм 
  //генерятся все задачи
  

  function renderAllTasks(tasksList) {
    if (!tasksList) {
      console.error('please pass the taskslist');
      return;
    }
    const fragment = document.createDocumentFragment();
    //создаем фрагмент куда будем передавать все 
    //задачи с дом элементами которые сгенерируем позже
    Object.values(tasksList).forEach(task => {
       //с помощью object.values получаем все значения 
    //объекта в виде массива для того чтобы перебрать
      const li = listItemTemplate(task);
      fragment.appendChild(li);
    });
    listContainer.appendChild(fragment);   
  }

  function listItemTemplate({_id,title,body} = {}) {
    const li = document.createElement('li');
    li.classList.add(
      'list-group-item',
      'd-flex',
      'align-items-center',
      'flex-wrap',
      'mt-2',
    );
    li.setAttribute('data-task-id', _id)
    //создание нового атрибута для ли 
    const span = document.createElement('span');
    span.textContent = title;
    span.style.fontWeight = "bold";

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Delete task";
    deleteBtn.classList.add('btn', 'btn-danger', 'ml-auto', 'delete-btn');

    const article = document.createElement('p');
    article.textContent = body;
    article.classList.add('mt-2', 'w-100');

    li.appendChild(span);
    li.appendChild(deleteBtn);
    li.appendChild(article);
    
    return li;
  }

  function onFormSubmitHandler(e) {
    e.preventDefault();// для прекращения перезагрузки страницы
    //внутри функции забираем 2 значения inputTitle и inputBody
    const titleValue = inputTitle.value;
    const bodyValue = inputBody.value;
    
    //проверяем есть ли эти значения,если их нет
    //функция прекращает работу и выдает alert
    if (!titleValue || !bodyValue) {
      alert('Please enter title and body');
      return
    }
    //создаем функцию которая создает новый объект задачи
    //в которую записывает title и body переданные из
    //обработчика
    const task = createNewTask(titleValue, bodyValue);
    // копию новой задачи получаем в переменной
    const listItem = listItemTemplate(task);
    //создаем новый дом объект(шаблон)
    // с помощью функции и 
    //переданных элементов таск
    listContainer.insertAdjacentElement("afterbegin", listItem);
    //добавляем этот шаблон с помощью метода insertAdjacentElement
    //в самое начало нашего списка задач
    form.reset();//очищаем форму после добавления
  }

  function createNewTask(title, body) { 
    const newTask = {
      title,
      body,
      completed: false,
      _id: `task-${Math.random()}`,// генерим рандомный айди
    };
    // функция отвечает за генерацию нового объекта задачи
    objOfTasks[newTask._id] = newTask; //который потом добавляем в список задач

    return { ...newTask }//возвращаем копию новой задачи 
    //в переменную task
  }

  function deleteTask(id) {
    const { title } = objOfTasks[id];
     const isConfirm = confirm(`Are you sure you want to delete task: ${title}`);
      //если ок - возвращает true,  если отмена - false
    if (!isConfirm) return isConfirm;// если нажимает отмена
    //функция прекращает свое действие
//если подтвердил
    delete objOfTasks[id];
    //удаляем задачу под переданным айди
    return isConfirm;
  }
  //создали функцию для удаления задачи,которую 
  //передаем в onDeleteHandler
  function deleteTaskFromHtml(confirmed,el) {
    if (!confirmed) return;//если подтверждения нет
    // то она возвращает 
  el.remove()// если подтверждение есть - удаляет
}

  function onDeleteHandler({target}) {
    if (target.classList.contains('delete-btn')) {
//нужно узнать айди задачи которую мы хотим удалить
//при создании одного эл списка добавляем на ли
//спец атрибут и записываем айди задачи в listItemTemplate
      const parent = target.closest('[data-task-id]');
      //ищем ближайшего родителя к элементу на котором произошел клик
      //это и будет li которой принадлежит задача и кнопка удалить
      const id = parent.dataset.taskId;
      //забираем айди той задачи которую хотим удалить 
      //в обьекте dataset находятся те атрибуты которые мы сами
      //создали с приставкой data,т.е.в нашем случае это
      // data-task-id , так как мы записали его через дефис
      //то в нашем объекте он будет храниться в кемел кейсе
      const confirmed = deleteTask(id);
      deleteTaskFromHtml(confirmed, parent);//передаем parent в 
      //колбек функцию и проверяем confirmed
  }
  }
  
})(tasks);

