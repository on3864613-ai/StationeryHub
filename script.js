const products=[
[1,"Classic Spiral Notebook","Notebooks & Journals",149,199,4.7,"📓"],
[2,"Premium Study Journal","Notebooks & Journals",229,299,4.8,"📔"],
[3,"Pastel Gel Pen Set","Pens & Pencils",99,129,4.7,"🖊️"],
[4,"Exam Ball Pen Pack","Pens & Pencils",79,99,4.5,"🖊️"],
[5,"Premium Pencil Set","Pens & Pencils",59,75,4.6,"✏️"],
[6,"Creative Color Pencil Set","Art & Craft",149,199,4.8,"🖍️"],
[7,"Sketch Pen Collection","Art & Craft",129,159,4.6,"🎨"],
[8,"Smart Geometry Box","Geometry & Math",199,249,4.7,"📐"],
[9,"Scientific Calculator","Geometry & Math",399,499,4.8,"🔢"],
[10,"A4 Document Folder","Files & Folders",89,119,4.5,"📁"],
[11,"Sticky Notes Pack","Office Supplies",49,69,4.6,"🗒️"],
[12,"Study Highlighter Set","Study Accessories",99,129,4.7,"🖍️"],
[13,"Everyday School Kit","School Essentials",249,329,4.7,"🎒"],
[14,"Desk Study Organizer","Study Accessories",299,399,4.6,"🗃️"],
[15,"Cute Bookmark Set","Study Accessories",69,89,4.8,"🔖"],
[16,"A4 Project Paper Pack","School Essentials",119,149,4.5,"📄"]];
const categories=[["Notebooks & Journals","📓","Notes, journals & planners"],["Pens & Pencils","🖊️","Everyday writing tools"],["Art & Craft","🎨","Colours & creative supplies"],["Geometry & Math","📐","Maths & technical tools"],["Files & Folders","📁","Organise documents"],["Office Supplies","📌","Useful desk essentials"],["School Essentials","🎒","School-ready products"],["Study Accessories","✨","Make studying easier"]];
let cart=JSON.parse(localStorage.getItem("shCart")||"[]"),wish=JSON.parse(localStorage.getItem("shWish")||"[]");
const $=x=>document.querySelector(x),money=n=>"₹"+n.toLocaleString("en-IN");
function save(){localStorage.setItem("shCart",JSON.stringify(cart));localStorage.setItem("shWish",JSON.stringify(wish));counts()}
function counts(){$("#cartCount").textContent=cart.reduce((a,x)=>a+x.q,0);$("#wishCount").textContent=wish.length}
function categoriesUI(){$("#categoriesGrid").innerHTML=categories.map(c=>`<div class="category" onclick="filterCat('${c[0]}')"><div class="category-icon">${c[1]}</div><h3>${c[0]}</h3><p>${c[2]}</p></div>`).join("");$("#category").innerHTML='<option value="all">All Categories</option>'+categories.map(c=>`<option>${c[0]}</option>`).join("")}
function card(p){let liked=wish.includes(p[0]),off=Math.round((1-p[3]/p[4])*100);return `<div class="card"><button class="heart ${liked?"active":""}" onclick="wishToggle(${p[0]})">${liked?"♥":"♡"}</button><div class="card-img" onclick="details(${p[0]})">${p[6]}</div><div class="info"><span class="tag">${p[2]}</span><h3 onclick="details(${p[0]})">${p[1]}</h3><div class="rating">★ ${p[5]} / 5</div><div class="price-row"><b class="price">${money(p[3])}</b><span class="old">${money(p[4])}</span><span class="off">${off}% OFF</span></div><button class="add" onclick="add(${p[0]})">Add to Cart</button></div></div>`}
function render(){let q=$("#search").value.toLowerCase(),c=$("#category").value,s=$("#sort").value;let a=products.filter(p=>(!q||(p[1]+" "+p[2]).toLowerCase().includes(q))&&(c==="all"||p[2]===c));if(s==="low")a.sort((x,y)=>x[3]-y[3]);if(s==="high")a.sort((x,y)=>y[3]-x[3]);if(s==="rating")a.sort((x,y)=>y[5]-x[5]);$("#productsGrid").innerHTML=a.map(card).join("");$("#empty").hidden=a.length>0}
function filterCat(c){$("#category").value=c;render();$("#products").scrollIntoView({behavior:"smooth"})}
function add(id){let x=cart.find(i=>i.id===id);x?x.q++:cart.push({id:id,q:1});save();cartUI();toast("Added to cart ✓")}
function wishToggle(id){wish.includes(id)?wish=wish.filter(x=>x!==id):wish.push(id);save();render();toast(wish.includes(id)?"Added to wishlist ♥":"Removed from wishlist")}
function cartUI(){if(!cart.length){$("#cartItems").innerHTML='<div class="cart-empty">🛒<br><br>Your cart is empty.</div>'}else $("#cartItems").innerHTML=cart.map(i=>{let p=products.find(x=>x[0]===i.id);return `<div class="cart-item"><div class="thumb">${p[6]}</div><div><h4>${p[1]}</h4><p>${money(p[3])}</p><div class="qty"><button onclick="qty(${p[0]},-1)">−</button><b>${i.q}</b><button onclick="qty(${p[0]},1)">+</button></div></div><button class="remove" onclick="removeItem(${p[0]})">Remove</button></div>`}).join("");let sub=cart.reduce((s,i)=>s+products.find(p=>p[0]===i.id)[3]*i.q,0),del=sub?(sub>=499?0:49):0;$("#subtotal").textContent=money(sub);$("#delivery").textContent=del?money(del):"FREE";$("#total").textContent=money(sub+del)}
function qty(id,d){let x=cart.find(i=>i.id===id);x.q+=d;if(x.q<1)cart=cart.filter(i=>i.id!==id);save();cartUI()}
function removeItem(id){cart=cart.filter(i=>i.id!==id);save();cartUI();toast("Item removed")}
function details(id){let p=products.find(x=>x[0]===id);$("#modal").innerHTML=`<button class="modal-close" onclick="closeModal()">×</button><div class="detail"><div class="detail-img">${p[6]}</div><div><span class="tag">${p[2]}</span><h2>${p[1]}</h2><div class="rating">★ ${p[5]} / 5</div><p>A useful student-friendly product for study, notes, projects and everyday learning.</p><div class="big-price">${money(p[3])} <del style="font-size:12px;color:#aaa">${money(p[4])}</del></div><button class="primary full" onclick="add(${p[0]});closeModal()">Add to Cart</button></div></div>`;$("#modalOverlay").classList.add("show")}
function login(){ $("#modal").innerHTML=`<button class="modal-close" onclick="closeModal()">×</button><form class="login" onsubmit="event.preventDefault();closeModal();toast("Demo login submitted ✓")"><h2>Welcome back!</h2><input type="email" required placeholder="Email address"><input type="password" required placeholder="Password"><button class="primary">Login</button></form>`;$("#modalOverlay").classList.add("show")}
function checkout(){if(!cart.length){toast("Your cart is empty");return}$("#drawer").classList.remove("open");$("#overlay").classList.remove("show");$("#modal").innerHTML=`<button class="modal-close" onclick="closeModal()">×</button><form class="login" onsubmit="event.preventDefault();cart=[];save();cartUI();closeModal();toast("Order placed successfully 🎉")"><h2>Checkout</h2><input required placeholder="Full name"><input required placeholder="Phone number"><input required placeholder="Delivery address"><select required><option value="">Payment method</option><option>Cash on Delivery</option><option>UPI (Demo)</option><option>Card (Demo)</option></select><button class="primary">Place Order</button></form>`;$("#modalOverlay").classList.add("show")}
function closeModal(){$("#modalOverlay").classList.remove("show")}
function toast(m){let t=$("#toast");t.textContent=m;t.classList.add("show");clearTimeout(window.tt);window.tt=setTimeout(()=>t.classList.remove("show"),2000)}
$("#search").oninput=render;$("#category").onchange=render;$("#sort").onchange=render;
$("#cartBtn").onclick=()=>{$("#drawer").classList.add("open");$("#overlay").classList.add("show");cartUI()};$("#closeCart").onclick=()=>{$("#drawer").classList.remove("open");$("#overlay").classList.remove("show")};$("#overlay").onclick=()=>{$("#drawer").classList.remove("open");$("#overlay").classList.remove("show")};$("#checkout").onclick=checkout;$("#loginBtn").onclick=login;
$("#menuBtn").onclick=()=>$("#nav").classList.toggle("mobile");
$("#wishBtn").onclick=()=>{let a=products.filter(p=>wish.includes(p[0]));$("#productsGrid").innerHTML=a.length?a.map(card).join(""):'<p class="empty">Your wishlist is empty.</p>';$("#products").scrollIntoView({behavior:"smooth"})};
$("#modalOverlay").onclick=e=>{if(e.target.id==="modalOverlay")closeModal()};
$("#contactForm").onsubmit=e=>{e.preventDefault();e.target.reset();toast("Message sent successfully ✓")};
categoriesUI();render();counts();cartUI();