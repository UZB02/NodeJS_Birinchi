<script setup>
import axios from "axios";
import { ref } from "vue";

const visible = ref(false);

import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Toast from "primevue/toast";
import ConfirmPopup from 'primevue/confirmpopup';
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

const confirm = useConfirm();
const toast = useToast();

const confirm2 = (event) => {
    confirm.require({
        target: event.currentTarget,
        message: 'Do you want to delete this record?',
        icon: 'pi pi-info-circle',
        rejectProps: {
            label: 'Cancel',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: 'Delete',
            severity: 'danger'
        },
        accept: () => {
            toast.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 3000 });
        },
        reject: () => {
            toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
};


const data = ref([]); 

const title= ref('');
const auther= ref('');
const edittitle= ref('');
const editauther= ref('');
const productID=ref()

async function getData() {
  try {
    const response = await axios.get("http://localhost:5000/api/books");
    data.value = response.data;
    console.log(response.data);
    
  } catch (error) {
    console.error("Xatolik yuz berdi:", error);
  }
}

getData();

async function addData() {
  if (title.value && auther.value) {
    const newBook = { title: title.value, author: auther.value };
    try {
      await axios.post("http://localhost:5000/api/books", newBook);
      getData(); // yangi ma'lumotlarni olish uchun
      title.value = ''; // inputni tozalash
      auther.value = ''; // inputni tozalash
    } catch (error) {
      console.error("Xatolik yuz berdi:", error);
    }
  }
}
async function deleteData(id) {
  try {
    await axios.delete(`http://localhost:5000/api/books/${id}`);
    getData(); 
  } catch (error) {
    console.error("Xatolik yuz berdi:", error);
  }
}
async function getIDData(id) {
  try {
    const res= await axios.get(`http://localhost:5000/api/edit/books/${id}`);
    console.log(res);
  } catch (error) {
    console.error("Xatolik yuz berdi:", error);
  }
}

function editModal(id){
  visible.value = true;
  productID.value=id;
  let book=data.value.find((item)=>item.id==id)
  edittitle.value=book.title;
  editauther.value=book.author;
}


async function editData(id){
  if (edittitle.value && editauther.value) {
    try {
      await axios.put(`http://localhost:5000/api/edit/books/${productID.value}`, 
      {
        title: edittitle.value,
        author: editauther.value,
      }
      );
      getData();
      visible.value = false;
      edittitle.value='';
      editauther.value='';
    } catch (error) {
      console.error("Xatolik yuz berdi:", error);
      visible.value=false
    }
  }
}

</script>

<template>
<section>
  <div class="container mx-auto my-0 p-3 flex flex-col gap-2 items-center justify-center">
     <div class="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
    <h1 class="text-2xl font-bold text-center text-gray-800 mb-4">Books</h1>
            <Dialog v-model:visible="visible" modal header="Edit Profile" :style="{ width: '25rem' }">
            <span class="text-surface-500 dark:text-surface-400 block mb-8">Update {{ edittitle }} </span>
            <div class="flex items-center gap-4 mb-4">
                <label for="title" class="font-semibold w-24">Title</label>
                <InputText id="title" v-model="edittitle" class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex items-center gap-4 mb-8">
                <label for="author" class="font-semibold w-24">Author</label>
                <InputText id="author" class="flex-auto" v-model="editauther" autocomplete="off" />
            </div>
            <div class="flex justify-end gap-2">
                <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
                <Button type="button" label="Edit" severity="info" @click="editData()"></Button>
            </div>
        </Dialog>
         <Toast />
    <ConfirmPopup></ConfirmPopup>
    <div class="grid gap-2">
    <span class="grid grid-cols-1 md:grid-cols-2 gap-2">
      <input
        id="todo-input"
        type="text"
        v-model="title"
        placeholder="Title"
        class="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
      />
      <input
        id="todo-input"
        type="text"
        placeholder="Author"
        v-model="auther"
        class="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
      />
    </span>
      <button
      @click="addData"
        class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Qo'shish
      </button>
    </div>
  </div>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
      <div v-for="(item,itemKey) in data" class='shadow-lg rounded-md flex flex-col'>
        <img src="https://cdn.culture.ru/images/a7d5c2ba-87af-51f8-9305-034fa71dd4a1" @click="getIDData(item.id)" alt="Book" class="rounded-t-md">
        <span class="p-2 rounded-md ">
        <h2 class="text-xl font-bold text-gray-800 mt-4">{{item.title}}</h2>
        <p class="text-gray-600">{{item.author }}</p>
        </span>
        <span class="p-2 rounded-md grid grid-cols-2 gap-2">
        <button type="" @click="confirm2($event)" class="bg-red-500 rounded-md text-white cursor-pointer transition-all duration-200 hover:scale-95">Delete</button>
        <button type="" 
        @click="editModal(item.id)"
        class="bg-slate-200 rounded-md cursor-pointer transition-all duration-200 hover:scale-95">Edit</button>
        </span>
      </div>
    </div>
  </div>
</section>
</template>