function ah(W,$e){for(var Ae=0;Ae<$e.length;Ae++){const xe=$e[Ae];if(typeof xe!="string"&&!Array.isArray(xe)){for(const ze in xe)if(ze!=="default"&&!(ze in W)){const fe=Object.getOwnPropertyDescriptor(xe,ze);fe&&Object.defineProperty(W,ze,fe.get?fe:{enumerable:!0,get:()=>xe[ze]})}}}return Object.freeze(Object.defineProperty(W,Symbol.toStringTag,{value:"Module"}))}var Yn={},sa={},Np;function tc(){if(Np)return sa;Np=1,Object.defineProperty(sa,"__esModule",{value:!0}),sa.baseAssetPath=void 0;const $e=typeof window<"u"&&typeof window.document<"u"?window.document.currentScript:null;let Ae="/";return $e&&(Ae=$e.src.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^/]+$/,"/")),sa.baseAssetPath=Ae,sa}var oa={},Lp;function rs(){if(Lp)return oa;Lp=1,Object.defineProperty(oa,"__esModule",{value:!0}),oa.defaultModelFetcher=void 0;const W=$e=>fetch($e).then(Ae=>Ae.arrayBuffer());return oa.defaultModelFetcher=W,oa}var Yt={},ua={},qp;function fa(){if(qp)return ua;qp=1,Object.defineProperty(ua,"__esModule",{value:!0}),ua.log=void 0;const W=$e=>Ae=>{console.log(`VAD | ${$e} >`,Ae)};return ua.log={error:W("error"),debug:W("debug"),warn:W("warn")},ua}var la={},Vp;function Ba(){if(Vp)return la;Vp=1,Object.defineProperty(la,"__esModule",{value:!0}),la.Message=void 0;var W;return(function($e){$e.AudioFrame="AUDIO_FRAME",$e.SpeechStart="SPEECH_START",$e.VADMisfire="VAD_MISFIRE",$e.SpeechEnd="SPEECH_END",$e.SpeechStop="SPEECH_STOP",$e.SpeechRealStart="SPEECH_REAL_START",$e.FrameProcessed="FRAME_PROCESSED"})(W||(la.Message=W={})),la}var Fp;function is(){if(Fp)return Yt;Fp=1,Object.defineProperty(Yt,"__esModule",{value:!0}),Yt.FrameProcessor=Yt.validateOptions=Yt.defaultFrameProcessorOptions=void 0;const W=fa(),$e=Ba();Yt.defaultFrameProcessorOptions={positiveSpeechThreshold:.3,negativeSpeechThreshold:.25,preSpeechPadMs:800,redemptionMs:1400,minSpeechMs:400,submitUserSpeechOnPause:!1};function Ae(oe){(oe.positiveSpeechThreshold<0||oe.positiveSpeechThreshold>1)&&W.log.error("positiveSpeechThreshold should be a number between 0 and 1"),(oe.negativeSpeechThreshold<0||oe.negativeSpeechThreshold>oe.positiveSpeechThreshold)&&W.log.error("negativeSpeechThreshold should be between 0 and positiveSpeechThreshold"),oe.preSpeechPadMs<0&&W.log.error("preSpeechPadMs should be positive"),oe.redemptionMs<0&&W.log.error("redemptionMs should be positive"),oe.minSpeechMs<0&&W.log.error("minSpeechMs should be positive")}Yt.validateOptions=Ae;const xe=oe=>{const G=oe.reduce((X,ye)=>(X.push(X.at(-1)+ye.length),X),[0]),I=new Float32Array(G.at(-1));return oe.forEach((X,ye)=>{const Te=G[ye];I.set(X,Te)}),I};function ze(oe,G){const I=Math.floor(oe.redemptionMs/G),X=Math.floor(oe.preSpeechPadMs/G),ye=Math.floor(oe.minSpeechMs/G);return{redemptionFrames:I,preSpeechPadFrames:X,minSpeechFrames:ye}}class fe{constructor(G,I,X,ye){this.modelProcessFunc=G,this.modelResetFunc=I,this.options=X,this.msPerFrame=ye,this.speaking=!1,this.redemptionCounter=0,this.speechFrameCount=0,this.active=!1,this.speechRealStartFired=!1,this.setOptions=Q=>{this.options={...this.options,...Q};const{redemptionFrames:ae,preSpeechPadFrames:Oe,minSpeechFrames:We}=ze(this.options,this.msPerFrame);this.redemptionFrames=ae,this.preSpeechPadFrames=Oe,this.minSpeechFrames=We},this.reset=()=>{this.speaking=!1,this.speechRealStartFired=!1,this.audioBuffer=[],this.modelResetFunc(),this.redemptionCounter=0,this.speechFrameCount=0},this.pause=Q=>{this.active=!1,this.options.submitUserSpeechOnPause?this.endSegment(Q):this.reset()},this.resume=()=>{this.active=!0},this.endSegment=Q=>{const ae=this.audioBuffer;this.audioBuffer=[];const Oe=this.speaking;if(this.reset(),Oe)if(ae.reduce((Ee,we)=>we.isSpeech?Ee+1:Ee,0)>=this.minSpeechFrames){const Ee=xe(ae.map(we=>we.frame));Q({msg:$e.Message.SpeechEnd,audio:Ee})}else Q({msg:$e.Message.VADMisfire});return{}},this.process=async(Q,ae)=>{if(!this.active)return;const Oe=await this.modelProcessFunc(Q),We=Oe.isSpeech>=this.options.positiveSpeechThreshold;if(ae({probs:Oe,msg:$e.Message.FrameProcessed,frame:Q}),this.audioBuffer.push({frame:Q,isSpeech:We}),We&&(this.speechFrameCount++,this.redemptionCounter=0),We&&!this.speaking&&(this.speaking=!0,ae({msg:$e.Message.SpeechStart})),this.speaking&&this.speechFrameCount===this.minSpeechFrames&&!this.speechRealStartFired&&(this.speechRealStartFired=!0,ae({msg:$e.Message.SpeechRealStart})),Oe.isSpeech<this.options.negativeSpeechThreshold&&this.speaking&&++this.redemptionCounter>=this.redemptionFrames){this.redemptionCounter=0,this.speechFrameCount=0,this.speaking=!1,this.speechRealStartFired=!1;const Ee=this.audioBuffer;if(this.audioBuffer=[],Ee.reduce((me,Re)=>Re.isSpeech?me+1:me,0)>=this.minSpeechFrames){const me=xe(Ee.map(Re=>Re.frame));ae({msg:$e.Message.SpeechEnd,audio:me})}else ae({msg:$e.Message.VADMisfire})}if(!this.speaking){for(;this.audioBuffer.length>this.preSpeechPadFrames;)this.audioBuffer.shift();this.speechFrameCount=0}},this.audioBuffer=[];const{redemptionFrames:Te,preSpeechPadFrames:he,minSpeechFrames:ue}=ze(this.options,this.msPerFrame);this.redemptionFrames=Te,this.preSpeechPadFrames=he,this.minSpeechFrames=ue,this.reset()}}return Yt.FrameProcessor=fe,Yt}var Jt={};function vt(W){throw new Error('Could not dynamically require "'+W+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var Jn={exports:{}};var Wp;function nh(){return Wp||(Wp=1,(function(W,$e){var Ae=(()=>{var xe=Object.defineProperty,ze=Object.getOwnPropertyDescriptor,fe=Object.getOwnPropertyNames,oe=Object.prototype.hasOwnProperty,G=(e=>typeof vt<"u"?vt:typeof Proxy<"u"?new Proxy(e,{get:(t,r)=>(typeof vt<"u"?vt:t)[r]}):e)(function(e){if(typeof vt<"u")return vt.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')}),I=(e,t)=>()=>(e&&(t=e(e=0)),t),X=(e,t)=>{for(var r in t)xe(e,r,{get:t[r],enumerable:!0})},ye=(e,t,r,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of fe(t))!oe.call(e,a)&&a!==r&&xe(e,a,{get:()=>t[a],enumerable:!(i=ze(t,a))||i.enumerable});return e},Te=e=>ye(xe({},"__esModule",{value:!0}),e),he,ue,Q,ae,Oe,We=I(()=>{he=new Map,ue=[],Q=(e,t,r)=>{if(t&&typeof t.init=="function"&&typeof t.createInferenceSessionHandler=="function"){let i=he.get(e);if(i===void 0)he.set(e,{backend:t,priority:r});else{if(i.priority>r)return;if(i.priority===r&&i.backend!==t)throw new Error(`cannot register backend "${e}" using priority ${r}`)}if(r>=0){let a=ue.indexOf(e);a!==-1&&ue.splice(a,1);for(let n=0;n<ue.length;n++)if(he.get(ue[n]).priority<=r){ue.splice(n,0,e);return}ue.push(e)}return}throw new TypeError("not a valid backend")},ae=async e=>{let t=he.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let r=!!t.initPromise;try{return r||(t.initPromise=t.backend.init(e)),await t.initPromise,t.initialized=!0,t.backend}catch(i){return r||(t.error=`${i}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},Oe=async e=>{let t=e.executionProviders||[],r=t.map(u=>typeof u=="string"?u:u.name),i=r.length===0?ue:r,a,n=[],s=new Set;for(let u of i){let l=await ae(u);typeof l=="string"?n.push({name:u,err:l}):(a||(a=l),a===l&&s.add(u))}if(!a)throw new Error(`no available backend found. ERR: ${n.map(u=>`[${u.name}] ${u.err}`).join(", ")}`);for(let{name:u,err:l}of n)r.includes(u)&&console.warn(`removing requested execution provider "${u}" from session options because it is not available: ${l}`);let o=t.filter(u=>s.has(typeof u=="string"?u:u.name));return[a,new Proxy(e,{get:(u,l)=>l==="executionProviders"?o:Reflect.get(u,l)})]}}),Ee=I(()=>{We()}),we,me=I(()=>{we="1.22.0"}),Re,ke,Ve=I(()=>{me(),Re="warning",ke={wasm:{},webgl:{},webgpu:{},versions:{common:we},set logLevel(e){if(e!==void 0){if(typeof e!="string"||["verbose","info","warning","error","fatal"].indexOf(e)===-1)throw new Error(`Unsupported logging level: ${e}`);Re=e}},get logLevel(){return Re}},Object.defineProperty(ke,"logLevel",{enumerable:!0})}),ee,Je=I(()=>{Ve(),ee=ke}),lt,xt,_t=I(()=>{lt=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);r.width=e.dims[3],r.height=e.dims[2];let i=r.getContext("2d");if(i!=null){let a,n;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(a=e.dims[2],n=e.dims[3]):(a=e.dims[3],n=e.dims[2]);let s=t?.format!==void 0?t.format:"RGB",o=t?.norm,u,l;o===void 0||o.mean===void 0?u=[255,255,255,255]:typeof o.mean=="number"?u=[o.mean,o.mean,o.mean,o.mean]:(u=[o.mean[0],o.mean[1],o.mean[2],0],o.mean[3]!==void 0&&(u[3]=o.mean[3])),o===void 0||o.bias===void 0?l=[0,0,0,0]:typeof o.bias=="number"?l=[o.bias,o.bias,o.bias,o.bias]:(l=[o.bias[0],o.bias[1],o.bias[2],0],o.bias[3]!==void 0&&(l[3]=o.bias[3]));let d=n*a,p=0,h=d,f=d*2,m=-1;s==="RGBA"?(p=0,h=d,f=d*2,m=d*3):s==="RGB"?(p=0,h=d,f=d*2):s==="RBG"&&(p=0,f=d,h=d*2);for(let y=0;y<n;y++)for(let b=0;b<a;b++){let _=(e.data[p++]-l[0])*u[0],w=(e.data[h++]-l[1])*u[1],x=(e.data[f++]-l[2])*u[2],v=m===-1?255:(e.data[m++]-l[3])*u[3];i.fillStyle="rgba("+_+","+w+","+x+","+v+")",i.fillRect(b,y,1,1)}if("toDataURL"in r)return r.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},xt=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),i;if(r!=null){let a,n,s;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(a=e.dims[2],n=e.dims[1],s=e.dims[3]):(a=e.dims[3],n=e.dims[2],s=e.dims[1]);let o=t!==void 0&&t.format!==void 0?t.format:"RGB",u=t?.norm,l,d;u===void 0||u.mean===void 0?l=[255,255,255,255]:typeof u.mean=="number"?l=[u.mean,u.mean,u.mean,u.mean]:(l=[u.mean[0],u.mean[1],u.mean[2],255],u.mean[3]!==void 0&&(l[3]=u.mean[3])),u===void 0||u.bias===void 0?d=[0,0,0,0]:typeof u.bias=="number"?d=[u.bias,u.bias,u.bias,u.bias]:(d=[u.bias[0],u.bias[1],u.bias[2],0],u.bias[3]!==void 0&&(d[3]=u.bias[3]));let p=n*a;if(t!==void 0&&(t.format!==void 0&&s===4&&t.format!=="RGBA"||s===3&&t.format!=="RGB"&&t.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let h=4,f=0,m=1,y=2,b=3,_=0,w=p,x=p*2,v=-1;o==="RGBA"?(_=0,w=p,x=p*2,v=p*3):o==="RGB"?(_=0,w=p,x=p*2):o==="RBG"&&(_=0,x=p,w=p*2),i=r.createImageData(a,n);for(let k=0;k<n*a;f+=h,m+=h,y+=h,b+=h,k++)i.data[f]=(e.data[_++]-d[0])*l[0],i.data[m]=(e.data[w++]-d[1])*l[1],i.data[y]=(e.data[x++]-d[2])*l[2],i.data[b]=v===-1?255:(e.data[v++]-d[3])*l[3]}else throw new Error("Can not access image data");return i}}),gt,ur,lr,Pe,Wt,dr,jr=I(()=>{cr(),gt=(e,t)=>{if(e===void 0)throw new Error("Image buffer must be defined");if(t.height===void 0||t.width===void 0)throw new Error("Image height and width must be defined");if(t.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:r,width:i}=t,a=t.norm??{mean:255,bias:0},n,s;typeof a.mean=="number"?n=[a.mean,a.mean,a.mean,a.mean]:n=[a.mean[0],a.mean[1],a.mean[2],a.mean[3]??255],typeof a.bias=="number"?s=[a.bias,a.bias,a.bias,a.bias]:s=[a.bias[0],a.bias[1],a.bias[2],a.bias[3]??0];let o=t.format!==void 0?t.format:"RGBA",u=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:"RGB",l=r*i,d=u==="RGBA"?new Float32Array(l*4):new Float32Array(l*3),p=4,h=0,f=1,m=2,y=3,b=0,_=l,w=l*2,x=-1;o==="RGB"&&(p=3,h=0,f=1,m=2,y=-1),u==="RGBA"?x=l*3:u==="RBG"?(b=0,w=l,_=l*2):u==="BGR"&&(w=0,_=l,b=l*2);for(let v=0;v<l;v++,h+=p,m+=p,f+=p,y+=p)d[b++]=(e[h]+s[0])/n[0],d[_++]=(e[f]+s[1])/n[1],d[w++]=(e[m]+s[2])/n[2],x!==-1&&y!==-1&&(d[x++]=(e[y]+s[3])/n[3]);return u==="RGBA"?new Ue("float32",d,[1,4,r,i]):new Ue("float32",d,[1,3,r,i])},ur=async(e,t)=>{let r=typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement,i=typeof ImageData<"u"&&e instanceof ImageData,a=typeof ImageBitmap<"u"&&e instanceof ImageBitmap,n=typeof e=="string",s,o=t??{},u=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},l=d=>typeof HTMLCanvasElement<"u"&&d instanceof HTMLCanvasElement||d instanceof OffscreenCanvas?d.getContext("2d"):null;if(r){let d=u();d.width=e.width,d.height=e.height;let p=l(d);if(p!=null){let h=e.height,f=e.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(h=t.resizedHeight,f=t.resizedWidth),t!==void 0){if(o=t,t.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");o.tensorFormat="RGBA",o.height=h,o.width=f}else o.tensorFormat="RGBA",o.height=h,o.width=f;p.drawImage(e,0,0),s=p.getImageData(0,0,f,h).data}else throw new Error("Can not access image data")}else if(i){let d,p;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(d=t.resizedHeight,p=t.resizedWidth):(d=e.height,p=e.width),t!==void 0&&(o=t),o.format="RGBA",o.height=d,o.width=p,t!==void 0){let h=u();h.width=p,h.height=d;let f=l(h);if(f!=null)f.putImageData(e,0,0),s=f.getImageData(0,0,p,d).data;else throw new Error("Can not access image data")}else s=e.data}else if(a){if(t===void 0)throw new Error("Please provide image config with format for Imagebitmap");let d=u();d.width=e.width,d.height=e.height;let p=l(d);if(p!=null){let h=e.height,f=e.width;return p.drawImage(e,0,0,f,h),s=p.getImageData(0,0,f,h).data,o.height=h,o.width=f,gt(s,o)}else throw new Error("Can not access image data")}else{if(n)return new Promise((d,p)=>{let h=u(),f=l(h);if(!e||!f)return p();let m=new Image;m.crossOrigin="Anonymous",m.src=e,m.onload=()=>{h.width=m.width,h.height=m.height,f.drawImage(m,0,0,h.width,h.height);let y=f.getImageData(0,0,h.width,h.height);o.height=h.height,o.width=h.width,d(gt(y.data,o))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(s!==void 0)return gt(s,o);throw new Error("Input data provided is not supported - aborted tensor creation")},lr=(e,t)=>{let{width:r,height:i,download:a,dispose:n}=t,s=[1,i,r,4];return new Ue({location:"texture",type:"float32",texture:e,dims:s,download:a,dispose:n})},Pe=(e,t)=>{let{dataType:r,dims:i,download:a,dispose:n}=t;return new Ue({location:"gpu-buffer",type:r??"float32",gpuBuffer:e,dims:i,download:a,dispose:n})},Wt=(e,t)=>{let{dataType:r,dims:i,download:a,dispose:n}=t;return new Ue({location:"ml-tensor",type:r??"float32",mlTensor:e,dims:i,download:a,dispose:n})},dr=(e,t,r)=>new Ue({location:"cpu-pinned",type:e,data:t,dims:r??[t.length]})}),dt,St,pr,pi,Ma=I(()=>{dt=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),St=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),pr=!1,pi=()=>{if(!pr){pr=!0;let e=typeof BigInt64Array<"u"&&BigInt64Array.from,t=typeof BigUint64Array<"u"&&BigUint64Array.from,r=globalThis.Float16Array,i=typeof r<"u"&&r.from;e&&(dt.set("int64",BigInt64Array),St.set(BigInt64Array,"int64")),t&&(dt.set("uint64",BigUint64Array),St.set(BigUint64Array,"uint64")),i?(dt.set("float16",r),St.set(r,"float16")):dt.set("float16",Uint16Array)}}}),ci,hi,Da=I(()=>{cr(),ci=e=>{let t=1;for(let r=0;r<e.length;r++){let i=e[r];if(typeof i!="number"||!Number.isSafeInteger(i))throw new TypeError(`dims[${r}] must be an integer, got: ${i}`);if(i<0)throw new RangeError(`dims[${r}] must be a non-negative integer, got: ${i}`);t*=i}return t},hi=(e,t)=>{switch(e.location){case"cpu":return new Ue(e.type,e.data,t);case"cpu-pinned":return new Ue({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new Ue({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new Ue({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case"ml-tensor":return new Ue({location:"ml-tensor",mlTensor:e.mlTensor,type:e.type,dims:t});default:throw new Error(`tensorReshape: tensor location ${e.location} is not supported`)}}}),Ue,cr=I(()=>{_t(),jr(),Ma(),Da(),Ue=class{constructor(e,t,r){pi();let i,a;if(typeof e=="object"&&"location"in e)switch(this.dataLocation=e.location,i=e.type,a=e.dims,e.location){case"cpu-pinned":{let s=dt.get(i);if(!s)throw new TypeError(`unsupported type "${i}" to create tensor from pinned buffer`);if(!(e.data instanceof s))throw new TypeError(`buffer should be of type ${s.name}`);this.cpuData=e.data;break}case"texture":{if(i!=="float32")throw new TypeError(`unsupported type "${i}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break}case"gpu-buffer":{if(i!=="float32"&&i!=="float16"&&i!=="int32"&&i!=="int64"&&i!=="uint32"&&i!=="uint8"&&i!=="bool"&&i!=="uint4"&&i!=="int4")throw new TypeError(`unsupported type "${i}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break}case"ml-tensor":{if(i!=="float32"&&i!=="float16"&&i!=="int32"&&i!=="int64"&&i!=="uint32"&&i!=="uint64"&&i!=="int8"&&i!=="uint8"&&i!=="bool"&&i!=="uint4"&&i!=="int4")throw new TypeError(`unsupported type "${i}" to create tensor from MLTensor`);this.mlTensorData=e.mlTensor,this.downloader=e.download,this.disposer=e.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let s,o;if(typeof e=="string")if(i=e,o=r,e==="string"){if(!Array.isArray(t))throw new TypeError("A string tensor's data must be a string array.");s=t}else{let u=dt.get(e);if(u===void 0)throw new TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(t)){if(e==="float16"&&u===Uint16Array||e==="uint4"||e==="int4")throw new TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${u.name} as data.`);e==="uint64"||e==="int64"?s=u.from(t,BigInt):s=u.from(t)}else if(t instanceof u)s=t;else if(t instanceof Uint8ClampedArray)if(e==="uint8")s=Uint8Array.from(t);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if(e==="float16"&&t instanceof Uint16Array&&u!==Uint16Array)s=new globalThis.Float16Array(t.buffer,t.byteOffset,t.length);else throw new TypeError(`A ${i} tensor's data must be type of ${u}`)}else if(o=t,Array.isArray(e)){if(e.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let u=typeof e[0];if(u==="string")i="string",s=e;else if(u==="boolean")i="bool",s=Uint8Array.from(e);else throw new TypeError(`Invalid element type of data array: ${u}.`)}else if(e instanceof Uint8ClampedArray)i="uint8",s=Uint8Array.from(e);else{let u=St.get(e.constructor);if(u===void 0)throw new TypeError(`Unsupported type for tensor data: ${e.constructor}.`);i=u,s=e}if(o===void 0)o=[s.length];else if(!Array.isArray(o))throw new TypeError("A tensor's dims must be a number array");a=o,this.cpuData=s,this.dataLocation="cpu"}let n=ci(a);if(this.cpuData&&n!==this.cpuData.length&&!((i==="uint4"||i==="int4")&&Math.ceil(n/2)===this.cpuData.length))throw new Error(`Tensor's size(${n}) does not match data length(${this.cpuData.length}).`);this.type=i,this.dims=a,this.size=n}static async fromImage(e,t){return ur(e,t)}static fromTexture(e,t){return lr(e,t)}static fromGpuBuffer(e,t){return Pe(e,t)}static fromMLTensor(e,t){return Wt(e,t)}static fromPinnedBuffer(e,t,r){return dr(e,t,r)}toDataURL(e){return lt(this,e)}toImageData(e){return xt(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let t=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=t,e&&this.disposer&&(this.disposer(),this.disposer=void 0),t}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return hi(this,e)}}}),Ge,fi=I(()=>{cr(),Ge=Ue}),Dt,hr,et,Xe,mi=I(()=>{Ve(),Dt=(e,t)=>{(typeof ke.trace>"u"?!ke.wasm.trace:!ke.trace)||console.timeStamp(`${e}::ORT::${t}`)},hr=(e,t)=>{let r=new Error().stack?.split(/\r\n|\r|\n/g)||[],i=!1;for(let a=0;a<r.length;a++){if(i&&!r[a].includes("TRACE_FUNC")){let n=`FUNC_${e}::${r[a].trim().split(" ")[1]}`;t&&(n+=`::${t}`),Dt("CPU",n);return}r[a].includes("TRACE_FUNC")&&(i=!0)}},et=e=>{(typeof ke.trace>"u"?!ke.wasm.trace:!ke.trace)||hr("BEGIN",e)},Xe=e=>{(typeof ke.trace>"u"?!ke.wasm.trace:!ke.trace)||hr("END",e)}}),gi,Pa=I(()=>{We(),fi(),mi(),gi=class rc{constructor(t){this.handler=t}async run(t,r,i){et();let a={},n={};if(typeof t!="object"||t===null||t instanceof Ge||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let s=!0;if(typeof r=="object"){if(r===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(r instanceof Ge)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(r)){if(r.length===0)throw new TypeError("'fetches' cannot be an empty array.");s=!1;for(let l of r){if(typeof l!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(l)===-1)throw new RangeError(`'fetches' contains invalid output name: ${l}.`);a[l]=null}if(typeof i=="object"&&i!==null)n=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else{let l=!1,d=Object.getOwnPropertyNames(r);for(let p of this.outputNames)if(d.indexOf(p)!==-1){let h=r[p];(h===null||h instanceof Ge)&&(l=!0,s=!1,a[p]=h)}if(l){if(typeof i=="object"&&i!==null)n=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else n=r}}else if(typeof r<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let l of this.inputNames)if(typeof t[l]>"u")throw new Error(`input '${l}' is missing in 'feeds'.`);if(s)for(let l of this.outputNames)a[l]=null;let o=await this.handler.run(t,a,n),u={};for(let l in o)if(Object.hasOwnProperty.call(o,l)){let d=o[l];d instanceof Ge?u[l]=d:u[l]=new Ge(d.type,d.data,d.dims)}return Xe(),u}async release(){return this.handler.dispose()}static async create(t,r,i,a){et();let n,s={};if(typeof t=="string"){if(n=t,typeof r=="object"&&r!==null)s=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(n=t,typeof r=="object"&&r!==null)s=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer){let d=t,p=0,h=t.byteLength;if(typeof r=="object"&&r!==null)s=r;else if(typeof r=="number"){if(p=r,!Number.isSafeInteger(p))throw new RangeError("'byteOffset' must be an integer.");if(p<0||p>=d.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${d.byteLength}).`);if(h=t.byteLength-p,typeof i=="number"){if(h=i,!Number.isSafeInteger(h))throw new RangeError("'byteLength' must be an integer.");if(h<=0||p+h>d.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${d.byteLength-p}].`);if(typeof a=="object"&&a!==null)s=a;else if(typeof a<"u")throw new TypeError("'options' must be an object.")}else if(typeof i<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof r<"u")throw new TypeError("'options' must be an object.");n=new Uint8Array(d,p,h)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[o,u]=await Oe(s),l=await o.createInferenceSessionHandler(n,u);return Xe(),new rc(l)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}}),fr,Ua=I(()=>{Pa(),fr=gi}),Na=I(()=>{}),La=I(()=>{}),qa=I(()=>{}),Va=I(()=>{}),yi={};X(yi,{InferenceSession:()=>fr,TRACE:()=>Dt,TRACE_FUNC_BEGIN:()=>et,TRACE_FUNC_END:()=>Xe,Tensor:()=>Ge,env:()=>ee,registerBackend:()=>Q});var it=I(()=>{Ee(),Je(),Ua(),fi(),Na(),La(),mi(),qa(),Va()}),mr=I(()=>{}),wi={};X(wi,{default:()=>_i});var gr,yr,_i,Fa=I(()=>{Sp(),ct(),vr(),gr="ort-wasm-proxy-worker",yr=globalThis.self?.name===gr,yr&&(self.onmessage=e=>{let{type:t,in:r}=e.data;try{switch(t){case"init-wasm":Tr(r.wasm).then(()=>{Nn(r).then(()=>{postMessage({type:t})},i=>{postMessage({type:t,err:i})})},i=>{postMessage({type:t,err:i})});break;case"init-ep":{let{epName:i,env:a}=r;Ln(a,i).then(()=>{postMessage({type:t})},n=>{postMessage({type:t,err:n})});break}case"copy-from":{let{buffer:i}=r,a=Ca(i);postMessage({type:t,out:a});break}case"create":{let{model:i,options:a}=r;Vn(i,a).then(n=>{postMessage({type:t,out:n})},n=>{postMessage({type:t,err:n})});break}case"release":Fn(r),postMessage({type:t});break;case"run":{let{sessionId:i,inputIndices:a,inputs:n,outputIndices:s,options:o}=r;Gn(i,a,n,s,new Array(s.length).fill(null),o).then(u=>{u.some(l=>l[3]!=="cpu")?postMessage({type:t,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:t,out:u},Hn([...n,...u]))},u=>{postMessage({type:t,err:u})});break}case"end-profiling":jn(r),postMessage({type:t});break;default:}}catch(i){postMessage({type:t,err:i})}}),_i=yr?null:e=>new Worker(e??Ne,{type:"classic",name:gr})}),bi,$i,Ne,wr,Gt,vi,xi,_r,Si,br,Ti,$r,Ei,vr=I(()=>{mr(),bi=typeof location>"u"?void 0:location.origin,$i=()=>typeof document<"u"?document.currentScript?.src:typeof self<"u"?self.location?.href:void 0,Ne=$i(),wr=()=>{if(Ne&&!Ne.startsWith("blob:"))return Ne.substring(0,Ne.lastIndexOf("/")+1)},Gt=(e,t)=>{try{let r=t??Ne;return(r?new URL(e,r):new URL(e)).origin===bi}catch{return!1}},vi=(e,t)=>{let r=t??Ne;try{return(r?new URL(e,r):new URL(e)).href}catch{return}},xi=(e,t)=>`${t??"./"}${e}`,_r=async e=>{let t=await(await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(t)},Si=async e=>(await import(e)).default,br=(Fa(),Te(wi)).default,Ti=async()=>{if(!Ne)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(Gt(Ne))return[void 0,br()];let e=await _r(Ne);return[e,br(e)]},$r=void 0,Ei=async(e,t,r)=>{if(!e&&!t&&$r&&Ne&&Gt(Ne))return[void 0,$r];{let i="ort-wasm-simd-threaded.jsep.mjs",a=e??vi(i,t),n=r&&a&&!Gt(a,t),s=n?await _r(a):a??xi(i,t);return[n?s:void 0,await Si(s)]}}}),xr,jt,Tt,Sr,ki,Ii,zi,Tr,pe,ct=I(()=>{vr(),jt=!1,Tt=!1,Sr=!1,ki=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},Ii=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},zi=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}},Tr=async e=>{if(jt)return Promise.resolve();if(Tt)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(Sr)throw new Error("previous call to 'initializeWebAssembly()' failed.");Tt=!0;let t=e.initTimeout,r=e.numThreads;if(e.simd!==!1){if(e.simd==="relaxed"){if(!zi())throw new Error("Relaxed WebAssembly SIMD is not supported in the current environment.")}else if(!Ii())throw new Error("WebAssembly SIMD is not supported in the current environment.")}let i=ki();r>1&&!i&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+r+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=r=1);let a=e.wasmPaths,n=typeof a=="string"?a:void 0,s=a?.mjs,o=s?.href??s,u=a?.wasm,l=u?.href??u,d=e.wasmBinary,[p,h]=await Ei(o,n,r>1),f=!1,m=[];if(t>0&&m.push(new Promise(y=>{setTimeout(()=>{f=!0,y()},t)})),m.push(new Promise((y,b)=>{let _={numThreads:r};if(d)_.wasmBinary=d;else if(l||n)_.locateFile=w=>l??n+w;else if(o&&o.indexOf("blob:")!==0)_.locateFile=w=>new URL(w,o).href;else if(p){let w=wr();w&&(_.locateFile=x=>w+x)}h(_).then(w=>{Tt=!1,jt=!0,xr=w,y(),p&&URL.revokeObjectURL(p)},w=>{Tt=!1,Sr=!0,b(w)})})),await Promise.race(m),f)throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},pe=()=>{if(jt&&xr)return xr;throw new Error("WebAssembly is not initialized yet.")}}),je,Ht,se,Er=I(()=>{ct(),je=(e,t)=>{let r=pe(),i=r.lengthBytesUTF8(e)+1,a=r._malloc(i);return r.stringToUTF8(e,a,i),t.push(a),a},Ht=(e,t,r,i)=>{if(typeof e=="object"&&e!==null){if(r.has(e))throw new Error("Circular reference in options");r.add(e)}Object.entries(e).forEach(([a,n])=>{let s=t?t+a:a;if(typeof n=="object")Ht(n,s+".",r,i);else if(typeof n=="string"||typeof n=="number")i(s,n.toString());else if(typeof n=="boolean")i(s,n?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof n}`)})},se=e=>{let t=pe(),r=t.stackSave();try{let i=t.PTR_SIZE,a=t.stackAlloc(2*i);t._OrtGetLastError(a,a+i);let n=Number(t.getValue(a,i===4?"i32":"i64")),s=t.getValue(a+i,"*"),o=s?t.UTF8ToString(s):"";throw new Error(`${e} ERROR_CODE: ${n}, ERROR_MESSAGE: ${o}`)}finally{t.stackRestore(r)}}}),Ci,Wa=I(()=>{ct(),Er(),Ci=e=>{let t=pe(),r=0,i=[],a=e||{};try{if(e?.logSeverityLevel===void 0)a.logSeverityLevel=2;else if(typeof e.logSeverityLevel!="number"||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw new Error(`log serverity level is not valid: ${e.logSeverityLevel}`);if(e?.logVerbosityLevel===void 0)a.logVerbosityLevel=0;else if(typeof e.logVerbosityLevel!="number"||!Number.isInteger(e.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);e?.terminate===void 0&&(a.terminate=!1);let n=0;return e?.tag!==void 0&&(n=je(e.tag,i)),r=t._OrtCreateRunOptions(a.logSeverityLevel,a.logVerbosityLevel,!!a.terminate,n),r===0&&se("Can't create run options."),e?.extra!==void 0&&Ht(e.extra,"",new WeakSet,(s,o)=>{let u=je(s,i),l=je(o,i);t._OrtAddRunConfigEntry(r,u,l)!==0&&se(`Can't set a run config entry: ${s} - ${o}.`)}),[r,i]}catch(n){throw r!==0&&t._OrtReleaseRunOptions(r),i.forEach(s=>t._free(s)),n}}}),Ai,Oi,Ri,Et,Bi,Mi,Ga=I(()=>{ct(),Er(),Ai=e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${e}`)}},Oi=e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${e}`)}},Ri=e=>{e.extra||(e.extra={}),e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),e.executionProviders&&e.executionProviders.some(r=>(typeof r=="string"?r:r.name)==="webgpu")&&(e.enableMemPattern=!1)},Et=(e,t,r,i)=>{let a=je(t,i),n=je(r,i);pe()._OrtAddSessionConfigEntry(e,a,n)!==0&&se(`Can't set a session config entry: ${t} - ${r}.`)},Bi=async(e,t,r)=>{for(let i of t){let a=typeof i=="string"?i:i.name,n=[];switch(a){case"webnn":if(a="WEBNN",typeof i!="string"){let d=i?.deviceType;d&&Et(e,"deviceType",d,r)}break;case"webgpu":if(a="JS",typeof i!="string"){let d=i;if(d?.preferredLayout){if(d.preferredLayout!=="NCHW"&&d.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${d.preferredLayout}`);Et(e,"preferredLayout",d.preferredLayout,r)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${a}`)}let s=je(a,r),o=n.length,u=0,l=0;if(o>0){u=pe()._malloc(o*pe().PTR_SIZE),r.push(u),l=pe()._malloc(o*pe().PTR_SIZE),r.push(l);for(let d=0;d<o;d++)pe().setValue(u+d*pe().PTR_SIZE,n[d][0],"*"),pe().setValue(l+d*pe().PTR_SIZE,n[d][1],"*")}await pe()._OrtAppendExecutionProvider(e,s,u,l,o)!==0&&se(`Can't append execution provider: ${a}.`)}},Mi=async e=>{let t=pe(),r=0,i=[],a=e||{};Ri(a);try{let n=Ai(a.graphOptimizationLevel??"all"),s=Oi(a.executionMode??"sequential"),o=typeof a.logId=="string"?je(a.logId,i):0,u=a.logSeverityLevel??2;if(!Number.isInteger(u)||u<0||u>4)throw new Error(`log serverity level is not valid: ${u}`);let l=a.logVerbosityLevel??0;if(!Number.isInteger(l)||l<0||l>4)throw new Error(`log verbosity level is not valid: ${l}`);let d=typeof a.optimizedModelFilePath=="string"?je(a.optimizedModelFilePath,i):0;if(r=t._OrtCreateSessionOptions(n,!!a.enableCpuMemArena,!!a.enableMemPattern,s,!!a.enableProfiling,0,o,u,l,d),r===0&&se("Can't create session options."),a.executionProviders&&await Bi(r,a.executionProviders,i),a.enableGraphCapture!==void 0){if(typeof a.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${a.enableGraphCapture}`);Et(r,"enableGraphCapture",a.enableGraphCapture.toString(),i)}if(a.freeDimensionOverrides)for(let[p,h]of Object.entries(a.freeDimensionOverrides)){if(typeof p!="string")throw new Error(`free dimension override name must be a string: ${p}`);if(typeof h!="number"||!Number.isInteger(h)||h<0)throw new Error(`free dimension override value must be a non-negative integer: ${h}`);let f=je(p,i);t._OrtAddFreeDimensionOverride(r,f,h)!==0&&se(`Can't set a free dimension override: ${p} - ${h}.`)}return a.extra!==void 0&&Ht(a.extra,"",new WeakSet,(p,h)=>{Et(r,p,h,i)}),[r,i]}catch(n){throw r!==0&&t._OrtReleaseSessionOptions(r)!==0&&se("Can't release session options."),i.forEach(s=>t._free(s)),n}}}),ht,ft,mt,kr,Ir,zr,Cr,Hr,le=I(()=>{ht=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${e}`)}},ft=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${e}`)}},mt=(e,t)=>{let r=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],i=typeof t=="number"?t:t.reduce((a,n)=>a*n,1);return r>0?Math.ceil(i*r):void 0},kr=e=>{switch(e){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${e}`)}},Ir=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${e}`)}},zr=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",Cr=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint64"||e==="int8"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",Hr=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${e}`)}}}),Ar,Di=I(()=>{mr(),Ar=async e=>{if(typeof e=="string"){let t=await fetch(e);if(!t.ok)throw new Error(`failed to load external data file: ${e}`);let r=t.headers.get("Content-Length"),i=r?parseInt(r,10):0;if(i<1073741824)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw new Error(`failed to load external data file: ${e}, no response body.`);let a=t.body.getReader(),n;try{n=new ArrayBuffer(i)}catch(o){if(o instanceof RangeError){let u=Math.ceil(i/65536);n=new WebAssembly.Memory({initial:u,maximum:u}).buffer}else throw o}let s=0;for(;;){let{done:o,value:u}=await a.read();if(o)break;let l=u.byteLength;new Uint8Array(n,s,l).set(u),s+=l}return new Uint8Array(n,0,i)}}else return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)}}),Pi,Kr,Zr,Pt,Qr,Xr,Ie,yt=I(()=>{le(),Pi=["V","I","W","E","F"],Kr=(e,t)=>{console.log(`[${Pi[e]},${new Date().toISOString()}]${t}`)},Qr=(e,t)=>{Zr=e,Pt=t},Xr=(e,t)=>{let r=Ir(e),i=Ir(Zr);r>=i&&Kr(r,typeof t=="function"?t():t)},Ie=(...e)=>{Pt&&Xr(...e)}}),Yr,Ut,M,tr,Jr,Ui,kt,ne=I(()=>{Yr=class{static calcMatMulShape(e,t){return e[1]!==t[0]?void 0:[e[0],t[1]]}},Ut=class{static calcShape(e,t,r=!1){let i=e.length,a=t.length;if(i===0)return t;if(a===0)return e;let n=Math.max(e.length,t.length),s=new Array(n);if(r){if(i<2||a<2)return;let o=Yr.calcMatMulShape([e[i-2],e[i-1]],[t[a-2],t[a-1]]);if(o===void 0)return;[s[n-2],s[n-1]]=o}for(let o=r?3:1;o<=n;o++){let u=i-o<0?1:e[i-o],l=a-o<0?1:t[a-o];if(u!==l&&u>1&&l>1)return;let d=Math.max(u,l);if(u&&l)s[n-o]=Math.max(u,l);else{if(d>1)return;s[n-o]=0}}return s}static isValidBroadcast(e,t){let r=e.length,i=t.length;if(r>i)return!1;for(let a=1;a<=r;a++)if(e[r-a]!==1&&e[r-a]!==t[i-a])return!1;return!0}},M=class Ra{static size(t){return Ra.getSizeFromDimensionRange(t,0,t.length)}static convertShape(t,r=4){let i=t.length;if(i===0)return[];let a=new Array(i),n=i-1;for(;n>=0;){if(t[n]%r===0){a[n]=t[n]/r;break}if(r%t[n]!==0)throw new Error("cannot convert shape");a[n]=1,r/=t[n],n--}for(n--;n>=0;n--)a[n]=t[n];return a}static sizeFromDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return Ra.getSizeFromDimensionRange(t,r,t.length)}static sizeToDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${t.length} dimensions.`);return Ra.getSizeFromDimensionRange(t,0,r)}static getSizeFromDimensionRange(t,r,i){let a=1;for(let n=r;n<i;n++){if(t[n]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");a*=Number(t[n])}return a}static computeStrides(t){let r=t.length;if(r===0)return[];if(r===1)return[1];let i=new Array(r);i[r-1]=1,i[r-2]=t[r-1];for(let a=r-3;a>=0;--a)i[a]=i[a+1]*t[a+1];return i}static normalizeAxis(t,r){if(t<-r&&t>=r)throw new Error("unsupported axis for this operation.");return t<0?t+r:t}static normalizeAxes(t,r){return t.map(i=>this.normalizeAxis(i,r??t.length))}static sortBasedOnPerm(t,r){return r?r.map(i=>t[i]):t.slice().reverse()}static padShape(t,r){let i=t.length;return t.map((a,n)=>a+r[n]+r[n+i])}static areEqual(t,r){return t.length!==r.length?!1:t.every((i,a)=>i===r[a])}},tr=class ha{static adjustPoolAttributes(t,r,i,a,n,s){if(!t&&i.length!==r.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let o=0;o<r.length-2;o++)o>=i.length?i.push(r[o+2]):i[o]=r[o+2];for(let o=0;o<i.length;o++)if(o<a.length){if(a[o]<0)throw new Error("strides should be greater than or equal to 1")}else a.push(1);for(let o=0;o<i.length;o++)if(o<n.length){if(n[o]<0)throw new Error("dilations should be greater than or equal to 1")}else n.push(1);for(let o=0;o<i.length*2;o++)if(o<s.length){if(s[o]<0)throw new Error("pad should be greater than or equal to 1")}else s.push(0);for(let o=0;o<i.length;o++){if(i[o]<=0)throw new Error("kernel shapes need to be greater than 0");if(s[o]>=i[o]||s[o+i.length]>=i[o])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,r,i,a,n,s,o){if(o){if(n.length!==2*(t.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(r.length!==t.length-2)throw new Error("length of strides should be the length of data dimensions");if(a.length!==t.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let u=0;u<t.length-2;u++)ha.adjustPadAndReturnShape(t[u+(s?1:2)],r[u],i[u],a[u],n,u,u+t.length-2,o)}}static computePoolOutputShape(t,r,i,a,n,s,o){if(r.length<=0)throw new Error("input shape must be of size greater than 0");let u=[r[0],r[1]];return ha.computeShapeHelper(t,r,u,i,a,n,s,o),u}static computeConvOutputShape(t,r,i,a,n,s,o){if(t.length<=0||r.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let u=[t[0],r[0]];return ha.computeShapeHelper(!1,t,u,i,a,n,s,o),u}static computeShapeHelper(t,r,i,a,n,s,o,u){if(t)for(let l=0;l<r.length-2;l++)i.push(1);else for(let l=0;l<r.length-2;l++)i.push(ha.adjustPadAndReturnShape(r[l+2],a[l],n[l],s[l],o,l,l+r.length-2,u))}static adjustPadAndReturnShape(t,r,i,a,n,s,o,u){let l=i*(a-1)+1;if(u&&u!=="NOTSET")switch(u){case"VALID":return n[s]=0,n[o]=0,Math.floor((t-l)/r+1);case"SAME_LOWER":case"SAME_UPPER":if(i!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let d=((t+r-1)/r-1)*r+a-t;return n[s]=Math.floor(u==="SAME_LOWER"?(d+1)/2:d/2),n[o]=d-n[s],Math.floor((t+d-a)/r+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((t+n[s]+n[o]-l)/r+1)}},Jr=class{static getShapeOfGemmResult(e,t,r,i,a){if(e.length!==2||r.length!==2)throw new Error("shape need to be of size 2");let n,s,o;t?(n=e[1],s=e[0]):(n=e[0],s=e[1]);let u=-1;if(i?(o=r[0],u=1):(o=r[1],u=0),r[u]!==s)throw new Error("dimension mismatch");if(n<=0||o<=0||s<=0)throw new Error("invalid shape specified");if(a&&!Ut.isValidBroadcast(a,[n,o]))throw new Error("gemm: invalid bias shape for broadcast");return[n,o,s]}},Ui=-34028234663852886e22,kt=34028234663852886e22}),Nt,rr=I(()=>{le(),Nt=(e,t)=>new(kr(t))(e)}),Kt,ir,Or,Rr,It,Lt,ei,ti,ri,Ni,Li,ma=I(()=>{le(),yt(),Kt=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),ir=(e,t)=>{if(t==="int32")return e;let r=Kt.get(t);if(!r)throw new Error(`WebNN backend does not support data type: ${t}`);let i=r/8;if(e.byteLength%i!==0)throw new Error(`Invalid Uint8Array length - must be a multiple of ${i}.`);let a=e.byteLength/i,n=new(kr(t))(e.buffer,e.byteOffset,a);switch(t){case"int64":case"uint64":{let s=new Int32Array(a);for(let o=0;o<a;o++){let u=n[o];if(u>2147483647n||u<-2147483648n)throw new Error("Can not convert int64 data to int32 - value out of range.");s[o]=Number(u)}return new Uint8Array(s.buffer)}case"int8":case"uint8":case"uint32":{if(t==="uint32"&&n.some(o=>o>2147483647))throw new Error("Can not convert uint32 data to int32 - value out of range.");let s=Int32Array.from(n,Number);return new Uint8Array(s.buffer)}default:throw new Error(`Unsupported data conversion from ${t} to 'int32'`)}},Or=(e,t)=>{if(t==="int32")return e;if(e.byteLength%4!==0)throw new Error("Invalid Uint8Array length - must be a multiple of 4 (int32).");let r=e.byteLength/4,i=new Int32Array(e.buffer,e.byteOffset,r);switch(t){case"int64":{let a=BigInt64Array.from(i,BigInt);return new Uint8Array(a.buffer)}case"uint64":{if(i.some(n=>n<0))throw new Error("Can not convert int32 data to uin64 - negative value found.");let a=BigUint64Array.from(i,BigInt);return new Uint8Array(a.buffer)}case"int8":{if(i.some(n=>n<-128||n>127))throw new Error("Can not convert int32 data to int8 - value out of range.");let a=Int8Array.from(i,Number);return new Uint8Array(a.buffer)}case"uint8":{if(i.some(a=>a<0||a>255))throw new Error("Can not convert int32 data to uint8 - value out of range.");return Uint8Array.from(i,Number)}case"uint32":{if(i.some(n=>n<0))throw new Error("Can not convert int32 data to uint32 - negative value found.");let a=Uint32Array.from(i,Number);return new Uint8Array(a.buffer)}default:throw new Error(`Unsupported data conversion from 'int32' to ${t}`)}},Rr=1,It=()=>Rr++,Lt=new Map([["int8","int32"],["uint8","int32"],["uint32","int32"],["int64","int32"]]),ei=(e,t)=>{let r=Kt.get(e);if(!r)throw new Error(`WebNN backend does not support data type: ${e}`);return t.length>0?Math.ceil(t.reduce((i,a)=>i*a)*r/8):0},ti=class{constructor(e){this.isDataConverted=!1;let{sessionId:t,context:r,tensor:i,dataType:a,shape:n,fallbackDataType:s}=e;this.sessionId=t,this.mlContext=r,this.mlTensor=i,this.dataType=a,this.tensorShape=n,this.fallbackDataType=s}get tensor(){return this.mlTensor}get type(){return this.dataType}get fallbackType(){return this.fallbackDataType}get shape(){return this.tensorShape}get byteLength(){return ei(this.dataType,this.tensorShape)}destroy(){Ie("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(e){this.mlContext.writeTensor(this.mlTensor,e)}async read(e){if(this.fallbackDataType){let t=await this.mlContext.readTensor(this.mlTensor),r=Or(new Uint8Array(t),this.dataType);if(e){(e instanceof ArrayBuffer?new Uint8Array(e):new Uint8Array(e.buffer,e.byteOffset,e.byteLength)).set(r);return}else return r.buffer}else return e?this.mlContext.readTensor(this.mlTensor,e):this.mlContext.readTensor(this.mlTensor)}canReuseTensor(e,t,r){return this.mlContext===e&&this.dataType===t&&this.tensorShape.length===r.length&&this.tensorShape.every((i,a)=>i===r[a])}setIsDataConverted(e){this.isDataConverted=e}},ri=class{constructor(e,t){this.tensorManager=e,this.wrapper=t}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(e,t,r,i){let a=this.tensorManager.getMLContext(e),n;if(!a.opSupportLimits().input.dataTypes.includes(t)){if(n=Lt.get(t),!n||!a.opSupportLimits().input.dataTypes.includes(n))throw new Error(`WebNN backend does not support data type: ${t}`);Ie("verbose",()=>`[WebNN] TensorIdTracker.ensureTensor: fallback dataType from ${t} to ${n}`)}if(this.wrapper){if(this.wrapper.canReuseTensor(a,t,r))return this.wrapper.tensor;if(i){if(this.wrapper.byteLength!==ei(t,r))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let s=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(e,t,r,s,!0,!0,n),i&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(e){let t=e;if(this.wrapper){if(this.wrapper.fallbackType)if(this.wrapper.fallbackType==="int32")t=ir(e,this.wrapper.type),this.wrapper.setIsDataConverted(!0);else throw new Error(`Unsupported fallback data type: ${this.wrapper.fallbackType}`);if(e.byteLength===this.wrapper.byteLength){this.wrapper.write(t);return}else Ie("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor()}this.activeUpload?this.activeUpload.set(t):this.activeUpload=new Uint8Array(t)}async download(e){if(this.activeUpload){let t=this.wrapper?.isDataConverted?Or(this.activeUpload,this.wrapper?.type):this.activeUpload;if(e){e instanceof ArrayBuffer?new Uint8Array(e).set(t):new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(t);return}else return t.buffer}if(!this.wrapper)throw new Error("Tensor has not been created.");return e?this.wrapper.read(e):this.wrapper.read()}},Ni=class{constructor(e){this.backend=e,this.tensorTrackersById=new Map,this.freeTensors=[],this.externalTensors=new Set}getMLContext(e){let t=this.backend.getMLContext(e);if(!t)throw new Error("MLContext not found for session.");return t}reserveTensorId(){let e=It();return this.tensorTrackersById.set(e,new ri(this)),e}releaseTensorId(e){let t=this.tensorTrackersById.get(e);t&&(this.tensorTrackersById.delete(e),t.tensorWrapper&&this.releaseTensor(t.tensorWrapper))}async ensureTensor(e,t,r,i,a){Ie("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${t}, dataType: ${r}, shape: ${i}, copyOld: ${a}}`);let n=this.tensorTrackersById.get(t);if(!n)throw new Error("Tensor not found.");return n.ensureTensor(e,r,i,a)}upload(e,t){let r=this.tensorTrackersById.get(e);if(!r)throw new Error("Tensor not found.");r.upload(t)}async download(e,t){Ie("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${t?.byteLength}}`);let r=this.tensorTrackersById.get(e);if(!r)throw new Error("Tensor not found.");return r.download(t)}releaseTensorsForSession(e){for(let t of this.freeTensors)t.sessionId===e&&t.destroy();this.freeTensors=this.freeTensors.filter(t=>t.sessionId!==e)}registerTensor(e,t,r,i){let a=this.getMLContext(e),n=It(),s=new ti({sessionId:e,context:a,tensor:t,dataType:r,shape:i});return this.tensorTrackersById.set(n,new ri(this,s)),this.externalTensors.add(s),n}async getCachedTensor(e,t,r,i,a,n,s){let o=this.getMLContext(e);for(let[l,d]of this.freeTensors.entries())if(d.canReuseTensor(o,t,r)){Ie("verbose",()=>`[WebNN] Reusing tensor {dataType: ${t}, ${s?`fallbackDataType: ${s},`:""} shape: ${r}`);let p=this.freeTensors.splice(l,1)[0];return p.sessionId=e,p}Ie("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${t}, ${s?`fallbackDataType: ${s},`:""} shape: ${r}}`);let u=await o.createTensor({dataType:s??t,shape:r,dimensions:r,usage:i,writable:a,readable:n});return new ti({sessionId:e,context:o,tensor:u,dataType:t,shape:r,fallbackDataType:s})}releaseTensor(e){this.externalTensors.has(e)&&this.externalTensors.delete(e),this.freeTensors.push(e)}},Li=(...e)=>new Ni(...e)}),ar,qi,Vi,Fi=I(()=>{le(),ct(),rr(),ma(),yt(),ar=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),qi=(e,t)=>{if(e===t)return!0;if(e===void 0||t===void 0)return!1;let r=Object.keys(e).sort(),i=Object.keys(t).sort();return r.length===i.length&&r.every((a,n)=>a===i[n]&&e[a]===t[a])},Vi=class{constructor(e){this.tensorManager=Li(this),this.mlContextBySessionId=new Map,this.sessionIdsByMLContext=new Map,this.mlContextCache=[],this.sessionGraphInputs=new Map,this.sessionGraphOutputs=new Map,this.temporaryGraphInputs=[],this.temporaryGraphOutputs=[],this.temporarySessionTensorIds=new Map,Qr(e.logLevel,!!e.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(e){Ie("verbose",()=>`[WebNN] onRunStart {sessionId: ${e}}`),this.activeSessionId=e}onRunEnd(e){Ie("verbose",()=>`[WebNN] onRunEnd {sessionId: ${e}}`);let t=this.temporarySessionTensorIds.get(e);if(t){for(let r of t)Ie("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${r}}`),this.tensorManager.releaseTensorId(r);this.temporarySessionTensorIds.delete(e),this.activeSessionId=void 0}}async createMLContext(e){if(e instanceof GPUDevice){let r=this.mlContextCache.findIndex(i=>i.gpuDevice===e);if(r!==-1)return this.mlContextCache[r].mlContext;{let i=await navigator.ml.createContext(e);return this.mlContextCache.push({gpuDevice:e,mlContext:i}),i}}else if(e===void 0){let r=this.mlContextCache.findIndex(i=>i.options===void 0&&i.gpuDevice===void 0);if(r!==-1)return this.mlContextCache[r].mlContext;{let i=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:i}),i}}let t=this.mlContextCache.findIndex(r=>qi(r.options,e));if(t!==-1)return this.mlContextCache[t].mlContext;{let r=await navigator.ml.createContext(e);return this.mlContextCache.push({options:e,mlContext:r}),r}}registerMLContext(e,t){this.mlContextBySessionId.set(e,t);let r=this.sessionIdsByMLContext.get(t);r||(r=new Set,this.sessionIdsByMLContext.set(t,r)),r.add(e),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(e,this.temporaryGraphInputs),this.temporaryGraphInputs=[]),this.temporaryGraphOutputs.length>0&&(this.sessionGraphOutputs.set(e,this.temporaryGraphOutputs),this.temporaryGraphOutputs=[])}onReleaseSession(e){this.sessionGraphInputs.delete(e),this.sessionGraphOutputs.delete(e);let t=this.mlContextBySessionId.get(e);if(!t)return;this.tensorManager.releaseTensorsForSession(e),this.mlContextBySessionId.delete(e);let r=this.sessionIdsByMLContext.get(t);if(r.delete(e),r.size===0){this.sessionIdsByMLContext.delete(t);let i=this.mlContextCache.findIndex(a=>a.mlContext===t);i!==-1&&this.mlContextCache.splice(i,1)}}getMLContext(e){return this.mlContextBySessionId.get(e)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(e){Ie("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e)}async ensureTensor(e,t,r,i,a){let n=ar.get(r);if(!n)throw new Error(`Unsupported ONNX data type: ${r}`);return this.tensorManager.ensureTensor(e??this.currentSessionId,t,n,i,a)}async createTemporaryTensor(e,t,r){Ie("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${t}, shape: ${r}}`);let i=ar.get(t);if(!i)throw new Error(`Unsupported ONNX data type: ${t}`);let a=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(e,a,i,r,!1);let n=this.temporarySessionTensorIds.get(e);return n?n.push(a):this.temporarySessionTensorIds.set(e,[a]),a}uploadTensor(e,t){if(!pe().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");Ie("verbose",()=>`[WebNN] uploadTensor {tensorId: ${e}, data: ${t.byteLength}}`),this.tensorManager.upload(e,t)}async downloadTensor(e,t){return this.tensorManager.download(e,t)}createMLTensorDownloader(e,t){return async()=>{let r=await this.tensorManager.download(e);return Nt(r,t)}}registerMLTensor(e,t,r,i){let a=ar.get(r);if(!a)throw new Error(`Unsupported ONNX data type: ${r}`);let n=this.tensorManager.registerTensor(e,t,a,i);return Ie("verbose",()=>`[WebNN] registerMLTensor {tensor: ${t}, dataType: ${a}, dimensions: ${i}} -> {tensorId: ${n}}`),n}registerMLConstant(e,t,r,i,a,n,s=!1){if(!n)throw new Error("External mounted files are not available.");let o=e;e.startsWith("./")&&(o=e.substring(2));let u=n.get(o);if(!u)throw new Error(`File with name ${o} not found in preloaded files.`);if(t+r>u.byteLength)throw new Error("Out of bounds: data offset and length exceed the external file data size.");let l=u.slice(t,t+r).buffer,d;switch(a.dataType){case"float32":d=new Float32Array(l);break;case"float16":d=typeof Float16Array<"u"&&Float16Array.from?new Float16Array(l):new Uint16Array(l);break;case"int32":d=new Int32Array(l);break;case"uint32":d=new Uint32Array(l);break;case"int64":if(s){let p=ir(new Uint8Array(l),"int64");d=new Int32Array(p.buffer),a.dataType="int32"}else d=new BigInt64Array(l);break;case"uint64":d=new BigUint64Array(l);break;case"int8":d=new Int8Array(l);break;case"int4":case"uint4":case"uint8":d=new Uint8Array(l);break;default:throw new Error(`Unsupported data type: ${a.dataType} in creating WebNN Constant from external data.`)}return Ie("verbose",()=>`[WebNN] registerMLConstant {dataType: ${a.dataType}, shape: ${a.shape}}} ${s?"(Note: it was int64 data type and registered to int32 as workaround)":""}`),i.constant(a,d)}registerGraphInput(e){this.temporaryGraphInputs.push(e)}registerGraphOutput(e){this.temporaryGraphOutputs.push(e)}isGraphInput(e,t){let r=this.sessionGraphInputs.get(e);return r?r.includes(t):!1}isGraphOutput(e,t){let r=this.sessionGraphOutputs.get(e);return r?r.includes(t):!1}isGraphInputOutputTypeSupported(e,t,r=!0){let i=this.mlContextBySessionId.get(e),a=ar.get(ht(t));return typeof a>"u"?!1:r?!!i?.opSupportLimits().input.dataTypes.includes(a):!!i?.opSupportLimits().output.dataTypes.includes(a)}flush(){}}}),ii=I(()=>{}),ai,ni,Br,si,oi,ui,Wi,Gi,ga,ja=I(()=>{yt(),ii(),ai=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),ni=[],Br=e=>Math.ceil(Number(e)/16)*16,si=e=>{for(let t=0;t<ni.length;t++){let r=ni[t];if(e<=r)return r}return Math.ceil(e/16)*16},oi=1,ui=()=>oi++,Wi=async(e,t,r,i)=>{let a=Br(r),n=e.device.createBuffer({size:a,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let s=e.getCommandEncoder();e.endComputePass(),s.copyBufferToBuffer(t,0,n,0,a),e.flush(),await n.mapAsync(GPUMapMode.READ);let o=n.getMappedRange();if(i){let u=i();return u.set(new Uint8Array(o,0,r)),u}else return new Uint8Array(o.slice(0,r))}finally{n.destroy()}},Gi=class{constructor(e){this.backend=e,this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[t]of ai)ni.push(t),this.freeBuffers.set(t,[]),this.freeUniformBuffers.set(t,[]);this.sessionCount=0}upload(e,t){let r=t.buffer,i=t.byteOffset,a=t.byteLength,n=Br(a),s=this.storageCache.get(e);if(!s)throw new Error("gpu data for uploading does not exist");if(Number(s.originalSize)!==a)throw new Error(`inconsistent data size. gpu data size=${s.originalSize}, data size=${a}`);let o=this.backend.device.createBuffer({mappedAtCreation:!0,size:n,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),u=o.getMappedRange();new Uint8Array(u).set(new Uint8Array(r,i,a)),o.unmap();let l=this.backend.device.createCommandEncoder();l.copyBufferToBuffer(o,0,s.gpuData.buffer,0,n),this.backend.device.queue.submit([l.finish()]),o.destroy(),Ie("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${e})`)}memcpy(e,t){let r=this.storageCache.get(e);if(!r)throw new Error("source gpu data for memcpy does not exist");let i=this.storageCache.get(t);if(!i)throw new Error("destination gpu data for memcpy does not exist");if(r.originalSize!==i.originalSize)throw new Error("inconsistent source and destination gpu data size");let a=Br(r.originalSize),n=this.backend.getCommandEncoder();this.backend.endComputePass(),n.copyBufferToBuffer(r.gpuData.buffer,0,i.gpuData.buffer,0,a)}registerExternalBuffer(e,t,r){let i;if(r){if(i=r[0],e===r[1])return Ie("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${i}, buffer is the same, skip.`),i;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else i=ui();return this.storageCache.set(i,{gpuData:{id:i,type:0,buffer:e},originalSize:t}),Ie("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${i}, registered.`),i}unregisterExternalBuffer(e){e!==void 0&&(this.storageCache.delete(e),Ie("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`))}create(e,t=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let r=si(e),i,a=(t&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,n=(t&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(a||n){let o=(a?this.freeBuffers:this.freeUniformBuffers).get(r);o?o.length>0?i=o.pop():i=this.backend.device.createBuffer({size:r,usage:t}):i=this.backend.device.createBuffer({size:r,usage:t})}else i=this.backend.device.createBuffer({size:r,usage:t});let s={id:ui(),type:0,buffer:i};return this.storageCache.set(s.id,{gpuData:s,originalSize:Number(e)}),Ie("verbose",()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${s.id}`),s}get(e){return this.storageCache.get(e)?.gpuData}release(e){let t=typeof e=="bigint"?Number(e):e,r=this.storageCache.get(t);if(!r){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return Ie("verbose",()=>`[WebGPU] GpuDataManager.release(id=${t}), gpuDataId=${r.gpuData.id}`),this.storageCache.delete(t),this.buffersPending.push(r.gpuData.buffer),r.originalSize}async download(e,t){let r=this.storageCache.get(Number(e));if(!r)throw new Error("data does not exist");await Wi(this.backend,r.gpuData.buffer,r.originalSize,t)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let e of this.buffersPending){let t=ai.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let r=this.freeBuffers.get(e.size)||[];t===void 0||r.length>=t?e.destroy():r.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let r=this.freeUniformBuffers.get(e.size)||[];t===void 0||r.length>=t?e.destroy():r.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e));for(let t of this.buffersPending)e.push(t);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(e){let t=this.capturedPendingBuffers.get(e);t&&(t.forEach(r=>{r.destroy()}),this.capturedPendingBuffers.delete(e)),this.sessionCount-=1,this.sessionCount===0&&(Ie("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(r=>{r.gpuData.buffer.destroy()}),this.storageCache=new Map)}},ga=(...e)=>new Gi(...e)}),c,g,$=I(()=>{c=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},g=e=>new c(e)}),S,T,O,z,E,A,U,N,L,D,Y,C,V,qe,_e,te,ve,H=I(()=>{le(),ne(),S=64,T=(e,t)=>{if(t===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(e)){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(t!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${e}`)}},O=(e,t=1)=>{let r=T(e,t);return typeof r=="string"?r:r[0]},z=(e,t=1)=>{let r=T(e,t);return typeof r=="string"?r:r[1]},E=(...e)=>{let t=[];return e.forEach(r=>{r.length!==0&&t.push({type:12,data:r},{type:12,data:M.computeStrides(r)})}),t},A=e=>e%4===0?4:e%2===0?2:1,U=(e="f32",t,r="0")=>!t||t===1?`${e}(${r})`:`vec${t}<${e}>(${r})`,N=(e,t,r)=>e==="f32"?r:t===1?`f32(${r})`:`vec${t}<f32>(${r})`,L=(e,t)=>t===4?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:t===2?`(${e}.x + ${e}.y)`:t===3?`(${e}.x + ${e}.y + ${e}.z)`:e,D=(e,t,r,i)=>e.startsWith("uniforms.")&&r>4?typeof t=="string"?i==="f16"?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:i==="f16"?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:r>1?`${e}[${t}]`:e,Y=(e,t,r,i,a)=>{let n=typeof r=="number",s=n?r:r.length,o=[...new Array(s).keys()],u=s<2?"u32":s<=4?`vec${s}<u32>`:`array<u32, ${s}>`,l=T(t,a),d=typeof l=="string"?l:l[1],p=typeof l=="string"?l:l[0],h={indices:u,value:d,storage:p,tensor:t},f=q=>typeof q=="string"?q:`${q}u`,m={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},y=n?"uniforms.":"",b=`${y}${e}_shape`,_=`${y}${e}_strides`,w="";for(let q=0;q<s-1;q++)w+=`
    let dim${q} = current / ${D(_,q,s)};
    let rest${q} = current % ${D(_,q,s)};
    indices[${q}] = dim${q};
    current = rest${q};
    `;w+=`indices[${s-1}] = current;`;let x=s<2?"":`
  fn o2i_${e}(offset: u32) -> ${h.indices} {
    var indices: ${h.indices};
    var current = offset;
    ${w}
    return indices;
  }`,v=q=>(m.offsetToIndices=!0,s<2?q:`o2i_${e}(${q})`),k=[];if(s>=2)for(let q=s-1;q>=0;q--)k.push(`${D(_,q,s)} * (indices[${q}])`);let B=s<2?"":`
  fn i2o_${e}(indices: ${h.indices}) -> u32 {
    return ${k.join("+")};
  }`,R=q=>(m.indicesToOffset=!0,s<2?q:`i2o_${e}(${q})`),P=(...q)=>s===0?"0u":`${h.indices}(${q.map(f).join(",")})`,F=(q,j)=>s<2?`${q}`:`${D(q,j,s)}`,Z=(q,j,be)=>s<2?`${q}=${be};`:`${D(q,j,s)}=${be};`,ce={},re=(q,j)=>{m.broadcastedIndicesToOffset=!0;let be=`${j.name}broadcastedIndicesTo${e}Offset`;if(be in ce)return`${be}(${q})`;let De=[];for(let nt=s-1;nt>=0;nt--){let Ft=j.indicesGet("outputIndices",nt+j.rank-s);De.push(`${F(_,nt)} * (${Ft} % ${F(b,nt)})`)}return ce[be]=`fn ${be}(outputIndices: ${j.type.indices}) -> u32 {
             return ${De.length>0?De.join("+"):"0u"};
           }`,`${be}(${q})`},ge=(q,j)=>(()=>{if(h.storage===h.value)return`${e}[${q}]=${j};`;if(h.storage==="vec2<u32>"&&h.value==="i32")return`${e}[${q}]=vec2<u32>(u32(${j}), select(0u, 0xFFFFFFFFu, ${j} < 0));`;if(h.storage==="vec2<u32>"&&h.value==="u32")return`${e}[${q}]=vec2<u32>(u32(${j}), 0u);`;if(h.storage==="u32"&&h.value==="vec4<bool>")return`${e}[${q}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${j}));`;throw new Error(`not supported combination of storage type ${h.storage} and value type ${h.value} yet`)})(),K=q=>(()=>{if(h.storage===h.value)return`${e}[${q}]`;if(h.storage==="vec2<u32>"&&h.value==="i32")return`i32(${e}[${q}].x)`;if(h.storage==="vec2<u32>"&&h.value==="u32")return`u32(${e}[${q}].x)`;if(h.storage==="u32"&&h.value==="vec4<bool>")return`vec4<bool>(bool(${e}[${q}] & 0xFFu), bool(${e}[${q}] & 0xFF00u), bool(${e}[${q}] & 0xFF0000u), bool(${e}[${q}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${h.storage} and value type ${h.value} yet`)})(),Se=s<2?"":`
  fn get_${e}ByIndices(indices: ${h.indices}) -> ${d} {
    return ${K(`i2o_${e}(indices)`)};
  }`,de=s<2?"":(()=>{let q=o.map(be=>`d${be}: u32`).join(", "),j=o.map(be=>`d${be}`).join(", ");return`
  fn get_${e}(${q}) -> ${d} {
    return get_${e}ByIndices(${P(j)});
  }`})(),J=(...q)=>{if(q.length!==s)throw new Error(`indices length must be ${s}`);let j=q.map(f).join(",");return s===0?K("0u"):s===1?K(j[0]):(m.get=!0,m.getByIndices=!0,m.indicesToOffset=!0,`get_${e}(${j})`)},Me=q=>s<2?K(q):(m.getByIndices=!0,m.indicesToOffset=!0,`get_${e}ByIndices(${q})`),ie=s<2?"":`
  fn set_${e}ByIndices(indices: ${h.indices}, value: ${d}) {
    ${ge(`i2o_${e}(indices)`,"value")}
  }`,Le=s<2?"":(()=>{let q=o.map(be=>`d${be}: u32`).join(", "),j=o.map(be=>`d${be}`).join(", ");return`
  fn set_${e}(${q}, value: ${d}) {
    set_${e}ByIndices(${P(j)}, value);
  }`})();return{impl:()=>{let q=[],j=!1;return m.offsetToIndices&&(q.push(x),j=!0),m.indicesToOffset&&(q.push(B),j=!0),m.broadcastedIndicesToOffset&&(Object.values(ce).forEach(be=>q.push(be)),j=!0),m.set&&(q.push(Le),j=!0),m.setByIndices&&(q.push(ie),j=!0),m.get&&(q.push(de),j=!0),m.getByIndices&&(q.push(Se),j=!0),!n&&j&&q.unshift(`const ${b} = ${h.indices}(${r.join(",")});`,`const ${_} = ${h.indices}(${M.computeStrides(r).join(",")});`),q.join(`
`)},type:h,offsetToIndices:v,indicesToOffset:R,broadcastedIndicesToOffset:re,indices:P,indicesGet:F,indicesSet:Z,set:(...q)=>{if(q.length!==s+1)throw new Error(`indices length must be ${s}`);let j=q[s];if(typeof j!="string")throw new Error("value must be string");let be=q.slice(0,s).map(f).join(",");return s===0?ge("0u",j):s===1?ge(be[0],j):(m.set=!0,m.setByIndices=!0,m.indicesToOffset=!0,`set_${e}(${be}, ${j})`)},setByOffset:ge,setByIndices:(q,j)=>s<2?ge(q,j):(m.setByIndices=!0,m.indicesToOffset=!0,`set_${e}ByIndices(${q}, ${j});`),get:J,getByOffset:K,getByIndices:Me,usage:i,name:e,strides:_,shape:b,rank:s}},C=(e,t,r,i=1)=>Y(e,t,r,"input",i),V=(e,t,r,i=1)=>Y(e,t,r,"output",i),qe=(e,t,r)=>Y(e,t,r,"atomicOutput",1),_e=(e,t,r,i=1)=>Y(e,t,r,"internal",i),te=class{constructor(e,t){this.normalizedDispatchGroup=e,this.limits=t,this.internalVariables=[],this.variables=[],this.uniforms=[],this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${typeof e=="number"?`${e}u`:e}) { return; }`}mainStart(e=S){let t=typeof e=="number"?e:e[0],r=typeof e=="number"?1:e[1],i=typeof e=="number"?1:e[2];if(t>this.limits.maxComputeWorkgroupSizeX||r>this.limits.maxComputeWorkgroupSizeY||i>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${t}, ${r}, ${i}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(t*r*i>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${t}, ${r}, ${i}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let a=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,n=a?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,s=a?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${t*r*i}u + local_idx;`;return`@compute @workgroup_size(${t}, ${r}, ${i})
  fn main(${n}) {
    ${s}
  `}appendVariableUniforms(e){e.rank!==0&&(e.shape.startsWith("uniforms.")&&this.uniforms.push({name:e.shape.replace("uniforms.",""),type:"u32",length:e.rank}),e.strides.startsWith("uniforms.")&&this.uniforms.push({name:e.strides.replace("uniforms.",""),type:"u32",length:e.rank}))}declareVariable(e,t){if(e.usage==="internal")throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(e),this.appendVariableUniforms(e);let r=e.usage==="input"?"read":"read_write",i=e.usage==="atomicOutput"?"atomic<i32>":e.type.storage;return`@group(0) @binding(${t}) var<storage, ${r}> ${e.name}: array<${i}>;`}declareVariables(...e){return e.map(t=>this.declareVariable(t,this.variableIndex++)).join(`
`)}registerInternalVariable(e){if(e.usage!=="internal")throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(e),this.appendVariableUniforms(e)}registerInternalVariables(...e){return e.forEach(t=>this.registerInternalVariable(t)),this}registerUniform(e,t,r=1){return this.uniforms.push({name:e,type:t,length:r}),this}registerUniforms(e){return this.uniforms=this.uniforms.concat(e),this}uniformDeclaration(){if(this.uniforms.length===0)return"";let e=[];for(let{name:t,type:r,length:i}of this.uniforms)if(i&&i>4)r==="f16"?e.push(`@align(16) ${t}:array<mat2x4<${r}>, ${Math.ceil(i/8)}>`):e.push(`${t}:array<vec4<${r}>, ${Math.ceil(i/4)}>`);else{let a=i==null||i===1?r:`vec${i}<${r}>`;e.push(`${t}:${a}`)}return`
      struct Uniforms { ${e.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(e=>e.impl()).join(`
`)+this.internalVariables.map(e=>e.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let e=t=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(t)];return this.uniforms.map(t=>[e(t.type),t.length??1])}},ve=(e,t)=>new te(e,t)}),tt,rt,qt,Zt,ji,wt,He,Hi,Ce,ot=I(()=>{le(),ne(),$(),H(),tt=(e,t)=>{if(!e||e.length!==1)throw new Error("Transpose requires 1 input.");if(t.length!==0&&t.length!==e[0].dims.length)throw new Error(`perm size ${t.length} does not match input rank ${e[0].dims.length}`)},rt=(e,t)=>t.length!==0?t:[...new Array(e).keys()].reverse(),qt=(e,t)=>M.sortBasedOnPerm(e,rt(e.length,t)),Zt=(e,t,r,i)=>{let a=`fn perm(i: ${i.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`;for(let n=0;n<t;++n)a+=`a[${e[n]}]=i[${n}];`;return a+="return a;}"},ji=(e,t)=>{let r=[],i=[];for(let a=0;a<e.length;++a)e[a]!==1&&r.push(e[a]),e[t[a]]!==1&&i.push(t[a]);return{newShape:r,newPerm:i}},wt=(e,t)=>{let r=0;for(let i=0;i<e.length;++i)if(t[e[i]]!==1){if(e[i]<r)return!1;r=e[i]}return!0},He=(e,t)=>{let r=e.dataType,i=e.dims.length,a=rt(i,t),n=qt(e.dims,a),s=e.dims,o=n,u=i<2||wt(a,e.dims),l;if(u)return l=m=>{let y=C("input",r,s,4),b=V("output",r,o,4);return`
  ${m.registerUniform("output_size","u32").declareVariables(y,b)}
  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`},{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let m=M.size(n);return{outputs:[{dims:n,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(m/64/4)},programUniforms:[{type:12,data:Math.ceil(m/4)}]}},getShaderSource:l};let{newShape:d,newPerm:p}=ji(e.dims,a),h=M.areEqual(p,[2,3,1]),f=M.areEqual(p,[3,1,2]);if(d.length===2||h||f){s=h?[d[0],d[1]*d[2]]:f?[d[0]*d[1],d[2]]:d,o=[s[1],s[0]];let m=16;return l=y=>{let b=C("a",r,s.length),_=V("output",r,o.length);return`
  ${y.registerUniform("output_size","u32").declareVariables(b,_)}
  var<workgroup> tile : array<array<${_.type.value}, ${m+1}>, ${m}>;
  ${y.mainStart([m,m,1])}
    let stride = (uniforms.output_shape[1] - 1) / ${m} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${m}u + local_id.x;
    let input_row = workgroup_id_x * ${m}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${b.getByIndices(`${b.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${m}u + local_id.x;
    let output_row = workgroup_id_y * ${m}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${_.setByIndices(`${_.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`},{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let y=M.size(n);return{outputs:[{dims:n,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(o[1]/m),y:Math.ceil(o[0]/m)},programUniforms:[{type:12,data:y},...E(s,o)]}},getShaderSource:l}}return l=m=>{let y=C("a",r,s.length),b=V("output",r,o.length);return`
  ${m.registerUniform("output_size","u32").declareVariables(y,b)}

  ${Zt(a,i,y,b)}

  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${b.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${b.setByOffset("global_idx",y.getByIndices("aIndices"))}
  }`},{name:"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>{let m=M.size(n);return{outputs:[{dims:n,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:[{type:12,data:m},...E(s,o)]}},getShaderSource:l}},Hi=(e,t)=>{tt(e.inputs,t.perm),e.compute(He(e.inputs[0],t.perm))},Ce=e=>g({perm:e.perm})}),ya,zt,Mr,Ke,ut,li,Dr,Ki,wa,Ct,Ye,nr,Ze,Fe,bt,_a,ba,as,ns,ss,os,oc=I(()=>{le(),ne(),H(),Ka(),ot(),ya={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},zt={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},Mr={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},Ke={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},ut=(e,t)=>{let r=[];for(let i=t-e;i<t;++i)r.push(i);return r},li=(e,t)=>{let r=[],i=e.length;for(let n=0;n<i;n++)t.indexOf(n)===-1&&r.push(e[n]);let a=t.map(n=>e[n]);return[r,a]},Dr=(e,t)=>{let r=e.length+t.length,i=[],a=0;for(let n=0;n<r;n++)t.indexOf(n)===-1?i.push(e[a++]):i.push(1);return i},Ki=(e,t)=>{for(let r=0;r<e.length;++r)if(e[e.length-r-1]!==t-1-r)return!1;return!0},wa=(e,t)=>{let r=[];if(!Ki(e,t)){for(let i=0;i<t;++i)e.indexOf(i)===-1&&r.push(i);e.forEach(i=>r.push(i))}return r},Ct=(e,t,r,i,a,n,s)=>{let o=r[0].dims,u=M.size(n),l=M.size(s),d=C("_A",r[0].dataType,o),p=V("output",a,n),h=64;u===1&&(h=256);let f=`
          var<workgroup> aBestValues : array<f32, ${h}>;
       `,m=y=>`
        ${y.registerUniform("reduceSize","u32").declareVariables(d,p)}
        ${f}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${y.mainStart(h)}

          let outputIndex = global_idx / ${h};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${Mr[i]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${h}) {
           let candidate = f32(${d.getByOffset("offset + k")});
           bestValue = ${ya[i]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${h}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${zt[i]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${p.setByOffset("outputIndex",`${i==="mean"?`${p.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${p.type.storage}(${Ke[i]})`}`)};
         }
        }`;return{name:e,shaderCache:{hint:`${t};${h}`,inputDependencies:["type"]},getShaderSource:m,getRunData:()=>({outputs:[{dims:n,dataType:a}],dispatchGroup:{x:u},programUniforms:[{type:12,data:l}]})}},Ye=(e,t,r,i)=>{let a=e.inputs.length===1?r:Ha(e.inputs,r),n=a.axes;n.length===0&&!a.noopWithEmptyAxes&&(n=e.inputs[0].dims.map((f,m)=>m));let s=M.normalizeAxes(n,e.inputs[0].dims.length),o=s,u=e.inputs[0],l=wa(o,e.inputs[0].dims.length);l.length>0&&(u=e.compute(He(e.inputs[0],l),{inputs:[0],outputs:[-1]})[0],o=ut(o.length,u.dims.length));let[d,p]=li(u.dims,o),h=d;a.keepDims&&(h=Dr(d,s)),e.compute(Ct(t,a.cacheKey,[u],i,e.inputs[0].dataType,h,p),{inputs:[u]})},nr=(e,t)=>{Ye(e,"ReduceMeanShared",t,"mean")},Ze=(e,t)=>{Ye(e,"ReduceL1Shared",t,"l1")},Fe=(e,t)=>{Ye(e,"ReduceL2Shared",t,"l2")},bt=(e,t)=>{Ye(e,"ReduceLogSumExpShared",t,"logSumExp")},_a=(e,t)=>{Ye(e,"ReduceMaxShared",t,"max")},ba=(e,t)=>{Ye(e,"ReduceMinShared",t,"min")},as=(e,t)=>{Ye(e,"ReduceProdShared",t,"prod")},ns=(e,t)=>{Ye(e,"ReduceSumShared",t,"sum")},ss=(e,t)=>{Ye(e,"ReduceSumSquareShared",t,"sumSquare")},os=(e,t)=>{Ye(e,"ReduceLogSumShared",t,"logSum")}}),At,us,$a,Ha,Ot,ls,ds,ps,cs,hs,fs,ms,gs,ys,ws,Rt,_s,bs,$s,vs,xs,Ss,Ts,Es,ks,Is,Ka=I(()=>{le(),ne(),$(),H(),oc(),At=e=>{if(!e||e.length===0||e.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(e.length===2&&e[1].dims.length!==1)throw new Error("Invalid axes input dims.")},us=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],$a=(e,t,r,i,a,n,s=!1,o=!1)=>{let u=[],l=r[0].dims,d=l.length,p=M.normalizeAxes(a,d),h=!o&&p.length===0;l.forEach((y,b)=>{h||p.indexOf(b)>=0?s&&u.push(1):u.push(y)});let f=u.length,m=M.size(u);return{name:e,shaderCache:t,getShaderSource:y=>{let b=[],_=C("_A",r[0].dataType,d),w=V("output",n,f),x=i(_,w,p),v=x[2];for(let k=0,B=0;k<d;k++)h||p.indexOf(k)>=0?(s&&B++,v=`for(var j${k}: u32 = 0; j${k} < ${l[k]}; j${k}++) {
                  ${x[2].includes("last_index")?`let last_index = j${k};`:""}
                  ${_.indicesSet("input_indices",k,`j${k}`)}
                  ${v}
                }`):(b.push(`${_.indicesSet("input_indices",k,w.indicesGet("output_indices",B))};`),B++);return`

        ${y.registerUniform("output_size","u32").declareVariables(_,w)}

        ${y.mainStart()}
          ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${_.type.indices};
          let output_indices = ${w.offsetToIndices("global_idx")};

          ${b.join(`
`)}
          ${x[0]}       // init ops for reduce max/min
          ${x[1]}
          ${v}
          ${x[3]}
          ${x.length===4?w.setByOffset("global_idx","value"):x.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:u,dataType:n}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:[{type:12,data:m},...E(l,u)]})}},Ha=(e,t)=>{let r=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(i=>r.push(Number(i))),g({axes:r,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},Ot=(e,t,r,i)=>{let a=e.inputs,n=a.length===1?r:Ha(a,r);e.compute($a(t,{hint:n.cacheKey,inputDependencies:["rank"]},[a[0]],n.noopWithEmptyAxes&&n.axes.length===0?us:i,n.axes,a[0].dataType,n.keepDims,n.noopWithEmptyAxes),{inputs:[0]})},ls=(e,t)=>{At(e.inputs),Ot(e,"ReduceLogSum",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,"value = log(value);"])},ds=(e,t)=>{At(e.inputs),Ot(e,"ReduceL1",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += abs(${r.getByIndices("input_indices")});`,""])},ps=(e,t)=>{At(e.inputs),Ot(e,"ReduceL2",t,(r,i)=>[`var t = ${i.type.value}(0); var value = ${i.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},cs=(e,t)=>{At(e.inputs),Ot(e,"ReduceLogSumExp",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += exp(${r.getByIndices("input_indices")});`,"value = log(value);"])},hs=(e,t)=>{At(e.inputs),Ot(e,"ReduceMax",t,(r,i,a)=>{let n=[];for(let s=0;s<r.rank;s++)(a.indexOf(s)>=0||a.length===0)&&n.push(r.indicesSet("input_indices",s,0));return[`${n.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = max(value, ${r.getByIndices("input_indices")});`,""]})},fs=(e,t)=>{At(e.inputs),Ot(e,"ReduceMean",t,(r,i,a)=>{let n=1;for(let s=0;s<r.rank;s++)(a.indexOf(s)>=0||a.length===0)&&(n*=e.inputs[0].dims[s]);return["var sum = f32(0);","",`sum += f32(${r.getByIndices("input_indices")});`,`let value = ${i.type.value}(sum / ${n});`]})},ms=(e,t)=>{At(e.inputs),Ot(e,"ReduceMin",t,(r,i,a)=>{let n=[];for(let s=0;s<r.rank;s++)(a.indexOf(s)>=0||a.length===0)&&n.push(`input_indices[${s}] = 0;`);return[`${n.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = min(value, ${r.getByIndices("input_indices")});`,""]})},gs=(e,t)=>{At(e.inputs),Ot(e,"ReduceProd",t,(r,i)=>[`var value = ${i.type.storage}(1);`,"",`value *= ${r.getByIndices("input_indices")};`,""])},ys=(e,t)=>{At(e.inputs),Ot(e,"ReduceSum",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,""])},ws=(e,t)=>{At(e.inputs),Ot(e,"ReduceSumSquare",t,(r,i)=>[`var t = ${i.type.value}(0); var value = ${i.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += t * t;`,""])},Rt=(e,t,r)=>{if(t.length===0)return r;let i=1,a=1;for(let n=0;n<t.length;n++)t.indexOf(n)===-1?i*=e[n]:a*=e[n];return a<32&&i>1024},_s=(e,t)=>{Rt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?fs(e,t):nr(e,t)},bs=(e,t)=>{Rt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?ds(e,t):Ze(e,t)},$s=(e,t)=>{Rt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?ps(e,t):Fe(e,t)},vs=(e,t)=>{Rt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?cs(e,t):bt(e,t)},xs=(e,t)=>{Rt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?hs(e,t):_a(e,t)},Ss=(e,t)=>{Rt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?ms(e,t):ba(e,t)},Ts=(e,t)=>{Rt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?gs(e,t):as(e,t)},Es=(e,t)=>{Rt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?ys(e,t):ns(e,t)},ks=(e,t)=>{Rt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?ws(e,t):ss(e,t)},Is=(e,t)=>{Rt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?ls(e,t):os(e,t)}}),Za,zs,Cs,Qa,uc=I(()=>{le(),$(),Ka(),Za=e=>{if(!e||e.length===0||e.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(e[0].dataType!==1)throw new Error("Invalid input type.")},zs=(e,t)=>{Za(e.inputs);let r=(i,a,n)=>{let s=[];for(let o=0;o<i.rank;o++)(n.indexOf(o)>=0||n.length===0)&&s.push(`input_indices[${o}] = 0;`);return[`${s.join(`
`)}`,`var value = ${i.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${i.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${i.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",a.setByOffset("global_idx","best_index")]};e.compute($a("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},Cs=(e,t)=>{Za(e.inputs);let r=(i,a,n)=>{let s=[];for(let o=0;o<i.rank;o++)(n.indexOf(o)>=0||n.length===0)&&s.push(`input_indices[${o}] = 0;`);return[`${s.join(`
`)}`,`var value = ${i.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${i.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${i.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",a.setByOffset("global_idx","best_index")]};e.compute($a("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},Qa=e=>g(e)}),As,va,Os,Rs,Bs,Zi,Ms,Ds,Xa=I(()=>{le(),ne(),ii(),H(),As=(e,t)=>{let r=e[0],i=e[1],a=e[2],n=e[3],s=e[4],o=e[5];if(s&&o)throw new Error("Attention cannot have both past and attention_bias");if(r.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let u=r.dims[0],l=r.dims[1],d=r.dims[2];if(a.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(i.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(i.dims[0]!==d)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(a.dims[0]!==i.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let p=a.dims[0]/3,h=p,f=h;if(t.qkvHiddenSizes.length>0){if(t.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let x of t.qkvHiddenSizes)if(x%t.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");p=t.qkvHiddenSizes[0],h=t.qkvHiddenSizes[1],f=t.qkvHiddenSizes[2]}let m=l;if(p!==h)throw new Error("qkv_hidden_sizes first element should be same as the second");if(a.dims[0]!==p+h+f)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let y=0;if(s){if(h!==f)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(s.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(s.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(s.dims[1]!==u)throw new Error('Input "past" second dimension must be batch_size');if(s.dims[2]!==t.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(s.dims[4]!==h/t.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||(y=s.dims[3])}let b=m+y,_=-1,w=0;if(n)throw new Error("Mask not supported");if(s)throw new Error("past is not supported");if(o){if(o.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(o.dims[0]!==u||o.dims[1]!==t.numHeads||o.dims[2]!==l||o.dims[3]!==b)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:u,sequenceLength:l,pastSequenceLength:y,kvSequenceLength:m,totalSequenceLength:b,maxSequenceLength:_,inputHiddenSize:d,hiddenSize:p,vHiddenSize:f,headSize:Math.floor(p/t.numHeads),vHeadSize:Math.floor(f/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:w,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},va=(e,t,r)=>t&&e?`
      let total_sequence_length_input = u32(${t.getByOffset("0")});
      let present_sequence_length = max(total_sequence_length_input, uniforms.past_sequence_length);
      let is_subsequent_prompt: bool = sequence_length > 1 && sequence_length != total_sequence_length_input;
      let is_first_prompt: bool = is_subsequent_prompt == false && sequence_length == total_sequence_length_input;
      total_sequence_length = u32(${e?.getByOffset("batchIdx")}) + 1;
      var past_sequence_length: u32 = 0;
      if (is_first_prompt == false) {
        past_sequence_length = total_sequence_length - sequence_length;
      }
       `:`
    ${r?"let past_sequence_length = uniforms.past_sequence_length":""};
    let present_sequence_length = total_sequence_length;
    `,Os=(e,t,r,i,a,n,s,o)=>{let u=A(s?1:n),l=64,d=n/u;d<l&&(l=32);let p=Math.ceil(n/u/l),h=[{type:12,data:t},{type:12,data:r},{type:12,data:i},{type:12,data:a},{type:12,data:d},{type:12,data:p}],f=O(e.dataType,u),m=z(1,u),y=["type"];s&&y.push("type"),o&&y.push("type");let b=_=>{let w=V("x",e.dataType,e.dims,u),x=[w],v=s?C("seq_lens",s.dataType,s.dims):void 0;v&&x.push(v);let k=o?C("total_sequence_length_input",o.dataType,o.dims):void 0;k&&x.push(k);let B=z(e.dataType),R=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${l}>;
  var<workgroup> thread_sum: array<f32, ${l}>;
  ${_.registerUniforms(R).declareVariables(...x)}
  ${_.mainStart([l,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${va(v,k,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${l}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${s?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${m}(-3.402823e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${m}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(u){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${u}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.402823e+38f);
    for (var i = 0u; i < ${l}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${m}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${m}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(u){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw new Error(`Unsupported components: ${u}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${l}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${w.type.value}(${B}(1.0) / ${B}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${m}(x[offset + i]);
        x[offset + i] = ${w.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${s?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${w.type.value}(${B}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${l};${f};${u}`,inputDependencies:y},getShaderSource:b,getRunData:()=>({outputs:[],dispatchGroup:{x:1,y:a,z:t*r},programUniforms:h})}},Rs=(e,t,r,i,a,n,s,o,u)=>{let l=s+n.kvSequenceLength,d=[n.batchSize,n.numHeads,n.sequenceLength,l],p=e>1&&i,h=n.kvNumHeads?n.kvNumHeads:n.numHeads,f=p?[n.batchSize,h,l,n.headSize]:void 0,m=n.nReps?n.nReps:1,y=n.scale===0?1/Math.sqrt(n.headSize):n.scale,b=A(n.headSize),_=n.headSize/b,w=12,x={x:Math.ceil(l/w),y:Math.ceil(n.sequenceLength/w),z:n.batchSize*n.numHeads},v=[{type:12,data:n.sequenceLength},{type:12,data:_},{type:12,data:l},{type:12,data:n.numHeads},{type:12,data:n.headSize},{type:1,data:y},{type:12,data:s},{type:12,data:n.kvSequenceLength},{type:12,data:m}],k=p&&i&&M.size(i.dims)>0,B=["type","type"];k&&B.push("type"),a&&B.push("type"),o&&B.push("type"),u&&B.push("type");let R=[{dims:d,dataType:t.dataType,gpuDataType:0}];p&&R.push({dims:f,dataType:t.dataType,gpuDataType:0});let P=F=>{let Z=C("q",t.dataType,t.dims,b),ce=C("key",r.dataType,r.dims,b),re=[Z,ce];if(k){let ie=C("past_key",i.dataType,i.dims,b);re.push(ie)}a&&re.push(C("attention_bias",a.dataType,a.dims));let ge=o?C("seq_lens",o.dataType,o.dims):void 0;ge&&re.push(ge);let K=u?C("total_sequence_length_input",u.dataType,u.dims):void 0;K&&re.push(K);let Se=V("output",t.dataType,d),de=[Se];p&&de.push(V("present_key",t.dataType,f,b));let J=z(1,b),Me=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${w}u;

  var<workgroup> tileQ: array<${Z.type.storage}, ${w*w}>;
  var<workgroup> tileK: array<${Z.type.storage}, ${w*w}>;
  ${F.registerUniforms(Me).declareVariables(...re,...de)}
  ${F.mainStart([w,w,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${m===1?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${m===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${va(ge,K,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${k&&p?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${p?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${J}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${k&&p?`
              if (n + local_id.y < past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else if (n + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
                tileK[idx] = key[kOffset + (n + local_id.y - past_sequence_length) * uniforms.K + w + local_id.x];
              }`:`
          if (n + local_id.y < uniforms.kv_sequence_length) {
            tileK[idx] = key[kOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
          }`}
      ${p?`if (n + local_id.y < present_sequence_length) {
        present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];
      }`:""}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
          value += ${J}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(b){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${b}`)}})()};
        output[outputIdx] = ${Se.type.value} (sum * uniforms.alpha) + ${a?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${b};${a!==void 0};${i!==void 0};${e}`,inputDependencies:B},getRunData:()=>({outputs:R,dispatchGroup:x,programUniforms:v}),getShaderSource:P}},Bs=(e,t,r,i,a,n,s=void 0,o=void 0)=>{let u=n+a.kvSequenceLength,l=a.nReps?a.nReps:1,d=a.vHiddenSize*l,p=e>1&&i,h=a.kvNumHeads?a.kvNumHeads:a.numHeads,f=p?[a.batchSize,h,u,a.headSize]:void 0,m=[a.batchSize,a.sequenceLength,d],y=12,b={x:Math.ceil(a.vHeadSize/y),y:Math.ceil(a.sequenceLength/y),z:a.batchSize*a.numHeads},_=[{type:12,data:a.sequenceLength},{type:12,data:u},{type:12,data:a.vHeadSize},{type:12,data:a.numHeads},{type:12,data:a.headSize},{type:12,data:d},{type:12,data:n},{type:12,data:a.kvSequenceLength},{type:12,data:l}],w=p&&i&&M.size(i.dims)>0,x=["type","type"];w&&x.push("type"),s&&x.push("type"),o&&x.push("type");let v=[{dims:m,dataType:t.dataType,gpuDataType:0}];p&&v.push({dims:f,dataType:t.dataType,gpuDataType:0});let k=B=>{let R=C("probs",t.dataType,t.dims),P=C("v",r.dataType,r.dims),F=[R,P];w&&F.push(C("past_value",i.dataType,i.dims));let Z=s?C("seq_lens",s.dataType,s.dims):void 0;s&&F.push(Z);let ce=o?C("total_sequence_length_input",o.dataType,o.dims):void 0;o&&F.push(ce);let re=[V("output",t.dataType,m)];p&&re.push(V("present_value",t.dataType,f));let ge=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${y}u;
  var<workgroup> tileQ: array<${R.type.value}, ${y*y}>;
  var<workgroup> tileV: array<${R.type.value}, ${y*y}>;
  ${B.registerUniforms(ge).declareVariables(...F,...re)}
  ${B.mainStart([y,y,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${l===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${l===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${va(Z,ce,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${w&&p?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${p?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${R.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${w&&p?`
        if (w + local_id.y < past_sequence_length) {
          tileV[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else if (w + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
          tileV[idx] = v[vOffset + (w + local_id.y - past_sequence_length) * uniforms.N];
        }
      `:`
            if (w + local_id.y < uniforms.kv_sequence_length) {
              tileV[idx] = v[vOffset + (w + local_id.y) * uniforms.N];
            }`}
        ${p?`
            if (w + local_id.y < present_sequence_length) {
          present_value[presentValueOffset + (w + local_id.y) * uniforms.N] = tileV[idx];
        }`:""}
      }
     workgroupBarrier();
     for (var k: u32 = 0u; k < TILE_SIZE && w+k < total_sequence_length; k++) {
       value += tileQ[TILE_SIZE * local_id.y + k] * tileV[TILE_SIZE * k + local_id.x];
     }
     workgroupBarrier();
   }

   // we need to transpose output from BNSH_v to BSND_v
   if (m < uniforms.M && n < uniforms.N) {
     let outputIdx = batchIdx * uniforms.M * uniforms.v_hidden_size + m * uniforms.v_hidden_size
       + headIdx * uniforms.N + n;
     output[outputIdx] = value;
   }
  }`};return{name:"AttentionScore",shaderCache:{hint:`${i!==void 0};${e}`,inputDependencies:x},getRunData:()=>({outputs:v,dispatchGroup:b,programUniforms:_}),getShaderSource:k}},Zi=(e,t,r,i,a,n,s,o,u,l,d=void 0,p=void 0)=>{let h=Math.min(e.outputCount,1+(s?1:0)+(o?1:0)),f=h>1?l.pastSequenceLength:0,m=f+l.kvSequenceLength,y=u&&M.size(u.dims)>0?u:void 0,b=[t,r];h>1&&s&&M.size(s.dims)>0&&b.push(s),y&&b.push(y),d&&b.push(d),p&&b.push(p);let _=e.compute(Rs(h,t,r,s,y,l,f,d,p),{inputs:b,outputs:h>1?[-1,1]:[-1]})[0];e.compute(Os(_,l.batchSize,l.numHeads,f,l.sequenceLength,m,d,p),{inputs:d&&p?[_,d,p]:[_],outputs:[]});let w=[_,i];h>1&&o&&M.size(o.dims)>0&&w.push(o),d&&w.push(d),p&&w.push(p),e.compute(Bs(h,_,i,o,l,f,d,p),{inputs:w,outputs:h>1?[0,2]:[0]})},Ms=(e,t)=>{let r=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],i=t.sequenceLength,a=t.inputHiddenSize,n=t.headSize,s=12,o={x:Math.ceil(t.headSize/s),y:Math.ceil(t.sequenceLength/s),z:t.batchSize*t.numHeads},u=[e.inputs[0],e.inputs[1],e.inputs[2]],l=[{type:12,data:i},{type:12,data:a},{type:12,data:n},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}],d=p=>{let h=V("output_q",u[0].dataType,r),f=V("output_k",u[0].dataType,r),m=V("output_v",u[0].dataType,r),y=C("input",u[0].dataType,u[0].dims),b=C("weight",u[1].dataType,u[1].dims),_=C("bias",u[2].dataType,u[2].dims),w=y.type.storage,x=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${s}u;
  var<workgroup> tileInput: array<${w}, ${s*s}>;
  var<workgroup> tileWeightQ: array<${w}, ${s*s}>;
  var<workgroup> tileWeightK: array<${w}, ${s*s}>;
  var<workgroup> tileWeightV: array<${w}, ${s*s}>;
  ${p.registerUniforms(x).declareVariables(y,b,_,h,f,m)}
  ${p.mainStart([s,s,1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${w}(0);
    var valueK = ${w}(0);
    var valueV = ${w}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileInput[TILE_SIZE * local_id.y + local_id.x] = input[inputOffset + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        let offset = n + (w + local_id.y) * uniforms.ldb;
        tileWeightQ[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetQ + offset];
        tileWeightK[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetK + offset];
        tileWeightV[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetV + offset];
      }
      workgroupBarrier();
      for (var k: u32 = 0u; k<TILE_SIZE && w+k < uniforms.K; k++) {
        let inputTileOffset = TILE_SIZE * local_id.y + k;
        let weightTileOffset = TILE_SIZE * k + local_id.x;
        valueQ += tileInput[inputTileOffset] * tileWeightQ[weightTileOffset];
        valueK += tileInput[inputTileOffset] * tileWeightK[weightTileOffset];
        valueV += tileInput[inputTileOffset] * tileWeightV[weightTileOffset];
      }

      workgroupBarrier();
    }

    let headOffset = (m * uniforms.N + n) % uniforms.head_size;
    valueQ += bias[headOffset + biasOffsetQ];
    valueK += bias[headOffset + biasOffsetK];
    valueV += bias[headOffset + biasOffsetV];

    let offset = workgroup_id.z * uniforms.M * uniforms.N;
    if (m < uniforms.M && n < uniforms.N) {
      let outputIdx = offset + m * uniforms.N + n;
      output_q[outputIdx] = valueQ;
      output_k[outputIdx] = valueK;
      output_v[outputIdx] = valueV;
    }
  }`};return e.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:o,programUniforms:l}),getShaderSource:d},{inputs:u,outputs:[-1,-1,-1]})},Ds=(e,t)=>{let r=As(e.inputs,t),[i,a,n]=Ms(e,r);return Zi(e,i,a,n,e.inputs[4],void 0,void 0,void 0,e.inputs[5],r)}}),Ps,Us,Ns,Ls,lc=I(()=>{it(),le(),ne(),$(),H(),Ps=(e,t)=>{if(!e||e.length!==5)throw new Error("BatchNormalization requires 5 inputs");let r=(i,a,n)=>{let s=a.length;if(s!==i.length)throw new Error(`${n}: num dimensions != ${s}`);a.forEach((o,u)=>{if(o!==i[u])throw new Error(`${n}: dim[${u}] do not match`)})};if(e[0].dims.length>1){let i=t.format==="NHWC"?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);r(e[1].dims,i,"Invalid input scale"),r(e[2].dims,i,"Invalid input B"),r(e[3].dims,i,"Invalid input mean"),r(e[4].dims,i,"Invalid input var")}else r(e[1].dims,[1],"Invalid input scale"),r(e[2].dims,[1],"Invalid input B"),r(e[3].dims,[1],"Invalid input mean"),r(e[4].dims,[1],"Invalid input var")},Us=(e,t)=>{let{epsilon:r,spatial:i,format:a}=t,n=e[0].dims,s=i?A(n[n.length-1]):1,o=a==="NHWC"&&n.length>1?s:1,u=M.size(n)/s,l=i,d=l?n.length:n,p=C("x",e[0].dataType,e[0].dims,s),h=C("scale",e[1].dataType,e[1].dims,o),f=C("bias",e[2].dataType,e[2].dims,o),m=C("inputMean",e[3].dataType,e[3].dims,o),y=C("inputVar",e[4].dataType,e[4].dims,o),b=V("y",e[0].dataType,d,s),_=()=>{let x="";if(i)x=`let cOffset = ${n.length===1?"0u":a==="NHWC"?`outputIndices[${n.length-1}] / ${s}`:"outputIndices[1]"};`;else if(a==="NCHW")x=`
            ${b.indicesSet("outputIndices","0","0")}
            let cOffset = ${b.indicesToOffset("outputIndices")};`;else{x=`var cIndices = ${h.type.indices}(0);
                       cIndices[0] = outputIndices[${n.length-1}];`;for(let v=1;v<h.rank;v++)x+=`cIndices[${v}] = outputIndices[${v}];`;x+=`let cOffset = ${h.indicesToOffset("cIndices")};`}return x},w=x=>`
  const epsilon = ${r};
  ${x.registerUniform("outputSize","u32").declareVariables(p,h,f,m,y,b)}
  ${x.mainStart()}
  ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${b.offsetToIndices(`global_idx * ${s}`)};
    ${_()}
    let scale = ${h.getByOffset("cOffset")};
    let bias = ${f.getByOffset("cOffset")};
    let inputMean = ${m.getByOffset("cOffset")};
    let inputVar = ${y.getByOffset("cOffset")};
    let x = ${p.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${b.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${i}_${s}`,inputDependencies:l?["rank","type","type","type","type"]:void 0},getShaderSource:w,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:l?[{type:12,data:u},...E(n)]:[{type:12,data:u}]})}},Ns=e=>g(e),Ls=(e,t)=>{let{inputs:r,outputCount:i}=e,a=Ns({...t,outputCount:i});if(ee.webgpu.validateInputContent&&Ps(r,a),t.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");e.compute(Us(r,a))}}),qs,Vs,Fs,dc=I(()=>{ne(),H(),qs=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Vs=e=>{let t=e[0].dims,r=e[0].dims[2],i=M.size(t)/4,a=e[0].dataType,n=C("input",a,t,4),s=C("bias",a,[r],4),o=C("residual",a,t,4),u=V("output",a,t,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)}}),getShaderSource:l=>`
  const channels = ${r}u / 4;
  ${l.declareVariables(n,s,o,u)}

  ${l.mainStart()}
    ${l.guardAgainstOutOfBoundsWorkgroupSizes(i)}
    let value = ${n.getByOffset("global_idx")}
      + ${s.getByOffset("global_idx % channels")} + ${o.getByOffset("global_idx")};
    ${u.setByOffset("global_idx","value")}
  }`}},Fs=e=>{qs(e.inputs),e.compute(Vs(e.inputs))}}),Ws,Be,Gs,js,Hs,Ks,Zs,Qs,Xs,Ys,Js,eo,to,ro,io,ao,Qi,no,xa,so,oo,uo,lo,po,co,ho,fo,mo,go,yo,wo,_o,bo,$o,vo,Ya,xo,Ja,en,So,To,Eo,ko,Io,zo,tn=I(()=>{le(),ne(),$(),H(),Ws=(e,t,r,i,a,n,s)=>{let o=Math.ceil(t/4),u="";typeof a=="string"?u=`${a}(a)`:u=a("a");let l=C("inputData",r,[o],4),d=V("outputData",i,[o],4),p=[{name:"vec_size",type:"u32"}];return s&&p.push(...s),`
      ${e.registerUniforms(p).declareVariables(l,d)}

  ${n??""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${l.getByOffset("global_idx")};
    ${d.setByOffset("global_idx",u)}
  }`},Be=(e,t,r,i,a,n=e.dataType,s,o)=>{let u=[{type:12,data:Math.ceil(M.size(e.dims)/4)}];return s&&u.push(...s),{name:t,shaderCache:{hint:a,inputDependencies:["type"]},getShaderSource:l=>Ws(l,M.size(e.dims),e.dataType,n,r,i,o),getRunData:l=>({outputs:[{dims:e.dims,dataType:n}],dispatchGroup:{x:Math.ceil(M.size(l[0].dims)/64/4)},programUniforms:u})}},Gs=e=>{e.compute(Be(e.inputs[0],"Abs","abs"))},js=e=>{e.compute(Be(e.inputs[0],"Acos","acos"))},Hs=e=>{e.compute(Be(e.inputs[0],"Acosh","acosh"))},Ks=e=>{e.compute(Be(e.inputs[0],"Asin","asin"))},Zs=e=>{e.compute(Be(e.inputs[0],"Asinh","asinh"))},Qs=e=>{e.compute(Be(e.inputs[0],"Atan","atan"))},Xs=e=>{e.compute(Be(e.inputs[0],"Atanh","atanh"))},Ys=e=>g(e),Js=(e,t)=>{let r;switch(t.to){case 10:r="vec4<f16>";break;case 1:r="vec4<f32>";break;case 12:r="vec4<u32>";break;case 6:r="vec4<i32>";break;case 9:r="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(Be(e.inputs[0],"Cast",r,void 0,t.cacheKey,t.to))},eo=e=>{let t,r,i=e.length>=2&&e[1].data!==0,a=e.length>=3&&e[2].data!==0;switch(e[0].dataType){case 1:t=i?e[1].getFloat32Array()[0]:-34028234663852886e22,r=a?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=i?e[1].getUint16Array()[0]:64511,r=a?e[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return g({min:t,max:r})},to=(e,t)=>{let r=t||eo(e.inputs),i=z(e.inputs[0].dataType);e.compute(Be(e.inputs[0],"Clip",a=>`clamp(${a}, vec4<${i}>(uniforms.min), vec4<${i}>(uniforms.max))`,void 0,r.cacheKey,void 0,[{type:e.inputs[0].dataType,data:r.min},{type:e.inputs[0].dataType,data:r.max}],[{name:"min",type:i},{name:"max",type:i}]),{inputs:[0]})},ro=e=>{e.compute(Be(e.inputs[0],"Ceil","ceil"))},io=e=>{e.compute(Be(e.inputs[0],"Cos","cos"))},ao=e=>{e.compute(Be(e.inputs[0],"Cosh","cosh"))},Qi=e=>g(e),no=(e,t)=>{let r=z(e.inputs[0].dataType);e.compute(Be(e.inputs[0],"Elu",i=>`elu_vf32(${i})`,`
  const elu_alpha_ = ${r}(${t.alpha});

  fn elu_f32(a: ${r}) -> ${r} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${r}>) -> vec4<${r}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,t.cacheKey))},xa=(e="f32")=>`
const r0: ${e} = 0.3275911;
const r1: ${e} = 0.254829592;
const r2: ${e} = -0.284496736;
const r3: ${e} = 1.421413741;
const r4: ${e} = -1.453152027;
const r5: ${e} = 1.061405429;

fn erf_vf32(v: vec4<${e}>) -> vec4<${e}> {
  let absv = abs(v);
  let x = 1.0 / (1.0 + r0 * absv);
  return sign(v) * (1.0 - ((((r5 * x + r4) * x + r3) * x + r2) * x + r1) * x * exp(-absv * absv));
}`,so=e=>{let t=z(e.inputs[0].dataType);e.compute(Be(e.inputs[0],"Erf",r=>`erf_vf32(${r})`,xa(t)))},oo=e=>{e.compute(Be(e.inputs[0],"Exp","exp"))},uo=e=>{e.compute(Be(e.inputs[0],"Floor","floor"))},lo=e=>{let t=z(e.inputs[0].dataType);e.compute(Be(e.inputs[0],"Gelu",r=>`0.5 * ${r} * (1.0 + erf_vf32(${r} * 0.7071067811865475))`,xa(t)))},po=(e,t)=>{let r=z(e.inputs[0].dataType);e.compute(Be(e.inputs[0],"LeakyRelu",i=>`select(leaky_relu_alpha_ * ${i}, ${i}, ${i} >= vec4<${r}>(0.0))`,`const leaky_relu_alpha_ = ${r}(${t.alpha});`,t.cacheKey))},co=e=>{e.compute(Be(e.inputs[0],"Not",t=>`!${t}`))},ho=e=>{e.compute(Be(e.inputs[0],"Neg",t=>`-${t}`))},fo=e=>{e.compute(Be(e.inputs[0],"Reciprocal",t=>`1.0/${t}`))},mo=e=>{let t=z(e.inputs[0].dataType);e.compute(Be(e.inputs[0],"Relu",r=>`select(vec4<${t}>(0.0), ${r}, ${r} > vec4<${t}>(0.0))`))},go=e=>{e.compute(Be(e.inputs[0],"Sigmoid",t=>`(1.0 / (1.0 + exp(-${t})))`))},yo=e=>g(e),wo=(e,t)=>{let r=z(e.inputs[0].dataType);e.compute(Be(e.inputs[0],"HardSigmoid",i=>`max(vec4<${r}>(0.0), min(vec4<${r}>(1.0), ${t.alpha} * ${i} + vec4<${r}>(${t.beta})))`,void 0,t.cacheKey))},_o=e=>{e.compute(Be(e.inputs[0],"Sin","sin"))},bo=e=>{e.compute(Be(e.inputs[0],"Sinh","sinh"))},$o=e=>{e.compute(Be(e.inputs[0],"Sqrt","sqrt"))},vo=e=>{e.compute(Be(e.inputs[0],"Tan","tan"))},Ya=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,xo=e=>{e.compute(Be(e.inputs[0],"Tanh",Ya))},Ja=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${Ya("v")};
}
`,en=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,So=e=>{let t=z(e.inputs[0].dataType);e.compute(Be(e.inputs[0],"FastGelu",en,Ja(t),void 0,e.inputs[0].dataType))},To=(e,t)=>{let r=z(e.inputs[0].dataType);return e.compute(Be(e.inputs[0],"ThresholdedRelu",i=>`select(vec4<${r}>(0.0), ${i}, ${i} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${r}>(${t.alpha});`,t.cacheKey)),0},Eo=e=>{e.compute(Be(e.inputs[0],"Log","log"))},ko=(e,t)=>`
const alpha = vec4<${e}>(${t});
const one = ${e}(1.0);
const zero = ${e}(0.0);

fn quick_gelu_impl(x: vec4<${e}>) -> vec4<${e}> {
  let v = x *alpha;
  var x1 : vec4<${e}>;
  for (var i = 0; i < 4; i = i + 1) {
    if (v[i] >= zero) {
      x1[i] = one / (one + exp(-v[i]));
    } else {
      x1[i] = one - one / (one + exp(v[i]));
    }
  }
  return x * x1;
}
`,Io=e=>`quick_gelu_impl(${e})`,zo=(e,t)=>{let r=z(e.inputs[0].dataType);e.compute(Be(e.inputs[0],"QuickGelu",Io,ko(r,t.alpha),t.cacheKey,e.inputs[0].dataType))}}),Co,Ao,Oo,pc=I(()=>{ne(),H(),tn(),Co=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Ao=e=>{let t=e[0].dims.slice();t[2]=t[2]/2;let r=C("input",e[0].dataType,e[0].dims,4),i=C("bias",e[0].dataType,[e[0].dims[2]],4),a=V("output",e[0].dataType,t,4),n=M.size(t)/4,s=O(e[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(n/64)}}),getShaderSource:o=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${o.declareVariables(r,i,a)}

  ${xa(s)}

  ${o.mainStart()}
    ${o.guardAgainstOutOfBoundsWorkgroupSizes(n)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${a.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},Oo=e=>{Co(e.inputs),e.compute(Ao(e.inputs))}}),Ro,Bo,Bt,Mo,Do,Po,Uo,No,Lo,qo,Vo,Fo,Wo,cc=I(()=>{le(),ne(),H(),Ro=(e,t,r,i,a,n,s,o,u,l,d,p)=>{let h,f;typeof o=="string"?h=f=(w,x)=>`${o}((${w}),(${x}))`:typeof o=="function"?h=f=o:(h=o.scalar,f=o.vector);let m=V("outputData",d,i.length,4),y=C("aData",u,t.length,4),b=C("bData",l,r.length,4),_;if(a)if(n){let w=M.size(t)===1,x=M.size(r)===1,v=t.length>0&&t[t.length-1]%4===0,k=r.length>0&&r[r.length-1]%4===0;w||x?_=m.setByOffset("global_idx",f(w?`${y.type.value}(${y.getByOffset("0")}.x)`:y.getByOffset("global_idx"),x?`${b.type.value}(${b.getByOffset("0")}.x)`:b.getByOffset("global_idx"))):_=`
            let outputIndices = ${m.offsetToIndices("global_idx * 4u")};
            let offsetA = ${y.broadcastedIndicesToOffset("outputIndices",m)};
            let offsetB = ${b.broadcastedIndicesToOffset("outputIndices",m)};
            ${m.setByOffset("global_idx",f(s||v?y.getByOffset("offsetA / 4u"):`${y.type.value}(${y.getByOffset("offsetA / 4u")}[offsetA % 4u])`,s||k?b.getByOffset("offsetB / 4u"):`${b.type.value}(${b.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else _=m.setByOffset("global_idx",f(y.getByOffset("global_idx"),b.getByOffset("global_idx")));else{if(!n)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let w=(x,v,k="")=>{let B=`aData[indexA${v}][componentA${v}]`,R=`bData[indexB${v}][componentB${v}]`;return`
            let outputIndices${v} = ${m.offsetToIndices(`global_idx * 4u + ${v}u`)};
            let offsetA${v} = ${y.broadcastedIndicesToOffset(`outputIndices${v}`,m)};
            let offsetB${v} = ${b.broadcastedIndicesToOffset(`outputIndices${v}`,m)};
            let indexA${v} = offsetA${v} / 4u;
            let indexB${v} = offsetB${v} / 4u;
            let componentA${v} = offsetA${v} % 4u;
            let componentB${v} = offsetB${v} % 4u;
            ${x}[${v}] = ${k}(${h(B,R)});
          `};d===9?_=`
            var data = vec4<u32>(0);
            ${w("data",0,"u32")}
            ${w("data",1,"u32")}
            ${w("data",2,"u32")}
            ${w("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:_=`
            ${w("outputData[global_idx]",0)}
            ${w("outputData[global_idx]",1)}
            ${w("outputData[global_idx]",2)}
            ${w("outputData[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(y,b,m)}

        ${p??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${_}
      }`},Bo=(e,t,r,i,a,n,s=r.dataType)=>{let o=r.dims.map(y=>Number(y)??1),u=i.dims.map(y=>Number(y)??1),l=!M.areEqual(o,u),d=o,p=M.size(o),h=!1,f=!1,m=[l];if(l){let y=Ut.calcShape(o,u,!1);if(!y)throw new Error("Can't perform binary op on the given tensors");d=y.slice(),p=M.size(d);let b=M.size(o)===1,_=M.size(u)===1,w=o.length>0&&o[o.length-1]%4===0,x=u.length>0&&u[u.length-1]%4===0;m.push(b),m.push(_),m.push(w),m.push(x);let v=1;for(let k=1;k<d.length;k++){let B=o[o.length-k],R=u[u.length-k];if(B===R)v*=B;else break}v%4===0?(f=!0,h=!0):(b||_||w||x)&&(h=!0)}else h=!0;return m.push(h),{name:e,shaderCache:{hint:t+m.map(y=>y.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:y=>Ro(y,o,u,d,h,l,f,a,r.dataType,i.dataType,s,n),getRunData:()=>({outputs:[{dims:d,dataType:s}],dispatchGroup:{x:Math.ceil(p/64/4)},programUniforms:[{type:12,data:Math.ceil(M.size(d)/4)},...E(o,u,d)]})}},Bt=(e,t,r,i,a,n)=>{e.compute(Bo(t,a??"",e.inputs[0],e.inputs[1],r,i,n))},Mo=e=>{Bt(e,"Add",(t,r)=>`${t}+${r}`)},Do=e=>{Bt(e,"Div",(t,r)=>`${t}/${r}`)},Po=e=>{Bt(e,"Equal",{scalar:(t,r)=>`u32(${t}==${r})`,vector:(t,r)=>`vec4<u32>(${t}==${r})`},void 0,void 0,9)},Uo=e=>{Bt(e,"Mul",(t,r)=>`${t}*${r}`)},No=e=>{let t=C("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;Bt(e,"Pow",{scalar:(r,i)=>`pow_custom(${r},${i})`,vector:(r,i)=>`pow_vector_custom(${r},${i})`},`
    fn pow_custom(a : ${t}, b : ${t}) -> ${t} {
      if (b == ${t}(0.0)) {
        return ${t}(1.0);
      } else if (a < ${t}(0.0) && f32(b) != floor(f32(b))) {
        return ${t}(pow(f32(a), f32(b))); // NaN
      }
      return select(sign(a), ${t}(1.0), round(f32(abs(b) % ${t}(2.0))) != 1.0) * ${t}(${t==="i32"?"round":""}(pow(f32(abs(a)), f32(b))));
    }
    fn pow_vector_custom(a : vec4<${t}>, b : vec4<${t}>) -> vec4<${t}> {
      // TODO: implement vectorized pow
      return vec4<${t}>(pow_custom(a.x, b.x), pow_custom(a.y, b.y), pow_custom(a.z, b.z), pow_custom(a.w, b.w));
    }
      `)},Lo=e=>{Bt(e,"Sub",(t,r)=>`${t}-${r}`)},qo=e=>{Bt(e,"Greater",{scalar:(t,r)=>`u32(${t}>${r})`,vector:(t,r)=>`vec4<u32>(${t}>${r})`},void 0,void 0,9)},Vo=e=>{Bt(e,"Less",{scalar:(t,r)=>`u32(${t}<${r})`,vector:(t,r)=>`vec4<u32>(${t}<${r})`},void 0,void 0,9)},Fo=e=>{Bt(e,"GreaterOrEqual",{scalar:(t,r)=>`u32(${t}>=${r})`,vector:(t,r)=>`vec4<u32>(${t}>=${r})`},void 0,void 0,9)},Wo=e=>{Bt(e,"LessOrEqual",{scalar:(t,r)=>`u32(${t}<=${r})`,vector:(t,r)=>`vec4<u32>(${t}<=${r})`},void 0,void 0,9)}}),Go,jo,Ho,Ko,Zo,Qo,hc=I(()=>{le(),ne(),$(),H(),Go=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");let r=0,i=e[r],a=i.dataType,n=i.dims.length;e.forEach((s,o)=>{if(o!==r){if(s.dataType!==a)throw new Error("input tensors should be one type");if(s.dims.length!==n)throw new Error("input tensors should have the same shape");s.dims.forEach((u,l)=>{if(l!==t&&u!==i.dims[l])throw new Error("non concat dimensions must match")})}})},jo=(e,t)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e}u>(${t});
    for (var i: u32 = 0u; i < ${e}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e}u;
  }`,Ho=(e,t)=>{let r=e.length,i=[];for(let a=0;a<r;++a){let n=t.setByOffset("global_idx",e[a].getByIndices("indices"));r===1?i.push(n):a===0?i.push(`if (inputIndex == ${a}u) { ${n} }`):a===r-1?i.push(`else { ${n} }`):i.push(`else if (inputIndex == ${a}) { ${n} }`)}return i.join(`
`)},Ko=(e,t,r,i)=>{let a=M.size(r),n=new Array(e.length),s=new Array(e.length),o=0,u=[],l=[],d=[{type:12,data:a}];for(let y=0;y<e.length;++y)o+=e[y].dims[t],n[y]=o,l.push(e[y].dims.length),s[y]=C(`input${y}`,i,l[y]),u.push("rank"),d.push({type:12,data:n[y]});for(let y=0;y<e.length;++y)d.push(...E(e[y].dims));d.push(...E(r));let p=V("output",i,r.length),h=p.indicesGet("indices",t),f=Array.from(Array(n.length).keys()).map(y=>`uniforms.sizeInConcatAxis${y}`).join(","),m=y=>`

  ${(()=>{y.registerUniform("outputSize","u32");for(let b=0;b<e.length;b++)y.registerUniform(`sizeInConcatAxis${b}`,"u32");return y.declareVariables(...s,p)})()}

  ${jo(n.length,f)}

  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${p.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${h});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${n.length}u>(${f});
      ${h} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${Ho(s,p)}
  }`;return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:u},getRunData:()=>({outputs:[{dims:r,dataType:i}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:d}),getShaderSource:m}},Zo=(e,t)=>{let r=e.inputs,i=r[0].dims,a=M.normalizeAxis(t.axis,i.length);Go(r,a);let n=i.slice();n[a]=r.reduce((o,u)=>o+(u.dims.length>a?u.dims[a]:0),0);let s=r.filter(o=>M.size(o.dims)>0);e.compute(Ko(s,a,n,r[0].dataType),{inputs:s})},Qo=e=>g({axis:e.axis})}),Pr,Ur,Nr,rn,Lr=I(()=>{le(),ne(),Pr=(e,t,r="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${r}(uniforms.clip_min)), ${t}(${r}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${r}(uniforms.alpha) * value + ${r}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${r}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${e.activation}`)}},Ur=(e,t)=>{e.activation==="Clip"?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):e.activation==="HardSigmoid"?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):e.activation==="LeakyRelu"&&t.push({type:1,data:e.alpha})},Nr=(e,t)=>{e.activation==="Clip"?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):e.activation==="HardSigmoid"?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):e.activation==="LeakyRelu"&&t.push({name:"alpha",type:"f32"})},rn=e=>{let t=e?.activation||"";if(t==="HardSigmoid"){let[r,i]=e?.activation_params||[.2,.5];return{activation:t,alpha:r,beta:i}}else if(t==="Clip"){let[r,i]=e?.activation_params||[Ui,kt];return{activation:t,clipMax:i,clipMin:r}}else if(t==="LeakyRelu"){let[r]=e?.activation_params||[.01];return{activation:t,alpha:r}}return{activation:t}}}),at,Xo,an=I(()=>{at=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw new Error(`${e}-component is not supported.`)}},Xo=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `}),Yo,fc=I(()=>{Yo=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`}),Xi,nn,sn=I(()=>{le(),ne(),H(),Lr(),Xi=(e,t,r,i,a)=>{let n=i-r;return`
      ${Array.from({length:r}).map((s,o)=>`
      if (${D(t.shape,o,t.rank)} != 1) {
        ${t.indicesSet(e,o,D(a,o+n,i))}
      } else {
        ${t.indicesSet(e,o,0)}
      }`).join("")}
`},nn=(e,t,r,i,a=!1,n)=>{let s=e[0].dims,o=e[1].dims,u=s[s.length-2],l=o[o.length-1],d=s[s.length-1],p=A(l),h=A(d),f=A(u),m=M.size(r)/p/f,y=e.length>2,b=i?i.slice(0,-2):r.slice(0,-2),_=[M.size(b),u,l],w=[{type:12,data:m},{type:12,data:u},{type:12,data:l},{type:12,data:d}];Ur(t,w),w.push(...E(b,s,o)),y&&w.push(...E(e[2].dims)),w.push(...E(_));let x=v=>{let k=_e("batch_dims",e[0].dataType,b.length),B=C("a",e[0].dataType,s.length,h),R=C("b",e[1].dataType,o.length,p),P=V("output",e[0].dataType,_.length,p),F=O(P.type.tensor),Z=Pr(t,P.type.value,F),ce=[B,R],re="";if(y){let Se=a?p:1;ce.push(C("bias",e[2].dataType,e[2].dims.length,Se)),re=`${a?`value += bias[col / ${Se}];`:`value += ${P.type.value}(bias[row + i]);`}`}let ge=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];Nr(t,ge);let K=()=>{let Se=`var a_data: ${B.type.value};`;for(let de=0;de<h;de++)Se+=`
              let b_data${de} = b[(b_offset + (k + ${de}) * uniforms.N + col) / ${p}];`;for(let de=0;de<f;de++){Se+=`a_data = a[(a_offset + (row + ${de}) * uniforms.K + k) / ${h}];`;for(let J=0;J<h;J++)Se+=`
            values[${de}] = fma(${R.type.value}(a_data${h===1?"":`[${J}]`}), b_data${J}, values[${de}]);
`}return Se};return`
  ${v.registerUniforms(ge).registerInternalVariables(k).declareVariables(...ce,P)}
  ${v.mainStart()}
    ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${p})) * ${p};
    var index1 = global_idx / (uniforms.N / ${p});
    let stride1 = uniforms.M / ${f};
    let row = (index1 % stride1) * ${f};
    let batch = index1 / stride1;

    ${r.length===2?"":`let batch_indices = ${k.offsetToIndices("batch")};`}

    var a_indices: ${B.type.indices};
    ${Xi("a_indices",B,B.rank-2,k.rank,"batch_indices")}
    ${B.indicesSet("a_indices",B.rank-2,0)}
    ${B.indicesSet("a_indices",B.rank-1,0)}
    let a_offset = ${B.indicesToOffset("a_indices")};

    var b_indices: ${R.type.indices};
    ${Xi("b_indices",R,R.rank-2,k.rank,"batch_indices")}
    ${R.indicesSet("b_indices",R.rank-2,0)}
    ${R.indicesSet("b_indices",R.rank-1,0)}
    let b_offset = ${R.indicesToOffset("b_indices")};
    var values: array<${P.type.value}, ${f}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${h}) {
      ${K()}
    }
    for (var i = 0u; i < ${f}u; i++) {
      var value = values[i];
      ${re}
      ${Z}
      let cur_indices = ${P.type.indices}(batch, row + i, col);
      let offset = ${P.indicesToOffset("cur_indices")};
      ${P.setByOffset(`offset / ${p}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${p};${h};${f};${a}`,inputDependencies:y?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:n?n(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:w}),getShaderSource:x}}}),Jo,eu,on,un,tu,ln,ru,Sa,dn=I(()=>{le(),ne(),H(),Lr(),sn(),an(),Jo=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t?", batchIndices":""});
        `,eu=(e,t)=>e?`
        let ACached0 = mm_Asub[k * innerElementSize][localRow];
        let ACached1 = mm_Asub[k * innerElementSize + 1][localRow];
        let ACached2 = mm_Asub[k * innerElementSize + 2][localRow];
        ${t===3?"":"let ACached3 = mm_Asub[k * innerElementSize + 3][localRow];"}
        for (var i = 0; i < rowPerThread; i = i + 1) {
          acc[i] = BCached0 * ACached0[i] + acc[i];
          acc[i] = BCached1 * ACached1[i] + acc[i];
          acc[i] = BCached2 * ACached2[i] + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached3[i] + acc[i];"}
        }`:`
        for (var i = 0; i < rowPerThread; i = i + 1) {
          let ACached = mm_Asub[tileRow + i][k];
          acc[i] = BCached0 * ACached.x + acc[i];
          acc[i] = BCached1 * ACached.y + acc[i];
          acc[i] = BCached2 * ACached.z + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached.w + acc[i];"}
        }`,on=(e,t,r="f32",i,a=!1,n=32,s=!1,o=32)=>{let u=t[1]*e[1],l=t[0]*e[0],d=a?u:n,p=a?n:u,h=d/t[0],f=n/t[1];if(!((a&&h===4&&e[1]===4||!a&&(h===3||h===4))&&d%t[0]===0&&n%t[1]===0&&e[0]===4))throw new Error(`If transposeA ${a} is true, innerElementSize ${h} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${h} must be 3 or 4.
  tileAWidth ${d} must be divisible by workgroupSize[0]${t[0]}. tileInner ${n} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${h}<${r}>, ${d/h}>, ${p}>;
var<workgroup> mm_Bsub: array<array<vec4<${r}>, ${l/e[0]}>, ${n}>;

const rowPerThread = ${e[1]};
const colPerThread = ${e[0]};
const innerElementSize = ${h};
const tileInner = ${n};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
  let localRow = i32(localId.y);
  let tileRow = localRow * rowPerThread;
  let tileCol = i32(localId.x);

  let globalRow =i32(globalId.y) * rowPerThread;
  let globalCol = i32(globalId.x);
  let batch = ${s?"0":"i32(globalId.z)"};
  ${i?`let batchIndices = ${i.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${u};

  let num_tiles = ${s?`${Math.ceil(o/n)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${s?`i32(globalId.z) * ${o}`:"0"};

  var acc: array<vec4<${r}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${f};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${Jo(a,i)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${f}; innerRow = innerRow + 1) {
          let inputRow = tileRowB + innerRow;
          let inputCol = tileCol;
          mm_Bsub[inputRow][inputCol] = mm_readB(batch, kStart + inputRow, globalCol${i?", batchIndices":""});
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      for (var k = 0; k < tileInner / innerElementSize; k = k + 1) {
          let BCached0 = mm_Bsub[k * innerElementSize][tileCol];
          let BCached1 = mm_Bsub[k * innerElementSize + 1][tileCol];
          let BCached2 = mm_Bsub[k * innerElementSize + 2][tileCol];
          ${h===3?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${eu(a,h)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},un=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?", batchIndices":""});
            `,tu=e=>e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",ln=(e,t,r="f32",i,a=!1,n=32,s=!1,o=32,u=!1)=>{let l=e[1]*t[1],d=e[0]*t[0],p=a?l:n,h=a?n:l;if(!(h%t[1]===0&&p%t[0]===0&&n%t[1]===0))throw new Error(`tileAHight ${h} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${p} must be divisible by workgroupSize[0]${t[0]}, tileInner ${n} must be divisible by workgroupSize[1]${t[1]}`);let f=h/t[1],m=p/t[0],y=n/t[1],b=u?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${l};
    let globalColStart = i32(workgroupId.x) * ${d};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${h}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${p}; inputCol = inputCol + ${t[0]}) {
          ${un(a,i)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${n}; inputRow = inputRow + ${t[1]}) {
            for (var inputCol = localCol; inputCol < ${d}; inputCol = inputCol + ${t[0]}) {
          mm_Bsub[inputRow][inputCol] = mm_readB(batch,
            kStart + inputRow,
            globalColStart + inputCol${i?", batchIndices":""});
        }
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      var BCached : array<${r}, colPerThread>;
      for (var k = 0; k < tileInner; k = k + 1) {
        for (var inner = 0; inner < colPerThread; inner = inner + 1) {
          BCached[inner] = mm_Bsub[k][localCol + inner * ${t[0]}];
        }
        for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let ACached = ${a?`mm_Asub[k][localRow + innerRow * ${t[1]}];`:`mm_Asub[localRow + innerRow * ${t[1]}][k];`}
          for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
            acc[innerRow][innerCol] = acc[innerRow][innerCol] +
                ACached * BCached[innerCol];
          }
        }
      }
      workgroupBarrier();
    }
    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      let gRow = globalRowStart + localRow + innerRow * ${t[1]};
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        let gCol = globalColStart + localCol + innerCol * ${t[0]};
        mm_write(batch, gRow, gCol, acc[innerRow][innerCol]);
      }
    }
    `:`
let tileRow = i32(localId.y) * rowPerThread;
let tileCol = i32(localId.x) * colPerThread;

let globalRow = i32(globalId.y) * rowPerThread;
let globalCol = i32(globalId.x) * colPerThread;
let globalRowStart = i32(workgroupId.y) * ${l};

let tileRowA = i32(localId.y) * ${f};
let tileColA = i32(localId.x) * ${m};
let tileRowB = i32(localId.y) * ${y};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${f}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${m}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${un(a,i)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${y}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
      let inputRow = tileRowB + innerRow;
      let inputCol = tileCol + innerCol;
      mm_Bsub[inputRow][inputCol] = mm_readB(batch,
        kStart + inputRow,
        globalCol + innerCol${i?", batchIndices":""});
    }
  }
  kStart = kStart + tileInner;
  workgroupBarrier();

  // Compute acc values for a single thread.
  var BCached : array<${r}, colPerThread>;
  for (var k = 0; k < tileInner; k = k + 1) {
    for (var inner = 0; inner < colPerThread; inner = inner + 1) {
      BCached[inner] = mm_Bsub[k][tileCol + inner];
    }

    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      ${tu(a)}
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        acc[innerRow][innerCol] = acc[innerRow][innerCol] + ACached * BCached[innerCol];
      }
    }
  }

  workgroupBarrier();
}

for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
  for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
    mm_write(batch, globalRow + innerRow, globalCol + innerCol,
        acc[innerRow][innerCol]);
  }
}
`;return`
  var<workgroup> mm_Asub : array<array<${r}, ${p}>, ${h}>;
  var<workgroup> mm_Bsub : array<array<${r}, ${d}>, ${n}>;
  const rowPerThread = ${e[1]};
  const colPerThread = ${e[0]};
  const tileInner = ${n};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${s?"0":"i32(globalId.z)"};
    ${i?`let batchIndices = ${i.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${s?`${Math.ceil(o/n)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${s?`i32(globalId.z) * ${o}`:"0"};

    var acc : array<array<${r}, colPerThread>, rowPerThread>;
    ${b}
  }
`},ru=(e,t,r,i,a=!1)=>{let[n,s,o,u]=i,l=O(i[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${n.type.indices}) -> ${at(e,l)} {
      var value = ${at(e,l)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${s.type.indices};
        ${Xi("aIndices",s,s.rank-2,n.rank,"batchIndices")}
        ${s.indicesSet("aIndices",s.rank-2,"u32(row)")}
        ${s.indicesSet("aIndices",s.rank-1,"u32(colIn)")}
        value = ${s.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${n.type.indices}) -> ${at(e,l)} {
      var value = ${at(e,l)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${o.type.indices};
        ${Xi("bIndices",o,o.rank-2,n.rank,"batchIndices")}
        ${o.indicesSet("bIndices",o.rank-2,"u32(row)")}
        ${o.indicesSet("bIndices",o.rank-1,"u32(colIn)")}
        value = ${o.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${at(e,l)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t?`value = value + ${a?"bias[colIn]":`${at(e,l)}(bias[row])`};`:""}
        ${r}
        ${u.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},Sa=(e,t,r,i,a=!1,n)=>{let s=e[0].dims,o=e[1].dims,u=s.slice(0,-2),l=o.slice(0,-2),d=i?i.slice(0,-2):r.slice(0,-2),p=M.size(d),h=s[s.length-2],f=s[s.length-1],m=o[o.length-1],y=f%4===0&&m%4===0,b=h<=8?[4,1,1]:[4,4,1],_=[8,8,1],w=[Math.ceil(m/_[0]/b[0]),Math.ceil(h/_[1]/b[1]),Math.ceil(p/_[2]/b[2])],x=y?4:1,v=[...u,h,f/x],k=v.length,B=[...l,f,m/x],R=B.length,P=[p,h,m/x],F=[{type:6,data:h},{type:6,data:m},{type:6,data:f}];Ur(t,F),F.push(...E(d,v,B));let Z=["rank","rank"],ce=e.length>2;ce&&(F.push(...E(e[2].dims)),Z.push("rank")),F.push(...E(P));let re=ge=>{let K=d.length,Se=_e("batchDims",e[0].dataType,K,1),de=O(e[0].dataType),J=C("a",e[0].dataType,k,x),Me=C("b",e[1].dataType,R,x),ie=V("result",e[0].dataType,P.length,x),Le=[J,Me];if(ce){let nt=a?x:1;Le.push(C("bias",e[2].dataType,e[2].dims.length,nt))}let q=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];Nr(t,q);let j=O(ie.type.tensor),be=Pr(t,ie.type.value,j),De=ru(x,ce,be,[Se,J,Me,ie],a);return`
  ${ge.registerUniforms(q).registerInternalVariables(Se).declareVariables(...Le,ie)}
  ${De}
  ${y?on(b,_,de,Se):ln(b,_,de,Se)}
                   `};return{name:"MatMul",shaderCache:{hint:`${b};${t.activation};${y};${a}`,inputDependencies:Z},getRunData:()=>({outputs:[{dims:n?n(r):r,dataType:e[0].dataType}],dispatchGroup:{x:w[0],y:w[1],z:w[2]},programUniforms:F}),getShaderSource:re}}}),iu,au,mc=I(()=>{le(),yt(),H(),Lr(),an(),fc(),dn(),iu=(e,t,r,i,a=!1,n,s=4,o=4,u=4,l="f32")=>{let d=F=>{switch(F){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${l}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${F} is not supported.`)}},p=F=>{switch(F){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${F} is not supported.`)}},h=e?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,f=e?`
    let coords = vec4<i32>(
      batch,
      row / outWidth,
      row % outWidth,
      col);
    `:`
    let coords = vec4<i32>(
      batch,
      row,
      col / outWidth,
      col % outWidth);
    `,m=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",y=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",b=e?"row":"col",_=e?"col":"row",w=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${b} / outWidth;
    let outCol = ${b} % outWidth;

    let WRow = ${_} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${_} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${_} % inChannels;
    var resData = ${at(s,l)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${m} && xCol >= 0 && xCol < ${y}) {
      ${h}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${d(s)}
    }
    return resData;`,x=e?t&&i?`
    let col = colIn * ${s};
    ${w}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${w}
    }
    return ${at(s,l)}(0.0);`:i&&r?`
    let col = colIn * ${s};
    ${w}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${w}
    }
    return ${at(s,l)}(0.0);`,v=e?i&&r?p(o):`
    let col = colIn * ${o};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${p(o)}
    }
    return ${at(o,l)}(0.0);`:`
    let col = colIn * ${o};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${p(o)}
    }
    return ${at(o,l)}(0.0);`,k=at(u,l),B=at(e?s:o,l),R=at(e?o:s,l),P=Pr(n,k,l);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${B} {
      ${e?x:v}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${R} {
      ${e?v:x}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${k}) {
      let col = colIn * ${u};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${f}
      ${Xo(a)}
      ${P}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},au=(e,t,r,i,a,n,s,o,u)=>{let l=t.format==="NHWC",d=l?e[0].dims[3]:e[0].dims[1],p=r[0],h=l?r[2]:r[3],f=l?r[1]:r[2],m=l?r[3]:r[1],y=l&&(d%4===0||d%3===0)&&m%4===0,b=l?m:h*f,_=l?h*f:m,w=[8,8,1],x=i<=8?[4,1,1]:[4,4,1],v=[Math.ceil(b/w[0]/x[0]),Math.ceil(_/w[1]/x[1]),Math.ceil(p/w[2]/x[2])];Ie("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${v}`);let k=y?l&&d%4!==0?3:4:1,B=w[1]*x[1],R=w[0]*x[0],P=Math.max(w[0]*k,w[1]),F=i%B===0,Z=a%R===0,ce=n%P===0,re=y?[k,4,4]:[1,1,1],ge=[{type:6,data:i},{type:6,data:a},{type:6,data:n},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];Ur(t,ge),ge.push(...E(e[0].dims,e[1].dims));let K=["rank","rank"];s&&(ge.push(...E(e[2].dims)),K.push("rank")),ge.push(...E(r));let Se=de=>{let J=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];Nr(t,J);let Me=y?4:1,ie=O(e[0].dataType),Le=`
      fn setOutputAtIndex(flatIndex : i32, value : ${y?`vec4<${ie}>`:ie}) {
        result[flatIndex] = ${y?`vec4<${ie}>`:ie}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${y?`vec4<${ie}>`:ie}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${y?"/ 4":""}, value);
      }`,q=C("x",e[0].dataType,e[0].dims.length,k===3?1:k),j=C("w",e[1].dataType,e[1].dims.length,Me),be=[q,j],De=V("result",e[0].dataType,r.length,Me);if(s){let nt=C("bias",e[2].dataType,e[2].dims.length,Me);be.push(nt),Le+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${y?`vec4<${ie}>`:ie} {
          return bias[coords.${l?"w":"y"}${y?"/ 4":""}];
        }`}return`
        ${Yo("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${de.registerUniforms(J).declareVariables(...be,De)}
        ${Le}
        ${iu(l,F,Z,ce,s,t,re[0],re[1],re[2],ie)}
        ${y?on(x,w,ie,void 0,!l,P):ln(x,w,ie,void 0,!l,P,!1,void 0,o)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${k};${y};${F};${Z};${ce};${B};${R};${P}`,inputDependencies:K},getRunData:()=>({outputs:[{dims:u?u(r):r,dataType:e[0].dataType}],dispatchGroup:{x:v[0],y:v[1],z:v[2]},programUniforms:ge}),getShaderSource:Se}}}),nu,pn,Yi,su,cn,ou,uu,lu,gc=I(()=>{le(),yt(),ne(),H(),Lr(),an(),nu=e=>{let t=1;for(let r=0;r<e.length;r++)t*=e[r];return t},pn=e=>typeof e=="number"?[e,e,e]:e,Yi=(e,t)=>t<=1?e:e+(e-1)*(t-1),su=(e,t,r,i=1)=>{let a=Yi(t,i);return Math.floor((e[0]*(r-1)-r+a)/2)},cn=(e,t,r,i,a)=>{a==null&&(a=su(e,t[0],i[0]));let n=[0,0,0,r];for(let s=0;s<3;s++)e[s]+2*a>=t[s]&&(n[s]=Math.trunc((e[s]-t[s]+2*a)/i[s]+1));return n},ou=(e,t,r,i,a,n,s,o,u,l)=>{let d,p,h,f;if(e==="VALID"&&(e=0),typeof e=="number"){d={top:e,bottom:e,left:e,right:e,front:e,back:e};let m=cn([t,r,i,1],[o,u,l],1,[a,n,s],e);p=m[0],h=m[1],f=m[2]}else if(Array.isArray(e)){if(!e.every((y,b,_)=>y===_[0]))throw Error(`Unsupported padding parameter: ${e}`);d={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let m=cn([t,r,i,1],[o,u,l],1,[a,n,s],e[0]);p=m[0],h=m[1],f=m[2]}else if(e==="SAME_UPPER"){p=Math.ceil(t/a),h=Math.ceil(r/n),f=Math.ceil(i/s);let m=(p-1)*a+o-t,y=(h-1)*n+u-r,b=(f-1)*s+l-i,_=Math.floor(m/2),w=m-_,x=Math.floor(y/2),v=y-x,k=Math.floor(b/2),B=b-k;d={top:x,bottom:v,left:k,right:B,front:_,back:w}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:d,outDepth:p,outHeight:h,outWidth:f}},uu=(e,t,r,i,a,n=!1,s="channelsLast")=>{let o,u,l,d,p;if(s==="channelsLast")[o,u,l,d,p]=e;else if(s==="channelsFirst")[o,p,u,l,d]=e;else throw new Error(`Unknown dataFormat ${s}`);let[h,,f,m,y]=t,[b,_,w]=pn(r),[x,v,k]=pn(i),B=Yi(f,x),R=Yi(m,v),P=Yi(y,k),{padInfo:F,outDepth:Z,outHeight:ce,outWidth:re}=ou(a,u,l,d,b,_,w,B,R,P),ge=n?h*p:h,K=[0,0,0,0,0];return s==="channelsFirst"?K=[o,ge,Z,ce,re]:s==="channelsLast"&&(K=[o,Z,ce,re,ge]),{batchSize:o,dataFormat:s,inDepth:u,inHeight:l,inWidth:d,inChannels:p,outDepth:Z,outHeight:ce,outWidth:re,outChannels:ge,padInfo:F,strideDepth:b,strideHeight:_,strideWidth:w,filterDepth:f,filterHeight:m,filterWidth:y,effectiveFilterDepth:B,effectiveFilterHeight:R,effectiveFilterWidth:P,dilationDepth:x,dilationHeight:v,dilationWidth:k,inShape:e,outShape:K,filterShape:t}},lu=(e,t,r,i,a,n)=>{let s=n==="channelsLast";s?e[0].dims[3]:e[0].dims[1];let o=[64,1,1],u={x:r.map((b,_)=>_)},l=[Math.ceil(nu(u.x.map(b=>r[b]))/o[0]),1,1];Ie("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${l}`);let d=1,p=M.size(r),h=[{type:12,data:p},{type:12,data:i},{type:12,data:a},{type:12,data:t.strides},{type:12,data:t.dilations}];Ur(t,h),h.push(...E(e[0].dims,e[1].dims));let f=["rank","rank"],m=e.length===3;m&&(h.push(...E(e[2].dims)),f.push("rank")),h.push(...E(r));let y=b=>{let _=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:i.length},{name:"pads",type:"u32",length:a.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];Nr(t,_);let w=1,x=O(e[0].dataType),v=C("x",e[0].dataType,e[0].dims.length,d),k=C("W",e[1].dataType,e[1].dims.length,w),B=[v,k],R=V("result",e[0].dataType,r.length,w),P="";if(m){let ce=C("bias",e[2].dataType,e[2].dims.length,w);B.push(ce),P+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${x} {
          return bias[${s?D("coords",4,5):D("coords",1,5)}];
        }`}let F=at(d,x),Z=Pr(t,F,x);return`
            ${P}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${v.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${k.getByIndices("aIndices")};
            }
          ${b.registerUniforms(_).declareVariables(...B,R)}
          ${b.mainStart()}
          ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${R.offsetToIndices("global_idx")};
              let batch = ${D("coords",0,v.rank)};
              let d2 = ${s?D("coords",v.rank-1,v.rank):D("coords",1,v.rank)};
              let xFRCCorner = vec3<u32>(${s?D("coords",1,v.rank):D("coords",2,v.rank)},
              ${s?D("coords",2,v.rank):D("coords",3,v.rank)},
              ${s?D("coords",3,v.rank):D("coords",4,v.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${s?D("uniforms.x_shape",1,v.rank):D("uniforms.x_shape",2,v.rank)};
              let xShapeZ = ${s?D("uniforms.x_shape",2,v.rank):D("uniforms.x_shape",3,v.rank)};
              let xShapeW = ${s?D("uniforms.x_shape",3,v.rank):D("uniforms.x_shape",4,v.rank)};
              let xShapeU = ${s?D("uniforms.x_shape",4,v.rank):D("uniforms.x_shape",1,v.rank)};
              let inputDepthNearestVec4 = (xShapeU / 4) * 4;
              let inputDepthVec4Remainder = xShapeU % 4;

              var value = 0.0;
              for (var wF = 0u; wF < uniforms.filter_dims[0]; wF++) {
                let xF = xFCorner + wF * uniforms.dilations[0];
                if (xF < 0 || xF >= xShapeY) {
                  continue;
                }

                for (var wR = 0u; wR < uniforms.filter_dims[1]; wR++) {
                  let xR = xRCorner + wR * uniforms.dilations[1];
                  if (xR < 0 || xR >= xShapeZ) {
                    continue;
                  }

                  for (var wC = 0u; wC < uniforms.filter_dims[2]; wC++) {
                    let xC = xCCorner + wC * uniforms.dilations[2];
                    if (xC < 0 || xC >= xShapeW) {
                      continue;
                    }

                    for (var d1 = 0u; d1 < inputDepthNearestVec4; d1 += 4) {
                      ${s?`let xValues = vec4<f32>(
                               getX(batch, xF, xR, xC, d1),
                               getX(batch, xF, xR, xC, d1 + 1),
                               getX(batch, xF, xR, xC, d1 + 2),
                               getX(batch, xF, xR, xC, d1 + 3));
                            `:`let xValues = vec4<f32>(
                               getX(batch, d1, xF, xR, xC),
                               getX(batch, d1 + 1, xF, xR, xC),
                               getX(batch, d1 + 2, xF, xR, xC),
                               getX(batch, d1 + 3, xF, xR, xC));
                            `}
                            let wValues = vec4<f32>(
                              getW(d2, d1, wF, wR, wC),
                              getW(d2, d1 + 1, wF, wR, wC),
                              getW(d2, d1 + 2, wF, wR, wC),
                              getW(d2, d1 + 3, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                    if (inputDepthVec4Remainder == 1) {
                        ${s?`value += getX(batch, xF, xR, xC, inputDepthNearestVec4)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`:`value += getX(batch, inputDepthNearestVec4, xF, xR, xC)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`}
                    } else if (inputDepthVec4Remainder == 2) {
                      ${s?`let xValues = vec2<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1));
                      `:`let xValues = vec2<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC));
                    `}
                    let wValues = vec2<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC));
                      value += dot(xValues, wValues);
                    } else if (inputDepthVec4Remainder == 3) {
                      ${s?`let xValues = vec3<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 2));
                      `:`let xValues = vec3<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 2, xF, xR, xC));
                    `}
                    let wValues = vec3<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 2, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                  }
                }
              }
              ${m?"value = value + getBiasByOutputCoords(coords)":""};
              ${Z}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${s};${d};${m}`,inputDependencies:f},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:l[0],y:l[1],z:l[2]},programUniforms:h}),getShaderSource:y}}}),du,pu,yc=I(()=>{le(),ne(),H(),Lr(),du=(e,t,r,i)=>{let a=e.length>2,n=a?"value += b[output_channel];":"",s=e[0].dims,o=e[1].dims,u=t.format==="NHWC",l=u?r[3]:r[1],d=l/t.group,p=u&&d>=4?A(l):1,h=M.size(r)/p,f=[{type:12,data:h},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:d}];Ur(t,f),f.push(...E(s,[o[0],o[1],o[2],o[3]/p]));let m=a?["rank","rank","rank"]:["rank","rank"];f.push(...E([r[0],r[1],r[2],r[3]/p]));let y=b=>{let _=V("output",e[0].dataType,r.length,p),w=O(_.type.tensor),x=Pr(t,_.type.value,w),v=C("x",e[0].dataType,s.length),k=C("w",e[1].dataType,o.length,p),B=[v,k];a&&B.push(C("b",e[2].dataType,e[2].dims,p));let R=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];Nr(t,R);let P=u?`
      for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[0]; wHeight++) {
        let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

        if (xHeight < 0u || xHeight >= uniforms.x_shape[1]) {
          continue;
        }

        for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[1]; wWidth++) {
          let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
          if (xWidth < 0u || xWidth >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[2]; wInChannel++) {
            let input_channel = in_channel_offset + wInChannel;
            let xVal = ${v.get("batch","xHeight","xWidth","input_channel")};
            let wVal = ${k.get("wHeight","wWidth","wInChannel","output_channel")};
            value += xVal * wVal;
          }
        }
      }
      `:`
      for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[1]; wInChannel++) {
        let input_channel = in_channel_offset + wInChannel;
        for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[2]; wHeight++) {
          let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

          if (xHeight < 0u || xHeight >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[3]; wWidth++) {
            let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
            if (xWidth < 0u || xWidth >= uniforms.x_shape[3]) {
              continue;
            }

            let xVal = ${v.get("batch","input_channel","xHeight","xWidth")};
            let wVal = ${k.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${b.registerUniforms(R).declareVariables(...B,_)}

  ${b.mainStart()}
    ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${_.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${u?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${u?1:2}], outputIndices[${u?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${p} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${u?2:1}];

    var value: ${_.type.value} = ${_.type.value}(0);
    ${P}
    ${n}
    ${x}
    ${_.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${t.cacheKey}_${p}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:f}),getShaderSource:y}},pu=(e,t,r,i)=>{let a=e.length>2,n=A(r[3]),s=A(r[2]),o=M.size(r)/n/s,u=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/n],l=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/n],d=[r[0],r[1],r[2],r[3]/n],p=[{type:12,data:o},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];Ur(t,p),p.push(...E(u,l,d));let h=(s-1)*t.strides[1]+l[1],f=m=>{let y=V("output",e[0].dataType,d.length,n),b=O(y.type.tensor),_=Pr(t,y.type.value,b),w=C("x",e[0].dataType,u.length,n),x=C("w",e[1].dataType,l.length,n),v=[w,x];a&&v.push(C("b",e[2].dataType,e[2].dims,n));let k=a?"value += b[output_channel];":"",B=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return Nr(t,B),`
  ${m.registerUniforms(B).declareVariables(...v,y)}
  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${s}u;
    let col = (index1 % width1) * ${s}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${w.type.value}, ${h}>;
    var values: array<${y.type.value}, ${s}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${l[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${h}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${w.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${w.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${l[1]}; w_width++) {
          let w_val = ${x.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${s}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${s}u; i++) {
      var value = values[i];
      ${k}
      ${_}
      ${y.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${n};${s};${h};${l[0]};${l[1]}`,inputDependencies:a?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:p}),getShaderSource:f}}}),cu,Ta,hu,Ea,hn,fn,fu,mu,mn,wc=I(()=>{ne(),mc(),gc(),dn(),yc(),Lr(),sn(),ot(),cu=(e,t,r,i,a,n)=>{let s=e[0],o=e.slice(n?1:2,n?3:4),u=o.length,l=t[0],d=t.slice(2).map((h,f)=>h+(h-1)*(r[f]-1)),p=o.map((h,f)=>h+i[f]+i[f+u]).map((h,f)=>Math.floor((h-d[f]+a[f])/a[f]));return p.splice(0,0,s),p.splice(n?3:1,0,l),p},Ta=[2,3,1,0],hu=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw new Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],i=e[1].dims[1]*t.group;if(r!==i)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw new Error("invalid bias");let a=e[0].dims.length-2;if(t.dilations.length!==a)throw new Error(`dilations should be ${a}D`);if(t.strides.length!==a)throw new Error(`strides should be ${a}D`);if(t.pads.length!==a*2)throw new Error(`pads should be ${a*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape")},Ea=(e,t)=>{let r=e.kernelShape.slice();r.length<t[1].dims.length-2&&r.push(...Array(t[1].dims.length-2-r.length).fill(0));for(let n=2;n<t[1].dims.length;++n)r[n-2]===0&&(r[n-2]=t[1].dims[n]);let i=e.pads.slice();tr.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,r,i,e.format==="NHWC",e.autoPad);let a=Object.assign({},e);return Object.assign(a,{kernelShape:r,pads:i}),a},hn=e=>{let t=rn(e),r=e.format,i=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],a=e.dilations,n=e.group,s=e.kernel_shape,o=e.pads,u=e.strides,l=e.w_is_const();return{autoPad:i,format:r,dilations:a,group:n,kernelShape:s,pads:o,strides:u,wIsConst:l,...t,cacheKey:`${e.format};${t.activation};`}},fn=(e,t,r,i)=>{let a=r.format==="NHWC",n=cu(t[0].dims,t[1].dims,r.dilations,r.pads,r.strides,a);if(r.group!==1){let B=[t[0]];if(a){let R=e.kernelCustomData.wT??e.compute(He(t[1],Ta),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=R),B.push(R)}else B.push(t[1]);t.length===3&&B.push(t[2]),!e.adapterInfo.isArchitecture("ampere")&&a&&t[1].dims[0]===r.group&&t[1].dims[1]===1&&r.dilations[0]===1&&r.dilations[1]===1?e.compute(pu(B,r,n,i),{inputs:B}):e.compute(du(B,r,n,i),{inputs:B});return}let s=t.length===3,o=t[0].dims[a?1:2],u=t[0].dims[a?2:3],l=t[0].dims[a?3:1],d=t[1].dims[2],p=t[1].dims[3],h=n[a?1:2],f=n[a?2:3],m=n[a?3:1],y=a&&d===o&&p===u&&r.pads[0]===0&&r.pads[1]===0;if(y||d===1&&p===1&&r.dilations[0]===1&&r.dilations[1]===1&&r.strides[0]===1&&r.strides[1]===1&&r.pads[0]===0&&r.pads[1]===0){let B=n[0],R,P,F,Z=[];if(a){let ge=e.kernelCustomData.wT??e.compute(He(t[1],Ta),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];if(r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=ge),y){let K=o*u*l;R=t[0].reshape([1,B,K]),P=ge.reshape([1,K,m]),F=[1,B,m]}else R=t[0].reshape([B,o*u,l]),P=ge.reshape([1,l,m]),F=[B,h*f,m];Z.push(R),Z.push(P)}else R=t[0].reshape([B,l,o*u]),P=t[1].reshape([1,m,l]),F=[B,m,h*f],Z.push(P),Z.push(R);s&&Z.push(t[2]);let ce=F[2],re=Z[0].dims[Z[0].dims.length-1];ce<8&&re<8?e.compute(nn(Z,r,n,F,a,i),{inputs:Z}):e.compute(Sa(Z,r,n,F,a,i),{inputs:Z});return}let b=!0,_=e.kernelCustomData.wT??e.compute(He(t[1],Ta),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=_);let w=[t[0],_];s&&w.push(t[2]);let x=a?h*f:m,v=a?m:h*f,k=d*p*l;e.compute(au(w,r,n,x,v,k,s,b,i),{inputs:w})},fu=(e,t)=>{let r=t.format==="NHWC",i=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&i.push(e.inputs[2]);let a=[0,t.pads[0],0,t.pads[1]],n=[1].concat(t.strides),s=[1].concat(t.dilations),o=[1].concat(t.kernelShape),u=Ea({...t,pads:a,strides:n,dilations:s,kernelShape:o},i);fn(e,i,u,l=>r?[l[0],l[2],l[3]]:[l[0],l[1],l[3]])},mu=(e,t,r)=>{let i=r.format==="NHWC"?"channelsLast":"channelsFirst",a=Ea(r,t),n=r.autoPad==="NOTSET"?r.pads:r.autoPad,s=uu(t[0].dims,t[1].dims,r.strides,r.dilations,n,!1,i);e.compute(lu(t,a,s.outShape,[s.filterDepth,s.filterHeight,s.filterWidth],[s.padInfo.front,s.padInfo.top,s.padInfo.left],i))},mn=(e,t)=>{if(hu(e.inputs,t),e.inputs[0].dims.length===3)fu(e,t);else if(e.inputs[0].dims.length===5)mu(e,e.inputs,t);else{let r=Ea(t,e.inputs);fn(e,e.inputs,r)}}}),gu,_c=I(()=>{le(),yt(),ne(),H(),gu=(e,t,r)=>{let i=e.length>2,a=t.outputShape,n=t.format==="NHWC",s=t.group,o=e[1].dims,u=o[2]/s,l=o[3],d=n?A(u):1,p=n&&l===1&&u>=4,h=p?Math.floor(u/4)*4:Math.floor(u/d)*d,f=u-h,m=n?A(l):1,y=n?l===1?d:m:1,b=M.size(a)/m,_=[Math.ceil(b/64),1,1];Ie("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${_}`);let w=["rank","rank"],x=[t.strides[0],t.strides[1]],v=[t.kernelShape[n?1:2],t.kernelShape[n?2:3]],k=[t.dilations[0],t.dilations[1]],B=[v[0]+(t.dilations[0]<=1?0:(t.kernelShape[n?1:2]-1)*(t.dilations[0]-1)),v[1]+(t.dilations[1]<=1?0:(t.kernelShape[n?2:3]-1)*(t.dilations[1]-1))],R=[B[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),B[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],P=[{type:12,data:b},{type:12,data:x},{type:12,data:v},{type:12,data:k},{type:12,data:B},{type:6,data:R},{type:12,data:h},{type:12,data:u},{type:12,data:l},...E(e[0].dims,e[1].dims)];i&&(P.push(...E(e[2].dims)),w.push("rank")),P.push(...E(a));let F=Z=>{let ce=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:x.length},{name:"filter_dims",type:"u32",length:v.length},{name:"dilations",type:"u32",length:v.length},{name:"effective_filter_dims",type:"u32",length:B.length},{name:"pads",type:"i32",length:R.length},{name:"input_channels_per_group_int",type:"u32"},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],re=O(e[0].dataType),ge=n?1:2,K=n?2:3,Se=n?3:1,de=C("W",e[1].dataType,e[1].dims.length,y),J=C("Dy",e[0].dataType,e[0].dims.length,d),Me=[J,de];i&&Me.push(C("bias",e[2].dataType,[a[Se]].length,m));let ie=V("result",e[0].dataType,a.length,m),Le=()=>{let be="";if(p)d===4?be+=`
        let xValue = ${J.getByOffset("x_offset")};
        let wValue = ${de.getByOffset("w_offset")};
        dotProd = dotProd + dot(xValue, wValue);
        x_offset += 1u;
        w_offset += 1u;`:d===2?be+=`
          dotProd = dotProd + dot(vec4<${re}>(${J.getByOffset("x_offset")}, ${J.getByOffset("x_offset + 1u")}), vec4<${re}>(${de.getByOffset("w_offset")}, ${de.getByOffset("w_offset + 1u")}));
          x_offset += 2u;
          w_offset += 2u;`:d===1&&(be+=`
          dotProd = dotProd + dot(vec4<${re}>(${J.getByOffset("x_offset")}, ${J.getByOffset("x_offset + 1u")}, ${J.getByOffset("x_offset + 2u")}, ${J.getByOffset("x_offset + 3u")}), vec4<${re}>(${de.getByOffset("w_offset")}, ${de.getByOffset("w_offset + 1u")}, ${de.getByOffset("w_offset + 2u")}, ${de.getByOffset("w_offset + 3u")}));
          x_offset += 4u;
          w_offset += 4u;`);else if(be+=`
                  let xValue = ${n?J.getByOffset(`${J.indicesToOffset(`${J.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${d}`):J.get("batch","inputChannel","idyR","idyC")};
        `,d===1)be+=`
          let w_offset = ${de.indicesToOffset(`${de.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
          let wValue = ${de.getByOffset(`w_offset / ${y}`)};
          dotProd = dotProd + xValue * wValue;`;else for(let De=0;De<d;De++)be+=`
            let wValue${De} = ${de.getByOffset(`${de.indicesToOffset(`${de.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${De}, wOutChannel)`)} / ${y}`)};
            dotProd = dotProd + xValue[${De}] * wValue${De};`;return be},q=()=>{if(f===0)return"";if(!p)throw new Error(`packInputAs4 ${p} is not true.`);let be="";if(d===1){be+="dotProd = dotProd";for(let De=0;De<f;De++)be+=`
            + ${J.getByOffset(`x_offset + ${De}`)} * ${de.getByOffset(`w_offset + ${De}`)}`;be+=";"}else if(d===2){if(f!==2)throw new Error(`Invalid inputChannelsRemainder ${f}.`);be+=`
          let xValue = ${J.getByOffset("x_offset")};
          let wValue = ${de.getByOffset("w_offset")};
          dotProd = dotProd + dot(xValue, wValue);`}return be},j=`
            let outputIndices = ${ie.offsetToIndices(`global_idx * ${m}`)};
            let batch = ${ie.indicesGet("outputIndices",0)};
            let d1 = ${ie.indicesGet("outputIndices",Se)};
            let r = ${ie.indicesGet("outputIndices",ge)};
            let c = ${ie.indicesGet("outputIndices",K)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${ie.type.value}(0.0);
            var wR: u32 = 0;
            if (uniforms.dilations.x == 1) {
              // Minimum wR >= 0 that satisfies (dyRCorner + wR) % (uniforms.strides.x) == 0
              wR = u32(((dyRCorner + i32(uniforms.strides.x) - 1) / i32(uniforms.strides.x)) * i32(uniforms.strides.x) - dyRCorner);
            }
            for (; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
              if (wR % uniforms.dilations.x != 0) {
                continue;
              }
              let dyR = (${re}(dyRCorner) + ${re}(wR)) / ${re}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${re}(uniforms.Dy_shape[${ge}]) || fract(dyR) > 0.0 ||
                  wRPerm < 0) {
                continue;
              }
              let idyR: u32 = u32(dyR);
              var wC: u32 = 0;
              if (uniforms.dilations.y == 1) {
                // Minimum wC >= 0 that satisfies (dyCCorner + wC) % (uniforms.strides.y) == 0
                wC = u32(((dyCCorner + i32(uniforms.strides.y) - 1) / i32(uniforms.strides.y)) * i32(uniforms.strides.y) - dyCCorner);
              }
              for (; wC < uniforms.effective_filter_dims.y; wC = wC + 1) {
                if (wC % uniforms.dilations.y != 0) {
                  continue;
                }
                let dyC = (${re}(dyCCorner) + ${re}(wC)) / ${re}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${re}(uniforms.Dy_shape[${K}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                ${p?`
                var x_offset = ${J.indicesToOffset(`${J.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${d};
                var w_offset = ${de.indicesToOffset(`${de.type.indices}(wRPerm, wCPerm, inputChannel, wOutChannel)`)} / ${y};
                  `:""}
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group_int; d2 = d2 + ${p?4:d}) {
                  ${Le()}
                  inputChannel = inputChannel + ${p?4:d};
                }
                ${q()}
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${i?` + bias[d1 / ${m}]`:""};
            ${ie.setByOffset("global_idx","value")};
          `;return`
    ${Z.registerUniforms(ce).declareVariables(...Me,ie)}
      ${Z.mainStart()}
      ${Z.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${j}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};${d}${y}${m}${p}${f}`,inputDependencies:w},getRunData:()=>({dispatchGroup:{x:_[0],y:_[1],z:_[2]},outputs:[{dims:r?r(a):a,dataType:e[0].dataType}],programUniforms:P}),getShaderSource:F}}}),yu,wu,_u,gn,bu,$u,yn,vu,xu,bc=I(()=>{_c(),Lr(),ot(),yu=(e,t,r,i,a,n)=>(e-1)*t+r+(i-1)*a+1-n,wu=(e,t,r,i,a)=>{let n=Math.floor(e/2);t==="SAME_UPPER"?(r[i]=n,r[a]=e-n):t==="SAME_LOWER"&&(r[i]=e-n,r[a]=n)},_u=(e,t,r,i,a,n,s,o,u,l)=>{let d=e.length-2,p=l.length===0;u.length<d&&u.push(...Array(d-u.length).fill(0));let h=e[0],f=t[o?3:1]*a;for(let m=0,y=e.length-d-(o?1:0);m<d;++m,++y){let b=e[y],_=p?b*s[m]:l[m],w=yu(b,s[m],n[m],t[y],r[m],_);wu(w,i,n,m,m+d),p&&l.push(s[m]*(b-1)+u[m]+(t[y]-1)*r[m]+1-n[m]-n[m+d])}l.splice(0,0,h),l.splice(o?3:1,0,f)},gn=(e,t)=>{let r=e.kernelShape.slice();if(e.kernelShape.length===0||e.kernelShape.reduce((p,h)=>p*h,1)===0){r.length=0;for(let p=2;p<t[1].dims.length;++p)r.push(t[1].dims[p])}let i=e.format==="NHWC";r.splice(0,0,t[1].dims[0]),r.splice(i?3:1,0,t[1].dims[1]);let a=e.pads.slice(),n=e.outputShape.slice(),s=e.outputPadding.slice(),o=t[0].dims,u=e.dilations.slice();if(u.reduce((p,h)=>p+h,0)===0){let p=t[0].dims.length-2;u=new Array(p).fill(1)}let l=e.strides.slice();if(l.reduce((p,h)=>p+h,0)===0){let p=t[0].dims.length-2;l=new Array(p).fill(1)}_u(o,r,u,e.autoPad,e.group,a,l,i,s,n);let d=Object.assign({},e);return Object.assign(d,{kernelShape:r,pads:a,outputPadding:s,outputShape:n,dilations:u,strides:l}),d},bu=e=>{let t=rn(e),r=e.format,i=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],a=e.dilations,n=e.group,s=e.kernelShape,o=e.pads,u=e.strides,l=e.wIsConst(),d=e.outputPadding,p=e.outputShape;return{autoPad:i,format:r,dilations:a,group:n,kernelShape:s,outputPadding:d,outputShape:p,pads:o,strides:u,wIsConst:l,...t,cacheKey:`${e.format};${t.activation};`}},$u=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4&&e[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],i=e[1].dims[0];if(r!==i)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let a=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==a))throw new Error("invalid bias");let n=e[0].dims.length-2;if(t.dilations.reduce((s,o)=>s+o,0)>0&&t.dilations.length!==n)throw new Error(`dilations should be ${n}D`);if(t.strides.reduce((s,o)=>s+o,0)>0&&t.strides.length!==n)throw new Error(`strides should be ${n}D`);if(t.pads.reduce((s,o)=>s+o,0)>0&&t.pads.length!==n*2)throw new Error(`pads should be ${n*2}D`);if(t.outputPadding.length!==n&&t.outputPadding.length!==0)throw new Error(`output_padding should be ${n}D`);if(t.kernelShape.reduce((s,o)=>s+o,0)>0&&t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw new Error("invalid output shape")},yn=(e,t,r,i)=>{let a=e.kernelCustomData.wT??e.compute(He(t[1],[2,3,0,1]),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=a);let n=[t[0],a];t.length===3&&n.push(t[2]),e.compute(gu(n,r,i),{inputs:n})},vu=(e,t)=>{let r=t.format==="NHWC",i=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&i.push(e.inputs[2]);let a=t.kernelShape;(a.length===0||a[0]===0)&&(a=[e.inputs[1].dims[2]]);let n=t.dilations;(n.length===0||n[0]===0)&&(n=[1]);let s=t.strides;(s.length===0||s[0]===0)&&(s=[1]);let o=t.pads;o.length===0&&(o=[0,0]),o=[0,o[0],0,o[1]],s=[1].concat(s),n=[1].concat(n),a=[1].concat(a);let u=t.outputPadding;u=[0].concat(u);let l=gn({...t,pads:o,strides:s,dilations:n,kernelShape:a,outputPadding:u},i);yn(e,i,l,d=>r?[d[0],d[2],d[3]]:[d[0],d[1],d[3]])},xu=(e,t)=>{if($u(e.inputs,t),e.inputs[0].dims.length===3)vu(e,t);else{let r=gn(t,e.inputs);yn(e,e.inputs,r)}}}),Su,Tu,Eu,$c=I(()=>{le(),ne(),$(),H(),Su=(e,t,r,i)=>{let a=M.size(t),n=t.length,s=C("input",e,n),o=V("output",e,n),u=r.dataType===6?r.getInt32Array()[0]:Number(r.getBigInt64Array()[0]),l=M.normalizeAxis(u,n),d=p=>{let h=` i32(${s.indicesGet("inputIndices","uniforms.axis")}) `,f=D("uniforms.input_shape","uniforms.axis",n),m=i.reverse?h+(i.exclusive?" + 1":""):"0",y=i.reverse?f:h+(i.exclusive?"":" + 1");return`
                ${p.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(s,o)}
                ${p.mainStart()}
                  ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${o.offsetToIndices("global_idx")};
                  var sum = ${o.type.value}(0);
                  let first : i32 = ${m};
                  let last : i32 = ${y};
                  for (var i : i32 = first; i < last; i++) {
                    ${s.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${s.getByIndices("inputIndices")};
                  }
                  ${o.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:i.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:[{type:12,data:a},{type:12,data:l},...E(t,t)]}),getShaderSource:d}},Tu=(e,t)=>{let r=e.inputs[0].dims,i=e.inputs[0].dataType,a=e.inputs[1];e.compute(Su(i,r,a,t),{inputs:[0]})},Eu=e=>{let t=e.exclusive===1,r=e.reverse===1;return g({exclusive:t,reverse:r})}}),ku,Iu,zu,Cu,Au,vc=I(()=>{le(),ne(),$(),H(),ku=e=>{if(!e||e.length!==1)throw new Error("DepthToSpace requires 1 input.");if(e[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},Iu=(e,t,r,i)=>{let a=[];a.push(`fn perm(i: ${i.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`);for(let n=0;n<t;++n)a.push(r.indicesSet("a",e[n],`i[${n}]`));return a.push("return a;}"),a.join(`
`)},zu=(e,t)=>{let r,i,a,n,s,o,u=t.format==="NHWC",l=t.blocksize,d=t.mode==="DCR";u?([r,i,a,n]=e.dims,s=d?[r,i,a,l,l,n/l**2]:[r,i,a,n/l**2,l,l],o=d?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([r,i,a,n]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],s=d?[r,l,l,n/l**2,i,a]:[r,n/l**2,l,l,i,a],o=d?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let p=e.reshape(s),h=p.dims.length,f=e.dataType,m=C("a",f,h),y=V("output",f,h),b=_=>`
  ${_.registerUniform("output_size","u32").declareVariables(m,y)}

  ${Iu(o,h,m,y)}

  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${y.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${y.setByOffset("global_idx",m.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:["rank"]},getRunData:_=>{let w=u?[r,i*l,a*l,n/l**2]:[r,n/l**2,i*l,a*l],x=M.size(w),v=p.dims,k=M.sortBasedOnPerm(v,o);return{outputs:[{dims:w,dataType:_[0].dataType}],dispatchGroup:{x:Math.ceil(x/64)},programUniforms:[{type:12,data:x},...E(v,k)]}},getShaderSource:b}},Cu=(e,t)=>{ku(e.inputs),e.compute(zu(e.inputs[0],t))},Au=e=>g({blocksize:e.blocksize,mode:e.mode,format:e.format})}),ka,Ji,wn,Ou,Ru,Bu,Mu,_n,Du,Pu,Uu,xc=I(()=>{le(),ne(),$(),H(),ka="[a-zA-Z]|\\.\\.\\.",Ji="("+ka+")+",wn="^"+Ji+"$",Ou="("+Ji+",)*"+Ji,Ru="^"+Ou+"$",Bu=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,t){let r=this.symbolToIndices.get(e);r===void 0?r=[t]:r.push(t),this.symbolToIndices.set(e,r)}},Mu=class{constructor(e,t){this.equation=t,this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[r,i]=t.includes("->")?t.split("->",2):[t,""];if(!r.match(RegExp(Ru)))throw new Error("Invalid LHS term");if(r.split(",").forEach((a,n)=>{let s=e[n].dims.slice();if(!a.match(RegExp(wn)))throw new Error("Invalid LHS term");let o=this.processTerm(a,!0,s,n);this.lhs.push(o)}),i==="")i+=[...this.symbolToInfo.entries()].filter(([a,n])=>n.count===1||a==="...").map(([a])=>a).join("");else if(!i.match(RegExp(Ji)))throw new Error("Invalid RHS");i.match(RegExp(ka,"g"))?.forEach(a=>{if(a==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let n=this.symbolToInfo.get(a);if(n===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(n.dimValue)}}),this.rhs=this.processTerm(i,!1,this.outputDims)}addSymbol(e,t,r){let i=this.symbolToInfo.get(e);if(i!==void 0){if(i.dimValue!==t&&i.count!==1)throw new Error("Dimension mismatch");i.count++,i.inputIndices.push(r)}else i={count:1,dimValue:t,inputIndices:[r]};this.symbolToInfo.set(e,i)}processTerm(e,t,r,i=-1){let a=r.length,n=!1,s=[],o=0;if(!e.match(RegExp(wn))&&!t&&e!=="")throw new Error("Invalid LHS term");let u=e.match(RegExp(ka,"g")),l=new Bu(i);return u?.forEach((d,p)=>{if(d==="..."){if(n)throw new Error("Only one ellipsis is allowed per input term");n=!0;let h=a-u.length+1;if(h<0)throw new Error("Ellipsis out of bounds");if(s=r.slice(o,o+h),this.hasEllipsis){if(this.ellipsisDims.length!==s.length||this.ellipsisDims.toString()!==s.toString())throw new Error("Ellipsis dimensions mismatch")}else if(t)this.hasEllipsis=!0,this.ellipsisDims=s;else throw new Error("Ellipsis must be specified in the LHS");for(let f=0;f<s.length;f++){let m=String.fromCharCode(48+f);l.addSymbol(m,p+f),this.addSymbol(m,r[o++],i)}}else l.addSymbol(d,p+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(d,r[o++],i)}),l}},_n=e=>e+"_max",Du=(e,t,r,i)=>{let a=e.map(l=>l.length).map((l,d)=>C(`input${d}`,t,l)),n=M.size(i),s=V("output",t,i.length),o=[...r.symbolToInfo.keys()].filter(l=>!r.rhs.symbolToIndices.has(l)),u=l=>{let d=[],p="var prod = 1.0;",h="var sum = 0.0;",f="sum += prod;",m=[],y=[],b=[],_=[],w=r.symbolToInfo.size===r.rhs.symbolToIndices.size;r.symbolToInfo.forEach((v,k)=>{if(r.rhs.symbolToIndices.has(k)){let B=r.rhs.symbolToIndices.get(k)?.[0];B!==void 0&&r.lhs.forEach((R,P)=>{if(v.inputIndices.includes(P)){let F=R.symbolToIndices.get(k);if(F===void 0)throw new Error("Invalid symbol error");F.forEach(Z=>{d.push(`${a[P].indicesSet(`input${P}Indices`,Z,s.indicesGet("outputIndices",B))}`)})}})}else r.lhs.forEach((B,R)=>{if(v.inputIndices.includes(R)){let P=B.symbolToIndices.get(k);if(P===void 0)throw new Error("Invalid symbol error");P.forEach(F=>{m.push(`${a[R].indicesSet(`input${R}Indices`,F,`${k}`)}`)}),_.push(`prod *= ${a[R].getByIndices(`input${R}Indices`)};`)}}),y.push(`for(var ${k}: u32 = 0; ${k} < uniforms.${_n(k)}; ${k}++) {`),b.push("}")});let x=w?[...d,`let sum = ${a.map((v,k)=>v.getByIndices(`input${k}Indices`)).join(" * ")};`]:[...d,h,...y,...m,p,..._,f,...b];return`
            ${l.registerUniforms(o.map(v=>({name:`${_n(v)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...a,s)}

            ${l.mainStart()}
            ${l.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${s.offsetToIndices("global_idx")};
            ${a.map((v,k)=>`var input${k}Indices: ${a[k].type.indices};`).join(`
`)}
            ${x.join(`
`)};
            ${s.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:r.equation,inputDependencies:e.map(()=>"rank")},getRunData:()=>{let l=o.filter(p=>r.symbolToInfo.has(p)).map(p=>({type:12,data:r.symbolToInfo.get(p)?.dimValue||0}));l.push({type:12,data:n});let d=e.map((p,h)=>[...E(p)]).reduce((p,h)=>p.concat(h),l);return d.push(...E(i)),{outputs:[{dims:i,dataType:t}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:d}},getShaderSource:u}},Pu=(e,t)=>{let r=new Mu(e.inputs,t.equation),i=r.outputDims,a=e.inputs.map((n,s)=>n.dims);e.compute(Du(a,e.inputs[0].dataType,r,i))},Uu=e=>{let t=e.equation.replace(/\s+/g,"");return g({equation:t})}}),Nu,bn,Lu,qu,Vu,Sc=I(()=>{le(),ne(),H(),Nu=e=>{if(!e||e.length!==2)throw new Error("Expand requires 2 input.");let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),i=r.length<t.length?0:r.length-t.length,a=t.length<r.length?0:t.length-r.length;for(;i<r.length&&a<t.length;++i,++a)if(r[i]!==t[a]&&r[i]!==1&&t[a]!==1)throw new Error("Expand requires shape to be broadcastable to input")},bn=(e,t)=>{let r=e.length-t.length,i=[];for(let a=0;a<r;++a)i.push(e[a]);for(let a=0;a<t.length;++a)i.push(t[a]===1?e[a+r]:t[a]);return i},Lu=(e,t)=>e.length>t.length?bn(e,t):bn(t,e),qu=e=>{let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),i=Lu(t,r),a=e[0].dataType,n=a===9||M.size(t)===1,s=a===9||t.length>0&&t[t.length-1]%4===0?4:1,o=n||i.length>0&&i[i.length-1]%4===0?4:1,u=Math.ceil(M.size(i)/o),l=p=>{let h=C("input",a,t.length,s),f=V("output",a,i.length,o),m;if(a===9){let y=(b,_,w="")=>`
          let outputIndices${_} = ${f.offsetToIndices(`outputOffset + ${_}u`)};
          let offset${_} = ${h.broadcastedIndicesToOffset(`outputIndices${_}`,f)};
          let index${_} = offset${_} / 4u;
          let component${_} = offset${_} % 4u;
          ${b}[${_}] = ${w}(${h.getByOffset(`index${_}`)}[component${_}]);
        `;m=`
        let outputOffset = global_idx * ${o};
        var data = vec4<u32>(0);
        ${y("data",0,"u32")}
        ${y("data",1,"u32")}
        ${y("data",2,"u32")}
        ${y("data",3,"u32")}
        ${f.setByOffset("global_idx","data")}
      }`}else m=`
        let outputIndices = ${f.offsetToIndices(`global_idx * ${o}`)};
        let inputOffset = ${h.broadcastedIndicesToOffset("outputIndices",f)};
        let data = ${f.type.value}(${h.getByOffset(`inputOffset / ${s}`)});
        ${f.setByOffset("global_idx","data")}
      }`;return`
    ${p.registerUniform("vec_size","u32").declareVariables(h,f)}
    ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${m}`},d=[{type:12,data:u},...E(t,i)];return{name:"Expand",shaderCache:{hint:`${i.length};${s}${o}`,inputDependencies:["rank"]},getShaderSource:l,getRunData:()=>({outputs:[{dims:i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:d})}},Vu=e=>{Nu(e.inputs),e.compute(qu(e.inputs),{inputs:[0]})}}),Fu,Wu,Tc=I(()=>{le(),ne(),H(),tn(),Fu=e=>{let t=e[0].dataType,r=M.size(e[0].dims),i=M.size(e[1].dims),a=i%4===0,n=s=>{let o=C("x",t,[1],4),u=C("bias",t,[1],4),l=V("y",t,[1],4),d=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],p=f=>`
      let bias${f}_offset: u32 = (global_idx * 4 + ${f}) % uniforms.bias_size;
      let bias${f} = ${u.getByOffset(`bias${f}_offset / 4`)}[bias${f}_offset % 4];`,h=a?`
      let bias = ${u.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${p(0)}${p(1)}${p(2)}${p(3)}
      let bias = ${o.type.value}(bias0, bias1, bias2, bias3);`;return`${s.registerUniforms(d).declareVariables(o,u,l)}

    ${Ja(z(t))}

    ${s.mainStart(S)}
      ${s.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${o.getByOffset("global_idx")};
      ${h}
      let x_in = x + bias;
      ${l.setByOffset("global_idx",en("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${a}`,inputDependencies:["type","type"]},getShaderSource:n,getRunData:s=>({outputs:[{dims:s[0].dims,dataType:s[0].dataType}],programUniforms:[{type:12,data:Math.ceil(r/4)},{type:12,data:i}],dispatchGroup:{x:Math.ceil(r/S/4)}})}},Wu=e=>{e.inputs.length<2||M.size(e.inputs[1].dims)===0?So(e):e.compute(Fu(e.inputs))}}),Gu,ju,Hu,Ku,Ec=I(()=>{le(),ne(),$(),H(),Gu=e=>{if(!e||e.length!==2)throw new Error("Gather requires 2 inputs.")},ju=(e,t)=>{let r=e[0].dims,i=e[1].dims,a=r.length,n=M.normalizeAxis(t.axis,a),s=r.slice(0);s.splice(n,1,...i);let o=r[n],u=e[0].dataType===9?4:1,l=Math.ceil(M.size(s)/u),d=[{type:12,data:l},{type:6,data:o},{type:12,data:n},...E(e[0].dims,e[1].dims,s)],p=h=>{let f=C("data",e[0].dataType,e[0].dims.length,u),m=C("inputIndices",e[1].dataType,e[1].dims.length),y=V("output",e[0].dataType,s.length,u),b=w=>{let x=i.length,v=`var indicesIndices${w}  = ${m.type.indices}(0);`;for(let k=0;k<x;k++)v+=`${x>1?`indicesIndices${w}[${k}]`:`indicesIndices${w}`} = ${s.length>1?`outputIndices${w}[uniforms.axis + ${k}]`:`outputIndices${w}`};`;v+=`
          var idx${w} = ${m.getByIndices(`indicesIndices${w}`)};
          if (idx${w} < 0) {
            idx${w} = idx${w} + uniforms.axisDimLimit;
          }
          var dataIndices${w} : ${f.type.indices};
        `;for(let k=0,B=0;k<a;k++)k===n?(v+=`${a>1?`dataIndices${w}[${k}]`:`dataIndices${w}`} = u32(idx${w});`,B+=x):(v+=`${a>1?`dataIndices${w}[${k}]`:`dataIndices${w}`} = ${s.length>1?`outputIndices${w}[${B}]`:`outputIndices${w}`};`,B++);return v},_;if(e[0].dataType===9){let w=(x,v,k="")=>`
          let outputIndices${v} = ${y.offsetToIndices(`outputOffset + ${v}u`)};
          ${b(v)};
          let offset${v} = ${f.indicesToOffset(`dataIndices${v}`)};
          let index${v} = offset${v} / 4u;
          let component${v} = offset${v} % 4u;
          ${x}[${v}] = ${k}(${f.getByOffset(`index${v}`)}[component${v}]);
        `;_=`
        let outputOffset = global_idx * ${u};
        var value = vec4<u32>(0);
        ${w("value",0,"u32")}
        ${w("value",1,"u32")}
        ${w("value",2,"u32")}
        ${w("value",3,"u32")}
        ${y.setByOffset("global_idx","value")}
      `}else _=`
      let outputIndices = ${y.offsetToIndices("global_idx")};
      ${b("")};
      let value = ${f.getByIndices("dataIndices")};
      ${y.setByOffset("global_idx","value")};
      `;return`
      ${h.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(f,m,y)}
      ${h.mainStart()}
        ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${_}
      }`};return{name:"Gather",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:s,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:d}),getShaderSource:p}},Hu=e=>g({axis:e.axis}),Ku=(e,t)=>{let r=e.inputs;Gu(r),e.compute(ju(e.inputs,t))}}),Zu,Qu,Xu,kc=I(()=>{le(),ne(),H(),Zu=(e,t,r,i,a,n,s,o,u)=>{let l=[{type:12,data:n},{type:12,data:i},{type:12,data:a},{type:12,data:r},{type:12,data:s},{type:12,data:o},{type:12,data:u}],d=[n];l.push(...E(t.dims,d));let p=h=>{let f=C("indices_data",t.dataType,t.dims.length),m=V("input_slice_offsets_data",12,1,1),y=[f,m],b=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:a.length},{name:"sizes_from_slice_dims_data",type:"u32",length:r.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${h.registerUniforms(b).declareVariables(...y)}
  ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let batch_idx = global_idx / uniforms.num_slices_per_batch;
    let base_offset = batch_idx * uniforms.input_batch_stride;

    let slice_indices_base_offset = global_idx * uniforms.num_slice_dims;
    var relative_slice_offset = 0;
    for (var dim_idx = 0u; dim_idx < uniforms.num_slice_dims; dim_idx ++) {
      var index = i32(indices_data[dim_idx + slice_indices_base_offset].x);
      let input_dim_idx = uniforms.batch_dims + dim_idx;
      if (index < 0) {
        ${a.length===1?"index += i32(uniforms.input_dims);":"index += i32(uniforms.input_dims[input_dim_idx]);"}
      }
      ${r.length===1?"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data);":"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data[dim_idx]);"}
    }

    input_slice_offsets_data[global_idx] =  base_offset + u32(relative_slice_offset);
  }`};return e.compute({name:"computeSliceOffsets",shaderCache:{hint:`${a.length}_${r.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:d,dataType:e.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:l}),getShaderSource:p},{inputs:[t],outputs:[-1]})[0]},Qu=(e,t)=>{let r=e.inputs,i=r[0].dims,a=r[0].dataType,n=r[1].dims,s=n[n.length-1],o=M.sizeToDimension(n,n.length-1),u=M.sizeFromDimension(i,t.batchDims+s),l=M.sizeToDimension(i,t.batchDims),d=M.sizeFromDimension(i,t.batchDims),p=o/l,h=new Array(s),f=u;for(let v=0;v<s;++v)h[s-1-v]=f,f*=i[t.batchDims+s-1-v];let m=Zu(e,r[1],h,t.batchDims,i,o,p,d,s),y=t.batchDims+s;if(y>i.length)throw new Error("last dimension of indices must not be larger than rank of input tensor");let b=n.slice(0,-1).concat(i.slice(y)),_=M.size(b),w=[{type:12,data:_},{type:12,data:u},...E(r[0].dims,m.dims,b)],x=v=>{let k=C("data",r[0].dataType,r[0].dims.length),B=C("slice_offsets",12,m.dims.length),R=V("output",r[0].dataType,b.length);return`
          ${v.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(k,B,R)}
            ${v.mainStart()}
            ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`};e.compute({name:"GatherND",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:b,dataType:a}],dispatchGroup:{x:Math.ceil(_/64)},programUniforms:w}),getShaderSource:x},{inputs:[r[0],m]})},Xu=e=>({batchDims:e.batch_dims,cacheKey:""})}),Yu,Ju,el,tl,Ic=I(()=>{le(),ne(),$(),H(),Yu=(e,t)=>{if(e.length<3||e.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let r=M.normalizeAxis(t.quantizeAxis,e[0].dims.length),i=t.blockSize,a=e[0],n=e[2],s=e.length===4?e[3]:void 0;if(n.dims.length!==a.dims.length||!a.dims.map((o,u)=>u===r?Math.ceil(o/i)===n.dims[u]:o===n.dims[u]).reduce((o,u)=>o&&u,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(s){if(s.dataType!==a.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(s.dims.length!==n.dims.length||!s.dims.map((o,u)=>o===n.dims[u]).reduce((o,u)=>o&&u,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},Ju=(e,t)=>{let r=e[0].dims,i=e[1].dims,a=r.length,n=M.normalizeAxis(t.gatherAxis,a),s=M.normalizeAxis(t.quantizeAxis,a),o=r.slice(0);o.splice(n,1,...i);let u=M.size(o),l=e[2].dataType,d=e[0].dataType===22,p=[{type:12,data:u},{type:12,data:s},{type:12,data:n},{type:12,data:t.blockSize},...E(...e.map((f,m)=>f.dims),o)],h=f=>{let m=C("data",e[0].dataType,e[0].dims.length),y=C("inputIndices",e[1].dataType,e[1].dims.length),b=C("scales",e[2].dataType,e[2].dims.length),_=e.length>3?C("zeroPoint",e[3].dataType,e[3].dims.length):void 0,w=V("output",l,o.length),x=[m,y,b];_&&x.push(_);let v=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${f.registerUniforms(v).declareVariables(...x,w)}
        ${f.mainStart()}
        let output_indices = ${w.offsetToIndices("global_idx")};
        var indices_indices = ${y.type.indices}(0);
        ${i.length>1?`
          for (var i: u32 = 0; i < ${i.length}; i++) {
            let index = ${w.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${y.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${w.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${m.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${w.indicesGet("output_indices","i")};
          ${m.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${y.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${r[n]};
        }
        ${m.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${o.length}; i++) {
          let index = ${w.indicesGet("output_indices",`i + ${i.length} - 1`)};
          ${m.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${m.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${m.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${d?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${b.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${b.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${b.getByIndices("scale_indices")};
        ${_?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${_.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${_.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${d?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0"};
        let dequantized_data = ${z(l)}(quantized_data - zero_point) * scale;
        ${w.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${t.cacheKey};${e.filter((f,m)=>m!==1).map(f=>f.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:e.length},(f,m)=>"rank")},getRunData:()=>({outputs:[{dims:o,dataType:l}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:p}),getShaderSource:h}},el=(e,t)=>{let r=e.inputs;Yu(r,t),e.compute(Ju(e.inputs,t))},tl=e=>g({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})}),rl,il,al,nl,zc=I(()=>{le(),ne(),$(),H(),rl=e=>{if(!e||e.length!==2)throw new Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},il=(e,t)=>{let r=e[0].dims,i=e[0].dataType,a=r.length,n=e[1].dims,s=e[1].dataType,o=M.normalizeAxis(t.axis,a),u=r[o],l=n.slice(0),d=M.size(l),p=C("input",i,a),h=C("indicesInput",s,n.length),f=V("output",i,l.length),m=[{type:12,data:d},{type:6,data:u},{type:12,data:o}];return m.push(...E(r,n,l)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:l,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:m}),getShaderSource:y=>`
      ${y.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(p,h,f)}
      ${y.mainStart()}
      ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${f.offsetToIndices("global_idx")};

      var idx = ${h.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${p.type.indices}(outputIndices);
      ${p.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${p.getByIndices("inputIndices")};

      ${f.setByOffset("global_idx","value")};
  }`}},al=e=>g({axis:e.axis}),nl=(e,t)=>{let r=e.inputs;rl(r),e.compute(il(e.inputs,t))}}),sl,ol,ul,ll,Cc=I(()=>{le(),ne(),H(),sl=e=>{if(!e)throw new Error("Input is missing");if(e.length<2||e.length>3)throw new Error("Invaid input number.");if(e.length===3&&e[2].dims.length>2)throw new Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("Input types are mismatched")},ol=(e,t)=>{let r=e[0].dims.slice(),i=e[1].dims.slice(),[a,n,s]=Jr.getShapeOfGemmResult(r,t.transA,i,t.transB,e.length===3?e[2].dims:void 0),o=[a,n];if(!o)throw new Error("Can't use gemm on the given tensors");let u=16,l=Math.ceil(n/u),d=Math.ceil(a/u);M.size(o);let p=[{type:12,data:l},{type:12,data:a},{type:12,data:n},{type:12,data:s},{type:1,data:t.alpha},{type:1,data:t.beta}],h=["type","type"];e.length===3&&(p.push(...E(e[2].dims)),h.push("rank")),p.push(...E(o));let f=m=>{let y=C("a",e[0].dataType,e[0].dims),b=C("b",e[1].dataType,e[1].dims),_=null,w=[y,b];e.length===3&&(_=C("c",e[2].dataType,e[2].dims.length),w.push(_));let x=V("output",e[0].dataType,o.length);w.push(x);let v=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],k="",B="";t.transA&&t.transB?(B=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${y.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${b.type.value}(0);
      }
      `,k="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):t.transA&&!t.transB?(B=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${y.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${b.type.value}(0);
      }
      `,k="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!t.transA&&t.transB?(B=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${y.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${b.type.value}(0);
      }
      `,k="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):!t.transA&&!t.transB&&(B=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${y.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${b.type.value}(0);
      }
      `,k="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let R=t.alpha===1?"":"value *= uniforms.alpha;";return`
  ${m.registerUniforms(v).declareVariables(...w)}
  var<workgroup> tile_a: array<array<${y.type.storage}, ${u}>, ${u}>;
  var<workgroup> tile_b: array<array<${b.type.storage}, ${u}>, ${u}>;
  ${m.mainStart([u,u,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${u};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${u};
    let num_tiles = (uniforms.K - 1) / ${u} + 1;
    var k_start = 0u;
    var value = ${x.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${B}
      k_start = k_start + ${u};
      workgroupBarrier();

      for (var k: u32 = 0u; k < ${u}; k++) {
        ${k}
      }
      workgroupBarrier();
    }

    ${R}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${_!=null?`let cOffset = ${_.broadcastedIndicesToOffset("vec2(m, n)",x)}; value += ${x.type.value}(uniforms.beta) * ${_.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return{name:"GemmShared",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:h},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:l*d},programUniforms:p}),getShaderSource:f}},ul=e=>{let t=e.transA,r=e.transB,i=e.alpha,a=e.beta;return{transA:t,transB:r,alpha:i,beta:a,cacheKey:`${e.transA};${e.transB};${e.alpha===1}`}},ll=(e,t)=>{sl(e.inputs),e.compute(ol(e.inputs,t))}}),Vt,Qt,qr,Vr,dl,pl,cl,hl,fl,ml,gl,yl,wl,_l,Ac=I(()=>{le(),ne(),$(),H(),[Vt,Qt,qr,Vr]=[0,1,2,3],dl=e=>{if(e[0].dims.length!==4)throw new Error("only 4-D tensor is supported.");if(e[0].dims.length!==e[1].dims.length)throw new Error("input dimensions must be equal to grid dimensions");if(e[0].dims.length-2!==e[1].dims[e[1].dims.length-1])throw new Error(`last dimension of grid must be equal to ${e[0].dims.length-2}`);if(e[0].dims[0]!==e[1].dims[0])throw new Error("grid batch size must match input batch size")},pl=`
  fn gs_get_cubic_coeffs(x: f32) -> vec4<f32> {
    let cubic_alpha = -0.75f;
    let x_abs = abs(x);
    var coeffs: vec4<f32>;
    coeffs[0] = (((cubic_alpha * (x_abs + 1) - 5 * cubic_alpha) * (x_abs + 1) + 8 * cubic_alpha) * (x_abs + 1) - 4 * cubic_alpha);
    coeffs[1] = (((cubic_alpha + 2) * x_abs - (cubic_alpha + 3)) * x_abs * x_abs + 1);
    coeffs[2] = (((cubic_alpha + 2) * (1 - x_abs) - (cubic_alpha + 3)) * (1 - x_abs) * (1 - x_abs) + 1);
    coeffs[3] = (((cubic_alpha * (2 - x_abs) - 5 * cubic_alpha) * (2 - x_abs) + 8 * cubic_alpha) * (2 - x_abs) - 4 * cubic_alpha);
    return coeffs;
  }
`,cl=e=>`
  fn gs_bicubic_interpolate(p: mat4x4<${e}>, x: f32, y: f32) -> ${e} {
    var v: vec4<f32>;
    var coeffs = gs_get_cubic_coeffs(x);
    for (var i = 0; i < 4; i++) {
      v[i] = coeffs[0] * p[i][0] + coeffs[1] * p[i][1] + coeffs[2] * p[i][2] + coeffs[3] * p[i][3];
    }
    coeffs = gs_get_cubic_coeffs(y);
    let pixel = ${e}(coeffs[0] * v[0] + coeffs[1] * v[1] + coeffs[2] * v[2] + coeffs[3] * v[3]);
    return pixel;
  }
`,hl=e=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${e.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,fl=e=>`
  ${e.paddingMode==="reflection"?`
      fn gs_reflect(x: i32, x_min: f32, x_max: f32) -> u32 {
        var dx = 0.0;
        var fx = f32(x);
        let range = x_max - x_min;
        if (fx < x_min) {
          dx = x_min - fx;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_min + r;
          } else {
            fx = x_max - r;
          }
        } else if (fx > x_max) {
          dx = fx - x_max;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_max - r;
          } else {
            fx = x_min + r;
          }
        }
        return u32(fx);
      }`:""}
`,ml=(e,t,r)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${t} {
     var pixel = ${t}(0);
     var indices = vec4<u32>(0);
     indices[${Vt}] = batch;
     indices[${Qt}] = channel;`+(()=>{switch(r.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${qr}] = u32(r);
            indices[${Vr}] = u32(c);
          } else {
            return ${t}(0);
          }
        `;case"border":return`
          indices[${qr}] = u32(clamp(r, 0, H - 1));
          indices[${Vr}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${qr}] = gs_reflect(r, border[1], border[3]);
          indices[${Vr}] = gs_reflect(c, border[0], border[2]);
        `;default:throw new Error(`padding mode ${r.paddingMode} is not supported`)}})()+`
    return ${e.getByIndices("indices")};
  }
`,gl=(e,t,r)=>(()=>{switch(r.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${Vt}], indices[${Qt}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${Vt}], indices[${Qt}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${Vt}], indices[${Qt}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${Vt}], indices[${Qt}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${Vt}], indices[${Qt}], border);

          let dx2 = ${t}(f32(x2) - x);
          let dx1 = ${t}(x - f32(x1));
          let dy2 = ${t}(f32(y2) - y);
          let dy1 = ${t}(y - f32(y1));
          let result = dy2 * (dx2 * p11 + dx1 * p12) + dy1 * (dx2 * p21 + dx1 * p22);
        `;case"bicubic":return`
          let x0 = i32(floor(x)) - 1;
          let y0 = i32(floor(y)) - 1;
          var p: mat4x4<${t}>;
          for (var h = 0; h < 4; h++) {
            for (var w = 0; w < 4; w++) {
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${Vt}], indices[${Qt}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw new Error(`mode ${r.mode} is not supported`)}})()+`${e.setByOffset("global_idx","result")}`,yl=(e,t)=>{let r=C("x",e[0].dataType,e[0].dims.length),i=[e[1].dims[0],e[1].dims[1],e[1].dims[2]],a=C("grid",e[1].dataType,i.length,2),n=[e[0].dims[0],e[0].dims[1],e[1].dims[1],e[1].dims[2]];t.format==="NHWC"&&(n=[e[0].dims[0],e[1].dims[1],e[1].dims[2],e[0].dims[3]],[Vt,Qt,qr,Vr]=[0,3,1,2]);let s=V("output",e[0].dataType,n.length),o=r.type.value,u=M.size(n),l=[{type:12,data:u},...E(e[0].dims,i,n)],d=p=>`
  ${p.registerUniform("output_size","u32").declareVariables(r,a,s)}
  ${pl}
  ${cl(o)}
  ${hl(t)}
  ${fl(t)}
  ${ml(r,o,t)}

  ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${qr}]);
      let W_in = i32(uniforms.x_shape[${Vr}]);

      ${t.alignCorners===0?`
      let x_min = -0.5;
      let x_max = f32(W_in) - 0.5;
      let y_min = -0.5;
      let y_max = f32(H_in) - 0.5;
      `:`
      let x_min = 0.0;
      let x_max = f32(W_in) - 1.0;
      let y_min = 0.0;
      let y_max = f32(H_in) - 1.0;
      `};
      let border = vec4<f32>(x_min, y_min, x_max, y_max);

      let indices = ${s.offsetToIndices("global_idx")};
      var grid_indices = vec3<u32>(indices[${Vt}], indices[${qr}], indices[${Vr}]);
      let nxy = ${a.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${gl(s,o,t)}
  }`;return{name:"GridSample",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:["type","type"]},getRunData:p=>{let h=M.size(n);return{outputs:[{dims:n,dataType:p[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:l}},getShaderSource:d}},wl=(e,t)=>{dl(e.inputs),e.compute(yl(e.inputs,t))},_l=e=>g({alignCorners:e.align_corners,mode:e.mode,paddingMode:e.padding_mode,format:e.format})}),pt,bl,$l,$n,vl,ea,xl,Sl=I(()=>{le(),ne(),$(),ii(),Xa(),H(),ot(),pt=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,bl=(e,t)=>{let r=e[0],i=pt(e,1),a=pt(e,2),n=pt(e,3),s=pt(e,4),o=pt(e,5),u=pt(e,6),l=pt(e,7);if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let d=r.dims[0],p=r.dims[1],h=r.dims.length===3?r.dims[2]:t.numHeads*r.dims[4],f=p,m=0,y=0,b=Math.floor(h/t.numHeads);if(u&&l&&M.size(u.dims)&&M.size(l.dims)){if(u.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(u.dims[0]!==d||u.dims[1]!==t.numHeads||u.dims[3]!==b)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(l.dims[0]!==d||l.dims[1]!==t.numHeads||l.dims[3]!==b)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(u.dims[2]!==l.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(l.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');m=u.dims[2],y=u.dims[2]}else if(u&&M.size(u.dims)||l&&M.size(l.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let _;if(i&&M.size(i.dims)>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(i.dims.length<3||i.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==i.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(i.dims.length===3){if(i.dims[2]!==r.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');_=2,f=i.dims[1]}else if(i.dims.length===5){if(i.dims[2]!==t.numHeads||i.dims[3]!==2||i.dims[4]!==b)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(a)throw new Error('Expect "value" be none when "key" has packed kv format.');_=5,f=i.dims[1]}else{if(i.dims[1]!==t.numHeads||i.dims[3]!==b)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');_=0,f=i.dims[2]}}else{if(r.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(r.dims[2]!==t.numHeads||r.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');_=3}if(n&&M.size(n.dims)>0){if(n.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(i&&i.dims.length===5&&i.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let w=m+f,x=0;if(s&&M.size(s.dims)>0){x=8;let R=s.dims;throw R.length===1?R[0]===d?x=1:R[0]===3*d+2&&(x=3):R.length===2&&R[0]===d&&R[1]===w&&(x=5),x===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let v=!1,k=h;if(a&&M.size(a.dims)>0){if(a.dims.length!==3&&a.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==a.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(a.dims.length===3){if(f!==a.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');k=a.dims[2]}else{if(f!==a.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');k=a.dims[1]*a.dims[3],v=!0}}let B=!1;if(s&&M.size(s.dims)>0)throw new Error("Key padding mask is not supported");if(o&&M.size(o.dims)>0){if(o.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(o.dims[0]!==d||o.dims[1]!==t.numHeads||o.dims[2]!==p||o.dims[3]!==w)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:d,sequenceLength:p,pastSequenceLength:m,kvSequenceLength:f,totalSequenceLength:w,maxSequenceLength:y,inputHiddenSize:0,hiddenSize:h,vHiddenSize:k,headSize:b,vHeadSize:Math.floor(k/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:x,scale:t.scale,broadcastResPosBias:B,passPastInKv:v,qkvFormat:_}},$l=e=>g({...e}),$n=g({perm:[0,2,1,3]}),vl=(e,t,r,i,a,n,s)=>{let o=[i,a,n],u=M.size(o),l=[{type:12,data:u},{type:12,data:s},{type:12,data:n}],d=p=>{let h=V("qkv_with_bias",t.dataType,o),f=C("qkv",t.dataType,o),m=C("bias",r.dataType,o),y=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${p.registerUniforms(y).declareVariables(f,m,h)}
  ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return e.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:o,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:l}),getShaderSource:d},{inputs:[t,r],outputs:[-1]})[0]},ea=(e,t,r,i,a,n,s,o)=>{let u=n;if(s&&M.size(s.dims)>0){if(i===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return u=vl(e,n,s,t,i,r*a,o),u=u.reshape([t,i,r,a]),r===1||i===1?u:e.compute(He(u,$n.perm),{inputs:[u],outputs:[-1]})[0]}else return n.dims.length===3&&(u=n.reshape([t,i,r,a])),r===1||i===1?u:e.compute(He(u,$n.perm),{inputs:[u],outputs:[-1]})[0]},xl=(e,t)=>{let r=bl(e.inputs,t),i=e.inputs[0],a=pt(e.inputs,1),n=pt(e.inputs,2),s=pt(e.inputs,3),o=pt(e.inputs,4),u=pt(e.inputs,5),l=pt(e.inputs,6),d=pt(e.inputs,7);if(i.dims.length===5)throw new Error("Packed QKV is not implemented");if(a?.dims.length===5)throw new Error("Packed KV is not implemented");let p=a&&n&&a.dims.length===4&&n.dims.length===4,h=ea(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,i,s,0);if(p)return Zi(e,h,a,n,o,void 0,l,d,u,r);if(!a||!n)throw new Error("key and value must be provided");let f=ea(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.headSize,a,s,r.hiddenSize),m=ea(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.vHeadSize,n,s,2*r.hiddenSize);Zi(e,h,f,m,o,void 0,l,d,u,r)}}),Tl,El,kl,Il,vn,zl,Cl,Al=I(()=>{le(),ne(),$(),H(),Tl=e=>{if(!e||e.length<1)throw new Error("too few inputs")},El=(e,t)=>{let r=[],i=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(a=>r.push(Number(a))),i=r.length),g({numOutputs:i,axis:t.axis,splitSizes:r})},kl=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${D("uniforms.size_in_split_axis","i",e)}) {
        return i;
    }
    }
    return ${e}u;
}`,Il=e=>{let t=e.length,r=[];for(let i=0;i<t;++i){let a=e[i].setByIndices("indices","input[global_idx]");t===1?r.push(a):i===0?r.push(`if (output_number == ${i}u) { ${a} }`):i===t-1?r.push(`else { ${a} }`):r.push(`else if (output_number == ${i}) { ${a} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${r.join(`
`)}
      }`},vn=(e,t)=>{let r=e[0].dims,i=M.size(r),a=e[0].dataType,n=M.normalizeAxis(t.axis,r.length),s=new Array(t.numOutputs),o=C("input",a,r.length),u=new Array(t.numOutputs),l=[],d=[],p=0,h=[{type:12,data:i}];for(let m=0;m<t.numOutputs;m++){p+=t.splitSizes[m],u[m]=p;let y=r.slice();y[n]=t.splitSizes[m],d.push(y),s[m]=V(`output${m}`,a,y.length),l.push({dims:d[m],dataType:e[0].dataType})}h.push({type:12,data:u},...E(r,...d));let f=m=>`
  ${m.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",u.length).declareVariables(o,...s)}
  ${kl(u.length)}
  ${Il(s)}

  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${o.offsetToIndices("global_idx")};
    var index = ${o.indicesGet("indices",n)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${D("uniforms.size_in_split_axis","output_number - 1u",u.length)};
      ${o.indicesSet("indices",n,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:f,getRunData:()=>({outputs:l,dispatchGroup:{x:Math.ceil(i/64)},programUniforms:h})}},zl=(e,t)=>{Tl(e.inputs);let r=e.inputs.length===1?t:El(e.inputs,t);e.compute(vn(e.inputs,r),{inputs:[0]})},Cl=e=>{let t=e.axis,r=e.splitSizes,i=e.numOutputs<0?r.length:e.numOutputs;if(i!==r.length)throw new Error("numOutputs and splitSizes lengh must be equal");return g({axis:t,numOutputs:i,splitSizes:r})}}),Ol,Ia,Rl,Bl=I(()=>{le(),ne(),$(),H(),Ol=(e,t)=>{let[r,i,a,n]=e,{numHeads:s,rotaryEmbeddingDim:o}=t;if(r.dims.length!==3&&r.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${r.dims.length}`);if(!M.areEqual(i.dims,[])&&!M.areEqual(i.dims,[1])&&i.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${i.dims.length}`);if(a.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${a.dims.length}`);if(n.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${n.dims.length}`);if(!M.areEqual(a.dims,n.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(o>0&&s===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let u=r.dims[0],l=r.dims[r.dims.length-2],d=a.dims[0],p=M.sizeFromDimension(r.dims,1)/l,h=o===0?a.dims[1]*2:p/s;if(o>h)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(i.dims.length===2){if(u!==i.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${i.dims[0]}`);if(l!==i.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${i.dims[1]}`)}if(h/2!==a.dims[1]&&o/2!==a.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${a.dims[1]}`);if(l>d)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")},Ia=(e,t)=>{let{interleaved:r,numHeads:i,rotaryEmbeddingDim:a,scale:n}=t,s=e[0].dims[0],o=M.sizeFromDimension(e[0].dims,1),u=e[0].dims[e[0].dims.length-2],l=o/u,d=e[2].dims[1],p=a===0?d*2:l/i,h=new Array(s,u,l/p,p-d),f=M.computeStrides(h),m=[{type:1,data:n},{type:12,data:h},{type:12,data:f},...e[0].dims.length===3?new Array({type:12,data:[o,l,p,1]}):[],...e[0].dims.length===4?new Array({type:12,data:[o,p,u*p,1]}):[],...E(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)],y=b=>{let _=C("input",e[0].dataType,e[0].dims.length),w=C("position_ids",e[1].dataType,e[1].dims.length),x=C("cos_cache",e[2].dataType,e[2].dims.length),v=C("sin_cache",e[3].dataType,e[3].dims.length),k=V("output",e[0].dataType,e[0].dims.length);return b.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:h.length},{name:"global_strides",type:"u32",length:f.length},{name:"input_output_strides",type:"u32",length:f.length}]),`
        ${b.declareVariables(_,w,x,v,k)}

        ${b.mainStart(S)}
          let half_rotary_emb_dim = uniforms.${x.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${b.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${w.broadcastedIndicesToOffset("bsnh.xy",V("",w.type.tensor,2))};
            let position_id =
                u32(${w.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${r});
            let j = i + select(half_rotary_emb_dim, 1, ${r});
            let re = ${_.getByOffset("i")} * ${x.get("position_id","bsnh[3]")} -
                ${_.getByOffset("j")} * ${v.get("position_id","bsnh[3]")};
            ${k.setByOffset("i","re")}
            let im = ${_.getByOffset("i")} * ${v.get("position_id","bsnh[3]")} +
                ${_.getByOffset("j")} * ${x.get("position_id","bsnh[3]")};
            ${k.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${k.setByOffset("k",_.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:g({interleaved:r}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:y,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(M.size(h)/S)},programUniforms:m})}},Rl=(e,t)=>{Ol(e.inputs,t),e.compute(Ia(e.inputs,t))}}),Ml,Dl,xn,Pl,Ul,Oc=I(()=>{$(),le(),Xa(),Sl(),Al(),ot(),Bl(),H(),Ml=(e,t)=>{if(t.doRotary&&e.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let r=e[0],i=e[1],a=e[2],n=e[3],s=e[4];if(t.doRotary!==0&&e.length<=7)throw new Error("cos_cast and sin_cache are expected if do_rotary attribute is non-zero");if(t.localWindowSize!==-1)throw new Error("Local attention is not supported");if(t.softcap!==0)throw new Error("Softcap is not supported");if(t.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(t.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let o=r.dims[0],u=r.dims[1],l=r.dims.length===3?r.dims[2]:t.numHeads*r.dims[4],d=u,p=0,h=!i||i.dims.length===0,f=Math.floor(h?l/(t.numHeads+2*t.kvNumHeads):l/t.numHeads);h&&(l=f*t.numHeads);let m=n&&n.dims.length!==0,y=s&&s.dims.length!==0;if(m&&n.dims.length===4&&n.dims[0]===o&&n.dims[1]!==t.kvNumHeads&&n.dims[2]===t.kvNumHeads&&n.dims[3]===f)throw new Error("BSNH pastKey/pastValue is not supported");if(m&&y){if(n.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(s.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');p=n.dims[2]}else if(m||y)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let b=1;if(i&&i.dims.length>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(i.dims.length<3||i.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==i.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(i.dims.length===3){if(r.dims[2]%i.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');d=i.dims[1]}else if(i.dims.length===5){if(i.dims[2]!==t.numHeads||i.dims[3]!==2||i.dims[4]!==f)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(a)throw new Error('Expect "value" be none when "key" has packed kv format.');d=i.dims[1]}else{if(i.dims[1]!==t.numHeads||i.dims[3]!==f)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');d=i.dims[2]}}else{if(r.dims.length!==3&&r.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(r.dims.length===5&&(r.dims[2]!==t.numHeads||r.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');b=3}let _=0,w=!1,x=t.kvNumHeads?f*t.kvNumHeads:l;if(a&&a.dims.length>0){if(a.dims.length!==3&&a.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==a.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(a.dims.length===3){if(d!==a.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');x=a.dims[2]}else{if(d!==a.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');x=a.dims[1]*a.dims[3],w=!0}}let v=e.length>4?e[5]:void 0;if(v&&v.dims.length!==1&&v.dims[0]!==o)throw new Error('Input "seqlens" is expected to have 1 dimension and the same dim 0 as batch_size');return{batchSize:o,sequenceLength:u,pastSequenceLength:p,kvSequenceLength:d,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:l,vHiddenSize:x,headSize:f,vHeadSize:Math.floor(x/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:_,scale:t.scale,broadcastResPosBias:!1,passPastInKv:w,qkvFormat:b}},Dl=g({perm:[0,2,1,3]}),xn=(e,t,r)=>{let i=t,a=r.kvNumHeads;return t.dims.length===3&&r.kvSequenceLength!==0&&(i=t.reshape([r.batchSize,r.kvSequenceLength,a,r.headSize]),i=e.compute(He(i,Dl.perm),{inputs:[i],outputs:[-1]})[0]),i},Pl=(e,t,r,i)=>{let a=7,n=["type","type"],s=[e*t],o=e*t,u=[{type:12,data:o},{type:12,data:t},{type:12,data:e}],l=d=>{let p=C("seq_lens",r.dataType,r.dims),h=C("total_seq_lens",i.dataType,i.dims),f=V("pos_ids",a,s),m=[{name:"output_size",type:"u32"},{name:"sequence_length",type:"u32"},{name:"batch_size",type:"u32"}];return`
  ${d.registerUniforms(m).declareVariables(p,h,f)}
  ${d.mainStart()}
    ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let total_sequence_length = u32(${h.getByOffset("0")});
    let is_subsequent_prompt = uniforms.sequence_length > 1 && uniforms.sequence_length != total_sequence_length;
    let is_first_prompt = !is_subsequent_prompt && uniforms.sequence_length == total_sequence_length;
    let batch_idx = global_idx / uniforms.sequence_length;
    let sequence_idx = i32(global_idx % uniforms.sequence_length);
    var pos_id: i32 = 0;
    let seqlen = ${p.getByOffset("batch_idx")};
    let total_seqlen = seqlen + 1;
    if (is_first_prompt) {
      if (sequence_idx < total_seqlen) {
        pos_id = sequence_idx;
      } else {
        pos_id = 1;
      }
      ${f.setByOffset("global_idx","pos_id")}
    } else if (is_subsequent_prompt) {
      let past_seqlen = total_seqlen - i32(uniforms.sequence_length);
      if (past_seqlen + sequence_idx < total_seqlen) {
        pos_id = past_seqlen + sequence_idx;
      } else {
        pos_id = 1;
      }
      ${f.setByOffset("global_idx","pos_id")}
    } else if (global_idx < uniforms.batch_size) {
      ${f.setByOffset("global_idx","seqlen")}
    };
  }
  `};return{name:"GeneratePositionIds",shaderCache:{hint:`${e};${t}`,inputDependencies:n},getRunData:()=>({outputs:[{dims:s,dataType:a}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:u}),getShaderSource:l}},Ul=(e,t)=>{let r=Ml(e.inputs,t);if(e.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(e.inputs[1]?.dims.length===5)throw new Error("Packed KV is not implemented");let i=e.inputs[0],a=e.inputs[1]&&e.inputs[1].dims.length>0?e.inputs[1]:void 0,n=e.inputs[2]&&e.inputs[2].dims.length>0?e.inputs[2]:void 0,s=e.inputs[3]&&e.inputs[3].dims.length!==0?e.inputs[3]:void 0,o=e.inputs[4]&&e.inputs[4].dims.length!==0?e.inputs[4]:void 0,u=e.inputs.length>4?e.inputs[5]:void 0,l=e.inputs.length>5?e.inputs[6]:void 0,d=r.kvNumHeads?r.kvNumHeads:r.numHeads,p=g({axis:2,numOutputs:3,splitSizes:[r.numHeads*r.headSize,d*r.headSize,d*r.headSize]}),[h,f,m]=!a&&!n?e.compute(vn([i],p),{inputs:[i],outputs:[-1,-1,-1]}):[i,a,n],y,b;if(t.doRotary){let v=e.compute(Pl(r.batchSize,r.sequenceLength,u,l),{inputs:[u,l],outputs:[-1]})[0],k=e.inputs[7],B=e.inputs[8],R=g({interleaved:t.rotaryInterleaved!==0,numHeads:r.numHeads,rotaryEmbeddingDim:0,scale:t.scale}),P=[h,v,k,B],F=[-1];y=e.compute(Ia(P,R),{inputs:P,outputs:F})[0],P.splice(0,1,f);let Z=g({interleaved:t.rotaryInterleaved!==0,numHeads:r.kvNumHeads,rotaryEmbeddingDim:0,scale:t.scale});b=e.compute(Ia(P,Z),{inputs:P,outputs:F})[0]}let _=ea(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,t.doRotary?y:h,void 0,0),w=xn(e,t.doRotary?b:f,r),x=xn(e,m,r);Zi(e,_,w,x,void 0,void 0,s,o,void 0,r,u,l)}}),Sn,Nl,Ll,ql,Rc=I(()=>{le(),ne(),ot(),H(),Sn=(e,t,r,i,a,n,s,o)=>{let u=A(n),l=u===1?"f32":`vec${u}f`,d=u===1?"vec2f":`mat2x${u}f`,p=a*s,h=64;p===1&&(h=256);let f=[a,s,n/u],m=[a,s,2],y=["rank","type","type"],b=[];b.push(...E(f,m));let _=w=>{let x=C("x",t.dataType,3,u),v=C("scale",r.dataType,r.dims),k=C("bias",i.dataType,i.dims),B=V("output",1,3,2),R=[x,v,k,B];return`
  var<workgroup> workgroup_shared : array<${d}, ${h}>;
  const workgroup_size = ${h}u;
  ${w.declareVariables(...R)}
  ${w.mainStart(h)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${l}(0);
    var squared_sum = ${l}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${l}(${x.get("batch","channel","h")});
      sum += value;
      squared_sum += value * value;
    }
    workgroup_shared[local_idx] = ${d}(sum, squared_sum);
    workgroupBarrier();

    for (var currSize = workgroup_size >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (local_idx < currSize) {
        workgroup_shared[local_idx] = workgroup_shared[local_idx] + workgroup_shared[local_idx + currSize];
      }
      workgroupBarrier();
    }
    if (local_idx == 0) {
      let sum_final = ${L("workgroup_shared[0][0]",u)} / f32(hight * ${u});
      let squared_sum_final = ${L("workgroup_shared[0][1]",u)} / f32(hight * ${u});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${o}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${u};${o};${h}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:m,dataType:1}],dispatchGroup:{x:p},programUniforms:b}),getShaderSource:_},{inputs:[t,r,i],outputs:[-1]})[0]},Nl=(e,t,r)=>{let i=t[0].dims,a=i,n=2,s=i[0],o=i[1],u=M.sizeFromDimension(i,n),l=A(u),d=M.size(a)/l,p=Sn(e,t[0],t[1],t[2],s,u,o,r.epsilon),h=[s,o,u/l],f=[s,o],m=["type","none"],y=b=>{let _=C("x",t[0].dataType,h.length,l),w=C("scale_shift",1,f.length,2),x=V("output",t[0].dataType,h.length,l),v=[_,w,x];return`
  ${b.registerUniform("output_size","u32").declareVariables(...v)}
  ${b.mainStart()}
  ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${x.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${w.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${_.getByOffset("global_idx")} * ${x.type.value}(scale_shift.x) + ${x.type.value}(scale_shift.y);
      ${x.setByOffset("global_idx","value")};
  }`};e.compute({name:"InstanceNormalization",shaderCache:{hint:`${l}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:a,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:[{type:12,data:d},...E(h,f,h)]}),getShaderSource:y},{inputs:[t[0],p]})},Ll=(e,t,r)=>{let i=t[0].dims,a=i,n=i[0],s=i[i.length-1],o=M.sizeFromDimension(i,1)/s,u=A(s),l=M.size(a)/u,d=[{type:12,data:o},{type:12,data:Math.floor(s/u)}],p=["type","type"],h=!1,f=[0,i.length-1];for(let _=0;_<i.length-2;_++)h=h||i[_+1]!==1,f.push(_+1);h=h&&i[i.length-1]!==1;let m=h?e.compute(He(e.inputs[0],f),{inputs:[e.inputs[0]],outputs:[-1]})[0]:e.inputs[0].reshape(Array.from({length:i.length},(_,w)=>i[f[w]])),y=Sn(e,m,t[1],t[2],n,o,s,r.epsilon),b=_=>{let w=O(t[0].dataType),x=u===1?"vec2f":`mat${u}x2f`,v=R=>{let P=R===0?"x":"y",F=u===1?"f32":`vec${u}f`;switch(u){case 1:return`${w}(${F}(scale.${P}))`;case 2:return`vec2<${w}>(${F}(scale[0].${P}, scale[1].${P}))`;case 4:return`vec4<${w}>(${F}(scale[0].${P}, scale[1].${P}, scale[2].${P}, scale[3].${P}))`;default:throw new Error(`Not supported compoents ${u}`)}},k=C("input",t[0].dataType,t[0].dims,u),B=V("output",t[0].dataType,a,u);return`
  @group(0) @binding(0) var<storage, read> input : array<${k.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${x}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${B.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${_.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${v(0)}, ${v(1)});
  }`};e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${u}`,inputDependencies:p},getRunData:()=>({outputs:[{dims:a,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:d}),getShaderSource:b},{inputs:[t[0],y]})},ql=(e,t)=>{t.format==="NHWC"?Ll(e,e.inputs,t):Nl(e,e.inputs,t)}}),Vl,Fl,Wl,Bc=I(()=>{le(),ne(),H(),Vl=e=>{if(!e||e.length<2)throw new Error("layerNorm requires at least 2 inputs.")},Fl=(e,t,r)=>{let i=t.simplified,a=e[0].dims,n=e[1],s=!i&&e[2],o=a,u=M.normalizeAxis(t.axis,a.length),l=M.sizeToDimension(a,u),d=M.sizeFromDimension(a,u),p=M.size(n.dims),h=s?M.size(s.dims):0;if(p!==d||s&&h!==d)throw new Error(`Size of X.shape()[axis:] == ${d}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${p} and bias size of ${h}`);let f=[];for(let k=0;k<a.length;++k)k<u?f.push(a[k]):f.push(1);let m=A(d),y=["type","type"],b=[{type:12,data:l},{type:1,data:d},{type:12,data:Math.floor(d/m)},{type:1,data:t.epsilon}];s&&y.push("type");let _=r>1,w=r>2,x=k=>{let B=O(e[0].dataType),R=[C("x",e[0].dataType,e[0].dims,m),C("scale",n.dataType,n.dims,m)];s&&R.push(C("bias",s.dataType,s.dims,m)),R.push(V("output",e[0].dataType,o,m)),_&&R.push(V("mean_data_output",1,f)),w&&R.push(V("inv_std_output",1,f));let P=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${k.registerUniforms(P).declareVariables(...R)}
  ${k.mainStart()}
    ${k.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${U("f32",m)};
    var mean_square_vector = ${U("f32",m)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${N(B,m,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${L("mean_vector",m)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${L("mean_square_vector",m)} / uniforms.norm_size ${i?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${N(B,m,"x[j + offset]")};
      let f32scale = ${N(B,m,"scale[j]")};
      output[j + offset] = ${R[0].type.value}((f32input ${i?"":"- mean"}) * inv_std_dev * f32scale
        ${s?`+ ${N(B,m,"bias[j]")}`:""}
      );
    }

    ${_?"mean_data_output[global_idx] = mean":""};
    ${w?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},v=[{dims:o,dataType:e[0].dataType}];return _&&v.push({dims:f,dataType:1}),w&&v.push({dims:f,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${m};${r};${i}`,inputDependencies:y},getRunData:()=>({outputs:v,dispatchGroup:{x:Math.ceil(l/64)},programUniforms:b}),getShaderSource:x}},Wl=(e,t)=>{Vl(e.inputs),e.compute(Fl(e.inputs,t,e.outputCount))}}),Gl,jl,Mc=I(()=>{ne(),sn(),dn(),Gl=e=>{if(!e||e.length!==2)throw new Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw new Error("shared dimension does not match.")},jl=e=>{Gl(e.inputs);let t=Ut.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw new Error("Can't use matmul on the given tensors");let r=t[t.length-1],i=e.inputs[0].dims[e.inputs[0].dims.length-1];if(r<8&&i<8)e.compute(nn(e.inputs,{activation:""},t));else{let a=t[t.length-2],n=M.size(e.inputs[0].dims.slice(0,-2)),s=M.size(e.inputs[1].dims.slice(0,-2));if(n!==1&&a===1&&s===1){let o=e.inputs[0].reshape([1,n,i]),u=e.inputs[1].reshape([1,i,r]),l=[1,n,r],d=[o,u];e.compute(Sa(d,{activation:""},t,l),{inputs:d})}else e.compute(Sa(e.inputs,{activation:""},t))}}}),Hl,Kl,Zl,Ql,Xl,Dc=I(()=>{le(),ne(),$(),H(),Hl=(e,t)=>{if(e.length<3||e.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let r=e[0],i=r.dims.length;if(r.dims[i-1]!==t.k)throw new Error("The last dim of input shape does not match the k value");let a=Math.floor((t.k+t.blockSize-1)/t.blockSize),n=t.blockSize/8*t.bits,s=e[1];if(!M.areEqual(s.dims,[t.n,a,n]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let o=e[2].dims;if(M.size(o)!==t.n*a)throw new Error("scales input size error.");if(e.length===4){let u=e[3].dims,l=t.bits>4?t.n*a:t.n*Math.floor((a+1)/2);if(M.size(u)!==l)throw new Error("zeroPoints input size error.")}},Kl=(e,t)=>{let r=e[0].dims,i=r.length,a=r[i-2],n=t.k,s=t.n,o=r.slice(0,i-2),u=M.size(o),l=e[1].dims[2]/4,d=e[0].dataType,p=A(t.k),h=A(l),f=A(s),m=o.concat([a,s]),y=a>1&&s/f%2===0?2:1,b=M.size(m)/f/y,_=64,w=[],x=[u,a,n/p],v=M.convertShape(e[1].dims).slice();v.splice(-1,1,l/h),w.push(...E(x)),w.push(...E(v)),w.push(...E(e[2].dims)),e.length===4&&w.push(...E(M.convertShape(e[3].dims)));let k=[u,a,s/f];w.push(...E(k));let B=R=>{let P=x.length,F=C("a",e[0].dataType,P,p),Z=C("b",12,v.length,h),ce=C("scales",e[2].dataType,e[2].dims.length),re=[F,Z,ce],ge=e.length===4?C("zero_points",12,e[3].dims.length):void 0;ge&&re.push(ge);let K=k.length,Se=V("output",e[0].dataType,K,f),de=O(e[0].dataType),J=(()=>{switch(p){case 1:return`array<${de}, 8>`;case 2:return`mat4x2<${de}>`;case 4:return`mat2x4<${de}>`;default:throw new Error(`${p}-component is not supported.`)}})(),Me=()=>{let q=`
          // reuse a data
            var input_offset = ${F.indicesToOffset(`${F.type.indices}(batch, row, word_offset)`)};
            var a_data: ${J};
            for (var j: u32 = 0; j < ${8/p}; j++) {
              a_data[j] = ${F.getByOffset("input_offset")};
              input_offset++;
            }
          `;for(let j=0;j<f*y;j++)q+=`
            b_value = ${h===1?`b${j}_data`:`b${j}_data[i]`};
            b_value_lower = unpack4xU8(b_value & b_mask);
            b_value_upper = unpack4xU8((b_value >> 4) & b_mask);
            b_quantized_values = ${J}(${Array.from({length:4},(be,De)=>`${de}(b_value_lower[${De}]), ${de}(b_value_upper[${De}])`).join(", ")});
            b_dequantized_values = ${p===1?`${J}(${Array.from({length:8},(be,De)=>`(b_quantized_values[${De}] - ${ge?`zero_point${j}`:"zero_point"}) * scale${j}`).join(", ")});`:`(b_quantized_values - ${J}(${Array(8).fill(`${ge?`zero_point${j}`:"zero_point"}`).join(",")})) * scale${j};`};
            workgroup_shared[local_id.x * ${y} + ${Math.floor(j/f)}]${f>1?`[${j%f}]`:""} += ${Array.from({length:8/p},(be,De)=>`${p===1?`a_data[${De}] * b_dequantized_values[${De}]`:`dot(a_data[${De}], b_dequantized_values[${De}])`}`).join(" + ")};
          `;return q},ie=()=>{let q=`
            var col_index = col * ${f};
            ${ge?`
            let zero_point_bytes_per_col = (nBlocksPerCol + 1) / 2;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${de}(8);`}
            `;for(let j=0;j<f*y;j++)q+=`
            let scale${j} = ${ce.getByOffset("col_index * nBlocksPerCol + block")};
            ${ge?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block >> 0x1u);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            zero_point_word = ${ge.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${j} = ${de}((zero_point_word) & 0xFu);`:""}
            col_index += 1;`;return q},Le=()=>{let q=`col_index = col * ${f};`;for(let j=0;j<f*y;j++)q+=`
            let b${j}_data = ${Z.getByIndices(`${Z.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return q+=`
            var b_value: u32;
            let b_mask: u32 = 0x0F0F0F0Fu;
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${J};
            var b_dequantized_values: ${J};`,q};return`
        var<workgroup> workgroup_shared: array<${Se.type.value}, ${y*_}>;
        ${R.declareVariables(...re,Se)}
        ${R.mainStart([_,1,1])}
          let output_indices = ${Se.offsetToIndices(`(global_idx / ${_}) * ${y}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${_}) {
            //process one block
            var word_offset: u32 = block * ${t.blockSize/p};
            ${ie()}
            for (var word: u32 = 0; word < ${l}; word += ${h}) {
              ${Le()}
              for (var i: u32 = 0; i < ${h}; i++) {
                ${Me()}
                word_offset += ${8/p};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${y}) {
            var output_value: ${Se.type.value} = ${Se.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${_}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${y};
            }
            ${Se.setByIndices(`${Se.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${t.blockSize};${t.bits};${p};${h};${f};${y};${_}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:m,dataType:d}],dispatchGroup:{x:b},programUniforms:w}),getShaderSource:B}},Zl=(e,t)=>{let r=e[0].dims,i=r.length,a=r[i-2],n=t.k,s=t.n,o=r.slice(0,i-2),u=M.size(o),l=e[1].dims[2]/4,d=e[0].dataType,p=A(t.k),h=A(l),f=o.concat([a,s]),m=128,y=s%8===0?8:s%4===0?4:1,b=m/y,_=b*h*8,w=_/p,x=_/t.blockSize,v=M.size(f)/y,k=[],B=[u,a,n/p],R=M.convertShape(e[1].dims).slice();R.splice(-1,1,l/h),k.push(...E(B)),k.push(...E(R)),k.push(...E(e[2].dims)),e.length===4&&k.push(...E(M.convertShape(e[3].dims)));let P=[u,a,s];k.push(...E(P));let F=Z=>{let ce=B.length,re=C("a",e[0].dataType,ce,p),ge=C("b",12,R.length,h),K=C("scales",e[2].dataType,e[2].dims.length),Se=[re,ge,K],de=e.length===4?C("zero_points",12,e[3].dims.length):void 0;de&&Se.push(de);let J=P.length,Me=V("output",e[0].dataType,J),ie=O(e[0].dataType),Le=()=>{switch(p){case 1:return`
          let a_data0 = vec4<${ie}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${ie}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${ie}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${ie}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${p}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${re.type.value}, ${w}>;
        var<workgroup> inter_results: array<array<${Me.type.value}, ${b}>, ${y}>;
        ${Z.declareVariables(...Se,Me)}
        ${Z.mainStart([b,y,1])}
          let output_indices = ${Me.offsetToIndices(`workgroup_index * ${y}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${x} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${w};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${w}; a_offset += ${m})
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${re.getByIndices(`${re.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${re.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${x} + local_id.x;
            ${de?`
            let zero_point_bytes_per_col = (n_blocks_per_col + 1) / 2;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block >> 0x1u);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            let zero_point_word = ${de.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${ie}((zero_point_word) & 0xFu);`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${ie}(8);`}
            let scale = ${K.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${ge.getByIndices(`${ge.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${t.blockSize/p};
            for (var i: u32 = 0; i < ${h}; i++) {
              ${Le()}
              let b_value = ${h===1?"b_data":"b_data[i]"};
              let b_value_lower = unpack4xU8(b_value & 0x0F0F0F0Fu);
              let b_value_upper = unpack4xU8((b_value >> 4) & 0x0F0F0F0Fu);
              let b_quantized_values = mat2x4<${ie}>(${Array.from({length:4},(q,j)=>`${ie}(b_value_lower[${j}]), ${ie}(b_value_upper[${j}])`).join(", ")});
              let b_dequantized_values = (b_quantized_values - mat2x4<${ie}>(${Array(8).fill("zero_point").join(",")})) * scale;
              inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(q,j)=>`${`dot(a_data${j}, b_dequantized_values[${j}])`}`).join(" + ")};
              word_offset += ${8/p};
            }
            workgroupBarrier();
          }

          if (local_idx < ${y}) {
            var output_value: ${Me.type.value} = ${Me.type.value}(0);
            for (var b = 0u; b < ${b}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${Me.setByIndices(`${Me.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${t.blockSize};${p};${h};${b};${y}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:f,dataType:d}],dispatchGroup:{x:v},programUniforms:k}),getShaderSource:F}},Ql=(e,t)=>{Hl(e.inputs,t),t.blockSize===32&&e.adapterInfo.isVendor("intel")&&e.adapterInfo.isArchitecture("gen-12lp")?e.compute(Zl(e.inputs,t)):e.compute(Kl(e.inputs,t))},Xl=e=>g(e)}),Yl,Jl,ed,td,rd,id,ad,nd,sd,Pc=I(()=>{le(),ne(),H(),Yl=e=>{if(!e||e.length<1)throw new Error("Too few inputs");if(e[0].dataType!==1&&e[0].dataType!==10)throw new Error("Input type must be float or float16.");if(e.length>=2){let t=e[0].dims.length*2===e[1].dims[0];if(e.length===4&&(t=e[3].dims[0]*2===e[1].dims[0]),!t)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},Jl=(e,t,r)=>{let i="";for(let a=t-1;a>=0;--a)i+=`
            k = i32(${e.indicesGet("indices",a)}) - ${D("uniforms.pads",a,r)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${D("uniforms.x_shape",a,t)})) {
              break;
            }
            offset += k * i32(${D("uniforms.x_strides",a,t)});
        `;return`
          value = ${e.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${i}
            value = x[offset];
          }
      `},ed=(e,t,r)=>{let i="";for(let a=t-1;a>=0;--a)i+=`
                k = i32(${e.indicesGet("indices",a)}) - ${D("uniforms.pads",a,r)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${D("uniforms.x_shape",a,t)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${D("uniforms.x_shape",a,t)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${D("uniforms.x_strides",a,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `},td=(e,t,r)=>{let i="";for(let a=t-1;a>=0;--a)i+=`
                k = i32(${e.indicesGet("indices",a)}) - ${D("uniforms.pads",a,r)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${D("uniforms.x_shape",a,t)})) {
                  k = i32(${D("uniforms.x_shape",a,t)}) - 1;
                }
                offset += k * i32(${D("uniforms.x_strides",a,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `},rd=(e,t,r)=>{let i="";for(let a=t-1;a>=0;--a)i+=`
                k = i32(${e.indicesGet("indices",a)}) - ${D("uniforms.pads",a,r)};
                if (k < 0)  {
                  k += i32(${D("uniforms.x_shape",a,t)}]);
                }
                if (k >= i32(${D("uniforms.x_shape",a,t)})) {
                  k -= i32(${D("uniforms.x_shape",a,t)});
                }
                offset += k * i32(${D("uniforms.x_strides",a,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `},id=(e,t,r)=>{switch(r.mode){case 0:return Jl(e,t,r.pads.length);case 1:return ed(e,t,r.pads.length);case 2:return td(e,t,r.pads.length);case 3:return rd(e,t,r.pads.length);default:throw new Error("Invalid mode")}},ad=(e,t)=>{let r=M.padShape(e[0].dims.slice(),t.pads),i=e[0].dims,a=M.size(r),n=[{type:12,data:a},{type:6,data:t.pads}],s=e.length>=3&&e[2].data;t.mode===0&&n.push({type:s?e[2].dataType:1,data:t.value}),n.push(...E(e[0].dims,r));let o=["rank"],u=l=>{let d=V("output",e[0].dataType,r.length),p=C("x",e[0].dataType,i.length),h=p.type.value,f=id(d,i.length,t),m=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:t.pads.length}];return t.mode===0&&m.push({name:"constant_value",type:s?h:"f32"}),`
            ${l.registerUniforms(m).declareVariables(p,d)}
            ${l.mainStart()}
            ${l.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${d.offsetToIndices("global_idx")};

            var value = ${h}(0);
            ${f}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${t.mode}${s}`,inputDependencies:o},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(M.size(r)/64)},programUniforms:n}),getShaderSource:u}},nd=(e,t)=>{if(e.length>1){let r=e[1].getBigInt64Array(),i=e.length>=3&&e[2].data?e[2].dataType===10?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,a=e[0].dims.length,n=new Int32Array(2*a).fill(0);if(e.length>=4){let o=e[3].getBigInt64Array();for(let u=0;u<o.length;u++)n[Number(o[u])]=Number(r[u]),n[Number(o[u])+a]=Number(r[u+o.length])}else r.forEach((o,u)=>n[Number(u)]=Number(o));let s=[];return n.forEach(o=>s.push(o)),{mode:t.mode,value:i,pads:s}}else return t},sd=(e,t)=>{Yl(e.inputs);let r=nd(e.inputs,t);e.compute(ad(e.inputs,r),{inputs:[0]})}}),ta,Tn,En,kn,In,od,ud,zn,Cn,ld,dd,An,pd,cd,On,hd,fd,md,gd,Uc=I(()=>{it(),le(),ne(),H(),ta=e=>{if(ee.webgpu.validateInputContent&&(!e||e.length!==1))throw new Error("Pool ops requires 1 input.")},Tn=(e,t,r)=>{let i=t.format==="NHWC",a=e.dims.slice();i&&a.splice(1,0,a.pop());let n=Object.hasOwnProperty.call(t,"dilations"),s=t.kernelShape.slice(),o=t.strides.slice(),u=n?t.dilations.slice():[],l=t.pads.slice();tr.adjustPoolAttributes(r,a,s,o,u,l);let d=tr.computePoolOutputShape(r,a,o,u,s,l,t.autoPad),p=Object.assign({},t);n?Object.assign(p,{kernelShape:s,strides:o,pads:l,dilations:u,cacheKey:t.cacheKey}):Object.assign(p,{kernelShape:s,strides:o,pads:l,cacheKey:t.cacheKey});let h=d.slice();return h.push(h.splice(1,1)[0]),[p,i?h:d]},En=(e,t)=>{let r=t.format==="NHWC",i=M.size(e),a=M.size(t.kernelShape),n=[{type:12,data:i},{type:12,data:a}],s=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let o=t.kernelShape[t.kernelShape.length-1],u=t.strides[t.strides.length-1],l=t.pads[t.pads.length/2-1],d=t.pads[t.pads.length-1],p=!!(l+d);n.push({type:12,data:o},{type:12,data:u},{type:12,data:l},{type:12,data:d}),s.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let h=!1;if(t.kernelShape.length===2){let f=t.kernelShape[t.kernelShape.length-2],m=t.strides[t.strides.length-2],y=t.pads[t.pads.length/2-2],b=t.pads[t.pads.length-2];h=!!(y+b),n.push({type:12,data:f},{type:12,data:m},{type:12,data:y},{type:12,data:b}),s.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[n,s,!0,p,h]}else{if(r)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let o=M.computeStrides(t.kernelShape);n.push({type:12,data:o},{type:12,data:t.pads},{type:12,data:t.strides}),s.push({name:"kernelStrides",type:"u32",length:o.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length});let u=t.pads.reduce((l,d)=>l+d);return[n,s,!!u,!1,!1]}},kn=(e,t,r,i,a,n,s,o,u,l,d,p)=>{let h=a.format==="NHWC",f=t.type.value,m=V("output",t.type.tensor,i);if(a.kernelShape.length<=2){let y="",b="",_="",w=r-(h?2:1);if(d?y=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${w}] = indices[${w}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${w}] < 0 || xIndices[${w}]
                      >= uniforms.x_shape[${w}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${n}
                }`:y=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${w}] = indices[${w}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${n}
                }`,a.kernelShape.length===2){let x=r-(h?3:2);p?b=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${x}] = indices[${x}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${x}] < 0 || xIndices[${x}] >= uniforms.x_shape[${x}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:b=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${x}] = indices[${x}] * uniforms.sh - uniforms.phStart + j;
                `,_=`
              }
            `}return`
            ${e.registerUniforms(u).declareVariables(t,m)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${m.offsetToIndices("global_idx")};
              var xIndices = ${m.offsetToIndices("global_idx")};

              var value = ${f}(${o});
              var pad = 0;
              ${b}
              ${y}
              ${_}
              ${s}

              output[global_idx] = value;
            }`}else{if(h)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let y=a.kernelShape.length,b=a.pads.length,_="";return l?_=`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${t.indicesToOffset("xIndices")}];
                ${n}
              }`:_=`
              }
              let x_val = x[${t.indicesToOffset("xIndices")}];
              ${n}
            `,`
            ${e.registerUniforms(u).declareVariables(t,m)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${m.offsetToIndices("global_idx")};
              var xIndices = ${m.offsetToIndices("global_idx")};

              var offsets: array<u32, ${y}>;

              var value = ${f}(${o});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${y-1}u; j++) {
                  offsets[j] = offset / ${D("uniforms.kernelStrides","j",y)};
                  offset -= offsets[j] * ${D("uniforms.kernelStrides","j",y)};
                }
                offsets[${y-1}] = offset;

                isPad = false;
                for (var j = ${r-y}u; j < ${r}u; j++) {
                  xIndices[j] = indices[j] * ${D("uniforms.strides",`j - ${r-y}u`,y)}
                    + offsets[j - ${r-y}u] - ${D("uniforms.pads","j - 2u",b)};
                  ${_}
              }
              ${s}

              output[global_idx] = value;
            }`}},In=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,od=e=>`${In(e)};${e.countIncludePad}`,ud=e=>`${In(e)};${e.storageOrder};${e.dilations}`,zn=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),Cn=(e,t,r,i)=>{let[a,n]=Tn(t,i,r),s=C("x",t.dataType,t.dims.length),o=s.type.value,u="value += x_val;",l="";a.countIncludePad?l+=`value /= ${o}(uniforms.kernelSize);`:l+=`value /= ${o}(i32(uniforms.kernelSize) - pad);`;let[d,p,h,f,m]=En(n,a);d.push(...E(t.dims,n));let y=["rank"];return{name:e,shaderCache:{hint:`${i.cacheKey};${h};${f};${m}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:n,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(M.size(n)/64)},programUniforms:d}),getShaderSource:b=>kn(b,s,t.dims.length,n.length,a,u,l,0,p,h,f,m)}},ld=e=>{let t=e.count_include_pad!==0,r=zn(e);if(r.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");let i={countIncludePad:t,...r,cacheKey:""};return{...i,cacheKey:od(i)}},dd=(e,t)=>{ta(e.inputs),e.compute(Cn("AveragePool",e.inputs[0],!1,t))},An={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},pd=e=>{let t=e.format;return{format:t,...An,cacheKey:t}},cd=(e,t)=>{ta(e.inputs),e.compute(Cn("GlobalAveragePool",e.inputs[0],!0,t))},On=(e,t,r,i)=>{let[a,n]=Tn(t,i,r),s=`
      value = max(x_val, value);
    `,o="",u=C("x",t.dataType,t.dims.length),l=["rank"],[d,p,h,f,m]=En(n,a);return d.push(...E(t.dims,n)),{name:e,shaderCache:{hint:`${i.cacheKey};${h};${f};${m}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:n,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(M.size(n)/64)},programUniforms:d}),getShaderSource:y=>kn(y,u,t.dims.length,n.length,a,s,o,t.dataType===10?-65504:-1e5,p,h,f,m)}},hd=(e,t)=>{ta(e.inputs),e.compute(On("MaxPool",e.inputs[0],!1,t))},fd=e=>{let t=e.storage_order,r=e.dilations,i=zn(e);if(t!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(i.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");let a={storageOrder:t,dilations:r,...i,cacheKey:""};return{...a,cacheKey:ud(a)}},md=e=>{let t=e.format;return{format:t,...An,cacheKey:t}},gd=(e,t)=>{ta(e.inputs),e.compute(On("GlobalMaxPool",e.inputs[0],!0,t))}}),yd,wd,_d,bd,Nc=I(()=>{le(),ne(),$(),H(),yd=(e,t)=>{if(e.length<2||e.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(e.length===3&&e[1].dims===e[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[0].dataType===6&&e.length>2)throw new Error("In the case of dequantizing int32 there is no zero point.");if(e[1].dims.length!==0&&e[1].dims.length!==1&&e[1].dims.length!==e[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((r,i)=>r===e[2].dims[i]).reduce((r,i)=>r&&i,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(t.blockSize>0){if(e[1].dims.length===0||e[1].dims.length===1&&e[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((a,n)=>n===t.axis||a===e[0].dims[n]).reduce((a,n)=>a&&n,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let r=e[0].dims[t.axis],i=e[1].dims[t.axis];if(t.blockSize<Math.ceil(r/i)||t.blockSize>Math.ceil(r/(i-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},wd=(e,t)=>{let r=M.normalizeAxis(t.axis,e[0].dims.length),i=e[0].dataType,a=i===3,n=e[0].dims,s=e[1].dataType,o=M.size(n),u=i===3||i===2,l=u?[Math.ceil(M.size(e[0].dims)/4)]:e[0].dims,d=e[1].dims,p=e.length>2?e[2]:void 0,h=p?u?[Math.ceil(M.size(p.dims)/4)]:p.dims:void 0,f=d.length===0||d.length===1&&d[0]===1,m=f===!1&&d.length===1,y=A(o),b=f&&(!u||y===4),_=b?y:1,w=b&&!u?y:1,x=C("input",u?12:i,l.length,w),v=C("scale",s,d.length),k=p?C("zero_point",u?12:i,h.length):void 0,B=V("output",s,n.length,_),R=[x,v];k&&R.push(k);let P=[l,d];p&&P.push(h);let F=[{type:12,data:o/_},{type:12,data:r},{type:12,data:t.blockSize},...E(...P,n)],Z=ce=>{let re=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${ce.registerUniforms(re).declareVariables(...R,B)}
      ${ce.mainStart()}
          ${ce.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${B.offsetToIndices("global_idx")};

          // Set input x
          ${u?`
            let input = ${x.getByOffset("global_idx / 4")};
            let x_vec = ${a?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${_===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${x.getByOffset("global_idx")};`};

          // Set scale input
          ${f?`let scale_value= ${v.getByOffset("0")}`:m?`
            let scale_index = ${B.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${v.getByOffset("scale_index")};`:`
            var scale_indices: ${v.type.indices} = output_indices;
            let index = ${v.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${v.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${v.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${k?f?u?`
                let zero_point_input = ${k.getByOffset("0")};
                let zero_point_vec =  ${a?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${k.getByOffset("0")}`:m?u?`
                let zero_point_index = ${B.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${k.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${a?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${B.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${k.getByOffset("zero_point_index")};`:u?`
                let zero_point_offset = ${v.indicesToOffset("scale_indices")};
                let zero_point_input = ${k.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${a?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${k.getByIndices("scale_indices")};`:`let zero_point_value = ${u?a?"i32":"u32":x.type.value}(0);`};
      // Compute and write output
      ${B.setByOffset("global_idx",`${B.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:t.cacheKey,inputDependencies:k?["rank","rank","rank"]:["rank","rank"]},getShaderSource:Z,getRunData:()=>({outputs:[{dims:n,dataType:s}],dispatchGroup:{x:Math.ceil(o/_/64),y:1,z:1},programUniforms:F})}},_d=(e,t)=>{yd(e.inputs,t),e.compute(wd(e.inputs,t))},bd=e=>g({axis:e.axis,blockSize:e.blockSize})}),$d,vd,xd,Lc=I(()=>{it(),le(),H(),$d=(e,t,r)=>{let i=e===t,a=e<t&&r<0,n=e>t&&r>0;if(i||a||n)throw new Error("Range these inputs' contents are invalid.")},vd=(e,t,r,i)=>{let a=Math.abs(Math.ceil((t-e)/r)),n=[a],s=a,o=[{type:12,data:s},{type:i,data:e},{type:i,data:r},...E(n)],u=l=>{let d=V("output",i,n.length),p=d.type.value,h=[{name:"outputSize",type:"u32"},{name:"start",type:p},{name:"delta",type:p}];return`
        ${l.registerUniforms(h).declareVariables(d)}
        ${l.mainStart()}
        ${l.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${p}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${i}`},getShaderSource:u,getRunData:()=>({outputs:[{dims:n,dataType:i}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:o})}},xd=e=>{let t=0,r=0,i=0;e.inputs[0].dataType===6?(t=e.inputs[0].getInt32Array()[0],r=e.inputs[1].getInt32Array()[0],i=e.inputs[2].getInt32Array()[0]):e.inputs[0].dataType===1&&(t=e.inputs[0].getFloat32Array()[0],r=e.inputs[1].getFloat32Array()[0],i=e.inputs[2].getFloat32Array()[0]),ee.webgpu.validateInputContent&&$d(t,r,i),e.compute(vd(t,r,i,e.inputs[0].dataType),{inputs:[]})}}),Sd,Rn,Bn,Td,Ed,kd,qc=I(()=>{le(),ne(),$(),H(),Sd=(e,t,r,i)=>{if(e!=="none"&&i!=="i32"&&i!=="u32"&&i!=="f32")throw new Error(`Input ${i} is not supported with reduction ${e}.`);let a=`{
                var oldValue = 0;
                loop {
                  let newValueF32 =`,n=`;
                  let newValue = bitcast<i32>(newValueF32);
                  let res = atomicCompareExchangeWeak(&${t}, oldValue, newValue);
                  if res.exchanged {
                    break;
                  }
                  oldValue = res.old_value;
                }
              }`;switch(e){case"none":return`${t}=${r};`;case"add":return i==="i32"||i==="u32"?`atomicAdd(&${t}, bitcast<${i}>(${r}));`:`
              ${a}bitcast<${i}>(oldValue) + (${r})${n}`;case"max":return i==="i32"||i==="u32"?`atomicMax(&${t}, bitcast<${i}>(${r}));`:`
                ${a}max(bitcast<f32>(oldValue), (${r}))${n}`;case"min":return i==="i32"||i==="u32"?`atomicMin(&${t}, bitcast<${i}>(${r}));`:`${a}min(bitcast<${i}>(oldValue), (${r}))${n}`;case"mul":return`${a}(bitcast<${i}>(oldValue) * (${r}))${n}`;default:throw new Error(`Reduction ${e} is not supported.`)}},Rn=(e,t)=>`${e===1?`
    let element_count_dim = uniforms.output_strides;
    let dim_value = uniforms.output_shape;`:`
    let element_count_dim = uniforms.output_strides[${t?"i - indices_start":"i"}];
    let dim_value = uniforms.output_shape[${t?"i - indices_start":"i"} + uniforms.last_index_dimension];`}
    
    if (index >= 0) {
      if (index >= i32(dim_value)) {
        index = i32(dim_value - 1);
      }
    } else {
      if (index < -i32(dim_value)) {
        index = 0;
      } else {
        index += i32(dim_value);
      }
    }
    data_offset += u32((u32(index) * element_count_dim));`,Bn=(e,t,r)=>`for (var i = 0u; i < uniforms.num_updates_elements; i++) {
        let value = updates[uniforms.num_updates_elements * ${r?"global_idx":"idx"} + i];
        ${Sd(e.reduction,"output[data_offset + i]","value",t)}
      }`,Td=(e,t)=>{let r=e[0].dims,i=e[1].dims,a=r,n=1,s=Math.ceil(M.size(i)/n),o=i[i.length-1],u=M.sizeFromDimension(r,o),l=M.sizeFromDimension(i,0)/o,d=[{type:12,data:s},{type:12,data:o},{type:12,data:u},...E(e[1].dims,e[2].dims,a)],p=h=>{let f=C("indices",e[1].dataType,e[1].dims.length),m=C("updates",e[2].dataType,e[2].dims.length,n),y=t.reduction!=="none"&&t.reduction!==""?qe("output",e[0].dataType,a.length):V("output",e[0].dataType,a.length,n);return`
      ${h.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(f,m,y)}
      ${h.mainStart()}
        ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
  var hasDuplicates = false;
  if (${t.reduction==="none"}) {
    for (var i = 0; i < ${l}; i = i + 1) {
      for (var j = i + 1; j < ${l}; j = j + 1) {
        var index_i = i32(indices[i].x);
        var index_j = i32(indices[j].x);
        if (index_i == index_j) {
          hasDuplicates = true;
          break;
        }
      }
      if (hasDuplicates) {
        break;
      }
    }
  }

  if (${t.reduction==="none"} && hasDuplicates) {
    if (global_idx != 0u) {
      return;
    }
    // Process each index-update pair individually when duplicates exist
    for (var idx = 0u; idx < ${l}u; idx++) {
      var data_offset = 0u;
      for (var i = 0u; i < uniforms.last_index_dimension; i++) {
        var index = i32(indices[idx * uniforms.last_index_dimension + i].x);
        ${Rn(r.length,!1)}
      }
      ${Bn(t,y.type.value,!1)}
    }
    return;
  }

  var data_offset = 0u;
  var indices_start = uniforms.last_index_dimension * global_idx;
  var indices_end = indices_start + uniforms.last_index_dimension;
  for (var i = indices_start; i < indices_end; i++) {
    var index = i32(indices[i].x);
    ${Rn(r.length,!0)}
  }
  ${Bn(t,y.type.value,!0)}
  }`};return{name:"ScatterND",shaderCache:{hint:`${t.cacheKey}_${t.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:a,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:d}),getShaderSource:p}},Ed=e=>g({reduction:e.reduction}),kd=(e,t)=>{e.compute(Td(e.inputs,t),{inputs:[e.inputs[1],e.inputs[2]],outputs:[]})}}),Id,zd,Cd,Mn,Ad,Od,Rd,Bd,Md,Dd,Pd,Ud,Dn,Nd,Ld,qd,Vd,Fd,Wd,Gd,Vc=I(()=>{le(),ne(),$(),H(),Id=(e,t)=>{if(e.every(r=>r>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),e.length>0){if(t.mode==="linear"){if(!(e.length===2||e.length===3||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1||e.length===5&&e[0]===1&&e[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(t.mode==="cubic"&&!(e.length===2||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},zd=(e,t,r)=>{t.every(a=>a>=0&&a<r||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let i=new Array(r).fill(1);return t.forEach((a,n)=>i[a]=e[n]),i},Cd=(e,t,r,i,a,n)=>{let[s,o,u]=r>10?[1,2,3]:[-1,e.length>1?1:-1,-1],l=e[0].dims.length;if(s>0&&e.length>s&&e[s].dims.length>0)e[s].getFloat32Array().forEach(d=>n.push(d));else if(t.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(o>0&&e.length>o&&e[o].dims.length===1&&e[o].dims[0]>0){if(e[o].getFloat32Array().forEach(d=>i.push(d)),i.length!==0&&i.length!==l&&r>=18&&i.length!==t.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");Id(i,t),t.axes.length>0&&zd(i,t.axes,l).forEach((d,p)=>i[p]=d)}if(u>0&&e.length>u&&e[u].dims.length===1&&e[u].dims[0]>0&&(e[u].getBigInt64Array().forEach(d=>a.push(Number(d))),a.length!==0&&a.length!==l&&r>=18&&a.length!==t.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(i.length!==0&&i.length!==t.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(a.length!==0&&a.length!==t.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof i<"u"&&typeof a<"u"&&i.length>0&&a.length>l)throw new Error("Resize requires only of scales or sizes to be specified")},Mn=(e,t,r,i)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${e}) * (${t});
  let whole = ${i}(big / (${r}));
  let fract = ${i}(big % (${r})) / ${i}(${r});
  return whole + fract;
`,Ad=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${t} { `+(()=>{switch(e){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${t}(xResized) / ${t}(xScale);
          } else {
            ${Mn("xResized","lengthOriginal","lengthResized",t)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${t}(xResized) + 0.5) / ${t}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${t}(xResized) + 0.5) / ${t}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${Mn("xResized","lengthOriginal - 1","lengthResized - 1",t)}
                  }`;case"tf_crop_and_resize":return`if (lengthResized > 1) {
                    return ${t}(roiStart) * ${t}(lengthOriginal - 1) +
                        (${t}(xResized) * ${t}(roiEnd - roiStart) * ${t}(lengthOriginal - 1)) /
                        ${t}(lengthResized - 1);
                  } else {
                    return 0.5 * ${t}(roiStart + roiEnd) * ${t}(lengthOriginal - 1);
                  }`;case"half_pixel_symmetric":return`const outputWidth = ${t}xScale * ${t}(lengthResized);
                  const adjustment = ${t}(lengthResized) / outputWidth;
                  const center = ${t}(lengthOriginal) / 2;
                  const offset = center * (1 - adjustment);
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case"half_pixel":return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${e} is not supported`)}})()+"}",Od=(e,t,r)=>`fn getNearestPixelFromOriginal(xOriginal: ${r}, isDownSample: bool) -> ${r} {`+(()=>{switch(e){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";case"simple":default:if(t<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${e} is not supported`)}})()+"}",Rd=(e,t,r)=>{let i=new Array(r).fill(0).concat(new Array(r).fill(1)),a=e.length===0?i:e.slice();return t.length>0?(t.forEach((n,s)=>{i[n]=a[s],i[s+r]=a[t.length+s]}),i):a},Bd=(e,t,r,i)=>{let a=[];if(r.length>0)if(i.length>0){if(e.forEach(n=>a.push(n)),Math.max(...i)>e.length)throw new Error("axes is out of bound");i.forEach((n,s)=>a[n]=r[s])}else r.forEach(n=>a.push(n));else{if(t.length===0)throw new Error("Resize requires either scales or sizes.");a=e.map((n,s)=>Math.round(n*t[s]))}return a},Md=(e,t,r)=>{let i=(()=>{switch(r.keepAspectRatioPolicy){case"not_larger":return r.axes.length>0?Math.min(...r.axes.map(n=>t[n]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case"not_smaller":return r.axes.length>0?Math.max(...r.axes.map(n=>t[n]),Number.MIN_VALUE):Math.max(...t,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${r.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let a=e.slice();return r.axes.length>0?(r.axes.forEach(n=>t[n]=i),r.axes.forEach(n=>a[n]=Math.round(e[n]*t[n]))):(t.fill(i,0,t.length),a.forEach((n,s)=>a[s]=Math.round(n*t[s]))),a},Dd=(e,t,r,i,a)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> array<${e.type.value}, ${r.length}> {
      var original_indices: array<${e.type.value}, ${r.length}>;
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var scale = ${D("uniforms.scales","i",i)};
        var roi_low = ${D("uniforms.roi","i",a)};
        var roi_hi = ${D("uniforms.roi",`i + ${t.length}`,a)};
        if (scale == 1.0) {
          original_indices[i] = ${e.type.value}(output_index);
        } else {
          var input_shape_i = ${D("uniforms.input_shape","i",t.length)};
          var output_shape_i = ${D("uniforms.output_shape","i",r.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,Pd=(e,t,r,i,a,n,s)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
      var input_indices: ${e.type.indices};
      for (var i:u32 = 0; i < ${i.length}; i++) {
        var output_index = ${t.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${D("uniforms.scales","i",a)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${D("uniforms.roi","i",n)};
          var roi_hi = ${D("uniforms.roi",`i + ${r.length}`,n)};
          var input_shape_i = ${D("uniforms.input_shape","i",r.length)};
          var output_shape_i = ${D("uniforms.output_shape","i",i.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${s} || (original_idx >= 0 && original_idx < ${t.type.value}(input_shape_i))) {
            if (original_idx < 0) {
              input_index = 0;
            } else if (original_idx > ${t.type.value}(input_shape_i - 1)) {
              input_index = input_shape_i - 1;
            } else {
              input_index = u32(getNearestPixelFromOriginal(original_idx, scale < 1));
            }
          } else {
            input_index = u32(original_idx);
          }
        }
        ${e.indicesSet("input_indices","i","input_index")}
      }
      return input_indices;
    }`,Ud=(e,t)=>`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${D("uniforms.input_shape","i",t.length)}) {
          return false;
        }
      }
      return true;
    }`,Dn=(e,t,r,i)=>e.rank>i?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",r,"batch")};
`:"",Nd=(e,t,r,i,a)=>{let[n,s,o,u]=r.length===2?[-1,0,1,-1]:[0,2,3,1],l=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${l} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",s,`max(0, min(row, ${r[s]} - 1))`)};
      ${e.indicesSet("input_indices",o,`max(0, min(col, ${r[o]} - 1))`)};
      ${Dn(e,u,n,2)}
      return ${e.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${t.type.indices}) -> ${l} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${l} = originalIndices[${s}];
      var col:${l} = originalIndices[${o}];
      ${i?`if (row < 0 || row > (${r[s]} - 1) || col < 0 || col > (${r[o]} - 1)) {
        return ${a};
      }`:""};
      row = max(0, min(row, ${r[s]} - 1));
      col = max(0, min(col, ${r[o]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${r.length>2?`u32(originalIndices[${u}])`:"0"};
      var batch: u32 =  ${r.length>2?`u32(originalIndices[${n}])`:"0"};
      var x11: ${l} = getInputValue(batch, channel, row1, col1);
      var x12: ${l} = getInputValue(batch, channel, row1, col2);
      var x21: ${l} = getInputValue(batch, channel, row2, col1);
      var x22: ${l} = getInputValue(batch, channel, row2, col2);
      var dx1: ${l} = abs(row - ${l}(row1));
      var dx2: ${l} = abs(${l}(row2) - row);
      var dy1: ${l} = abs(col - ${l}(col1));
      var dy2: ${l} = abs(${l}(col2) - col);
      if (row1 == row2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (col1 == col2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      return (x11 * dx2 * dy2 + x12 * dx2 * dy1 + x21 * dx1 * dy2 + x22 * dx1 * dy1);
    }`},Ld=(e,t,r,i,a,n,s,o,u,l)=>{let d=r.length===2,[p,h]=d?[0,1]:[2,3],f=e.type.value,m=y=>{let b=y===p?"row":"col";return`
      fn ${b}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${f} {
        var output_index = ${t.indicesGet("output_indices",y)};
        var originalIdx: ${f} = getOriginalCoordinateFromResizedCoordinate(output_index, ${a[y]},
        ${i[y]}, ${r[y]}, ${n[y]}, ${n[y]} + ${r.length});
        var fractOriginalIdx: ${f} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${o} && (originalIdx < 0 || originalIdx > (${r[y]} - 1))) {
          return ${u};
        }
        var data: array<${f}, 4> = array<${f}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${b}: ${f} = originalIdx + ${f}(i);
          if (${b} < 0 || ${b} >= ${r[y]}) {
            ${l?`coefs[i + 1] = 0.0;
                        continue;`:o?`return ${u};`:`${b} = max(0, min(${b}, ${r[y]} - 1));`};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy",y,`u32(${b})`)};
          data[i + 1] = ${y===p?e.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${m(p)};
    ${m(h)};
  fn getCubicInterpolationCoefs(s: ${f}) -> array<${f}, 4> {
    var absS = abs(s);
    var coeffs: array<${f}, 4> = array<${f}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${f} = 1.0 - absS;
    var twoMinusAbsS: ${f} = 2.0 - absS;
    var onePlusAbsS: ${f} = 1.0 + absS;
    coeffs[0] = ((${s} * onePlusAbsS - 5 * ${s}) * onePlusAbsS + 8 * ${s}) * onePlusAbsS - 4 * ${s};
    coeffs[1] = ((${s} + 2) * absS - (${s} + 3)) * absS * absS + 1;
    coeffs[2] = ((${s} + 2) * oneMinusAbsS - (${s} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${s} * twoMinusAbsS - 5 * ${s}) * twoMinusAbsS + 8 * ${s}) * twoMinusAbsS - 4 * ${s};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${f}, 4>, coefs: array<${f}, 4>) -> ${f} {
    var coefsSum: ${f} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${t.type.indices}) -> ${f} {
    var input_indices: ${e.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `},qd=(e,t,r,i,a)=>{let[n,s,o,u,l]=r.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],d=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${d} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",s,`max(0, min(depth, ${r[s]} - 1))`)};
      ${e.indicesSet("input_indices",o,`max(0, min(height, ${r[o]} - 1))`)};
      ${e.indicesSet("input_indices",u,`max(0, min(width, ${r[u]} - 1))`)};
      ${Dn(e,l,n,3)}
      return ${e.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${t.type.indices}) -> ${d} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${d} = originalIndices[${s}];
      var height:${d} = originalIndices[${o}];
      var width:${d} = originalIndices[${u}];
      ${i?`if (depth < 0 || depth > (${r[s]} - 1) || height < 0 || height > (${r[o]} - 1) || width < 0 || (width > ${r[u]} - 1)) {
      return ${a};
        }`:""};

    depth = max(0, min(depth, ${r[s]} - 1));
      height = max(0, min(height, ${r[o]} - 1));
      width = max(0, min(width, ${r[u]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${r.length>3?`u32(originalIndices[${l}])`:"0"};
      var batch: u32 =  ${r.length>3?`u32(originalIndices[${n}])`:"0"};

      var x111: ${d} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${d} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${d} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${d} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${d} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${d} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${d} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${d} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${d} = abs(depth - ${d}(depth1));
      var dx2: ${d} = abs(${d}(depth2) - depth);
      var dy1: ${d} = abs(height - ${d}(height1));
      var dy2: ${d} = abs(${d}(height2) - height);
      var dz1: ${d} = abs(width - ${d}(width1));
      var dz2: ${d} = abs(${d}(width2) - width);
      if (depth1 == depth2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (height1 == height2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      if (width1 == width2) {
        dz1 = 0.5;
        dz2 = 0.5;
      }
      return (x111 * dx2 * dy2 * dz2 + x112 * dx2 * dy2 * dz1 + x121 * dx2 * dy1 *dz2 + x122 * dx2 * dy1 * dz1 +
              x211 * dx1 * dy2 * dz2 + x212 * dx1 * dy2 * dz1 + x221 * dx1 * dy1 *dz2 + x222 * dx1 * dy1 * dz1);
    }`},Vd=(e,t,r,i,a,n)=>{let s=e.dims,o=Rd(n,t.axes,s.length),u=Bd(s,i,a,t.axes),l=i.slice();i.length===0&&(l=s.map((w,x)=>w===0?1:u[x]/w),t.keepAspectRatioPolicy!=="stretch"&&(u=Md(s,l,t)));let d=V("output",e.dataType,u.length),p=C("input",e.dataType,s.length),h=M.size(u),f=s.length===u.length&&s.every((w,x)=>w===u[x]),m=t.coordinateTransformMode==="tf_crop_and_resize",y=t.extrapolationValue,b=p.type.value,_=w=>`
      ${f?"":`
      ${Ad(t.coordinateTransformMode,b)};
      ${(()=>{switch(t.mode){case"nearest":return`
              ${Ud(p,s)};
              ${Od(t.nearestMode,r,b)};
              ${Pd(p,d,s,u,l.length,o.length,m)};
              `;case"linear":return`
              ${Dd(d,s,u,l.length,o.length)};
              ${(()=>{if(s.length===2||s.length===4)return`${Nd(p,d,s,m,y)}`;if(s.length===3||s.length===5)return`${qd(p,d,s,m,y)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(s.length===2||s.length===4)return`${Ld(p,d,s,u,l,o,t.cubicCoeffA,m,t.extrapolationValue,t.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${w.registerUniform("output_size","u32").registerUniform("scales","f32",l.length).registerUniform("roi","f32",o.length).declareVariables(p,d)}
      ${w.mainStart()}
        ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${f?"output[global_idx] = input[global_idx];":`
        let output_indices = ${d.offsetToIndices("global_idx")};
        var input_indices: ${p.type.indices};
        ${(()=>{switch(t.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${p.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${t.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${s.length===2||s.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${t.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${t.cacheKey}|${r}|${l.length>0?t.mode==="cubic"?l:l.length:""}|${a.length>0?a:""}|${o.length>0?o:""}|${f}|${t.mode==="nearest"?s.length:s}`,inputDependencies:["rank"]},getShaderSource:_,getRunData:()=>({outputs:[{dims:u,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:[{type:12,data:h},{type:1,data:l},{type:1,data:o},...E(s,u)]})}},Fd=e=>{let t=e.customDataBuffer;return new Uint32Array(t,t.byteOffset,1)[0]},Wd=(e,t)=>{let r=[],i=[],a=[],n=Fd(e);if(t.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");Cd(e.inputs,t,n,r,i,a),e.compute(Vd(e.inputs[0],t,n,r,i,a),{inputs:[0]})},Gd=e=>{let t=e.antialias,r=e.axes,i=e.coordinateTransformMode,a=e.cubicCoeffA,n=e.excludeOutside!==0,s=e.extrapolationValue,o=e.keepAspectRatioPolicy,u=e.mode,l=e.nearestMode===""?"simple":e.nearestMode;return g({antialias:t,axes:r,coordinateTransformMode:i,cubicCoeffA:a,excludeOutside:n,extrapolationValue:s,keepAspectRatioPolicy:o,mode:u,nearestMode:l})}}),jd,Hd,Kd,Fc=I(()=>{le(),ne(),H(),jd=e=>{if(!e||e.length<3)throw new Error("layerNorm requires at least 3 inputs.");let t=e[0],r=e[1],i=e[2];if(t.dataType!==r.dataType||t.dataType!==i.dataType)throw new Error("All inputs must have the same data type");if(t.dims.length!==3&&t.dims.length!==2)throw new Error("Input must be 2D or 3D");if(r.dims.length!==3&&r.dims.length!==2)throw new Error("Skip must be 2D or 3D");let a=t.dims[t.dims.length-1],n=t.dims[t.dims.length-2];if(r.dims[r.dims.length-1]!==a)throw new Error("Skip must have the same hidden size as input");if(r.dims[r.dims.length-2]!==n)throw new Error("Skip must have the same sequence length as input");if(i.dims.length!==1)throw new Error("Gamma must be 1D");if(i.dims[i.dims.length-1]!==a)throw new Error("Gamma must have the same hidden size as input");if(e.length>3){let s=e[3];if(s.dims.length!==1)throw new Error("Beta must be 1D");if(s.dims[s.dims.length-1]!==a)throw new Error("Beta must have the same hidden size as input")}if(e.length>4){let s=e[4];if(s.dims.length!==1)throw new Error("Bias must be 1D");if(s.dims[s.dims.length-1]!==a)throw new Error("Bias must have the same hidden size as input")}},Hd=(e,t,r,i)=>{let a=t.simplified,n=e[0].dims,s=M.size(n),o=n,u=s,l=n.slice(-1)[0],d=i?n.slice(0,-1).concat(1):[],p=!a&&e.length>3,h=e.length>4,f=i&&r>1,m=i&&r>2,y=r>3,b=64,_=A(l),w=[{type:12,data:u},{type:12,data:_},{type:12,data:l},{type:1,data:t.epsilon}],x=k=>{let B=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],R=[C("x",e[0].dataType,e[0].dims,_),C("skip",e[1].dataType,e[1].dims,_),C("gamma",e[2].dataType,e[2].dims,_)];p&&R.push(C("beta",e[3].dataType,e[3].dims,_)),h&&R.push(C("bias",e[4].dataType,e[4].dims,_)),R.push(V("output",e[0].dataType,o,_)),f&&R.push(V("mean_output",1,d)),m&&R.push(V("inv_std_output",1,d)),y&&R.push(V("input_skip_bias_sum",e[0].dataType,o,_));let P=O(e[0].dataType),F=O(1,_);return`

      ${k.registerUniforms(B).declareVariables(...R)}
      var<workgroup> sum_shared : array<${F}, ${b}>;
      var<workgroup> sum_squared_shared : array<${F}, ${b}>;

      ${k.mainStart([b,1,1])}
        let ix = local_id.x;
        let iy = global_id.x / ${b};

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / ${b};
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == ${b-1}) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${h?"bias[offset1d + i]":P+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${y?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${N(P,_,"value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = ${b};
        for (var curr_size = reduce_size >> 1;  curr_size > 0; curr_size = reduce_size >> 1) {
          reduce_size = curr_size + (reduce_size & 1);
          if (ix < curr_size) {
            sum_shared[ix] += sum_shared[ix + reduce_size];
            sum_squared_shared[ix] += sum_squared_shared[ix + reduce_size];
          }
          workgroupBarrier();
        }

        let sum = sum_shared[0];
        let square_sum = sum_squared_shared[0];
        let mean = ${L("sum",_)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${L("square_sum",_)} / f32(uniforms.hidden_size) ${a?"":"- mean * mean"} + uniforms.epsilon);
        ${f?"mean_output[global_idx] = mean;":""}
        ${m?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${a?"":`- ${P}(mean)`}) *
            ${P}(inv_std_dev) * gamma[offset1d + i]
            ${p?"+ beta[offset1d + i]":""};
        }
      }`},v=[{dims:o,dataType:e[0].dataType}];return r>1&&v.push({dims:d,dataType:1}),r>2&&v.push({dims:d,dataType:1}),r>3&&v.push({dims:n,dataType:e[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${_};${f};${m};${y}`,inputDependencies:e.map((k,B)=>"type")},getShaderSource:x,getRunData:()=>({outputs:v,dispatchGroup:{x:Math.ceil(u/l)},programUniforms:w})}},Kd=(e,t)=>{jd(e.inputs);let r=[0];e.outputCount>1&&r.push(-3),e.outputCount>2&&r.push(-3),e.outputCount>3&&r.push(3),e.compute(Hd(e.inputs,t,e.outputCount,!1),{outputs:r})}}),Zd,ra,Qd,Pn,Xd,Yd,Jd,ep,Wc=I(()=>{le(),ne(),$(),H(),Zd=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");if(t.axes.length!==0){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(t.starts.length!==t.ends.length)throw new Error("starts and ends must have the same length");e.slice(1).forEach((r,i)=>{if(e[i+1].dataType!==6&&e[i+1].dataType!==7)throw new Error(`Input ${i} must be an array of int32 or int64`)})},ra=(e,t)=>{let r=[];if(e.length>t)if(e[t].dataType===7)e[t].getBigInt64Array().forEach(i=>r.push(Number(i)));else if(e[t].dataType===6)e[t].getInt32Array().forEach(i=>r.push(Number(i)));else throw new Error(`Input ${t} must be an array of int32 or int64`);return r},Qd=(e,t)=>{if(e.length>1){let r=ra(e,1),i=ra(e,2),a=ra(e,3);return a.length===0&&(a=[...Array(e[0].dims.length).keys()]),g({starts:r,ends:i,axes:a})}else return t},Pn=(e,t,r,i,a)=>{let n=e;return e<0&&(n+=r[i[t]]),a[t]<0?Math.max(0,Math.min(n,r[i[t]]-1)):Math.max(0,Math.min(n,r[i[t]]))},Xd=(e,t,r)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
          var input_indices: ${e.type.indices};
          var carry = 0u;
          for (var i = ${r.length}; i >= 0; i--) {
            let input_shape_i = ${D("uniforms.input_shape","i",r.length)};
            let steps_i = ${D("uniforms.steps","i",r.length)};
            let signs_i = ${D("uniforms.signs","i",r.length)};
            let starts_i = ${D("uniforms.starts","i",r.length)};
            var output_index = ${t.indicesGet("output_indices","i")};
            var input_index = output_index * steps_i + starts_i + carry;
            carry = input_index / input_shape_i;
            input_index = input_index % input_shape_i;
            if (signs_i < 0) {
              input_index = input_shape_i - input_index - 1u + starts_i;
            }
            ${e.indicesSet("input_indices","i","input_index")};
          }
          return input_indices;
      }`,Yd=(e,t)=>{let r=e[0].dims,i=M.size(r),a=t.axes.length>0?M.normalizeAxes(t.axes,r.length):[...Array(r.length).keys()],n=ra(e,4);n.forEach(_=>_!==0||(()=>{throw new Error("step cannot be 0")})),n.length===0&&(n=Array(a.length).fill(1));let s=t.starts.map((_,w)=>Pn(_,w,r,a,n)),o=t.ends.map((_,w)=>Pn(_,w,r,a,n));if(a.length!==s.length||a.length!==o.length)throw new Error("start, ends and axes should have the same number of elements");if(a.length!==r.length)for(let _=0;_<r.length;++_)a.includes(_)||(s.splice(_,0,0),o.splice(_,0,r[_]),n.splice(_,0,1));let u=n.map(_=>Math.sign(_));n.forEach((_,w,x)=>{if(_<0){let v=(o[w]-s[w])/_,k=s[w],B=k+v*n[w];s[w]=B,o[w]=k,x[w]=-_}});let l=r.slice(0);a.forEach((_,w)=>{l[_]=Math.ceil((o[_]-s[_])/n[_])});let d={dims:l,dataType:e[0].dataType},p=V("output",e[0].dataType,l.length),h=C("input",e[0].dataType,e[0].dims.length),f=M.size(l),m=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:s.length},{name:"signs",type:"i32",length:u.length},{name:"steps",type:"u32",length:n.length}],y=[{type:12,data:f},{type:12,data:s},{type:6,data:u},{type:12,data:n},...E(e[0].dims,l)],b=_=>`
      ${_.registerUniforms(m).declareVariables(h,p)}
        ${Xd(h,p,r)}
        ${_.mainStart()}
          ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${p.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${p.setByOffset("global_idx",h.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${u.length}_${s.length}_${n.length}`,inputDependencies:["rank"]},getShaderSource:b,getRunData:()=>({outputs:[d],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:y})}},Jd=(e,t)=>{Zd(e.inputs,t);let r=Qd(e.inputs,t);e.compute(Yd(e.inputs,r),{inputs:[0]})},ep=e=>{let t=e.starts,r=e.ends,i=e.axes;return g({starts:t,ends:r,axes:i})}}),tp,rp,ip,ap,Gc=I(()=>{le(),ne(),$(),ot(),H(),tp=e=>{if(!e||e.length!==1)throw new Error("Softmax op requires 1 input.")},rp=(e,t)=>{let r=e.inputs[0],i=r.dims,a=M.size(i),n=i.length,s=M.normalizeAxis(t.axis,n),o=s<i.length-1,u,l=[];o?(l=Array.from({length:n},(R,P)=>P),l[s]=n-1,l[n-1]=s,u=e.compute(He(r,l),{inputs:[r],outputs:[-1]})[0]):u=r;let d=u.dims,p=d[n-1],h=a/p,f=A(p),m=p/f,y=64;h===1&&(y=256);let b=(R,P)=>P===4?`max(max(${R}.x, ${R}.y), max(${R}.z, ${R}.w))`:P===2?`max(${R}.x, ${R}.y)`:P===3?`max(max(${R}.x, ${R}.y), ${R}.z)`:R,_=C("x",u.dataType,u.dims,f),w=V("result",u.dataType,u.dims,f),x=_.type.value,v=O(u.dataType)==="f32"?`var threadMax = ${x}(-3.402823e+38f);`:`var threadMax = ${x}(-65504.0h);`,k=R=>`
      var<workgroup> rowMaxShared : ${x};
      var<workgroup> rowSumShared : ${x};
      var<workgroup> threadShared : array<${x}, ${y}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${x} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${x}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${R.registerUniform("packedCols","i32").declareVariables(_,w)}
      ${R.mainStart(y)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${y};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${v}
        for (var col = lindex; col < cols; col += wg) {
          let value = getValue(row, col, row_stride);
          threadMax = max(threadMax, value);
        }
        if (lindex < cols) {
          threadShared[lindex] = threadMax;
        }
        workgroupBarrier();

        var reduceSize = min(cols, wg);
        for (var currSize = reduceSize >> 1;  currSize > 0; currSize = reduceSize >> 1) {
          reduceSize = currSize + (reduceSize & 1);
          if (lindex < currSize) {
            threadShared[lindex] = max(threadShared[lindex], threadShared[lindex + reduceSize]);
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowMaxShared = ${x}(${b("threadShared[0]",f)});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${x}(0.0);
        for (var col = lindex; col < cols; col += wg) {
          let subExp = exp(getValue(row, col, row_stride) - rowMaxShared);
          threadSum += subExp;
        }
        threadShared[lindex] = threadSum;
        workgroupBarrier();

        for (var currSize = wg >> 1;  currSize > 0; currSize = currSize >> 1) {
          if (lindex < currSize) {
            threadShared[lindex] = threadShared[lindex] + threadShared[lindex + currSize];
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowSumShared = ${x}(${L("threadShared[0]",f)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          let value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          setValue(row, col, row_stride, value);
        }
      }`,B=e.compute({name:"Softmax",shaderCache:{hint:`${f};${y}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:d,dataType:u.dataType}],dispatchGroup:{x:h},programUniforms:[{type:6,data:m}]}),getShaderSource:k},{inputs:[u],outputs:[o?-1:0]})[0];o&&e.compute(He(B,l),{inputs:[B]})},ip=(e,t)=>{tp(e.inputs),rp(e,t)},ap=e=>g({axis:e.axis})}),Un,np,sp,op,up,jc=I(()=>{le(),ne(),H(),Un=e=>Array.from(e.getBigInt64Array(),Number),np=e=>{if(!e||e.length!==2)throw new Error("Tile requires 2 inputs.");if(e[0].dataType!==1&&e[0].dataType!==10&&e[0].dataType!==6&&e[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(e[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(e[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(Un(e[1]).length!==e[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},sp=(e,t)=>{let r=[];for(let i=0;i<e.length;++i)r.push(e[i]*t[i]);return r},op=(e,t)=>{let r=e[0].dims,i=t??Un(e[1]),a=sp(r,i),n=M.size(a),s=e[0].dataType,o=C("input",s,r.length),u=V("output",s,a.length),l=d=>`
      const inputShape = ${o.indices(...r)};
      ${d.registerUniform("output_size","u32").declareVariables(o,u)}
      ${d.mainStart()}
      ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${u.offsetToIndices("global_idx")};
      var input_indices: ${o.type.indices};
      for (var i = 0; i < ${r.length}; i++) {
        let input_dim_i = ${o.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${u.indicesGet("output_indices","i")}  % input_dim_i;

        ${o.indicesSet("input_indices","i","input_dim_value")}
      }
      ${u.setByOffset("global_idx",o.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${i}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:a,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:[{type:12,data:n},...E(e[0].dims,a)]}),getShaderSource:l}},up=e=>{np(e.inputs),e.compute(op(e.inputs),{inputs:[0]})}}),lp,dp,pp,Hc=I(()=>{le(),ne(),H(),lp=(e,t,r,i,a)=>{let n=V("output_data",a,r.length,4),s=C("a_data",t[1].dataType,t[1].dims.length,4),o=C("b_data",t[2].dataType,t[2].dims.length,4),u=C("c_data",t[0].dataType,t[0].dims.length,4),l,d=(p,h,f)=>`select(${h}, ${p}, ${f})`;if(!i)l=n.setByOffset("global_idx",d(s.getByOffset("global_idx"),o.getByOffset("global_idx"),u.getByOffset("global_idx")));else{let p=(h,f,m="")=>{let y=`a_data[index_a${f}][component_a${f}]`,b=`b_data[index_b${f}][component_b${f}]`,_=`bool(c_data[index_c${f}] & (0xffu << (component_c${f} * 8)))`;return`
            let output_indices${f} = ${n.offsetToIndices(`global_idx * 4u + ${f}u`)};
            let offset_a${f} = ${s.broadcastedIndicesToOffset(`output_indices${f}`,n)};
            let offset_b${f} = ${o.broadcastedIndicesToOffset(`output_indices${f}`,n)};
            let offset_c${f} = ${u.broadcastedIndicesToOffset(`output_indices${f}`,n)};
            let index_a${f} = offset_a${f} / 4u;
            let index_b${f} = offset_b${f} / 4u;
            let index_c${f} = offset_c${f} / 4u;
            let component_a${f} = offset_a${f} % 4u;
            let component_b${f} = offset_b${f} % 4u;
            let component_c${f} = offset_c${f} % 4u;
            ${h}[${f}] = ${m}(${d(y,b,_)});
          `};a===9?l=`
            var data = vec4<u32>(0);
            ${p("data",0,"u32")}
            ${p("data",1,"u32")}
            ${p("data",2,"u32")}
            ${p("data",3,"u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:l=`
            ${p("output_data[global_idx]",0)}
            ${p("output_data[global_idx]",1)}
            ${p("output_data[global_idx]",2)}
            ${p("output_data[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(u,s,o,n)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${l}
      }`},dp=e=>{let t=e[1].dims,r=e[2].dims,i=e[0].dims,a=e[1].dataType,n=!(M.areEqual(t,r)&&M.areEqual(r,i)),s=t,o=M.size(t);if(n){let l=Ut.calcShape(Ut.calcShape(t,r,!1),i,!1);if(!l)throw new Error("Can't perform where op on the given tensors");s=l,o=M.size(s)}let u=Math.ceil(o/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:l=>lp(l,e,s,n,a),getRunData:()=>({outputs:[{dims:s,dataType:a}],dispatchGroup:{x:Math.ceil(o/64/4)},programUniforms:[{type:12,data:u},...E(i,t,r,s)]})}},pp=e=>{e.compute(dp(e.inputs))}}),cp,Kc=I(()=>{uc(),Xa(),lc(),dc(),pc(),cc(),hc(),wc(),bc(),$c(),vc(),xc(),Sc(),Tc(),Ec(),kc(),Ic(),zc(),Cc(),Ac(),Oc(),Rc(),Bc(),Mc(),Dc(),Sl(),Pc(),Uc(),Nc(),Lc(),qc(),Ka(),Vc(),Bl(),Fc(),Wc(),Gc(),Al(),jc(),ot(),tn(),Hc(),cp=new Map([["Abs",[Gs]],["Acos",[js]],["Acosh",[Hs]],["Add",[Mo]],["ArgMax",[Cs,Qa]],["ArgMin",[zs,Qa]],["Asin",[Ks]],["Asinh",[Zs]],["Atan",[Qs]],["Atanh",[Xs]],["Attention",[Ds]],["AveragePool",[dd,ld]],["BatchNormalization",[Ls]],["BiasAdd",[Fs]],["BiasSplitGelu",[Oo]],["Cast",[Js,Ys]],["Ceil",[ro]],["Clip",[to]],["Concat",[Zo,Qo]],["Conv",[mn,hn]],["ConvTranspose",[xu,bu]],["Cos",[io]],["Cosh",[ao]],["CumSum",[Tu,Eu]],["DepthToSpace",[Cu,Au]],["DequantizeLinear",[_d,bd]],["Div",[Do]],["Einsum",[Pu,Uu]],["Elu",[no,Qi]],["Equal",[Po]],["Erf",[so]],["Exp",[oo]],["Expand",[Vu]],["FastGelu",[Wu]],["Floor",[uo]],["FusedConv",[mn,hn]],["Gather",[Ku,Hu]],["GatherElements",[nl,al]],["GatherBlockQuantized",[el,tl]],["GatherND",[Qu,Xu]],["Gelu",[lo]],["Gemm",[ll,ul]],["GlobalAveragePool",[cd,pd]],["GlobalMaxPool",[gd,md]],["Greater",[qo]],["GreaterOrEqual",[Fo]],["GridSample",[wl,_l]],["GroupQueryAttention",[Ul]],["HardSigmoid",[wo,yo]],["InstanceNormalization",[ql]],["LayerNormalization",[Wl]],["LeakyRelu",[po,Qi]],["Less",[Vo]],["LessOrEqual",[Wo]],["Log",[Eo]],["MatMul",[jl]],["MatMulNBits",[Ql,Xl]],["MaxPool",[hd,fd]],["Mul",[Uo]],["MultiHeadAttention",[xl,$l]],["Neg",[ho]],["Not",[co]],["Pad",[sd]],["Pow",[No]],["QuickGelu",[zo,Qi]],["Range",[xd]],["Reciprocal",[fo]],["ReduceMin",[Ss]],["ReduceMean",[_s]],["ReduceMax",[xs]],["ReduceSum",[Es]],["ReduceProd",[Ts]],["ReduceL1",[bs]],["ReduceL2",[$s]],["ReduceLogSum",[Is]],["ReduceLogSumExp",[vs]],["ReduceSumSquare",[ks]],["Relu",[mo]],["Resize",[Wd,Gd]],["RotaryEmbedding",[Rl]],["ScatterND",[kd,Ed]],["Sigmoid",[go]],["Sin",[_o]],["Sinh",[bo]],["Slice",[Jd,ep]],["SkipLayerNormalization",[Kd]],["Split",[zl,Cl]],["Sqrt",[$o]],["Softmax",[ip,ap]],["Sub",[Lo]],["Tan",[vo]],["Tanh",[xo]],["ThresholdedRelu",[To,Qi]],["Tile",[up]],["Transpose",[Hi,Ce]],["Where",[pp]]])}),hp,Zc=I(()=>{it(),yt(),H(),hp=class{constructor(e){this.backend=e,this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,t){this.repo.set(e,t)}run(e,t,r,i,a){et(e.programInfo.name);let n=this.backend.device,s=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let o=[];for(let l of t)o.push({binding:o.length,resource:{buffer:l.buffer}});for(let l of r)o.push({binding:o.length,resource:{buffer:l.buffer}});a&&o.push({binding:o.length,resource:a});let u=n.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:o,label:e.programInfo.name});if(this.backend.sessionStatus==="capturing"){let l={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:u,dispatchGroup:i};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(l)}s.setPipeline(e.computePipeline),s.setBindGroup(0,u),s.dispatchWorkgroups(...i),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),Xe(e.programInfo.name)}dispose(){}build(e,t){et(e.name);let r=this.backend.device,i=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"}].forEach(l=>{r.features.has(l.feature)&&i.push(`enable ${l.extension};`)});let a=ve(t,this.backend.device.limits),n=e.getShaderSource(a),s=`${i.join(`
`)}
${a.additionalImplementations}
${n}`,o=r.createShaderModule({code:s,label:e.name});Ie("verbose",()=>`[WebGPU] ${e.name} shader code: ${s}`);let u=r.createComputePipeline({compute:{module:o,entryPoint:"main"},layout:"auto",label:e.name});return Xe(e.name),{programInfo:e,computePipeline:u,uniformVariablesInfo:a.variablesInfo}}normalizeDispatchGroupSize(e){let t=typeof e=="number"?e:e.x,r=typeof e=="number"?1:e.y||1,i=typeof e=="number"?1:e.z||1,a=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(t<=a&&r<=a&&i<=a)return[t,r,i];let n=t*r*i,s=Math.ceil(Math.sqrt(n));if(s>a){if(s=Math.ceil(Math.cbrt(n)),s>a)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[s,s,s]}else return[s,s,1]}}}),fp={};X(fp,{WebGpuBackend:()=>wp});var mp,gp,yp,wp,Qc=I(()=>{it(),le(),yt(),rr(),ja(),Kc(),Zc(),mp=(e,t)=>{if(t.length!==e.length)throw new Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let r=[];for(let i=0;i<e.length;++i){let a=e[i].dataType;switch(t[i]){case"none":{r.push("");break}case"type":{r.push(`${a}`);break}case"rank":{let n=e[i].dims.length;r.push(`${a};${n}`);break}case"dims":{let n=e[i].dims.join(",");r.push(`${a};${n}`);break}default:throw new Error(`unsupported input dependency: ${t[i]}`)}}return r.join("|")},gp=(e,t,r)=>{let i=e.name;return e.shaderCache?.hint&&(i+="["+e.shaderCache.hint+"]"),i+=":"+r+`:${mp(t,e.shaderCache?.inputDependencies??new Array(t.length).fill("dims"))}`,i},yp=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},wp=class{constructor(){this.currentSessionId=null,this.currentKernelId=null,this.commandEncoder=null,this.computePassEncoder=null,this.maxDispatchNumber=16,this.pendingDispatchNumber=0,this.pendingKernels=[],this.pendingQueries=new Map,this.sessionStatus="default",this.capturedCommandList=new Map,this.capturedPendingKernels=new Map,this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,t){this.env=e;let r=[],i={requiredLimits:{maxComputeWorkgroupStorageSize:t.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:t.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:t.limits.maxStorageBufferBindingSize,maxBufferSize:t.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:t.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:t.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:t.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:t.limits.maxComputeWorkgroupSizeZ},requiredFeatures:r},a=n=>t.features.has(n)&&r.push(n)&&!0;a("chromium-experimental-timestamp-query-inside-passes")||a("timestamp-query"),a("shader-f16"),a("subgroups"),this.device=await t.requestDevice(i),this.adapterInfo=new yp(t.info||await t.requestAdapterInfo()),this.gpuDataManager=ga(this),this.programManager=new hp(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,Qr(e.logLevel,!!e.debug),this.device.onuncapturederror=n=>{n.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${n.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:t,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),t={};this.queryType==="at-passes"&&(t.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=e.beginComputePass(t)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;et(),this.endComputePass();let e;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),e=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&e.mapAsync(GPUMapMode.READ).then(()=>{let t=new BigUint64Array(e.getMappedRange()),r=this.pendingQueries.get(e);for(let i=0;i<t.length/2;i++){let a=r[i],n=a.kernelId,s=this.kernels.get(n),o=s.kernelType,u=s.kernelName,l=a.programName,d=a.inputTensorViews,p=a.outputTensorViews,h=t[i*2],f=t[i*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=h);let m=Number(h-this.queryTimeBase),y=Number(f-this.queryTimeBase);if(!Number.isSafeInteger(m)||!Number.isSafeInteger(y))throw new RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:d.map(b=>({dims:b.dims,dataType:ft(b.dataType)})),outputsMetadata:p.map(b=>({dims:b.dims,dataType:ft(b.dataType)})),kernelId:n,kernelType:o,kernelName:u,programName:l,startTime:m,endTime:y});else{let b="";d.forEach((w,x)=>{b+=`input[${x}]: [${w.dims}] | ${ft(w.dataType)}, `});let _="";p.forEach((w,x)=>{_+=`output[${x}]: [${w.dims}] | ${ft(w.dataType)}, `}),console.log(`[profiling] kernel "${n}|${o}|${u}|${l}" ${b}${_}execution time: ${y-m} ns`)}Dt("GPU",`${l}::${h}::${f}`)}e.unmap(),this.pendingQueries.delete(e)}),Xe()}run(e,t,r,i,a,n){et(e.name);let s=[];for(let w=0;w<t.length;++w){let x=t[w].data;if(x===0)continue;let v=this.gpuDataManager.get(x);if(!v)throw new Error(`no GPU data for input: ${x}`);s.push(v)}let{outputs:o,dispatchGroup:u,programUniforms:l}=e.getRunData(t),d=r.length===0?o.map((w,x)=>x):r;if(d.length!==o.length)throw new Error(`Output size ${d.length} must be equal to ${o.length}.`);let p=[],h=[];for(let w=0;w<o.length;++w){if(!Number.isInteger(d[w])||d[w]<-3||d[w]>=n)throw new Error(`Invalid output index: ${d[w]}`);if(d[w]===-3)continue;let x=d[w]===-1,v=d[w]===-2,k=x||v?a(o[w].dataType,o[w].dims):i(d[w],o[w].dataType,o[w].dims);if(p.push(k),k.data===0)continue;let B=this.gpuDataManager.get(k.data);if(!B)throw new Error(`no GPU data for output: ${k.data}`);if(x&&this.temporaryData.push(B),v){let R=this.kernelPersistentData.get(this.currentKernelId);R||(R=[],this.kernelPersistentData.set(this.currentKernelId,R)),R.push(B)}h.push(B)}if(s.length!==t.length||h.length!==p.length){if(h.length===0)return Xe(e.name),p;throw new Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let f;if(l){let w=0,x=[];l.forEach(R=>{let P=typeof R.data=="number"?[R.data]:R.data;if(P.length===0)return;let F=R.type===10?2:4,Z,ce;R.type===10?(ce=P.length>4?16:P.length>2?8:P.length*F,Z=P.length>4?16:F*P.length):(ce=P.length<=2?P.length*F:16,Z=16),w=Math.ceil(w/ce)*ce,x.push(w);let re=R.type===10?8:4;w+=P.length>4?Math.ceil(P.length/re)*Z:P.length*F});let v=16;w=Math.ceil(w/v)*v;let k=new ArrayBuffer(w);l.forEach((R,P)=>{let F=x[P],Z=typeof R.data=="number"?[R.data]:R.data;if(R.type===6)new Int32Array(k,F,Z.length).set(Z);else if(R.type===12)new Uint32Array(k,F,Z.length).set(Z);else if(R.type===10)new Uint16Array(k,F,Z.length).set(Z);else if(R.type===1)new Float32Array(k,F,Z.length).set(Z);else throw new Error(`Unsupported uniform type: ${ft(R.type)}`)});let B=this.gpuDataManager.create(w,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(B.buffer,0,k,0,w),this.gpuDataManager.release(B.id),f={offset:0,size:w,buffer:B.buffer}}let m=this.programManager.normalizeDispatchGroupSize(u),y=m[1]===1&&m[2]===1,b=gp(e,t,y),_=this.programManager.getArtifact(b);if(_||(_=this.programManager.build(e,m),this.programManager.setArtifact(b,_),Ie("info",()=>`[artifact] key: ${b}, programName: ${e.name}`)),l&&_.uniformVariablesInfo){if(l.length!==_.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${_.uniformVariablesInfo.length}, got ${l.length} in program "${_.programInfo.name}".`);for(let w=0;w<l.length;w++){let x=l[w],v=x.type,k=typeof x.data=="number"?1:x.data.length,[B,R]=_.uniformVariablesInfo[w];if(v!==B||k!==R)throw new Error(`Uniform variable ${w} mismatch: expect type ${B} with size ${R}, got type ${v} with size ${k} in program "${_.programInfo.name}".`)}}if(Ie("info",()=>`[ProgramManager] run "${e.name}" (key=${b}) with ${m[0]}x${m[1]}x${m[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let w={kernelId:this.currentKernelId,programName:_.programInfo.name,inputTensorViews:t,outputTensorViews:p};this.pendingKernels.push(w),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(w)}return this.programManager.run(_,s,h,m,f),Xe(e.name),p}upload(e,t){this.gpuDataManager.upload(e,t)}memcpy(e,t){this.gpuDataManager.memcpy(e,t)}async download(e,t){await this.gpuDataManager.download(e,t)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,t,r,i){let a=cp.get(e);if(!a)throw new Error(`kernel not implemented: ${e}`);let n={kernelType:e,kernelName:i,kernelEntry:a[0],attributes:[a[1],r]};this.kernels.set(t,n)}releaseKernel(e){let t=this.kernelPersistentData.get(e);if(t){for(let r of t)this.gpuDataManager.release(r.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,t,r){let i=this.kernels.get(e);if(!i)throw new Error(`kernel not created: ${e}`);let a=i.kernelType,n=i.kernelName,s=i.kernelEntry,o=i.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${a}] ${n}" is not allowed to be called recursively`);this.currentKernelId=e,o[0]&&(o[1]=o[0](o[1]),o[0]=void 0),Ie("info",()=>`[WebGPU] Start to run kernel "[${a}] ${n}"...`);let u=this.env.debug;this.temporaryData=[];try{return u&&this.device.pushErrorScope("validation"),s(t,o[1]),0}catch(l){return r.push(Promise.resolve(`[WebGPU] Kernel "[${a}] ${n}" failed. ${l}`)),1}finally{u&&r.push(this.device.popErrorScope().then(l=>l?`GPU validation error for kernel "[${a}] ${n}": ${l.message}`:null));for(let l of this.temporaryData)this.gpuDataManager.release(l.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,t,r,i){let a=this.sessionExternalDataMapping.get(e);a||(a=new Map,this.sessionExternalDataMapping.set(e,a));let n=a.get(t),s=this.gpuDataManager.registerExternalBuffer(r,i,n);return a.set(t,[s,r]),s}unregisterBuffers(e){let t=this.sessionExternalDataMapping.get(e);t&&(t.forEach(r=>this.gpuDataManager.unregisterExternalBuffer(r[0])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let t=this.gpuDataManager.get(e);if(!t)throw new Error(`no GPU data for buffer: ${e}`);return t.buffer}createDownloader(e,t,r){return async()=>{let i=await Wi(this,e,t);return Nt(i.buffer,r)}}writeTimestamp(e){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){Ie("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){Ie("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){Ie("info","replay"),this.sessionStatus="replaying";let e=this.capturedCommandList.get(this.currentSessionId),t=this.capturedPendingKernels.get(this.currentSessionId),r=e.length;this.pendingKernels=[];for(let i=0;i<r;i++){let a=this.getComputePassEncoder(),n=e[i];this.writeTimestamp(this.pendingDispatchNumber*2),a.setPipeline(n.computePipeline),a.setBindGroup(0,n.bindGroup),a.dispatchWorkgroups(...n.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(t[i]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}}),_p={};X(_p,{init:()=>$p});var za,bp,$p,Xc=I(()=>{le(),yt(),ne(),Fi(),za=class ic{constructor(t,r,i,a){this.module=t,this.dataType=r,this.data=i,this.dims=a}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let t=M.size(this.dims);return t===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,t)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let t=M.size(this.dims);return t===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,t)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let t=M.size(this.dims);return t===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,t)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let t=M.size(this.dims);return t===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,t)}reshape(t){if(M.size(t)!==M.size(this.dims))throw new Error("Invalid new shape");return new ic(this.module,this.dataType,this.data,t)}},bp=class{constructor(e,t,r){this.module=e,this.backend=t,this.customDataOffset=0,this.customDataSize=0,this.adapterInfo=t.adapterInfo;let i=e.PTR_SIZE,a=r/e.PTR_SIZE,n=i===4?"i32":"i64";this.opKernelContext=Number(e.getValue(i*a++,n));let s=Number(e.getValue(i*a++,n));this.outputCount=Number(e.getValue(i*a++,n)),this.customDataOffset=Number(e.getValue(i*a++,"*")),this.customDataSize=Number(e.getValue(i*a++,n));let o=[];for(let u=0;u<s;u++){let l=Number(e.getValue(i*a++,n)),d=Number(e.getValue(i*a++,"*")),p=Number(e.getValue(i*a++,n)),h=[];for(let f=0;f<p;f++)h.push(Number(e.getValue(i*a++,n)));o.push(new za(e,l,d,h))}this.inputs=o}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(e,t){let r=t?.inputs?.map(s=>typeof s=="number"?this.inputs[s]:s)??this.inputs,i=t?.outputs??[],a=(s,o,u)=>new za(this.module,o,this.output(s,u),u),n=(s,o)=>{let u=mt(s,o);if(!u)throw new Error(`Unsupported data type: ${s}`);let l=u>0?this.backend.gpuDataManager.create(u).id:0;return new za(this.module,s,l,o)};return this.backend.run(e,r,i,a,n,this.outputCount)}output(e,t){let r=this.module.stackSave();try{let i=this.module.PTR_SIZE,a=i===4?"i32":"i64",n=this.module.stackAlloc((1+t.length)*i);this.module.setValue(n,t.length,a);for(let s=0;s<t.length;s++)this.module.setValue(n+i*(s+1),t[s],a);return this.module._JsepOutput(this.opKernelContext,e,n)}catch(i){throw new Error(`Failed to generate kernel's output[${e}] with dims [${t}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${i}`)}finally{this.module.stackRestore(r)}}},$p=async(e,t,r,i)=>{let a=t.jsepInit;if(!a)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(e==="webgpu"){let n=(Qc(),Te(fp)).WebGpuBackend,s=new n;await s.initialize(r,i),a("webgpu",[s,o=>s.alloc(Number(o)),o=>s.free(o),(o,u,l,d=!1)=>{if(d)Ie("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(o)}, dst=${Number(u)}, size=${Number(l)}`),s.memcpy(Number(o),Number(u));else{Ie("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(o)}, gpuDataId=${Number(u)}, size=${Number(l)}`);let p=t.HEAPU8.subarray(Number(o>>>0),Number(o>>>0)+Number(l));s.upload(Number(u),p)}},async(o,u,l)=>{Ie("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${o}, dataOffset=${u}, size=${l}`),await s.download(Number(o),()=>t.HEAPU8.subarray(Number(u)>>>0,Number(u+l)>>>0))},(o,u,l)=>s.createKernel(o,Number(u),l,t.UTF8ToString(t._JsepGetNodeName(Number(u)))),o=>s.releaseKernel(o),(o,u,l,d)=>{Ie("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${l}, kernel=${o}, contextDataOffset=${u}`);let p=new bp(t,s,Number(u));return s.computeKernel(Number(o),p,d)},()=>s.captureBegin(),()=>s.captureEnd(),()=>s.replay()])}else{let n=new Vi(r);a("webnn",[n,()=>n.reserveTensorId(),s=>n.releaseTensorId(s),async(s,o,u,l,d)=>n.ensureTensor(s,o,u,l,d),(s,o)=>{n.uploadTensor(s,o)},async(s,o)=>n.downloadTensor(s,o)])}}}),vp,Nn,Ln,sr,xp,qn,Ca,Vn,Fn,Wn,Gn,jn,Hn,Sp=I(()=>{Wa(),Ga(),le(),ct(),Er(),Di(),vp=(e,t)=>{pe()._OrtInit(e,t)!==0&&se("Can't initialize onnxruntime.")},Nn=async e=>{vp(e.wasm.numThreads,Ir(e.logLevel))},Ln=async(e,t)=>{pe().asyncInit?.();{let r=(Xc(),Te(_p)).init;if(t==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");let i=e.webgpu.adapter;if(i){if(typeof i.limits!="object"||typeof i.features!="object"||typeof i.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let a=e.webgpu.powerPreference;if(a!==void 0&&a!=="low-power"&&a!=="high-performance")throw new Error(`Invalid powerPreference setting: "${a}"`);let n=e.webgpu.forceFallbackAdapter;if(n!==void 0&&typeof n!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${n}"`);if(i=await navigator.gpu.requestAdapter({powerPreference:a,forceFallbackAdapter:n}),!i)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}await r("webgpu",pe(),e,i)}if(t==="webnn"){if(typeof navigator>"u"||!navigator.ml)throw new Error("WebNN is not supported in current environment");await r("webnn",pe(),e)}}},sr=new Map,xp=e=>{let t=pe(),r=t.stackSave();try{let i=t.PTR_SIZE,a=t.stackAlloc(2*i);t._OrtGetInputOutputCount(e,a,a+i)!==0&&se("Can't get session input/output count.");let n=i===4?"i32":"i64";return[Number(t.getValue(a,n)),Number(t.getValue(a+i,n))]}finally{t.stackRestore(r)}},qn=(e,t)=>{let r=pe(),i=r.stackSave(),a=0;try{let n=r.PTR_SIZE,s=r.stackAlloc(2*n);r._OrtGetInputOutputMetadata(e,t,s,s+n)!==0&&se("Can't get session input/output metadata.");let o=Number(r.getValue(s,"*"));a=Number(r.getValue(s+n,"*"));let u=r.HEAP32[a/4];if(u===0)return[o,0];let l=r.HEAPU32[a/4+1],d=[];for(let p=0;p<l;p++){let h=Number(r.getValue(a+8+p*n,"*"));d.push(h!==0?r.UTF8ToString(h):Number(r.getValue(a+8+(p+l)*n,"*")))}return[o,u,d]}finally{r.stackRestore(i),a!==0&&r._OrtFree(a)}},Ca=e=>{let t=pe(),r=t._malloc(e.byteLength);if(r===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,r),[r,e.byteLength]},Vn=async(e,t)=>{let r,i,a=pe();Array.isArray(e)?[r,i]=e:e.buffer===a.HEAPU8.buffer?[r,i]=[e.byteOffset,e.byteLength]:[r,i]=Ca(e);let n=0,s=0,o=0,u=[],l=[],d=[];try{if([s,u]=await Mi(t),t?.externalData&&a.mountExternalData){let v=[];for(let k of t.externalData){let B=typeof k=="string"?k:k.path;v.push(Ar(typeof k=="string"?k:k.data).then(R=>{a.mountExternalData(B,R)}))}await Promise.all(v)}for(let v of t?.executionProviders??[])if((typeof v=="string"?v:v.name)==="webnn"){if(a.shouldTransferToMLTensor=!1,typeof v!="string"){let k=v,B=k?.context,R=k?.gpuDevice,P=k?.deviceType,F=k?.powerPreference;B?a.currentContext=B:R?a.currentContext=await a.webnnCreateMLContext(R):a.currentContext=await a.webnnCreateMLContext({deviceType:P,powerPreference:F})}else a.currentContext=await a.webnnCreateMLContext();break}n=await a._OrtCreateSession(r,i,s),a.webgpuOnCreateSession?.(n),n===0&&se("Can't create a session."),a.jsepOnCreateSession?.(),a.currentContext&&(a.webnnRegisterMLContext(n,a.currentContext),a.currentContext=void 0,a.shouldTransferToMLTensor=!0);let[p,h]=xp(n),f=!!t?.enableGraphCapture,m=[],y=[],b=[],_=[],w=[];for(let v=0;v<p;v++){let[k,B,R]=qn(n,v);k===0&&se("Can't get an input name."),l.push(k);let P=a.UTF8ToString(k);m.push(P),b.push(B===0?{name:P,isTensor:!1}:{name:P,isTensor:!0,type:ft(B),shape:R})}for(let v=0;v<h;v++){let[k,B,R]=qn(n,v+p);k===0&&se("Can't get an output name."),d.push(k);let P=a.UTF8ToString(k);y.push(P),_.push(B===0?{name:P,isTensor:!1}:{name:P,isTensor:!0,type:ft(B),shape:R});{if(f&&t?.preferredOutputLocation===void 0){w.push("gpu-buffer");continue}let F=typeof t?.preferredOutputLocation=="string"?t.preferredOutputLocation:t?.preferredOutputLocation?.[P]??"cpu",Z=a.webnnIsGraphOutput;if(F==="cpu"&&Z&&Z(n,P)){w.push("ml-tensor-cpu-output");continue}if(F!=="cpu"&&F!=="cpu-pinned"&&F!=="gpu-buffer"&&F!=="ml-tensor")throw new Error(`Not supported preferred output location: ${F}.`);if(f&&F!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${F}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);w.push(F)}}let x=null;return w.some(v=>v==="gpu-buffer"||v==="ml-tensor"||v==="ml-tensor-cpu-output")&&(o=a._OrtCreateBinding(n),o===0&&se("Can't create IO binding."),x={handle:o,outputPreferredLocations:w,outputPreferredLocationsEncoded:w.map(v=>v==="ml-tensor-cpu-output"?"ml-tensor":v).map(v=>Hr(v))}),sr.set(n,[n,l,d,x,f,!1]),[n,m,y,b,_]}catch(p){throw l.forEach(h=>a._OrtFree(h)),d.forEach(h=>a._OrtFree(h)),o!==0&&a._OrtReleaseBinding(o)!==0&&se("Can't release IO binding."),n!==0&&a._OrtReleaseSession(n)!==0&&se("Can't release session."),p}finally{a._free(r),s!==0&&a._OrtReleaseSessionOptions(s)!==0&&se("Can't release session options."),u.forEach(p=>a._free(p)),a.unmountExternalData?.()}},Fn=e=>{let t=pe(),r=sr.get(e);if(!r)throw new Error(`cannot release session. invalid session id: ${e}`);let[i,a,n,s,o]=r;s&&(o&&t._OrtClearBoundOutputs(s.handle)!==0&&se("Can't clear bound outputs."),t._OrtReleaseBinding(s.handle)!==0&&se("Can't release IO binding.")),t.jsepOnReleaseSession?.(e),t.webnnOnReleaseSession?.(e),t.webgpuOnReleaseSession?.(e),a.forEach(u=>t._OrtFree(u)),n.forEach(u=>t._OrtFree(u)),t._OrtReleaseSession(i)!==0&&se("Can't release session."),sr.delete(e)},Wn=async(e,t,r,i,a,n,s=!1)=>{if(!e){t.push(0);return}let o=pe(),u=o.PTR_SIZE,l=e[0],d=e[1],p=e[3],h=p,f,m;if(l==="string"&&(p==="gpu-buffer"||p==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(s&&p!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${n} when enableGraphCapture is true.`);if(p==="gpu-buffer"){let _=e[2].gpuBuffer;m=mt(ht(l),d);{let w=o.jsepRegisterBuffer;if(!w)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');f=w(i,n,_,m)}}else if(p==="ml-tensor"){let _=e[2].mlTensor;m=mt(ht(l),d);let w=o.webnnRegisterMLTensor;if(!w)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');f=w(i,_,ht(l),d)}else{let _=e[2];if(Array.isArray(_)){m=u*_.length,f=o._malloc(m),r.push(f);for(let w=0;w<_.length;w++){if(typeof _[w]!="string")throw new TypeError(`tensor data at index ${w} is not a string`);o.setValue(f+w*u,je(_[w],r),"*")}}else{let w=o.webnnIsGraphInput,x=o.webnnIsGraphOutput;if(l!=="string"&&w&&x){let v=o.UTF8ToString(a);if(w(i,v)||x(i,v)){let k=ht(l);m=mt(k,d),h="ml-tensor";let B=o.webnnCreateTemporaryTensor,R=o.webnnUploadTensor;if(!B||!R)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');let P=await B(i,k,d);R(P,new Uint8Array(_.buffer,_.byteOffset,_.byteLength)),f=P}else m=_.byteLength,f=o._malloc(m),r.push(f),o.HEAPU8.set(new Uint8Array(_.buffer,_.byteOffset,m),f)}else m=_.byteLength,f=o._malloc(m),r.push(f),o.HEAPU8.set(new Uint8Array(_.buffer,_.byteOffset,m),f)}}let y=o.stackSave(),b=o.stackAlloc(4*d.length);try{d.forEach((w,x)=>o.setValue(b+x*u,w,u===4?"i32":"i64"));let _=o._OrtCreateTensor(ht(l),f,m,b,d.length,Hr(h));_===0&&se(`Can't create tensor for input/output. session=${i}, index=${n}.`),t.push(_)}finally{o.stackRestore(y)}},Gn=async(e,t,r,i,a,n)=>{let s=pe(),o=s.PTR_SIZE,u=sr.get(e);if(!u)throw new Error(`cannot run inference. invalid session id: ${e}`);let l=u[0],d=u[1],p=u[2],h=u[3],f=u[4],m=u[5],y=t.length,b=i.length,_=0,w=[],x=[],v=[],k=[],B=s.stackSave(),R=s.stackAlloc(y*o),P=s.stackAlloc(y*o),F=s.stackAlloc(b*o),Z=s.stackAlloc(b*o);try{[_,w]=Ci(n);for(let K=0;K<y;K++)await Wn(r[K],x,k,e,d[t[K]],t[K],f);for(let K=0;K<b;K++)await Wn(a[K],v,k,e,p[i[K]],y+i[K],f);for(let K=0;K<y;K++)s.setValue(R+K*o,x[K],"*"),s.setValue(P+K*o,d[t[K]],"*");for(let K=0;K<b;K++)s.setValue(F+K*o,v[K],"*"),s.setValue(Z+K*o,p[i[K]],"*");if(h&&!m){let{handle:K,outputPreferredLocations:Se,outputPreferredLocationsEncoded:de}=h;if(d.length!==y)throw new Error(`input count from feeds (${y}) is expected to be always equal to model's input count (${d.length}).`);for(let J=0;J<y;J++){let Me=t[J];await s._OrtBindInput(K,d[Me],x[J])!==0&&se(`Can't bind input[${J}] for session=${e}.`)}for(let J=0;J<b;J++){let Me=i[J];a[J]?.[3]?s._OrtBindOutput(K,p[Me],v[J],0)!==0&&se(`Can't bind pre-allocated output[${J}] for session=${e}.`):s._OrtBindOutput(K,p[Me],0,de[Me])!==0&&se(`Can't bind output[${J}] to ${Se[J]} for session=${e}.`)}sr.set(e,[l,d,p,h,f,!0])}s.jsepOnRunStart?.(l),s.webnnOnRunStart?.(l);let ce;h?ce=await s._OrtRunWithBinding(l,h.handle,b,F,_):ce=await s._OrtRun(l,P,R,y,Z,b,F,_),ce!==0&&se("failed to call OrtRun().");let re=[],ge=[];for(let K=0;K<b;K++){let Se=Number(s.getValue(F+K*o,"*"));if(Se===v[K]){re.push(a[K]);continue}let de=s.stackSave(),J=s.stackAlloc(4*o),Me=!1,ie,Le=0;try{s._OrtGetTensorData(Se,J,J+o,J+2*o,J+3*o)!==0&&se(`Can't access output tensor data on index ${K}.`);let q=o===4?"i32":"i64",j=Number(s.getValue(J,q));Le=s.getValue(J+o,"*");let be=s.getValue(J+o*2,"*"),De=Number(s.getValue(J+o*3,q)),nt=[];for(let st=0;st<De;st++)nt.push(Number(s.getValue(be+st*o,q)));s._OrtFree(be)!==0&&se("Can't free memory for tensor dims.");let Ft=nt.reduce((st,Qe)=>st*Qe,1);ie=ft(j);let na=h?.outputPreferredLocations[i[K]];if(ie==="string"){if(na==="gpu-buffer"||na==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let st=[];for(let Qe=0;Qe<Ft;Qe++){let Xt=s.getValue(Le+Qe*o,"*"),rh=s.getValue(Le+(Qe+1)*o,"*"),ih=Qe===Ft-1?void 0:rh-Xt;st.push(s.UTF8ToString(Xt,ih))}re.push([ie,nt,st,"cpu"])}else if(na==="gpu-buffer"&&Ft>0){let st=s.jsepGetBuffer;if(!st)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let Qe=st(Le),Xt=mt(j,Ft);if(Xt===void 0||!zr(ie))throw new Error(`Unsupported data type: ${ie}`);Me=!0,re.push([ie,nt,{gpuBuffer:Qe,download:s.jsepCreateDownloader(Qe,Xt,ie),dispose:()=>{s._OrtReleaseTensor(Se)!==0&&se("Can't release tensor.")}},"gpu-buffer"])}else if(na==="ml-tensor"&&Ft>0){let st=s.webnnEnsureTensor,Qe=s.webnnIsGraphInputOutputTypeSupported;if(!st||!Qe)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(mt(j,Ft)===void 0||!Cr(ie))throw new Error(`Unsupported data type: ${ie}`);if(!Qe(e,ie,!1))throw new Error(`preferredLocation "ml-tensor" for ${ie} output is not supported by current WebNN Context.`);let Xt=await st(e,Le,j,nt,!1);Me=!0,re.push([ie,nt,{mlTensor:Xt,download:s.webnnCreateMLTensorDownloader(Le,ie),dispose:()=>{s.webnnReleaseTensorId(Le),s._OrtReleaseTensor(Se)}},"ml-tensor"])}else if(na==="ml-tensor-cpu-output"&&Ft>0){let st=s.webnnCreateMLTensorDownloader(Le,ie)(),Qe=re.length;Me=!0,ge.push((async()=>{let Xt=[Qe,await st];return s.webnnReleaseTensorId(Le),s._OrtReleaseTensor(Se),Xt})()),re.push([ie,nt,[],"cpu"])}else{let st=kr(ie),Qe=new st(Ft);new Uint8Array(Qe.buffer,Qe.byteOffset,Qe.byteLength).set(s.HEAPU8.subarray(Le,Le+Qe.byteLength)),re.push([ie,nt,Qe,"cpu"])}}finally{s.stackRestore(de),ie==="string"&&Le&&s._free(Le),Me||s._OrtReleaseTensor(Se)}}h&&!f&&(s._OrtClearBoundOutputs(h.handle)!==0&&se("Can't clear bound outputs."),sr.set(e,[l,d,p,h,f,!1]));for(let[K,Se]of await Promise.all(ge))re[K][2]=Se;return re}finally{s.webnnOnRunEnd?.(l),s.stackRestore(B),x.forEach(ce=>s._OrtReleaseTensor(ce)),v.forEach(ce=>s._OrtReleaseTensor(ce)),k.forEach(ce=>s._free(ce)),_!==0&&s._OrtReleaseRunOptions(_),w.forEach(ce=>s._free(ce))}},jn=e=>{let t=pe(),r=sr.get(e);if(!r)throw new Error("invalid session id");let i=r[0],a=t._OrtEndProfiling(i);a===0&&se("Can't get an profile file name."),t._OrtFree(a)},Hn=e=>{let t=[];for(let r of e){let i=r[2];!Array.isArray(i)&&"buffer"in i&&t.push(i.buffer)}return t}}),or,$t,di,ia,aa,Aa,Kn,Oa,Fr,Wr,Tp,Ep,kp,Ip,zp,Cp,Ap,Op,Rp=I(()=>{it(),Sp(),ct(),vr(),or=()=>!!ee.wasm.proxy&&typeof document<"u",di=!1,ia=!1,aa=!1,Oa=new Map,Fr=(e,t)=>{let r=Oa.get(e);r?r.push(t):Oa.set(e,[t])},Wr=()=>{if(di||!ia||aa||!$t)throw new Error("worker not ready")},Tp=e=>{switch(e.data.type){case"init-wasm":di=!1,e.data.err?(aa=!0,Kn[1](e.data.err)):(ia=!0,Kn[0]()),Aa&&(URL.revokeObjectURL(Aa),Aa=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=Oa.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out);break}}},Ep=async()=>{if(!ia){if(di)throw new Error("multiple calls to 'initWasm()' detected.");if(aa)throw new Error("previous call to 'initWasm()' failed.");if(di=!0,or())return new Promise((e,t)=>{$t?.terminate(),Ti().then(([r,i])=>{try{$t=i,$t.onerror=n=>t(n),$t.onmessage=Tp,Kn=[e,t];let a={type:"init-wasm",in:ee};if(!a.in.wasm.wasmPaths&&r){let n=wr();n&&(a.in.wasm.wasmPaths=n)}$t.postMessage(a),Aa=r}catch(a){t(a)}},t)});try{await Tr(ee.wasm),await Nn(ee),ia=!0}catch(e){throw aa=!0,e}finally{di=!1}}},kp=async e=>{if(or())return Wr(),new Promise((t,r)=>{Fr("init-ep",[t,r]);let i={type:"init-ep",in:{epName:e,env:ee}};$t.postMessage(i)});await Ln(ee,e)},Ip=async e=>or()?(Wr(),new Promise((t,r)=>{Fr("copy-from",[t,r]);let i={type:"copy-from",in:{buffer:e}};$t.postMessage(i,[e.buffer])})):Ca(e),zp=async(e,t)=>{if(or()){if(t?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return Wr(),new Promise((r,i)=>{Fr("create",[r,i]);let a={type:"create",in:{model:e,options:{...t}}},n=[];e instanceof Uint8Array&&n.push(e.buffer),$t.postMessage(a,n)})}else return Vn(e,t)},Cp=async e=>{if(or())return Wr(),new Promise((t,r)=>{Fr("release",[t,r]);let i={type:"release",in:e};$t.postMessage(i)});Fn(e)},Ap=async(e,t,r,i,a,n)=>{if(or()){if(r.some(s=>s[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(a.some(s=>s))throw new Error("pre-allocated output tensor is not supported for proxy.");return Wr(),new Promise((s,o)=>{Fr("run",[s,o]);let u=r,l={type:"run",in:{sessionId:e,inputIndices:t,inputs:u,outputIndices:i,options:n}};$t.postMessage(l,Hn(u))})}else return Gn(e,t,r,i,a,n)},Op=async e=>{if(or())return Wr(),new Promise((t,r)=>{Fr("end-profiling",[t,r]);let i={type:"end-profiling",in:e};$t.postMessage(i)});jn(e)}}),Zn,Bp,Mp,Yc=I(()=>{it(),Rp(),le(),mr(),Di(),Zn=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[e.type,e.dims,{mlTensor:e.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${e.location} for ${t()}`)}},Bp=e=>{switch(e[3]){case"cpu":return new Ge(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!zr(t))throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:r,download:i,dispose:a}=e[2];return Ge.fromGpuBuffer(r,{dataType:t,dims:e[1],download:i,dispose:a})}case"ml-tensor":{let t=e[0];if(!Cr(t))throw new Error(`not supported data type: ${t} for deserializing MLTensor tensor`);let{mlTensor:r,download:i,dispose:a}=e[2];return Ge.fromMLTensor(r,{dataType:t,dims:e[1],download:i,dispose:a})}default:throw new Error(`invalid data location: ${e[3]}`)}},Mp=class{async fetchModelAndCopyToWasmMemory(e){return Ip(await Ar(e))}async loadModel(e,t){et();let r;typeof e=="string"?r=await this.fetchModelAndCopyToWasmMemory(e):r=e,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=await zp(r,t),Xe()}async dispose(){return Cp(this.sessionId)}async run(e,t,r){et();let i=[],a=[];Object.entries(e).forEach(p=>{let h=p[0],f=p[1],m=this.inputNames.indexOf(h);if(m===-1)throw new Error(`invalid input '${h}'`);i.push(f),a.push(m)});let n=[],s=[];Object.entries(t).forEach(p=>{let h=p[0],f=p[1],m=this.outputNames.indexOf(h);if(m===-1)throw new Error(`invalid output '${h}'`);n.push(f),s.push(m)});let o=i.map((p,h)=>Zn(p,()=>`input "${this.inputNames[a[h]]}"`)),u=n.map((p,h)=>p?Zn(p,()=>`output "${this.outputNames[s[h]]}"`):null),l=await Ap(this.sessionId,a,o,s,u,r),d={};for(let p=0;p<l.length;p++)d[this.outputNames[s[p]]]=n[p]??Bp(l[p]);return Xe(),d}startProfiling(){}endProfiling(){Op(this.sessionId)}}}),Dp={};X(Dp,{OnnxruntimeWebAssemblyBackend:()=>Xn,initializeFlags:()=>Qn,wasmBackend:()=>Pp});var Qn,Xn,Pp,Jc=I(()=>{it(),Rp(),Yc(),Qn=()=>{(typeof ee.wasm.initTimeout!="number"||ee.wasm.initTimeout<0)&&(ee.wasm.initTimeout=0);let e=ee.wasm.simd;if(typeof e!="boolean"&&e!==void 0&&e!=="fixed"&&e!=="relaxed"&&(console.warn(`Property "env.wasm.simd" is set to unknown value "${e}". Reset it to \`false\` and ignore SIMD feature checking.`),ee.wasm.simd=!1),typeof ee.wasm.proxy!="boolean"&&(ee.wasm.proxy=!1),typeof ee.wasm.trace!="boolean"&&(ee.wasm.trace=!1),typeof ee.wasm.numThreads!="number"||!Number.isInteger(ee.wasm.numThreads)||ee.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)ee.wasm.numThreads=1;else{let t=typeof navigator>"u"?G("node:os").cpus().length:navigator.hardwareConcurrency;ee.wasm.numThreads=Math.min(4,Math.ceil((t||1)/2))}},Xn=class{async init(e){Qn(),await Ep(),await kp(e)}async createInferenceSessionHandler(e,t){let r=new Mp;return await r.loadModel(e,t),r}},Pp=new Xn}),Up={};X(Up,{InferenceSession:()=>fr,TRACE:()=>Dt,TRACE_FUNC_BEGIN:()=>et,TRACE_FUNC_END:()=>Xe,Tensor:()=>Ge,default:()=>th,env:()=>ee,registerBackend:()=>Q}),it(),it(),it();var eh="1.22.0",th=yi;{let e=(Jc(),Te(Dp)).wasmBackend;Q("webgpu",e,5),Q("webnn",e,5),Q("cpu",e,10),Q("wasm",e,10)}return Object.defineProperty(ee.versions,"web",{value:eh,enumerable:!0}),Te(Up)})();W.exports=Ae})(Jn)),Jn.exports}var Gr={},es={},Gp;function sh(){return Gp||(Gp=1,Object.defineProperty(es,"__esModule",{value:!0})),es}var da={},jp;function oh(){if(jp)return da;jp=1;var W;Object.defineProperty(da,"__esModule",{value:!0}),da.SileroLegacy=void 0;const $e=fa();class Ae{constructor(ze,fe,oe,G,I){this.ortInstance=ze,this._session=fe,this._h=oe,this._c=G,this._sr=I,this.reset_state=()=>{const X=Array(128).fill(0);this._h=new this.ortInstance.Tensor("float32",X,[2,1,64]),this._c=new this.ortInstance.Tensor("float32",X,[2,1,64])},this.process=async X=>{const Te={input:new this.ortInstance.Tensor("float32",X,[1,X.length]),h:this._h,c:this._c,sr:this._sr},he=await this._session.run(Te);this._h=he.hn,this._c=he.cn;const[ue]=he.output?.data;return{notSpeech:1-ue,isSpeech:ue}},this.release=async()=>{await this._session.release(),this._h.dispose(),this._c.dispose(),this._sr.dispose()}}}return da.SileroLegacy=Ae,W=Ae,Ae.new=async(xe,ze)=>{$e.log.debug("initializing vad");const fe=await ze(),oe=await xe.InferenceSession.create(fe),G=new xe.Tensor("int64",[16000n]),I=Array(128).fill(0),X=new xe.Tensor("float32",I,[2,1,64]),ye=new xe.Tensor("float32",I,[2,1,64]);return $e.log.debug("vad is initialized"),new W(xe,oe,X,ye,G)},da}var pa={},Hp;function uh(){if(Hp)return pa;Hp=1;var W;Object.defineProperty(pa,"__esModule",{value:!0}),pa.Silero=void 0;const $e=fa(),Ae=64;function xe(fe){const oe=Array(256).fill(0);return new fe.Tensor("float32",oe,[2,1,128])}class ze{constructor(oe,G,I,X){this._session=oe,this._state=G,this._sr=I,this.ortInstance=X,this._context=new Float32Array(Ae),this.reset_state=()=>{this._state=xe(this.ortInstance),this._context=new Float32Array(Ae)},this.process=async ye=>{const Te=new Float32Array(Ae+ye.length);Te.set(this._context,0),Te.set(ye,Ae),this._context=ye.slice(-Ae);const ue={input:new this.ortInstance.Tensor("float32",Te,[1,Te.length]),state:this._state,sr:this._sr},Q=await this._session.run(ue);if(!Q.stateN)throw new Error("No state from model");if(this._state=Q.stateN,!Q.output?.data)throw new Error("No output from model");const ae=Q.output.data[0];if(typeof ae!="number")throw new Error("Weird output data");return{notSpeech:1-ae,isSpeech:ae}},this.release=async()=>{await this._session.release(),this._state.dispose(),this._sr.dispose()}}}return pa.Silero=ze,W=ze,ze.new=async(fe,oe)=>{$e.log.debug("Loading VAD...");const G=await oe(),I=await fe.InferenceSession.create(G),X=new fe.Tensor("int64",[16000n]),ye=xe(fe);return $e.log.debug("...finished loading VAD"),new W(I,ye,X,fe)},pa}var Kp;function ac(){return Kp||(Kp=1,(function(W){var $e=Gr&&Gr.__createBinding||(Object.create?(function(fe,oe,G,I){I===void 0&&(I=G);var X=Object.getOwnPropertyDescriptor(oe,G);(!X||("get"in X?!oe.__esModule:X.writable||X.configurable))&&(X={enumerable:!0,get:function(){return oe[G]}}),Object.defineProperty(fe,I,X)}):(function(fe,oe,G,I){I===void 0&&(I=G),fe[I]=oe[G]})),Ae=Gr&&Gr.__exportStar||function(fe,oe){for(var G in fe)G!=="default"&&!Object.prototype.hasOwnProperty.call(oe,G)&&$e(oe,fe,G)};Object.defineProperty(W,"__esModule",{value:!0}),W.Silero=W.SileroLegacy=void 0,Ae(sh(),W);var xe=oh();Object.defineProperty(W,"SileroLegacy",{enumerable:!0,get:function(){return xe.SileroLegacy}});var ze=uh();Object.defineProperty(W,"Silero",{enumerable:!0,get:function(){return ze.Silero}})})(Gr)),Gr}var ca={},Zp;function nc(){if(Zp)return ca;Zp=1,Object.defineProperty(ca,"__esModule",{value:!0}),ca.Resampler=void 0;const W=fa();class $e{constructor(xe){this.options=xe,this.process=ze=>{const fe=[];for(const oe of ze)for(this.inputBuffer.push(oe);this.hasEnoughDataForFrame();){const G=this.generateOutputFrame();fe.push(G)}return fe},xe.nativeSampleRate<16e3&&W.log.error("nativeSampleRate is too low. Should have 16000 = targetSampleRate <= nativeSampleRate"),this.inputBuffer=[]}async*stream(xe){for(const ze of xe)for(this.inputBuffer.push(ze);this.hasEnoughDataForFrame();)yield this.generateOutputFrame()}hasEnoughDataForFrame(){return this.inputBuffer.length*this.options.targetSampleRate/this.options.nativeSampleRate>=this.options.targetFrameSize}generateOutputFrame(){const xe=new Float32Array(this.options.targetFrameSize);let ze=0,fe=0;for(;ze<this.options.targetFrameSize;){let oe=0,G=0;for(;fe<Math.min(this.inputBuffer.length,(ze+1)*this.options.nativeSampleRate/this.options.targetSampleRate);){const I=this.inputBuffer[fe];I!==void 0&&(oe+=I,G++),fe++}xe[ze]=oe/G,ze++}return this.inputBuffer=this.inputBuffer.slice(fe),xe}}return ca.Resampler=$e,ca}var Qp;function lh(){return Qp||(Qp=1,(function(W){var $e=Jt&&Jt.__createBinding||(Object.create?(function(he,ue,Q,ae){ae===void 0&&(ae=Q);var Oe=Object.getOwnPropertyDescriptor(ue,Q);(!Oe||("get"in Oe?!ue.__esModule:Oe.writable||Oe.configurable))&&(Oe={enumerable:!0,get:function(){return ue[Q]}}),Object.defineProperty(he,ae,Oe)}):(function(he,ue,Q,ae){ae===void 0&&(ae=Q),he[ae]=ue[Q]})),Ae=Jt&&Jt.__setModuleDefault||(Object.create?(function(he,ue){Object.defineProperty(he,"default",{enumerable:!0,value:ue})}):function(he,ue){he.default=ue}),xe=Jt&&Jt.__importStar||function(he){if(he&&he.__esModule)return he;var ue={};if(he!=null)for(var Q in he)Q!=="default"&&Object.prototype.hasOwnProperty.call(he,Q)&&$e(ue,he,Q);return Ae(ue,he),ue};Object.defineProperty(W,"__esModule",{value:!0}),W.NonRealTimeVAD=W.defaultNonRealTimeVADOptions=void 0;const ze=xe(nh()),fe=tc(),oe=rs(),G=is(),I=Ba(),X=ac(),ye=nc();W.defaultNonRealTimeVADOptions={...G.defaultFrameProcessorOptions,modelURL:fe.baseAssetPath+"silero_vad_legacy.onnx",modelFetcher:oe.defaultModelFetcher};class Te{static async new(ue={}){const Q={...W.defaultNonRealTimeVADOptions,...ue};(0,G.validateOptions)(Q),Q.ortConfig!==void 0&&Q.ortConfig(ze);const ae=()=>Q.modelFetcher(Q.modelURL),Oe=await X.SileroLegacy.new(ze,ae),We=new G.FrameProcessor(Oe.process,Oe.reset_state,{positiveSpeechThreshold:Q.positiveSpeechThreshold,negativeSpeechThreshold:Q.negativeSpeechThreshold,redemptionMs:Q.redemptionMs,preSpeechPadMs:Q.preSpeechPadMs,minSpeechMs:Q.minSpeechMs,submitUserSpeechOnPause:Q.submitUserSpeechOnPause},1536/16);return We.resume(),new this(ae,ze,Q,We)}constructor(ue,Q,ae,Oe){this.modelFetcher=ue,this.ort=Q,this.options=ae,this.frameProcessor=Oe,this.frameSamples=1536}async*run(ue,Q){const ae={nativeSampleRate:Q,targetSampleRate:16e3,targetFrameSize:this.frameSamples},Oe=new ye.Resampler(ae);let We=0,Ee=0,we=0;for await(const Re of Oe.stream(ue)){const ke=[];await this.frameProcessor.process(Re,Ve=>{ke.push(Ve)});for(const Ve of ke)switch(Ve.msg){case I.Message.SpeechStart:We=we*this.frameSamples/16;break;case I.Message.SpeechEnd:Ee=(we+1)*this.frameSamples/16,yield{audio:Ve.audio,start:We,end:Ee};break}we++}const me=[];this.frameProcessor.endSegment(Re=>{me.push(Re)});for(const Re of me)switch(Re.msg){case I.Message.SpeechEnd:yield{audio:Re.audio,start:We,end:we*this.frameSamples/16}}}}W.NonRealTimeVAD=Te})(Jt)),Jt}var Mt={},Xp;function dh(){if(Xp)return Mt;Xp=1,Object.defineProperty(Mt,"__esModule",{value:!0}),Mt.audioFileToArray=Mt.encodeWAV=Mt.arrayBufferToBase64=Mt.minFramesForTargetMS=void 0;function W(G,I,X=16e3){return Math.ceil(G*X/1e3/I)}Mt.minFramesForTargetMS=W;function $e(G){const I=new Uint8Array(G),X=I.byteLength,ye=new Array(X);for(let Te=0;Te<X;Te++){const he=I[Te];if(he===void 0)break;ye[Te]=String.fromCharCode(he)}return btoa(ye.join(""))}Mt.arrayBufferToBase64=$e;function Ae(G,I=3,X=16e3,ye=1,Te=32){const he=Te/8,ue=ye*he,Q=new ArrayBuffer(44+G.length*he),ae=new DataView(Q);return fe(ae,0,"RIFF"),ae.setUint32(4,36+G.length*he,!0),fe(ae,8,"WAVE"),fe(ae,12,"fmt "),ae.setUint32(16,16,!0),ae.setUint16(20,I,!0),ae.setUint16(22,ye,!0),ae.setUint32(24,X,!0),ae.setUint32(28,X*ue,!0),ae.setUint16(32,ue,!0),ae.setUint16(34,Te,!0),fe(ae,36,"data"),ae.setUint32(40,G.length*he,!0),I===1?ze(ae,44,G):xe(ae,44,G),Q}Mt.encodeWAV=Ae;function xe(G,I,X){for(let ye=0;ye<X.length;ye++,I+=4)G.setFloat32(I,X[ye],!0)}function ze(G,I,X){for(let ye=0;ye<X.length;ye++,I+=2){const Te=Math.max(-1,Math.min(1,X[ye]));G.setInt16(I,Te<0?Te*32768:Te*32767,!0)}}function fe(G,I,X){for(let ye=0;ye<X.length;ye++)G.setUint8(I+ye,X.charCodeAt(ye))}async function oe(G){const I=new OfflineAudioContext(1,1,44100),X=new FileReader;let ye=null;if(await new Promise(ue=>{X.addEventListener("loadend",()=>{const Q=X.result;I.decodeAudioData(Q,ae=>{ye=ae,I.startRendering().then(()=>{console.log("Rendering completed successfully"),ue()}).catch(Oe=>{console.error("Rendering failed: ",Oe)})},ae=>{console.log("Error with decoding audio data: ",ae)})}),X.readAsArrayBuffer(G)}),ye===null)throw Error("some shit");const Te=ye,he=new Float32Array(Te.length);for(let ue=0;ue<Te.length;ue++)for(let Q=0;Q<Te.numberOfChannels;Q++){const ae=Te.getChannelData(Q)[ue],Oe=he[ue];if(ae===void 0||Oe===void 0)throw new Error("sample or out[i] is undefined");he[ue]=Oe+ae}return{audio:he,sampleRate:Te.sampleRate}}return Mt.audioFileToArray=oe,Mt}var er={},ts={exports:{}};var Yp;function ph(){return Yp||(Yp=1,(function(W,$e){var Ae=(()=>{var xe=Object.defineProperty,ze=Object.getOwnPropertyDescriptor,fe=Object.getOwnPropertyNames,oe=Object.prototype.hasOwnProperty,G=(c=>typeof vt<"u"?vt:typeof Proxy<"u"?new Proxy(c,{get:(g,$)=>(typeof vt<"u"?vt:g)[$]}):c)(function(c){if(typeof vt<"u")return vt.apply(this,arguments);throw Error('Dynamic require of "'+c+'" is not supported')}),I=(c,g)=>()=>(c&&(g=c(c=0)),g),X=(c,g)=>{for(var $ in g)xe(c,$,{get:g[$],enumerable:!0})},ye=(c,g,$,S)=>{if(g&&typeof g=="object"||typeof g=="function")for(let T of fe(g))!oe.call(c,T)&&T!==$&&xe(c,T,{get:()=>g[T],enumerable:!(S=ze(g,T))||S.enumerable});return c},Te=c=>ye(xe({},"__esModule",{value:!0}),c),he,ue,Q,ae,Oe,We=I(()=>{he=new Map,ue=[],Q=(c,g,$)=>{if(g&&typeof g.init=="function"&&typeof g.createInferenceSessionHandler=="function"){let S=he.get(c);if(S===void 0)he.set(c,{backend:g,priority:$});else{if(S.priority>$)return;if(S.priority===$&&S.backend!==g)throw new Error(`cannot register backend "${c}" using priority ${$}`)}if($>=0){let T=ue.indexOf(c);T!==-1&&ue.splice(T,1);for(let O=0;O<ue.length;O++)if(he.get(ue[O]).priority<=$){ue.splice(O,0,c);return}ue.push(c)}return}throw new TypeError("not a valid backend")},ae=async c=>{let g=he.get(c);if(!g)return"backend not found.";if(g.initialized)return g.backend;if(g.aborted)return g.error;{let $=!!g.initPromise;try{return $||(g.initPromise=g.backend.init(c)),await g.initPromise,g.initialized=!0,g.backend}catch(S){return $||(g.error=`${S}`,g.aborted=!0),g.error}finally{delete g.initPromise}}},Oe=async c=>{let g=c.executionProviders||[],$=g.map(A=>typeof A=="string"?A:A.name),S=$.length===0?ue:$,T,O=[],z=new Set;for(let A of S){let U=await ae(A);typeof U=="string"?O.push({name:A,err:U}):(T||(T=U),T===U&&z.add(A))}if(!T)throw new Error(`no available backend found. ERR: ${O.map(A=>`[${A.name}] ${A.err}`).join(", ")}`);for(let{name:A,err:U}of O)$.includes(A)&&console.warn(`removing requested execution provider "${A}" from session options because it is not available: ${U}`);let E=g.filter(A=>z.has(typeof A=="string"?A:A.name));return[T,new Proxy(c,{get:(A,U)=>U==="executionProviders"?E:Reflect.get(A,U)})]}}),Ee=I(()=>{We()}),we,me=I(()=>{we="1.22.0"}),Re,ke,Ve=I(()=>{me(),Re="warning",ke={wasm:{},webgl:{},webgpu:{},versions:{common:we},set logLevel(c){if(c!==void 0){if(typeof c!="string"||["verbose","info","warning","error","fatal"].indexOf(c)===-1)throw new Error(`Unsupported logging level: ${c}`);Re=c}},get logLevel(){return Re}},Object.defineProperty(ke,"logLevel",{enumerable:!0})}),ee,Je=I(()=>{Ve(),ee=ke}),lt,xt,_t=I(()=>{lt=(c,g)=>{let $=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);$.width=c.dims[3],$.height=c.dims[2];let S=$.getContext("2d");if(S!=null){let T,O;g?.tensorLayout!==void 0&&g.tensorLayout==="NHWC"?(T=c.dims[2],O=c.dims[3]):(T=c.dims[3],O=c.dims[2]);let z=g?.format!==void 0?g.format:"RGB",E=g?.norm,A,U;E===void 0||E.mean===void 0?A=[255,255,255,255]:typeof E.mean=="number"?A=[E.mean,E.mean,E.mean,E.mean]:(A=[E.mean[0],E.mean[1],E.mean[2],0],E.mean[3]!==void 0&&(A[3]=E.mean[3])),E===void 0||E.bias===void 0?U=[0,0,0,0]:typeof E.bias=="number"?U=[E.bias,E.bias,E.bias,E.bias]:(U=[E.bias[0],E.bias[1],E.bias[2],0],E.bias[3]!==void 0&&(U[3]=E.bias[3]));let N=O*T,L=0,D=N,Y=N*2,C=-1;z==="RGBA"?(L=0,D=N,Y=N*2,C=N*3):z==="RGB"?(L=0,D=N,Y=N*2):z==="RBG"&&(L=0,Y=N,D=N*2);for(let V=0;V<O;V++)for(let qe=0;qe<T;qe++){let _e=(c.data[L++]-U[0])*A[0],te=(c.data[D++]-U[1])*A[1],ve=(c.data[Y++]-U[2])*A[2],H=C===-1?255:(c.data[C++]-U[3])*A[3];S.fillStyle="rgba("+_e+","+te+","+ve+","+H+")",S.fillRect(qe,V,1,1)}if("toDataURL"in $)return $.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},xt=(c,g)=>{let $=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),S;if($!=null){let T,O,z;g?.tensorLayout!==void 0&&g.tensorLayout==="NHWC"?(T=c.dims[2],O=c.dims[1],z=c.dims[3]):(T=c.dims[3],O=c.dims[2],z=c.dims[1]);let E=g!==void 0&&g.format!==void 0?g.format:"RGB",A=g?.norm,U,N;A===void 0||A.mean===void 0?U=[255,255,255,255]:typeof A.mean=="number"?U=[A.mean,A.mean,A.mean,A.mean]:(U=[A.mean[0],A.mean[1],A.mean[2],255],A.mean[3]!==void 0&&(U[3]=A.mean[3])),A===void 0||A.bias===void 0?N=[0,0,0,0]:typeof A.bias=="number"?N=[A.bias,A.bias,A.bias,A.bias]:(N=[A.bias[0],A.bias[1],A.bias[2],0],A.bias[3]!==void 0&&(N[3]=A.bias[3]));let L=O*T;if(g!==void 0&&(g.format!==void 0&&z===4&&g.format!=="RGBA"||z===3&&g.format!=="RGB"&&g.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let D=4,Y=0,C=1,V=2,qe=3,_e=0,te=L,ve=L*2,H=-1;E==="RGBA"?(_e=0,te=L,ve=L*2,H=L*3):E==="RGB"?(_e=0,te=L,ve=L*2):E==="RBG"&&(_e=0,ve=L,te=L*2),S=$.createImageData(T,O);for(let tt=0;tt<O*T;Y+=D,C+=D,V+=D,qe+=D,tt++)S.data[Y]=(c.data[_e++]-N[0])*U[0],S.data[C]=(c.data[te++]-N[1])*U[1],S.data[V]=(c.data[ve++]-N[2])*U[2],S.data[qe]=H===-1?255:(c.data[H++]-N[3])*U[3]}else throw new Error("Can not access image data");return S}}),gt,ur,lr,Pe,Wt,dr,jr=I(()=>{cr(),gt=(c,g)=>{if(c===void 0)throw new Error("Image buffer must be defined");if(g.height===void 0||g.width===void 0)throw new Error("Image height and width must be defined");if(g.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:$,width:S}=g,T=g.norm??{mean:255,bias:0},O,z;typeof T.mean=="number"?O=[T.mean,T.mean,T.mean,T.mean]:O=[T.mean[0],T.mean[1],T.mean[2],T.mean[3]??255],typeof T.bias=="number"?z=[T.bias,T.bias,T.bias,T.bias]:z=[T.bias[0],T.bias[1],T.bias[2],T.bias[3]??0];let E=g.format!==void 0?g.format:"RGBA",A=g.tensorFormat!==void 0&&g.tensorFormat!==void 0?g.tensorFormat:"RGB",U=$*S,N=A==="RGBA"?new Float32Array(U*4):new Float32Array(U*3),L=4,D=0,Y=1,C=2,V=3,qe=0,_e=U,te=U*2,ve=-1;E==="RGB"&&(L=3,D=0,Y=1,C=2,V=-1),A==="RGBA"?ve=U*3:A==="RBG"?(qe=0,te=U,_e=U*2):A==="BGR"&&(te=0,_e=U,qe=U*2);for(let H=0;H<U;H++,D+=L,C+=L,Y+=L,V+=L)N[qe++]=(c[D]+z[0])/O[0],N[_e++]=(c[Y]+z[1])/O[1],N[te++]=(c[C]+z[2])/O[2],ve!==-1&&V!==-1&&(N[ve++]=(c[V]+z[3])/O[3]);return A==="RGBA"?new Ue("float32",N,[1,4,$,S]):new Ue("float32",N,[1,3,$,S])},ur=async(c,g)=>{let $=typeof HTMLImageElement<"u"&&c instanceof HTMLImageElement,S=typeof ImageData<"u"&&c instanceof ImageData,T=typeof ImageBitmap<"u"&&c instanceof ImageBitmap,O=typeof c=="string",z,E=g??{},A=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},U=N=>typeof HTMLCanvasElement<"u"&&N instanceof HTMLCanvasElement||N instanceof OffscreenCanvas?N.getContext("2d"):null;if($){let N=A();N.width=c.width,N.height=c.height;let L=U(N);if(L!=null){let D=c.height,Y=c.width;if(g!==void 0&&g.resizedHeight!==void 0&&g.resizedWidth!==void 0&&(D=g.resizedHeight,Y=g.resizedWidth),g!==void 0){if(E=g,g.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");E.tensorFormat="RGBA",E.height=D,E.width=Y}else E.tensorFormat="RGBA",E.height=D,E.width=Y;L.drawImage(c,0,0),z=L.getImageData(0,0,Y,D).data}else throw new Error("Can not access image data")}else if(S){let N,L;if(g!==void 0&&g.resizedWidth!==void 0&&g.resizedHeight!==void 0?(N=g.resizedHeight,L=g.resizedWidth):(N=c.height,L=c.width),g!==void 0&&(E=g),E.format="RGBA",E.height=N,E.width=L,g!==void 0){let D=A();D.width=L,D.height=N;let Y=U(D);if(Y!=null)Y.putImageData(c,0,0),z=Y.getImageData(0,0,L,N).data;else throw new Error("Can not access image data")}else z=c.data}else if(T){if(g===void 0)throw new Error("Please provide image config with format for Imagebitmap");let N=A();N.width=c.width,N.height=c.height;let L=U(N);if(L!=null){let D=c.height,Y=c.width;return L.drawImage(c,0,0,Y,D),z=L.getImageData(0,0,Y,D).data,E.height=D,E.width=Y,gt(z,E)}else throw new Error("Can not access image data")}else{if(O)return new Promise((N,L)=>{let D=A(),Y=U(D);if(!c||!Y)return L();let C=new Image;C.crossOrigin="Anonymous",C.src=c,C.onload=()=>{D.width=C.width,D.height=C.height,Y.drawImage(C,0,0,D.width,D.height);let V=Y.getImageData(0,0,D.width,D.height);E.height=D.height,E.width=D.width,N(gt(V.data,E))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(z!==void 0)return gt(z,E);throw new Error("Input data provided is not supported - aborted tensor creation")},lr=(c,g)=>{let{width:$,height:S,download:T,dispose:O}=g,z=[1,S,$,4];return new Ue({location:"texture",type:"float32",texture:c,dims:z,download:T,dispose:O})},Pe=(c,g)=>{let{dataType:$,dims:S,download:T,dispose:O}=g;return new Ue({location:"gpu-buffer",type:$??"float32",gpuBuffer:c,dims:S,download:T,dispose:O})},Wt=(c,g)=>{let{dataType:$,dims:S,download:T,dispose:O}=g;return new Ue({location:"ml-tensor",type:$??"float32",mlTensor:c,dims:S,download:T,dispose:O})},dr=(c,g,$)=>new Ue({location:"cpu-pinned",type:c,data:g,dims:$??[g.length]})}),dt,St,pr,pi,Ma=I(()=>{dt=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),St=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),pr=!1,pi=()=>{if(!pr){pr=!0;let c=typeof BigInt64Array<"u"&&BigInt64Array.from,g=typeof BigUint64Array<"u"&&BigUint64Array.from,$=globalThis.Float16Array,S=typeof $<"u"&&$.from;c&&(dt.set("int64",BigInt64Array),St.set(BigInt64Array,"int64")),g&&(dt.set("uint64",BigUint64Array),St.set(BigUint64Array,"uint64")),S?(dt.set("float16",$),St.set($,"float16")):dt.set("float16",Uint16Array)}}}),ci,hi,Da=I(()=>{cr(),ci=c=>{let g=1;for(let $=0;$<c.length;$++){let S=c[$];if(typeof S!="number"||!Number.isSafeInteger(S))throw new TypeError(`dims[${$}] must be an integer, got: ${S}`);if(S<0)throw new RangeError(`dims[${$}] must be a non-negative integer, got: ${S}`);g*=S}return g},hi=(c,g)=>{switch(c.location){case"cpu":return new Ue(c.type,c.data,g);case"cpu-pinned":return new Ue({location:"cpu-pinned",data:c.data,type:c.type,dims:g});case"texture":return new Ue({location:"texture",texture:c.texture,type:c.type,dims:g});case"gpu-buffer":return new Ue({location:"gpu-buffer",gpuBuffer:c.gpuBuffer,type:c.type,dims:g});case"ml-tensor":return new Ue({location:"ml-tensor",mlTensor:c.mlTensor,type:c.type,dims:g});default:throw new Error(`tensorReshape: tensor location ${c.location} is not supported`)}}}),Ue,cr=I(()=>{_t(),jr(),Ma(),Da(),Ue=class{constructor(c,g,$){pi();let S,T;if(typeof c=="object"&&"location"in c)switch(this.dataLocation=c.location,S=c.type,T=c.dims,c.location){case"cpu-pinned":{let z=dt.get(S);if(!z)throw new TypeError(`unsupported type "${S}" to create tensor from pinned buffer`);if(!(c.data instanceof z))throw new TypeError(`buffer should be of type ${z.name}`);this.cpuData=c.data;break}case"texture":{if(S!=="float32")throw new TypeError(`unsupported type "${S}" to create tensor from texture`);this.gpuTextureData=c.texture,this.downloader=c.download,this.disposer=c.dispose;break}case"gpu-buffer":{if(S!=="float32"&&S!=="float16"&&S!=="int32"&&S!=="int64"&&S!=="uint32"&&S!=="uint8"&&S!=="bool"&&S!=="uint4"&&S!=="int4")throw new TypeError(`unsupported type "${S}" to create tensor from gpu buffer`);this.gpuBufferData=c.gpuBuffer,this.downloader=c.download,this.disposer=c.dispose;break}case"ml-tensor":{if(S!=="float32"&&S!=="float16"&&S!=="int32"&&S!=="int64"&&S!=="uint32"&&S!=="uint64"&&S!=="int8"&&S!=="uint8"&&S!=="bool"&&S!=="uint4"&&S!=="int4")throw new TypeError(`unsupported type "${S}" to create tensor from MLTensor`);this.mlTensorData=c.mlTensor,this.downloader=c.download,this.disposer=c.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let z,E;if(typeof c=="string")if(S=c,E=$,c==="string"){if(!Array.isArray(g))throw new TypeError("A string tensor's data must be a string array.");z=g}else{let A=dt.get(c);if(A===void 0)throw new TypeError(`Unsupported tensor type: ${c}.`);if(Array.isArray(g)){if(c==="float16"&&A===Uint16Array||c==="uint4"||c==="int4")throw new TypeError(`Creating a ${c} tensor from number array is not supported. Please use ${A.name} as data.`);c==="uint64"||c==="int64"?z=A.from(g,BigInt):z=A.from(g)}else if(g instanceof A)z=g;else if(g instanceof Uint8ClampedArray)if(c==="uint8")z=Uint8Array.from(g);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if(c==="float16"&&g instanceof Uint16Array&&A!==Uint16Array)z=new globalThis.Float16Array(g.buffer,g.byteOffset,g.length);else throw new TypeError(`A ${S} tensor's data must be type of ${A}`)}else if(E=g,Array.isArray(c)){if(c.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let A=typeof c[0];if(A==="string")S="string",z=c;else if(A==="boolean")S="bool",z=Uint8Array.from(c);else throw new TypeError(`Invalid element type of data array: ${A}.`)}else if(c instanceof Uint8ClampedArray)S="uint8",z=Uint8Array.from(c);else{let A=St.get(c.constructor);if(A===void 0)throw new TypeError(`Unsupported type for tensor data: ${c.constructor}.`);S=A,z=c}if(E===void 0)E=[z.length];else if(!Array.isArray(E))throw new TypeError("A tensor's dims must be a number array");T=E,this.cpuData=z,this.dataLocation="cpu"}let O=ci(T);if(this.cpuData&&O!==this.cpuData.length&&!((S==="uint4"||S==="int4")&&Math.ceil(O/2)===this.cpuData.length))throw new Error(`Tensor's size(${O}) does not match data length(${this.cpuData.length}).`);this.type=S,this.dims=T,this.size=O}static async fromImage(c,g){return ur(c,g)}static fromTexture(c,g){return lr(c,g)}static fromGpuBuffer(c,g){return Pe(c,g)}static fromMLTensor(c,g){return Wt(c,g)}static fromPinnedBuffer(c,g,$){return dr(c,g,$)}toDataURL(c){return lt(this,c)}toImageData(c){return xt(this,c)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(c){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let g=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=g,c&&this.disposer&&(this.disposer(),this.disposer=void 0),g}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(c){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return hi(this,c)}}}),Ge,fi=I(()=>{cr(),Ge=Ue}),Dt,hr,et,Xe,mi=I(()=>{Ve(),Dt=(c,g)=>{(typeof ke.trace>"u"?!ke.wasm.trace:!ke.trace)||console.timeStamp(`${c}::ORT::${g}`)},hr=(c,g)=>{let $=new Error().stack?.split(/\r\n|\r|\n/g)||[],S=!1;for(let T=0;T<$.length;T++){if(S&&!$[T].includes("TRACE_FUNC")){let O=`FUNC_${c}::${$[T].trim().split(" ")[1]}`;g&&(O+=`::${g}`),Dt("CPU",O);return}$[T].includes("TRACE_FUNC")&&(S=!0)}},et=c=>{(typeof ke.trace>"u"?!ke.wasm.trace:!ke.trace)||hr("BEGIN",c)},Xe=c=>{(typeof ke.trace>"u"?!ke.wasm.trace:!ke.trace)||hr("END",c)}}),gi,Pa=I(()=>{We(),fi(),mi(),gi=class sc{constructor(g){this.handler=g}async run(g,$,S){et();let T={},O={};if(typeof g!="object"||g===null||g instanceof Ge||Array.isArray(g))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let z=!0;if(typeof $=="object"){if($===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if($ instanceof Ge)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray($)){if($.length===0)throw new TypeError("'fetches' cannot be an empty array.");z=!1;for(let U of $){if(typeof U!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(U)===-1)throw new RangeError(`'fetches' contains invalid output name: ${U}.`);T[U]=null}if(typeof S=="object"&&S!==null)O=S;else if(typeof S<"u")throw new TypeError("'options' must be an object.")}else{let U=!1,N=Object.getOwnPropertyNames($);for(let L of this.outputNames)if(N.indexOf(L)!==-1){let D=$[L];(D===null||D instanceof Ge)&&(U=!0,z=!1,T[L]=D)}if(U){if(typeof S=="object"&&S!==null)O=S;else if(typeof S<"u")throw new TypeError("'options' must be an object.")}else O=$}}else if(typeof $<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let U of this.inputNames)if(typeof g[U]>"u")throw new Error(`input '${U}' is missing in 'feeds'.`);if(z)for(let U of this.outputNames)T[U]=null;let E=await this.handler.run(g,T,O),A={};for(let U in E)if(Object.hasOwnProperty.call(E,U)){let N=E[U];N instanceof Ge?A[U]=N:A[U]=new Ge(N.type,N.data,N.dims)}return Xe(),A}async release(){return this.handler.dispose()}static async create(g,$,S,T){et();let O,z={};if(typeof g=="string"){if(O=g,typeof $=="object"&&$!==null)z=$;else if(typeof $<"u")throw new TypeError("'options' must be an object.")}else if(g instanceof Uint8Array){if(O=g,typeof $=="object"&&$!==null)z=$;else if(typeof $<"u")throw new TypeError("'options' must be an object.")}else if(g instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&g instanceof SharedArrayBuffer){let N=g,L=0,D=g.byteLength;if(typeof $=="object"&&$!==null)z=$;else if(typeof $=="number"){if(L=$,!Number.isSafeInteger(L))throw new RangeError("'byteOffset' must be an integer.");if(L<0||L>=N.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${N.byteLength}).`);if(D=g.byteLength-L,typeof S=="number"){if(D=S,!Number.isSafeInteger(D))throw new RangeError("'byteLength' must be an integer.");if(D<=0||L+D>N.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${N.byteLength-L}].`);if(typeof T=="object"&&T!==null)z=T;else if(typeof T<"u")throw new TypeError("'options' must be an object.")}else if(typeof S<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof $<"u")throw new TypeError("'options' must be an object.");O=new Uint8Array(N,L,D)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[E,A]=await Oe(z),U=await E.createInferenceSessionHandler(O,A);return Xe(),new sc(U)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}}),fr,Ua=I(()=>{Pa(),fr=gi}),Na=I(()=>{}),La=I(()=>{}),qa=I(()=>{}),Va=I(()=>{}),yi={};X(yi,{InferenceSession:()=>fr,TRACE:()=>Dt,TRACE_FUNC_BEGIN:()=>et,TRACE_FUNC_END:()=>Xe,Tensor:()=>Ge,env:()=>ee,registerBackend:()=>Q});var it=I(()=>{Ee(),Je(),Ua(),fi(),Na(),La(),mi(),qa(),Va()}),mr=I(()=>{}),wi={};X(wi,{default:()=>_i});var gr,yr,_i,Fa=I(()=>{Ui(),ct(),vr(),gr="ort-wasm-proxy-worker",yr=globalThis.self?.name===gr,yr&&(self.onmessage=c=>{let{type:g,in:$}=c.data;try{switch(g){case"init-wasm":Tr($.wasm).then(()=>{Kr($).then(()=>{postMessage({type:g})},S=>{postMessage({type:g,err:S})})},S=>{postMessage({type:g,err:S})});break;case"init-ep":{let{epName:S,env:T}=$;Zr(T,S).then(()=>{postMessage({type:g})},O=>{postMessage({type:g,err:O})});break}case"copy-from":{let{buffer:S}=$,T=Ie(S);postMessage({type:g,out:T});break}case"create":{let{model:S,options:T}=$;yt(S,T).then(O=>{postMessage({type:g,out:O})},O=>{postMessage({type:g,err:O})});break}case"release":Yr($),postMessage({type:g});break;case"run":{let{sessionId:S,inputIndices:T,inputs:O,outputIndices:z,options:E}=$;M(S,T,O,z,new Array(z.length).fill(null),E).then(A=>{A.some(U=>U[3]!=="cpu")?postMessage({type:g,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:g,out:A},Jr([...O,...A]))},A=>{postMessage({type:g,err:A})});break}case"end-profiling":tr($),postMessage({type:g});break;default:}}catch(S){postMessage({type:g,err:S})}}),_i=yr?null:c=>new Worker(c??Ne,{type:"classic",name:gr})}),bi,$i,Ne,wr,Gt,vi,xi,_r,Si,br,Ti,$r,Ei,vr=I(()=>{mr(),bi=typeof location>"u"?void 0:location.origin,$i=()=>typeof document<"u"?document.currentScript?.src:typeof self<"u"?self.location?.href:void 0,Ne=$i(),wr=()=>{if(Ne&&!Ne.startsWith("blob:"))return Ne.substring(0,Ne.lastIndexOf("/")+1)},Gt=(c,g)=>{try{let $=g??Ne;return($?new URL(c,$):new URL(c)).origin===bi}catch{return!1}},vi=(c,g)=>{let $=g??Ne;try{return($?new URL(c,$):new URL(c)).href}catch{return}},xi=(c,g)=>`${g??"./"}${c}`,_r=async c=>{let g=await(await fetch(c,{credentials:"same-origin"})).blob();return URL.createObjectURL(g)},Si=async c=>(await import(c)).default,br=(Fa(),Te(wi)).default,Ti=async()=>{if(!Ne)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(Gt(Ne))return[void 0,br()];let c=await _r(Ne);return[c,br(c)]},$r=void 0,Ei=async(c,g,$)=>{if(!c&&!g&&$r&&Ne&&Gt(Ne))return[void 0,$r];{let S="ort-wasm-simd-threaded.mjs",T=c??vi(S,g),O=$&&T&&!Gt(T,g),z=O?await _r(T):T??xi(S,g);return[O?z:void 0,await Si(z)]}}}),xr,jt,Tt,Sr,ki,Ii,zi,Tr,pe,ct=I(()=>{vr(),jt=!1,Tt=!1,Sr=!1,ki=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},Ii=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},zi=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}},Tr=async c=>{if(jt)return Promise.resolve();if(Tt)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(Sr)throw new Error("previous call to 'initializeWebAssembly()' failed.");Tt=!0;let g=c.initTimeout,$=c.numThreads;if(c.simd!==!1){if(c.simd==="relaxed"){if(!zi())throw new Error("Relaxed WebAssembly SIMD is not supported in the current environment.")}else if(!Ii())throw new Error("WebAssembly SIMD is not supported in the current environment.")}let S=ki();$>1&&!S&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+$+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),c.numThreads=$=1);let T=c.wasmPaths,O=typeof T=="string"?T:void 0,z=T?.mjs,E=z?.href??z,A=T?.wasm,U=A?.href??A,N=c.wasmBinary,[L,D]=await Ei(E,O,$>1),Y=!1,C=[];if(g>0&&C.push(new Promise(V=>{setTimeout(()=>{Y=!0,V()},g)})),C.push(new Promise((V,qe)=>{let _e={numThreads:$};if(N)_e.wasmBinary=N;else if(U||O)_e.locateFile=te=>U??O+te;else if(E&&E.indexOf("blob:")!==0)_e.locateFile=te=>new URL(te,E).href;else if(L){let te=wr();te&&(_e.locateFile=ve=>te+ve)}D(_e).then(te=>{Tt=!1,jt=!0,xr=te,V(),L&&URL.revokeObjectURL(L)},te=>{Tt=!1,Sr=!0,qe(te)})})),await Promise.race(C),Y)throw new Error(`WebAssembly backend initializing failed due to timeout: ${g}ms`)},pe=()=>{if(jt&&xr)return xr;throw new Error("WebAssembly is not initialized yet.")}}),je,Ht,se,Er=I(()=>{ct(),je=(c,g)=>{let $=pe(),S=$.lengthBytesUTF8(c)+1,T=$._malloc(S);return $.stringToUTF8(c,T,S),g.push(T),T},Ht=(c,g,$,S)=>{if(typeof c=="object"&&c!==null){if($.has(c))throw new Error("Circular reference in options");$.add(c)}Object.entries(c).forEach(([T,O])=>{let z=g?g+T:T;if(typeof O=="object")Ht(O,z+".",$,S);else if(typeof O=="string"||typeof O=="number")S(z,O.toString());else if(typeof O=="boolean")S(z,O?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof O}`)})},se=c=>{let g=pe(),$=g.stackSave();try{let S=g.PTR_SIZE,T=g.stackAlloc(2*S);g._OrtGetLastError(T,T+S);let O=Number(g.getValue(T,S===4?"i32":"i64")),z=g.getValue(T+S,"*"),E=z?g.UTF8ToString(z):"";throw new Error(`${c} ERROR_CODE: ${O}, ERROR_MESSAGE: ${E}`)}finally{g.stackRestore($)}}}),Ci,Wa=I(()=>{ct(),Er(),Ci=c=>{let g=pe(),$=0,S=[],T=c||{};try{if(c?.logSeverityLevel===void 0)T.logSeverityLevel=2;else if(typeof c.logSeverityLevel!="number"||!Number.isInteger(c.logSeverityLevel)||c.logSeverityLevel<0||c.logSeverityLevel>4)throw new Error(`log serverity level is not valid: ${c.logSeverityLevel}`);if(c?.logVerbosityLevel===void 0)T.logVerbosityLevel=0;else if(typeof c.logVerbosityLevel!="number"||!Number.isInteger(c.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${c.logVerbosityLevel}`);c?.terminate===void 0&&(T.terminate=!1);let O=0;return c?.tag!==void 0&&(O=je(c.tag,S)),$=g._OrtCreateRunOptions(T.logSeverityLevel,T.logVerbosityLevel,!!T.terminate,O),$===0&&se("Can't create run options."),c?.extra!==void 0&&Ht(c.extra,"",new WeakSet,(z,E)=>{let A=je(z,S),U=je(E,S);g._OrtAddRunConfigEntry($,A,U)!==0&&se(`Can't set a run config entry: ${z} - ${E}.`)}),[$,S]}catch(O){throw $!==0&&g._OrtReleaseRunOptions($),S.forEach(z=>g._free(z)),O}}}),Ai,Oi,Ri,Et,Bi,Mi,Ga=I(()=>{ct(),Er(),Ai=c=>{switch(c){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${c}`)}},Oi=c=>{switch(c){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${c}`)}},Ri=c=>{c.extra||(c.extra={}),c.extra.session||(c.extra.session={});let g=c.extra.session;g.use_ort_model_bytes_directly||(g.use_ort_model_bytes_directly="1"),c.executionProviders&&c.executionProviders.some($=>(typeof $=="string"?$:$.name)==="webgpu")&&(c.enableMemPattern=!1)},Et=(c,g,$,S)=>{let T=je(g,S),O=je($,S);pe()._OrtAddSessionConfigEntry(c,T,O)!==0&&se(`Can't set a session config entry: ${g} - ${$}.`)},Bi=async(c,g,$)=>{for(let S of g){let T=typeof S=="string"?S:S.name,O=[];switch(T){case"webnn":if(T="WEBNN",typeof S!="string"){let N=S?.deviceType;N&&Et(c,"deviceType",N,$)}break;case"webgpu":if(T="JS",typeof S!="string"){let N=S;if(N?.preferredLayout){if(N.preferredLayout!=="NCHW"&&N.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${N.preferredLayout}`);Et(c,"preferredLayout",N.preferredLayout,$)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${T}`)}let z=je(T,$),E=O.length,A=0,U=0;if(E>0){A=pe()._malloc(E*pe().PTR_SIZE),$.push(A),U=pe()._malloc(E*pe().PTR_SIZE),$.push(U);for(let N=0;N<E;N++)pe().setValue(A+N*pe().PTR_SIZE,O[N][0],"*"),pe().setValue(U+N*pe().PTR_SIZE,O[N][1],"*")}await pe()._OrtAppendExecutionProvider(c,z,A,U,E)!==0&&se(`Can't append execution provider: ${T}.`)}},Mi=async c=>{let g=pe(),$=0,S=[],T=c||{};Ri(T);try{let O=Ai(T.graphOptimizationLevel??"all"),z=Oi(T.executionMode??"sequential"),E=typeof T.logId=="string"?je(T.logId,S):0,A=T.logSeverityLevel??2;if(!Number.isInteger(A)||A<0||A>4)throw new Error(`log serverity level is not valid: ${A}`);let U=T.logVerbosityLevel??0;if(!Number.isInteger(U)||U<0||U>4)throw new Error(`log verbosity level is not valid: ${U}`);let N=typeof T.optimizedModelFilePath=="string"?je(T.optimizedModelFilePath,S):0;if($=g._OrtCreateSessionOptions(O,!!T.enableCpuMemArena,!!T.enableMemPattern,z,!!T.enableProfiling,0,E,A,U,N),$===0&&se("Can't create session options."),T.executionProviders&&await Bi($,T.executionProviders,S),T.enableGraphCapture!==void 0){if(typeof T.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${T.enableGraphCapture}`);Et($,"enableGraphCapture",T.enableGraphCapture.toString(),S)}if(T.freeDimensionOverrides)for(let[L,D]of Object.entries(T.freeDimensionOverrides)){if(typeof L!="string")throw new Error(`free dimension override name must be a string: ${L}`);if(typeof D!="number"||!Number.isInteger(D)||D<0)throw new Error(`free dimension override value must be a non-negative integer: ${D}`);let Y=je(L,S);g._OrtAddFreeDimensionOverride($,Y,D)!==0&&se(`Can't set a free dimension override: ${L} - ${D}.`)}return T.extra!==void 0&&Ht(T.extra,"",new WeakSet,(L,D)=>{Et($,L,D,S)}),[$,S]}catch(O){throw $!==0&&g._OrtReleaseSessionOptions($)!==0&&se("Can't release session options."),S.forEach(z=>g._free(z)),O}}}),ht,ft,mt,kr,Ir,zr,Cr,Hr,le=I(()=>{ht=c=>{switch(c){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${c}`)}},ft=c=>{switch(c){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${c}`)}},mt=(c,g)=>{let $=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][c],S=typeof g=="number"?g:g.reduce((T,O)=>T*O,1);return $>0?Math.ceil(S*$):void 0},kr=c=>{switch(c){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${c}`)}},Ir=c=>{switch(c){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${c}`)}},zr=c=>c==="float32"||c==="float16"||c==="int32"||c==="int64"||c==="uint32"||c==="uint8"||c==="bool"||c==="uint4"||c==="int4",Cr=c=>c==="float32"||c==="float16"||c==="int32"||c==="int64"||c==="uint32"||c==="uint64"||c==="int8"||c==="uint8"||c==="bool"||c==="uint4"||c==="int4",Hr=c=>{switch(c){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${c}`)}}}),Ar,Di=I(()=>{mr(),Ar=async c=>{if(typeof c=="string"){let g=await fetch(c);if(!g.ok)throw new Error(`failed to load external data file: ${c}`);let $=g.headers.get("Content-Length"),S=$?parseInt($,10):0;if(S<1073741824)return new Uint8Array(await g.arrayBuffer());{if(!g.body)throw new Error(`failed to load external data file: ${c}, no response body.`);let T=g.body.getReader(),O;try{O=new ArrayBuffer(S)}catch(E){if(E instanceof RangeError){let A=Math.ceil(S/65536);O=new WebAssembly.Memory({initial:A,maximum:A}).buffer}else throw E}let z=0;for(;;){let{done:E,value:A}=await T.read();if(E)break;let U=A.byteLength;new Uint8Array(O,z,U).set(A),z+=U}return new Uint8Array(O,0,S)}}else return c instanceof Blob?new Uint8Array(await c.arrayBuffer()):c instanceof Uint8Array?c:new Uint8Array(c)}}),Pi,Kr,Zr,Pt,Qr,Xr,Ie,yt,Yr,Ut,M,tr,Jr,Ui=I(()=>{Wa(),Ga(),le(),ct(),Er(),Di(),Pi=(c,g)=>{pe()._OrtInit(c,g)!==0&&se("Can't initialize onnxruntime.")},Kr=async c=>{Pi(c.wasm.numThreads,Ir(c.logLevel))},Zr=async(c,g)=>{pe().asyncInit?.()},Pt=new Map,Qr=c=>{let g=pe(),$=g.stackSave();try{let S=g.PTR_SIZE,T=g.stackAlloc(2*S);g._OrtGetInputOutputCount(c,T,T+S)!==0&&se("Can't get session input/output count.");let O=S===4?"i32":"i64";return[Number(g.getValue(T,O)),Number(g.getValue(T+S,O))]}finally{g.stackRestore($)}},Xr=(c,g)=>{let $=pe(),S=$.stackSave(),T=0;try{let O=$.PTR_SIZE,z=$.stackAlloc(2*O);$._OrtGetInputOutputMetadata(c,g,z,z+O)!==0&&se("Can't get session input/output metadata.");let E=Number($.getValue(z,"*"));T=Number($.getValue(z+O,"*"));let A=$.HEAP32[T/4];if(A===0)return[E,0];let U=$.HEAPU32[T/4+1],N=[];for(let L=0;L<U;L++){let D=Number($.getValue(T+8+L*O,"*"));N.push(D!==0?$.UTF8ToString(D):Number($.getValue(T+8+(L+U)*O,"*")))}return[E,A,N]}finally{$.stackRestore(S),T!==0&&$._OrtFree(T)}},Ie=c=>{let g=pe(),$=g._malloc(c.byteLength);if($===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${c.byteLength}.`);return g.HEAPU8.set(c,$),[$,c.byteLength]},yt=async(c,g)=>{let $,S,T=pe();Array.isArray(c)?[$,S]=c:c.buffer===T.HEAPU8.buffer?[$,S]=[c.byteOffset,c.byteLength]:[$,S]=Ie(c);let O=0,z=0,E=[],A=[],U=[];try{if([z,E]=await Mi(g),g?.externalData&&T.mountExternalData){let te=[];for(let ve of g.externalData){let H=typeof ve=="string"?ve:ve.path;te.push(Ar(typeof ve=="string"?ve:ve.data).then(tt=>{T.mountExternalData(H,tt)}))}await Promise.all(te)}for(let te of g?.executionProviders??[])if((typeof te=="string"?te:te.name)==="webnn"){if(T.shouldTransferToMLTensor=!1,typeof te!="string"){let ve=te,H=ve?.context,tt=ve?.gpuDevice,rt=ve?.deviceType,qt=ve?.powerPreference;H?T.currentContext=H:tt?T.currentContext=await T.webnnCreateMLContext(tt):T.currentContext=await T.webnnCreateMLContext({deviceType:rt,powerPreference:qt})}else T.currentContext=await T.webnnCreateMLContext();break}O=await T._OrtCreateSession($,S,z),T.webgpuOnCreateSession?.(O),O===0&&se("Can't create a session."),T.jsepOnCreateSession?.(),T.currentContext&&(T.webnnRegisterMLContext(O,T.currentContext),T.currentContext=void 0,T.shouldTransferToMLTensor=!0);let[N,L]=Qr(O),D=!!g?.enableGraphCapture,Y=[],C=[],V=[],qe=[],_e=[];for(let te=0;te<N;te++){let[ve,H,tt]=Xr(O,te);ve===0&&se("Can't get an input name."),A.push(ve);let rt=T.UTF8ToString(ve);Y.push(rt),V.push(H===0?{name:rt,isTensor:!1}:{name:rt,isTensor:!0,type:ft(H),shape:tt})}for(let te=0;te<L;te++){let[ve,H,tt]=Xr(O,te+N);ve===0&&se("Can't get an output name."),U.push(ve);let rt=T.UTF8ToString(ve);C.push(rt),qe.push(H===0?{name:rt,isTensor:!1}:{name:rt,isTensor:!0,type:ft(H),shape:tt})}return Pt.set(O,[O,A,U,null,D,!1]),[O,Y,C,V,qe]}catch(N){throw A.forEach(L=>T._OrtFree(L)),U.forEach(L=>T._OrtFree(L)),O!==0&&T._OrtReleaseSession(O)!==0&&se("Can't release session."),N}finally{T._free($),z!==0&&T._OrtReleaseSessionOptions(z)!==0&&se("Can't release session options."),E.forEach(N=>T._free(N)),T.unmountExternalData?.()}},Yr=c=>{let g=pe(),$=Pt.get(c);if(!$)throw new Error(`cannot release session. invalid session id: ${c}`);let[S,T,O,z,E]=$;z&&(E&&g._OrtClearBoundOutputs(z.handle)!==0&&se("Can't clear bound outputs."),g._OrtReleaseBinding(z.handle)!==0&&se("Can't release IO binding.")),g.jsepOnReleaseSession?.(c),g.webnnOnReleaseSession?.(c),g.webgpuOnReleaseSession?.(c),T.forEach(A=>g._OrtFree(A)),O.forEach(A=>g._OrtFree(A)),g._OrtReleaseSession(S)!==0&&se("Can't release session."),Pt.delete(c)},Ut=async(c,g,$,S,T,O,z=!1)=>{if(!c){g.push(0);return}let E=pe(),A=E.PTR_SIZE,U=c[0],N=c[1],L=c[3],D=L,Y,C;if(U==="string"&&(L==="gpu-buffer"||L==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(z&&L!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${O} when enableGraphCapture is true.`);if(L==="gpu-buffer"){let _e=c[2].gpuBuffer;C=mt(ht(U),N);{let te=E.jsepRegisterBuffer;if(!te)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');Y=te(S,O,_e,C)}}else if(L==="ml-tensor"){let _e=c[2].mlTensor;C=mt(ht(U),N);let te=E.webnnRegisterMLTensor;if(!te)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');Y=te(S,_e,ht(U),N)}else{let _e=c[2];if(Array.isArray(_e)){C=A*_e.length,Y=E._malloc(C),$.push(Y);for(let te=0;te<_e.length;te++){if(typeof _e[te]!="string")throw new TypeError(`tensor data at index ${te} is not a string`);E.setValue(Y+te*A,je(_e[te],$),"*")}}else{let te=E.webnnIsGraphInput,ve=E.webnnIsGraphOutput;if(U!=="string"&&te&&ve){let H=E.UTF8ToString(T);if(te(S,H)||ve(S,H)){let tt=ht(U);C=mt(tt,N),D="ml-tensor";let rt=E.webnnCreateTemporaryTensor,qt=E.webnnUploadTensor;if(!rt||!qt)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');let Zt=await rt(S,tt,N);qt(Zt,new Uint8Array(_e.buffer,_e.byteOffset,_e.byteLength)),Y=Zt}else C=_e.byteLength,Y=E._malloc(C),$.push(Y),E.HEAPU8.set(new Uint8Array(_e.buffer,_e.byteOffset,C),Y)}else C=_e.byteLength,Y=E._malloc(C),$.push(Y),E.HEAPU8.set(new Uint8Array(_e.buffer,_e.byteOffset,C),Y)}}let V=E.stackSave(),qe=E.stackAlloc(4*N.length);try{N.forEach((te,ve)=>E.setValue(qe+ve*A,te,A===4?"i32":"i64"));let _e=E._OrtCreateTensor(ht(U),Y,C,qe,N.length,Hr(D));_e===0&&se(`Can't create tensor for input/output. session=${S}, index=${O}.`),g.push(_e)}finally{E.stackRestore(V)}},M=async(c,g,$,S,T,O)=>{let z=pe(),E=z.PTR_SIZE,A=Pt.get(c);if(!A)throw new Error(`cannot run inference. invalid session id: ${c}`);let U=A[0],N=A[1],L=A[2],D=A[3],Y=A[4];A[5];let C=g.length,V=S.length,qe=0,_e=[],te=[],ve=[],H=[],tt=z.stackSave(),rt=z.stackAlloc(C*E),qt=z.stackAlloc(C*E),Zt=z.stackAlloc(V*E),ji=z.stackAlloc(V*E);try{[qe,_e]=Ci(O);for(let Ce=0;Ce<C;Ce++)await Ut($[Ce],te,H,c,N[g[Ce]],g[Ce],Y);for(let Ce=0;Ce<V;Ce++)await Ut(T[Ce],ve,H,c,L[S[Ce]],C+S[Ce],Y);for(let Ce=0;Ce<C;Ce++)z.setValue(rt+Ce*E,te[Ce],"*"),z.setValue(qt+Ce*E,N[g[Ce]],"*");for(let Ce=0;Ce<V;Ce++)z.setValue(Zt+Ce*E,ve[Ce],"*"),z.setValue(ji+Ce*E,L[S[Ce]],"*");z.jsepOnRunStart?.(U),z.webnnOnRunStart?.(U);let wt;wt=await z._OrtRun(U,qt,rt,C,ji,V,Zt,qe),wt!==0&&se("failed to call OrtRun().");let He=[],Hi=[];for(let Ce=0;Ce<V;Ce++){let ot=Number(z.getValue(Zt+Ce*E,"*"));if(ot===ve[Ce]){He.push(T[Ce]);continue}let ya=z.stackSave(),zt=z.stackAlloc(4*E),Mr=!1,Ke,ut=0;try{z._OrtGetTensorData(ot,zt,zt+E,zt+2*E,zt+3*E)!==0&&se(`Can't access output tensor data on index ${Ce}.`);let li=E===4?"i32":"i64",Dr=Number(z.getValue(zt,li));ut=z.getValue(zt+E,"*");let Ki=z.getValue(zt+E*2,"*"),wa=Number(z.getValue(zt+E*3,li)),Ct=[];for(let Ze=0;Ze<wa;Ze++)Ct.push(Number(z.getValue(Ki+Ze*E,li)));z._OrtFree(Ki)!==0&&se("Can't free memory for tensor dims.");let Ye=Ct.reduce((Ze,Fe)=>Ze*Fe,1);Ke=ft(Dr);let nr=D?.outputPreferredLocations[S[Ce]];if(Ke==="string"){if(nr==="gpu-buffer"||nr==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let Ze=[];for(let Fe=0;Fe<Ye;Fe++){let bt=z.getValue(ut+Fe*E,"*"),_a=z.getValue(ut+(Fe+1)*E,"*"),ba=Fe===Ye-1?void 0:_a-bt;Ze.push(z.UTF8ToString(bt,ba))}He.push([Ke,Ct,Ze,"cpu"])}else if(nr==="gpu-buffer"&&Ye>0){let Ze=z.jsepGetBuffer;if(!Ze)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let Fe=Ze(ut),bt=mt(Dr,Ye);if(bt===void 0||!zr(Ke))throw new Error(`Unsupported data type: ${Ke}`);Mr=!0,He.push([Ke,Ct,{gpuBuffer:Fe,download:z.jsepCreateDownloader(Fe,bt,Ke),dispose:()=>{z._OrtReleaseTensor(ot)!==0&&se("Can't release tensor.")}},"gpu-buffer"])}else if(nr==="ml-tensor"&&Ye>0){let Ze=z.webnnEnsureTensor,Fe=z.webnnIsGraphInputOutputTypeSupported;if(!Ze||!Fe)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(mt(Dr,Ye)===void 0||!Cr(Ke))throw new Error(`Unsupported data type: ${Ke}`);if(!Fe(c,Ke,!1))throw new Error(`preferredLocation "ml-tensor" for ${Ke} output is not supported by current WebNN Context.`);let bt=await Ze(c,ut,Dr,Ct,!1);Mr=!0,He.push([Ke,Ct,{mlTensor:bt,download:z.webnnCreateMLTensorDownloader(ut,Ke),dispose:()=>{z.webnnReleaseTensorId(ut),z._OrtReleaseTensor(ot)}},"ml-tensor"])}else if(nr==="ml-tensor-cpu-output"&&Ye>0){let Ze=z.webnnCreateMLTensorDownloader(ut,Ke)(),Fe=He.length;Mr=!0,Hi.push((async()=>{let bt=[Fe,await Ze];return z.webnnReleaseTensorId(ut),z._OrtReleaseTensor(ot),bt})()),He.push([Ke,Ct,[],"cpu"])}else{let Ze=kr(Ke),Fe=new Ze(Ye);new Uint8Array(Fe.buffer,Fe.byteOffset,Fe.byteLength).set(z.HEAPU8.subarray(ut,ut+Fe.byteLength)),He.push([Ke,Ct,Fe,"cpu"])}}finally{z.stackRestore(ya),Ke==="string"&&ut&&z._free(ut),Mr||z._OrtReleaseTensor(ot)}}D&&!Y&&(z._OrtClearBoundOutputs(D.handle)!==0&&se("Can't clear bound outputs."),Pt.set(c,[U,N,L,D,Y,!1]));for(let[Ce,ot]of await Promise.all(Hi))He[Ce][2]=ot;return He}finally{z.webnnOnRunEnd?.(U),z.stackRestore(tt),te.forEach(wt=>z._OrtReleaseTensor(wt)),ve.forEach(wt=>z._OrtReleaseTensor(wt)),H.forEach(wt=>z._free(wt)),qe!==0&&z._OrtReleaseRunOptions(qe),_e.forEach(wt=>z._free(wt))}},tr=c=>{let g=pe(),$=Pt.get(c);if(!$)throw new Error("invalid session id");let S=$[0],T=g._OrtEndProfiling(S);T===0&&se("Can't get an profile file name."),g._OrtFree(T)},Jr=c=>{let g=[];for(let $ of c){let S=$[2];!Array.isArray(S)&&"buffer"in S&&g.push(S.buffer)}return g}}),kt,ne,Nt,rr,Kt,ir,Or,Rr,It,Lt,ei,ti,ri,Ni,Li,ma,ar,qi,Vi=I(()=>{it(),Ui(),ct(),vr(),kt=()=>!!ee.wasm.proxy&&typeof document<"u",Nt=!1,rr=!1,Kt=!1,Rr=new Map,It=(c,g)=>{let $=Rr.get(c);$?$.push(g):Rr.set(c,[g])},Lt=()=>{if(Nt||!rr||Kt||!ne)throw new Error("worker not ready")},ei=c=>{switch(c.data.type){case"init-wasm":Nt=!1,c.data.err?(Kt=!0,Or[1](c.data.err)):(rr=!0,Or[0]()),ir&&(URL.revokeObjectURL(ir),ir=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let g=Rr.get(c.data.type);c.data.err?g.shift()[1](c.data.err):g.shift()[0](c.data.out);break}}},ti=async()=>{if(!rr){if(Nt)throw new Error("multiple calls to 'initWasm()' detected.");if(Kt)throw new Error("previous call to 'initWasm()' failed.");if(Nt=!0,kt())return new Promise((c,g)=>{ne?.terminate(),Ti().then(([$,S])=>{try{ne=S,ne.onerror=O=>g(O),ne.onmessage=ei,Or=[c,g];let T={type:"init-wasm",in:ee};if(!T.in.wasm.wasmPaths&&$){let O=wr();O&&(T.in.wasm.wasmPaths=O)}ne.postMessage(T),ir=$}catch(T){g(T)}},g)});try{await Tr(ee.wasm),await Kr(ee),rr=!0}catch(c){throw Kt=!0,c}finally{Nt=!1}}},ri=async c=>{if(kt())return Lt(),new Promise((g,$)=>{It("init-ep",[g,$]);let S={type:"init-ep",in:{epName:c,env:ee}};ne.postMessage(S)});await Zr(ee,c)},Ni=async c=>kt()?(Lt(),new Promise((g,$)=>{It("copy-from",[g,$]);let S={type:"copy-from",in:{buffer:c}};ne.postMessage(S,[c.buffer])})):Ie(c),Li=async(c,g)=>{if(kt()){if(g?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return Lt(),new Promise(($,S)=>{It("create",[$,S]);let T={type:"create",in:{model:c,options:{...g}}},O=[];c instanceof Uint8Array&&O.push(c.buffer),ne.postMessage(T,O)})}else return yt(c,g)},ma=async c=>{if(kt())return Lt(),new Promise((g,$)=>{It("release",[g,$]);let S={type:"release",in:c};ne.postMessage(S)});Yr(c)},ar=async(c,g,$,S,T,O)=>{if(kt()){if($.some(z=>z[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(T.some(z=>z))throw new Error("pre-allocated output tensor is not supported for proxy.");return Lt(),new Promise((z,E)=>{It("run",[z,E]);let A=$,U={type:"run",in:{sessionId:c,inputIndices:g,inputs:A,outputIndices:S,options:O}};ne.postMessage(U,Jr(A))})}else return M(c,g,$,S,T,O)},qi=async c=>{if(kt())return Lt(),new Promise((g,$)=>{It("end-profiling",[g,$]);let S={type:"end-profiling",in:c};ne.postMessage(S)});tr(c)}}),Fi,ii,ai,ni=I(()=>{it(),Vi(),le(),mr(),Di(),Fi=(c,g)=>{switch(c.location){case"cpu":return[c.type,c.dims,c.data,"cpu"];case"gpu-buffer":return[c.type,c.dims,{gpuBuffer:c.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[c.type,c.dims,{mlTensor:c.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${c.location} for ${g()}`)}},ii=c=>{switch(c[3]){case"cpu":return new Ge(c[0],c[2],c[1]);case"gpu-buffer":{let g=c[0];if(!zr(g))throw new Error(`not supported data type: ${g} for deserializing GPU tensor`);let{gpuBuffer:$,download:S,dispose:T}=c[2];return Ge.fromGpuBuffer($,{dataType:g,dims:c[1],download:S,dispose:T})}case"ml-tensor":{let g=c[0];if(!Cr(g))throw new Error(`not supported data type: ${g} for deserializing MLTensor tensor`);let{mlTensor:$,download:S,dispose:T}=c[2];return Ge.fromMLTensor($,{dataType:g,dims:c[1],download:S,dispose:T})}default:throw new Error(`invalid data location: ${c[3]}`)}},ai=class{async fetchModelAndCopyToWasmMemory(c){return Ni(await Ar(c))}async loadModel(c,g){et();let $;typeof c=="string"?$=await this.fetchModelAndCopyToWasmMemory(c):$=c,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=await Li($,g),Xe()}async dispose(){return ma(this.sessionId)}async run(c,g,$){et();let S=[],T=[];Object.entries(c).forEach(L=>{let D=L[0],Y=L[1],C=this.inputNames.indexOf(D);if(C===-1)throw new Error(`invalid input '${D}'`);S.push(Y),T.push(C)});let O=[],z=[];Object.entries(g).forEach(L=>{let D=L[0],Y=L[1],C=this.outputNames.indexOf(D);if(C===-1)throw new Error(`invalid output '${D}'`);O.push(Y),z.push(C)});let E=S.map((L,D)=>Fi(L,()=>`input "${this.inputNames[T[D]]}"`)),A=O.map((L,D)=>L?Fi(L,()=>`output "${this.outputNames[z[D]]}"`):null),U=await ar(this.sessionId,T,E,z,A,$),N={};for(let L=0;L<U.length;L++)N[this.outputNames[z[L]]]=O[L]??ii(U[L]);return Xe(),N}startProfiling(){}endProfiling(){qi(this.sessionId)}}}),Br={};X(Br,{OnnxruntimeWebAssemblyBackend:()=>oi,initializeFlags:()=>si,wasmBackend:()=>ui});var si,oi,ui,Wi=I(()=>{it(),Vi(),ni(),si=()=>{(typeof ee.wasm.initTimeout!="number"||ee.wasm.initTimeout<0)&&(ee.wasm.initTimeout=0);let c=ee.wasm.simd;if(typeof c!="boolean"&&c!==void 0&&c!=="fixed"&&c!=="relaxed"&&(console.warn(`Property "env.wasm.simd" is set to unknown value "${c}". Reset it to \`false\` and ignore SIMD feature checking.`),ee.wasm.simd=!1),typeof ee.wasm.proxy!="boolean"&&(ee.wasm.proxy=!1),typeof ee.wasm.trace!="boolean"&&(ee.wasm.trace=!1),typeof ee.wasm.numThreads!="number"||!Number.isInteger(ee.wasm.numThreads)||ee.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)ee.wasm.numThreads=1;else{let g=typeof navigator>"u"?G("node:os").cpus().length:navigator.hardwareConcurrency;ee.wasm.numThreads=Math.min(4,Math.ceil((g||1)/2))}},oi=class{async init(c){si(),await ti(),await ri(c)}async createInferenceSessionHandler(c,g){let $=new ai;return await $.loadModel(c,g),$}},ui=new oi}),Gi={};X(Gi,{InferenceSession:()=>fr,TRACE:()=>Dt,TRACE_FUNC_BEGIN:()=>et,TRACE_FUNC_END:()=>Xe,Tensor:()=>Ge,default:()=>ja,env:()=>ee,registerBackend:()=>Q}),it(),it(),it();var ga="1.22.0",ja=yi;{let c=(Wi(),Te(Br)).wasmBackend;Q("cpu",c,10),Q("wasm",c,10)}return Object.defineProperty(ee.versions,"web",{value:ga,enumerable:!0}),Te(Gi)})();W.exports=Ae})(ts)),ts.exports}var Jp;function ch(){return Jp||(Jp=1,(function(W){var $e=er&&er.__createBinding||(Object.create?(function(Ee,we,me,Re){Re===void 0&&(Re=me);var ke=Object.getOwnPropertyDescriptor(we,me);(!ke||("get"in ke?!we.__esModule:ke.writable||ke.configurable))&&(ke={enumerable:!0,get:function(){return we[me]}}),Object.defineProperty(Ee,Re,ke)}):(function(Ee,we,me,Re){Re===void 0&&(Re=me),Ee[Re]=we[me]})),Ae=er&&er.__setModuleDefault||(Object.create?(function(Ee,we){Object.defineProperty(Ee,"default",{enumerable:!0,value:we})}):function(Ee,we){Ee.default=we}),xe=er&&er.__importStar||function(Ee){if(Ee&&Ee.__esModule)return Ee;var we={};if(Ee!=null)for(var me in Ee)me!=="default"&&Object.prototype.hasOwnProperty.call(Ee,me)&&$e(we,Ee,me);return Ae(we,Ee),we};Object.defineProperty(W,"__esModule",{value:!0}),W.MicVAD=W.getDefaultRealTimeVADOptions=W.ort=W.DEFAULT_MODEL=void 0;const ze=xe(ph()),fe=rs(),oe=is(),G=fa(),I=Ba(),X=ac(),ye=nc();W.DEFAULT_MODEL="legacy",W.ort=ze;const Te="vad.worklet.bundle.min.js",he={legacy:"silero_vad_legacy.onnx",v5:"silero_vad_v5.onnx",v6:"silero_vad_v6.onnx"},ue=Ee=>({...oe.defaultFrameProcessorOptions,onFrameProcessed:()=>{},onVADMisfire:()=>{G.log.debug("VAD misfire")},onSpeechStart:()=>{G.log.debug("Detected speech start")},onSpeechEnd:()=>{G.log.debug("Detected speech end")},onSpeechRealStart:()=>{G.log.debug("Detected real speech start")},baseAssetPath:"./",onnxWASMBasePath:"./",model:Ee,workletOptions:{},getStream:async()=>await navigator.mediaDevices.getUserMedia({audio:{channelCount:1,echoCancellation:!0,autoGainControl:!0,noiseSuppression:!0}}),pauseStream:async we=>{we.getTracks().forEach(me=>{me.stop()})},resumeStream:async()=>await navigator.mediaDevices.getUserMedia({audio:{channelCount:1,echoCancellation:!0,autoGainControl:!0,noiseSuppression:!0}}),ortConfig:we=>{we.env.logLevel="error"},startOnLoad:!0,processorType:"auto"});W.getDefaultRealTimeVADOptions=ue;const Q=Ee=>"audioWorklet"in Ee&&typeof AudioWorkletNode=="function"?"AudioWorklet":"ScriptProcessor";async function ae(Ee,we,me,Re,ke){await me.audioWorklet.addModule(Ee),we.processorOptions={...we.processorOptions??{},frameSamples:Re};const Ve=new AudioWorkletNode(me,"vad-helper-worklet",we);return Ve.port.onmessage=async ee=>{const Je=ee.data;if(!(typeof Je=="object"&&Je&&"message"in Je)){console.error("Invalid message event",Je);return}switch(Je.message){case I.Message.AudioFrame:{if(!("data"in Je&&Je.data instanceof ArrayBuffer)){console.log("Audio frame message has no data");return}const lt=new Float32Array(Je.data);await ke(lt);break}}},Ve}async function Oe(Ee,we,me){const Re=new ye.Resampler({nativeSampleRate:Ee.sampleRate,targetSampleRate:16e3,targetFrameSize:we});G.log.debug("using script processor");const Ve=Ee.createScriptProcessor(4096,1,1);let ee=!1;return Ve.onaudioprocess=async Je=>{if(!ee){ee=!0;try{const lt=Je.inputBuffer.getChannelData(0);Je.outputBuffer.getChannelData(0).fill(0);const _t=Re.process(lt);for(const gt of _t)await me(gt)}catch(lt){console.error("Error processing audio:",lt)}finally{ee=!1}}},Ve.connect(Ee.destination),Ve}class We{constructor(we,me,Re,ke,Ve=!1,ee=null,Je=null,lt=null,xt=null,_t=null,gt=null,ur="uninitialized",lr=!1){this.options=we,this.frameProcessor=me,this.model=Re,this.frameSamples=ke,this.listening=Ve,this.errored=ee,this._stream=Je,this._audioContext=lt,this._vadNode=xt,this._mediaStreamAudioSourceNode=_t,this._audioProcessorAdapterType=gt,this.initializationState=ur,this.ownsAudioContext=lr,this.getAudioInstances=()=>{if(this._stream===null||this._audioContext===null||this._vadNode==null||this._mediaStreamAudioSourceNode==null)throw new Error("MicVAD has null stream, audio context, or processor adapter");return{stream:this._stream,audioContext:this._audioContext,vadNode:this._vadNode,mediaStreamAudioSourceNode:this._mediaStreamAudioSourceNode}},this.setErrored=Pe=>{this.initializationState="errored",this.errored=Pe},this.start=async()=>{switch(this.initializationState){case"uninitialized":{G.log.debug("initializing micVAD"),this.initializationState="initializing",this.frameProcessor.resume();try{this._stream=await this.options.getStream()}catch(Pe){throw Pe instanceof Error?this.setErrored(Pe.message):this.setErrored(String(Pe)),Pe}if(this.options.audioContext?(console.log("using custom audio context"),this._audioContext=this.options.audioContext):(console.log("using default audio context"),this._audioContext=new AudioContext,this.ownsAudioContext=!0),!this._audioContext)throw this.setErrored("Audio context is null"),Error("Audio context is null");switch(this._audioProcessorAdapterType=this.options.processorType=="auto"?Q(this._audioContext):this.options.processorType,this._audioProcessorAdapterType){case"AudioWorklet":this._vadNode=await ae(this.options.baseAssetPath+Te,this.options.workletOptions,this._audioContext,this.frameSamples,this.processFrame);break;case"ScriptProcessor":this._vadNode=await Oe(this._audioContext,this.frameSamples,this.processFrame);break;default:throw new Error(`Unsupported audio processor adapter type: ${this._audioProcessorAdapterType}`)}this._mediaStreamAudioSourceNode=new MediaStreamAudioSourceNode(this._audioContext,{mediaStream:this._stream}),this._mediaStreamAudioSourceNode.connect(this._vadNode),G.log.debug("started micVAD"),this.listening=!0,this.initializationState="initialized";break}case"initializing":{G.log.warn("start called while initializing");break}case"initialized":{if(this.listening)return;this.listening=!0,this.frameProcessor.resume();const{stream:Pe,audioContext:Wt,vadNode:dr}=this.getAudioInstances();this._stream=await this.options.resumeStream(Pe);const jr=new MediaStreamAudioSourceNode(Wt,{mediaStream:this._stream});this._mediaStreamAudioSourceNode=jr,jr.connect(dr);break}case"destroyed":{G.log.warn("start called after destroyed");break}case"errored":{G.log.error("start called after errored");break}default:{G.log.warn("weird initialization state");break}}},this.pause=async()=>{if(!this.listening)return;this.listening=!1;const{stream:Pe,mediaStreamAudioSourceNode:Wt}=this.getAudioInstances();await this.options.pauseStream(Pe),Wt.disconnect(),this.frameProcessor.pause(this.handleFrameProcessorEvent)},this.destroy=async()=>{G.log.debug("destroy called"),this.initializationState="destroyed";const{vadNode:Pe}=this.getAudioInstances();Pe instanceof AudioWorkletNode&&Pe.port.postMessage(I.Message.SpeechStop),this.listening&&await this.pause(),await this.model.release(),this.ownsAudioContext&&await this._audioContext?.close()},this.setOptions=Pe=>{this.frameProcessor.setOptions(Pe)},this.processFrame=async Pe=>{await this.frameProcessor.process(Pe,this.handleFrameProcessorEvent)},this.handleFrameProcessorEvent=Pe=>{switch(Pe.msg){case I.Message.FrameProcessed:this.options.onFrameProcessed(Pe.probs,Pe.frame);break;case I.Message.SpeechStart:this.options.onSpeechStart();break;case I.Message.SpeechRealStart:this.options.onSpeechRealStart();break;case I.Message.VADMisfire:this.options.onVADMisfire();break;case I.Message.SpeechEnd:this.options.onSpeechEnd(Pe.audio);break}}}static async new(we={}){const me={...(0,W.getDefaultRealTimeVADOptions)(we.model??W.DEFAULT_MODEL),...we};(0,oe.validateOptions)(me),W.ort.env.wasm.wasmPaths=me.onnxWASMBasePath,me.ortConfig!==void 0&&me.ortConfig(W.ort);const Re=me.baseAssetPath+he[me.model],ke=me.model==="legacy"?X.SileroLegacy.new:X.Silero.new;let Ve;try{Ve=await ke(W.ort,()=>(0,fe.defaultModelFetcher)(Re))}catch(_t){throw console.error(`Encountered an error while loading model file ${Re}`),_t}const ee=me.model==="legacy"?1536:512,Je=ee/16,lt=new oe.FrameProcessor(Ve.process,Ve.reset_state,{positiveSpeechThreshold:me.positiveSpeechThreshold,negativeSpeechThreshold:me.negativeSpeechThreshold,redemptionMs:me.redemptionMs,preSpeechPadMs:me.preSpeechPadMs,minSpeechMs:me.minSpeechMs,submitUserSpeechOnPause:me.submitUserSpeechOnPause},Je),xt=new We(me,lt,Ve,ee);if(me.startOnLoad)try{await xt.start()}catch(_t){throw console.error("Error starting micVad",_t),_t}return xt}}W.MicVAD=We})(er)),er}var ec;function hh(){return ec||(ec=1,(function(W){Object.defineProperty(W,"__esModule",{value:!0}),W.getDefaultRealTimeVADOptions=W.MicVAD=W.DEFAULT_MODEL=W.utils=W.NonRealTimeVAD=W.Message=W.FrameProcessor=W.defaultModelFetcher=W.baseAssetPath=void 0;var $e=tc();Object.defineProperty(W,"baseAssetPath",{enumerable:!0,get:function(){return $e.baseAssetPath}});var Ae=rs();Object.defineProperty(W,"defaultModelFetcher",{enumerable:!0,get:function(){return Ae.defaultModelFetcher}});var xe=is();Object.defineProperty(W,"FrameProcessor",{enumerable:!0,get:function(){return xe.FrameProcessor}});var ze=Ba();Object.defineProperty(W,"Message",{enumerable:!0,get:function(){return ze.Message}});var fe=lh();Object.defineProperty(W,"NonRealTimeVAD",{enumerable:!0,get:function(){return fe.NonRealTimeVAD}});const oe=dh();W.utils={audioFileToArray:oe.audioFileToArray,minFramesForTargetMS:oe.minFramesForTargetMS,arrayBufferToBase64:oe.arrayBufferToBase64,encodeWAV:oe.encodeWAV};var G=ch();Object.defineProperty(W,"DEFAULT_MODEL",{enumerable:!0,get:function(){return G.DEFAULT_MODEL}}),Object.defineProperty(W,"MicVAD",{enumerable:!0,get:function(){return G.MicVAD}}),Object.defineProperty(W,"getDefaultRealTimeVADOptions",{enumerable:!0,get:function(){return G.getDefaultRealTimeVADOptions}})})(Yn)),Yn}var fh=hh();const mh=ah({__proto__:null},[fh]);export{mh as i};
