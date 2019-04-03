<template>
    <div>
        <NavBar :cart="cart" />
        <section class="section hero is-fullheight-with-navbar bg-lighter">
            <div v-if="item" class="container">
                <div class="columns is-flex is-reverse-touch">
                    <div class="column is-two-thirds-desktop pictures">
                        <carousel
                            :perPage="1"
                            :navigationEnabled="true"
                            paginationColor="#7b7b7b"
                            :navigationClickTargetSize="15"
                            v-if="item.pictures.length > 1">
                            <slide v-for="(picture, i) in item.pictures" :key="i">
                                <img :src="picture.src">
                            </slide>
                            <!-- navigationNextLabel='<i class="fa fa-chevron-right fa-3x" aria-hidden="true"></i>' -->
                        </carousel>
                        <img :src="item.pictures[0].src" v-else-if="item.pictures.length == 1">
                    </div>
                    <div class="column info">
                        <div class="box">
                            <h1 class="title">{{ item.name }}</h1>
                            <h2 class="subtitle">{{ item.description }}</h2>
                            <h2 class="subtitle">{{ item.price | currency }}</h2>
                            <div class="buttons">
                                <router-link
                                    :to="'/edit/' + item.id"
                                    class="button is-fullwidth"
                                    v-if="user"
                                    >Edit This Item</router-link>
                                <button
                                    class="button is-primary is-fullwidth"
                                    @click="addToCart"
                                    v-if="!isInCart"
                                    >I WOULD LIKE TO BUY THIS</button>
                                <button
                                    class="button is-fullwidth"
                                    @click="removeFromCart"
                                    v-if="isInCart"
                                    >I No Longer Want This</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/storage';
import db from '../db';
import NavBar from '../components/NavBar';
import { Carousel, Slide } from 'vue-carousel';
import swal from 'sweetalert';

export default {
    props: ["cart"],

    components: { NavBar, Carousel, Slide },

    data() {
        return {
            item: null,
            isInCart: false,
            user: firebase.auth().currentUser,
            activePicture: null
        };
    },

    async created() {
        await this.$bind('item', db.collection('items').doc(this.$route.params.id));
        if (this.item == null) {
            this.$router.push('/404');
            return;
        }
        if (this.item.pictures) this.activePicture = this.item.pictures[0];
        this.isInCart = this.cart.find( x => x.id == this.item.id );
    },

    methods: {
        addToCart() {
            this.isInCart = true;
            this.$emit("addToCart", this.item);
            swal({
                title: this.item.name + " has been added to your cart.",
                icon: "success",
                buttons: {
                    cancel: "View Cart",
                    success: "Stay Here"
                }
            }).then(stay => {
                if (!stay) {
                    this.$router.push('/cart');
                }
            });
        },
        removeFromCart() {
            this.isInCart = false;
            this.$emit("removeFromCart", this.item);
        }
    }
}

</script>

<style lang="scss" >

    .is-reverse-touch {
        @media screen and (max-width: 1023px) {
            flex-direction: column-reverse;
        }
    }
    .pictures {
        margin-bottom: 1rem;
        padding: 0 2rem;
        img {
            // max-width: 300px;
            margin: 0 auto;
        }
    }
    .info {
        padding: 2rem;
    }
    .VueCarousel-navigation-button {
        font-size: 1.5rem;
    }


</style>