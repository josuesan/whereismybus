import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { first } from 'rxjs/operators';
import { User } from '../#interfaces';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx'

@Injectable()
export class ImageService {
    public currentUserRole: string = "";
    constructor(private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private imagePicker: ImagePicker,
        private dbStorage: AngularFireStorage,
        private webview: WebView) { }

    /**
     *  Function to upload profile photo with ImagePicker
     */
    public openGallery() {
        let options = {
            maximumImagesCount: 1,
            width: 768,
            height: 576,
            quality: 75
        }
        return this.imagePicker.getPictures(options);
    }

    /**
     *  Function to upload photo to Firebase - Storage
     * @param imageURI 
     */
    uploadImage(uri) {
        const imageURI = this.webview.convertFileSrc(uri[0]);
        return new Promise<any>((resolve, reject) => {
            let storageRef = this.dbStorage.storage.ref();
            const name = this.nameRandom()
            let imageRef = storageRef.child('image').child(name);
            this.encodeImageUri(imageURI, function (image64) {
                var ref = imageRef.putString(image64, 'data_url')
                    .then(snapshot => {
                        resolve(snapshot.ref.getDownloadURL())
                    }, err => {
                        reject(err);
                    })
            })
        })
    }
    isIo
    encodeImageUri(imageUri, callback) {
        var c = document.createElement('canvas');
        var ctx = c.getContext("2d");
        var img = new Image();
        img.onload = function () {
            var aux: any = this;
            c.width = aux.width;
            c.height = aux.height;
            ctx.drawImage(img, 0, 0);
            var dataURL = c.toDataURL("image/jpeg");
            callback(dataURL);
        };
        img.src = imageUri;
    };

    nameRandom() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 36; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    /**
     *  Function to delete photo to Firebase - Storage
     * @param url 
     */
    deleteImage(url) {
        return this.dbStorage.storage.refFromURL(url).delete();
    }

}

