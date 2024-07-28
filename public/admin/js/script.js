
const listButton=document.querySelectorAll("[button-status");
if (listButton.length>0) {
    const url= new URL(window.location.href); // tao ra link moi
   listButton.forEach(button => {
        button.addEventListener("click", () => {
            const status=button.getAttribute("button-status");
            if (status) {
                url.searchParams.set("status",status);
            }
            else {
                url.searchParams.delete("status");
            }
            window.location.href=url.href; 
        })
   });
    const statusCr=url.searchParams.get("status")|| "";
    const buttonCr=document.querySelector(`[button-status="${statusCr}"]`);
   if (buttonCr) {
    buttonCr.classList.add("active");  // them css cho nut hien tai
   }
}


const fromSearch=document.querySelector("[form-search]");
    if(fromSearch){
        const url=new URL(window.location.href);
        fromSearch.addEventListener("submit",(event) => {
            event.preventDefault(); // ham ngan chan load lai trang
            const keyword=event.target.elements.keyword.value; // lay gia tri cua keyword
            console.log(keyword);
            if (keyword) {
                url.searchParams.set("keyword",keyword);
            }
            else {
                url.searchParams.delete("keyword");
            }
            window.location.href=url.href;    
        });
    }
// end from  search

// phan trang
const buttonPage=document.querySelectorAll(".page-link");
if (buttonPage.length>0) {
let url=new URL(window.location.href);
buttonPage.forEach(button => {
    button.addEventListener("click",()=>{
        const page=button.getAttribute("page");
        url.searchParams.set("page",page);
        window.location.href=url.href;
    })
});
}
//end phan trang

//buttun change status

const listButtonChangeStatus=document.querySelectorAll("button[button-change-status]");
if(listButtonChangeStatus.length>0) {
    listButtonChangeStatus.forEach(button => {
        button.addEventListener("click", () => {
            const url=button.getAttribute("link");
            // console.log(url);
            fetch(url, {
                method:"PATCH",
                headers: {
                    "Content-Type": "application/json",
                }
            }) 
                .then(res => res.json())  // chuyen json ve js
                .then(data => {
                    if(data.code==200) {
                        window.location.reload();
                    }
                 })
        })
    }) 
}
//end button change status


// check box

const checkboxAll=document.querySelector("input[name='checkboxAll']");
const listcheckboxItem=document.querySelectorAll("input[name='checkboxItem'");
if (checkboxAll) {
    checkboxAll.addEventListener("click", () => {
        listcheckboxItem.forEach(checkItem => {
            checkItem.checked=checkboxAll.checked;
        })
    })
}

listcheckboxItem.forEach(checkbox => {
    checkbox.addEventListener("click", () =>{
        const listCheckChecked=document.querySelectorAll("input[name='checkboxItem']:checked");
        if (listCheckChecked.length==listcheckboxItem.length) {
            checkboxAll.checked=true;
        }           
        else {
            checkboxAll.checked=false;
        }
    })
});

//end checkbox

//chage multi status
const boxActions=document.querySelector("[box-actions]");
if(boxActions) {
    const button=boxActions.querySelector("button");
    const select=boxActions.querySelector("select");
   
    button.addEventListener("click", () => {
        const status=select.value;
        // console.log(status);
        const listCheckChecked=document.querySelectorAll("input[name='checkboxItem']:checked");
        const idf=[];
        listCheckChecked.forEach(input => {
            idf.push(input.value);
        });
        if (idf.length>0 &&status!=""){
            const dataChangeMulti={
                status,
                idf:idf
            }
            fetch("/admin/product/change-multi", {
                method:"PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataChangeMulti), 
            })
             .then(res=> res.json())
             .then(data=>{
                if(data.code==200) {
                    window.location.reload();
                }
             })
        }
        
        else {  
            alert("vui long chon hanh dong va san pham");
        }
        
       
    })
}

//xoa 1 mem  san pham
const ListbuttonDelete=document.querySelectorAll("[button-delete]");
if(ListbuttonDelete.length>0) {
    ListbuttonDelete.forEach(button => {
        button.addEventListener("click", () =>{
            const id=button.getAttribute("button-delete");
            // console.log(id);
            fetch(`/admin/product/delete/${id}`, {          
                method: "PATCH"
              })
                .then(res => res.json())
                .then(data =>{
                    if(data.code==200) {
                        window.location.reload();
                    }
                })

                
            });
        })
    
}

