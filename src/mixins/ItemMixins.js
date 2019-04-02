import firebase from 'firebase';

export default {
    methods: {
        upload(arr, slug){
            return new Promise((resolve, reject) => {
                const tasks = [];
                arr.forEach(picture => {
                    tasks.push(this.uploadPicture(slug, picture.file));
                }, this);
                Promise.all(tasks).then(pictures => {
                    resolve(pictures);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        uploadPicture(slug, file) {
            const storage = firebase.storage().ref();
            const path = 'images/' + slug + '/' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + '.' + file.name.split('.').pop();
            const ref = storage.child(path);                

            return new Promise((resolve, reject) => {
                ref.put(file).on('state_changed', () => {
                    //progress
                }, error => {
                    console.log('upload picture error', error);
                    reject(error);
                }, () => {
                    //success
                    ref.getDownloadURL().then(src => {
                        resolve({path, src});
                    });
                });
            });
        },

        slug(str){
          if (!str) return str;
          str = str.replace(/^\s+|\s+$/g, ""); // trim
          str = str.toLowerCase();
    
          // remove accents, swap ñ for n, etc
          var from = "åàáãäâèéëêìíïîòóöôùúüûñç·/_,:;";
          var to = "aaaaaaeeeeiiiioooouuuunc------";
    
          for (var i = 0, l = from.length; i < l; i++) {
              str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
          }
    
          str = str
              .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
              .replace(/\s+/g, "-") // collapse whitespace and replace by -
              .replace(/-+/g, "-") // collapse dashes
              .replace(/^-+/, "") // trim - from start of text
              .replace(/-+$/, ""); // trim - from end of text
    
          return str;
        }

    }
}