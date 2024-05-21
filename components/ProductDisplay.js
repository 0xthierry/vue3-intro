app.component('product-display', {
  props: {
    cart: {
      type: Array,
      required: true
    }
  },
  template: 
  /*html*/
  `<div class="product-display">
  <div class="product-container">
    <div class="product-image">
      <!--or :src="image" :alt="description" it's a shorthand-->
      <img v-bind:src="image" :class="[inventory <= 0 ? 'out-of-stock-img' : '']" :alt="description" />
    </div>
    <div class="product-info">
      <h1>{{title}}</h1>
      <p v-if="onSale && inStock">{{onSaleMessage}}</p>
      <p v-if="inventory > 10">In Stock</p>
      <p v-else-if="inventory <= 10 && inStock">Almost sold out!</p>
      <p v-else>Out of Stock</p>
      <p>{{description}}</p>
      <ul v-if="details.length">
        <li v-for="detail in details">{{detail}}</li>
      </ul>
      <div>
        <div v-for="(variant, index) in variants" :key="variant.id" class="color-circle" :style="{'backgroundColor':variant.color, cursor: 'pointer'}" @mouseover="updateVariant(index)"></div>
      </div>
      <span v-for="size in sizes" :key="size">{{size}}</span>
      <!--or @click="addToCart"-->
      <!--disabledButton is a classname or also :class="[cart === 0 ? 'disabledButton' : '']"-->
      <button class="button" :class="{disabledButton: !inStock}" v-on:click="addToCart" :disabled="!inStock">Add to Cart</button>
      <button class="button" :class="{disabledButton: cart === 0}" v-on:click="removeFromCart">Remove from Cart</button>
    </div>
  </div>
  <a :href="url" target="_blank" class="button">Search on Google</a>
  <review-list v-show="reviews.length" :reviews="reviews"></review-list>
  <review-form @review-submitted="addReview"></review-form>
</div>`,
  data() {
    return {
      product: 'Socks',
      description: 'A pair of warm, fuzzy socks',
      image: './assets/images/socks_blue.jpg',
      url: 'https://google.com',
      brand: 'Vue Mastery',
      inventory: 15,
      selectedVariant: 0,
      onSale: true,
      details: ['50% cotton', '30% wool', '20% polyester'],
      variants: [
        { id: 1, color: 'green', image: './assets/images/socks_green.jpg', quantity: 10 },
        { id: 2, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 0 }
      ],
      sizes: ['S', 'M', 'L'],
      reviews: []
    }
  },
  methods: {
    addToCart() {
      if (this.inventory > 0) {
        this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
        this.inventory -= 1
      }
    },
    updateVariant(index) {
      const variant = this.variants[index]

      this.selectedVariant = index
      this.inventory = variant.quantity
      this.image = variant.image
    },
    removeFromCart() {
      if (this.cart.length > 0) {
        this.$emit('remove-from-cart', this.variants[this.selectedVariant].id)
        this.inventory += 1
      }
    },
    addReview(review) {
      this.reviews.push(review)
    }
  },
  computed: {
    title() {
      return this.brand + ' ' + this.product
    },
    inStock() {
      return this.inventory > 0
    },
    onSaleMessage() {
      if (this.onSale) {
        return this.brand + ' ' + this.product + ' are on sale!'
      }
      return this.brand + ' ' + this.product + ' are not on sale!'
    }
  },
})