// thay doi vi tri 
 const listInputPosition=document.querySelectorAll("input[name='position']");
if(listInputPosition.length>0) {
    listInputPosition.forEach(input => {
        input.addEventListener("change",()=>{
            const value=input.value;
            const url=input.getAttribute("link");
            const dataInput={
                position:parseInt(value)
            }
            fetch(url,{
                method:"PATCH",
                headers:{
                     "Content-Type": "application/json"
                },
                body:JSON.stringify(dataInput)
            })
                .then(res=>res.json())
                .then(data =>{
                    if(data.code=200) {
                        window.location.reload();
                    }
                })
        })
    });
}

//thong bao thay doi trang thai
const showAlert=document.querySelector("[show-alert]");
if(showAlert) {
    let time=showAlert.getAttribute("[show-alert")||3000;
    time=parseInt(time);
    setTimeout(() => {
        showAlert.classList.add("hidden");
    }, time);
}

//preview
const uploadImage=document.querySelector("[upload-image");
if(uploadImage) {
    const uploadInput=uploadImage.querySelector("[upload-image-input]");
    const uploadImagePreview=uploadImage.querySelector("[upload-image-preview");
    uploadInput.addEventListener("change",()=> {
        const file=uploadInput.files[0];
        console.log(file);
        if(file) {
            uploadImagePreview.src=URL.createObjectURL(file);
        }
    })
}

//sort
const boxSort=document.querySelector("[sort]");
if(boxSort) {
    const boxSelect=boxSort.querySelector("[sort-select]");
    const url=new URL(window.location.href);
    boxSelect.addEventListener("change", ()=>{
        const ans=boxSelect.value.split('-');
        const [key,value]=ans;
        if(key&&value) {
            url.searchParams.set("key",key);
            url.searchParams.set("value",value);
        }
        else {
            url.searchParams.delete("key",key);
            url.searchParams.delete("value",value);
        }
        window.location.href=url.href;
        
    })

    //them option macdinh
    const value= url.searchParams.get("value");
    const key= url.searchParams.get("key");
    if(value&&key) {
        const key_value=`${key}-${value}`;
        const option1=boxSelect.querySelector(`[value="${key_value}"]`);
        option1.setAttribute('selected',true);
        // console.log(option1);
    }
    //clear
const buttonClear=document.querySelector("[sort-clear");
// console.log(buttonClear);
if(buttonClear) {
    buttonClear.addEventListener("click",()=>{
        url.searchParams.delete("key",key);
        url.searchParams.delete("value",value);
        window.location.href=url.href;
    })
}
}
    //end clear
//end sort


//deleted role
const btDeletedRole=document.querySelectorAll('[bt-deleted-role]');
if(btDeletedRole) {
    btDeletedRole.forEach(button => {
        button.addEventListener("click",()=>{
            const link=button.getAttribute('link');
            // console.log(link);
            fetch(link,{
                method:"PATCH"
                
            })
            .then(res=> res.json())
            .then(data=>{
                if(data.code==200){
                    window.location.reload();
                }
            })
        })
    });
}


//phan quyen
const buttonUpdate=document.querySelector('[button-submit]');
if(buttonUpdate) {
    buttonUpdate.addEventListener("click",()=>{
        const table=document.querySelector('[table-permissions]');
        const roles=[];
        const listTh=table.querySelectorAll('[role-id]');
        listTh.forEach(element => {
            const roleId=element.getAttribute('role-id');
            const role={
                id:roleId,
                permissions:[]
            };
            const listInputChecked=table.querySelectorAll(`input[data-id="${roleId}"]:checked`);
            listInputChecked.forEach(element => {
                const dataName=element.getAttribute('data-name');
                 role.permissions.push(dataName);
            });
           
            roles.push(role);
        });
       const url=buttonUpdate.getAttribute('button-submit');
       fetch(url,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(roles)
       })
       .then(res=>res.json())
       .then(data=>{
            if(data.code==200){
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: data.message,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
       })
       
    })
}


