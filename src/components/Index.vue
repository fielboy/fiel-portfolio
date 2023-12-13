<script setup>

import {ref} from 'vue'
const newTask = ref('')
const completedTasks = ref(0)
const remainingTasks = ref(0)
const tasks = ref([])
let task_id = 1

const create = () => {
    tasks.value.push({
        task_id: task_id++,
        name: newTask.value,
        is_completed: false
    })
    newTask.value = ''
    remainingTasks.value = tasks.value.filter(task => task.is_completed === false).length
}
``
const completeTask = (task) => {
    task.is_completed = !task.is_completed
    completedTasks.value = tasks.value.filter(task => task.is_completed === true).length
    remainingTasks.value = tasks.value.filter(task => task.is_completed === false).length
}

const homeRef = ref(null);
const aboutRef = ref(null);
const todoListRef = ref(null);
const contactRef = ref(null);
const appRef = ref(null);

const scrollToSection = (sectionRef) => {
    const section = sectionRef === 'home' ? homeRef.value :
                    sectionRef === 'about' ? aboutRef.value :
                    sectionRef === 'todo-list' ? todoListRef.value :
                    sectionRef === 'contact' ? contactRef.value :
                    appRef.value;

        if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        }
    }
</script>

<template>

    <v-app-bar>
        <v-app-bar-title>Porfolfio</v-app-bar-title>
        <a @click="scrollToSection('home')" style="--i: 1" class="active">
            <v-btn>Home</v-btn>
        </a>
        <a @click="scrollToSection('about')" style="--i: 2">
            <v-btn>About</v-btn>
        </a>
        <a @click="scrollToSection('todo-list')" style="--i: 3">
            <v-btn>Todo</v-btn>
        </a>
        <a @click="scrollToSection('contact')" style="--i: 5">
            <v-btn>Contact</v-btn>
        </a>
        <a @click="scrollToSection('app')" style="--i: 4">
            <v-btn>MyApp</v-btn>
        </a>
    </v-app-bar>

    <div>
      
  
      <section ref="homeRef" class="home">
        <v-card height="500" title="Home"></v-card>
      </section>
  
      <section ref="aboutRef" class="about">
        <v-card height="500" title="About"></v-card>
      </section>
  
      <section ref="todoListRef" class="todo-list">
        <v-card title="Todo list app" class="text-center" width="69%" style="margin: auto; margin-top: 5%; margin-bottom: 5%;">
        <v-card-item>
            <v-text-field v-model="newTask" @keydown.enter="create" label="What are you working on?">
            <template v-slot:append-inner>
                <v-fade-transition>
                    <v-tooltip text="Creates a new task">
                        <template v-slot:activator="{ props }">
                            <v-btn
                                icon="mdi-plus"
                                size="x-small"
                                v-bind="props"
                                v-show="newTask"
                                @click="create"
                            ></v-btn>
                        </template>
                    </v-tooltip>
                </v-fade-transition>
            </template>
        </v-text-field>
        <v-divider />
        <v-row class="mt-3">
            <v-col cols="4" class="my-2">
                Remaining: 
                <v-fade-transition leave-absolute>
                    <span :key="remainingTasks" class="text-red">
                        {{ remainingTasks }}
                    </span>
                </v-fade-transition>
            </v-col>
            <v-divider vertical class="my-2" />
            <v-col cols="4" class="my-2">
                Completed: 
                <v-fade-transition leave-absolute>
                    <span :key="completedTasks" class="text-success">
                        {{ completedTasks }}
                    </span>
                </v-fade-transition>
            </v-col>
            <v-col cols="4">
                <v-progress-circular v-show="tasks.length > 0" class="me-3 mt-2" color="success" :model-value="(completedTasks / tasks.length) * 100 ">
                </v-progress-circular>
            </v-col>
        </v-row>
        <v-divider class="mt-5" />

        <v-card class="mt-4" v-show="tasks.length > 0">
            <v-slide-y-transition group>
                <div v-for="task in tasks" :key="task.task_id">
                    <v-hover v-slot="{isHovering, props}">
                        <v-divider />
                        <v-list-item :class="isHovering ? 'bg-grey-lighten-3' : ''" v-bind="props">
                            <v-checkbox-btn @click="completeTask(task)" :label="task.name" :class="task.is_completed ? 'text-grey' : 'text-black'">
                            </v-checkbox-btn>
                            <template v-slot:append>
                                <v-fade-transition>
                                    <v-icon
                                        color="success"
                                        v-show="task.is_completed"
                                    >
                                        mdi-check
                                    </v-icon>
                                </v-fade-transition>
                            </template>
                        </v-list-item>
                    </v-hover>
                </div>
            </v-slide-y-transition>
        </v-card>
        </v-card-item>
    </v-card>
      </section>
  
      <section ref="contactRef" class="contact">
        <v-card height="500" title="Contact"></v-card>
      </section>
  
      <section ref="appRef" class="about">
        <v-card height="500" title="MyApp"></v-card>
      </section>
    </div>
  </template>
  