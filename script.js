var siteName=document.getElementById("bookmarkName");
var siteUrl=document.getElementById("siteUrl");
var submitBtn=document.getElementById("submitBtn");
var tableContent=document.getElementById("tableContent");
var boxModal=document.getElementById("boxInfo");
var bookmarks=[];
let superIndex;

if(localStorage.getItem("bookmarks")){
  bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  displayBookmark();
}
function addBookmark(){
  let bookmark={
    name:siteName.value,
    url:siteUrl.value,
  }
  if(bookmark.name=="" || bookmark.url==""){
    boxModal.classList.remove("d-none");
    return;
  }
  
  if (!isValidName(bookmark.name)) {
    boxModal.classList.remove("d-none");
    return;
  }
  if (bookmarks.some(b => b.name.toLowerCase() === bookmark.name.toLowerCase())) {
    boxModal.classList.remove("d-none");
    return;
  }
  if(!isValidUrl(bookmark.url)){
    boxModal.classList.remove("d-none");
    return;
  }
  bookmarks.push(bookmark);
  localStorage.setItem("bookmarks",JSON.stringify(bookmarks))
  displayBookmark()
  clearInput()
}
function displayBookmark(){
  let bookMark=""
  for(let i =0;i<bookmarks.length;i++){
    bookMark+=`
    <tr>
    <td>${i+1}</td>
    <td>${bookmarks[i].name}</td>
    <td><button class="btn btn-visit btn-success" onclick="visitSite(${i})">Visit</button></td>
    <td><button class="btn btn-delete btn-danger" onclick="deleteBookmark(${i})">Delete</button></td>
    <td><button class="btn btn-update btn-warning" onclick="setValue(${i})">Update</button></td>
    </tr>
    `
  }
  document.getElementById("tableContent").innerHTML=bookMark;
}
function deleteBookmark(index){
  bookmarks.splice(index, 1);
  localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
  displayBookmark();
}
function clearInput() {
    siteName.value = "";
    siteUrl.value = "";
}
function visitSite(index){
  if(bookmarks[index].url.startsWith("http://") || bookmarks[index].url.startsWith("https://")){
  window.open(`${bookmarks[index].url}`);
}
else{
  window.open(`http://${bookmarks[index].url}`);
}
}
function setValue(index){
  superIndex=index;
  document.getElementById("updateBtn").style.display="block";
  document.getElementById("submitBtn").style.display="none";
  siteName.value=bookmarks[index].name;
  siteUrl.value=bookmarks[index].url;
}
function update(){
  bookmarks[superIndex].name=siteName.value;
  bookmarks[superIndex].url=siteUrl.value;
  document.getElementById("updateBtn").style.display="none";
  document.getElementById("submitBtn").style.display="block";
  localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
  displayBookmark();
  clearInput()
}
function capitalize(str) {
  let strArr = str.split("");
  strArr[0] = strArr[0].toUpperCase();
  return strArr.join("");
}
function isValidUrl(url){
  const pattern = /^(https?:\/\/)?([a-z\d]([a-z\d-]*[a-z\d])?\.)+[a-z]{2,}(:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(#[-a-z\d_]*)?$/i;
    console.log(url, !!pattern.test(url))
    return !!pattern.test(url);
}
function closeBox(){
  boxModal.classList.add("d-none");
}
function isValidName(name) {
  const pattern = /^[a-zA-Z\d ]{4,}$/;
  return pattern.test(name.trim());
}