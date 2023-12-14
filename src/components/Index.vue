<script setup>

    import {ref, onMounted} from 'vue'
    import {db} from '../firebase.js'
    import {onSnapshot, collection, addDoc, query, orderBy } from 'firebase/firestore'
    import Chart from 'chart.js/auto'
    import {format, fromUnixTime} from 'date-fns'
    const tab = ref(null)
    const newTask = ref('')
    const completedTasks = ref(0)
    const remainingTasks = ref(0)
    const weightChartRef = ref(null)
    const tasks = ref([])
    let task_id = 1
    let chart

    const create = () => {
        tasks.value.push({
            task_id: task_id++,
            name: newTask.value,
            is_completed: false
        })
        newTask.value = ''
        remainingTasks.value = tasks.value.filter(task => task.is_completed === false).length
    }
    
    const completeTask = (task) => {
        task.is_completed = !task.is_completed
        completedTasks.value = tasks.value.filter(task => task.is_completed === true).length
        remainingTasks.value = tasks.value.filter(task => task.is_completed === false).length
    }

    const homeRef = ref(null)
    const aboutRef = ref(null)
    const todoListRef = ref(null)
    const contactRef = ref(null)
    const appRef = ref(null)
    const myWeights = ref([])

    const scrollToSection = (sectionRef) => {
        const section = sectionRef === 'home' ? homeRef.value :
                        sectionRef === 'about' ? aboutRef.value :
                        sectionRef === 'todo-list' ? todoListRef.value :
                        appRef.value;

            if (section) {
                section.scrollIntoView({ behavior: 'smooth' })
            }
    }

    const weightsCollection = ref(null)

    onMounted(() => {
        const q = query(collection(db, 'weights'), orderBy('date', 'desc'))
        onSnapshot(q, (querySnapshot) => {
                const chartData = []
                const chartLabels = []
                const weights = []
                querySnapshot.forEach((doc) => {

                    const date = fromUnixTime(doc.data().date.seconds)
                    weights.push({
                        id: doc.data().id,
                        weight: doc.data().weight,
                        date: format(date, 'PPPpp')
                    })
                    chartData.push(doc.data().weight)
                    chartLabels.push(format(date, 'MMM d, yyy'))
                })

                weightsCollection.value = weights
                chart.data.datasets[0].data = chartData
                chart.data.labels = chartLabels
                chart.update()
            })

        chart = new Chart(weightChartRef.value.getContext('2d'), {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Your weights in a chart',
                data: [],
                borderWidth: 1
            }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        })

    })

    const inputWeight = ref(null)
    const loading = ref(false)
    function submit() {
        loading.value = true
        addDoc(collection(db, 'weights'), {
            weight: inputWeight.value,
            date: new Date()
        }).then(() => {
            loading.value = false
            inputWeight.value = ''
        })
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
        <a @click="scrollToSection('app')" style="--i: 4">
            <v-btn>MyApp</v-btn>
        </a>
    </v-app-bar>

    <div>
      
  
      <section ref="homeRef" class="home">
            <v-card height="500" style="margin-top: 4%;">
                <v-row justify="center">
                    <v-col cols="6">
                        <div class="text-center" style="margin-top: 20%">
                            <p class="text-h3">I am Fiel Boy Aton</p>
                            <v-btn icon="mdi-facebook" class="me-2"></v-btn>
                            <v-btn icon="mdi-instagram" class="me-2"></v-btn>
                            <v-btn icon="mdi-github"></v-btn>
                        </div>
                    </v-col>
                    <v-col cols="6">
                        <div style="margin-right: 30%;">
                            <v-avatar size="350">
                                <v-img
                                cover
                                src="https://scontent.fmnl4-4.fna.fbcdn.net/v/t1.15752-9/370137231_347932437580805_845520553573060983_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeFwh7pMfnwfwhNmEAr0booKEkW_v_U2pUcSRb-_9TalR2CQNJNrtmO0n_u_Or1uVJY38PMgtiuS95MnMDUOeUOr&_nc_ohc=yNS64_LHo3EAX_gVr7v&_nc_ht=scontent.fmnl4-4.fna&oh=03_AdTaFCqmBwZFpg0N6pyj8a871TiT5ljixkSMoSu3ZrwzNg&oe=65A20CDD"
                                ></v-img>
                            </v-avatar>
                        </div>
                    </v-col>
                
            </v-row>
            </v-card>
      </section>
  <v-divider class="my-4" />
      <section ref="aboutRef">
        <v-card height="500">
            <v-row>
                    <v-col cols="6">
                        <div style="margin-left: 40%;">
                            <v-avatar size="300">
                            <v-img cover src="https://scontent.fmnl4-4.fna.fbcdn.net/v/t1.15752-9/370137231_347932437580805_845520553573060983_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeFwh7pMfnwfwhNmEAr0booKEkW_v_U2pUcSRb-_9TalR2CQNJNrtmO0n_u_Or1uVJY38PMgtiuS95MnMDUOeUOr&_nc_ohc=yNS64_LHo3EAX_gVr7v&_nc_ht=scontent.fmnl4-4.fna&oh=03_AdTaFCqmBwZFpg0N6pyj8a871TiT5ljixkSMoSu3ZrwzNg&oe=65A20CDD"></v-img>
                        </v-avatar>
                        </div>
                    </v-col>
                    <v-col cols="6">
                        <p class="text-h4">About me</p>
                        <p class="text-h6"> Name: Fiel Boy A. Aton <br>
                            Age: 25 <br>
                            Sex: Male <br>
                            Status: Single <br>
                            Contact number: 09123456798 <br>
                            Motto: Nothing last forever, we can change the future.</p>
                    </v-col>
                    
            </v-row>
        </v-card>
      </section>
  
      <section ref="todoListRef" class="todo-list bg-grey-lighten-3 pa-2">
            <v-card title="Todo list app" class="text-center " width="69%" style="margin: auto; margin-top: 50px; margin-bottom: 50px;">
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
  
      <section ref="appRef" class="about">
        <v-card border title="Weight Tracker App" class="my-6" height="auto" width="50vw" style="margin: auto">
            <v-card-item>
                <v-text-field 
                    label="Enter your weight" 
                    type="number" 
                    clearable 
                    v-model="inputWeight" 
                    variant="solo-filled">
                </v-text-field>
                <v-row justify="end" class="mb-4">
                    <v-btn color="blue" :loading="loading" @click="submit()" class="me-4">Go</v-btn>
                </v-row>
                <v-divider></v-divider>
            </v-card-item>
            <v-card-item title="Weight History">
                <canvas ref="weightChartRef"></canvas>
            </v-card-item>
            <v-tabs v-model="tab" bg-color="grey">
                <v-tab value="one">Weight history</v-tab>
            </v-tabs>
            <v-card-text>
                <v-window v-model="tab">
                    <v-window-item value="one">
                        <v-list>
                            <v-list-item border  v-for="weight in weightsCollection" :key="weight">
                                <template v-slot:append>
                                    <p class="text-grey">{{ weight.date }}</p>
                                    <!-- <v-btn icon="mdi-delete" size="small" color="red" variant="text"></v-btn> -->
                                </template>
                                {{ weight.weight }}
                            </v-list-item>
                        </v-list>
                    </v-window-item>
                </v-window>
            </v-card-text>
        </v-card>
      </section>
    </div>
  </template>
  