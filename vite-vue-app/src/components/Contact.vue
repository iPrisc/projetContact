<template>
  <div class="contact">
    <label class="contact-info">
      <span class="name">
        <svg class="logoName" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/></svg>
        {{ pName }} 
      </span> 
      <span class="tel">
        <svg class="logoPhone" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/></svg> 
        {{ pPhone }} 
      </span> 
    </label>
    <button @click="deleteC" class="supp">Supprimer</button>
  </div>
</template>

<script setup>
const { pName, pPhone, pId } = defineProps({
  pName: String,
  pPhone: String,
  pId: String
});

const emits = defineEmits(["supp"])
const deleteC = () => {
    const contactForDelete = {
    name: pName,
    phone: pPhone,
    _id: pId,
  }
  emits("supp", contactForDelete)
} 
// console.log("name: " + props.name + " tel: " + props.tel)
</script>

<style scoped>
* {
  font-family: "Segoe UI";
}

.contact {
  border: 1px solid black;
  display: flex;
  background-color: rgb(223, 223, 223);
  padding: 5px;
  margin: 5px 0;
  border-radius: 5px;
}

.contact-info {
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
}

.supp {
  margin-left: auto;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.supp:hover {
  background-color: #d4d4d4;
  transition-duration: 0.3s;
}

span.name {
  width: 150px;
  text-align: left;
  margin-top: 1.5px;
}

span.tel {
  flex-grow: 1;
  text-align: left;
  margin-top: 1.5px;
}

.logoName, .logoPhone{
  margin-top: 1.5px;
  width: 13px;
  height: 13px;
}

</style>