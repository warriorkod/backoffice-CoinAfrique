import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http'

declare var Cropper : any;

@Component({
  selector: 'bo-edit-image',
  templateUrl: './image-edit.component.html',
  styleUrls: ['./image-edit.component.css']
})
export class ImageEditComponent implements OnInit {

  @Input() imageType: number;
  @Input() imageUrl : string;
  @Output() cropped = new EventEmitter();
  @Output() close = new EventEmitter();
  @Output() save = new EventEmitter();
  @Output() loadSrcError = new EventEmitter()
  
  cropper : any;
  imageSrc : any;
  prevImageSrc : any;

  constructor(private _http: HttpClient) { }

  ngOnInit() {
    var img = new Image();
    var _SELF = this;

    img.onload = function () {
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      var dataURL = canvas.toDataURL("image/png");

      _SELF.imageSrc = dataURL;
      document.getElementById('cropperimage').setAttribute('src', dataURL);
      _SELF.cropper = new Cropper(document.getElementById('cropperimage'),{
        autoCrop : false,
        dragMode : 'move',
        checkCrossOrigin : false,
        center : true,
        restore : true
      });
    };

    img.onerror = function(e) {
      _SELF.loadImageSrc(img, e)
    }

    img.setAttribute('crossOrigin', 'anonymous');
    img.src = this.imageUrl

    this.prevImageSrc = null;
  }

  private loadImageSrc(img: HTMLImageElement, e: Event|string): void {
    this.loadSrcError.emit(this.imageType);
  }

  processCropperAction(mode) {
    // alert(mode);
    switch (mode) {
      case 'crop':
        if ( this.cropper === null ) {
          alert(`You can't edit image in this mode, please press undo and continue editing :)`);
          break;
        }
        this.cropper.setDragMode(mode);
        break;

      case 'rotate-left':
        if ( this.cropper === null ) {
          alert(`You can't edit image in this mode, please press undo and continue editing :)`);
          break;
        }
        this.cropper.rotate(-90);
        break;

      case 'rotate-right':
        if ( this.cropper === null ) {
          alert(`You can't edit image in this mode, please press undo and continue editing :)`);
          break;
        }
        this.cropper.rotate(90);
        break;

      case 'flip-horizontal':
        if ( this.cropper === null ) {
          alert(`You can't edit image in this mode, please press undo and continue editing :)`);
          break;
        }
        this.cropper.scaleX(-this.cropper.getData().scaleX || -1);
        break;

      case 'flip-vertical':
        if ( this.cropper === null ) {
          alert(`You can't edit image in this mode, please press undo and continue editing :)`);
          break;
        }
        this.cropper.scaleY(-this.cropper.getData().scaleY || -1);
        break;

      case 'clear':
        if ( this.cropper === null ) {
          alert(`You can't edit image in this mode, please press undo and continue editing :)`);
          break;
        }
        this.cropper.clear();
        break;

      case 'cropok':
        const cropper = this.cropper;
        this.prevImageSrc = this.imageSrc;
        this.imageSrc = cropper.getCroppedCanvas().toDataURL('image/png');
        this.cropper.setCanvasData(cropper.getCropBoxData());
        this.cropper.destroy();
        this.cropper = null;
        this.cropped.emit(this.imageSrc);
        break;

      case 'undo':
        if(this.prevImageSrc != null) {
          this.imageSrc = this.prevImageSrc;
          this.prevImageSrc = null;
          document.getElementById('cropperimage').setAttribute('src', this.imageSrc);
          this.cropper = new Cropper(document.getElementById('cropperimage'),{
            autoCrop : false,
            dragMode : 'move',
            checkCrossOrigin : false,
            center : true
          });
          this.cropped.emit(this.imageSrc);
          this.cropper
          .crop()
          .setData(null)
          .setCanvasData(null)
          .setCropBoxData(null);
        }
        break;

      case 'save':
        if(this.prevImageSrc != null) {
          this.save.emit(this.imageSrc);
          this.close.emit();
        } else {
          alert("There's no operations to save.");
        }
        break;

      case 'close':
        this.close.emit();
        break;
        
      default:

    }
  }
}
