(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-35f0e794"],{"1af6":function(t,e,i){var n=i("63b6");n(n.S,"Array",{isArray:i("9003")})},"20fd":function(t,e,i){"use strict";var n=i("d9f6"),r=i("aebd");t.exports=function(t,e,i){e in t?n.f(t,e,r(0,i)):t[e]=i}},"28a5":function(t,e,i){"use strict";var n=i("aae3"),r=i("cb7c"),a=i("ebd6"),s=i("0390"),o=i("9def"),c=i("5f1b"),u=i("520a"),l=i("79e5"),f=Math.min,p=[].push,d="split",h="length",m="lastIndex",v=4294967295,g=!l(function(){RegExp(v,"y")});i("214f")("split",2,function(t,e,i,l){var b;return b="c"=="abbc"[d](/(b)*/)[1]||4!="test"[d](/(?:)/,-1)[h]||2!="ab"[d](/(?:ab)*/)[h]||4!="."[d](/(.?)(.?)/)[h]||"."[d](/()()/)[h]>1||""[d](/.?/)[h]?function(t,e){var r=String(this);if(void 0===t&&0===e)return[];if(!n(t))return i.call(r,t,e);var a,s,o,c=[],l=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),f=0,d=void 0===e?v:e>>>0,g=new RegExp(t.source,l+"g");while(a=u.call(g,r)){if(s=g[m],s>f&&(c.push(r.slice(f,a.index)),a[h]>1&&a.index<r[h]&&p.apply(c,a.slice(1)),o=a[0][h],f=s,c[h]>=d))break;g[m]===a.index&&g[m]++}return f===r[h]?!o&&g.test("")||c.push(""):c.push(r.slice(f)),c[h]>d?c.slice(0,d):c}:"0"[d](void 0,0)[h]?function(t,e){return void 0===t&&0===e?[]:i.call(this,t,e)}:i,[function(i,n){var r=t(this),a=void 0==i?void 0:i[e];return void 0!==a?a.call(i,r,n):b.call(String(r),i,n)},function(t,e){var n=l(b,t,this,e,b!==i);if(n.done)return n.value;var u=r(t),p=String(this),d=a(u,RegExp),h=u.unicode,m=(u.ignoreCase?"i":"")+(u.multiline?"m":"")+(u.unicode?"u":"")+(g?"y":"g"),y=new d(g?u:"^(?:"+u.source+")",m),w=void 0===e?v:e>>>0;if(0===w)return[];if(0===p.length)return null===c(y,p)?[p]:[];var x=0,C=0,_=[];while(C<p.length){y.lastIndex=g?C:0;var A,P=c(y,g?p:p.slice(C));if(null===P||(A=f(o(y.lastIndex+(g?0:C)),p.length))===x)C=s(p,C,h);else{if(_.push(p.slice(x,C)),_.length===w)return _;for(var E=1;E<=P.length-1;E++)if(_.push(P[E]),_.length===w)return _;C=x=A}}return _.push(p.slice(x)),_}]})},"337f":function(t,e,i){"use strict";i("3b2b"),i("a481"),i("7f7f"),i("28a5"),i("6b54"),i("5df3"),i("ac6a");var n=i("795b"),r=i.n(n),a=i("8aa5"),s=i.n(a);e["a"]={methods:{upload:function(t,e){var i=this;return new r.a(function(n,a){var s=[];t.forEach(function(t){s.push(i.uploadPicture(e,t.file))},i),r.a.all(s).then(function(t){n(t)}).catch(function(t){a(t)})})},uploadPicture:function(t,e){var i=s.a.storage().ref(),n="images/"+t+"/"+Math.random().toString(36).substring(2,15)+Math.random().toString(36).substring(2,15)+"."+e.name.split(".").pop(),a=i.child(n);return new r.a(function(t,i){a.put(e).on("state_changed",function(){},function(t){console.log("upload picture error",t),i(t)},function(){a.getDownloadURL().then(function(e){t({path:n,src:e})})})})},slug:function(t){if(!t)return t;t=t.replace(/^\s+|\s+$/g,""),t=t.toLowerCase();for(var e="åàáãäâèéëêìíïîòóöôùúüûñç·/_,:;",i="aaaaaaeeeeiiiioooouuuunc------",n=0,r=e.length;n<r;n++)t=t.replace(new RegExp(e.charAt(n),"g"),i.charAt(n));return t=t.replace(/[^a-z0-9 -]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-").replace(/^-+/,"").replace(/-+$/,""),t}}}},"3b2b":function(t,e,i){var n=i("7726"),r=i("5dbc"),a=i("86cc").f,s=i("9093").f,o=i("aae3"),c=i("0bfb"),u=n.RegExp,l=u,f=u.prototype,p=/a/g,d=/a/g,h=new u(p)!==p;if(i("9e1e")&&(!h||i("79e5")(function(){return d[i("2b4c")("match")]=!1,u(p)!=p||u(d)==d||"/a/i"!=u(p,"i")}))){u=function(t,e){var i=this instanceof u,n=o(t),a=void 0===e;return!i&&n&&t.constructor===u&&a?t:r(h?new l(n&&!a?t.source:t,e):l((n=t instanceof u)?t.source:t,n&&a?c.call(t):e),i?this:f,u)};for(var m=function(t){t in u||a(u,t,{configurable:!0,get:function(){return l[t]},set:function(e){l[t]=e}})},v=s(l),g=0;v.length>g;)m(v[g++]);f.constructor=u,u.prototype=f,i("2aba")(n,"RegExp",u)}i("7a56")("RegExp")},"549b":function(t,e,i){"use strict";var n=i("d864"),r=i("63b6"),a=i("241e"),s=i("b0dc"),o=i("3702"),c=i("b447"),u=i("20fd"),l=i("7cd6");r(r.S+r.F*!i("4ee1")(function(t){Array.from(t)}),"Array",{from:function(t){var e,i,r,f,p=a(t),d="function"==typeof this?this:Array,h=arguments.length,m=h>1?arguments[1]:void 0,v=void 0!==m,g=0,b=l(p);if(v&&(m=n(m,h>2?arguments[2]:void 0,2)),void 0==b||d==Array&&o(b))for(e=c(p.length),i=new d(e);e>g;g++)u(i,g,v?m(p[g],g):p[g]);else for(f=b.call(p),i=new d;!(r=f.next()).done;g++)u(i,g,v?s(f,m,[r.value,g],!0):r.value);return i.length=g,i}})},"54a1":function(t,e,i){i("6c1c"),i("1654"),t.exports=i("95d5")},"5dbc":function(t,e,i){var n=i("d3f4"),r=i("8b97").set;t.exports=function(t,e,i){var a,s=e.constructor;return s!==i&&"function"==typeof s&&(a=s.prototype)!==i.prototype&&n(a)&&r&&r(t,a),t}},"75fc":function(t,e,i){"use strict";var n=i("a745"),r=i.n(n);function a(t){if(r()(t)){for(var e=0,i=new Array(t.length);e<t.length;e++)i[e]=t[e];return i}}var s=i("774e"),o=i.n(s),c=i("c8bb"),u=i.n(c);function l(t){if(u()(Object(t))||"[object Arguments]"===Object.prototype.toString.call(t))return o()(t)}function f(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function p(t){return a(t)||l(t)||f()}i.d(e,"a",function(){return p})},"774e":function(t,e,i){t.exports=i("d2d5")},"8b97":function(t,e,i){var n=i("d3f4"),r=i("cb7c"),a=function(t,e){if(r(t),!n(e)&&null!==e)throw TypeError(e+": can't set as prototype!")};t.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(t,e,n){try{n=i("9b43")(Function.call,i("11e9").f(Object.prototype,"__proto__").set,2),n(t,[]),e=!(t instanceof Array)}catch(r){e=!0}return function(t,i){return a(t,i),e?t.__proto__=i:n(t,i),t}}({},!1):void 0),check:a}},9003:function(t,e,i){var n=i("6b4c");t.exports=Array.isArray||function(t){return"Array"==n(t)}},"95d5":function(t,e,i){var n=i("40c3"),r=i("5168")("iterator"),a=i("481b");t.exports=i("584a").isIterable=function(t){var e=Object(t);return void 0!==e[r]||"@@iterator"in e||a.hasOwnProperty(n(e))}},a291:function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"bg-light hero is-fullheight"},[i("div",{staticClass:"hero-body container"},[i("div",{staticClass:"container"},[i("div",{staticClass:"columns"},[i("div",{staticClass:"column is-8 is-offset-2"},[i("p",{staticClass:"title"},[t._v("Add An Item to Shirley's Estate Sale")]),i("form",{ref:"form",on:{submit:function(e){return e.preventDefault(),t.submit(e)}}},[i("div",{staticClass:"field"},[i("label",{staticClass:"label",attrs:{for:"name"}},[t._v("Name")]),i("div",{staticClass:"control"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.item.name,expression:"item.name"}],ref:"name",staticClass:"input is-medium",attrs:{type:"text",id:"name",placeholder:"Vintage toaster",required:""},domProps:{value:t.item.name},on:{input:function(e){e.target.composing||t.$set(t.item,"name",e.target.value)}}})]),t.errors["name"]?i("p",{staticClass:"help is-danger"},[t._v("This name is already taken, please choose another.")]):t._e()]),i("div",{staticClass:"field"},[i("label",{staticClass:"label",attrs:{for:"description"}},[t._v("Description")]),i("div",{staticClass:"control"},[i("textarea",{directives:[{name:"model",rawName:"v-model",value:t.item.description,expression:"item.description"}],staticClass:"textarea is-medium",attrs:{id:"description",placeholder:"A super cute item that you really should buy."},domProps:{value:t.item.description},on:{input:function(e){e.target.composing||t.$set(t.item,"description",e.target.value)}}})]),i("p",[t._v("Optional. Short or as long as you want. Please use full sentences.")])]),i("div",{staticClass:"field"},[i("label",{staticClass:"label",attrs:{for:"price"}},[t._v("Price")]),i("div",{staticClass:"control"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.item.price,expression:"item.price"}],staticClass:"input is-medium",attrs:{type:"number",pattern:"[0-9]+(\\.[0-9][0-9]?)?",step:"0.01",id:"price",placeholder:"100.00",required:""},domProps:{value:t.item.price},on:{input:function(e){e.target.composing||t.$set(t.item,"price",e.target.value)}}})]),i("p",[t._v("Do not include dollar sign.")])]),i("label",{staticClass:"label"},[t._v("Pictures")]),i("div",{staticClass:"pictures columns is-multiline is-vcentered"},t._l(t.pictures,function(e,n){return i("div",{key:n,staticClass:"picture column is-half-tablet"},[i("img",{attrs:{src:e.objectURL}}),i("button",{staticClass:"button is-light is-warning is-fullwidth",on:{click:function(e){return e.preventDefault(),t.pictures.splice(n,1)}}},[t._v("Delete")])])}),0),i("div",{staticClass:"file is-boxed"},[i("label",{staticClass:"file-label"},[i("input",{ref:"inputPicture",staticClass:"file-input",attrs:{type:"file",name:"picture",accept:"image/*",multiple:"",camera:""},on:{change:t.onPictureChange}}),i("span",{staticClass:"file-cta"},[i("span",{staticClass:"file-icon"},[i("font-awesome-icon",{attrs:{icon:"upload"}})],1),i("span",{staticClass:"file-label"},[t._v("\n                                        Choose a file…\n                                    ")])])])]),i("button",{staticClass:"button is-primary is-large is-fullwidth move-down",class:{"is-loading":t.isLoading},attrs:{type:"submit"}},[t._v("Add This Item\n                        ")])]),i("router-link",{staticClass:"button is-large is-light is-fullwidth move-down",attrs:{to:"/"}},[t._v("Go Home")])],1)])])])])},r=[],a=i("75fc"),s=(i("ac6a"),i("7f7f"),i("96cf"),i("3b8d")),o=i("8aa5"),c=i.n(o),u=i("17e1"),l=i("337f"),f=i("1940"),p=i.n(f),d={mixins:[l["a"]],data:function(){return{isLoading:!1,item:{name:"",description:"",price:"",pictures:[]},pictures:[],errors:{name:!1}}},created:function(){this.storage=c.a.storage().ref()},methods:{submit:function(){var t=Object(s["a"])(regeneratorRuntime.mark(function t(){var e,i,n,r=this;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:for(e in this.isLoading=!0,this.errors)this.errors[e]=!1;return t.next=4,u["a"].collection("items").doc(this.slug(this.item.name)).get();case 4:if(i=t.sent,!i.exists){t.next=11;break}return this.errors.name=!0,window.scrollTo({top:document.querySelector("#name").offsetTop}),this.$refs.name.focus(),this.isLoading=!1,t.abrupt("return");case 11:return n=this.slug(this.item.name),t.next=14,this.upload(this.pictures,n).catch(function(t){console.log("pictures error",t)});case 14:return this.item.pictures=t.sent,t.next=17,u["a"].collection("items").doc(n).set(this.item).catch(function(t){p()("Error",t,"error"),r.isLoading=!1});case 17:return t.next=19,p()({title:"Item saved!",icon:"success",buttons:{cancel:"View",success:"Add Another"}});case 19:if(t.sent){t.next=21;break}this.$router.push("/i/"+n);case 21:window.scrollTo({top:0,behavior:"smooth"}),this.item.name="",this.item.price="",this.item.description="",this.item.pictures=[],this.pictures=[],this.isLoading=!1;case 28:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),onPictureChange:function(){var t=this;Object(a["a"])(this.$refs.inputPicture.files).forEach(function(e){var i={file:e};i.objectURL=URL.createObjectURL(e),t.pictures.push(i)}),this.$refs.inputPicture.value=null}}},h=d,m=i("2877"),v=Object(m["a"])(h,n,r,!1,null,null,null);e["default"]=v.exports},a745:function(t,e,i){t.exports=i("f410")},c8bb:function(t,e,i){t.exports=i("54a1")},d2d5:function(t,e,i){i("1654"),i("549b"),t.exports=i("584a").Array.from},f410:function(t,e,i){i("1af6"),t.exports=i("584a").Array.isArray}}]);
//# sourceMappingURL=chunk-35f0e794.d811eade.js.map