<template>
    <div class="bg-light hero is-fullheight">
        <div class="hero-body" v-if="newItem">
            <div class="container">
                <div class="columns">
                    <div class="column is-8 is-offset-2">
                        <p class="title">You Are Editing an Item</p>

                        <form @submit.prevent="submit" ref="form">
                            <div class="field">
                                <label for="name" class="label">Name</label>
                                <div class="control">
                                    <input type="text" id="name" class="input is-medium"
                                        v-model="newItem.name"
                                        ref="inputName"
                                        placeholder='Vintage toaster'
                                        required>
                                </div>
                                <p class="help is-danger" v-if="showNameError">This name is already taken, please choose another or <a href="#" @click.prevent="newItem.name = item.name">change it back.</a></p>
                            </div>
                            <div class="field">
                                <label for="description" class="label">Description</label>
                                <div class="control">
                                    <textarea class="textarea is-medium" id="description" v-model="newItem.description" placeholder='A super cute item that you really should buy.'></textarea>
                                </div>
                                <p>Optional. Short or as long as you want. Please use full sentences.</p>
                            </div>
                            <div class="field">
                                <label for="price" class="label">Price</label>
                                <div class="control">
                                    <input type="number" pattern="[0-9]+(\.[0-9][0-9]?)?" step="0.01" class="input is-medium" id="price" v-model="newItem.price" placeholder='100.00' required>
                                </div>
                                <p>Do not include dollar sign.</p>
                            </div>
                            <label class="label">Pictures</label>
                            <div class="pictures columns is-multiline is-vcentered">
                                <div class="picture column is-half-tablet" v-for="(picture, i) in newItem.pictures" :key="i">
                                    <img :src="picture.src">
                                    <button type="button"
                                        class="button is-light is-warning is-fullwidth"
                                        @click.prevent="deletePicture(i)"
                                        >Delete
                                    </button>
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
                                :class="{ 'is-loading' : isLoading }">
                                Save Changes
                            </button>
                            <button class="button is-danger is-large is-fullwidth move-down"
                                type="button"
                                @click="onDelete">
                                Delete This Item
                            </button>
                            <button class="button is-large is-fullwidth move-down"
                                type="button"
                                @click="cancel">
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import firebase from 'firebase/app';
import db from '../db';
import ItemMixins from '../mixins/ItemMixins';
import swal from 'sweetalert';

export default {

    mixins: [ItemMixins],

    data(){
        return {
            isLoading: false,
            item: null,
            newItem: null,
            showNameError: false,
            picsToUpload: [],
            picsToDelete: []
        }
    },

    created() {
        this.storage = firebase.storage().ref();
        this.ref = db.collection('items').doc(this.$route.params.id);
        this.$bind('item', this.ref).then(doc => {
            if (!doc){
                this.$router.push('/404');
            }else{
                this.newItem = JSON.parse(JSON.stringify(doc));
            }
        });
    },

    methods: {
        deletePicture(index) {
            this.picsToDelete.push(this.newItem.pictures[index]);
            this.newItem.pictures.splice(index, 1);
        },
        async submit() {
            this.isLoading = true;
            this.showNameError = false;

            if (this.newItem.name !== this.item.name){
                let ref = await this.updateItemPath().catch(() => {
                    this.showNameError = true;
                    this.$refs.inputName.focus();
                    this.isLoading = false;
                    return false;
                });
                if (!ref) return;
                this.ref = ref;
            }

            const slug = this.slug(this.newItem.name);

            if (this.picsToDelete.length > 0){
                const tasks = [];
                this.picsToDelete.forEach(picture => {
                    tasks.push(this.storage.child(picture.path).delete());
                }, this);
                await Promise.all(tasks).catch(() => {});
            }

            const uploads = [];
            this.newItem.pictures.forEach((picture, i, a) => {
                if (!picture.file) return;
                uploads.push(this.uploadPicture(slug, picture.file).then(uploaded => {
                    a[i] = uploaded;
                }));
            });
            await Promise.all(uploads).catch(error => {
                console.log('upload pics error', error);
            });

            this.ref.set(this.newItem);
            this.item = JSON.parse(JSON.stringify(this.newItem));
            window.history.replaceState({}, "Shirley's Estate Sale", "/edit/" + slug);
            this.isLoading = false;

            swal({
                title: 'Item saved!',
                icon: 'success'
            });

        },

        async onDelete() {
            if (
                !await swal("Are you sure?", {
                    icon: "warning",
                    buttons: true,
                    dangerMode: true
                })
            ) return;
            
            await new Promise((resolve, reject) => {
                const tasks = [];
                this.item.pictures.forEach(picture => {
                    tasks.push(this.storage.child(picture.path).delete().catch(error => reject(error)));
                }, this);
                Promise.all(tasks).then(resolve);
            }).catch(error => {
                console.log('image delete', error);
            });

            await db.collection('items').doc(this.slug(this.oldItem.name)).delete().catch(error => {
                console.log('item delete error', error);
                return;
                //swal
            });

            swal("Item deleted.", {
                icon: "success"
            }).then(() => {
                this.$router.push('/');
            });
        },

        onPictureChange() {
            [...this.$refs.inputPicture.files].forEach(file => {
                let picture = { file };
                let reader = new FileReader();
                reader.addEventListener("load", () => {
                    picture.src = reader.result
                    this.newItem.pictures.push(picture);
                    this.picsToUpload.push(picture);
                }, false);
                reader.readAsDataURL(file);
            });
        },

        cancel() {
            this.$router.push('/i/' + this.slug(this.item.name));
        },

        updateItemPath() {
            const self = this;
            return new Promise((resolve, reject) => {
                const newRef = db.collection('items').doc(self.slug(self.newItem.name));
                newRef.get().then(doc => {
                    if (doc.exists) return reject(false);

                    self.ref.delete().then(() => {
                        return resolve(newRef);
                    }).catch(error => {
                        console.log('item delete error', error);
                        return reject(false);
                    });
                });                
            });
        },
    }
}

</script>

<style>

</style>