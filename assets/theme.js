(function(){
var d=document;
// reveal
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('is-in');io.unobserve(e.target);}});},{rootMargin:'0px 0px -8% 0px'});d.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});}else{d.querySelectorAll('.reveal').forEach(function(el){el.classList.add('is-in');});}
// header shadow
var h=d.querySelector('[data-header]');if(h){var f=function(){h.classList.toggle('is-scrolled',window.scrollY>8);};f();window.addEventListener('scroll',f,{passive:true});}
// mobile nav
d.querySelectorAll('[data-mnav-close]').forEach(function(b){b.addEventListener('click',function(){b.closest('details').removeAttribute('open');});});
// qty
d.addEventListener('click',function(e){var b=e.target.closest('[data-qty]');if(!b)return;var i=b.parentNode.querySelector('input');var v=Math.max(+i.min||0,(+i.value||0)+(+b.dataset.qty));i.value=v;i.dispatchEvent(new Event('change',{bubbles:true}));});
d.querySelectorAll('[data-autosubmit]').forEach(function(i){var t;i.addEventListener('change',function(){clearTimeout(t);t=setTimeout(function(){var f=i.form;var u=d.createElement('input');u.type='hidden';u.name='update';u.value='1';f.appendChild(u);f.submit();},500);});});
// sort
d.querySelectorAll('[data-sort]').forEach(function(s){s.addEventListener('change',function(){var u=new URL(location.href);u.searchParams.set('sort_by',s.value);u.searchParams.delete('page');location.href=u.toString();});});
// counter
d.querySelectorAll('[data-count]').forEach(function(i){var c=i.closest('label').querySelector('[data-counter]');var up=function(){if(c)c.textContent=i.value.length+'/'+i.maxLength;};i.addEventListener('input',up);up();});
// countdown
d.querySelectorAll('[data-countdown]').forEach(function(el){var s=el.dataset.countdown;if(!s)return;var end=new Date(s+'T23:59:59');if(isNaN(end))return;var n=el.querySelector('[data-days]');var ended=el.querySelector('[data-ended]');var days=Math.ceil((end-new Date())/864e5);if(days<0){if(n)n.parentNode.querySelectorAll('[data-days],.xmas__l').forEach(function(x){x.hidden=true;});if(ended)ended.hidden=false;}else if(n){n.textContent=days;}});
// whatsapp from form
d.querySelectorAll('[data-wa-send]').forEach(function(b){b.addEventListener('click',function(){var f=b.form;var lines=['Hola YaEn3D, os mando mi idea:'];f.querySelectorAll('input,textarea,select').forEach(function(x){if(x.type==='hidden'||!x.value)return;var l=x.closest('label');var k=l?l.querySelector('span').textContent:x.name;lines.push('• '+k+': '+x.value);});window.open('https://wa.me/'+b.dataset.waSend+'?text='+encodeURIComponent(lines.join('\n')),'_blank');});});
// product
var p=d.querySelector('[data-product]');if(!p)return;
var data=JSON.parse(p.querySelector('[data-product-json]').textContent);
var showMedia=function(id){p.querySelectorAll('[data-media-id]').forEach(function(s){s.classList.toggle('is-active',String(s.dataset.mediaId)===String(id));});p.querySelectorAll('[data-thumb]').forEach(function(t){t.classList.toggle('is-active',String(t.dataset.thumb)===String(id));});};
p.querySelectorAll('[data-thumb]').forEach(function(t){t.addEventListener('click',function(){showMedia(t.dataset.thumb);});});
var money=function(c){return (c/100).toLocaleString('es-ES',{style:'currency',currency:(window.Shopify&&Shopify.currency&&Shopify.currency.active)||'EUR'});};
p.querySelectorAll('[data-opt]').forEach(function(r){r.addEventListener('change',function(){
var sel=[];p.querySelectorAll('[data-opt]:checked').forEach(function(x){sel[+x.dataset.opt]=x.value;});
var lab=p.querySelector('[data-opt-label="'+r.dataset.opt+'"]');if(lab)lab.textContent=r.value;
var v=data.variants.find(function(v){return v.options.every(function(o,i){return o===sel[i];});});
var btn=p.querySelector('[data-add]');
if(!v){if(btn){btn.disabled=true;btn.dataset.l=btn.dataset.l||btn.textContent;btn.textContent='No disponible';}return;}
p.querySelector('[data-variant-id]').value=v.id;
var pr=p.querySelector('[data-price]');if(pr)pr.textContent=money(v.price);
var cp=p.querySelector('[data-compare]');if(cp)cp.textContent=v.compare_at_price>v.price?money(v.compare_at_price):'';
if(btn){btn.dataset.l=btn.dataset.l||btn.textContent;btn.disabled=!v.available;btn.textContent=v.available?btn.dataset.l:'Agotado';}
if(v.featured_media)showMedia(v.featured_media.id);
var u=new URL(location.href);u.searchParams.set('variant',v.id);history.replaceState(null,'',u.toString());
});});
var pf=d.getElementById('pf');if(pf){pf.addEventListener('submit',function(e){var bad=pf.querySelector(':invalid');if(bad){e.preventDefault();bad.focus();bad.closest('.fld')&&bad.closest('.fld').classList.add('fld--err');}});}
})();