<template>
    <div class="hero is-fullheight is-info">
        <div class="hero-body has-text-centered">
            <div class="column is-4 is-offset-4">
                <div class="box">
                    <form @submit.prevent="login" v-show="!isResettingPassword">
                        <div class="field">
                            <div class="control">
                                <input type="email" class="input is-large" v-model="email" placeholder="Email" required autofocus>
                            </div>
                        </div>
                        <div class="field">
                            <div class="control">
                                <input type="password" class="input is-large" v-model="password" placeholder="Password" required>
                            </div>
                        </div>
                        <div class="field" v-show="error">
                            <p v-text="error" class="is-size-5 has-text-danger"></p>
                        </div>
                        <div class="field">
                            <div class="control">
                                <button type="submit" class="button is-primary is-large is-fullwidth" @click="login">Login</button>
                            </div>
                        </div>
                        <div class="field">
                            <div class="control">
                                <button type="button" 
                                    class="button is-light is-large has-text-grey is-fullwidth" 
                                    @click="isResettingPassword = true"
                                    >Forgot Password?
                                </button>
                            </div>
                        </div>
                    </form>
                    <form v-show="isResettingPassword">
                        <div class="field">
                            <div class="control">
                                <input type="email" class="input is-large" v-model="email" placeholder="Email" required autofocus>
                            </div>
                        </div>
                        <div class="field has-text-left" v-show="isEmailSent">
                            <div class="control">
                                <p class="is-size-5 has-text-grey">Your password reset email has been sent!</p>
                            </div>
                            <div class="control">
                                <button type="button" 
                                    class="button is-primary is-large" 
                                    @click="isResettingPassword = false"
                                    >Go Back
                                </button>
                            </div>
                        </div>
                        <div class="field is-grouped" v-show="!isEmailSent">
                            <p class="control">
                                <button type="submit" 
                                    class="button is-primary is-large" 
                                    :class="{ 'is-loading': isEmailSending }"
                                    @click="resetPassword">
                                    Send Reset Email
                                </button>
                            </p>
                            <p class="control">
                                <button type="button" 
                                    class="button is-light is-large" 
                                    @click="isResettingPassword = false">
                                    Cancel
                                </button>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import firebase from 'firebase';

export default {
    name: 'login',
    data() {
        return {
            email: '',
            password: '',
            error: '',
            isResettingPassword: false,
            isEmailSending: false,
            isEmailSent: false

        }
    },
    methods: {
        login(){
            firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
                () => {
                    this.$router.push('/');
                },
                error => {
                    this.error = error.message;
                }
            );
        },
        resetPassword(){
            this.isEmailSending = true;
            firebase.auth().sendPasswordResetEmail(this.email).then(
                () => {
                    this.isEmailSending = false;
                    this.isEmailSent = true;
                }
            )
        }
    }
}

</script>