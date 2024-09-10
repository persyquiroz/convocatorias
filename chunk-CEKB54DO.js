import{Ca as se,Ia as ce,Jc as k,La as A,O as X,Oa as ue,Qc as F,W as ee,X as te,a as h,b,ea as ne,fa as T,g as S,ia as R,j as Y,k as I,la as c,m as Q,na as l,o as W,oa as f,pa as re,sa as oe,v as J,xb as D,ya as ie}from"./chunk-XIX3ZHYF.js";function M(e,t){let o=!t?.manualCleanup;o&&!t?.injector&&se(M);let n=o?t?.injector?.get(A)??f(A):null,r=De(t?.equal),i;t?.requireSync?i=D({kind:0},{equal:r}):i=D({kind:1,value:t?.initialValue},{equal:r});let s=e.subscribe({next:a=>i.set({kind:1,value:a}),error:a=>{if(t?.rejectErrors)throw a;i.set({kind:2,error:a})}});if(t?.requireSync&&i().kind===0)throw new T(601,!1);return n?.onDestroy(s.unsubscribe.bind(s)),F(()=>{let a=i();switch(a.kind){case 1:return a.value;case 2:throw a.error;case 0:throw new T(601,!1)}},{equal:t?.equal})}function De(e=Object.is){return(t,o)=>t.kind===1&&o.kind===1&&e(t.value,o.value)}var N={};function E(e,t){if(N[e]=(N[e]||0)+1,typeof t=="function")return U(e,(...n)=>b(h({},t(...n)),{type:e}));switch(t?t._as:"empty"){case"empty":return U(e,()=>({type:e}));case"props":return U(e,n=>b(h({},n),{type:e}));default:throw new Error("Unexpected config.")}}function x(){return{_as:"props",_p:void 0}}function U(e,t){return Object.defineProperty(t,"type",{value:e,writable:!1})}var Se="@ngrx/store/init",m=(()=>{let t=class t extends I{constructor(){super({type:Se})}next(n){if(typeof n=="function")throw new TypeError(`
        Dispatch expected an object, instead it received a function.
        If you're using the createAction function, make sure to invoke the function
        before dispatching the action. For example, someAction should be someAction().`);if(typeof n>"u")throw new TypeError("Actions must be objects");if(typeof n.type>"u")throw new TypeError("Actions must have a type property");super.next(n)}complete(){}ngOnDestroy(){super.complete()}};t.\u0275fac=function(r){return new(r||t)},t.\u0275prov=R({token:t,factory:t.\u0275fac});let e=t;return e})(),ke=[m],Ie=new c("@ngrx/store Internal Root Guard"),ae=new c("@ngrx/store Internal Initial State"),q=new c("@ngrx/store Initial State"),Fe=new c("@ngrx/store Reducer Factory"),de=new c("@ngrx/store Internal Reducer Factory Provider"),je=new c("@ngrx/store Initial Reducers"),_=new c("@ngrx/store Internal Initial Reducers"),Vt=new c("@ngrx/store Store Features"),le=new c("@ngrx/store Internal Store Reducers"),$t=new c("@ngrx/store Internal Feature Reducers"),qt=new c("@ngrx/store Internal Feature Configs"),Lt=new c("@ngrx/store Internal Store Features"),Kt=new c("@ngrx/store Internal Feature Reducers Token"),Bt=new c("@ngrx/store Feature Reducers"),fe=new c("@ngrx/store User Provided Meta Reducers"),j=new c("@ngrx/store Meta Reducers"),pe=new c("@ngrx/store Internal Resolved Meta Reducers"),ye=new c("@ngrx/store User Runtime Checks Config"),he=new c("@ngrx/store Internal User Runtime Checks Config"),v=new c("@ngrx/store Internal Runtime Checks"),we=new c("@ngrx/store Check if Action types are unique"),Re=new c("@ngrx/store Root Store Provider"),Gt=new c("@ngrx/store Feature State Provider");function Me(e,t={}){let o=Object.keys(e),n={};for(let i=0;i<o.length;i++){let s=o[i];typeof e[s]=="function"&&(n[s]=e[s])}let r=Object.keys(n);return function(s,a){s=s===void 0?t:s;let d=!1,p={};for(let u=0;u<r.length;u++){let y=r[u],O=n[y],Z=s[y],H=O(Z,a);p[y]=H,d=d||H!==Z}return d?p:s}}function Ue(e,t){return Object.keys(e).filter(o=>o!==t).reduce((o,n)=>Object.assign(o,{[n]:e[n]}),{})}function Ce(...e){return function(t){if(e.length===0)return t;let o=e[e.length-1];return e.slice(0,-1).reduceRight((r,i)=>i(r),o(t))}}function xe(e,t){return Array.isArray(t)&&t.length>0&&(e=Ce.apply(null,[...t,e])),(o,n)=>{let r=e(o);return(i,s)=>(i=i===void 0?n:i,r(i,s))}}function _e(e){let t=Array.isArray(e)&&e.length>0?Ce(...e):o=>o;return(o,n)=>(o=t(o),(r,i)=>(r=r===void 0?n:r,o(r,i)))}var g=class extends S{},w=class extends m{},Ne="@ngrx/store/update-reducers",P=(()=>{let t=class t extends I{get currentReducers(){return this.reducers}constructor(n,r,i,s){super(s(i,r)),this.dispatcher=n,this.initialState=r,this.reducers=i,this.reducerFactory=s}addFeature(n){this.addFeatures([n])}addFeatures(n){let r=n.reduce((i,{reducers:s,reducerFactory:a,metaReducers:d,initialState:p,key:u})=>{let y=typeof s=="function"?_e(d)(s,p):xe(a,d)(s,p);return i[u]=y,i},{});this.addReducers(r)}removeFeature(n){this.removeFeatures([n])}removeFeatures(n){this.removeReducers(n.map(r=>r.key))}addReducer(n,r){this.addReducers({[n]:r})}addReducers(n){this.reducers=h(h({},this.reducers),n),this.updateReducers(Object.keys(n))}removeReducer(n){this.removeReducers([n])}removeReducers(n){n.forEach(r=>{this.reducers=Ue(this.reducers,r)}),this.updateReducers(n)}updateReducers(n){this.next(this.reducerFactory(this.reducers,this.initialState)),this.dispatcher.next({type:Ne,features:n})}ngOnDestroy(){this.complete()}};t.\u0275fac=function(r){return new(r||t)(l(w),l(q),l(je),l(Fe))},t.\u0275prov=R({token:t,factory:t.\u0275fac});let e=t;return e})(),Pe=[P,{provide:g,useExisting:P},{provide:w,useExisting:m}],L=(()=>{let t=class t extends Y{ngOnDestroy(){this.complete()}};t.\u0275fac=(()=>{let n;return function(i){return(n||(n=ce(t)))(i||t)}})(),t.\u0275prov=R({token:t,factory:t.\u0275fac});let e=t;return e})(),ze=[L],C=class extends S{},me=(()=>{let t=class t extends I{constructor(n,r,i,s){super(s);let d=n.pipe(W(Q)).pipe(ne(r)),p={state:s},u=d.pipe(te(Ve,p));this.stateSubscription=u.subscribe(({state:y,action:O})=>{this.next(y),i.next(O)}),this.state=M(this,{manualCleanup:!0,requireSync:!0})}ngOnDestroy(){this.stateSubscription.unsubscribe(),this.complete()}};t.INIT=Se,t.\u0275fac=function(r){return new(r||t)(l(m),l(g),l(L),l(q))},t.\u0275prov=R({token:t,factory:t.\u0275fac});let e=t;return e})();function Ve(e={state:void 0},[t,o]){let{state:n}=e;return{state:o(n,t),action:t}}var $e=[me,{provide:C,useExisting:me}],K=(()=>{let t=class t extends S{constructor(n,r,i){super(),this.actionsObserver=r,this.reducerManager=i,this.source=n,this.state=n.state}select(n,...r){return Le.call(null,n,...r)(this)}selectSignal(n,r){return F(()=>n(this.state()),r)}lift(n){let r=new t(this,this.actionsObserver,this.reducerManager);return r.operator=n,r}dispatch(n){this.actionsObserver.next(n)}next(n){this.actionsObserver.next(n)}error(n){this.actionsObserver.error(n)}complete(){this.actionsObserver.complete()}addReducer(n,r){this.reducerManager.addReducer(n,r)}removeReducer(n){this.reducerManager.removeReducer(n)}};t.\u0275fac=function(r){return new(r||t)(l(C),l(m),l(P))},t.\u0275prov=R({token:t,factory:t.\u0275fac});let e=t;return e})(),qe=[K];function Le(e,t,...o){return function(r){let i;if(typeof e=="string"){let s=[t,...o].filter(Boolean);i=r.pipe(ee(e,...s))}else if(typeof e=="function")i=r.pipe(J(s=>e(s,t)));else throw new TypeError(`Unexpected type '${typeof e}' in select operator, expected 'string' or 'function'`);return i.pipe(X())}}var B="https://ngrx.io/guide/store/configuration/runtime-checks";function ve(e){return e===void 0}function ge(e){return e===null}function Oe(e){return Array.isArray(e)}function Ke(e){return typeof e=="string"}function Be(e){return typeof e=="boolean"}function Ge(e){return typeof e=="number"}function Te(e){return typeof e=="object"&&e!==null}function Ze(e){return Te(e)&&!Oe(e)}function He(e){if(!Ze(e))return!1;let t=Object.getPrototypeOf(e);return t===Object.prototype||t===null}function z(e){return typeof e=="function"}function Ye(e){return z(e)&&e.hasOwnProperty("\u0275cmp")}function Qe(e,t){return Object.prototype.hasOwnProperty.call(e,t)}var We=!1;function Je(){return We}function Ee(e,t){return e===t}function Xe(e,t,o){for(let n=0;n<e.length;n++)if(!o(e[n],t[n]))return!0;return!1}function Ae(e,t=Ee,o=Ee){let n=null,r=null,i;function s(){n=null,r=null}function a(u=void 0){i={result:u}}function d(){i=void 0}function p(){if(i!==void 0)return i.result;if(!n)return r=e.apply(null,arguments),n=arguments,r;if(!Xe(arguments,n,t))return r;let u=e.apply(null,arguments);return n=arguments,o(r,u)?r:(r=u,u)}return{memoized:p,reset:s,setResult:a,clearResult:d}}function et(...e){return nt(Ae)(...e)}function tt(e,t,o,n){if(o===void 0){let i=t.map(s=>s(e));return n.memoized.apply(null,i)}let r=t.map(i=>i(e,o));return n.memoized.apply(null,[...r,o])}function nt(e,t={stateFn:tt}){return function(...o){let n=o;if(Array.isArray(n[0])){let[u,...y]=n;n=[...u,...y]}else n.length===1&&rt(n[0])&&(n=ot(n[0]));let r=n.slice(0,n.length-1),i=n[n.length-1],s=r.filter(u=>u.release&&typeof u.release=="function"),a=e(function(...u){return i.apply(null,u)}),d=Ae(function(u,y){return t.stateFn.apply(null,[u,r,y,a])});function p(){d.reset(),a.reset(),s.forEach(u=>u.release())}return Object.assign(d.memoized,{release:p,projector:a.memoized,setResult:d.setResult,clearResult:d.clearResult})}}function Zt(e){return et(t=>{let o=t[e];return!Je()&&k()&&!(e in t)&&console.warn(`@ngrx/store: The feature name "${e}" does not exist in the state, therefore createFeatureSelector cannot access it.  Be sure it is imported in a loaded module using StoreModule.forRoot('${e}', ...) or StoreModule.forFeature('${e}', ...).  If the default state is intended to be undefined, as is the case with router state, this development-only warning message can be ignored.`),o},t=>t)}function rt(e){return!!e&&typeof e=="object"&&Object.values(e).every(t=>typeof t=="function")}function ot(e){let t=Object.values(e),o=Object.keys(e),n=(...r)=>o.reduce((i,s,a)=>b(h({},i),{[s]:r[a]}),{});return[...t,n]}function it(e){return e instanceof c?f(e):e}function st(e){return typeof e=="function"?e():e}function ct(e,t){return e.concat(t)}function ut(){if(f(K,{optional:!0,skipSelf:!0}))throw new TypeError("The root Store has been provided more than once. Feature modules should provide feature states instead.");return"guarded"}function at(e,t){return function(o,n){let r=t.action(n)?V(n):n,i=e(o,r);return t.state()?V(i):i}}function V(e){Object.freeze(e);let t=z(e);return Object.getOwnPropertyNames(e).forEach(o=>{if(!o.startsWith("\u0275")&&Qe(e,o)&&(!t||o!=="caller"&&o!=="callee"&&o!=="arguments")){let n=e[o];(Te(n)||z(n))&&!Object.isFrozen(n)&&V(n)}}),e}function dt(e,t){return function(o,n){if(t.action(n)){let i=$(n);be(i,"action")}let r=e(o,n);if(t.state()){let i=$(r);be(i,"state")}return r}}function $(e,t=[]){return(ve(e)||ge(e))&&t.length===0?{path:["root"],value:e}:Object.keys(e).reduce((n,r)=>{if(n)return n;let i=e[r];return Ye(i)?n:ve(i)||ge(i)||Ge(i)||Be(i)||Ke(i)||Oe(i)?!1:He(i)?$(i,[...t,r]):{path:[...t,r],value:i}},!1)}function be(e,t){if(e===!1)return;let o=e.path.join("."),n=new Error(`Detected unserializable ${t} at "${o}". ${B}#strict${t}serializability`);throw n.value=e.value,n.unserializablePath=o,n}function lt(e,t){return function(o,n){if(t.action(n)&&!ue.isInAngularZone())throw new Error(`Action '${n.type}' running outside NgZone. ${B}#strictactionwithinngzone`);return e(o,n)}}function ft(e){return k()?h({strictStateSerializability:!1,strictActionSerializability:!1,strictStateImmutability:!0,strictActionImmutability:!0,strictActionWithinNgZone:!1,strictActionTypeUniqueness:!1},e):{strictStateSerializability:!1,strictActionSerializability:!1,strictStateImmutability:!1,strictActionImmutability:!1,strictActionWithinNgZone:!1,strictActionTypeUniqueness:!1}}function pt({strictActionSerializability:e,strictStateSerializability:t}){return o=>e||t?dt(o,{action:n=>e&&!G(n),state:()=>t}):o}function yt({strictActionImmutability:e,strictStateImmutability:t}){return o=>e||t?at(o,{action:n=>e&&!G(n),state:()=>t}):o}function G(e){return e.type.startsWith("@ngrx")}function ht({strictActionWithinNgZone:e}){return t=>e?lt(t,{action:o=>e&&!G(o)}):t}function Rt(e){return[{provide:he,useValue:e},{provide:ye,useFactory:vt,deps:[he]},{provide:v,deps:[ye],useFactory:ft},{provide:j,multi:!0,deps:[v],useFactory:yt},{provide:j,multi:!0,deps:[v],useFactory:pt},{provide:j,multi:!0,deps:[v],useFactory:ht}]}function mt(){return[{provide:we,multi:!0,deps:[v],useFactory:gt}]}function vt(e){return e}function gt(e){if(!e.strictActionTypeUniqueness)return;let t=Object.entries(N).filter(([,o])=>o>1).map(([o])=>o);if(t.length)throw new Error(`Action types are registered more than once, ${t.map(o=>`"${o}"`).join(", ")}. ${B}#strictactiontypeuniqueness`)}function Et(e={},t={}){return[{provide:Ie,useFactory:ut},{provide:ae,useValue:t.initialState},{provide:q,useFactory:st,deps:[ae]},{provide:_,useValue:e},{provide:le,useExisting:e instanceof c?e:_},{provide:je,deps:[_,[new re(le)]],useFactory:it},{provide:fe,useValue:t.metaReducers?t.metaReducers:[]},{provide:pe,deps:[j,fe],useFactory:ct},{provide:de,useValue:t.reducerFactory?t.reducerFactory:Me},{provide:Fe,deps:[de,pe],useFactory:xe},ke,Pe,ze,$e,qe,Rt(t.runtimeChecks),mt()]}function bt(){f(m),f(g),f(L),f(K),f(Ie,{optional:!0}),f(we,{optional:!0})}var St=[{provide:Re,useFactory:bt},{provide:oe,multi:!0,useFactory(){return()=>f(Re)}}];function Ht(e,t){return ie([...Et(e,t),St])}function Yt(...e){let t=e.pop(),o=e.map(n=>n.type);return{reducer:t,types:o}}function Qt(e,...t){let o=new Map;for(let n of t)for(let r of n.types){let i=o.get(r);if(i){let s=(a,d)=>n.reducer(i(a,d),d);o.set(r,s)}else o.set(r,n.reducer)}return function(n=e,r){let i=o.get(r.type);return i?i(n,r):n}}var en=E("[Convocatorias] Load Carreras"),tn=E("[Convocatorias] Load Carreras Success",x()),nn=E("[Convocatorias] Load Convocatorias",x()),rn=E("[Convocatorias] Load Convocatorias Success",x());export{M as a,E as b,Se as c,m as d,q as e,Re as f,Gt as g,g as h,w as i,Ne as j,L as k,C as l,K as m,et as n,Zt as o,Ht as p,Yt as q,Qt as r,en as s,tn as t,nn as u,rn as v};
