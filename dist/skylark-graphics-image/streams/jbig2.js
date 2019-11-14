/**
 * skylark-graphics-image - The skylark imagex utility library
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-utils-streams/DecodeStream","../image"],function(e,n,t){"use strict";var r=[{qe:22017,nmps:1,nlps:1,switchFlag:1},{qe:13313,nmps:2,nlps:6,switchFlag:0},{qe:6145,nmps:3,nlps:9,switchFlag:0},{qe:2753,nmps:4,nlps:12,switchFlag:0},{qe:1313,nmps:5,nlps:29,switchFlag:0},{qe:545,nmps:38,nlps:33,switchFlag:0},{qe:22017,nmps:7,nlps:6,switchFlag:1},{qe:21505,nmps:8,nlps:14,switchFlag:0},{qe:18433,nmps:9,nlps:14,switchFlag:0},{qe:14337,nmps:10,nlps:14,switchFlag:0},{qe:12289,nmps:11,nlps:17,switchFlag:0},{qe:9217,nmps:12,nlps:18,switchFlag:0},{qe:7169,nmps:13,nlps:20,switchFlag:0},{qe:5633,nmps:29,nlps:21,switchFlag:0},{qe:22017,nmps:15,nlps:14,switchFlag:1},{qe:21505,nmps:16,nlps:14,switchFlag:0},{qe:20737,nmps:17,nlps:15,switchFlag:0},{qe:18433,nmps:18,nlps:16,switchFlag:0},{qe:14337,nmps:19,nlps:17,switchFlag:0},{qe:13313,nmps:20,nlps:18,switchFlag:0},{qe:12289,nmps:21,nlps:19,switchFlag:0},{qe:10241,nmps:22,nlps:19,switchFlag:0},{qe:9217,nmps:23,nlps:20,switchFlag:0},{qe:8705,nmps:24,nlps:21,switchFlag:0},{qe:7169,nmps:25,nlps:22,switchFlag:0},{qe:6145,nmps:26,nlps:23,switchFlag:0},{qe:5633,nmps:27,nlps:24,switchFlag:0},{qe:5121,nmps:28,nlps:25,switchFlag:0},{qe:4609,nmps:29,nlps:26,switchFlag:0},{qe:4353,nmps:30,nlps:27,switchFlag:0},{qe:2753,nmps:31,nlps:28,switchFlag:0},{qe:2497,nmps:32,nlps:29,switchFlag:0},{qe:2209,nmps:33,nlps:30,switchFlag:0},{qe:1313,nmps:34,nlps:31,switchFlag:0},{qe:1089,nmps:35,nlps:32,switchFlag:0},{qe:673,nmps:36,nlps:33,switchFlag:0},{qe:545,nmps:37,nlps:34,switchFlag:0},{qe:321,nmps:38,nlps:35,switchFlag:0},{qe:273,nmps:39,nlps:36,switchFlag:0},{qe:133,nmps:40,nlps:37,switchFlag:0},{qe:73,nmps:41,nlps:38,switchFlag:0},{qe:37,nmps:42,nlps:39,switchFlag:0},{qe:21,nmps:43,nlps:40,switchFlag:0},{qe:9,nmps:44,nlps:41,switchFlag:0},{qe:5,nmps:45,nlps:42,switchFlag:0},{qe:1,nmps:45,nlps:43,switchFlag:0},{qe:22017,nmps:46,nlps:46,switchFlag:0}],a=e.klass({klassName:"ArithmeticDecoder",byteIn:function(){var e=this.data,n=this.bp;255==e[n]?e[n+1]>143?(this.clow+=65280,this.ct=8):(n++,this.clow+=e[n]<<9,this.ct=7,this.bp=n):(n++,this.clow+=n<this.dataEnd?e[n]<<8:65280,this.ct=8,this.bp=n);this.clow>65535&&(this.chigh+=this.clow>>16,this.clow&=65535)},readBit:function(e,n){var t,a=e[n]>>1,i=1&e[n],s=r[a],l=s.qe,o=s.nmps,h=s.nlps,f=s.switchFlag;if(this.a-=l,this.chigh<l)this.a<l?(this.a=l,t=i,a=o):(this.a=l,t=1-i,f&&(i=t),a=h);else{if(this.chigh-=l,0!=(32768&this.a))return i;this.a<l?(t=1-i,f&&(i=t),a=h):(t=i,a=o)}do{0===this.ct&&this.byteIn(),this.a<<=1,this.chigh=this.chigh<<1&65535|this.clow>>15&1,this.clow=this.clow<<1&65535,this.ct--}while(0==(32768&this.a));return e[n]=a<<1|i,t},init:function(e,n,t){this.data=e,this.bp=n,this.dataEnd=t,this.chigh=e[n],this.clow=0,this.byteIn(),this.chigh=this.chigh<<7&65535|this.clow>>9&127,this.clow=this.clow<<7&65535,this.ct-=7,this.a=32768}}),i=e.klass({getContexts:function(e){return e in this?this[e]:this[e]=new Int8Array(65536)}}),s=e.klass({decoder:{get:function(){var e=new a(this.data,this.start,this.end);return shadow(this,"decoder",e)}},contextCache:{get:function(){var e=new i;return shadow(this,"contextCache",e)}},init:function(e,n,t){this.data=e,this.start=n,this.end=t}});function l(e,n,t){for(var r,a=e.getContexts(n),i=1,s=1,l=0,o=32,h=4436;s;){var f=t.readBit(a,i);switch(i=i<256?i<<1|f:511&(i<<1|f)|256,s){case 1:r=!!f;break;case 2:if(f)break;s=7,o=2,h=0;break;case 3:if(f)break;s=7,o=4,h=4;break;case 4:if(f)break;s=7,o=6,h=20;break;case 5:if(f)break;s=7,o=8,h=84;break;case 6:if(f)break;s=7,o=12,h=340;break;default:l=2*l+f,0==--o&&(s=0);continue}s++}return l+=h,r?l>0?-l:null:l}function o(e,n,t){for(var r=e.getContexts("IAID"),a=1,i=0;i<t;i++){a=2*a+n.readBit(r,a)}return t<31?a&(1<<t)-1:a-Math.pow(2,t)}var h=["SymbolDictionary",null,null,null,"IntermediateTextRegion",null,"ImmediateTextRegion","ImmediateLosslessTextRegion",null,null,null,null,null,null,null,null,"patternDictionary",null,null,null,"IntermediateHalftoneRegion",null,"ImmediateHalftoneRegion","ImmediateLosslessHalftoneRegion",null,null,null,null,null,null,null,null,null,null,null,null,"IntermediateGenericRegion",null,"ImmediateGenericRegion","ImmediateLosslessGenericRegion","IntermediateGenericRefinementRegion",null,"ImmediateGenericRefinementRegion","ImmediateLosslessGenericRefinementRegion",null,null,null,null,"PageInformation","EndOfPage","EndOfStripe","EndOfFile","Profiles","Tables",null,null,null,null,null,null,null,null,"Extension"],f=[[{x:-1,y:-2},{x:0,y:-2},{x:1,y:-2},{x:-2,y:-1},{x:-1,y:-1},{x:0,y:-1},{x:1,y:-1},{x:2,y:-1},{x:-4,y:0},{x:-3,y:0},{x:-2,y:0},{x:-1,y:0}],[{x:-1,y:-2},{x:0,y:-2},{x:1,y:-2},{x:2,y:-2},{x:-2,y:-1},{x:-1,y:-1},{x:0,y:-1},{x:1,y:-1},{x:2,y:-1},{x:-3,y:0},{x:-2,y:0},{x:-1,y:0}],[{x:-1,y:-2},{x:0,y:-2},{x:1,y:-2},{x:-2,y:-1},{x:-1,y:-1},{x:0,y:-1},{x:1,y:-1},{x:-2,y:0},{x:-1,y:0}],[{x:-3,y:-1},{x:-2,y:-1},{x:-1,y:-1},{x:0,y:-1},{x:1,y:-1},{x:-4,y:0},{x:-3,y:0},{x:-2,y:0},{x:-1,y:0}]],c=[{coding:[{x:0,y:-1},{x:1,y:-1},{x:-1,y:0}],reference:[{x:0,y:-1},{x:1,y:-1},{x:-1,y:0},{x:0,y:0},{x:1,y:0},{x:-1,y:1},{x:0,y:1},{x:1,y:1}]},{coding:[{x:-1,y:-1},{x:0,y:-1},{x:1,y:-1},{x:-1,y:0}],reference:[{x:0,y:-1},{x:-1,y:0},{x:0,y:0},{x:1,y:0},{x:0,y:1},{x:1,y:1}]}],m=[7379,1946,227,395],u=[32,8];function p(e){for(var n=1,t=0;e>n;)n<<=1,t++;return t}function g(e,n){return e[n]<<24|e[n+1]<<16|e[n+2]<<8|e[n+3]}function d(e,n){var t=g(e,n);return 2147483648&t?t+4294967296:t}function y(e,n){return e[n]<<8|e[n+1]}function w(e,n){return e[n]<<24>>24}function x(e,n,t,r,a,i,s,l){e&&error("JBIG2 error: MMR encoding is not supported");for(var o=!!i,h=f[r].concat(s),c=h.length,u=new Int32Array(c),p=new Int32Array(c),g=0;g<c;g++)u[g]=h[g].x,p[g]=h[g].y;for(var d=m[r],y=[],w=l.decoder,x=l.contextCache.getContexts("GB"),v=0,b=0;b<t;b++){if(a)v^=w.readBit(x,d);if(v)y.push(y[y.length-1]);else{var I=new Uint8Array(n);y.push(I);for(var F=0;F<n;F++)if(o&&i[b][F])I[F]=0;else{var q=0;for(g=0;g<c;g++){var k=b+p[g],A=F+u[g];k<0||A<0||A>=n?q<<=1:q=q<<1|y[k][A]}var R=w.readBit(x,q);I[F]=R}}}return y}function v(e,n,t,r,a,i,s,l,o){var h=c[t].coding;0===t&&(h=h.concat([l[0]]));for(var f=h.length,m=new Int32Array(f),p=new Int32Array(f),g=0;g<f;g++)m[g]=h[g].x,p[g]=h[g].y;var d=c[t].reference;0===t&&(d=d.concat([l[1]]));var y=d.length,w=new Int32Array(y),x=new Int32Array(y);for(g=0;g<y;g++)w[g]=d[g].x,x[g]=d[g].y;for(var v=r[0].length,b=r.length,I=u[t],F=[],q=o.decoder,k=o.contextCache.getContexts("GR"),A=0,R=0;R<n;R++){if(s)A^=q.readBit(k,I);var B=new Uint8Array(e);F.push(B);for(var G=0;G<e;G++){A&&error("JBIG2 error: prediction is not supported");var D=0;for(g=0;g<f;g++){var S=R+p[g],C=G+m[g];S<0||C<0||C>=e?D<<=1:D=D<<1|F[S][C]}for(g=0;g<y;g++){S=R+x[g]+i,C=G+w[g]+a;S<0||S>=b||C<0||C>=v?D<<=1:D=D<<1|r[S][C]}var J=q.readBit(k,D);B[G]=J}}return F}function b(e,n){var t={};t.number=d(e,n);var r=e[n+4],a=63&r;h[a]||error("JBIG2 error: invalid segment type: "+a),t.type=a,t.typeName=h[a],t.deferredNonRetain=!!(128&r);var i=!!(64&r),s=e[n+5],l=s>>5&7,o=[31&s],f=n+6;if(7==s){l=536870911&g(e,f-1),f+=3;var c=l+7>>3;for(o[0]=e[f++];--c>0;)o.push(e[f++])}else 5!=s&&6!=s||error("JBIG2 error: invalid referred-to flags");t.retainBits=o;for(var m=t.number<=256?1:t.number<=65536?2:4,u=[],p=0;p<l;p++){var w=1==m?e[f]:2==m?y(e,f):d(e,f);u.push(w),f+=m}if(t.referredTo=u,i?(t.pageAssociation=d(e,f),f+=4):t.pageAssociation=e[f++],t.length=d(e,f),f+=4,4294967295==t.length)if(38===a){var x=F(e,f),v=!!(1&e[f+q]),b=new Uint8Array(6);v||(b[0]=255,b[1]=172),b[2]=x.height>>>24&255,b[3]=x.height>>16&255,b[4]=x.height>>8&255,b[5]=255&x.height;p=f;for(var I=e.length;p<I;p++){for(var k=0;k<6&&b[k]===e[p+k];)k++;if(6==k){t.length=p+6;break}}4294967295==t.length&&error("JBIG2 error: segment end was not found")}else error("JBIG2 error: invalid unknown segment length");return t.headerEnd=f,t}function I(e,n,t,r){for(var a=[],i=t;i<r;){var s=b(n,i);i=s.headerEnd;var l={header:s,data:n};if(e.randomAccess||(l.start=i,i+=s.length,l.end=i),a.push(l),51==s.type)break}if(e.randomAccess)for(var o=0,h=a.length;o<h;o++)a[o].start=i,i+=a[o].header.length,a[o].end=i;return a}function F(e,n){return{width:d(e,n),height:d(e,n+4),x:d(e,n+8),y:d(e,n+12),combinationOperator:7&e[n+16]}}var q=17;function k(e,n){var t,r=e.header,a=e.data,i=e.start,s=e.end;switch(r.type){case 0:var l={},o=y(a,i);if(l.huffman=!!(1&o),l.refinement=!!(2&o),l.huffmanDHSelector=o>>2&3,l.huffmanDWSelector=o>>4&3,l.bitmapSizeSelector=o>>6&1,l.aggregationInstancesSelector=o>>7&1,l.bitmapCodingContextUsed=!!(256&o),l.bitmapCodingContextRetained=!!(512&o),l.template=o>>10&3,l.refinementTemplate=o>>12&1,i+=2,!l.huffman){for(var h=0===l.template?4:1,f=[],c=0;c<h;c++)f.push({x:w(a,i),y:w(a,i+1)}),i+=2;l.at=f}if(l.refinement&&!l.refinementTemplate){for(f=[],c=0;c<2;c++)f.push({x:w(a,i),y:w(a,i+1)}),i+=2;l.refinementAt=f}l.numberOfExportedSymbols=d(a,i),i+=4,l.numberOfNewSymbols=d(a,i),i+=4,t=[l,r.number,r.referredTo,a,i,s];break;case 6:case 7:var m={};m.info=F(a,i);var u=y(a,i+=q);if(i+=2,m.huffman=!!(1&u),m.refinement=!!(2&u),m.stripSize=1<<(u>>2&3),m.referenceCorner=u>>4&3,m.transposed=!!(64&u),m.combinationOperator=u>>7&3,m.defaultPixelValue=u>>9&1,m.dsOffset=u<<17>>27,m.refinementTemplate=u>>15&1,m.huffman){var p=y(a,i);i+=2,m.huffmanFS=3&p,m.huffmanDS=p>>2&3,m.huffmanDT=p>>4&3,m.huffmanRefinementDW=p>>6&3,m.huffmanRefinementDH=p>>8&3,m.huffmanRefinementDX=p>>10&3,m.huffmanRefinementDY=p>>12&3,m.huffmanRefinementSizeSelector=!!(14&p)}if(m.refinement&&!m.refinementTemplate){for(f=[],c=0;c<2;c++)f.push({x:w(a,i),y:w(a,i+1)}),i+=2;m.refinementAt=f}m.numberOfSymbolInstances=d(a,i),i+=4,m.huffman&&error("JBIG2 error: huffman is not supported"),t=[m,r.referredTo,a,i,s];break;case 38:case 39:var g={};g.info=F(a,i),i+=q;var x=a[i++];if(g.mmr=!!(1&x),g.template=x>>1&3,g.prediction=!!(8&x),!g.mmr){for(h=0===g.template?4:1,f=[],c=0;c<h;c++)f.push({x:w(a,i),y:w(a,i+1)}),i+=2;g.at=f}t=[g,a,i,s];break;case 48:var v={width:d(a,i),height:d(a,i+4),resolutionX:d(a,i+8),resolutionY:d(a,i+12)};4294967295==v.height&&delete v.height;var b=a[i+16];y(a,i+17);v.lossless=!!(1&b),v.refinement=!!(2&b),v.defaultPixelValue=b>>2&1,v.combinationOperator=b>>3&3,v.requiresBuffer=!!(32&b),v.combinationOperatorOverride=!!(64&b),t=[v];break;case 49:case 50:case 51:case 62:break;default:error("JBIG2 error: segment type "+r.typeName+"("+r.type+") is not implemented")}var I="on"+r.typeName;I in n&&n[I].apply(n,t)}function A(e,n){for(var t=0,r=e.length;t<r;t++)k(e[t],n)}var R=e.klass({onPageInformation:function(e){this.currentPageInfo=e;for(var n=e.width+7>>3,t=new Uint8Array(n*e.height),r=e.defaultPixelValue?255:0,a=0,i=t.length;a<i;a++)t[a]=r;this.buffer=t},drawBitmap:function(e,n){for(var t=this.currentPageInfo,r=e.width,a=e.height,i=t.width+7>>3,s=t.combinationOperatorOverride?e.combinationOperator:t.combinationOperator,l=this.buffer,o=0;o<a;o++){var h=128>>(7&e.x),f=(o+e.y)*i+(e.x>>3);switch(s){case 0:for(var c=0;c<r;c++)l[f]|=n[o][c]?h:0,(h>>=1)||(h=128,f++);break;case 2:for(c=0;c<r;c++)l[f]^=n[o][c]?h:0,(h>>=1)||(h=128,f++);break;default:error("JBIG2 error: operator "+s+" is not supported")}}},onImmediateGenericRegion:function(e,n,t,r){var a=e.info,i=new s(n,t,r),l=x(e.mmr,a.width,a.height,e.template,e.prediction,null,e.at,i);this.drawBitmap(a,l)},onImmediateLosslessGenericRegion:function(){this.onImmediateGenericRegion.apply(this,arguments)},onSymbolDictionary:function(e,n,t,r,a,i){e.huffman&&error("JBIG2 error: huffman is not supported");var h=this.symbols;h||(this.symbols=h={});for(var f=[],c=0,m=t.length;c<m;c++)f=f.concat(h[t[c]]);var u=new s(r,a,i);h[n]=function(e,n,t,r,a,i,s,h,f,c,m){e&&error("JBIG2 error: huffman is not supported");for(var u=[],g=0,d=p(t.length+r),y=m.decoder,w=m.contextCache;u.length<r;){g+=l(w,"IADH",y);for(var b=0;;){var I,F=l(w,"IADW",y);if(null===F)break;if(b+=F,n){l(w,"IAAI",y)>1&&error("JBIG2 error: number of instances > 1 is not supported");var q=o(w,y,d),k=l(w,"IARDX",y),A=l(w,"IARDY",y);I=v(b,g,f,q<t.length?t[q]:u[q-t.length],k,A,!1,c,m)}else I=x(!1,b,g,s,!1,null,h,m);u.push(I)}}for(var R=[],B=[],G=!1,D=t.length+r;B.length<D;){for(var S=l(w,"IAEX",y);S--;)B.push(G);G=!G}for(var C=0,J=t.length;C<J;C++)B[C]&&R.push(t[C]);for(var O=0;O<r;C++,O++)B[C]&&R.push(u[O]);return R}(e.huffman,e.refinement,f,e.numberOfNewSymbols,e.numberOfExportedSymbols,0,e.template,e.at,e.refinementTemplate,e.refinementAt,u)},onImmediateTextRegion:function(e,n,t,r,a){for(var i=e.info,h=this.symbols,f=[],c=0,m=n.length;c<m;c++)f=f.concat(h[n[c]]);var u=p(f.length),g=new s(t,r,a),d=function(e,n,t,r,a,i,s,h,f,c,m,u,p,g,d,y,w){e&&error("JBIG2 error: huffman is not supported");for(var x=[],b=0;b<r;b++){var I=new Uint8Array(t);if(a)for(var F=0;F<t;F++)I[F]=a;x.push(I)}var q=w.decoder,k=w.contextCache,A=-l(k,"IADT",q),R=0;for(b=0;b<i;){A+=l(k,"IADT",q);for(var B=R+=l(k,"IAFS",q);;){var G=s*A+(1==s?0:l(k,"IAIT",q)),D=o(k,q,f),S=n&&l(k,"IARI",q),C=h[D],J=C[0].length,O=C.length;if(S){var T=l(k,"IARDW",q),E=l(k,"IARDH",q);C=v(J+=T,O+=E,d,C,(T>>1)+l(k,"IARDX",q),(E>>1)+l(k,"IARDY",q),!1,y,w)}var P=G-(1&u?0:O),L=B-(2&u?J:0);if(c){for(var N=0;N<O;N++)if(I=x[L+N]){var H=C[N],U=Math.min(t-P,J);switch(p){case 0:for(var X=0;X<U;X++)I[P+X]|=H[X];break;case 2:for(X=0;X<U;X++)I[P+X]^=H[X];break;default:error("JBIG2 error: operator "+p+" is not supported")}}B+=O-1}else{for(X=0;X<O;X++)if(I=x[P+X])switch(H=C[X],p){case 0:for(N=0;N<J;N++)I[L+N]|=H[N];break;case 2:for(N=0;N<J;N++)I[L+N]^=H[N];break;default:error("JBIG2 error: operator "+p+" is not supported")}B+=J-1}b++;var z=l(k,"IADS",q);if(null===z)break;B+=z+m}}return x}(e.huffman,e.refinement,i.width,i.height,e.defaultPixelValue,e.numberOfSymbolInstances,e.stripSize,f,u,e.transposed,e.dsOffset,e.referenceCorner,e.combinationOperator,0,e.refinementTemplate,e.refinementAt,g);this.drawBitmap(i,d)},onImmediateLosslessTextRegion:function(){this.onImmediateTextRegion.apply(this,arguments)}}),B=e.klass({parseChunks:function(e){return function(e){for(var n=new R,t=0,r=e.length;t<r;t++){var a=e[t];A(I({},a.data,a.start,a.end),n)}return n.buffer}(e)}}),G=n.inherit({klassName:"Jbig2Stream",init:function(e,n){this.dict=n,this.bytes=e,this.overrided()},ensureBuffer:function(e){if(!this.bufferLength){var n=new B,t=[],r=this.dict.get("DecodeParms");if(r&&r.has("JBIG2Globals")){var a=r.get("JBIG2Globals").getBytes();t.push({data:a,start:0,end:a.length})}t.push({data:this.bytes,start:0,end:this.bytes.length});for(var i=n.parseChunks(t),s=i.length,l=0;l<s;l++)i[l]^=255;this.buffer=i,this.bufferLength=s}},getChar:function(){error("internal error: getChar is not valid on Jbig2Stream")}});return t.jbig2={Jbig2Image:B,Jbig2Stream:G}});
//# sourceMappingURL=../sourcemaps/streams/jbig2.js.map
