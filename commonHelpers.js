import{S as L,i as C}from"./assets/vendor-5b791d57.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&c(o)}).observe(document,{childList:!0,subtree:!0});function l(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function c(e){if(e.ep)return;e.ep=!0;const t=l(e);fetch(e.href,t)}})();let w=new L(".image-card a",{captionsData:"alt"});const v="42176709-03057e91c34187fd30d01f158";function I(){const n=document.createElement("div");n.className="loader",imageContainer.appendChild(n)}function y(){const n=imageContainer.querySelector(".loader");n&&n.remove()}function b(n){I();const r="photo",l="horizontal",c=!0,t=`https://pixabay.com/api/?${new URLSearchParams({key:v,q:n,image_type:r,orientation:l,safesearch:c})}`;fetch(t).then(o=>{if(!o.ok)throw new Error("Network response was not ok");return o.json()}).then(o=>{y();const p=document.getElementById("imageContainer");p.innerHTML="";const u=document.createDocumentFragment();parseInt(o.totalHits)>0?(o.hits.forEach(a=>{const i=document.createElement("li");i.className="image-card";const d=document.createElement("img");d.src=a.webformatURL,d.alt=a.tags;const m=document.createElement("a");m.href=a.largeImageURL,m.appendChild(d);const s=document.createElement("div");s.className="image-details";const f=document.createElement("p");f.textContent=`Likes ${a.likes}`;const h=document.createElement("p");h.textContent=`Views ${a.views}`;const g=document.createElement("p");g.textContent=`Comments ${a.comments}`;const E=document.createElement("p");E.textContent=`Downloads ${a.downloads}`,s.appendChild(f),s.appendChild(h),s.appendChild(g),s.appendChild(E),i.appendChild(m),i.appendChild(s),u.appendChild(i)}),p.appendChild(u),w.refresh()):C.error({message:"Please enter a valid search query.",position:"topRight"})}).catch(o=>{y(),console.error("Error during fetch:",o.message)})}document.addEventListener("DOMContentLoaded",function(){document.getElementById("searchForm").addEventListener("submit",function(n){n.preventDefault();const r=document.getElementById("searchInput").value;r.trim()!==""?b(r):C.error({message:"Please enter a valid search query.",position:"topRight"}),n.target.reset()})});
//# sourceMappingURL=commonHelpers.js.map