//accounts
    //change status
const listStatusAcc=document.querySelectorAll('[data-status]');
if(listStatusAcc){
    listStatusAcc.forEach(button => {
        button.addEventListener("click",()=>{
            const url=button.getAttribute('link');
            fetch(url,{
                method: "PATCH"
            })
            .then(res=>res.json())
            .then(data=>{
                if(data.code==200){
                    window.location.reload();
                }
            })
        })
    });
}
    //xoa mem
const listBtDltAcc=document.querySelectorAll('[button-deleteAcc');
if(listBtDltAcc){
    listBtDltAcc.forEach(button => {
        button.addEventListener("click",()=>{
            const url=button.getAttribute('link');
            fetch(url,{
                method:"PATCH"
            })
            .then(res => res.json()) 
            .then(data =>{
                if(data.code==200) {
                    window.location.reload();
                }
            })
        })
    });
}
    //back khoi phuc
const listButonBackAcc=document.querySelectorAll('[back-acc');
if(listButonBackAcc) {
    listButonBackAcc.forEach(button => {
        button.addEventListener("click",()=>{
            const url=button.getAttribute('link');
            console.log(url);
            fetch(url,{
                method:"PATCH"
            })
            .then(res =>res.json())
            .then(data=>{
                if(data.code==200) {
                    window.location.reload();
                }
            })
        })
    });
}
    //deleted vinh vien
const ListbuttonDeleteVv=document.querySelectorAll('[deleted-vv]');
if(ListbuttonDeleteVv){
   ListbuttonDeleteVv.forEach(button => {
     button.addEventListener("click",()=>{
         const url=button.getAttribute('link');
         fetch(url,{
            method:"PATCH"
         })
         .then(res=>res.json())
         .then(data=>{
            if(data.code==200){
                window.location.reload();
            }
         })
     })
   });
}
    
//end accounts


// change status product-category
const changeStatus=document.querySelectorAll('[button-change-status]');
if(changeStatus.length>0) {
    changeStatus.forEach(button => {
        button.addEventListener("click",()=>{
            const url=button.getAttribute("link");
            fetch(url,{
                method:"PATCH",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then(res => res.json())
            .then(data=>{
                if(data.code==200) {
                    window.href.reload();
                }
            })
        })
    });
}


//order
const ListButonDeleteOrder=document.querySelectorAll('[button-deleteOrder]');
if(ListButonDeleteOrder.length>0) {
    ListButonDeleteOrder.forEach(button => {
        button.addEventListener("click",()=>{
            const link=button.getAttribute('link');
            fetch(link,{
                method:'PATCH'
            })
            .then(res =>res.json())
            .then(data =>{
                if(data.code==200) {
                    window.location.reload();
                }
            })
        })
    });
}

const buttonChangeStatusUser=document.querySelectorAll('[linkUser]');
if(buttonChangeStatusUser.length>0) {
    buttonChangeStatusUser.forEach(button => {
        button.addEventListener("click",()=>{
            const link=button.getAttribute('linkUser');
            fetch(link,{
                method:'PATCH'
            })
            .then(res =>res.json())
            .then(data =>{
                if(data.code==200) {
                    window.location.reload();
                }
            })
        })
    });
}














 // xoa 1sp vinh vien
const buttonDeleteVv=document.querySelectorAll("[button-deleteVv]");
buttonDeleteVv.forEach(button => {
    button.addEventListener("click", () => {
        const id=button.getAttribute("button-deleteVv");
        fetch(`/admin/product/trash/deleteVv/${id}`, {          
            method: "DELETE"
          })
            .then(res => res.json())
            .then(data => {
              if(data.code == 200) {
                window.location.reload();
              }
            })
        
    })
});

// khoi phuc 1 san pham
const listButtonBack=document.querySelectorAll("[button-back");
if(listButtonBack.length>0) {
    listButtonBack.forEach(button => {
        button.addEventListener("click", () =>{
            const id=button.getAttribute("button-back");
            console.log(id);
            fetch(`/admin/product/trash/back/${id}`,{
                method:"PATCH",

            })
            .then(res=> res.json())
            .then(data => {
                if(data.code==200) {
                    window.location.reload();
                }
            })
        })
    });
}

