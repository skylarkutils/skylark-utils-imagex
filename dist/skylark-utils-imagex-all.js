/**
 * skylark-utils-imagex - The skylark imagex utility library
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
!function(e,t){var i=t.define,n=t.require,a="function"==typeof i&&i.amd,r=!a&&"undefined"!=typeof exports;if(!a&&!i){var o={};i=t.define=function(e,t,i){"function"==typeof i?(o[e]={factory:i,deps:t.map(function(t){return function(e,t){if("."!==e[0])return e;var i=t.split("/"),n=e.split("/");i.pop();for(var a=0;a<n.length;a++)"."!=n[a]&&(".."==n[a]?i.pop():i.push(n[a]));return i.join("/")}(t,e)}),resolved:!1,exports:null},n(e)):o[e]={factory:null,resolved:!0,exports:i}},n=t.require=function(e){if(!o.hasOwnProperty(e))throw new Error("Module "+e+" has not been defined");var i=o[e];if(!i.resolved){var a=[];i.deps.forEach(function(e){a.push(n(e))}),i.exports=i.factory.apply(t,a)||null,i.resolved=!0}return i.exports}}if(!i)throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");if(function(e,t){e("skylark-langx/skylark",[],function(){return{}}),e("skylark-utils-imagex/imagex",["skylark-langx/skylark"],function(e){var t={},i=URL||webkitURL;function n(e,i){!e._objectURL||i&&i.noRevoke||(t.revokeObjectURL(e._objectURL),delete e._objectURL)}return t.fetchBlob=function(e,t,i){t()},t.isInstanceOf=function(e,t){return Object.prototype.toString.call(t)==="[object "+e+"]"},t.transform=function(e,t,i,n,a){i(e,a)},t.onerror=function(e,t,i,a,r){n(e,r),a&&a.call(e,t)},t.onload=function(e,i,a,r,o){n(e,o),r&&t.transform(e,o,r,a,{})},t.createObjectURL=function(e){return!!i&&i.createObjectURL(e)},t.revokeObjectURL=function(e){return!!i&&i.revokeObjectURL(e)},t.readFile=function(e,t,i){if(FileReader){var n=new FileReader;if(n.onload=n.onerror=t,n[i=i||"readAsDataURL"])return n[i](e),n}return!1},e.imagex=t}),e("skylark-utils-imagex/meta",["./imagex"],function(e){"use strict";var t={},i="undefined"!=typeof Blob&&(Blob.prototype.slice||Blob.prototype.webkitSlice||Blob.prototype.mozSlice);e.blobSlice=i&&function(){var e=this.slice||this.webkitSlice||this.mozSlice;return e.apply(this,arguments)},t.metaDataParsers={jpeg:{65505:[],65517:[]}},t.parseMetaData=function(i,n,a,r){a=a||{},r=r||{};var o=this,l=a.maxMetaDataSize||262144,s=!("undefined"!=typeof DataView&&i&&i.size>=12&&"image/jpeg"===i.type&&e.blobSlice);!s&&e.readFile(e.blobSlice.call(i,0,l),function(e){if(e.target.error)return console.log(e.target.error),void n(r);var i,l,s,f,u=e.target.result,c=new DataView(u),g=2,d=c.byteLength-4,h=g;if(65496===c.getUint16(0)){for(;g<d&&((i=c.getUint16(g))>=65504&&i<=65519||65534===i);){if(l=c.getUint16(g+2)+2,g+l>c.byteLength){console.log("Invalid meta data: Invalid segment size.");break}if(s=t.metaDataParsers.jpeg[i])for(f=0;f<s.length;f+=1)s[f].call(o,c,g,l,r,a);h=g+=l}!a.disableImageHead&&h>6&&(u.slice?r.imageHead=u.slice(0,h):r.imageHead=new Uint8Array(u).subarray(0,h))}else console.log("Invalid JPEG file: Missing JPEG marker.");n(r)},"readAsArrayBuffer")||n(r)},t.hasMetaOption=function(e){return e&&e.meta};var n=e.transform;return e.transform=function(i,a,r,o,l){t.hasMetaOption(a)?t.parseMetaData(o,function(t){n.call(e,i,a,r,o,t)},a,l):n.apply(e,arguments)},e.meta=t}),e("skylark-utils-imagex/exif",["./imagex","./meta"],function(e,t){"use strict";var i=function(){};return(i.ExifMap=function(){return this}).prototype.map={Orientation:274},i.ExifMap.prototype.get=function(e){return this[e]||this[this.map[e]]},i.getExifThumbnail=function(e,t,i){if(i&&!(t+i>e.byteLength))return loadImage.createObjectURL(new Blob([e.buffer.slice(t,t+i)]));console.log("Invalid Exif data: Invalid thumbnail data.")},(i.exifTagTypes={1:{getValue:function(e,t){return e.getUint8(t)},size:1},2:{getValue:function(e,t){return String.fromCharCode(e.getUint8(t))},size:1,ascii:!0},3:{getValue:function(e,t,i){return e.getUint16(t,i)},size:2},4:{getValue:function(e,t,i){return e.getUint32(t,i)},size:4},5:{getValue:function(e,t,i){return e.getUint32(t,i)/e.getUint32(t+4,i)},size:8},9:{getValue:function(e,t,i){return e.getInt32(t,i)},size:4},10:{getValue:function(e,t,i){return e.getInt32(t,i)/e.getInt32(t+4,i)},size:8}})[7]=i.exifTagTypes[1],i.getExifValue=function(e,t,n,a,r,o){var l,s,f,u,c,g,d=i.exifTagTypes[a];if(d){if(l=d.size*r,!((s=l>4?t+e.getUint32(n+8,o):n+8)+l>e.byteLength)){if(1===r)return d.getValue(e,s,o);for(f=[],u=0;u<r;u+=1)f[u]=d.getValue(e,s+u*d.size,o);if(d.ascii){for(c="",u=0;u<f.length&&"\0"!==(g=f[u]);u+=1)c+=g;return c}return f}console.log("Invalid Exif data: Invalid data offset.")}else console.log("Invalid Exif data: Invalid tag type.")},i.parseExifTag=function(e,t,n,a,r){var o=e.getUint16(n,a);r.exif[o]=i.getExifValue(e,t,n,e.getUint16(n+2,a),e.getUint32(n+4,a),a)},i.parseExifTags=function(e,t,i,n,a){var r,o,l;if(i+6>e.byteLength)console.log("Invalid Exif data: Invalid directory offset.");else{if(r=e.getUint16(i,n),!((o=i+2+12*r)+4>e.byteLength)){for(l=0;l<r;l+=1)this.parseExifTag(e,t,i+2+12*l,n,a);return e.getUint32(o,n)}console.log("Invalid Exif data: Invalid directory size.")}},i.parseExifData=function(e,t,n,a,r){if(!r.disableExif){var o,l,s,f=t+10;if(1165519206===e.getUint32(t+4))if(f+8>e.byteLength)console.log("Invalid Exif data: Invalid segment size.");else if(0===e.getUint16(t+8)){switch(e.getUint16(f)){case 18761:o=!0;break;case 19789:o=!1;break;default:return void console.log("Invalid Exif data: Invalid byte alignment marker.")}42===e.getUint16(f+2,o)?(l=e.getUint32(f+4,o),a.exif=new i.ExifMap,(l=i.parseExifTags(e,f,f+l,o,a))&&!r.disableExifThumbnail&&(l=i.parseExifTags(e,f,f+l,o,s={exif:{}}),s.exif[513]&&(a.exif.Thumbnail=i.getExifThumbnail(e,f+s.exif[513],s.exif[514]))),a.exif[34665]&&!r.disableExifSub&&i.parseExifTags(e,f,f+a.exif[34665],o,a),a.exif[34853]&&!r.disableExifGps&&i.parseExifTags(e,f,f+a.exif[34853],o,a)):console.log("Invalid Exif data: Missing TIFF marker.")}else console.log("Invalid Exif data: Missing byte alignment offset.")}},t.metaDataParsers.jpeg[65505].push(i.parseExifData),e.exif=i}),e("skylark-utils-imagex/scale",["./imagex"],function(e){"use strict";function t(e,t,i,n,a,r,o,l,s,f){return e.getContext("2d").drawImage(t,i,n,a,r,o,l,s,f),e}return e.scale=function(e,i,n){i=i||{};var a,r,o,l,s,f,u,c,g,d,h,x=document.createElement("canvas"),p=e.getContext||function(e){return e.canvas||e.crop||!!e.aspectRatio}(i)&&x.getContext,m=e.naturalWidth||e.width,v=e.naturalHeight||e.height,b=m,y=v;function k(){var e=Math.max((o||b)/b,(l||y)/y);e>1&&(b*=e,y*=e)}function E(){var e=Math.min((a||b)/b,(r||y)/y);e<1&&(b*=e,y*=e)}p&&(i=function(e,t){var i,n,a,r,o=t.aspectRatio;if(!o)return t;for(n in i={},t)t.hasOwnProperty(n)&&(i[n]=t[n]);i.crop=!0,a=e.naturalWidth||e.width,r=e.naturalHeight||e.height,a/r>o?(i.maxWidth=r*o,i.maxHeight=r):(i.maxWidth=a,i.maxHeight=a/o);return i}(e,i),u=i.left||0,c=i.top||0,i.sourceWidth?(s=i.sourceWidth,void 0!==i.right&&void 0===i.left&&(u=m-s-i.right)):s=m-u-(i.right||0),i.sourceHeight?(f=i.sourceHeight,void 0!==i.bottom&&void 0===i.top&&(c=v-f-i.bottom)):f=v-c-(i.bottom||0),b=s,y=f);a=i.maxWidth,r=i.maxHeight,o=i.minWidth,l=i.minHeight,p&&a&&r&&i.crop?(b=a,y=r,(h=s/f-a/r)<0?(f=r*s/a,void 0===i.top&&void 0===i.bottom&&(c=(v-f)/2)):h>0&&(s=a*f/r,void 0===i.left&&void 0===i.right&&(u=(m-s)/2))):((i.contain||i.cover)&&(o=a=a||o,l=r=r||l),i.cover?(E(),k()):(k(),E()));if(p){if((g=i.pixelRatio)>1&&(x.style.width=b+"px",x.style.height=y+"px",b*=g,y*=g,x.getContext("2d").scale(g,g)),(d=i.downsamplingRatio)>0&&d<1&&b<s&&y<f)for(;s*d>b;)x.width=s*d,x.height=f*d,t(x,e,u,c,s,f,0,0,x.width,x.height),u=0,c=0,s=x.width,f=x.height,(e=document.createElement("canvas")).width=s,e.height=f,t(e,x,0,0,s,f,0,0,s,f);return x.width=b,x.height=y,t(x,e,u,c,s,f,0,0,b,y)}return e.width=b,e.height=y,e}}),e("skylark-utils-imagex/loadFile",["./imagex"],function(e){"use strict";return e.loadFile=function(t,i,n){var a,r=document.createElement("img");if(r.onerror=function(a){return e.onerror(r,a,t,i,n)},r.onload=function(a){return e.onload(r,a,t,i,n)},"string"==typeof t)return e.fetchBlob(t,function(i){i?(t=i,a=e.createObjectURL(t)):(a=t,n&&n.crossOrigin&&(r.crossOrigin=n.crossOrigin)),r.src=a},n),r;if(e.isInstanceOf("Blob",t)||e.isInstanceOf("File",t))return(a=r._objectURL=e.createObjectURL(t))?(r.src=a,r):e.readFile(t,function(e){var t=e.target;t&&t.result?r.src=t.result:i&&i(e)})}}),e("skylark-utils-imagex/main",["./imagex","./meta","./exif","./scale","./loadFile"],function(e){return e}),e("skylark-utils-imagex",["skylark-utils-imagex/main"],function(e){return e})}(i),!a){var l=n("skylark-langx/skylark");r?module.exports=l:t.skylarkjs=l}}(0,this);
//# sourceMappingURL=sourcemaps/skylark-utils-imagex-all.js.map
