import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const newTask: Task = {
      id: tasks.length + 1,
      title: newTaskTitle,
      done: false,
    };
    setTasks([...tasks, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      task.done = !task.done;
      setTasks([...tasks]);
    }
  }

  function handleToggleTaskEdit(id: number) {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          task.edit = !task.edit;
        } else {
          task.edit = false;
        }
        return task;
      })
    );
  }

  function handleRemoveTask(id: number) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function handleEditTask(id: number, newTaskTitle: string) {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      task.title = newTaskTitle;
      task.edit = false;
      setTasks([...tasks]);
    }
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        toggleTaskEdit={handleToggleTaskEdit}
        handleEditTask={handleEditTask}
        removeTask={handleRemoveTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
