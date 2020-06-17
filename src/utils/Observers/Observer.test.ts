import { GroupSubject } from "utils/Observers/Group";
import { Task } from "utils/Observers/Task";

// Tests setup
const group = new GroupSubject();
const task = new Task("Task name");
group.attach(task);

test("Default state is right", () => {
  expect(group.getState()).toEqual(1);
  expect(task.isLocked()).toEqual(false);
  expect(task.getName()).toEqual("Task name");
});

test("Observer updates state and notifies subscribers", () => {
  let consoleOutput = [];
  const mockedWarn = (output: any) => consoleOutput.push(output);

  beforeEach(() => {
    console.log = mockedWarn;
  });

  group.update().then((state) => {
    expect(state).toEqual(1);
    expect(consoleOutput).toHaveLength(4);
    expect(consoleOutput.includes("Group: Updating...")).toBe(true);
    expect(consoleOutput.includes("Group: Updating...")).toBe(true);
    expect(task.isLocked()).toEqual(false);
  });
});

test("Task is locked when loading", () => {
  group.update();

  expect(group.getState()).toEqual(2);
  expect(task.isLocked()).toEqual(true);

  expect(task.getName()).toEqual("Task name");
  task.setName("testName");
  expect(task.getName()).toEqual("Task name");
});
