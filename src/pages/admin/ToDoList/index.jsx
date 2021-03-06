import React, { useState, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import { Form, Input, Button } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

import TaskItem from "./components/TaskItem";

const ToDoList = () => {
  const [taskList, setTaskList] = useState([]);
  const [count, setCount] = useState(0);

  const [addTaskForm] = Form.useForm();

  const handleAddTask = (values) => {
    setTaskList([
      {
        id: uuidv4(),
        title: values.title,
        description: values.description,
      },
      ...taskList,
    ]);
    addTaskForm.resetFields();
  };

  const handleEditTask = (values, index) => {
    const newTaskList = [...taskList];
    newTaskList.splice(index, 1, values);
    setTaskList(newTaskList);
  };

  const handleDeleteTask = (index) => {
    const newTaskList = [...taskList];
    newTaskList.splice(index, 1);
    setTaskList(newTaskList);
  };

  const renderCount = useMemo(() => {
    return (
      <Input.Group compact>
        <Button
          icon={<MinusOutlined />}
          onClick={() => setCount(count - 1)}
        ></Button>
        <Input value={count} style={{ width: 100 }} readOnly />
        <Button
          icon={<PlusOutlined />}
          onClick={() => setCount(count + 1)}
        ></Button>
      </Input.Group>
    );
  }, [count]);

  const renderTaskList = useMemo(() => {
    return taskList.map((item, index) => {
      return (
        <TaskItem
          key={item.id}
          title={item.title}
          description={item.description}
          index={index}
          handleEditTask={handleEditTask}
          handleDeleteTask={handleDeleteTask}
        />
      );
    });
  }, [taskList]);

  return (
    <div>
      <h2>To Do List</h2>
      {renderCount}
      <Form
        form={addTaskForm}
        name="todolistForm"
        layout="vertical"
        initialValues={{
          title: "",
          description: "",
        }}
        onFinish={(values) => handleAddTask(values)}
      >
        <Form.Item
          label="Ti??u ?????"
          name="title"
          validateFirst
          rules={[
            {
              required: true,
              message: "Vui l??ng nh???p ti??u ?????!",
            },
          ]}
        >
          <Input placeholder="Ti??u ?????" />
        </Form.Item>

        <Form.Item
          label="N???i dung"
          name="description"
          rules={[
            {
              required: true,
              message: "Vui l??ng nh???p n???i dung!",
            },
          ]}
        >
          <Input.TextArea
            placeholder="N???i dung"
            autoSize={{ minRows: 2, maxRows: 6 }}
          />
        </Form.Item>

        <Button type="primary" block htmlType="submit">
          Th??m
        </Button>
      </Form>
      {renderTaskList}
    </div>
  );
};

export default ToDoList;
