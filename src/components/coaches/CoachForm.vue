<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !form.firstName.isValid }">
      <label for="firstname">First Name</label>
      <input
        type="text"
        id="firstname"
        v-model.trim="form.firstName.val"
        @blur="clearValidity('firstName')"
      />
      <p v-if="!form.firstName.isValid" :style="{ color: 'red' }">
        First name must not be empty.
      </p>
    </div>
    <div class="form-control" :class="{ invalid: !form.lastName.isValid }">
      <label for="lastname">Last Name</label>
      <input
        type="text"
        id="lastname"
        v-model.trim="form.lastName.val"
        @blur="clearValidity('lastName')"
      />
      <p v-if="!form.lastName.isValid" :style="{ color: 'red' }">
        Last name must not be empty.
      </p>
    </div>
    <div class="form-control" :class="{ invalid: !form.description.isValid }">
      <label for="description">Description</label>
      <textarea
        id="description"
        rows="5"
        v-model.trim="form.description.val"
        @blur="clearValidity('description')"
      ></textarea>
      <p v-if="!form.description.isValid" :style="{ color: 'red' }">
        Description must not be empty.
      </p>
    </div>
    <div class="form-control" :class="{ invalid: !form.hourlyRate.isValid }">
      <label for="rate">Hourly Rate</label>
      <input type="number" id="rate" v-model.number="form.hourlyRate.val" />
      <p v-if="!form.hourlyRate.isValid" :style="{ color: 'red' }">
        Rate must be greater than 0.
      </p>
    </div>
    <div class="form-control" :class="{ invalid: !form.areas.isValid }">
      <h3>Areas of expertise:</h3>
      <div>
        <input
          type="checkbox"
          name=""
          id="frontend"
          value="frontend"
          v-model="form.areas.val"
          @blur="clearValidity('areas')"
        />
        <label for="frontend">Frontend Development</label>
      </div>
      <div>
        <input
          type="checkbox"
          name=""
          id="backend"
          value="backend"
          v-model="form.areas.val"
          @blur="clearValidity('areas')"
        />
        <label for="backend">Backend Development</label>
      </div>
      <div>
        <input
          type="checkbox"
          name=""
          id="career"
          value="career"
          v-model="form.areas.val"
          @blur="clearValidity('areas')"
        />
        <label for="career">Career Advisory</label>
      </div>
      <p v-if="!form.areas.isValid" :style="{ color: 'red' }">
        At least one expertise must be selected.
      </p>
    </div>
    <p v-if="!formIsValid" :style="{ color: 'red' }">
      Please fix the above errors and submit again.
    </p>
    <BaseButton>Register</BaseButton>
  </form>
</template>

<script>
  import BaseButton from "../ui/BaseButton.vue";

  export default {
    components: {
      BaseButton,
    },
    emits: ["saveData"],
    data() {
      return {
        form: {
          firstName: {
            val: "",
            isValid: true,
          },
          lastName: {
            val: "",
            isValid: true,
          },
          description: {
            val: "",
            isValid: true,
          },
          hourlyRate: {
            val: null,
            isValid: true,
          },
          areas: {
            val: [],
            isValid: true,
          },
        },
        formIsValid: true,
      };
    },
    methods: {
      validateForm() {
        this.formIsValid = true;

        const {
          firstName: { val: firstName },
          lastName: { val: lastName },
          description: { val: description },
          hourlyRate: { val: hourlyRate },
          areas: { val: areas },
        } = this.form;

        this.form.firstName.isValid = !!firstName;
        this.form.lastName.isValid = !!lastName;
        this.form.description.isValid = !!description;
        this.form.hourlyRate.isValid = hourlyRate && hourlyRate > 0;
        this.form.areas.isValid = areas && areas.length;

        this.setFormValidity();
      },
      submitForm() {
        this.validateForm();

        if (!this.formIsValid) return;

        this.$emit("saveData", {
          firstName: this.form.firstName.val,
          lastName: this.form.lastName.val,
          description: this.form.description.val,
          hourlyRate: this.form.hourlyRate.val,
          areas: this.form.areas.val,
        });
      },
      setFormValidity() {
        this.formIsValid = Object.entries(this.form).every(
          ([_, value]) => value.isValid
        );
      },
      clearValidity(inputName) {
        this.form[inputName].isValid = true;
      },
    },
  };
</script>

<style scoped>
  .form-control {
    margin: 0.5rem 0;
  }

  label {
    font-weight: bold;
    display: block;
    margin-bottom: 0.5rem;
  }

  input[type="checkbox"] + label {
    font-weight: normal;
    display: inline;
    margin: 0 0 0 0.5rem;
  }

  input,
  textarea {
    display: block;
    width: 100%;
    border: 1px solid #ccc;
    font: inherit;
  }

  input:focus,
  textarea:focus {
    background-color: #f0e6fd;
    outline: none;
    border-color: #3d008d;
  }

  input[type="checkbox"] {
    display: inline;
    width: auto;
    border: none;
  }

  input[type="checkbox"]:focus {
    outline: #3d008d solid 1px;
  }

  h3 {
    margin: 0.5rem 0;
    font-size: 1rem;
  }

  .invalid label {
    color: red;
  }

  .invalid input,
  .invalid textarea {
    border: 1px solid red;
  }
</style>
