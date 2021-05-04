# warehouse-management

This github repo contains code for a warehouse software. This exhibit the following functionality
  * Get all products and quantity of each that is an available with the current inventory
  * Remove(Sell) a product and update the inventory accordingly


## Instructions

Due to timeconstrain, the display feature, delete feature and modify feature are exhibited as api end points. 

1. Clone the project and navigate to the location
2. npm install
3. Use postman to hit the endpoint
4. To view the inventory,  hit the end point ``/view/inventory/id``
5. To view the products-info,  hit the end point ``/view/products-info``
6. To buy the product, hit the end point ``/buy-product``
7. To view the product stock, hit the end point ``/view/products-stock``



## Limitations
  * No real DB Connection
  * Completely rely on Rest API Calls
  * No test cases added
  * CI CD Pipeline is not enabled. Again, This is because of time constrain. My previous CI CD project setup is [here](https://github.com/arunprakashpj/Deploying-CICD-Pipeline-in-Azure) 
## Screenshots
![Screenshot](https://github.com/arunprakashpj/warehouse-management/blob/main/Screenshots/get-request.PNG)

![Screenshot](https://github.com/arunprakashpj/warehouse-management/blob/main/Screenshots/buy-request.PNG)

![Screenshot](https://github.com/arunprakashpj/warehouse-management/blob/main/Screenshots/results.PNG)


## Improvements
 * NoSQL DB Connection
 * Proper UI to display the results
 * Isoalted logic for Stock computation
 * Unit Testcases 
 * Integration Test cases

