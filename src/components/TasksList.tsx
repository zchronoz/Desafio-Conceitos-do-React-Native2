import React from "react";
import {
  FlatList,
  Image,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatListProps,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

import { ItemWrapper } from "./ItemWrapper";

import trashIcon from "../assets/icons/trash/trash.png";
import editIcon from "../assets/icons/edit/edit.png";
import cancelIcon from "../assets/icons/cancel/cancel.png";

export interface Task {
  id: number;
  title: string;
  done: boolean;
  edit?: boolean;
}

interface TasksListProps {
  tasks: Task[];
  toggleTaskDone: (id: number) => void;
  toggleTaskEdit: (id: number) => void;
  handleEditTask: (id: number, newTaskTitle: string) => void;
  removeTask: (id: number) => void;
}

export function TasksList({
  tasks,
  toggleTaskDone,
  toggleTaskEdit,
  handleEditTask,
  removeTask,
}: TasksListProps) {
  const [newTaskTitle, setNewTaskTitle] = React.useState("");

  const handleToggleEdit = (id: number, taskTitle: string) => {
    toggleTaskEdit(id);
    setNewTaskTitle(taskTitle);
  };

  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
          <ItemWrapper index={index}>
            {item.edit ? (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "80%",
                }}
              >
                <View testID={`button-${index}`} style={styles.taskButton}>
                  <View
                    testID={`marker-${index}`}
                    style={
                      item.done ? styles.taskMarkerDone : styles.taskMarker
                    }
                  >
                    {item.done && <Icon name="check" size={12} color="#FFF" />}
                  </View>
                  <TextInput
                    onChangeText={(text) => setNewTaskTitle(text)}
                    onSubmitEditing={() =>
                      handleEditTask(item.id, newTaskTitle)
                    }
                    style={item.done ? styles.taskTextDone : styles.taskText}
                  >
                    {item.title}
                  </TextInput>
                </View>
                <TouchableOpacity
                  testID={`cancel-${index}`}
                  onPress={() => toggleTaskEdit(item.id)}
                >
                  <Image source={cancelIcon} />
                </TouchableOpacity>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "80%",
                }}
              >
                <TouchableOpacity
                  testID={`button-${index}`}
                  activeOpacity={0.7}
                  style={styles.taskButton}
                  onPress={() => toggleTaskDone(item.id)}
                >
                  <View
                    testID={`marker-${index}`}
                    style={
                      item.done ? styles.taskMarkerDone : styles.taskMarker
                    }
                  >
                    {item.done && <Icon name="check" size={12} color="#FFF" />}
                  </View>
                  <Text
                    style={item.done ? styles.taskTextDone : styles.taskText}
                  >
                    {item.title}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  testID={`edit-${index}`}
                  onPress={() => handleToggleEdit(item.id, item.title)}
                >
                  <Image source={editIcon} />
                </TouchableOpacity>
              </View>
            )}
            <TouchableOpacity
              testID={`trash-${index}`}
              style={{ paddingHorizontal: 24 }}
              onPress={() => removeTask(item.id)}
            >
              <Image source={trashIcon} />
            </TouchableOpacity>
          </ItemWrapper>
        );
      }}
      style={{
        marginTop: 32,
      }}
    />
  );
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
  viewButtons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
