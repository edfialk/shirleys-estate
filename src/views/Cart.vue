<template>
    <div>
        <NavBar :cart="cart" />
        <section class="section hero has-background-light is-fullheight-with-navbar">
            <div class="container is-widescreen">
                <h1 class="title has-text-centered">Shopping Cart</h1>
                <div class="box">
                    <article class="media" v-for="item in cart" :key="item.id">
                        <figure class="media-left">
                            <div class="image is-128x128" ref="image">
                                <!-- <img :src="item.pictures[0].src" v-if="item.pictures.length > 0"> -->
                            </div>
                        </figure>
                        <div class="media-content">
                            <div class="content">
                                <h2 class="subtitle">
                                    <router-link :to="'/i/' + item.id" class="has-text-dark">{{ item.name }}</router-link>
                                </h2>
                            </div>
                            <div class="is-flex-desktop is-spacebetween">
                                <div>
                                    {{ item.price | currency }}
                                </div>
                                <div>
                                    <button class="button mr-top-1-mobile" @click='$emit("removeFromCart", item)'>Remove</button>
                                </div>
                            </div>
                        </div>
                    </article>
                    <div v-if="cart.length == 0">
                        <h2 class="subtitle">You don't have anything in your cart.</h2>
                        <h2 class="subtitle"><router-link to="/">Browse Our Items</router-link> to buy something.</h2>
                    </div>
                </div>
                <div class="box" v-if="cart.length > 0">
                    <div class="is-flex is-spacebetween">
                        <div>Total</div>
                        <div>{{ price | currency }}</div>
                    </div>
                </div>
                <button
                    type="button"
                    class="button is-large is-primary is-fullwidth"
                    v-show="!showContactForm && cart.length > 0"
                    @click="onShowContactForm">CHECK OUT</button>
                <div class="box" id="contactForm" v-show="showContactForm">
                    <form @submit="onCheckOut">
                        <div class="field">
                            <label class="label">Your Name, please:</label>
                            <div class="control">
                                <input
                                    type="text"
                                    class="input"
                                    placeholder="e.g. Alex Smith"
                                    v-focus
                                    v-model="name"
                                    id="name"
                                    required>
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">Your Email Address or Telephone Number:</label>
                            <div class="control">
                                <input
                                    type="text"
                                    class="input"
                                    placeholder="e.g. Alex.Smith@mail.com"
                                    v-model="contact"
                                    required>
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">I would like to meet you at <a href="https://goo.gl/maps/T8b9XMhAkxt">The Mountain Brook Police Department</a> during the day. If you have a time or day preference, or anything else you would like to say, please let me know here:</label>
                            <textarea
                                name="message"
                                class="textarea"
                                v-model="message"
                                placeholder="e.g. Wednesday 12-1 or Saturday 3-5 works for me."></textarea>
                        </div>
                        <button type="submit" class="button is-large is-primary is-fullwidth" @click="onCheckOut">CHECK OUT</button>
                    </form>
                </div>
            </div>
        </section>
    </div>
</template>

<script>

import swal from 'sweetalert';
import NavBar from '../components/NavBar';

export default {

    props: ["cart"],

    components: { NavBar },

    data() {
        return {
            showContactForm: false,
            name: 'Test Name',
            contact: 'edfialk@gmail.com',
            message: 'Test Message'
        }
    },

    computed: {
        price() {
            return this.cart.reduce((price, item) => {
                return price + parseFloat(item.price);
            }, 0);
        }
    },

    mounted() {
         this.$refs.image.forEach((img, i) => {
            if (this.cart[i].pictures && this.cart[i].pictures[0].src)
                img.style.backgroundImage = "url('" + this.cart[i].pictures[0].src + "')";
         }, this);
    },

    methods: {
        onShowContactForm() {
            this.showContactForm = true;
            window.setTimeout(() => {
                document.querySelector('#name').focus();
                window.scrollTo({
                    'top' : document.querySelector('#contactForm').offsetTop,
                    left: 0,
                    'behavior': 'smooth'
                });
            }, 0);
        },
        onCheckOut(e) {
            if (!this.name || !this.contact){
                return false;
            }

            e.preventDefault();

            const items = this.cart.map(item => {
                return item.name + ' for ' + this.$options.filters.currency(item.price);
            }).join("<br>\n");

            let total = this.cart.reduce( (acc, item) => {
                return acc + parseFloat(item.price)
            }, 0);
            total = this.$options.filters.currency(total);

            fetch('https://mailthis.to/edfialk@gmail.com', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: this.name,
                    contact: this.contact,
                    message: this.message,
                    items: "<br>" + items,
                    total,
                    _subject: "[Shirley's Estate] Someone wants to buy something!",
                    _after: "http://192.168.88.253:8080"
                }),
            }).then(res => {
                //clear cart
                //this.$emit('clearCart');

                location.href = 'https://mailthis.to/confirm';
            });
        }
    }

}

</script>

<style lang="scss" scoped>
    .subtitle {
        font-size: 1.5rem;
    }
    .item + .item {
        border-top: 1px solid #EEE;
    }
    .item img {
        max-height: 200px;
        width: auto;
        margin: 0 auto;
    }
    .image {
        background-size: cover;
        background-position: center;
    }
    @media screen and (max-width: 1279px){
        .container.is-widescreen {
            margin: 0;
        }
    }
</style>
