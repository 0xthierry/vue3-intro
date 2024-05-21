const app = Vue.createApp({
  data() {
    return {
      cart: []
    }
  },
  methods: {
    addToCart(id) {
      this.cart.push(id)
    },
    removeFromCart(id) {
      this.cart.splice(this.cart.lastIndexOf(id), 1)
    }
  },
})