<template>
    <button class="button" :class="type" @click="handleClick">
      <slot></slot>
    </button>
  </template>
  
  <script>
  export default {
    name: 'Button',
    props: {
      type: {
        type: String,
        default: 'primary'
      }
    },
    methods: {
      handleClick() {
        this.$emit('click');
      }
    }
  };
  </script>
  
  <style scoped>
  .button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
  }
  .primary {
    background-color: #007bff;
    color: white;
  }
  .secondary {
    background-color: #6c757d;
    color: white;
  }
  .button:hover {
    opacity: 0.8;
  }
  </style>
  