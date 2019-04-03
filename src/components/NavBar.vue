<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="container">
            <div class="navbar-brand">
                <router-link to="/" class="navbar-item">
                    SHIRLEY'S ESTATE SALE
                </router-link>
                <a role="button"
                    class="navbar-burger"
                    :class="{ 'is-active' : isMenuActive }"
                    @click="isMenuActive = !isMenuActive"
                    :aria-expanded="isMenuActive"
                    aria-label="menu" >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
            <div id="navbar" class="navbar-menu" :class="{ 'is-active' : isMenuActive }">
                <div class="navbar-end">
                    <router-link to="/add-item" class="navbar-item" v-show="user">Add Item</router-link>
                    <div class="navbar-item">
                        <router-link to="/cart" v-text="cartLabel"></router-link>
                    </div>
                    <router-link to="/login" class="navbar-item" v-show="!user">SIGN IN</router-link>
                    <router-link to="/logout" class="navbar-item" v-show="user">SIGN OUT</router-link>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>

import firebase from 'firebase/app';
import 'firebase/auth';

export default {
    props: ["cart"],

    created() {
        firebase.auth().onAuthStateChanged(user => {
            this.user = user;
        });
    },
    data() {
        return {
            user: firebase.auth().currentUser,
            isMenuActive: false
        }
    },
    computed: {
        cartLabel() {
            let resp = "CART";
            if (this.cart.length > 0) resp += " (" + this.cart.length + ")";
            return resp;
        }
    }
}

</script>
