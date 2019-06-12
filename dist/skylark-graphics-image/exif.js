/**
 * skylark-graphics-image - The skylark imagex utility library
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["./image","./meta"],function(e,i){"use strict";var t=function(){};return(t.ExifMap=function(){return this}).prototype.map={Orientation:274},t.ExifMap.prototype.get=function(e){return this[e]||this[this.map[e]]},t.getExifThumbnail=function(e,i,t){if(t&&!(i+t>e.byteLength))return loadImage.createObjectURL(new Blob([e.buffer.slice(i,i+t)]));console.log("Invalid Exif data: Invalid thumbnail data.")},(t.exifTagTypes={1:{getValue:function(e,i){return e.getUint8(i)},size:1},2:{getValue:function(e,i){return String.fromCharCode(e.getUint8(i))},size:1,ascii:!0},3:{getValue:function(e,i,t){return e.getUint16(i,t)},size:2},4:{getValue:function(e,i,t){return e.getUint32(i,t)},size:4},5:{getValue:function(e,i,t){return e.getUint32(i,t)/e.getUint32(i+4,t)},size:8},9:{getValue:function(e,i,t){return e.getInt32(i,t)},size:4},10:{getValue:function(e,i,t){return e.getInt32(i,t)/e.getInt32(i+4,t)},size:8}})[7]=t.exifTagTypes[1],t.getExifValue=function(e,i,n,a,f,r){var s,g,l,o,u,x,d=t.exifTagTypes[a];if(d){if(!((g=(s=d.size*f)>4?i+e.getUint32(n+8,r):n+8)+s>e.byteLength)){if(1===f)return d.getValue(e,g,r);for(l=[],o=0;o<f;o+=1)l[o]=d.getValue(e,g+o*d.size,r);if(d.ascii){for(u="",o=0;o<l.length&&"\0"!==(x=l[o]);o+=1)u+=x;return u}return l}console.log("Invalid Exif data: Invalid data offset.")}else console.log("Invalid Exif data: Invalid tag type.")},t.parseExifTag=function(e,i,n,a,f){var r=e.getUint16(n,a);f.exif[r]=t.getExifValue(e,i,n,e.getUint16(n+2,a),e.getUint32(n+4,a),a)},t.parseExifTags=function(e,i,t,n,a){var f,r,s;if(t+6>e.byteLength)console.log("Invalid Exif data: Invalid directory offset.");else{if(!((r=t+2+12*(f=e.getUint16(t,n)))+4>e.byteLength)){for(s=0;s<f;s+=1)this.parseExifTag(e,i,t+2+12*s,n,a);return e.getUint32(r,n)}console.log("Invalid Exif data: Invalid directory size.")}},t.parseExifData=function(e,i,n,a,f){if(!f.disableExif){var r,s,g,l=i+10;if(1165519206===e.getUint32(i+4))if(l+8>e.byteLength)console.log("Invalid Exif data: Invalid segment size.");else if(0===e.getUint16(i+8)){switch(e.getUint16(l)){case 18761:r=!0;break;case 19789:r=!1;break;default:return void console.log("Invalid Exif data: Invalid byte alignment marker.")}42===e.getUint16(l+2,r)?(s=e.getUint32(l+4,r),a.exif=new t.ExifMap,(s=t.parseExifTags(e,l,l+s,r,a))&&!f.disableExifThumbnail&&(s=t.parseExifTags(e,l,l+s,r,g={exif:{}}),g.exif[513]&&(a.exif.Thumbnail=t.getExifThumbnail(e,l+g.exif[513],g.exif[514]))),a.exif[34665]&&!f.disableExifSub&&t.parseExifTags(e,l,l+a.exif[34665],r,a),a.exif[34853]&&!f.disableExifGps&&t.parseExifTags(e,l,l+a.exif[34853],r,a)):console.log("Invalid Exif data: Missing TIFF marker.")}else console.log("Invalid Exif data: Missing byte alignment offset.")}},i.metaDataParsers.jpeg[65505].push(t.parseExifData),e.exif=t});
//# sourceMappingURL=sourcemaps/exif.js.map
