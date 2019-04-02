<template>
  <div id="app">
    <router-view
      :cart="cart"
      @addToCart="addToCart"
      @removeFromCart="removeFromCart"
      @clearCart="clearCart"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      cart: []
    }
  },
  mounted() {
    if (localStorage.getItem('cart')){
      this.cart = JSON.parse(localStorage.getItem('cart'));
    }
  },
  methods: {
    addToCart(item) {
      if (this.cart.find( x => x.id == item.id)){
        return;
      }
      this.cart.push(item);
      this.saveCart();
    },
    removeFromCart(item) {
      this.cart = this.cart.filter(x => x.id !== item.id);
      this.saveCart();
    },
    clearCart() {
      this.cart = [];
      this.saveCart();
    },
    saveCart() {
      //i don't know why this is required, but stringify either skips ID or pictures without it
      const temp = [];
      this.cart.forEach(item => {
        const { id, name, description, price } = item;
        const tempItem = { id, name, description, price, pictures: [] };
        tempItem.pictures = item.pictures;
        temp.push(tempItem);
      }, this);
      localStorage.setItem('cart', JSON.stringify(temp));
    }
  }
}

</script>

<style lang="scss">

@import './styles/style.scss';

</style>
