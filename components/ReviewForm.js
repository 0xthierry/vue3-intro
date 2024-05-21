// two way binding
app.component('review-form', {
  template: 
    /*html*/
    `<!--@submit.prevent the prevent (it's preventing refresh) is a modifier-->
    <form class="review-form" @submit.prevent="onSubmit">
      <h3>Leave a review</h3>
      <label for="name">Name:</label>
      <input id="name" v-model="name">

      <label for="review">Review:</label>      
      <textarea id="review" v-model="review"></textarea>

      <label for="rating">Rating:</label>
      <!--v-model.number parse the value to number, its know as a modifier-->
      <select id="rating" v-model.number="rating">
        <option>5</option>
        <option>4</option>
        <option>3</option>
        <option>2</option>
        <option>1</option>
      </select>

      <input class="button" type="submit" value="Submit">
    </form>
    `,
  data() {
    return {
      name: '',
      review: '',
      rating: null
    }
  },
  methods: {
    onSubmit() {
      if (this.name === '' || this.review === '' || this.rating === null) {
        alert('Review is incomplete. Please fill out every field.')
        return
      }

      let productReview = {
        name: this.name,
        review: this.review,
        rating: this.rating
      }

      this.$emit('review-submitted', productReview)

      this.name = ''
      this.review = ''
      this.rating = null
    }
  }
})