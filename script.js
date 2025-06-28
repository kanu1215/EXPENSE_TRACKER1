const form = document.getElementById("expense-form");
const amountIn = document.getElementById("amount");
const categoryIn = document.getElementById("Category");
const descIn = document.getElementById("Description");
const expenseList = document.getElementById("expense-list");


form.addEventListener("submit", handleFormSubmit);
function handleFormSubmit(e)
{
   e.preventDefault();
    
   const amount = amountIn.value;
   const category = categoryIn.value;
   const desc = descIn.value;

   if(!amount ||category==="Choose..." || !desc)
   {
    alert("please fill all fields");
    return;
   }
   
   
   const expense = { amount, category,desc};
   const key = `${amount}-${desc}-${Date.now()}`;
   localStorage.setItem(key,JSON.stringify(expense));



   form.reset();
   getDataFromLocalStorage();

   }


   //function to retrieve all expenses from localstorage

   function getDataFromLocalStorage()

   {
     const data = [];
     for(let i=0;i<localStorage.length;i++)
     {
        const key = localStorage.key(i);
        const val = JSON.parse(localStorage.getItem(key));
        if(val && val.amount && val.category)
        {
            data.push({key,val});
        }
     }

    //display all retrieved expenses
     displayExpenses(data);
   }
   

//function to display all cards on page
   function displayExpenses(data)
   {
    expenseList.innerHTML = "";
    if(data.length===0)
    {
        expenseList.innerHTML = `<div class="text-center text-light"> No expenses added yet</div>`;
        return;

    }

//create cards
    data.forEach((item) => {

         const col = document.createElement("div");
        col.classList.add("col-md-4");

        const card = document.createElement("div");
        card.className = "card bg-light text-dark";

 //card header for category
        const cardHeader = document.createElement("div");
        cardHeader.className = "card-header fw-bold bg-dark text-white";
        cardHeader.textContent = item.val.category;

        //card body for amount and description
        const cardBody = document.createElement("div");
        cardBody.className = "card-body";

        const amount = document.createElement("h5");
        amount.className = "card-title";
        amount.textContent = `${item.val.amount}`;

        const description = document.createElement("p");
        description.className = "card-text";
        description.textContent = item.val.desc;
         
      //create edit and delete button 
        const btnGroup = document.createElement("div");
        btnGroup.className = "d-flex justify-content-end gap-2 mt-3";

        //edit button functionality
        const editBtn = document.createElement("button");
        editBtn.className = "btn btn-outline-warning btn-sm";
        editBtn.textContent = "Edit";
        editBtn.onclick = () => {
            amountIn.value = item.val.amount;
            categoryIn.value = item.val.category;
            descIn.value = item.val.desc;
            localStorage.removeItem(item.key);
            getDataFromLocalStorage();
        };

 //delete button functionality
         const deleteBtn = document.createElement("button");
        deleteBtn.className = "btn btn-outline-danger btn-sm";
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => {
            localStorage.removeItem(item.key);
            getDataFromLocalStorage();
        };

    //append buttons,description,amount
         btnGroup.append(editBtn, deleteBtn);
        cardBody.append(amount, description, btnGroup);
        card.append(cardHeader, cardBody);
        col.appendChild(card);
        expenseList.appendChild(col);
    });

    }
    getDataFromLocalStorage();

   
