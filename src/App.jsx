import SideBar from './components/SideBar.jsx';
import NewProject from './components/NewProject.jsx';
import NoProjectSelected from './components/NoProjectSelected.jsx';
import SelectedProject from './components/SelectedProject.jsx';

import { useState } from 'react';
function App() {
  //const [ showContent, setShowContent ]=useState(false);
  const [ projectState, setProjectState ]=useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  })

  function handleAddTask(text){
    setProjectState( prevState => {
      const taskId=Math.random();
      const newTask={
        text: text,
        projectId: prevState.selectedProjectId,
        id: taskId
      }
      return{
        ...prevState,
        tasks:[ newTask, ...prevState.tasks ]
      }
    }) 
  }

  function handleDeleteTask(id){
    setProjectState( prevState => {
      return{
        ...prevState,
        tasks: prevState.tasks.filter( (task) => task.id !== id  ) 
        // filter() will only return what is not dropped so the function yeilds true
        // cause the false ones are removed and true if we want to keep it so that !== to kepp the others.
      }
    })
  }

  function handleSelectProject(id){
    setProjectState( prevState => {
      return{
        ...prevState,
        selectedProjectId: id,
      }
    })
  }

  function handleCreatingProject(){
    setProjectState( prevState => {
      return{
        ...prevState,
        selectedProjectId: null,
      }
    })
  }

  function handleCanceltion(){
    setProjectState( prevState => {
      return{
        ...prevState,
        selectedProjectId: undefined,
      }
    })
  }

  function handleAddProject(projectData){
    setProjectState( prevState => {
      const newProject={
        ...projectData,
        id: Math.random()
      }
      return{
        ...prevState,
        selectedProjectId: undefined,
        projects:[...prevState.projects, newProject]
      }
    }) 
  }

  function handleDelete(){
    setProjectState( prevState => {
      return{
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(
          (project)=>{ project.id !== prevState.selectedProjectId }
        ) 
        // filter() will only return what is not dropped so the function yeilds true
        // cause the false ones are removed and true if we want to keep it so that !== to kepp the others.
      }
    })
  }

  const selectedProject=projectState.projects.find(project => project.id===projectState.selectedProjectId);
  const projectTasks=projectState.tasks.filter(task => task.projectId === projectState.selectedProjectId);

  let content=<SelectedProject
               project={selectedProject}
              onDelete={handleDelete} 
              onAddTask={handleAddTask}
              onDeleteTask={handleDeleteTask}
              tasks={projectTasks} />;

  if(projectState.selectedProjectId===undefined){
    content=<NoProjectSelected onSelected={handleCreatingProject} />
  }else if(projectState.selectedProjectId===null){
    content= <NewProject onCancel={handleCanceltion} onSave={handleAddProject} />
  }


  return (
    <main className="h-screen my-8 flex gap-8">
      <SideBar
      onSelected={handleCreatingProject}
      projects={projectState.projects}
      onSelectProject={handleSelectProject}
      selectedProjectId={projectState.selectedProjectId} />

      {content}
    </main>
  );
}

export default App;
