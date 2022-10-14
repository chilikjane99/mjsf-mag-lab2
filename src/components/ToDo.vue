<template>
  <div class="todo">
    <div class="card text-left">
      <div class="card-header">
        ToDo Component
        <a-button @click="setCreatingModalVisible(true)">Create TODO</a-button>
      </div>
      <div class="card-body">
        <h5 class="card-title">My tasks</h5>
        <div class="card-text">
          <ul class="pt-3">
            <li v-for="(item, index) in filteredTaskList" :key="index" class="d-flex justify-content-between mb-3">
              <div>
                <h4 v-if="item.status === 'completed'"><s>{{ item.title }}</s></h4>
                <h4 v-else>{{ item.title }}</h4>
                <p>{{ item.description }}</p>
              </div>
              <button class="btn btn-primary" @click="toggleTaskStatus(item.idx, 'completed')">Compled</button>
            </li>
          </ul>
        </div>
        <div class="card-footer">
          <button class="btn" :class="{'btn-primary':!filterStatus}" @click="filterStatus = ''">All</button>
          <button class="btn" :class="{'btn-primary': filterStatus === 'completed'}"
                  @click="filterStatus = 'completed'">Completed
          </button>
          <button class="btn" :class="{'btn-primary': filterStatus === 'incompleted'}"
                  @click="filterStatus = 'incompleted'">InCompleted
          </button>
          Active tasks count: {{ taskList.length }}
        </div>
      </div>
    </div>
    <CreateTodoModal :visible="isCreatingModalVisible" @create="onCreateTodo"/>
  </div>
</template>

<script>
import CreateTodoModal from "./CreateTodoModal";
import {Task} from '../models/task';

export default {
  name: "ToDo",
  props: {},
  components: {
    CreateTodoModal
  },
  data: () => {
    return {
      taskList: [],
      renderFlag: false,
      filterStatus: "",
      isCreatingModalVisible: false
    }
  },
  methods: {
    render() {
      this.renderFlag = !this.renderFlag
    },
    submit() {
      this.taskList.push(this.model);
      this.model = new Task();
    },
    onCreateTodo(todo) {
      todo = new Task(todo)
      this.taskList.push(todo)
      this.isCreatingModalVisible = false
    },
    setCreatingModalVisible(visible) {
      this.isCreatingModalVisible = visible
    },
    toggleTaskStatus(idx, status) {
      this.taskList[idx].status = status
      this.render()
    },
  },
  computed: {
    filteredTaskList() {
      // just for trigger
      if (this.renderFlag == 'boolean') {
        return []
      }

      return this.taskList
          .map((item, index) => {
            item.idx = index

            if (!this.filterStatus || !item.status) return item;
            if (item.status !== this.filterStatus) {
              return null
            }
            return item
          })
          .filter((item) => !!item);
    }
  }

}
</script>

<style scoped>
.todo {
  background-color: aqua;
}
</style>
