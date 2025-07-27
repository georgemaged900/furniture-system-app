#  Furniture Factory Management System (Full Stack Project)

This system is designed to manage the complex, nested data structures used in furniture production — replacing traditional Excel sheets with a scalable, clean, and structured digital interface. Built with .NET Core Web API and React (TypeScript), the app supports full CRUD for Products, Components, and Subcomponents in a modern, Excel-like UI.

---

##  Purpose

This project solves a real-world need observed in many MENA-based furniture factories: the reliance on manual spreadsheets to manage thousands of rows of structured component data.

It simplifies and automates:

- Product configuration
- Component hierarchy definition
- Bulk entry with validations

---

##  Tech Stack

| Layer        | Tech Used                                  |
|--------------|---------------------------------------------|
| Frontend     | React, TypeScript, MUI (Material UI), Redux Toolkit |
| Backend      | ASP.NET Core 9, Entity Framework Core, SQL Server |
| API Design   | RESTful, DTO-based                         |
| Validation   | Client-side & server-side (no invalid or negative values) |
| Misc         | Arabic RTL support, Excel-like dynamic table UI |

---

#  Project Structure

Furniture-System/
 Furniture-System-Api/  ASP.NET Core Web API (Backend)
 furniture-system-app/ React + Redux + MUI frontend
 README.md  
 
 
 
 
 
---

##  Getting Started

###  Backend Setup (`Furniture-System-Api`)

####  Prerequisites
- .NET 9 SDK
- SQL Server instance (local)

####  Run the API

```bash
cd Furniture-System-Api
dotnet restore
dotnet ef database update
dotnet run

or run from iis express configuration in microsoft visual studio 2022.
Project api will run on swaggerUI.

The frontend calls the backend api using the .env file in the root directory of the react.js project which has the localhost of the backend.

| Method | Endpoint                      | Description                                                    |
| ------ | ----------------------------- | -------------------------------------------------------------- |
| POST   | `/api/Product/AddFullProduct` | Add a full product tree (product + components + subcomponents) |
| GET    | `/api/Product/GetAll`         | Retrieve all products & children                               |
| DELETE | `/api/Product/{id}`           | Delete a product and cascade children                          |
| PUT    | `/api/Product/{id}`           | Update an existing product (if enabled)                        |

Cascade delete is implemented: deleting a product removes its components and subcomponents.


 Frontend Setup (furniture-system-app)
 Prerequisites
Node.js 
npm

 Run the Frontend
bash
Copy
Edit
cd furniture-system-app
npm install
npm run



Features
 3-level nesting (Product → Component → Subcomponent)

 Auto calculation: totalQuantity = count * quantity

 Multiple dimension entries: detail, cutting, final

 Veneer layer inputs: inner & outer

 Form validation: block negative numbers & invalid strings

 Excel-style editable grid with placeholder handling
 
 
 {
  "productName": "Table X",
  "price": 1000,
  "components": [
    {
      "componentName": "Leg",
      "quantity": 4,
      "subcomponents": [
        {
          "subcomponentName": "Wood Plank",
          "material": "Oak",
          "customNotes": "Cut from same batch",
          "count": 2,
          "totalQuantity": 8,
          "detailLength": 60,
          "detailWidth": 5,
          "detailThickness": 2,
          "cuttingLength": 62,
          "cuttingThickness": 2.2,
          "finalLength": 58,
          "finalWidth": 4.8,
          "finalThickness": 1.9,
          "veneerInner": "Matte",
          "veneerOuter": "Glossy"
        }
      ]
    }
  ]
}

 Validation Rules
No negative numbers allowed (count, dimensions, price)

No numeric-only input for text fields like names or materials

Placeholder guides for each field (e.g., "Enter material", "mm", "count")


Future Roadmap
Authentication + Role management (Admin vs User) using Microsoft Identity and JWT Token, 
Serilog and automapper configuration in .NET 
Fluent Validation in .NET

 Export to Excel or PDF

 Mobile responsiveness

 Search, sort, and filter

 Activity logging & history

 Auto-save draft mode
 
 Delete and edit for full product page for subcomponent
 
 Enhance UI 
 

