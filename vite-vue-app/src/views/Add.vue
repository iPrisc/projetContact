<template>
  <b>Ajouter un contact</b>
  <form action="" @submit.prevent="addContact">
    <svg class="logoName" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/></svg>
    <input type="text" placeholder="Nom" v-model="contactName"><br>
    <svg class="logoPhone" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/></svg> 
    <input type="tel" placeholder="Tel" maxlength="10" v-model="contactPhone" @input="phoneInput"><br>
    <button class="add":disabled="contactName.length == 0 || contactPhone.length == 0">Ajouter</button>
  </form>
  <RouterLink to="/"> <button class="back">Retour</button> </RouterLink>
</template>

<script setup>

import { ref } from "vue"
import List from "./List.vue"
import { useRouter } from 'vue-router'

const contactName = ref("")
const contactPhone = ref("")
const router = useRouter();

function phoneInput(event) {
  const value = event.target.value
  const filteredValue = value.replace(/\D/g, "")
  contactPhone.value = filteredValue
}

async function addContact() {
  try {
    const newContactAdd = {
      name: contactName.value,
      phone: contactPhone.value
    };

    const response = await fetch("http://localhost:3000/add-contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newContactAdd)
    });

    if (!response.ok) {
      throw new Error("erreur!");
    }

    contactName.value = "";
    contactPhone.value = "";

    router.push('/')

  } catch (error) { console.log(error); }
};

</script>

<style scoped>
* {
  font-family: "Segoe UI";
}

form{
  padding: 5px;
  margin: 5px 0;
}

.add {
  border: none;
  border-radius: 5px;
  cursor: pointer;
  padding: 7px 15px;
  border: 1px solid black;
  margin: 5px 0 0 18px;
}

.add:hover {
  background-color: #d4d4d4;
  transition-duration: 0.3s;
}

.add:disabled {
  cursor: not-allowed;
  background-color: #f0f0f0;
  border-color: #cccccc;
}

.back {
  border: none;
  border-radius: 5px;
  cursor: pointer;
  padding: 7px 15px;
  border: 1px solid black;
}

input{
  margin: 5px;
  padding: 5px;
}

.logoName, .logoPhone{
  width: 13px;
  height: 13px;
}

</style>