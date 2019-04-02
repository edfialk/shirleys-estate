<template>
    <div>
        <NavBar :cart="cart" />
        <section class="section hero is-fullheight-with-navbar">
            <div v-if="item" class="container">
                <div class="columns">
                    <div class="column info is-hidden-desktop">
                        <!-- <div class="box"> -->
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
                        <!-- </div> -->
                    </div>
<!--                     <div class="column thumbs" v-if="item.pictures.length > 0">
                        <img :src="picture.src" v-for="(picture, i) in item.pictures" :key="i" @click="activePicture = picture">
                    </div> -->
<!--                     <div class="column is-half is-hidden-touch" v-if="activePicture">
                        <img :src="activePicture.src">
                    </div> -->
                    <div class="column is-two-thirds pictures">
<!--                         <div class="pictures is-flex is-spacebetween">
                            <div>
                                <font-awesome-icon icon="chevron-left" size="2x" />
                            </div>
 -->
                            <carousel :perPage="1" :navigationEnabled="true">
                                <slide v-for="(picture, i) in item.pictures" :key="i">
                                    <img :src="picture.src">
                                </slide>
                            </carousel>
<!--                             <div>
                                <font-awesome-icon icon="chevron-right" size="2x" class="is-pulled-right"/>
                            </div>
                        </div>
 --><!--                         <div class="carousel">
                            <carousel :perPage="1">
                                <slide v-for="(picture, i) in item.pictures" :key="i">
                                    <img :src="picture.src">
                                </slide>
                            </carousel>
                        </div> -->
                    </div>
                    <div class="column info is-hidden-touch">
                        <!-- <div class="box"> -->
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
                        <!-- </div> -->
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import firebase from 'firebase';
import db from '../db';
import NavBar from '../components/NavBar';
import { Carousel, Slide } from 'vue-carousel';

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
        },
        removeFromCart() {
            this.isInCart = false;
            this.$emit("removeFromCart", this.item);
        }
    }
}

</script>

<style lang="scss">
    // .thumbs img {
    //     margin-bottom: 1.5rem;
    //     cursor: pointer;
    // }
    .pictures {
        margin-bottom: 1rem;
        padding: 0 2rem;
        img {
            max-width: 300px;
            margin: 0 auto;
        }
    }
    .info {
        padding: 0 2rem;
    }
</style>