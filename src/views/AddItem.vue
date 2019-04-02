<template>
    <div class="bg-light hero is-fullheight">
        <div class="hero-body container">
            <div class="container">
                <div class="columns">
                    <div class="column is-8 is-offset-2">
                        <p class="title">Add An Item to Shirley's Estate Sale</p>
                        <form @submit.prevent="submit" ref="form">
                            <div class="field">
                                <label for="name" class="label">Name</label>
                                <div class="control">
                                    <input type="text"
                                        class="input is-medium"
                                        id="name"
                                        ref="name"
                                        v-model="item.name"
                                        placeholder='Vintage toaster' 
                                        required >
                                </div>
                                <p class="help is-danger" v-if="errors['name']">This name is already taken, please choose another.</p>                                
                            </div>
                            <div class="field">
                                <label for="description" class="label">Description</label>
                                <div class="control">
                                    <textarea class="textarea is-medium" id="description" v-model="item.description" placeholder='A super cute item that you really should buy.'></textarea>
                                </div>
                                <p>Optional. Short or as long as you want. Please use full sentences.</p>
                            </div>
                            <div class="field">
                                <label for="price" class="label">Price</label>
                                <div class="control">
                                    <input type="number" pattern="[0-9]+(\.[0-9][0-9]?)?" step="0.01" class="input is-medium" id="price" v-model="item.price" placeholder='100.00' required>
                                </div>
                                <p>Do not include dollar sign.</p>
                            </div>
                            <label class="label">Pictures</label>
                            <div class="pictures columns is-multiline is-vcentered">
                                <div class="picture column is-half-tablet" v-for="(picture, i) in pictures" :key="i">
                                    <img :src="picture.objectURL">
                                    <button class="button is-light is-warning is-fullwidth" @click.prevent="pictures.splice(i, 1)">Delete</button>
                                </div>
                            </div>
                            <div class="file is-boxed">
                                <label class="file-label">
                                    <input type="file"
                                        class="file-input"
                                        name="picture"
                                        accept="image/*"
                                        multiple
                                        camera
                                        ref="inputPicture"
                                        @change="onPictureChange">
                                    <span class="file-cta">
                                        <span class="file-icon">
                                            <font-awesome-icon icon="upload" />
                                        </span>
                                        <span class="file-label">
                                            Choose a file…
                                        </span>
                                    </span>
                                </label>
                            </div>
                            <button class="button is-primary is-large is-fullwidth move-down" 
                                type="submit"
                                :class="{ 'is-loading' : isLoading }"
                                >Add This Item
                            </button>
                        </form>
                        <router-link to="/" class="button is-large is-light is-fullwidth move-down">Go Home</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import firebase from 'firebase';
import db from "../db";
import ItemMixins from '../mixins/ItemMixins';
import swal from 'sweetalert';

export default {

    mixins: [ItemMixins],

    data(){ 
        return {
            isLoading: false,
            item: {
                name: '',
                description: '',
                price: '',
                pictures: []
            },
            pictures: [],
            errors: {
                name: false,
            },
        }
    },

    created() {
        this.storage = firebase.storage().ref();
    },

    methods: {
        async submit() {
            this.isLoading = true;
            for (let error in this.errors){
                this.errors[error] = false;
            }
            
            const doc = await db.collection('items').doc(this.slug(this.item.name)).get();
            if (doc.exists) {
                this.errors.name = true;
                window.scrollTo({
                    top: document.querySelector('#name').offsetTop
                });
                this.$refs.name.focus();
                this.isLoading = false;
                return;
            }

            const slug = this.slug(this.item.name);

            this.item.pictures = await this.upload(this.pictures, slug).catch(error => {
                console.log('pictures error', error);
            });

            await db.collection('items').doc(slug).set(this.item).catch(error => {
                swal("Error", error, "error");
                this.isLoading = false;
            });

            if (
                !await swal({
                    title: 'Item saved!', 
                    icon: 'success',
                    buttons: {
                        cancel: "View",
                        success: "Add Another"
                    }
                })
            ) this.$router.push('/i/' + slug);

            window.scrollTo({
                'top' : 0,
                'behavior': 'smooth'
            });

            this.item.name = '';
            this.item.price = '';
            this.item.description = '';
            this.item.pictures = [];
            this.pictures = [];
            this.isLoading = false;
        },

        onPictureChange() {
            [...this.$refs.inputPicture.files].forEach(file => {
                let picture = { file };
                picture.objectURL = URL.createObjectURL(file);
                this.pictures.push(picture);
            });
            this.$refs.inputPicture.value = null;
        },
    }
}

</script>
